// ── Motion Composer ──
// Resolves entity configs into motion slots (primary, secondary).
// Entity.update() runs the actual pipeline; this function only resolves and assigns.
//
// Composition order:
//   1. Resolve path and base duration
//   2. Create verb (primary slot)
//   3. Adverb decorates verb (modifies duration, easing, wraps update)
//   4. Gesture occupies secondary slot (overlay)
//   5. Emotions run inline (color, phase machine)
//
// Primary/secondary assignment: inferred by default (verb → primary, no verb →
// emotion primary), but overridable via config.primaryOverride = 'emotion'.

import { Entity, lerpColor } from './entity.js';
import { MotionRegistry } from './motion-registry.js';
import { EMOTIONS, blendEmotions } from './emotion-functions.js';
import { SLOW_TARGET, FAST_TARGET, createAdverb } from './adverbs.js';
import { Path } from './path.js';
import { RELATIONAL_VERBS, RELATIONAL_PATH_VERBS } from '../motion_vocabulary/generated_verbs.js';

const RELATIONAL_KEYS = new Set([...Object.keys(RELATIONAL_VERBS), ...Object.keys(RELATIONAL_PATH_VERBS)]);

/**
 * Resolve motion configs into entity slots each frame.
 *
 * @param {object}  entityMap    — named entity map (scene._entityMap)
 * @param {object}  entityConfigs — current state's entity config block
 * @param {object}  stateMachine — the scene's StateMachine (for elapsed time, current def)
 * @param {object}  bounds       — canvas bounds
 * @param {number}  dt           — frame delta
 */
