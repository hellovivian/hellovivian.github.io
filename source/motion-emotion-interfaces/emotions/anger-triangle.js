// ── Anger (Triangle) ──
// Event-driven phases: anticipate (windup + shake) → lunge (charge to wall) → recoil (bounce back, settle) → repeat.

import { Phase } from '../phase.js';
import { Emotion } from '../emotion.js';


const CHARGE_SPEED = 750;
const LOCK_DUR_MIN = 0.2;
const LOCK_DUR_MAX = 0.6;
const WINDUP_DUR = 0.12;
const IMPACT_FREEZE = 0.06;
const RECOIL_DUR = 0.12;
const ARRIVAL_DIST = 8;

class AngerTriangleEmotion extends Emotion {
  constructor(phases, opts = {}) {
    super(phases, opts);
  }
  decorate(entity) {
    const phase = entity._currentPhase?.name;
    // Tremble during lock — tight, contained vibration that builds
    if (phase === 'lock') {
      const t = Math.min((entity._angerTimer ?? 0) / (entity._lockDur ?? 0.4), 1);
      const shakeMag = t * t * 4;
      entity.x += Math.sin((entity._angerTimer ?? 0) * 90) * shakeMag;
      entity.y += Math.cos((entity._angerTimer ?? 0) * 70) * shakeMag;
    }
  }
}

const HITS_PER_WALL_MIN = 2;
const HITS_PER_WALL_MAX = 5;

function pointOnWall(wall, bounds) {
  const m = 8;
  switch (wall) {
    case 0: return { x: bounds.left + m,  y: bounds.top + m + Math.random() * (bounds.bottom - bounds.top - m * 2) };  // left
    case 1: return { x: bounds.right - m, y: bounds.top + m + Math.random() * (bounds.bottom - bounds.top - m * 2) };  // right
    case 2: return { x: bounds.left + m + Math.random() * (bounds.right - bounds.left - m * 2), y: bounds.top + m };   // top
    case 3: return { x: bounds.left + m + Math.random() * (bounds.right - bounds.left - m * 2), y: bounds.bottom - m }; // bottom
  }
}

function pickTarget(entity, bounds) {
  if (!bounds) return { x: 256, y: 256 };
  entity._wallHits = (entity._wallHits ?? 0) + 1;
  // Pick a new wall after enough hits, or on first pick
  const hitsNeeded = entity._hitsPerWall ?? 0;
  if (entity._wallHits > hitsNeeded || entity._currentWall == null) {
    // Pick the farthest wall for a long lunge
    const dists = [
      entity.x - bounds.left,    // 0: left
      bounds.right - entity.x,   // 1: right
      entity.y - bounds.top,     // 2: top
      bounds.bottom - entity.y,  // 3: bottom
    ];
    // Sort by distance descending, pick from the two farthest with some randomness
    const ranked = [0, 1, 2, 3].sort((a, b) => dists[b] - dists[a]);
    entity._currentWall = ranked[Math.random() < 0.7 ? 0 : 1];
    entity._wallHits = 1;
    entity._hitsPerWall = HITS_PER_WALL_MIN + Math.floor(Math.random() * (HITS_PER_WALL_MAX - HITS_PER_WALL_MIN + 1));
    entity._wallPoint = pointOnWall(entity._currentWall, bounds);
  }
  return entity._wallPoint;
}

// ── Export ──

