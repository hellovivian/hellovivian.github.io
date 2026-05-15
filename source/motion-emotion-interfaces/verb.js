// ── Verb ──
// Base class for all verb motion. Extends Motion with type='primary'.
// Verbs drive WHERE an entity goes — they own position and velocity.
//
// Subclass tree:
//   Verb
//   ├── SoloVerb       — single entity, no target
//   ├── RelationalVerb  — requires entity._target (another entity)
//   ├── PathMotion      — traverses a BezierPath
//   └── PinMotion       — anchors in place
//
// Integration (x += vx*dt) is handled by Entity.step() → integrate().
// Verbs set velocity or position directly in update().

import { Motion } from './motion.js';

export class Verb extends Motion {
  constructor(verb) {
    super('primary', verb);
  }

  /** Override to apply per-frame motion. */
  update(entity, dt) {}

  /** Override to clean up entity state when verb changes. */
  cleanup(entity) {}

  // ── Adverb composition channels ──
  // These mirror PathMotion's setters so adverbs can decorate any verb.
  // Non-path verbs read the stored values in their update().

  setSpeed(pxPerSec)  { this._adverbSpeed = pxPerSec; }
  setEasing(fn)       { this._easing = fn; }
  setOffset(fn)       { this._offsetFn = fn; }
  setWait(seconds)    { this._wait = seconds; }
  setAcceleration(fn) { this._accelerationFn = fn; }

  /** Exponential velocity decay. drag = coefficient (higher = faster stop).
   *  drag 3 → half-life ~0.23s, drag 6 → ~0.12s. */
  resist(entity, dt, drag = 3) {
    const factor = Math.exp(-drag * dt);
    entity.vx *= factor;
    entity.vy *= factor;
  }

  /** Instant position impulse in a direction (angle in radians).
   *  distance = px to move this frame. No velocity involved.
   *  Use for lurches, flinches, hops — discrete energy injection. */
  impulse(entity, angle, distance) {
    entity.x += Math.cos(angle) * distance;
    entity.y += Math.sin(angle) * distance;
  }

  /** Impulse in entity's current orientation. */
  impulseForward(entity, distance) {
    this.impulse(entity, entity.orientation, distance);
  }

  /** Impulse in a random direction. */
  impulseRandom(entity, distance) {
    this.impulse(entity, Math.random() * Math.PI * 2, distance);
  }

  /** Elastic tether to a point. Pulls entity toward (anchorX, anchorY)
   *  proportional to displacement. Position-based, not velocity.
   *  stiffness 0–1: 0 = no pull, 1 = snap to anchor. */
  spring(entity, dt, anchorX, anchorY, stiffness = 0.1) {
    const rate = 1 - Math.exp(-stiffness * 10 * dt);
    entity.x += (anchorX - entity.x) * rate;
    entity.y += (anchorY - entity.y) * rate;
  }

  /** Soft containment — gentle inward push near canvas edges.
   *  margin = zone width (px) where push activates. accel = max push (px/s²).
   *  Use for flee/avoid verbs so entities steer away from walls instead of slamming. */
  contain(entity, dt, margin = 80, accel = 400) {
    const b = entity._bounds || { left: 0, top: 0, right: 512, bottom: 512 };
    const m = entity.mass ?? 1;
    const a = accel / m;
    if (entity.x < b.left + margin)  entity.vx += a * (1 - (entity.x - b.left) / margin) * dt;
    if (entity.x > b.right - margin) entity.vx -= a * (1 - (b.right - entity.x) / margin) * dt;
    if (entity.y < b.top + margin)   entity.vy += a * (1 - (entity.y - b.top) / margin) * dt;
    if (entity.y > b.bottom - margin) entity.vy -= a * (1 - (b.bottom - entity.y) / margin) * dt;
  }
}

// ── SoloVerb ──
// Single-entity verb. No target required.
export class SoloVerb extends Verb {
  constructor(verb) {
    super(verb);
    this.relational = false;
  }
}

// ── RelationalVerb ──
// Two-entity verb. Reads entity._target for the other entity.
//
// bubble(entity)  — comfort distance: radius + radius + gap.
//                   gap is set per-verb (default 12).
//                   0 = contact allowed (hug, grab).
//
// collision        — 'none' | 'recoil' | 'stop'
//                   Controls what happens when entities overlap.
//                   'none'   = pass through (hug, grab)
//                   'recoil' = bounce apart on contact
//                   'stop'   = halt at bubble edge
//
// detectCollision(entity) — returns { hit, overlap, nx, ny } or null.
//                   hit = true when distance < bubble.
//                   nx/ny = contact normal from entity toward target.