export function composeMotions(entityMap, entityConfigs, stateMachine, bounds, dt) {
  // Pass 0: auto-create any new entities before resolving targets/motions
  for (const [name, config] of Object.entries(entityConfigs)) {
    if (!entityMap[name]) {
      const cx = bounds.right ?? 512, cy = bounds.bottom ?? 512;
      const e = new Entity(
        config.startX ?? cx / 2,
        config.startY ?? cy / 2,
        {
          shape: config.shape || 'circle',
          color: config.color || '#4FC3F7',
          size: config.size || 'medium',
          boundaryBehavior: 'rebound',
        }
      );
      e._name = name;
      entityMap[name] = e;
    }
  }

  // Remove stale entities no longer in the current state's config
  for (const name of Object.keys(entityMap)) {
    if (!entityConfigs[name]) {
      delete entityMap[name];
    }
  }

  // Wander any target entities that have no verb of their own
  for (const [name, config] of Object.entries(entityConfigs)) {
    if (config.verb || !name.endsWith('_target')) continue;
    const t = entityMap[name];
    if (!t) continue;
    t._bounds = bounds;
    if (!t._wander) t._wander = { angle: Math.random() * Math.PI * 2, timer: 0 };
    t._wander.timer -= dt;
    if (t._wander.timer <= 0) { t._wander.angle += (Math.random() - 0.5) * 2.0; t._wander.timer = 0.8 + Math.random() * 1.2; }
    const prevX = t.x, prevY = t.y;
    t.x += Math.cos(t._wander.angle) * 40 * dt;
    t.y += Math.sin(t._wander.angle) * 40 * dt;
    t.x = Math.max(20, Math.min((bounds.right || 512) - 20, t.x));
    t.y = Math.max(20, Math.min((bounds.bottom || 512) - 20, t.y));
    if (dt > 0) { t.vx = (t.x - prevX) / dt; t.vy = (t.y - prevY) / dt; }
  }

  // Pass 1: resolve primary, secondary, and inline emotion effects
  for (const [name, config] of Object.entries(entityConfigs)) {
    const e = entityMap[name];

    e._bounds = bounds;
    e._config = config;   // expose entity config to generated verb/adverb code
    if (config.target) {
      e._target = entityMap[config.target];
    } else if (config.verb && RELATIONAL_KEYS.has(config.verb)) {
      // Phantom wandering target for relational verbs with no real target
      if (!config._phantomTarget) {
        config._phantomTarget = {
          x: (bounds.right || 512) * 0.65, y: (bounds.bottom || 512) * 0.45,
          radius: 6, vx: 0, vy: 0, _angle: Math.random() * Math.PI * 2, _timer: 0,
        };
      }
      const pt = config._phantomTarget;
      pt._timer -= dt;
      if (pt._timer <= 0) { pt._angle += (Math.random() - 0.5) * 2.0; pt._timer = 0.8 + Math.random() * 1.2; }
      const prevX = pt.x, prevY = pt.y;
      pt.x += Math.cos(pt._angle) * 40 * dt;
      pt.y += Math.sin(pt._angle) * 40 * dt;
      pt.x = Math.max(20, Math.min((bounds.right || 512) - 20, pt.x));
      pt.y = Math.max(20, Math.min((bounds.bottom || 512) - 20, pt.y));
      if (dt > 0) { pt.vx = (pt.x - prevX) / dt; pt.vy = (pt.y - prevY) / dt; }
      e._target = pt;
    }

    // ── Path resolution ──
    e._path = null;
    const isDrawnVerb = /^userDrawnPath\d*$/.test(config.verb || '');
    if (isDrawnVerb && config._userPath && config._userPath.points?.length >= 2) {
      e._path = Path.fromPoints(config._userPath.points);
    } else if (config.path) {
      e._path = typeof config.path === 'string'
        ? MotionRegistry.path(config.path)
        : config.path;
    } else if (config.pathTo) {
      if (!config._resolvedPath) {
        config._resolvedPath = Path.fromEndpoints(
          { x: e.x, y: e.y },
          config.pathTo,
        );
      }
      e._path = config._resolvedPath;
    }

    const def = stateMachine.current;
    if (def?.duration) e._stateDuration = def.duration;

    // Speed spectrum: override _stateDuration from path length / interpolated speed
    if (config.speedSetting != null && e._path?.totalLength) {
      const targetSpeed = SLOW_TARGET + (FAST_TARGET - SLOW_TARGET) * config.speedSetting;
      e._stateDuration = e._path.totalLength / targetSpeed;
    }

    // ── Resolve primary slot ──
    // Default: verb → primary, emotion layers on top.
    // Override: config.primaryOverride === 'emotion' → emotion is primary.
    let primary = null;
    const verbKey = config.verb;
    const emotionOverride = config.primaryOverride === 'emotion' && config.emotion;

    if (emotionOverride && !config.emotion.includes('+')) {
      primary = MotionRegistry.emotion(config.emotion);
    } else if (verbKey) {
      if (!config._verbMotion || config._verbMotion.verb !== verbKey) {
        // Clean up outgoing verb before creating the new one
        if (e.primary && e.primary.cleanup) e.primary.cleanup(e);
        e._stateElapsed = 0;
        e.vx = 0; e.vy = 0;
        config._verbMotion = MotionRegistry.verb(verbKey, e._path, e._stateDuration || 1);
        // Ensure verb identity matches the registry key (for dynamically-named verbs)
        if (config._verbMotion) config._verbMotion.verb = verbKey;
      }
      // User-drawn path override: force onto verb so self-building verbs don't rebuild
      if (config._userPath && e._path && config._verbMotion) {
        config._verbMotion.path = e._path;
      }
      primary = config._verbMotion;
    } else if (config.emotion && !config.emotion.includes('+')) {
      primary = MotionRegistry.emotion(config.emotion);
    }

    // ── Adverb decorates verb (before verb runs) ──
    if (config.adverb && primary) {
      if (!config._adverbInstance || config._adverbInstance.name !== config.adverb) {
        config._adverbInstance = createAdverb(config.adverb);
        config._adverbApplied = false;
        // Force verb recreation so decorate wraps a fresh update (not a stacked one)
        config._verbMotion = null;
        if (verbKey) {
          config._verbMotion = MotionRegistry.verb(verbKey, e._path, e._stateDuration || 1);
          primary = config._verbMotion;
        }
      }
      const adv = config._adverbInstance;
      if (adv) {
        if (config.exaggeration != null) adv._exaggeration = config.exaggeration;
        // Re-decorate when exaggeration changes (closures capture value at decorate time)
        if (config.exaggeration != null && config._appliedExaggeration !== config.exaggeration) {
          config._adverbApplied = false;
          config._verbMotion = null;
          if (verbKey) {
            config._verbMotion = MotionRegistry.verb(verbKey, e._path, e._stateDuration || 1);
            primary = config._verbMotion;
          }
        }
        if (!config._adverbApplied) {
          adv.decorate(primary, e);
          config._adverbApplied = true;
          config._appliedExaggeration = config.exaggeration;
          // Sync state duration to verb's total time (duration + wait)
          const verbTotal = (primary.duration || 0) + (primary._waitEnter || 0);
          if (verbTotal > 0 && verbTotal !== e._stateDuration) {
            e._stateDuration = verbTotal;
            if (def) def.duration = verbTotal;
          }
        }
      }
    }

    // Set primary (with cleanup of previous)
    if (e.primary && e.primary !== primary && e.primary.cleanup) {
      e.primary.cleanup(e);
    }
    e.setPrimary(primary);

    // ── Emotion as secondary layer (only when verb is primary, not overridden) ──
    if (config.emotion && verbKey && !emotionOverride) {
      if (config.emotion.includes('+')) {
        const [keyA, keyB] = config.emotion.split('+');
        const emoA = EMOTIONS[keyA]?.update;
        const emoB = EMOTIONS[keyB]?.update;
        if (emoA && emoB) {
          const colA = EMOTIONS[keyA].color;
          const colB = EMOTIONS[keyB].color;
          if (!e._baseColor) e._baseColor = e.color;
          blendEmotions(emoA, emoB, 0.5, e, dt, bounds);
        }
      } else {
        const emo = EMOTIONS[config.emotion]?.update;
        if (emo) {
          if (!e._bounds) e._bounds = bounds;
          // Detect emotion swap — initialize new emotion's first phase
          if (config._prevEmotion !== config.emotion) {
            if (config._prevEmotion) {
              const oldEmo = EMOTIONS[config._prevEmotion]?.update;
              if (oldEmo?.cleanup) oldEmo.cleanup(e);
            }
            e._currentPhase = null;
            const firstPhase = emo._phases?.[0];
            if (firstPhase?.onEnter) firstPhase.onEnter(e, bounds);
            config._prevEmotion = config.emotion;
          }
          emo.update(e, dt);
        }
        const emoColor = EMOTIONS[config.emotion]?.color;
        if (emoColor) {
          if (!e._baseColor) e._baseColor = e.color;
          e.color = lerpColor(e.color, emoColor, 1 - Math.exp(-6.0 * dt));
        }
      }
    }

    // Skip boundary when emotion drives position
    if (config.emotion && (!config.verb || emotionOverride)) {
      const emotionActive = config.emotion.includes('+')
        ? config.emotion.split('+').some(k => EMOTIONS[k]?.update)
        : MotionRegistry.emotion(config.emotion);
      if (emotionActive) e._skipBoundary = true;
    }

    // ── Resolve secondary slot: gesture only (adverbs now decorate verb above) ──
    if (!config.gesture) {
      if (e.secondary) {
        const secs = Array.isArray(e.secondary) ? e.secondary : [e.secondary];
        for (const s of secs) { if (s.cleanup) s.cleanup(e); }
        if (!config.emotion && e._baseColor) { e.color = e._baseColor; e._baseColor = null; }
      }
      e.setSecondary(null);
    }
  }

  // Pass 2: gesture resolution and cleanup
  for (const [name, e] of Object.entries(entityMap)) {
    const sec = e.secondary;
    if (sec && !entityConfigs[name]?.gesture) {
      const motions = Array.isArray(sec) ? sec : [sec];
      for (const s of motions) { if (s.cleanup) s.cleanup(e); }
      e.setSecondary(null);
    }
  }
  for (const [name, config] of Object.entries(entityConfigs)) {
    if (config.gesture) {
      const e = entityMap[name];
      if (!e) continue;

      let gestureName, cycleOverride;
      if (typeof config.gesture === 'string') {
        gestureName = config.gesture;
        cycleOverride = config.gestureCycles;
      } else {
        gestureName = config.gesture.name;
        cycleOverride = config.gesture.cycles;
      }

      // Custom user-drawn shape override
      if (config._userGestureShape?.samples?.length >= 2) {
        if (!config._customGesture || config._customGesture._baseGestureName !== gestureName) {
          const baseGes = MotionRegistry.gesture(gestureName);
          if (baseGes) {
            config._customGesture = createCustomShapeGesture(baseGes, config._userGestureShape.samples);
            config._customGesture._baseGestureName = gestureName;
          }
        }
        if (config._customGesture) {
          if (cycleOverride != null) config._customGesture.cycles = cycleOverride;
          e.setSecondary(config._customGesture);
        }
      } else {
        const ges = MotionRegistry.gesture(gestureName);
        if (ges) {
          if (cycleOverride != null) ges.cycles = cycleOverride;
          e.setSecondary(ges);
        }
      }
    }
  }
}

/**
 * Create a gesture that inherits behavior from a base gesture
 * but uses a user-drawn shape function (lookup table interpolation).
 */
function createCustomShapeGesture(baseGesture, samples) {
  const custom = Object.create(baseGesture);
  custom.shapeFunction = (t) => {
    t = t % 1;
    if (t <= samples[0].t) return samples[0].v;
    if (t >= samples[samples.length - 1].t) return samples[samples.length - 1].v;
    for (let i = 1; i < samples.length; i++) {
      if (samples[i].t >= t) {
        const prev = samples[i - 1], curr = samples[i];
        const frac = (t - prev.t) / (curr.t - prev.t);
        return prev.v + (curr.v - prev.v) * frac;
      }
    }
    return samples[samples.length - 1].v;
  };
  return custom;
}
