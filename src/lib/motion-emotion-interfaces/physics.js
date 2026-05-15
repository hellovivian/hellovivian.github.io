/**
 * Physics — integration, collisions, and parameter sampling.
 *
 * Re-exports entity, force primitives, and drawing utilities.
 * Each function reads from and writes state and properties to an animated entity object.
 *
 * Usage (HTML):
 *   <script type="module">
 *   import { Entity, F, integrate, squashAndStretch, drawEntity, ... } from './motion-emotion-interfaces/physics.js';
 */

import { resist, burst, startle, lookAt, spring, seek, flee, boundary, contain } from './force-primitives.js';
export { resist, burst, startle, lookAt, boundary, contain, spring, seek, flee } from './force-primitives.js';

// Helper: build a bucket lookup from [name, low, high] triples.
function makeBuckets(arr) {
  return Object.fromEntries(arr.map(([name, low, high]) => [name, { low, high }]));
}
function sample(map, bucket) {
  const { low, high } = map[bucket];
  return low + Math.random() * (high - low);
}

// ---- Speed (px/s) — how fast things move ----
// 512 px/s = full canvas width in 1 second.
const SPEED_MAP = makeBuckets([
  ['crawl',    0,    48],   // barely moving, creeping
  ['slow',     48,   96],   // cautious, reluctant
  ['moderate', 96,  192],   // walking pace, steady
  ['fast',     192, 320],   // running, urgent
  ['rapid',    320, 420],   // dashing, frantic
  ['extreme',  420, 512],   // explosive, instant-feel
]);
export function speed(bucket) { return sample(SPEED_MAP, bucket); }

// ---- Drag (unitless coefficient) — how quickly things slow down ----
// Drag is a force that opposes motion.
// f = -b * v
// Velocity-proportional: v *= e^(-drag * deltaTime). Half-life = ln(2) / drag.
//   light   → half-life 0.7–2.3s  (glidy, coasts far)
//   medium  → half-life 0.23–0.7s (natural slowdown)
//   heavy   → half-life 0.12–0.23s (strong decel, headwind)
//   extreme → half-life 0.07–0.12s (near-instant stop, tremor only)
const DRAG_MAP = makeBuckets([
  ['light',    0.3,  1.0],
  ['medium',   1.0,  3.0],
  ['heavy',    3.0,  6.0],
  ['extreme',  6.0, 10.0],
]);
export function drag(bucket) { return sample(DRAG_MAP, bucket); }

// ---- Size (radius in px) — how big entities are ----
// Canvas is 512×512. Default entity radius is 12.
const SIZE_MAP = makeBuckets([
  ['xs',     4,    8],    // tiny, subtle, particle-like
  ['small',  8,   14],    // understated, delicate
  ['medium', 14,  24],    // default presence, balanced
  ['large',  24,  40],    // prominent, commanding
  ['xl',     40,  64],    // dominating, overwhelming
]);
export function size(bucket) { return sample(SIZE_MAP, bucket); }

// ---- Mass & drag from radius (physics-derived) ----
// Mass ∝ area (r²), drag ∝ cross-section (r). Reference: r=19 → mass=1.0, drag=1.5.
// With mass-aware resist, effective drag = drag/mass ∝ 1/r (larger things coast more).
const REF_RADIUS = 19;   // midpoint of 'medium' size bucket
export function massFromRadius(r) { return (r / REF_RADIUS) ** 2; }
export function dragFromRadius(r) { return 1.5 * (r / REF_RADIUS); }

// ---- Restitution (unitless 0–1) — how bouncy wall collisions feel ----
// 0 = all energy absorbed, 1 = perfect elastic bounce.
const RESTITUTION_MAP = makeBuckets([
  ['deadStop', 0,    0.05],  // hits wall and sticks, no bounce
  ['absorb',   0.15, 0.4 ],  // most energy lost, heavy thud
  ['rebound',  0.4,  0.6 ],  // moderate bounce, natural feel
  ['springy',  0.6,  0.85],  // lively, energetic return
  ['perfect',  0.85, 1.0 ],  // near-full energy, rubber ball
]);
export function boundaryBehavior(bucket) { return sample(RESTITUTION_MAP, bucket); }

