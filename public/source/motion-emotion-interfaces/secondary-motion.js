// ── SecondaryMotion ──
// What happens TO the entity (appearance, internal state).
// Subclasses manage their own timing on the entity (e.g. entity._trembleT).

import { Motion } from './motion.js';

export class SecondaryMotion extends Motion {
  _exaggeration = 0.5;

  constructor(verb) {
    super('secondary', verb);
  }
}