export const angerTriangle = new AngerTriangleEmotion([
  new Phase({
    name: 'lock',
    description: 'Still, seething — face target and tremble in place',
    onEnter(entity, bounds) {
      entity._angerTarget = pickTarget(entity, bounds);
      entity._angerAnchorX = entity.x;
      entity._angerAnchorY = entity.y;
      entity._angerTimer = 0;
      entity._lockDur = LOCK_DUR_MIN + Math.random() * (LOCK_DUR_MAX - LOCK_DUR_MIN);
      entity.vx = 0;
      entity.vy = 0;
      // Face the new target
      const dx = entity._angerTarget.x - entity.x;
      const dy = entity._angerTarget.y - entity.y;
      entity.orientation = Math.atan2(dy, dx);
      entity._lockOrientation = true;
    },
    update(entity, dt) {
      entity._angerTimer += dt;
      entity.vx = 0;
      entity.vy = 0;
    },
    condition(entity) {
      return entity._angerTimer >= entity._lockDur;
    },
    next: 'windup',
  }),
  new Phase({
    name: 'windup',
    description: 'Short sharp pullback before strike',
    onEnter(entity) {
      entity._angerTimer = 0;
      entity._angerAnchorX = entity.x;
      entity._angerAnchorY = entity.y;
    },
    update(entity, dt) {
      entity._angerTimer += dt;
      const t = Math.min(entity._angerTimer / WINDUP_DUR, 1);

      const dx = entity._angerTarget.x - entity._angerAnchorX;
      const dy = entity._angerTarget.y - entity._angerAnchorY;
      const dist = Math.hypot(dx, dy) || 1;
      const nx = dx / dist;
      const ny = dy / dist;

      // Quick pullback
      const pullback = t * t * (CHARGE_SPEED / 15);
      entity.x = entity._angerAnchorX - nx * pullback;
      entity.y = entity._angerAnchorY - ny * pullback;
      // Clamp to bounds
      const b = entity._bounds;
      if (b) {
        const bb = entity.radius * 1.3;
        entity.x = Math.max(b.left + bb, Math.min(b.right - bb, entity.x));
        entity.y = Math.max(b.top + bb, Math.min(b.bottom - bb, entity.y));
      }
      entity.vx = 0;
      entity.vy = 0;
    },
    condition(entity) {
      return entity._angerTimer >= WINDUP_DUR;
    },
    next: 'lunge',
  }),
  new Phase({
    name: 'lunge',
    description: 'Charge directly at target',
    update(entity) {
      const dx = entity._angerTarget.x - entity.x;
      const dy = entity._angerTarget.y - entity.y;
      const dist = Math.hypot(dx, dy);
      if (dist > 1) {
        entity.vx = (dx / dist) * CHARGE_SPEED;
        entity.vy = (dy / dist) * CHARGE_SPEED;


      }
    },
    condition(entity) {
      const dx = entity._angerTarget.x - entity.x;
      const dy = entity._angerTarget.y - entity.y;
      if (Math.hypot(dx, dy) < ARRIVAL_DIST) return true;
      // Also trigger on boundary clamp — entity is at the wall even if target is unreachable
      const b = entity._bounds;
      if (b) {
        const r = entity.radius;
        if (entity.x - r <= b.left || entity.x + r >= b.right ||
            entity.y - r <= b.top  || entity.y + r >= b.bottom) return true;
      }
      return false;
    },
    next: 'impact',
  }),
  new Phase({
    name: 'impact',
    description: 'Freeze on contact — sells the hit',
    onEnter(entity) {
      entity._angerTimer = 0;
      entity._recoilOrientation = entity.orientation;
      entity._impactVx = entity.vx;
      entity._impactVy = entity.vy;
      entity.vx = 0;
      entity.vy = 0;
    },
    update(entity, dt) {
      entity._angerTimer += dt;
    },
    condition(entity) {
      return entity._angerTimer >= IMPACT_FREEZE;
    },
    next: 'recoil',
  }),
  new Phase({
    name: 'recoil',
    description: 'Snap back from wall',
    onEnter(entity) {
      entity._angerTimer = 0;
      // Strong kick away from wall so it clears the area
      entity.vx = entity._impactVx * -2;
      entity.vy = entity._impactVy * -2;
    },
    update(entity, dt) {
      entity._angerTimer += dt;
      const progress = entity._angerTimer / RECOIL_DUR;
      // Aggressive damping that kills velocity by ~60% through
      entity.vx *= Math.exp(-10 * dt);
      entity.vy *= Math.exp(-10 * dt);
      if (progress > 0.6) { entity.vx = 0; entity.vy = 0; }
      entity.orientation = entity._recoilOrientation;
    },
    condition(entity) {
      return entity._angerTimer >= RECOIL_DUR;
    },
    next: 'lock',
  }),
], {
  energyFunction: t => 0.6 + 0.4 * Math.abs(Math.sin(t * Math.PI * 4)),
});
