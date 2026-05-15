// ── PrimaryMotion ──
// Dominant locomotion — WHERE the entity goes.
// Owns entity position/velocity. Subclasses override update() to set
// velocity or position directly (PathMotion, PinMotion, Chase, etc.).
// Default: integrate existing velocity into position (inertia).

import { Motion } from './motion.js';

export class PrimaryMotion extends Motion {
  constructor(verb) {
    super('primary', verb);
  }

  /** No-op — subclasses override to set velocity/position.
   *  Integration (x += vx*dt) is handled by Entity.step() → integrate(). */
  update(entity, dt) {}
}
