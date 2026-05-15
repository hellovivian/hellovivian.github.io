// ── Solo Verb Primitives ──
// Motion classes for single-entity movement. No target required.
// Per-entity state is stored on the entity object (prefixed by verb name).

import { SoloVerb, RelationalVerb } from './verb.js';
import { SecondaryMotion } from './secondary-motion.js';
import { PathMotion } from './path-motion.js';
import { PinMotion } from './pin-motion.js';
import { BezierPath } from './path.js';

// ── Anchor ──
export class Anchor extends PinMotion {
  constructor() { super('anchor'); }
}

// ── Tremble ──
// Dual-axis sinusoidal shake around a pinned anchor point.

export class Tremble extends SecondaryMotion {
  constructor(opts = {}) {
    super('tremble');
    this._amplitude = opts.amplitude ?? 2.5;
    this._freq = opts.freq ?? 18;
  }

  get tunableDimensions() { return ['amplitude', 'freq']; }

  update(entity, dt) {
    if (entity._tremblePhase == null) {
      entity._tremblePhase = Math.random() * Math.PI * 2;
      entity._trembleT = 0;
    }
    entity._trembleT += dt;
    const w = this._freq * Math.PI * 2;
    entity.x += Math.sin(entity._trembleT * w + entity._tremblePhase) * this._amplitude;
    entity.y += Math.sin(entity._trembleT * w * 1.17 + entity._tremblePhase + 2.1) * this._amplitude;
  }
}

// ── Drift ──
// Bernoulli lemniscate (figure-8) path.

export class Drift extends PathMotion {
  constructor(cx, cy, rx = 60, ry = 35) {
    super('drift');
    this._cx = cx ?? null;
    this._cy = cy ?? null;
    this._rx = rx;
    this._ry = ry;
    this._speed = 0.5;
  }

  get tunableDimensions() { return ['speed']; }

  _initFromBounds(bounds) {
    if (this._cx != null) return;
    this._cx = (bounds.left + bounds.right) / 2;
    this._cy = (bounds.top + bounds.bottom) / 2;
    this._rx = (bounds.right - bounds.left) * 0.38;
    this._ry = (bounds.bottom - bounds.top) * 0.32;
  }

  update(entity, dt, data, bounds) {
    if (bounds) this._initFromBounds(bounds);
    if (this._cx == null) return;

    if (entity._driftT == null) {
      entity._driftT = 0;
      entity.x = this._cx + this._rx;
      entity.y = this._cy;
      entity.vx = 0;
      entity.vy = 0;
    }

    entity._driftT += this._speed * dt;
    const s = Math.sin(entity._driftT), c = Math.cos(entity._driftT), d = 1 + s * s;
    entity.x = this._cx + (this._rx * c) / d;
    entity.y = this._cy + (this._ry * s * c) / d;
  }

  getPath(bounds) {
    if (bounds) this._initFromBounds(bounds);
    if (this._cx == null) return [];
    const pts = [];
    for (let i = 0; i <= 120; i++) {
      const t = (i / 120) * Math.PI * 2;
      const s = Math.sin(t), c = Math.cos(t), d = 1 + s * s;
      pts.push({ x: this._cx + (this._rx * c) / d, y: this._cy + (this._ry * s * c) / d });
    }
    return pts;
  }
}

// ── Stationary ──
export class Stationary extends PinMotion {
  constructor() { super('stationary'); }
}

// ── Struggle ──

export class Struggle extends SecondaryMotion {
  constructor() { super('struggle'); }
  update(entity, dt) {
    entity._strugglePhase ??= Math.random() * Math.PI * 2;
    entity._strugglePhase += dt * 14;
    entity._motionOffsetX = Math.sin(entity._strugglePhase) * 3;
    entity._motionOffsetY = Math.cos(entity._strugglePhase * 1.7 + 1.3) * 2;
  }
}

// ── Idle ──

export class Idle extends SecondaryMotion {
  constructor() { super('idle'); }
  update(entity, dt) {
    entity._idleT = (entity._idleT ?? Math.random() * Math.PI * 2) + dt;
    entity.x += Math.sin(entity._idleT * 0.6) * 0.3;
    entity.y += Math.sin(entity._idleT * 0.4 + 1.0) * 0.2;
  }
  cleanup(entity) { entity._idleT = null; }
}


// ── Freeze ──
export class Freeze extends PinMotion {
  constructor() { super('freeze'); }
}

// ── Walk ──

export class Walk extends PathMotion {
  constructor(path, duration) { super('walk', path, duration); }
}

// ── Arc ──

export class Arc extends PathMotion {
  constructor() {
    super('arc');
    this.generatesPath = true;
  }

  update(entity, dt) {
    if (entity._arcCooldown > 0) {
      entity._arcCooldown -= dt;
      entity.vx = 0;
      entity.vy = 0;
      if (entity._arcCooldown <= 0) {
        entity._path = null;
        entity._ps = null;
        this.t = 0;
      }
      return;
    }

    if (!entity._path) {
      const b = entity._bounds;
      const CW = b ? (b.right - (b.left || 0)) : 512;
      const CH = b ? (b.bottom - (b.top || 0)) : 512;
      const side = Math.random() < 0.5 ? 1 : -1;
      const startX = entity.x || CW * 0.2;
      const startY = entity.y || CH * 0.5;
      const endX = CW - startX;
      const endY = startY;
      entity._path = BezierPath.fromEndpoints(
        { x: startX, y: startY },
        { x: endX, y: endY },
        { perpOffset: 0.5, side },
      );
      this.t = 0;
      entity._ps = entity._path;
    }

    super.update(entity, dt);

    if (this.t >= 1) {
      entity.vx = 0;
      entity.vy = 0;
      entity._arcCooldown = 0.4;
    }
  }

