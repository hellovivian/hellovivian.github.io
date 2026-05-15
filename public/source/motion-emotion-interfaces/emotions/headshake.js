// ── Head Shake Gesture ──
// Circle oscillates side-to-side with a horizontal squash, like disagreeing.
// Quick snaps left-right with a brief pause between. Entity stays in place.
// Speed parameter controls shake frequency.

import { Gesture } from '../gesture.js';

// ── Helpers ── (none — shape is now a method on HeadShake)

// ── HeadShake — MotionGesture ──

export class HeadShake extends Gesture {
  constructor(params = {}) {
    super('headshake', {
      speed: 1.0,            // cycle speed multiplier
      intensity: 1.0,        // how wide the shake goes (multiplier)
      cycles: 1,             // one-shot: plays once within state duration
      baseCycle: 1.0,        // seconds per full shake cycle
      ...params,
    });
  }

  // Decaying sine oscillation — 4 half-swings that fade out.
  //   0–80%: decaying sine,  80–100%: rest
  shapeFunction(t) {
    t = t % 1;
    if (t > 0.80) return 0;
    const s = t / 0.80;
    const decay = 1 - s * s;
    return Math.sin(s * Math.PI * 4) * decay;
  }

  update(entity, dt) {
    const p = this.params;
    this.advanceCycle(entity, dt);

    const swing = this.shapeFunction(this.cycle);
    const maxSwing = entity.radius * 0.4 * p.intensity;

    // Horizontal squash: compress scaleX, widen scaleY to conserve volume
    const absSwing = Math.abs(swing);
    entity._shakeSquashX = 1 - absSwing * 0.15 * p.intensity;
    entity._shakeSquashY = 1 + absSwing * 0.07 * p.intensity;

    // Horizontal offset
    entity._shakeOffsetX = swing * maxSwing;
  }

  applyVisuals(entity) {
    entity.sx *= entity._shakeSquashX ?? 1;
    entity.sy *= entity._shakeSquashY ?? 1;
    entity.x += entity._shakeOffsetX ?? 0;
  }
}

