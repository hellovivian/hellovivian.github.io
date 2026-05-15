// ── Dance Gesture ──
// Slide left → hop → slide right → hop.
// No hands — just lateral movement and vertical hops with squash/stretch.

import { Gesture } from '../gesture.js';
import { Phase } from '../phase.js';

// ── Helpers ──

function _smoothstep(t) {
  return t * t * (3 - 2 * t);
}

// Hop sub-shape: maps p in [0,1) to { hopY, scaleX, scaleY }.
//   0–20%: squash before takeoff, 20–50%: jump up, 50–80%: come down, 80–100%: land squash
function _hopShape(p) {
  let hopY = 0, scaleX = 1, scaleY = 1;
  if (p < 0.2) {
    const s = _smoothstep(p / 0.2);
    scaleY = 1 - s * 0.15;   // → 0.85
    scaleX = 1 + s * 0.08;   // → 1.08
  } else if (p < 0.5) {
    const s = _smoothstep((p - 0.2) / 0.3);
    hopY = -s;
    scaleY = 0.85 + s * 0.25; // → 1.10
    scaleX = 1.08 - s * 0.13; // → 0.95
  } else if (p < 0.8) {
    const s = _smoothstep((p - 0.5) / 0.3);
    hopY = -(1 - s);
    scaleY = 1.10 - s * 0.10; // → 1.0
    scaleX = 0.95 + s * 0.05; // → 1.0
  } else {
    const s = _smoothstep((p - 0.8) / 0.2);
    scaleY = 1 - (1 - s) * 0.10; // 0.90 → 1.0
    scaleX = 1 + (1 - s) * 0.05; // 1.05 → 1.0
  }
  return { hopY, scaleX, scaleY };
}

// (dance shape is now a method on Dance)

// ── Dance — MotionGesture ──

export class Dance extends Gesture {
  constructor(params = {}) {
    super('dance', {
      speed: 1.0,            // cycle speed multiplier (1.0 = 2.4s base)
      slideDistance: 1.0,    // how far to slide (multiplier on radius)
      hopHeight: 1.0,        // how high to hop (multiplier on radius)
      cycles: 'continuous',  // loops at natural rate by default
      baseCycle: 2.4,        // seconds per dance cycle
      ...params,
    });
  }

  // Composite shape → { slideX, hopY, scaleX, scaleY }
  //   0–25%: slide left,  25–50%: hop at left,  50–75%: slide right,  75–100%: hop at right
  shapeFunction(t) {
    t = t % 1;
    let slideX, hopY = 0, scaleX = 1, scaleY = 1;

    if (t < 0.25) {
      const s = _smoothstep(t / 0.25);
      slideX = 1 - s * 2;
    } else if (t < 0.50) {
      slideX = -1;
      ({ hopY, scaleX, scaleY } = _hopShape((t - 0.25) / 0.25));
    } else if (t < 0.75) {
      const s = _smoothstep((t - 0.50) / 0.25);
      slideX = -1 + s * 2;
    } else {
      slideX = 1;
      ({ hopY, scaleX, scaleY } = _hopShape((t - 0.75) / 0.25));
    }

    return { slideX, hopY, scaleX, scaleY };
  }

  update(entity, dt) {
    const p = this.params;
    this.advanceCycle(entity, dt);

    const shape = this.shapeFunction(this.cycle);

    entity._danceOffsetX = shape.slideX * entity.radius * 0.8 * p.slideDistance;
    entity._danceOffsetY = shape.hopY * entity.radius * 0.7 * p.hopHeight;
    entity._danceSquashX = shape.scaleX;
    entity._danceSquashY = shape.scaleY;
  }

  applyVisuals(entity) {
    entity.sx *= entity._danceSquashX ?? 1;
    entity.sy *= entity._danceSquashY ?? 1;
    entity.x += entity._danceOffsetX ?? 0;
    entity.y += entity._danceOffsetY ?? 0;
  }
}

// ── Secondary energy ──

export class DanceEnergy extends Phase {
  constructor() {
    super({
      shape: 'circle',
    });
  }

  update(entity, dt) {
    entity.energy += (0.8 - entity.energy) * (1 - Math.exp(-0.6 * dt));
  }
}

