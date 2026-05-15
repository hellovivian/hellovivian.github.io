// ── SmartEvade ──
// Flee that samples all directions and balances open space vs distance from predator.
// When cornered, open space dominates so the prey escapes along walls.

import { RelationalVerb } from './verb.js';

const NUM_RAYS = 12;
const TWO_PI = Math.PI * 2;

export class SmartEvade extends RelationalVerb {
  constructor({ speed = 180 } = {}) {
    super('smartEvade', { gap: 12, collision: 'stop' });
    this._speed = speed;
  }

  update(entity, dt) {
    const t = entity._target;
    if (!t) return;

    const b = entity._bounds || { left: 0, top: 0, right: 512, bottom: 512 };
    const predAngle = Math.atan2(t.y - entity.y, t.x - entity.x);
    // How cornered are we? Minimum distance to any wall
    const minWall = Math.min(
      entity.x - b.left, b.right - entity.x,
      entity.y - b.top, b.bottom - entity.y,
    );
    // When cornered, prioritize open space over fleeing direction
    const wallWeight = minWall < 60 ? 1.5 : 0.6;
    const fleeWeight = minWall < 60 ? 0.3 : 1.0;

    let bestAngle = predAngle + Math.PI;
    let bestScore = -Infinity;

    for (let i = 0; i < NUM_RAYS; i++) {
      const angle = (i / NUM_RAYS) * TWO_PI;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);

      // Ray to wall
      let wallDist = 1000;
      if (cos > 0.01)  wallDist = Math.min(wallDist, (b.right - entity.x) / cos);
      if (cos < -0.01) wallDist = Math.min(wallDist, (b.left - entity.x) / cos);
      if (sin > 0.01)  wallDist = Math.min(wallDist, (b.bottom - entity.y) / sin);
      if (sin < -0.01) wallDist = Math.min(wallDist, (b.top - entity.y) / sin);
      wallDist = Math.max(wallDist, 0);

      // How much does this direction point away from predator? (-1 to 1)
      const awayness = -Math.cos(angle - predAngle);

      const score = wallDist * wallWeight + awayness * 100 * fleeWeight;

      if (score > bestScore) {
        bestScore = score;
        bestAngle = angle;
      }
    }

    // Steer — set velocity directly toward best direction
    const goalVx = Math.cos(bestAngle) * this._speed;
    const goalVy = Math.sin(bestAngle) * this._speed;

    // Smooth steering
    entity.vx += (goalVx - entity.vx) * 6 * dt;
    entity.vy += (goalVy - entity.vy) * 6 * dt;

    // Clamp
    const spd = Math.hypot(entity.vx, entity.vy);
    if (spd > this._speed) {
      entity.vx = (entity.vx / spd) * this._speed;
      entity.vy = (entity.vy / spd) * this._speed;
    }
  }
}
