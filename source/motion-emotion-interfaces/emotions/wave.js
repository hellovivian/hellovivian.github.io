// ── Wave Emotion ──
// Spawns a hand particle that oscillates on an invisible arm,
// matching the asymmetric keyframe pattern from wave.html.
// Speed parameter controls cycle frequency (more speed = more intense).

import { Gesture } from '../gesture.js';

// ── Helpers ── (none — shape is now a method on Wave)

// ── Wave — MotionGesture ──

export class Wave extends Gesture {
  constructor(params = {}) {
    super('wave', {
      speed: 1.0,            // cycle speed multiplier (1.0 = 1.4s base)
      amplitude: 1.0,        // arc size multiplier
      armLength: 1.0,        // arm reach as fraction of entity radius
      cycles: 'continuous',  // loops at natural rate by default
      baseCycle: 1.4,        // seconds per wave cycle
      ...params,
    });
  }

  // Smooth sine wave confined to [0, 1]
  shapeFunction(t) {
    return (Math.sin(t * Math.PI * 2) + 1) * 0.5;
  }

  update(entity, dt) {
    const p = this.params;
    this.advanceCycle(entity, dt);

    const hand = entity.hands.right;
    hand.visible = true;

    // Arm attachment: right side of body
    const armLen = entity.radius * 1.3 * p.armLength;
    const halfArc = (35 * p.amplitude) * (Math.PI / 180); // base 35 deg from wave.html
    const waveArc = this.shapeFunction(this.cycle);
    const angle = waveArc * halfArc;

    hand.x = entity.x + Math.cos(angle) * armLen;
    hand.y = entity.y - Math.sin(angle) * armLen;
  }

  cleanup(entity) {
    entity.restHands();
  }
}

