// ── Tremble Gesture ──
// Rapid dual-axis sinusoidal shake around a pinned position.
// Naturally continuous — fear, cold, suppressed rage, anticipation.
// Speed parameter controls shake frequency, depth controls amplitude.

import { Gesture } from '../gesture.js';

// ── Tremble — Gesture ──

export class TrembleGesture extends Gesture {
  constructor(params = {}) {
    super('tremble', {
      speed: 1.0,            // frequency multiplier
      depth: 1.0,            // amplitude multiplier
      cycles: 'continuous',  // loops at natural rate by default
      ...params,
    });
  }

  // Dual-axis sinusoidal shake → { x, y }
  //   freq and phase produce two out-of-phase sine waves for organic jitter.
  shapeFunction(t, freq, phase) {
    const w = freq * Math.PI * 2;
    return {
      x: Math.sin(t * w + phase),
      y: Math.sin(t * w * 1.17 + phase + 2.1),
    };
  }

  update(entity, dt) {
    const p = this.params;

    if (entity._trembleGesture == null) {
      entity._trembleGesture = {
        phase: Math.random() * Math.PI * 2,
        t: 0,
      };
      entity._tremblePose = 'trembling';
    }

    const speedScale = (entity._gestureSpeedScale ?? 1) * p.speed;

    if (this.cycles !== 'continuous' && entity._stateDuration > 0) {
      entity._trembleGesture.t = entity.t * entity._stateDuration;
      const cycleT = (entity.t * this.cycles) % 1;
      entity._trembleGesture.envelope = cycleT < 0.85 ? 1 : 1 - ((cycleT - 0.85) / 0.15);
    } else {
      entity._trembleGesture.t += dt;
      entity._trembleGesture.envelope = 1;
    }

    const t = entity._trembleGesture.t;
    const freq = 18 * speedScale;
    const amp = 2.5 * p.depth * entity._trembleGesture.envelope;
    const phase = entity._trembleGesture.phase;
    const shape = this.shapeFunction(t, freq, phase);

    entity._trembleOffsetX = shape.x * amp;
    entity._trembleOffsetY = shape.y * amp;
  }

  cleanup(entity) {
    entity._trembleGesture = null;
    entity._tremblePose = null;
    entity._trembleOffsetX = 0;
    entity._trembleOffsetY = 0;
  }

  applyVisuals(entity) {
    entity.x += entity._trembleOffsetX ?? 0;
    entity.y += entity._trembleOffsetY ?? 0;
  }
}

