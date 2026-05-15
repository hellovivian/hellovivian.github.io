// ── Fear ──
// Flee from target then freeze trembling in place.
// High arousal, negative valence — reactive dread.

import { Phase } from '../phase.js';
import { Emotion } from '../emotion.js';

const TREMBLE_AMP = 2.5;
const TREMBLE_FREQ = 18;

class FearEmotion extends Emotion {
  constructor(phases, opts = {}) {
    super(phases, opts);
  }

  decorate(entity, dt) {
    // Subtle global jitter scaled by energy
    if (entity._tremblePhase == null) {
      entity._tremblePhase = Math.random() * Math.PI * 2;
      entity._trembleT = 0;
    }
    entity._trembleT += dt;
    const nrg = entity.energy ?? 1;
    const amp = TREMBLE_AMP * 0.15 * (0.3 + 0.7 * nrg);
    const w = TREMBLE_FREQ * Math.PI * 2;
    entity.x += Math.sin(entity._trembleT * w + entity._tremblePhase) * amp;
    entity.y += Math.sin(entity._trembleT * w * 1.17 + entity._tremblePhase + 2.1) * amp;
  }
}

/** The entity bolts away from its target with proximity-scaled
 * panic, then freezes in place shaking frantically — a nervous,
 * reactive dread that never fully resolves. */
export const fear = new FearEmotion([
  new Phase({
    name: 'flee',
    description: 'Bolting away from target with proximity-scaled panic',
    from: 0, to: 0.7,
    update(entity, dt) {
      const tgt = entity._target;
      if (!tgt) return;
      const dx = entity.x - tgt.x;
      const dy = entity.y - tgt.y;
      const dist = Math.hypot(dx, dy) || 1;
      const nx = dx / dist;
      const ny = dy / dist;
      const proximity = Math.max(0, 1 - dist / 300);
      const nrg = entity.energy ?? 1;
      const speed = (120 + proximity * 280) * (0.4 + 0.6 * nrg);
      entity.vx += nx * speed * dt;
      entity.vy += ny * speed * dt;
      entity.vx *= Math.exp(-1.5 * dt);
      entity.vy *= Math.exp(-1.5 * dt);
    },
  }),
  new Phase({
    name: 'tremble',
    description: 'Frozen in place, shaking frantically with dread',
    from: 0.7, to: 1.0,
    onEnter(entity) {
      entity._pinAnchorX = entity.x;
      entity._pinAnchorY = entity.y;
    },
    update(entity, dt) {
      entity.x = entity._pinAnchorX;
      entity.y = entity._pinAnchorY;
      entity.vx = 0;
      entity.vy = 0;
      // Intense tremble layered on decorate's subtle jitter
      const nrg = entity.energy ?? 1;
      const amp = TREMBLE_AMP * (0.3 + 0.7 * nrg);
      const w = TREMBLE_FREQ * Math.PI * 2;
      if (entity._trembleT == null) entity._trembleT = 0;
      entity.x += Math.sin(entity._trembleT * w + (entity._tremblePhase ?? 0)) * amp;
      entity.y += Math.sin(entity._trembleT * w * 1.17 + (entity._tremblePhase ?? 0) + 2.1) * amp;
    },
  }),
], {
  energyFunction: t => {
    if (t < 0.7) return 1.0 - 0.4 * (t / 0.7);
    return 0.3 + 0.3 * ((t - 0.7) / 0.3);
  },
});
