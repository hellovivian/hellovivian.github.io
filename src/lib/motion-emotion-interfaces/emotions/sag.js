// ── Sag Gesture ──
// Circle droops downward and squashes — a heavy, melting deformation.
// Matches the miserable emotion's visual but as a cycleable gesture.
// Speed parameter controls cycle frequency.

import { Gesture } from '../gesture.js';

// ── Sag — MotionGesture ──

export class Sag extends Gesture {
  constructor(params = {}) {
    super('sag', {
      speed: 1.0,            // cycle speed multiplier
      depth: 1.0,            // how deep the sag goes (multiplier)
      cycles: 1,             // one-shot by default
      baseCycle: 2.0,        // seconds per sag cycle
      ...params,
    });
  }

  // Smooth settle and release cycle.
  //   0–35%: settle (smoothstep down),  35–60%: hold,  60–85%: release,  85–100%: rest
  shapeFunction(t) {
    t = t % 1;
    if (t < 0.35) {
      const s = t / 0.35;
      return s * s * (3 - 2 * s);
    } else if (t < 0.60) {
      return 1;
    } else if (t < 0.85) {
      const s = (t - 0.60) / 0.25;
      return 1 - s * s * (3 - 2 * s);
    }
    return 0;
  }

  update(entity, dt) {
    const p = this.params;
    this.advanceCycle(entity, dt);

    const sag = this.shapeFunction(this.cycle);

    // Vertical squash + horizontal bulge (volume conservation)
    entity._sagSquashY = 1 - sag * 0.3 * p.depth;
    entity._sagSquashX = 1 + sag * 0.15 * p.depth;

    // Shift center downward as the circle droops
    entity._sagOffsetY = sag * entity.radius * 0.25 * p.depth;
  }

  cleanup(entity) {
    entity._sag = null;
    entity._sagPose = null;
    entity._sagSquashX = undefined;
    entity._sagSquashY = undefined;
    entity._sagOffsetY = undefined;
  }

  applyVisuals(entity) {
    entity.sx *= entity._sagSquashX ?? 1;
    entity.sy *= entity._sagSquashY ?? 1;
    entity.y += entity._sagOffsetY ?? 0;
  }
}

