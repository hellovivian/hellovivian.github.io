// ── Entity ──
// The animated object. Owns its physics (step), rendering (draw),
// and motion slots (primary, secondary).

import { size, speed, massFromRadius, boundaryBehavior, maxForce,
         integrate, boundary } from './physics.js';

// ================================================================
//  COLOR HELPERS
// ================================================================

/** Parse #hex or rgb() string into [r, g, b]. */
function parseColor(c) {
  if (c[0] === '#') return [parseInt(c.slice(1,3),16), parseInt(c.slice(3,5),16), parseInt(c.slice(5,7),16)];
  const m = c.match(/(\d+)/g);
  return m ? [+m[0], +m[1], +m[2]] : [127, 127, 127];
}

export function lerpColor(colorA, colorB, fraction) {
  fraction = Math.max(0, Math.min(1, fraction));
  const [rA, gA, bA] = parseColor(colorA);
  const [rB, gB, bB] = parseColor(colorB);
  return `rgb(${Math.round(rA + (rB - rA) * fraction)},${Math.round(gA + (gB - gA) * fraction)},${Math.round(bA + (bB - bA) * fraction)})`;
}

/** Desaturate a color toward its luminance grey. amount 0 = no change, 1 = full grey. */
function desaturate(color, amount) {
  if (amount < 0.001) return color;
  const [r, g, b] = parseColor(color);
  const grey = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
  return `rgb(${Math.round(r + (grey - r) * amount)},${Math.round(g + (grey - g) * amount)},${Math.round(b + (grey - b) * amount)})`;
}

// ================================================================
//  BEZIER SHAPE DEFORMATION
// ================================================================

const KAPPA = 0.5522847498; // cubic bezier circle approximation constant

// Unit circle as 4 cubic bezier segments (clockwise from right)
const _CIRCLE_SHAPE = [
  { a1:{x:1,y:0}, c1:{x:1,y:-KAPPA}, c2:{x:KAPPA,y:-1}, a2:{x:0,y:-1} },
  { a1:{x:0,y:-1}, c1:{x:-KAPPA,y:-1}, c2:{x:-1,y:-KAPPA}, a2:{x:-1,y:0} },
  { a1:{x:-1,y:0}, c1:{x:-1,y:KAPPA}, c2:{x:-KAPPA,y:1}, a2:{x:0,y:1} },
  { a1:{x:0,y:1}, c1:{x:KAPPA,y:1}, c2:{x:1,y:KAPPA}, a2:{x:1,y:0} },
];

// Sag target — derived from the React bezier morph reference.
// Top anchor sinks down, sides droop + widen, bottom stays pinned.
const _SAG_SHAPE = [
  { a1:{x:1.15,y:0.33}, c1:{x:1.15,y:-0.32}, c2:{x:0.65,y:-0.84}, a2:{x:0,y:-0.84} },
  { a1:{x:0,y:-0.84}, c1:{x:-0.65,y:-0.84}, c2:{x:-1.15,y:-0.32}, a2:{x:-1.15,y:0.33} },
  { a1:{x:-1.15,y:0.33}, c1:{x:-1.15,y:0.98}, c2:{x:-0.65,y:1.0}, a2:{x:0,y:1.0} },
  { a1:{x:0,y:1.0}, c1:{x:0.65,y:1.0}, c2:{x:1.15,y:0.98}, a2:{x:1.15,y:0.33} },
];

function _lerpShape(shapeA, shapeB, t) {
  const out = [];
  for (let i = 0; i < 4; i++) {
    const a = shapeA[i], b = shapeB[i];
    out.push({
      a1: { x: a.a1.x + (b.a1.x - a.a1.x) * t, y: a.a1.y + (b.a1.y - a.a1.y) * t },
      c1: { x: a.c1.x + (b.c1.x - a.c1.x) * t, y: a.c1.y + (b.c1.y - a.c1.y) * t },
      c2: { x: a.c2.x + (b.c2.x - a.c2.x) * t, y: a.c2.y + (b.c2.y - a.c2.y) * t },
      a2: { x: a.a2.x + (b.a2.x - a.a2.x) * t, y: a.a2.y + (b.a2.y - a.a2.y) * t },
    });
  }
  return out;
}

