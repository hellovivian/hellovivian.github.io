// ── Adverb System ──
// Adverbs are verb decorators, not secondary motions.
// They configure verb parameters (duration, easing) at setup time
// and optionally wrap verb.update() with reactive behavior.
// Each is instantiated per-entity (not singletons).

export class Adverb {
  _exaggeration = 0.5;

  constructor(name) {
    this.name = name;
  }

  /**
   * Decorate a verb with this adverb's modifications.
   * Called once at setup, before the verb runs.
   * Can change verb parameters and/or wrap verb.update(entity, dt)
   * to add per-frame behavior.
   *
   * Available motion channels:
   *   Easing:        verb._easing = (t) => easedT — reshape timing curve
   *   Speed:         entity._adverbSpeedMultiplier — scale path movement speed
   *   Acceleration:  force primitives (resist, burst, startle, spring, seek, flee)
   *   Path offset:   entity._motionOffsetX/Y — perpendicular displacement
   *                  (use entity._path.sampleAt(dist) → {x, y, nx, ny})
   *   Scale:         entity.scale, swell(entity, scale, rate, dt),
   *                  pulse(entity, scale, rate, dt)
   *   Orientation:   entity.orientation — facing direction / gaze
   *                  entity._visorAngle + entity._visorAlpha (circle gaze arc)
   *
   * @param {object} verb — the primary motion to decorate
   * @param {object} entity — the entity this verb acts on
   */
  decorate(verb, entity) {
    // Override in subclasses or generated implementations
  }
}


// ── Speed constants (used by editor + composer) ──

export const SLOW_TARGET = 72;   // midpoint of slow bucket
export const FAST_TARGET = 256;  // midpoint of fast bucket


// ── Factory + Registry ──
// All adverb implementations come from generated definitions registered at runtime.

const ADVERB_CLASSES = {};

/** Register an external adverb class (e.g. generated implementations). */
export function registerAdverbClass(name, Cls) {
  ADVERB_CLASSES[name] = Cls;
}

/** Unregister an adverb class by name. */
export function unregisterAdverbClass(name) {
  delete ADVERB_CLASSES[name];
}

/** List all registered adverb class names. */
export function adverbClassNames() {
  return Object.keys(ADVERB_CLASSES);
}

/** Get the registered adverb class (not an instance). */
export function getAdverbClass(name) {
  return ADVERB_CLASSES[name] || null;
}

/** Create a fresh adverb instance by name. */
export function createAdverb(name) {
  const Cls = ADVERB_CLASSES[name];
  if (!Cls) return null;
  return new Cls();
}

// ── Enum — use in state configs to catch typos at import time ──

export const AdverbName = Object.freeze(
  Object.fromEntries(Object.keys(ADVERB_CLASSES).map(k => [k, k]))
);
