// ── Miserable (Drowning) Emotion ──
// Continuous bubble particle system — bubbles rise from the entity
// as the only sign of struggle. No gravity, no sinking physics.

import { F } from '../physics.js';
import { Phase } from '../phase.js';
import { Emotion } from '../emotion.js';

function shrink(entity, targetScale, rate, dt) {
  const target = entity.baseRadius * targetScale;
  const smooth = 1 - Math.exp(-rate * dt);
  entity.radius += (target - entity.radius) * smooth;
}

// ── Helpers ──

function _spawnBubble(entity, chance, speedRange, sizeRange) {
  if (Math.random() < chance) {
    const bubbles = (entity._bubbles ??= []);
    bubbles.push({
      x: entity.x + (Math.random() - 0.5) * entity.radius,
      y: entity.y - entity.radius,
      vy: -(speedRange[0] + Math.random() * (speedRange[1] - speedRange[0])),
      vx: (Math.random() - 0.5) * 6,
      r: sizeRange[0] + Math.random() * (sizeRange[1] - sizeRange[0]),
      life: 1.0,
    });
  }
}

function _updateBubbles(entity, dt) {
  entity.history = [];
  const bubbles = entity._bubbles;
  if (!bubbles) return;
  for (let i = bubbles.length - 1; i >= 0; i--) {
    const b = bubbles[i];
    b.x += b.vx * dt;
    b.y += b.vy * dt;
    b.vx += (Math.random() - 0.5) * 8 * dt;
    b.life -= 0.5 * dt;
    if (b.life <= 0 || b.y < 0) bubbles.splice(i, 1);
  }
}

// ── Primary phase ──

export class DrowningCycle extends Phase {
  constructor() {
    super({
      name: 'drowning',
      from: 0, to: 1,
    });
  }

  onEnter(entity) {
    const bounds = entity._bounds;
    if (bounds) {
      entity.y = bounds.top + entity.radius;
    }
    entity.vy = 0;
  }

  update(entity, dt) {
    // Sink slowly downward — drowning through water
    const sinkSpeed = 25;
    entity.vy += (sinkSpeed - entity.vy) * (1 - Math.exp(-2 * dt));
    entity.y += entity.vy * dt;

    // Pin to floor when reached
    const bounds = entity._bounds;
    if (bounds?.bottom != null) {
      const floor = bounds.bottom - entity.radius;
      if (entity.y >= floor) {
        entity.y = floor;
        entity.vy = 0;
      }
    }

    _spawnBubble(entity, 0.25, [20, 40], [1, 3.5]);
    _updateBubbles(entity, dt);
  }
}

// ── Secondary phases ──

export class DrowningEnergy extends Phase {
  constructor() {
    super({
      shape: 'circle',
    });
  }

  update(entity, dt) {
    entity.energy += (0.4 - entity.energy) * (1 - Math.exp(-0.3 * dt));
  }
}

export class DrowningShrink extends Phase {
  constructor() {
    super({
      shape: 'circle',
    });
  }

  update(entity, dt) {
    shrink(entity, 0.25, 1.5, dt);
  }
}

// ── Emotion ──

const _cycle = new DrowningCycle();
const _energy = new DrowningEnergy();
const _shrink = new DrowningShrink();

export const miserableDrowningPrimary = new Emotion(
  [new DrowningCycle()],
  {
    draw: (ctx, entity) => {
      const bubbles = entity._bubbles;
      if (!bubbles) return;
      for (const b of bubbles) {
        ctx.globalAlpha = b.life * 0.35;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.strokeStyle = entity.color;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    },
  },
);

// Backward-compatible export
export const miserableDrowning = new Emotion({
  phases: { drowning: _cycle },
  secondary: [_energy, _shrink],
  channel: 'secondary',
  shape: 'circle',
  boundary: 0,
  draw: (ctx, entity) => {
    const bubbles = entity._bubbles;
    if (!bubbles) return;
    for (const b of bubbles) {
      ctx.globalAlpha = b.life * 0.35;
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.strokeStyle = entity.color;
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  },
});
