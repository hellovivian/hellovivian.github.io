// ── Force Primitives ──
// Pure functions that apply forces to entities.
// Each reads from and writes to entity velocity (and sometimes position/orientation).

/**
 * resist(entity, drag, deltaTime)
 * Velocity-proportional drag — fast things slow fast, slow things coast.
 * drag is a unitless coefficient.
 * Reads: entity velocity. Writes: entity velocity.
 * Behavior: reluctance, heaviness, fatigue, freezing, air resistance.
 */
export function resist(entity, drag, deltaTime) {
  const m = entity.mass ?? 1;
  const factor = Math.exp(-(drag / m) * deltaTime);
  entity.vx *= factor;
  entity.vy *= factor;
}

/**
 * burst(entity, threshold, impulse, energyCost, dirX?, dirY?)
 * When speed drops below threshold, inject velocity and spend energy.
 * Direction defaults to entity's current orientation if not specified.
 * Returns true if a burst fired.
 * Reads: entity speed, energy, orientation. Writes: entity velocity, energy.
 * Behavior: determination, struggling, pushing through resistance.
 */
export function burst(entity, threshold, impulse, energyCost, dirX, dirY) {
  if (entity.speed < threshold && entity.energy > energyCost) {
    const directionX = dirX ?? Math.cos(entity.orientation);
    const directionY = dirY ?? Math.sin(entity.orientation);
    const m = entity.mass ?? 1;
    entity.vx += (directionX * impulse) / m;
    entity.vy += (directionY * impulse) / m;
    entity.energy = Math.max(0, entity.energy - energyCost);
    return true;
  }
  return false;
}

/**
 * startle(entity, impulseX, impulseY)
 * Instant velocity impulse — no deltaTime, applied immediately.
 * Reads: nothing. Writes: entity velocity.
 * Behavior: flinching, being shoved, hopping, trembling, surprise.
 */
export function startle(entity, impulseX, impulseY) {
  const m = entity.mass ?? 1;
  entity.vx += impulseX / m;
  entity.vy += impulseY / m;
}

/**
 * lookAt(entity, targetX, targetY)
 * Snap orientation to face a point. Call AFTER integrate() to override
 * velocity-based auto-rotation. Useful when an entity should face a target
 * while moving in a different direction (e.g. backing away while staring).
 * Reads: entity position. Writes: entity orientation.
 */
export function lookAt(entity, targetX, targetY) {
  entity.orientation = Math.atan2(targetY - entity.y, targetX - entity.x);
}

/**
 * boundary(entity, bounds, restitution)
 * Hard wall collision — clamp position, reverse and scale velocity.
 * Restitution 0 = dead stop, 1 = perfect bounce.
 * Reads: entity position, velocity. Writes: both.
 * Behavior: bouncing, containment, hitting walls (reads as frustration).
 */
export function boundary(entity, bounds, restitution) {
  const radius = entity.radius;
  if (bounds.left != null && entity.x - radius < bounds.left) { entity.x = bounds.left + radius; entity.vx = Math.abs(entity.vx) * restitution; }
  if (bounds.right != null && entity.x + radius > bounds.right) { entity.x = bounds.right - radius; entity.vx = -Math.abs(entity.vx) * restitution; }
  if (bounds.top != null && entity.y - radius < bounds.top) { entity.y = bounds.top + radius; entity.vy = Math.abs(entity.vy) * restitution; }
  if (bounds.bottom != null && entity.y + radius > bounds.bottom) { entity.y = bounds.bottom - radius; entity.vy = -Math.abs(entity.vy) * restitution; }
}

/**
 * contain(entity, bounds, margin, acceleration, deltaTime)
 * Soft containment — increasing inward push near edges. Never collides.
 * Margin is the zone width (px) where the push activates.
 * Acceleration is max push (px/s²) at the very edge.
 * Reads: entity position. Writes: entity velocity.
 * Behavior: staying in area without feeling trapped.
 */
export function contain(entity, bounds, margin, acceleration, deltaTime) {
  const m = entity.mass ?? 1;
  const a = acceleration / m;
  if (entity.x < bounds.left + margin)  entity.vx += a * (1 - (entity.x - bounds.left) / margin) * deltaTime;
  if (entity.x > bounds.right - margin) entity.vx -= a * (1 - (bounds.right - entity.x) / margin) * deltaTime;
  if (entity.y < bounds.top + margin)   entity.vy += a * (1 - (entity.y - bounds.top) / margin) * deltaTime;
  if (entity.y > bounds.bottom - margin) entity.vy -= a * (1 - (bounds.bottom - entity.y) / margin) * deltaTime;
}

/**
 * spring(entity, anchorX, anchorY, stiffness, deltaTime)
 * Physical spring force — raw acceleration proportional to displacement.
 * NOT a steering behavior: no desired-current, no maxForce cap.
 * Use for elastic tethers, web tension, pendulums.
 * Reads: entity position. Writes: entity velocity.
 */
export function spring(entity, anchorX, anchorY, stiffness, deltaTime) {
  const deltaX = anchorX - entity.x;
  const deltaY = anchorY - entity.y;
  const m = entity.mass ?? 1;
  entity.vx += (deltaX * stiffness / m) * deltaTime;
  entity.vy += (deltaY * stiffness / m) * deltaTime;
}

/**
 * seek(entity, targetX, targetY, strength, deltaTime)
 * Accelerate toward a target point. Strength is acceleration (px/s²).
 * Reads: entity position. Writes: entity velocity.
 * Behavior: approaching, following, returning, homing in.
 */
export function seek(entity, targetX, targetY, strength, deltaTime) {
  const dx = targetX - entity.x;
  const dy = targetY - entity.y;
  const d = Math.hypot(dx, dy);
  if (d < 0.01) return;
  const m = entity.mass ?? 1;
  const a = strength / m;
  entity.vx += (dx / d) * a * deltaTime;
  entity.vy += (dy / d) * a * deltaTime;
}

/**
 * flee(entity, targetX, targetY, strength, deltaTime)
 * Accelerate away from a target point. Strength is acceleration (px/s²).
 * Reads: entity position. Writes: entity velocity.
 * Behavior: retreating, avoiding, repulsion, recoiling.
 */
export function flee(entity, targetX, targetY, strength, deltaTime) {
  const dx = entity.x - targetX;
  const dy = entity.y - targetY;
  const d = Math.hypot(dx, dy);
  if (d < 0.01) return;
  const m = entity.mass ?? 1;
  const a = strength / m;
  entity.vx += (dx / d) * a * deltaTime;
  entity.vy += (dy / d) * a * deltaTime;
}
