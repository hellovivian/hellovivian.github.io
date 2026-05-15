// ── Frustration ──
// Sisyphean diagonal climb: entity pushes up a slope, slides back,
// retries with less energy, and eventually stalls near the bottom.

import { Phase } from '../phase.js';
import { Emotion } from '../emotion.js';

const SLOPE_ANGLE = Math.PI / 5;        // ~36° incline
const SLOPE_COS = Math.cos(SLOPE_ANGLE);
const SLOPE_SIN = Math.sin(SLOPE_ANGLE);
const GRAVITY_ALONG = 50;               // constant pull down-slope
const DRAG = 3.0;                       // velocity damping
const TREMOR_FREQ = 18;                 // effort tremor speed
const TREMOR_AMP = 1.5;                 // effort tremor size (perpendicular to slope)

class FrustrationEmotion extends Emotion {
  constructor(phases, opts = {}) {
    super(phases, opts);
  }

  decorate(entity, dt) {
    // Gravity along slope (pulls toward bottom-left)
    entity.vx -= GRAVITY_ALONG * SLOPE_COS * dt;
    entity.vy += GRAVITY_ALONG * SLOPE_SIN * dt;

    // Drag
    entity.vx *= Math.exp(-DRAG * dt);
    entity.vy *= Math.exp(-DRAG * dt);

    // Effort tremor perpendicular to slope
    entity._tremorT = (entity._tremorT ?? 0) + dt;
    const nrg = entity.energy ?? 0.5;
    const perp = Math.sin(entity._tremorT * TREMOR_FREQ) * TREMOR_AMP * nrg;
    entity.x += perp * SLOPE_SIN;
    entity.y += perp * SLOPE_COS;

    // Clamp inside bounds
    const b = entity._bounds;
    if (b) {
      const r = entity.radius;
      entity.x = Math.max(b.left + r, Math.min(b.right - r, entity.x));
      entity.y = Math.max(b.top + r, Math.min(b.bottom - r, entity.y));
    }

    entity._skipBoundary = true;
  }
}

// Helper: push entity up-slope for one phase
function climbUpdate(effort) {
  return function (entity, dt) {
    const push = effort * 120;
    entity.vx += push * SLOPE_COS * dt;
    entity.vy -= push * SLOPE_SIN * dt;
  };
}

export const frustration = new FrustrationEmotion([
  // ── Climb: push hard up-slope ──
  new Phase({
    name: 'climb',
    from: 0, to: 0.4,
    onEnter(entity) {
      const b = entity._bounds;
      if (b) {
        entity.x = b.left + (b.right - b.left) * 0.25;
        entity.y = b.bottom - (b.bottom - b.top) * 0.25;
      }
      entity.vx = 0;
      entity.vy = 0;
    },
    update: climbUpdate(1.0),
  }),

  // ── Slide: gravity wins, entity falls back down-slope ──
  new Phase({
    name: 'slide',
    from: 0.4, to: 0.6,
    update(entity, dt) {
      // No push — just let gravity in decorate pull it back
    },
  }),

  // ── Retry: weaker second attempt ──
  new Phase({
    name: 'retry',
    from: 0.6, to: 0.85,
    update: climbUpdate(0.5),
  }),

  // ── Stall: barely moving, tremor only ──
  new Phase({
    name: 'stall',
    from: 0.85, to: 1.0,
    update(entity, dt) {
      // No push — sits near bottom with residual tremor from decorate
    },
  }),
], {
  energyFunction: t => {
    if (t < 0.4) return 0.9 - 0.2 * (t / 0.4);
    if (t < 0.6) return 0.7 - 0.2 * ((t - 0.4) / 0.2);
    if (t < 0.85) return 0.5 - 0.15 * ((t - 0.6) / 0.25);
    return 0.35 - 0.05 * ((t - 0.85) / 0.15);
  },
});
