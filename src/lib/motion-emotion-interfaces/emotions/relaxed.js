// ── Relaxed ──
// Lemniscate (figure-8) drift with gentle breathing.
// Low arousal, positive valence — calm and steady.

import { Phase } from '../phase.js';
import { Emotion } from '../emotion.js';

/** The entity traces a lazy figure-8 through the canvas center,
 * breathing slowly — radius pulsing in a soft sine. The first
 * half eases into the drift, the second holds the steady loop. */
export const relaxed = new Emotion([
  new Phase({
    name: 'easeIn',
    description: 'Gently accelerating into the lemniscate drift, breathing deepening as the entity finds its rhythm',
    from: 0, to: 0.3,
    update(entity, dt, t) {
      const b = entity._bounds;
      const cx = (b.left + b.right) / 2;
      const cy = (b.top + b.bottom) / 2;
      const rx = (b.right - b.left) * 0.38;
      const ry = (b.bottom - b.top) * 0.32;

      const ramp = t / 0.3;
      entity._driftT = (entity._driftT ?? 0) + 1.6 * ramp * dt;
      const s = Math.sin(entity._driftT), c = Math.cos(entity._driftT), d = 1 + s * s;
      const tx = cx + (rx * c) / d;
      const ty = cy + (ry * s * c) / d;

      entity.vx += (tx - entity.x) * 8 * dt;
      entity.vy += (ty - entity.y) * 8 * dt;
      entity.vx *= Math.exp(-4 * dt);
      entity.vy *= Math.exp(-4 * dt);

      // Breathing
      entity._breathPhase = (entity._breathPhase ?? 0) + dt;
      entity.radius = entity.baseRadius * (0.96 + Math.sin(entity._breathPhase) * 0.04 * ramp);
    },
  }),
  new Phase({
    name: 'drift',
    description: 'Steady lemniscate loop with full breathing — calm, unhurried, settled into the rhythm',
    from: 0.3, to: 1.0,
    update(entity, dt) {
      const b = entity._bounds;
      const cx = (b.left + b.right) / 2;
      const cy = (b.top + b.bottom) / 2;
      const rx = (b.right - b.left) * 0.38;
      const ry = (b.bottom - b.top) * 0.32;

      entity._driftT = (entity._driftT ?? 0) + 1.6 * dt;
      const s = Math.sin(entity._driftT), c = Math.cos(entity._driftT), d = 1 + s * s;
      const tx = cx + (rx * c) / d;
      const ty = cy + (ry * s * c) / d;

      entity.vx += (tx - entity.x) * 8 * dt;
      entity.vy += (ty - entity.y) * 8 * dt;
      entity.vx *= Math.exp(-4 * dt);
      entity.vy *= Math.exp(-4 * dt);

      // Breathing
      entity._breathPhase = (entity._breathPhase ?? 0) + dt;
      entity.radius = entity.baseRadius * (0.96 + Math.sin(entity._breathPhase) * 0.04);
    },
  }),
], {
  energyFunction: t => {
    if (t < 0.3) return 0.6 + 0.2 * (t / 0.3);
    return 0.8;
  },
});
