// ── PathMotion ──
// Moves an entity along a path. Position is set directly — no velocity tricks.
// t is derived from entity._stateElapsed / entity._stateDuration.

import { Verb } from './verb.js';

export class PathMotion extends Verb {
  t = 0;
  _arrived = false;

  constructor(verb, path, duration) {
    super(verb);
    this.type = 'path';
    this.path = path;
    this.duration = duration;
  }

  /** Set traversal speed in px/s. Recomputes duration from path length. */
  setSpeed(pxPerSec) {
    this._adverbSpeed = pxPerSec;
    if (this.path?.totalLength) {
      this.duration = this.path.totalLength / pxPerSec;
    }
  }

  /** Set easing curve: fn(t) → easedT, where t ∈ [0,1]. Must be monotonic. */
  setEasing(fn) {
    this._easing = fn;
  }

  /** Set perpendicular offset: fn(t) → displacement in px. */
  setOffset(fn) {
    this._offsetFn = fn;
  }

  /** Hold still for the given duration before starting to move. */
  setWait(seconds) {
    this._waitEnter = seconds;
  }

  /** Set acceleration profile: fn(t) → instantaneous speed multiplier. */
  setAcceleration(fn) {
    this._acceleration = fn;
    const N = 200;
    const samples = new Float64Array(N + 1);
    samples[0] = 0;
    for (let i = 1; i <= N; i++) {
      const t = i / N;
      samples[i] = samples[i - 1] + fn(t) / N;
    }
    const total = samples[N];
    if (total > 0) {
      for (let i = 0; i <= N; i++) samples[i] /= total;
    }
    this._easing = (t) => {
      const idx = t * N;
      const lo = Math.floor(idx);
      const hi = Math.min(lo + 1, N);
      const frac = idx - lo;
      return samples[lo] * (1 - frac) + samples[hi] * frac;
    };
  }

  update(entity, dt) {
    if (!this.path || this.path.points?.length < 2) return;

    // Derive t from entity's clock
    const elapsed = entity._stateElapsed ?? 0;
    const dur = Math.min(this.duration, entity._stateDuration || Infinity);
    const wEnter = this._waitEnter ?? 0;
    let rawT;
    if (elapsed < wEnter) {
      rawT = 0;
    } else {
      rawT = Math.min((elapsed - wEnter) / (dur - wEnter), 1);
    }
    this.t = this._easing ? this._easing(rawT) : rawT;

    // Sample path
    const distance = this.t * this.path.totalLength;
    const point = this.path.sampleAt(distance);

    // Apply perpendicular offset
    let ox = 0, oy = 0;
    if (this._offsetFn) {
      const d = this._offsetFn(this.t);
      ox = point.nx * d;
      oy = point.ny * d;
    }

    // Set position directly
    entity.x = point.x + ox;
    entity.y = point.y + oy;

    // Set velocity for orientation/squash-stretch (not for position)
    const speed = this.path.totalLength / (dur - wEnter);
    entity.vx = point.tx * speed;
    entity.vy = point.ty * speed;

    // Flag so integrate skips velocity→position
    entity._pathDriven = true;

    if (this.t >= 1) {
      entity.vx = 0;
      entity.vy = 0;
      this._arrived = true;
    } else {
      this._arrived = false;
    }
  }

  resolve(entity) {
    if (!this._arrived) return;
    // Snap to endpoint after integrate (in case anything drifted)
    const endPt = this.path.sampleAt(this.path.totalLength);
    entity.x = endPt.x;
    entity.y = endPt.y;
    entity.vx = 0;
    entity.vy = 0;
    entity.sx = 1;
    entity.sy = 1;
  }
}