// ---- Max Steering Force (px/s²) — how sharply entities can change direction ----
// Higher = snappier turns, lower = wide sweeping arcs.
// Controls turning responsiveness independent of speed/drag.
const MAX_FORCE_MAP = makeBuckets([
  ['sluggish',  40,  100],   // wide arcs, slow to change direction (heavy, sad, reluctant)
  ['normal',   100,  250],   // moderate responsiveness (natural movement)
  ['agile',    250,  500],   // quick direction changes (alert, nervous)
  ['instant',  500, 1200],   // near-instant response (startled, frantic)
]);
export function maxForce(bucket) { return sample(MAX_FORCE_MAP, bucket); }

// ================================================================
//  COLLISION DETECTION
// ================================================================

/**
 * detectCollisions(entities)
 * N² pass: clears every entity's .collisions list, then populates it
 * with { other, nx, ny, overlap } for each overlapping pair.
 * nx/ny point from self toward other (contact normal).
 * Detection only — no velocity changes. Scenarios decide the response.
 * Call once per frame, before update().
 */
export function detectCollisions(entities) {
  const arr = Array.isArray(entities) ? entities : [...entities];
  // Clear last frame's collisions
  for (let i = 0; i < arr.length; i++) arr[i].collisions = [];

  // Check every pair once
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      const entityA = arr[i];
      const entityB = arr[j];

      // Vector from A to B
      const deltaX = entityB.x - entityA.x;
      const deltaY = entityB.y - entityA.y;
      const distance = Math.hypot(deltaX, deltaY);
      const radiusA = entityA.radius * Math.max(entityA.sx || 1, entityA.sy || 1);
      const radiusB = entityB.radius * Math.max(entityB.sx || 1, entityB.sy || 1);
      const touchingDistance = radiusA + radiusB;

      // No overlap — skip
      if (distance >= touchingDistance || distance < 0.01) continue;

      // Contact normal: unit vector pointing from A toward B
      const normalX = deltaX / distance;
      const normalY = deltaY / distance;
      const overlap = touchingDistance - distance;

      // Both entities get a record — normals point toward the other
      entityA.collisions.push({ other: entityB, nx: normalX, ny: normalY, overlap });
      entityB.collisions.push({ other: entityA, nx: -normalX, ny: -normalY, overlap });
    }
  }
}

// ================================================================
//  FORCE PRIMITIVES — now in force-primitives.js, re-exported at top
// ================================================================



// ================================================================
//  INTEGRATE
// ================================================================

/**
 * integrate(entity, deltaTime)
 * Step position from velocity, update orientation & history trail.
 */
export function integrate(entity, deltaTime) {
  // Cap velocity to maxSpeed if set
  if (entity.maxSpeed < Infinity) {
    const currentSpeed = entity.speed;
    if (currentSpeed > entity.maxSpeed) {
      const scale = entity.maxSpeed / currentSpeed;
      entity.vx *= scale;
      entity.vy *= scale;
    }
  }

  // Path-driven entities own their position — only apply offsets
  if (entity._pathDriven) {
    if (entity._motionOffsetX) { entity.x += entity._motionOffsetX; }
    if (entity._motionOffsetY) { entity.y += entity._motionOffsetY; }
    entity._pathDriven = false;
  } else {
    entity.x += entity.vx * deltaTime;
    entity.y += entity.vy * deltaTime;
    if (entity._motionOffsetX) { entity.x += entity._motionOffsetX; }
    if (entity._motionOffsetY) { entity.y += entity._motionOffsetY; }
  }

  // rotate to face direction traveled
  if (entity.speed > 5 && !entity._lockOrientation) {
    const target = Math.atan2(entity.vy, entity.vx);
    let diff = target - entity.orientation;
    while (diff > Math.PI) diff -= Math.PI * 2;
    while (diff < -Math.PI) diff += Math.PI * 2;
    entity.orientation += diff * 0.13;
  }
  entity.historyTimer += deltaTime;
  if (entity.historyTimer > 0.055) {
    entity.historyTimer = 0;
    entity.history.push({ x: entity.x, y: entity.y, color: entity.color });
    if (entity.historyLength > 0 && entity.history.length > entity.historyLength) entity.history.shift();
  }
}

