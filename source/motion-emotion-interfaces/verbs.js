// ── Verb Registry ──
// Registers all verb classes into MotionRegistry.
// New verbs come from motion_vocabulary/generated_verbs.js.

import { MotionRegistry } from './motion-registry.js';
import { GENERATED_VERB_CLASSES } from '../motion_vocabulary/generated_verbs.js';
import { Arc } from './solo-verbs.js';
import { PathMotion } from './path-motion.js';

/** PathMotion wrapper for user-drawn paths — matches (path, duration) calling convention. */
export class UserDrawnPath extends PathMotion {
  constructor(path, duration) { super('userDrawnPath', path, duration); }
}

// ── Register into global registry ──

for (const [name, cls] of Object.entries(GENERATED_VERB_CLASSES)) {
  MotionRegistry.registerVerb(name, cls);
}

// ── Manual registrations (not in generated vocabulary) ──
MotionRegistry.registerVerb('arc', Arc);
MotionRegistry.registerVerb('userDrawnPath', UserDrawnPath);

// ── Enum — use in state configs to catch typos at import time ──

export const Verb = Object.freeze(
  Object.fromEntries(Object.keys(GENERATED_VERB_CLASSES).map(k => [k, k]))
);