  cleanup(entity) {
    entity._path = null;
    entity._ps = null;
    this.t = 0;
    entity._arcCooldown = null;
  }
}

// ── Bounce ──
// Animation-style bounce: anticipation squash, ease-out rise (hang at apex),
// ease-in fall, squash on landing. Each bounce decays in height.

export class Bounce extends SecondaryMotion {
  constructor(opts = {}) {
    super('bounce');
    this._height = opts.height ?? 80;
    this._bounceDur = opts.bounceDur ?? 0.45;
    this._decay = opts.decay ?? 0.65;
    this._squashDur = 0.08;
  }

  get tunableDimensions() { return ['height', 'decay']; }

  update(entity, dt) {
    if (entity._bounceGroundY == null) {
      entity._bounceGroundY = entity.y;
      entity._bounceT = 0;
      entity._bounceIdx = 0;
      entity._bounceH = this._height;
      entity._bouncePrevY = entity.y;
    }

    entity._bounceT += dt;

    const sqDur = this._squashDur;
    const arcDur = this._bounceDur;
    const cycleDur = sqDur + arcDur;

    // Which phase are we in within this bounce?
    const local = entity._bounceT % cycleDur;
    const bounceNum = Math.floor(entity._bounceT / cycleDur);

    // Recalc height when we enter a new bounce
    if (bounceNum !== entity._bounceIdx) {
      entity._bounceIdx = bounceNum;
      entity._bounceH = this._height * Math.pow(this._decay, bounceNum);
    }

    const h = entity._bounceH;

    if (local < sqDur) {
      // ── Anticipation squash: compress at ground ──
      const t = local / sqDur;
      const squash = Math.sin(t * Math.PI); // 0→1→0
      entity.y = entity._bounceGroundY + squash * 3;
      entity.vy = 0;
    } else {
      // ── Arc phase: ease-out up, hang, ease-in down ──
      const t = (local - sqDur) / arcDur; // 0→1

      // Sine easing: slow at top (hang), fast at ground
      const arc = Math.sin(t * Math.PI);

      entity.y = entity._bounceGroundY - arc * h;

      // Derive vy for squash-and-stretch
      if (dt > 0) {
        entity.vy = (entity.y - entity._bouncePrevY) / dt;
      }
    }

    entity._bouncePrevY = entity.y;
  }

  cleanup(entity) {
    entity._bounceGroundY = null;
    entity._bounceT = null;
    entity._bounceIdx = null;
    entity._bounceH = null;
    entity._bouncePrevY = null;
  }
}

// ── Flinch ──
// Reactionary impulse away from a contact direction, decays quickly.
// Set entity._flinchNx / _flinchNy before entering this verb.

export class Flinch extends SoloVerb {
  constructor(opts = {}) {
    super('flinch');
    this._mag = opts.mag ?? 6;
    this._drag = opts.drag ?? 10;
  }

  update(entity, dt) {
    if (!entity._flinchFired) {
      entity._flinchFired = true;
      const nx = entity._flinchNx ?? 0;
      const ny = entity._flinchNy ?? 0;
      entity.x += nx * this._mag;
      entity.y += ny * this._mag;
    }
    entity.vx *= Math.exp(-this._drag * dt);
    entity.vy *= Math.exp(-this._drag * dt);
  }

  cleanup(entity) {
    entity._flinchFired = null;
    entity._flinchNx = null;
    entity._flinchNy = null;
  }
}

// ── Lunge ──
// Burst toward target. Single impulse on entry, then drag.

export class Lunge extends RelationalVerb {
  constructor({ speed = 400 } = {}) {
    super('lunge', { gap: 0, collision: 'none' });
    this._speed = speed;
  }
  update(entity, dt) {
    if (!entity._lungeFired) {
      entity._lungeFired = true;
      const t = entity._target;
      if (t) {
        const dx = t.x - entity.x;
        const dy = t.y - entity.y;
        const d = Math.hypot(dx, dy) || 1;
        entity.vx = (dx / d) * this._speed;
        entity.vy = (dy / d) * this._speed;
      }
    }
    const t = entity._target;
    if (t) entity.collideWith(t, 0.8);
    entity.vx *= Math.exp(-3 * dt);
    entity.vy *= Math.exp(-3 * dt);
    this.lookAt(entity, dt, 20);
  }
  cleanup(entity) {
    entity._lungeFired = null;
  }
}

// ── Recoil ──

export class Recoil extends RelationalVerb {
  constructor() { super('recoil'); }
  update(entity, dt) {
    if (!entity._recoilFired) {
      entity._recoilFired = true;
      const t = entity._target;
      if (t) {
        const dx = entity.x - t.x;
        const dy = entity.y - t.y;
        const d = Math.hypot(dx, dy) || 1;
        entity.vx = (dx / d) * 300;
        entity.vy = (dy / d) * 300;
      }
    }
    entity.vx *= Math.exp(-4 * dt);
    entity.vy *= Math.exp(-4 * dt);
  }
  cleanup(entity) {
    entity._recoilFired = null;
  }
}
