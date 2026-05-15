// ── Relational Verb Primitives ──
// Motion classes that require a target entity (entity._target).
// Used for two-entity interactions: follow, chase, avoid, etc.

import { RelationalVerb } from './verb.js';
import { SecondaryMotion } from './secondary-motion.js';
import { PathMotion } from './path-motion.js';
import { BezierPath } from './path.js';

// ── Follow ──

export class Follow extends RelationalVerb {
  constructor() { super('follow'); }
  update(entity, dt) {
    const t = entity._target;
    if (!t) return;
    const gap = t.radius + entity.radius + 12;
    const tSpeed = Math.hypot(t.vx, t.vy);
    let bx, by;
    if (tSpeed > 1) {
      bx = t.x - (t.vx / tSpeed) * gap;
      by = t.y - (t.vy / tSpeed) * gap;
    } else {
      const dx = entity.x - t.x;
      const dy = entity.y - t.y;
      const d = Math.hypot(dx, dy) || 1;
      bx = t.x + (dx / d) * gap;
      by = t.y + (dy / d) * gap;
    }
    entity.vx += (bx - entity.x) * 5 * dt;
    entity.vy += (by - entity.y) * 5 * dt;
    entity.vx *= Math.exp(-3 * dt);
    entity.vy *= Math.exp(-3 * dt);
    const dx = entity.x - t.x;
    const dy = entity.y - t.y;
    const dist = Math.hypot(dx, dy) || 1;
    if (dist < gap) {
      entity.x = t.x + (dx / dist) * gap;
      entity.y = t.y + (dy / dist) * gap;
      entity.vx *= 0.5;
      entity.vy *= 0.5;
    }
  }
}

// ── Chase ──

export class Chase extends RelationalVerb {
  constructor() { super('chase'); }

  update(entity, dt) {
    const t = entity._target;
    if (!t) return;

    const sm = entity._adverbSpeedMultiplier ?? 1;
    const am = entity._adverbAccelMultiplier ?? 1;
    entity.vx += (t.x - entity.x) * 5 * sm * am * dt;
    entity.vy += (t.y - entity.y) * 5 * sm * am * dt;
    entity.vx *= Math.exp(-3 * dt);
    entity.vy *= Math.exp(-3 * dt);

    // lookAt: orient toward target + ray-sweep
    const targetAngle = Math.atan2(t.y - entity.y, t.x - entity.x);
    entity.orientation = targetAngle;

    if (entity.shape !== 'triangle') {
      const ray = entity._lookAtRay;
      if (!ray) {
        entity._lookAtRay = {
          angle: targetAngle - 0.5 - Math.random() * 0.5,
          targetAngle,
          elapsed: 0,
        };
      } else {
        const diff = Math.abs(targetAngle - ray.targetAngle);
        if (diff > 0.3 && ray.elapsed > 0.25) {
          ray.angle = ray.targetAngle;
          ray.targetAngle = targetAngle;
          ray.elapsed = 0;
        } else {
          ray.targetAngle = targetAngle;
        }
        ray.elapsed += dt;
        ray.angle += (ray.targetAngle - ray.angle) * (1 - Math.exp(-18 * dt));
      }
    }
  }

  draw(ctx, entity) {
    const ray = entity._lookAtRay;
    if (!ray) return;

    const sweepDur = 0.15;
    const fadeDur = 0.15;
    let alpha;
    if (ray.elapsed < sweepDur) {
      alpha = 0.6;
    } else if (ray.elapsed < sweepDur + fadeDur) {
      alpha = 0.6 * (1 - (ray.elapsed - sweepDur) / fadeDur);
    } else {
      return;
    }

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = entity.color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(entity.x, entity.y, entity.radius + 5, ray.angle - 0.33, ray.angle + 0.33);
    ctx.stroke();
    ctx.restore();
  }

  cleanup(entity) {
    entity._lookAtRay = null;
  }
}

// ── LookAt ──

export class LookAt extends SecondaryMotion {
  constructor() { super('lookAt'); }

  update(entity, dt) {
    const t = entity._target;
    if (!t) return;
    const targetAngle = Math.atan2(t.y - entity.y, t.x - entity.x);
    entity.orientation = targetAngle;

    if (entity.shape !== 'triangle') {
      const ray = entity._lookAtRay;
      if (!ray) {
        entity._lookAtRay = {
          angle: targetAngle - 0.5 - Math.random() * 0.5,
          targetAngle,
          elapsed: 0,
        };
      } else {
        const diff = Math.abs(targetAngle - ray.targetAngle);
        if (diff > 0.3 && ray.elapsed > 0.25) {
          ray.angle = ray.targetAngle;
          ray.targetAngle = targetAngle;
          ray.elapsed = 0;
        } else {
          ray.targetAngle = targetAngle;
        }
        ray.elapsed += dt;
        ray.angle += (ray.targetAngle - ray.angle) * (1 - Math.exp(-18 * dt));
      }
    }
  }

