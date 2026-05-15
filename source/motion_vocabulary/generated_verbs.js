// Auto-generated — merges all generation runs

import { Avoid, Bounce, Chase, Cling, Dart, Escort, Fight, Flank, Flee, Flinch, Follow, Glide, Guard, Hug, Idle, Intercept, Leapfrog, Lunge, Mirror, Orbit, Pace, Repel, Shrink, Spiral, Struggle, Swoop, Throb, Tremble, Walk, Wander, Watch, Weave, Zigzag } from './generations/verbs_2026-03-14_1726.js';

// ── Solo (non-path) ──
export const SOLO_VERBS = {
  idle: Idle,
  tremble: Tremble,
  struggle: Struggle,
  throb: Throb,
  flinch: Flinch,
  shrink: Shrink,
  wander: Wander,
  bounce: Bounce,
};

// ── Solo (path) ──
export const SOLO_PATH_VERBS = {
  walk: Walk,
  spiral: Spiral,
  zigzag: Zigzag,
  pace: Pace,
  glide: Glide,
  dart: Dart,
  swoop: Swoop,
  lunge: Lunge,
};

// ── Relational (non-path) ──
export const RELATIONAL_VERBS = {
  follow: Follow,
  avoid: Avoid,
  flee: Flee,
  cling: Cling,
  guard: Guard,
  watch: Watch,
  repel: Repel,
  hug: Hug,
  fight: Fight,
};

// ── Relational (path) ──
export const RELATIONAL_PATH_VERBS = {
  chase: Chase,
  orbit: Orbit,
  escort: Escort,
  mirror: Mirror,
  weave: Weave,
  intercept: Intercept,
  flank: Flank,
  leapfrog: Leapfrog,
};

// ── All verbs (flat) ──
export const GENERATED_VERB_CLASSES = {
  ...SOLO_VERBS,
  ...SOLO_PATH_VERBS,
  ...RELATIONAL_VERBS,
  ...RELATIONAL_PATH_VERBS,
};
