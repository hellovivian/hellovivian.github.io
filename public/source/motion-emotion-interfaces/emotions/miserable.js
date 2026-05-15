// ── Miserable ──
// Heavy collapse: sag → sink to floor → press against bottom with
// occasional failed attempts to rise.
//
// Improvements:
// (1) Exaggerated gravity, damping, and deformation
// (2) Sinks to the floor and stays — the bottom wall becomes ground
// (3) Deformation pushed further, entity shrinks under its own weight
// (4) Stillness punctuated by tiny failed rises that collapse back

import { Phase } from '../phase.js';
import { Emotion } from '../emotion.js';

const GRAVITY = 60;
const HEAVY_DRAG_X = 6.0;
const HEAVY_DRAG_Y = 3.0;
const RISE_ATTEMPT_SPEED = -45;
const RISE_COLLAPSE_RATE = 8;

class MiserableEmotion extends Emotion {
  constructor(phases, opts = {}) {
    super(phases, opts);
  }

  decorate(entity, dt) {
    // Heavy horizontal damping — barely drifts sideways
    entity.vx *= Math.exp(-HEAVY_DRAG_X * dt);
    // Vertical damping weaker so gravity pulls it down
    entity.vy *= Math.exp(-HEAVY_DRAG_Y * dt);
    // Constant downward weight
    entity.vy += GRAVITY * dt;

    // Shrink under weight — entity gets smaller as energy drops
    const nrg = entity.energy ?? 0.4;
    entity.radius = entity.baseRadius * (0.65 + 0.35 * nrg);
  }
}

export const miserable = new MiserableEmotion([
  new Phase({
    name: 'settle',
    description: 'Circle deforms into a sagged blob while sinking — weight takes over',
    from: 0, to: 0.3,
    update(entity, dt, t) {
      const pt = t / 0.3;
      // easeInCubic — starts slow, accelerates like collapsing
      const ease = pt * pt * pt;
      entity._deformT = ease;
    },
  }),
  new Phase({
    name: 'sink',
    description: 'Fully sagged, sinking to the floor under gravity',
    from: 0.3, to: 0.55,
    update(entity, dt, t) {
      entity._deformT = 1.0;
      // Extra gravity to reach the floor
      entity.vy += 40 * dt;

      // Settle against the bottom — if on floor, stop bouncing
      const bounds = entity._bounds;
      if (bounds?.bottom != null) {
        const floor = bounds.bottom - entity.radius;
        if (entity.y >= floor - 2) {
          entity.y = floor;
          entity.vy = Math.min(entity.vy, 0) * 0.1;
        }
      }
    },
  }),
  new Phase({
    name: 'floor',
    description: 'Pressed against the bottom — occasional failed attempts to rise',
    from: 0.55, to: 1.0,
    onEnter(entity) {
      entity._riseTimer = 0;
      entity._riseState = 'waiting';
      entity._riseCount = 0;
    },
    update(entity, dt, t) {
      entity._deformT = 1.0;

      // Pin to floor
      const bounds = entity._bounds;
      if (bounds?.bottom != null) {
        const floor = bounds.bottom - entity.radius;
        if (entity.y < floor) {
          entity.vy += 80 * dt;
        } else {
          entity.y = floor;
          entity.vy = Math.min(entity.vy, 0) * 0.05;
        }
      }

      // Slow drift toward center-x (doesn't even have the energy to pick a corner)
      if (bounds) {
        const cx = (bounds.left + bounds.right) / 2;
        entity.vx += (cx - entity.x) * 0.1 * dt;
      }

      // Failed rise attempts
      entity._riseTimer = (entity._riseTimer ?? 0) + dt;

      if (entity._riseState === 'waiting') {
        // Wait 0.6-1.0s between attempts, fewer over time
        const waitTime = 0.6 + entity._riseCount * 0.3;
        if (entity._riseTimer > waitTime && entity._riseCount < 3) {
          entity._riseState = 'rising';
          entity._riseTimer = 0;
          // Tiny upward impulse
          entity.vy = RISE_ATTEMPT_SPEED * (1 - entity._riseCount * 0.3);
          // Briefly un-sag slightly — hope
          entity._riseDeformSnap = entity._deformT;
        }
      } else if (entity._riseState === 'rising') {
        // The rise immediately fails — collapse back
        entity._riseTimer += dt;
        const collapse = Math.min(entity._riseTimer * RISE_COLLAPSE_RATE, 1);

        // Deform snaps back to sag quickly
        entity._deformT = (entity._riseDeformSnap ?? 1) * (1 - 0.3 * (1 - collapse))
          + 1.0 * 0.3 * (1 - collapse) + collapse;
        entity._deformT = Math.min(entity._deformT, 1.0);

        // Heavy gravity pulls it back down fast
        entity.vy += 120 * dt;

        if (collapse >= 1) {
          entity._riseState = 'waiting';
          entity._riseTimer = 0;
          entity._riseCount = (entity._riseCount ?? 0) + 1;
          entity._deformT = 1.0;
        }
      }
    },
  }),
], {
  energyFunction: t => {
    if (t < 0.3) return 0.4 - 0.15 * (t / 0.3);
    if (t < 0.55) return 0.25 - 0.1 * ((t - 0.3) / 0.25);
    return 0.15;
  },
});
