// ── Anger ──
// Volatile lunge-freeze cycles with aggressive seethe pulsing.
// High arousal, negative valence — directed fury.
//
// Improvements:
// (1) Exaggerated seethe + lunge parameters
// (2) Wall interaction — slams into bounds, uses walls as launch points
// (3) Coiling compression during freeze, explosive expansion on lunge
// (4) Tense stillness with building vibration before each strike

import { Phase } from '../phase.js';
import { Emotion } from '../emotion.js';

const SEETHE_FREQ = 8;
const SEETHE_SCALE = 0.75;
const LUNGE_SPEED = 580;
const COIL_VIBRATE_FREQ = 20;
const COIL_VIBRATE_AMP = 1.8;

class AngerEmotion extends Emotion {
  constructor(phases, opts = {}) {
    super(phases, opts);
  }

  decorate(entity, dt) {
    entity._seetheT = (entity._seetheT ?? 0) + dt;
    const nrg = entity.energy ?? 1;
    const t = entity._seetheT * SEETHE_FREQ * Math.PI * 2;
    const wave = Math.sin(t) + 0.5 * Math.sin(t * 2.3 + 1.7) + 0.3 * Math.sin(t * 3.7 + 0.4);
    const pulse = wave > 0 ? wave : wave * 0.3;
    const amp = SEETHE_SCALE * (0.3 + 0.7 * nrg);
    entity.radius = entity.baseRadius * (1 + pulse * amp / 1.8);

    // Seethe also pulses shape — compress horizontally, expand vertically on peaks
    const shapePulse = pulse * amp * 0.3;
    entity.sx = 1 + shapePulse * 0.4;
    entity.sy = 1 - shapePulse * 0.25;
  }
}

// ── Helpers ──

/** Find the nearest wall and return direction toward it + distance. */
function nearestWall(entity, bounds) {
  if (!bounds) return null;
  const r = entity.radius ?? 12;
  const walls = [];
  if (bounds.left != null) walls.push({ dx: -1, dy: 0, dist: entity.x - bounds.left - r, wallX: bounds.left + r, wallY: entity.y });
  if (bounds.right != null) walls.push({ dx: 1, dy: 0, dist: bounds.right - entity.x - r, wallX: bounds.right - r, wallY: entity.y });
  if (bounds.top != null) walls.push({ dx: 0, dy: -1, dist: entity.y - bounds.top - r, wallX: entity.x, wallY: bounds.top + r });
  if (bounds.bottom != null) walls.push({ dx: 0, dy: 1, dist: bounds.bottom - entity.y - r, wallX: entity.x, wallY: bounds.bottom - r });
  walls.sort((a, b) => a.dist - b.dist);
  return walls[0] ?? null;
}

/** Check if entity is touching any wall. */
function touchingWall(entity, bounds) {
  if (!bounds) return false;
  const r = entity.radius ?? 12;
  const margin = 3;
  return (
    (bounds.left != null && entity.x - r <= bounds.left + margin) ||
    (bounds.right != null && entity.x + r >= bounds.right - margin) ||
    (bounds.top != null && entity.y - r <= bounds.top + margin) ||
    (bounds.bottom != null && entity.y + r >= bounds.bottom - margin)
  );
}

/** Coiling freeze — builds tension through compression and increasing vibration. */
function coilingFreeze(entity, dt, t, phaseFrom, phaseTo) {
  const bounds = entity._bounds;
  if (entity._pinAnchorX == null) {
    // Clamp anchor inside bounds so it doesn't freeze off-screen
    let ax = entity.x, ay = entity.y;
    if (bounds) {
      const r = entity.radius ?? 12;
      ax = Math.max((bounds.left ?? -Infinity) + r, Math.min((bounds.right ?? Infinity) - r, ax));
      ay = Math.max((bounds.top ?? -Infinity) + r, Math.min((bounds.bottom ?? Infinity) - r, ay));
    }
    entity._pinAnchorX = ax;
    entity._pinAnchorY = ay;
  }

  // Progress within this freeze phase (0→1)
  const localT = (t - phaseFrom) / (phaseTo - phaseFrom);

  // Coil: compress size as tension builds
  const coilAmount = localT * 0.25;
  entity.radius = entity.baseRadius * (1 - coilAmount);

  // Vibration builds in intensity throughout freeze
  entity._coilT = (entity._coilT ?? 0) + dt;
  const vibIntensity = localT * localT * COIL_VIBRATE_AMP;
  const vibX = Math.sin(entity._coilT * COIL_VIBRATE_FREQ * Math.PI * 2) * vibIntensity;
  const vibY = Math.cos(entity._coilT * COIL_VIBRATE_FREQ * Math.PI * 2 * 1.3) * vibIntensity * 0.7;

  entity.x = entity._pinAnchorX + vibX;
  entity.y = entity._pinAnchorY + vibY;
  entity.vx = 0;
  entity.vy = 0;
  entity._lungeFired = false;

  // Own position — skip external boundary/integration
  entity._skipBoundary = true;
}

/** Clamp entity inside bounds, bounce off walls with restitution. */
function enforceBounds(entity, bounds, restitution) {
  if (!bounds) return false;
  const r = entity.radius ?? 12;
  let hit = false;
  if (bounds.left != null && entity.x - r < bounds.left) {
    entity.x = bounds.left + r;
    entity.vx = Math.abs(entity.vx) * restitution;
    hit = true;
  }
  if (bounds.right != null && entity.x + r > bounds.right) {
    entity.x = bounds.right - r;
    entity.vx = -Math.abs(entity.vx) * restitution;
    hit = true;
  }
  if (bounds.top != null && entity.y - r < bounds.top) {
    entity.y = bounds.top + r;
    entity.vy = Math.abs(entity.vy) * restitution;
    hit = true;
  }
  if (bounds.bottom != null && entity.y + r > bounds.bottom) {
    entity.y = bounds.bottom - r;
    entity.vy = -Math.abs(entity.vy) * restitution;
    hit = true;
  }
  return hit;
}