  draw(ctx, entity) {
    const ray = entity._lookAtRay;
    if (!ray) return;

    const sweepDur = 0.15;
    const fadeDur = 0.15;
    let alpha;
    if (ray.elapsed < sweepDur) {
      alpha = 0.6;
    } else if (ray.elapsed < sweepDur + fadeDur) {
      alpha = 0.6 * (1 - (ray.elapsed - sweepDur) / fadeDur);
    } else {
      return;
    }

    const arcSpread = 0.33;
    const gap = 5;

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = entity.color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(entity.x, entity.y, entity.radius + gap, ray.angle - arcSpread, ray.angle + arcSpread);
    ctx.stroke();
    ctx.restore();
  }

  cleanup(entity) {
    entity._lookAtRay = null;
  }
}


// ── Avoid ──

export class Avoid extends RelationalVerb {
  constructor() { super('avoid'); }
  update(entity, dt) {
    const t = entity._target;
    if (!t) return;
    const dx = entity.x - t.x;
    const dy = entity.y - t.y;
    const dist = Math.hypot(dx, dy) || 1;
    const safeRadius = (t.radius || 20) + (entity.radius || 20) + 80;
    if (dist < safeRadius) {
      const urgency = 1 - dist / safeRadius;
      const fleeForce = urgency * 300;
      entity.vx += (dx / dist) * fleeForce * dt;
      entity.vy += (dy / dist) * fleeForce * dt;
    }
    entity.vx *= Math.exp(-2 * dt);
    entity.vy *= Math.exp(-2 * dt);
  }
}

// ── Flee ──
// Panicked flight away from target. Always repelling, speed scales
// with proximity — closer = faster. Looks away from target.

export class Flee extends RelationalVerb {
  constructor() { super('flee', { gap: 0, collision: 'none' }); }

  update(entity, dt) {
    const t = entity._target;
    if (!t) return;

    const dx = entity.x - t.x;
    const dy = entity.y - t.y;
    const dist = Math.hypot(dx, dy) || 1;
    const nx = dx / dist;
    const ny = dy / dist;

    // Panic scales inversely with distance
    const proximity = Math.max(0, 1 - dist / 300);
    const speed = 120 + proximity * 280;

    entity.vx += nx * speed * dt;
    entity.vy += ny * speed * dt;
    entity.vx *= Math.exp(-1.5 * dt);
    entity.vy *= Math.exp(-1.5 * dt);

    this.lookAway(entity, dt, 12);
  }
}

// ── Swoop ──

export class Swoop extends PathMotion {
  constructor() { super('swoop'); this.generatesPath = true; }

  update(entity, dt) {
    const t = entity._target;
    if (!t) return;

    if (!entity._path || entity._swoopTarget !== t) {
      entity._swoopTarget = t;
      const side = Math.random() < 0.5 ? 1 : -1;
      entity._path = BezierPath.fromEndpoints(
        { x: entity.x, y: entity.y },
        { x: t.x, y: t.y },
        { perpOffset: 0.4, side },
      );
      this.t = 0;
      entity._ps = entity._path;
    }

    super.update(entity, dt);
  }

  cleanup(entity) {
    entity._path = null;
    entity._ps = null;
    this.t = 0;
    entity._swoopTarget = null;
  }
}

// ── Jump ──

export class Jump extends PathMotion {
  constructor() { super('jump'); this.generatesPath = true; }

  update(entity, dt) {
    const t = entity._target;
    if (!t) return;

    if (!entity._path || entity._jumpTarget !== t) {
      entity._jumpTarget = t;
      const side = Math.random() < 0.5 ? 1 : -1;
      entity._path = BezierPath.fromEndpoints(
        { x: entity.x, y: entity.y },
        { x: t.x, y: t.y },
        { perpOffset: 0.4, side },
      );
      this.t = 0;
      entity._ps = entity._path;
    }
    super.update(entity, dt);
  }

  cleanup(entity) {
    entity._path = null;
    entity._ps = null;
    this.t = 0;
    entity._jumpTarget = null;
  }
}

// ── Cling ──

export class Cling extends RelationalVerb {
  constructor() { super('cling'); }
  update(entity, dt) {
    const t = entity._target;
    if (!t) return;
    const gap = t.radius + entity.radius + 4;
    const goalX = t.x + gap;
    const goalY = t.y;
    const rate = 1 - Math.exp(-10 * dt);
    entity.x += (goalX - entity.x) * rate;
    entity.y += (goalY - entity.y) * rate;
    entity.vx = t.vx;
    entity.vy = t.vy;
  }
}
