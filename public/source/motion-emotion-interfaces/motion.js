// ── Motion (base class) ──
// Shared structure for all motion types: speed, easing, intensity.

// ── Speed buckets (px/s) — shared vocabulary for how fast things move ──
// 512 px/s ≈ full canvas width in 1 second.
const SPEED_MAP = {
  crawl:    [0,    48],   // barely moving, creeping
  slow:     [48,   96],   // cautious, reluctant
  moderate: [96,  192],   // walking pace, steady
  fast:     [192, 320],   // running, urgent
  rapid:    [320, 420],   // dashing, frantic
  extreme:  [420, 512],   // explosive, instant-feel
};

function sampleBucket(map, key) {
  const [low, high] = map[key];
  return low + Math.random() * (high - low);
}

function midBucket(map, key) {
  const [low, high] = map[key];
  return (low + high) / 2;
}

// ── Easing functions — velocity profiles for progress remapping ──
// All map t ∈ [0,1] → [0,1], preserving endpoints.
export const EASING_MAP = {
  linear:      t => t,
  easeIn:      t => t * t,
  easeOut:     t => 1 - (1 - t) * (1 - t),
  easeInOut:   t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
  easeInSine:  t => 1 - Math.cos((t * Math.PI) / 2),
  easeOutSine: t => Math.sin((t * Math.PI) / 2),
  /** Symmetric S-curve with variable steepness. pow=1 → linear, higher → sharper. */
  sCurve:      (t, pow) => t < 0.5
    ? Math.pow(2 * t, pow) / 2
    : 1 - Math.pow(2 * (1 - t), pow) / 2,
  /** Power ease-out. pow=1 → linear, higher → faster start, slower end. */
  powerOut:    (t, pow) => 1 - Math.pow(1 - t, pow),
};

export class Motion {
  constructor(type, verb) {
    this.type = type;
    this.verb = verb;

    // Opt-in speed: set via speed('fast') or speed(200)
    this._speed = null;

    // Easing function for progress remapping — default linear (identity)
    this._easing = null;

    // Intensity — normalized 0–1 value that both adverb exaggeration
    // and emotion intensity can map to. Null = unset (subclass default).
    this._intensity = null;

    // Own timeline — duration in seconds, null = match state duration
    this._duration = null;

    // Active window within parent state's t — [startT, endT]
    // null = active for entire state
    this._activeWindow = null;
  }

  /** Override to declare tunable tunableDimensions axis names (e.g. ['amplitude', 'freq']). */
  get tunableDimensions() { return []; }

  // ── Intensity ──

  /** Set intensity (0–1). Returns this for chaining. */
  intensity(val) {
    this._intensity = Math.max(0, Math.min(1, val));
    return this;
  }

  /** Current intensity value (0–1), or null if unset. */
  get intensityValue() { return this._intensity; }

  // ── Easing ──

  /** Set easing by name or custom function. Returns this for chaining. */
  easing(val) {
    if (typeof val === 'function') {
      this._easing = val;
    } else {
      this._easing = EASING_MAP[val] || null;
    }
    return this;
  }

  /** Remap linear t ∈ [0,1] through the current easing. */
  ease(t) {
    return this._easing ? this._easing(t) : t;
  }

  // ── Speed ──

  /** Set speed from bucket name or raw px/s value. Returns this for chaining. */
  speed(val) {
    if (typeof val === 'string') {
      this._speed = midBucket(SPEED_MAP, val);
    } else {
      this._speed = val;
    }
    return this;
  }

  /** Sample a random speed within a bucket. Returns this for chaining. */
  speedRandom(bucket) {
    this._speed = sampleBucket(SPEED_MAP, bucket);
    return this;
  }

  /** Current speed value in px/s, or null if unset. */
  get speedValue() { return this._speed; }

  // ── Timeline ──

  /** Set this motion's own duration in seconds. Returns this for chaining. */
  duration(secs) {
    this._duration = secs;
    return this;
  }

  /** Set the active window within the parent state's t. Returns this for chaining.
   *  e.g. .activeWindow(0, 0.3) — only active during first 30% of state */
  activeWindow(startT, endT) {
    this._activeWindow = [startT, endT];
    return this;
  }

  /** Is this motion active given the parent state's progress? */
  isActive(entity) {
    if (!this._activeWindow) return true;
    const stateT = (entity._stateDuration > 0)
      ? Math.min(entity._stateElapsed / entity._stateDuration, 1)
      : 0;
    return stateT >= this._activeWindow[0] && stateT <= this._activeWindow[1];
  }

  /** Compute local progress t ∈ [0,1] for this motion.
   *  Derives from entity._stateElapsed (entity owns the clock).
   *  Verb/motion owns the duration (denominator). */
  localT(entity) {
    const elapsed = entity._stateElapsed ?? 0;
    const duration = this._duration ?? entity._stateDuration ?? 1;
    const stateT = Math.min(elapsed / duration, 1);

    // If we have an active window, check if we're in it
    if (this._activeWindow) {
      if (stateT < this._activeWindow[0] || stateT > this._activeWindow[1]) {
        return null; // not active
      }
      // Remap to local t within the window
      const [s, e] = this._activeWindow;
      return Math.min((stateT - s) / (e - s), 1);
    }

    return stateT;
  }

  // ── Adverb composition channels ──
  // Shared across all motion types so adverbs can decorate both verbs and gestures.

  setSpeed(pxPerSec)  { this._adverbSpeed = pxPerSec; }
  setEasing(fn)       { this._easing = fn; }
  setOffset(fn)       { this._offsetFn = fn; }
  setWait(seconds)    { this._wait = seconds; }
  setAcceleration(fn) { this._accelerationFn = fn; }

  /** Set transition condition for use in Emotion sequences. Returns this for chaining. */
  until(conditionFn) {
    this._until = conditionFn;
    return this;
  }

  /** Override in subclasses to apply per-frame physics. */
  update(entity, dt) {}

  /** Post-integrate correction. No-op by default; subclasses may override. */
  resolve() {}
}

// Expose maps for subclasses and external use
Motion.SPEED_MAP = SPEED_MAP;
Motion.EASING_MAP = EASING_MAP;
