// ── Ecstatic ──
// Explosive euphoria that fills the entire space.
// High arousal, positive valence — can't contain itself.
//
// Improvements:
// (1) Exaggerated size growth, pulsing, and bounce heights
// (2) Ricochets off walls and ceiling — uses the whole space
// (3) Entity swells dramatically — grows 50% bigger
// (4) Brief moment of stillness before the explosion

import { Phase } from '../phase.js';
import { Emotion } from '../emotion.js';

const JITTER_FREQ = 14;
const PULSE_AMP = 0.28;
const LAUNCH_SPEED = 520;
const GRAVITY = 650;
const WALL_RESTITUTION = 0.85;

class EcstaticEmotion extends Emotion {
  constructor(phases, opts = {}) {
    super(phases, opts);
  }

  decorate(entity, dt) {
    entity._ecPulseT = (entity._ecPulseT ?? 0) + dt;
    const nrg = entity.energy ?? 1;

    // Size pulsing — fast and exaggerated
    const pulse = 1 + PULSE_AMP * nrg * Math.sin(entity._ecPulseT * JITTER_FREQ * Math.PI * 2);
    const swell = entity._ecSwell ?? 1;
    entity.radius = entity.baseRadius * pulse * swell;

    // Lateral jitter — erratic shake
    const jx = Math.sin(entity._ecPulseT * 37.3) + 0.5 * Math.sin(entity._ecPulseT * 61.7);
    entity.x += jx * 2.5 * nrg;
  }

  cleanup(entity) {
    entity._ecPulseT = null;
    entity._ecGroundY = null;
    entity._ecSwell = null;
    entity._ecPrevY = null;
    entity._ecWallHits = null;
  }
}

/** Brief swell of realization, then explosive ricocheting that
 *  fills the whole space, bouncing off every wall. */
export const ecstatic = new EcstaticEmotion([
  new Phase({
    name: 'spark',
    description: 'Moment of stillness — swelling with disbelief before the explosion',
    from: 0, to: 0.08,
    onEnter(entity) {
      entity._ecSwell = 1.0;
      entity._ecWallHits = 0;
      entity.vx = 0;
      entity.vy = 0;
      entity._ecPrevY = entity.y;
    },
    update(entity, dt, t) {
      const pt = t / 0.08;
      // Swell up during spark — building energy
      entity._ecSwell = 1.0 + 0.5 * pt * pt;
      // Freeze in place, slight upward lift
      entity.vx *= 0.01;
      entity.vy *= 0.01;
      entity.y -= 8 * dt * pt;
    },
  }),
  new Phase({
    name: 'burst',
    description: 'Explosive ricocheting — bounces off walls, ceiling, floor, fills the space',
    from: 0.08, to: 0.72,
    onEnter(entity, bounds) {
      entity._ecGroundY = bounds ? bounds.bottom : entity.y + 100;
      // Launch upward and sideways
      const dir = Math.random() > 0.5 ? 1 : -1;
      entity.vx = dir * LAUNCH_SPEED * (0.4 + Math.random() * 0.6);
      entity.vy = -LAUNCH_SPEED * (0.7 + Math.random() * 0.3);
      entity._ecSwell = 1.5;
      entity._ecWallHits = 0;
    },
    update(entity, dt, t) {
      const bounds = entity._bounds;

      // Gravity pulls down
      entity.vy += GRAVITY * dt;

      // Move
      entity.x += entity.vx * dt;
      entity.y += entity.vy * dt;

      // Bounce off all walls with high restitution
      if (bounds) {
        const r = entity.radius;

        if (bounds.left != null && entity.x - r < bounds.left) {
          entity.x = bounds.left + r;
          entity.vx = Math.abs(entity.vx) * WALL_RESTITUTION;
          entity._ecWallHits = (entity._ecWallHits ?? 0) + 1;
          // Each wall hit adds a burst of upward energy
          entity.vy -= 80;
        }
        if (bounds.right != null && entity.x + r > bounds.right) {
          entity.x = bounds.right - r;
          entity.vx = -Math.abs(entity.vx) * WALL_RESTITUTION;
          entity._ecWallHits = (entity._ecWallHits ?? 0) + 1;
          entity.vy -= 80;
        }
        if (bounds.top != null && entity.y - r < bounds.top) {
          entity.y = bounds.top + r;
          entity.vy = Math.abs(entity.vy) * WALL_RESTITUTION;
          entity._ecWallHits = (entity._ecWallHits ?? 0) + 1;
        }
        if (bounds.bottom != null && entity.y + r > bounds.bottom) {
          entity.y = bounds.bottom - r;
          entity.vy = -Math.abs(entity.vy) * WALL_RESTITUTION;
          entity._ecWallHits = (entity._ecWallHits ?? 0) + 1;
          // Floor bounce relaunches with sideways energy
          entity.vx += (Math.random() - 0.5) * 200;
        }
      }

      // Swell stays high during burst, slight pulse on wall hits
      const hitBoost = Math.min((entity._ecWallHits ?? 0) * 0.03, 0.15);
      entity._ecSwell = 1.45 + hitBoost;

      // Derive vy for squash-and-stretch
      entity._ecPrevY = entity.y;

      // Skip normal boundary enforcement — we handle it here
      entity._skipBoundary = true;
    },
  }),
  new Phase({
    name: 'flutter',
    description: 'Settling into bouncy hops — still huge and buzzing',
    from: 0.72, to: 1.0,
    onEnter(entity, bounds) {
      entity._ecGroundY = bounds ? bounds.bottom - entity.radius - 1 : entity.y;
      // Keep horizontal momentum but cap it
      entity.vx = Math.sign(entity.vx) * Math.min(Math.abs(entity.vx), 120);
    },
    update(entity, dt, t) {
      const flutterT = (t - 0.72) / 0.28;
      const bounds = entity._bounds;
      const groundY = bounds ? bounds.bottom - entity.radius : (entity._ecGroundY ?? entity.y);

      // Gravity + floor bouncing with decay
      entity.vy += 500 * dt;
      entity.x += entity.vx * dt;
      entity.y += entity.vy * dt;

      // Floor bounce with decreasing energy
      if (entity.y > groundY) {
        entity.y = groundY;
        const decay = 1 - flutterT;
        entity.vy = -Math.abs(entity.vy) * 0.6 * decay;
      }

      // Side wall bouncing
      if (bounds) {
        const r = entity.radius;
        if (bounds.left != null && entity.x - r < bounds.left) {
          entity.x = bounds.left + r;
          entity.vx = Math.abs(entity.vx) * 0.7;
        }
        if (bounds.right != null && entity.x + r > bounds.right) {
          entity.x = bounds.right - r;
          entity.vx = -Math.abs(entity.vx) * 0.7;
        }
      }

      // Horizontal drag
      entity.vx *= Math.exp(-1.5 * dt);

      // Swell gradually returns toward normal
      entity._ecSwell = 1.5 - 0.4 * flutterT;

      entity._skipBoundary = true;
      entity._ecPrevY = entity.y;
    },
  }),
], {
  energyFunction: t => {
    if (t < 0.08) return 0.8 + 0.2 * (t / 0.08);
    if (t < 0.72) return 1.0;
    return 1.0 - 0.25 * ((t - 0.72) / 0.28);
  },
});