/** Explosive lunge with wall slam behavior. Handles its own integration + boundary. */
function explosiveLunge(entity, dt, escalation) {
  const bounds = entity._bounds;

  if (!entity._lungeFired) {
    entity._lungeFired = true;
    entity._pinAnchorX = null;
    entity._pinAnchorY = null;
    entity._wallSlam = false;
    entity._wallSlamTimer = 0;
    entity._coilT = 0;

    // Explosive expansion on lunge start
    entity.radius = entity.baseRadius * (1.3 + escalation * 0.15);

    const tgt = entity._target;
    const speed = LUNGE_SPEED * (0.7 + 0.3 * (entity.energy ?? 1)) * (1 + escalation * 0.2);

    if (tgt) {
      const dx = tgt.x - entity.x;
      const dy = tgt.y - entity.y;
      const d = Math.hypot(dx, dy) || 1;
      entity.vx = (dx / d) * speed;
      entity.vy = (dy / d) * speed;
    } else if (bounds) {
      // No target — ram the nearest wall
      const wall = nearestWall(entity, bounds);
      if (wall) {
        entity.vx = wall.dx * speed;
        entity.vy = wall.dy * speed;
      }
    }
  }

  // Integrate position (emotion owns movement when primary)
  entity.x += entity.vx * dt;
  entity.y += entity.vy * dt;

  // Wall slam detection — hit wall and stick briefly
  const hitWall = enforceBounds(entity, bounds, 0.6);
  if (hitWall && !entity._wallSlam) {
    entity._wallSlam = true;
    entity._wallSlamTimer = 0;
    // Impact compression
    entity.radius = entity.baseRadius * 1.4;
  }

  if (entity._wallSlam) {
    entity._wallSlamTimer += dt;
    // Stick to wall briefly with violent shaking
    if (entity._wallSlamTimer < 0.12) {
      entity.vx *= 0.1;
      entity.vy *= 0.1;
      // Impact shake
      const shake = (1 - entity._wallSlamTimer / 0.12) * 4;
      entity.x += (Math.random() - 0.5) * shake;
      entity.y += (Math.random() - 0.5) * shake;
      // Snap size back during impact
      entity.radius += (entity.baseRadius * 1.1 - entity.radius) * 0.3;
      entity._skipBoundary = true;
      return;
    }
    // After wall stick, bounce away
    entity._wallSlam = false;
  }

  // Collide with target
  const tgt = entity._target;
  if (tgt) {
    const dx = entity.x - tgt.x;
    const dy = entity.y - tgt.y;
    const dist = Math.hypot(dx, dy);
    const minDist = (entity.radius ?? 12) + (tgt.radius ?? 12);
    if (dist < minDist && dist > 0) {
      const nx = dx / dist;
      const ny = dy / dist;
      const overlap = minDist - dist;
      entity.x += nx * overlap * 0.8;
      entity.y += ny * overlap * 0.8;
      const dot = entity.vx * nx + entity.vy * ny;
      if (dot < 0) {
        entity.vx -= dot * nx * 1.5;
        entity.vy -= dot * ny * 1.5;
      }
    }
  }

  // Gradually return to base size
  entity.radius += (entity.baseRadius - entity.radius) * (1 - Math.exp(-4 * dt));
  entity.vx *= Math.exp(-2.5 * dt);
  entity.vy *= Math.exp(-2.5 * dt);

  // Own boundary — prevent double-integration in step()
  entity._skipBoundary = true;
}

export const anger = new AngerEmotion([
  new Phase({
    name: 'freeze',
    description: 'Coiling stillness — compression and building vibration',
    from: 0, to: 0.12,
    update(entity, dt, t) {
      coilingFreeze(entity, dt, t, 0, 0.12);
    },
  }),
  new Phase({
    name: 'lunge',
    description: 'Explosive lunge toward target or nearest wall',
    from: 0.12, to: 0.35,
    update(entity, dt) {
      explosiveLunge(entity, dt, 0);
    },
  }),
  new Phase({
    name: 'freeze2',
    description: 'Shorter, more agitated coil between strikes',
    from: 0.35, to: 0.45,
    update(entity, dt, t) {
      coilingFreeze(entity, dt, t, 0.35, 0.45);
    },
  }),
  new Phase({
    name: 'lunge2',
    description: 'Second strike — harder',
    from: 0.45, to: 0.68,
    update(entity, dt) {
      explosiveLunge(entity, dt, 0.5);
    },
  }),
  new Phase({
    name: 'freeze3',
    description: 'Final coil — shortest, most intense vibration',
    from: 0.68, to: 0.76,
    update(entity, dt, t) {
      coilingFreeze(entity, dt, t, 0.68, 0.76);
    },
  }),
  new Phase({
    name: 'lunge3',
    description: 'Final strike — maximum force',
    from: 0.76, to: 1.0,
    update(entity, dt) {
      explosiveLunge(entity, dt, 1.0);
    },
  }),
], {
  energyFunction: t => 0.6 + 0.4 * Math.abs(Math.sin(t * Math.PI * 3)),
});
