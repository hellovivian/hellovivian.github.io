// ── Gesture ──
// A parameterized motion with update(entity, dt).
// Owns its own cycle/progress, derived from entity._stateElapsed
// (follows the PathMotion pattern — the motion owns t, not the entity).
//
// Extends Motion directly (not SecondaryMotion) so gestures inherit
// adverb composition channels (setSpeed, setEasing, etc.) from Motion.

import { Motion } from './motion.js';

export class Gesture extends Motion {
  _exaggeration = 0.5;   // carried over from SecondaryMotion for adverb compat

  constructor(name, params = {}) {
    super('secondary', name);
    this.params = params;
    this.baseCycle = params.baseCycle ?? 1.0;   // seconds per cycle
    this.cycles = params.cycles ?? 1;           // count or 'continuous'
    this.defaultCycles = this.cycles;           // original value for UI reset
    this.t = 0;       // progress [0,1] for finite gestures
    this.cycle = 0;   // running cycle position (consumed by shape functions)
    this.done = false;
  }

  /**
   * Advance cycle from entity's elapsed clock.
   * Call at the start of update().
   *
   * Finite:     t ∈ [0,1], cycle = t * cycles → shape functions get cycle count.
   * Continuous:  cycle accumulates unboundedly → shape functions use cycle % 1.
   */
  advanceCycle(entity, dt) {
    const speedScale = (entity._gestureSpeedScale ?? 1) * (this.params.speed ?? 1);
    const elapsed = entity._stateElapsed ?? 0;

    if (this.cycles !== 'continuous') {
      const duration = (this.baseCycle * this.cycles) / speedScale;
      this.t = duration > 0 ? Math.min(elapsed / duration, 1) : 0;
      this.cycle = this.t * this.cycles;
      this.done = this.t >= 1;
    } else {
      this.cycle = (elapsed / this.baseCycle) * speedScale;
      this.t = this.cycle;
      this.done = false;
    }
  }

  /**
   * Shape function — maps normalized cycle time t to a gesture-specific value.
   * Subclasses must override this.
   * @param {number} t — cycle position (may exceed 1 for continuous gestures)
   * @returns {number|object} — shape amplitude or composite shape data
   */
  shapeFunction(t) {
    throw new Error(`${this.constructor.name}.shapeFunction() not implemented`);
  }

  update(entity, dt) {
    throw new Error(`${this.constructor.name}.update() not implemented`);
  }

  /** Override to clear spawned particles/state when gesture ends. */
  cleanup(entity) {}
}