export class RelationalVerb extends Verb {
  constructor(verb, opts) {
    const { gap = 12, collision = 'stop' } = opts || {};
    super(verb);
    this.relational = true;
    this.gap = gap;            // social gap beyond radius+radius
    this.collision = collision; // 'none' | 'recoil' | 'stop'
  }

  // ── Proximity ──

  /** Comfort distance: how close entity wants to be to target. */
  bubble(entity) {
    const t = entity._target;
    if (!t) return 0;
    const rSelf = entity.radius * Math.max(entity.sx || 1, entity.sy || 1);
    const rTarget = t.radius * Math.max(t.sx || 1, t.sy || 1);
    return rSelf + rTarget + this.gap;
  }

  /** Check overlap. Returns { hit, overlap, nx, ny } or null if no target. */
  detectCollision(entity) {
    const t = entity._target;
    if (!t) return null;
    const dx = t.x - entity.x;
    const dy = t.y - entity.y;
    const dist = Math.hypot(dx, dy) || 0.01;
    const bub = this.bubble(entity);
    const overlap = bub - dist;
    if (overlap <= 0) return { hit: false, overlap: 0, nx: 0, ny: 0 };
    return { hit: true, overlap, nx: dx / dist, ny: dy / dist };
  }

  // ── Tracking ──

  /** Orient entity toward target. Smooth interpolation via exponential ease. */
  lookAt(entity, dt, stiffness = 18) {
    const t = entity._target;
    if (!t) return;
    const angle = Math.atan2(t.y - entity.y, t.x - entity.x);
    entity.orientation += angleDiff(angle, entity.orientation) * (1 - Math.exp(-stiffness * dt));
  }

  /** Orient entity away from target. */
  lookAway(entity, dt, stiffness = 18) {
    const t = entity._target;
    if (!t) return;
    const angle = Math.atan2(t.y - entity.y, t.x - entity.x) + Math.PI;
    entity.orientation += angleDiff(angle, entity.orientation) * (1 - Math.exp(-stiffness * dt));
  }

  // ── Behavior capture ──

  /** Record target's motion state onto entity for verbs to read.
   *  Stores: _targetVx, _targetVy, _targetSpeed, _targetOrientation.
   *  Call once per frame in update() before using the values. */
  match(entity) {
    const t = entity._target;
    if (!t) return;
    entity._targetVx = t.vx;
    entity._targetVy = t.vy;
    entity._targetSpeed = Math.hypot(t.vx, t.vy);
    entity._targetOrientation = t.orientation ?? 0;
  }

  /** Copy target's velocity directly — entity moves in sync. */
  mirror(entity) {
    const t = entity._target;
    if (!t) return;
    entity.vx = t.vx;
    entity.vy = t.vy;
  }

  // ── Attraction / Repulsion ──
  // Position-seeking, not force accumulation.
  // speed = px/s the entity moves toward/away from target.
  // Returns early if no target.

  /** Move entity toward target at a fixed speed (px/s).
   *  Deterministic — no velocity accumulation, just position delta. */
  attract(entity, dt, speed = 120) {
    const t = entity._target;
    if (!t) return;
    const dx = t.x - entity.x;
    const dy = t.y - entity.y;
    const dist = Math.hypot(dx, dy);
    if (dist < 1) return;
    const step = Math.min(speed * dt, dist); // don't overshoot
    entity.x += (dx / dist) * step;
    entity.y += (dy / dist) * step;
  }

  /** Move entity away from target at a fixed speed (px/s).
   *  Deterministic — no velocity accumulation, just position delta. */
  repel(entity, dt, speed = 120) {
    const t = entity._target;
    if (!t) return;
    const dx = entity.x - t.x;
    const dy = entity.y - t.y;
    const dist = Math.hypot(dx, dy);
    if (dist < 0.01) return;
    entity.x += (dx / dist) * speed * dt;
    entity.y += (dy / dist) * speed * dt;
  }
}

// ── Helpers ──

/** Shortest angular difference, wrapped to [-PI, PI]. */
function angleDiff(target, current) {
  let d = target - current;
  while (d > Math.PI) d -= Math.PI * 2;
  while (d < -Math.PI) d += Math.PI * 2;
  return d;
}
