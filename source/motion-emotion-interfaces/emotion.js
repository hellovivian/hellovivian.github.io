// ── Emotion Class ──
// An Emotion extends Motion and spans t from 0→1.
// Phases are windows of t — each has a range [from, to) and an update function.
// The emotion advances t and dispatches to whichever phase covers the current value.
//
// Channels:
//   energyFunction(t) — optional. Maps progress → energy value [0,1].
//                       Base class snaps entity.energy each frame if provided.
//   _exaggeration     — scalar [0,1]. Scales intensity of emotion behaviors.
//                       Subclass decorate()/phases read this to scale their ranges.

import { Motion } from './motion.js';
import { lerpColor } from './entity.js';

export class Emotion extends Motion {
  _exaggeration = 0.5;
  _energyFunction = null;

  constructor(phases, { customDraw, draw, energyFunction, exaggeration } = {}) {
    super('emotion', null);

    this._phases = phases;
    this.customDraw = customDraw ?? draw ?? null;
    if (energyFunction) this._energyFunction = energyFunction;
    if (exaggeration != null) this._exaggeration = exaggeration;

    // Event-driven mode: phases use condition/next instead of from/to
    this._eventDriven = Array.isArray(phases) && phases.some(p => p.condition != null);
    this._phaseMap = {};
    if (Array.isArray(phases)) {
      for (const p of phases) { if (p.name) this._phaseMap[p.name] = p; }
    }
  }

  /** @returns {string[]} phase labels */
  get phaseNames() {
    return this._phases.map((p, i) => p.name ?? `${i}`);
  }

  /**
   * Which phase is active at the given t?
   * @param {number} t — progress 0→1
   * @returns {{ name: string, from: number, to: number, update: Function }|null}
   */
  phaseAt(t) {
    for (const p of this._phases) {
      if (t >= p.from && t < p.to) return p;
    }
    // At t === 1.0, return the last phase
    return this._phases[this._phases.length - 1] ?? null;
  }

  /**
   * Which phase name is the entity currently in?
   * @param {object} entity
   * @returns {string|null}
   */
  getPhase(entity) {
    const t = entity.t ?? 0;
    const phase = this.phaseAt(t);
    return phase?.name ?? null;
  }

  /** Run active phase + decorate. Fires onEnter/onExit on phase transitions. */
  update(entity, dt) {
    const t = entity.t ?? 0;
    if (this._energyFunction) entity.energy = this._energyFunction(t);

    const prev = entity._currentPhase ?? null;

    // Resolve current phase
    let phase;
    if (this._eventDriven) {
      if (!prev) {
        // First frame: start at first phase
        phase = this._phases[0];
      } else if (prev.condition && prev.condition(entity)) {
        // Condition met — transition to next
        const nextName = typeof prev.next === 'function' ? prev.next(entity) : prev.next;
        phase = this._phaseMap[nextName] ?? prev;
      } else {
        phase = prev;
      }
    } else {
      phase = this.phaseAt(t);
    }

    if (phase !== prev) {
      if (prev) prev.onExit?.(entity, entity._bounds);
      if (phase) phase.onEnter?.(entity, entity._bounds);
      entity._currentPhase = phase;
    }

    if (phase) phase.update(entity, dt, t);
    this.decorate(entity, dt);
  }

  /** Per-frame overlay: tremble, energy, particles, color.
   *  Override in subclasses. */
  decorate(entity, dt) {}

  /** Delegate draw to active phase + emotion-level custom draw. */
  draw(ctx, entity) {
    const phase = entity._currentPhase;
    if (phase?.draw) phase.draw(ctx, entity);
    if (this.customDraw) this.customDraw(ctx, entity);
  }

  // ── Blend ──

  /**
   * Blend this emotion with another.
   * @param {Emotion} other
   * @param {'interpolate'|'interleave'|'dimension'} mode
   * @param {object} [opts] — mode-specific options
   * @returns {object} — depends on mode
   */
  blend(other, mode = 'interpolate', opts = {}) {
    switch (mode) {
      case 'interpolate': return this.blendInterpolate(other, opts);
      case 'interleave':  return this.blendInterleave(other, opts);
      case 'dimension':   return this.blendByDimension(other, opts);
      default: throw new Error(`Unknown blend mode: ${mode}`);
    }
  }