function drawDeformedCircle(ctx, radius, deformT) {
  const shape = _lerpShape(_CIRCLE_SHAPE, _SAG_SHAPE, deformT);
  ctx.beginPath();
  ctx.moveTo(shape[0].a1.x * radius, shape[0].a1.y * radius);
  for (const seg of shape) {
    ctx.bezierCurveTo(
      seg.c1.x * radius, seg.c1.y * radius,
      seg.c2.x * radius, seg.c2.y * radius,
      seg.a2.x * radius, seg.a2.y * radius
    );
  }
  ctx.closePath();
}

// ================================================================
//  ENTITY RENDERING
// ================================================================

/**
 * drawEntity(ctx, entity, opts?)
 * opts.showEnergy — fade color toward fadeTo as energy drops
 * opts.shrinkWithEnergy — shrink radius with energy
 * opts.fadeTo — energy-depletion color (default: theme-aware grey)
 * opts.isLight — light theme flag (affects history + energy-fade color)
 * opts.showSpeed — show speed label above entity
 */
export function drawEntity(ctx, entity, opts = {}) {
  const showEnergy = opts.showEnergy ?? false;
  const shrink = opts.shrinkWithEnergy ?? false;
  const isLight = opts.isLight ?? false;
  const fadeTo = opts.fadeTo ?? (isLight ? '#bbb' : '#555');
  const showSpeed = opts.showSpeed ?? false;

  // Energy-aware rendering: trail fades and color desaturates as energy drops
  const nrg = entity.energy ?? 1;

  // History trail — comet style, scaled by energy
  if (entity.history.length > 1) {
    const visLen = Math.max(2, Math.floor(entity.history.length * (0.3 + 0.7 * nrg)));
    const startIdx = entity.history.length - visLen;
    for (let i = startIdx; i < entity.history.length; i++) {
      const t = (i - startIdx) / visLen; // 0 = oldest visible, 1 = newest
      const r = entity.radius * (0.15 + 0.85 * t * t);
      ctx.globalAlpha = (0.03 + 0.13 * t * t) * (0.3 + 0.7 * nrg);
      ctx.fillStyle = entity.history[i].color || entity.color;
      if (entity.shape === 'triangle') {
        ctx.save();
        ctx.translate(entity.history[i].x, entity.history[i].y);
        ctx.rotate(entity.orientation);
        ctx.beginPath();
        ctx.moveTo(r * 1.3, 0);
        ctx.lineTo(-r * 0.7, -r * 0.85);
        ctx.lineTo(-r * 0.7, r * 0.85);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      } else {
        ctx.beginPath();
        ctx.arc(entity.history[i].x, entity.history[i].y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
  ctx.globalAlpha = 1;

  // Subtle desaturation: 40% desat at zero energy, none at full
  const baseColor = showEnergy ? lerpColor(entity.color, fadeTo, 1 - nrg) : entity.color;
  const color = desaturate(baseColor, 0.4 * (1 - nrg));
  const radius = shrink ? entity.baseRadius * (0.45 + 0.55 * entity.energy) : entity.radius;

  ctx.save();
  ctx.translate(entity.x, entity.y);

  // Squash & stretch (skipped when sx/sy are 1)
  if (entity.sx !== 1 || entity.sy !== 1) {
    ctx.rotate(entity.stretchAngle);
    ctx.scale(entity.sx, entity.sy);
    ctx.rotate(-entity.stretchAngle);
  }

  if (entity.shape === 'triangle') {
    ctx.rotate(entity.orientation);
    ctx.beginPath();
    ctx.moveTo(radius * 1.3, 0);
    ctx.lineTo(-radius * 0.7, -radius * 0.85);
    ctx.lineTo(-radius * 0.7, radius * 0.85);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
  } else if ((entity._deformT ?? 0) > 0.001) {
    drawDeformedCircle(ctx, radius, entity._deformT);
    ctx.fillStyle = color;
    ctx.fill();
  } else {
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
  }
  ctx.restore();

  // Visor arc — drawn when entity has a _visorAngle (e.g. hesitantly glance)
  if (entity.shape === 'circle' && entity._visorAlpha > 0.01) {
    const gap = 4;
    const arcSpread = 0.35;
    ctx.save();
    ctx.globalAlpha = entity._visorAlpha;
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(entity.x, entity.y, radius + gap, entity._visorAngle - arcSpread, entity._visorAngle + arcSpread);
    ctx.stroke();
    ctx.restore();
  }

  // Emotion custom draw
  if (entity.primary?.draw) entity.primary.draw(ctx, entity);

  // Particles
  if (entity.particles.length > 0) {
    console.log(`[particles:draw] ${entity.particles.length} particles to draw`);
  }
  for (const p of entity.particles) {
    if (!p.dead) {
      console.log(`[particles:draw] drawing ${p.type} at (${p.x?.toFixed(1)}, ${p.y?.toFixed(1)}) dead=${p.dead}`);
      p.draw(ctx, entity);
    }
  }

  if (showSpeed) {
    ctx.font = '9px monospace';
    ctx.fillStyle = isLight ? '#555' : '#fff';
    ctx.fillText(Math.round(entity.speed) + '', entity.x + radius + 3, entity.y - radius - 2);
  }
}

// ================================================================
//  ENTITY PHYSICS HELPERS
// ================================================================


/**
 * squashAndStretch(entity, deltaTime)
 * Velocity-based deformation: sx/sy respond to speed, area ≈ conserved.
 */
export function squashAndStretch(entity, deltaTime) {
  // Use actual position displacement for consistent stretch in both preview and scene.
  // This naturally captures path motion + adverb offsets combined.
  const dx = entity.x - (entity._sqPrevX ?? entity.x);
  const dy = entity.y - (entity._sqPrevY ?? entity.y);
  entity._sqPrevX = entity.x;
  entity._sqPrevY = entity.y;

  const frameSpeed = deltaTime > 0 ? Math.hypot(dx, dy) / deltaTime : 0;
  const speedFactor = Math.min(frameSpeed / 300, 1);
  const targetSx = 1 + 0.4 * speedFactor;
  const targetSy = 1 / targetSx;

  let targetAngle = entity.stretchAngle;
  if (Math.hypot(dx, dy) > 0.5) {
    targetAngle = Math.atan2(dy, dx);
  }

  const smooth = 1 - Math.exp(-12 * deltaTime);

  entity.sx += (targetSx - entity.sx) * smooth;
  entity.sy += (targetSy - entity.sy) * smooth;

  // Clamp scale to prevent extreme deformation
  entity.sx = Math.min(entity.sx, 1.25);
  entity.sy = Math.max(entity.sy, 1 / 1.25);

  // Smooth angle with shortest-path wrapping
  let diff = targetAngle - entity.stretchAngle;
  while (diff > Math.PI) diff -= Math.PI * 2;
  while (diff < -Math.PI) diff += Math.PI * 2;
  entity.stretchAngle += diff * smooth;

  // Zero offsets now that both integrate and squashAndStretch have consumed them
  entity._motionOffsetX = 0;
  entity._motionOffsetY = 0;
}

/**
 * updateEntity(entity, dt)
 * Position-driven update: derive velocity from position change,
 * record motion trail, update orientation, apply squash/stretch.
 * Call AFTER setting entity.x/y directly.
 */
export function updateEntity(entity, dt) {
  if (entity.static) return;
  if (dt > 0 && entity._prevX != null) {
    entity.vx = (entity.x - entity._prevX) / dt;
    entity.vy = (entity.y - entity._prevY) / dt;
  }
  entity._prevX = entity.x;
  entity._prevY = entity.y;
  if (entity.speed > 5) {
    const target = Math.atan2(entity.vy, entity.vx);
    let diff = target - entity.orientation;
    while (diff > Math.PI) diff -= Math.PI * 2;
    while (diff < -Math.PI) diff += Math.PI * 2;
    entity.orientation += diff * 0.13;
  }
  entity.historyTimer += dt;
  if (entity.historyTimer > 0.055) {
    entity.historyTimer = 0;
    entity.history.push({ x: entity.x, y: entity.y, color: entity.color });
    if (entity.historyLength > 0 && entity.history.length > entity.historyLength) entity.history.shift();
  }
  squashAndStretch(entity, dt);
  // Tick particles — support both (entity, dt) and (dt) signatures,
  // and both .dead flag and return-value-false conventions
  if (entity.particles.length > 0) {
    console.log(`[particles:update] ${entity.particles.length} particles, types: ${[...new Set(entity.particles.map(p => p.type))].join(',')}`);
  }
  for (const p of entity.particles) {
    const alive = p.update.length <= 1 ? p.update(dt) : p.update(entity, dt);
    if (alive === false) p.dead = true;
  }
  entity.particles = entity.particles.filter(p => !p.dead);
}

// ================================================================
//  ENTITY CLASS
// ================================================================

export class Entity {
  constructor(x, y, opts = {}) {
    this.x = x; this.y = y;
    this.vx = 0; this.vy = 0;
    this.energy = opts.energy ?? 1.0;
    this.orientation = opts.orientation ?? 0;
    this.shape = opts.shape ?? 'circle';
    this.color = opts.color ?? '#4FC3F7';

    // Size: bucket string (e.g. 'medium') or raw radius
    if (typeof opts.size === 'string') {
      this.sizeBucket = opts.size;
      this.radius = size(opts.size);
    } else {
      this.radius = opts.radius ?? 12;
    }

    // Mass: computed from radius by default (physics-derived).
    // Explicit value overrides the computation.
    this._mass = opts.mass ?? massFromRadius(this.radius);

    // Boundary behavior: 'none' (no enforcement), bucket string, or raw restitution
    if (opts.boundaryBehavior === 'none') {
      this.boundaryBehavior = null;
    } else if (typeof opts.boundaryBehavior === 'string') {
      this.boundaryBehavior = boundaryBehavior(opts.boundaryBehavior);
    } else {
      this.boundaryBehavior = opts.boundaryBehavior ?? 0.3;
    }

    // Max speed: bucket string or raw px/s. Default: no cap.
    if (typeof opts.maxSpeed === 'string') {
      this.maxSpeed = speed(opts.maxSpeed);
    } else {
      this.maxSpeed = opts.maxSpeed ?? Infinity;
    }

    // Max steering force: bucket string or raw px/s². Default: no cap.
    if (typeof opts.maxForce === 'string') {
      this.maxForce = maxForce(opts.maxForce);
    } else {
      this.maxForce = opts.maxForce ?? Infinity;
    }

    this.baseRadius = this.radius;
    this.sx = 1; this.sy = 1; this.stretchAngle = 0;
    this.history = [];
    this.historyTimer = 0;
    this.historyLength = opts.historyLength ?? 28;
    this.future = {
      projection: [],                // [{x, y}, ...] predicted positions
      state: { type: 'neutral' },    // | { type: 'collision', x, y, t } | { type: 'target', x, y }
      manual: false,                 // true = demo code owns projection, skip auto-compute
    };
    this.futureLength = opts.futureLength ?? 28;
    this.collisions = [];            // [{other, nx, ny, overlap}] populated by detectCollisions(), cleared each frame

    // Hands — always present, gestures move them
    this.hands = {
      left:  { x: x, y: y, visible: false },
      right: { x: x, y: y, visible: false },
    };

    // Particles — general-purpose array for emotions/verbs to spawn and draw
    this.particles = [];

    // Clock — entity holds raw elapsed time, verbs/emotions compute their own t
    this._stateElapsed = 0;
    this._stateDuration = 1;

    // Motion slots
    this.primary = null;     // drives position (verb, path, or primary emotion)
    this.secondary = null;   // modifies movement/appearance (adverb, gesture, or secondary emotion)
  }

  /** Progress through current state, 0→1. Derived from clock / duration. */
  get t() {
    return this._stateDuration > 0
      ? Math.min(this._stateElapsed / this._stateDuration, 1)
      : 0;
  }

  /** Relational target entity (another Entity for social emotions). */
  get target() { return this._target ?? null; }
  set target(v) { this._target = v; }

  /** Integrate velocity, apply squash-and-stretch, enforce boundary, tick particles. */
  step(dt, bounds) {
    if (this._grabbed) return;
    integrate(this, dt, bounds);
    squashAndStretch(this, dt);
    if (this.primary?.resolve) {
      this.primary.resolve(this, dt);
    }
    if (this.boundaryBehavior != null && !this._skipBoundary) {
      if (this.shape === 'triangle') {
        const bb = this.radius * 1.3;
        const rest = this.boundaryBehavior;
        if (bounds.left != null  && this.x - bb < bounds.left)   { this.x = bounds.left + bb;   this.vx = Math.abs(this.vx) * rest; }
        if (bounds.right != null && this.x + bb > bounds.right)  { this.x = bounds.right - bb;  this.vx = -Math.abs(this.vx) * rest; }
        if (bounds.top != null   && this.y - bb < bounds.top)    { this.y = bounds.top + bb;    this.vy = Math.abs(this.vy) * rest; }
        if (bounds.bottom != null && this.y + bb > bounds.bottom) { this.y = bounds.bottom - bb; this.vy = -Math.abs(this.vy) * rest; }
      } else {
        boundary(this, bounds, this.boundaryBehavior);
      }
    }
    this._skipBoundary = false;

    // Tick particles after position is final
    for (const p of this.particles) {
      const alive = p.update.length <= 1 ? p.update(dt) : p.update(this, dt);
      if (alive === false) p.dead = true;
    }
    this.particles = this.particles.filter(p => !p.dead);
  }

  /** Draw entity body (with gesture transforms), then gesture/verb overlays. */
  draw(ctx, opts = {}) {
    // Find first secondary with applyVisuals (gesture)
    const ges = this.secondary?.find(s => s.applyVisuals);
    let savedX, savedY, savedSx, savedSy, savedAngle;
    if (ges) {
      savedX = this.x; savedY = this.y;
      savedSx = this.sx; savedSy = this.sy;
      savedAngle = this.stretchAngle;
      ges.applyVisuals(this);
    }
    drawEntity(ctx, this, opts);
    if (savedX !== undefined) {
      this.x = savedX; this.y = savedY;
      this.sx = savedSx; this.sy = savedSy;
      this.stretchAngle = savedAngle;
    }
    this._drawHands(ctx);
    this._drawParticles(ctx);
    if (this.secondary) {
      for (const s of this.secondary) { if (s.draw) s.draw(ctx, this); }
    }
    if (this.primary?.draw) this.primary.draw(ctx, this);
  }

  /** Attach a primary motion (replaces any existing). */
  setPrimary(motion) { this.primary = motion; return this; }

  /** Attach secondary motion(s). Accepts a single motion or an array. */
  setSecondary(motion) {
    if (motion == null) { this.secondary = null; return this; }
    this.secondary = Array.isArray(motion) ? motion : [motion];
    return this;
  }

  /** Run two-slot pipeline: primary → secondaries. */
  update(dt) {
    if (this._grabbed) return;
    if (this.primary) {
      if (typeof this.primary.update !== 'function') {
        console.error(`Entity "${this._name}": primary has no update()`, this.primary);
        this.primary = null;
      } else {
        this.primary.update(this, dt);
      }
    }
    if (this.secondary) {
      for (const s of this.secondary) s.update(this, dt);
    }
  }

  /** Draw visible hand particles. */
  _drawHands(ctx) {
    const r = this.radius * 0.35;
    for (const hand of [this.hands.left, this.hands.right]) {
      if (!hand.visible) continue;
      ctx.save();
      ctx.shadowColor = 'rgba(0,0,0,0.35)';
      ctx.shadowBlur = 6;
      ctx.shadowOffsetY = 2;
      ctx.globalAlpha = 0.85;
      ctx.beginPath();
      ctx.arc(hand.x, hand.y, r, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.restore();
    }
  }

  /** Draw all living particles. */
  _drawParticles(ctx) {
    for (const p of this.particles) {
      if (!p.dead) p.draw(ctx, this);
    }
  }

  /** Return hands to rest (hidden, at body center). */
  restHands() {
    this.hands.left.x = this.x;
    this.hands.left.y = this.y;
    this.hands.left.visible = false;
    this.hands.right.x = this.x;
    this.hands.right.y = this.y;
    this.hands.right.visible = false;
  }

  get speed() { return Math.hypot(this.vx, this.vy); }
  get mass() { return Math.max(this._mass ?? 1, 0.01); }

  /**
   * collisionWith(other)
   * Query: did this entity collide with `other` this frame?
   * Returns { other, nx, ny, overlap } or null.
   * nx/ny point from this entity toward the other.
   */
  collisionWith(other) {
    for (let i = 0; i < this.collisions.length; i++) {
      if (this.collisions[i].other === other) return this.collisions[i];
    }
    return null;
  }

  /**
   * collideWith(other, stiffness?, damping?)
   * Spring-force collision response against a single other entity.
   * Pushes this entity away on overlap; other is unaffected (treated as immovable).
   */
  collideWith(other, stiffness = 0.5) {
    const dx = other.x - this.x;
    const dy = other.y - this.y;
    const dist = Math.hypot(dx, dy);
    const minDist = this.radius + other.radius;
    if (dist >= minDist || dist < 0.01) return;

    const nx = dx / dist;
    const ny = dy / dist;
    const overlap = minDist - dist;

    // Push position out of overlap
    this.x -= nx * overlap;
    this.y -= ny * overlap;

    // Reflect velocity
    const approach = this.vx * nx + this.vy * ny;
    if (approach > 0) {
      this.vx -= nx * approach * (1 + stiffness);
      this.vy -= ny * approach * (1 + stiffness);
    }
  }
}