// ================================================================
//  CONSTRAINTS
// ================================================================

/**
 * collide(entities, stiffness?, damping?)
 * Spring-force collision — overlapping entities push each other apart
 * with force proportional to overlap depth. No discrete event, no state.
 * stiffness: how hard the spring pushes (default 0.5)
 * damping: how much approaching velocity is absorbed (0–1, default 0.3)
 * Reads: entity position, velocity, radius. Writes: velocity.
 * Behavior: entities compress into each other and rebound naturally.
 */
export function collide(entities, stiffness = 0.5, damping = 0.3) {
  const arr = Array.isArray(entities) ? entities : [...entities];
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      const entityA = arr[i];
      const entityB = arr[j];
      let deltaX = entityB.x - entityA.x;
      let deltaY = entityB.y - entityA.y;
      let distance = Math.hypot(deltaX, deltaY);
      const radiusA = entityA.radius * Math.max(entityA.sx || 1, entityA.sy || 1);
      const radiusB = entityB.radius * Math.max(entityB.sx || 1, entityB.sy || 1);
      const minDist = radiusA + radiusB;

      if (distance >= minDist) continue;

      // Coincident entities: pick a random direction so they separate
      if (distance < 0.01) {
        const angle = Math.random() * Math.PI * 2;
        deltaX = Math.cos(angle);
        deltaY = Math.sin(angle);
        distance = 0.01;
      }

      const normalX = deltaX / distance;
      const normalY = deltaY / distance;
      const overlap = minDist - distance;

      // Mass-weighted distribution: lighter entity gets more velocity change.
      // For equal masses (default), shareA = shareB = 0.5 — identical to pre-mass behavior.
      const massA = entityA.mass ?? 1;
      const massB = entityB.mass ?? 1;
      const invA = 1 / massA;
      const invB = 1 / massB;
      const invSum = invA + invB;
      const shareA = invA / invSum;
      const shareB = invB / invSum;

      // Positional correction: immediately separate overlapping entities
      const correction = overlap * 0.5;
      entityA.x -= normalX * correction * shareA;
      entityA.y -= normalY * correction * shareA;
      entityB.x += normalX * correction * shareB;
      entityB.y += normalY * correction * shareB;

      // Spring: overlap pushes entities apart, weighted by inverse mass.
      const springImpulse = overlap * stiffness;
      entityA.vx -= normalX * springImpulse * shareA;
      entityA.vy -= normalY * springImpulse * shareA;
      entityB.vx += normalX * springImpulse * shareB;
      entityB.vy += normalY * springImpulse * shareB;

      // Damping: absorb approaching velocity to prevent oscillation
      const approach = (entityA.vx - entityB.vx) * normalX + (entityA.vy - entityB.vy) * normalY;
      if (approach > 0) {
        const dampImpulse = approach * damping;
        entityA.vx -= normalX * dampImpulse * shareA;
        entityA.vy -= normalY * dampImpulse * shareA;
        entityB.vx += normalX * dampImpulse * shareB;
        entityB.vy += normalY * dampImpulse * shareB;
      }
    }
  }
}

// Re-export drawPath from draw-utils for backwards compat
export { drawPath } from './draw-utils.js';

// ================================================================
//  F NAMESPACE (convenience for HTML references)
// ================================================================

export const F = {
  resist, burst, startle, lookAt, spring, seek, flee,
  boundary, contain, collide, detectCollisions,
  speed, drag, size, boundaryBehavior, maxForce,
  massFromRadius, dragFromRadius,
};