  /**
   * Interpolate: run both emotions via delta-capture, lerp results.
   * Returns a per-frame function (entity, dt, bounds) => void.
   * @param {Emotion} other
   * @param {object} [opts]
   * @param {number} [opts.t=0.5] — blend weight. 0 = pure this, 1 = pure other.
   */
  blendInterpolate(other, { t = 0.5 } = {}) {
    const emoA = this, emoB = other;
    const wA = 1 - t, wB = t;

    const blended = (entity, dt, bounds) => {
      const snap = _snapshot(entity);

      emoA.update(entity, dt);
      const dA = _deltas(entity, snap);
      const colorA = entity.color;
      _restore(entity, snap);

      emoB.update(entity, dt);
      const dB = _deltas(entity, snap);
      const colorB = entity.color;
      _restore(entity, snap);

      entity.x      += dA.dx * wA  + dB.dx * wB;
      entity.y      += dA.dy * wA  + dB.dy * wB;
      entity.vx     += dA.dvx * wA + dB.dvx * wB;
      entity.vy     += dA.dvy * wA + dB.dvy * wB;
      entity.energy += dA.de * wA  + dB.de * wB;
      entity.radius += dA.dr * wA  + dB.dr * wB;
      entity.sx     += dA.dsx * wA + dB.dsx * wB;
      entity.sy     += dA.dsy * wA + dB.dsy * wB;
      entity.color   = lerpColor(colorA, colorB, t);
    };

    blended.draw = null;
    return blended;
  }

  /**
   * Interleave: run this emotion's full phase cycle, then the other's, repeat.
   * Returns a per-frame function (entity, dt, bounds) => void.
   * @param {Emotion} other
   * @param {object} [opts]
   * @param {string} [opts.colorA] — hex color while this is active
   * @param {string} [opts.colorB] — hex color while other is active
   */
  blendInterleave(other, opts = {}) {
    const emoA = this, emoB = other;
    const ID = '_ilBlend';

    const interleaved = (entity, dt, bounds) => {
      if (!entity[ID] || entity[ID]._a !== emoA || entity[ID]._b !== emoB) {
        entity[ID] = { _a: emoA, _b: emoB, active: 'a', firstPhase: null, leftFirst: false };
      }

      const st = entity[ID];
      const emo   = st.active === 'a' ? emoA : emoB;
      const idle  = st.active === 'a' ? emoB : emoA;

      if (idle.release) idle.release(entity);

      emo.update(entity, dt);

      const currentPhase = emo.getPhase?.(entity);
      if (st.firstPhase == null && currentPhase != null) {
        st.firstPhase = currentPhase;
        st.leftFirst = false;
      } else if (st.firstPhase != null) {
        if (currentPhase !== st.firstPhase) {
          st.leftFirst = true;
        } else if (st.leftFirst) {
          if (emo.release) emo.release(entity);
          st.active = st.active === 'a' ? 'b' : 'a';
          st.firstPhase = null;
          st.leftFirst = false;
        }
      }

      if (opts.colorA && opts.colorB) {
        const target = st.active === 'a' ? opts.colorA : opts.colorB;
        entity.color = lerpColor(entity.color || target, target, 1 - Math.exp(-8 * dt));
      }
    };

    interleaved.draw = null;
    return interleaved;
  }

  /**
   * Dimension blend: cherry-pick structural components from each emotion.
   * Returns a new Emotion instance (construction-time, not per-frame).
   * @param {Emotion} other
   * @param {object} [choices] — maps dimension name → 'a' or 'b' (default 'a')
   *   { phases, energyFunction, exaggeration, customDraw }
   */
  blendByDimension(other, choices = {}) {
    const pick = (dim) => (choices[dim] ?? 'a') === 'a' ? this : other;

    return new Emotion(pick('phases')._phases, {
      energyFunction: pick('energyFunction')._energyFunction,
      exaggeration:   pick('exaggeration')._exaggeration,
      customDraw:     pick('customDraw').customDraw,
    });
  }
}

// ── snapshot / delta helpers (module-private) ──

function _snapshot(e) {
  return {
    x: e.x, y: e.y, vx: e.vx, vy: e.vy,
    energy: e.energy, radius: e.radius,
    sx: e.sx, sy: e.sy, color: e.color,
  };
}

function _restore(e, s) {
  e.x = s.x; e.y = s.y; e.vx = s.vx; e.vy = s.vy;
  e.energy = s.energy; e.radius = s.radius;
  e.sx = s.sx; e.sy = s.sy; e.color = s.color;
}

function _deltas(e, snap) {
  return {
    dx: e.x - snap.x, dy: e.y - snap.y,
    dvx: e.vx - snap.vx, dvy: e.vy - snap.vy,
    de: e.energy - snap.energy, dr: e.radius - snap.radius,
    dsx: e.sx - snap.sx, dsy: e.sy - snap.sy,
  };
}
