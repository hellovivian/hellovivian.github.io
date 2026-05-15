// ── Nod Gesture ──
// Circle compresses vertically in a rhythmic dip, like agreeing.
// A subtle downward squash-and-return cycle. Entity stays in place.
// Speed parameter controls nod frequency.

import { Gesture } from '../gesture.js';

// ── Helpers ── (none — shape is now a method on Nod)

// ── Nod — MotionGesture ──

export class Nod extends Gesture {
  constructor(params = {}) {
    super('nod', {
      speed: 1.0,            // cycle speed multiplier (1.0 = ~1.2 nods/s)
      depth: 1.0,            // how deep the dip goes (multiplier)
      cycles: 1,             // one-shot: plays once within state duration
      baseCycle: 0.8,        // seconds per nod cycle
      ...params,
    });
  }

  // Decaying sine, rectified so dips are always downward.
  //   0–75%: 2 rectified bumps with linear fade,  75–100%: rest
  shapeFunction(t) {
    t = t % 1;
    if (t > 0.75) return 0;
    const s = t / 0.75;
    const decay = 1 - s;
    return Math.abs(Math.sin(s * Math.PI * 2)) * decay;
  }

  update(entity, dt) {
    if (this._wait && entity._stateElapsed < this._wait) return;
    const p = this.params;
    this.advanceCycle(entity, dt);

    const accel = this._accelerationFn ? this._accelerationFn(this.t) : 1;
    const raw = this.shapeFunction(this.cycle);
    const dip = this._easing ? this._easing(raw) : raw;

    const exag = 1 + this._exaggeration;
    // Decay envelope for finite cycles
    const envelope = this.cycles !== 'continuous'
      ? 1 - 0.3 * (this.cycle / this.cycles)
      : 1;

    const amp = dip * exag * envelope * accel;
    const maxDip = entity.radius * 0.25 * p.depth;

    // Vertical squash: compress scaleY, widen scaleX to conserve volume
    entity._nodSquashY = 1 - amp * 0.25 * p.depth;
    entity._nodSquashX = 1 + amp * 0.12 * p.depth;

    // Shift center downward as the circle compresses
    entity._nodOffsetY = amp * maxDip;
  }

  applyVisuals(entity) {
    entity.sx *= entity._nodSquashX ?? 1;
    entity.sy *= entity._nodSquashY ?? 1;
    entity.y += entity._nodOffsetY ?? 0;
  }

  cleanup(entity) {
    entity._nodOffsetY = null;
    entity._nodSquashX = null;
    entity._nodSquashY = null;
    entity.sx = 1;
    entity.sy = 1;
  }
}

