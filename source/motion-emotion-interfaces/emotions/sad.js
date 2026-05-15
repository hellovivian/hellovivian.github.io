// ── Sad ──
// Slow, heavy sadness — entity sags and weeps.
// Decorates any verb with teardrops + energy drain.
//
// Usage:
//   new Sad(new Freeze())       — crying in place
//   new Sad(new Drift())        — drifting sadly

import { Emotion } from '../emotion.js';
import { SoloVerb } from '../verb.js';
import { Particle } from '../particle.js';
import { SecondaryMotion } from '../secondary-motion.js';

// ── Teardrop (sad-specific particle) ──

class Teardrop extends Particle {
  constructor(entity) {
    super('tear', entity);
    // Spawn from lower half of entity
    const side = Math.random() < 0.5 ? -1 : 1;
    this.x = entity.x + side * entity.radius * (0.3 + Math.random() * 0.4);
    this.y = entity.y + entity.radius * 0.2;
    this.vy = 15 + Math.random() * 20;
    this.vx = side * (2 + Math.random() * 4);
    this.r = 1.5 + Math.random() * 1.5;
    this.life = 1.0;
  }

  update(entity, dt) {
    this.vy += 60 * dt;     // gravity
    this.x += this.vx * dt;
    this.y += this.vy * dt;
    this.life -= 0.8 * dt;
    if (this.life <= 0) this.dead = true;
  }

  draw(ctx, entity) {
    ctx.globalAlpha = this.life * 0.5;
    ctx.fillStyle = entity.color;
    // Teardrop shape: small circle with a point on top
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(this.x, this.y - this.r * 1.8);
    ctx.lineTo(this.x - this.r * 0.6, this.y - this.r * 0.3);
    ctx.lineTo(this.x + this.r * 0.6, this.y - this.r * 0.3);
    ctx.closePath();
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

// ── Weep (sad-specific secondary) ──
// Spawns teardrops at a steady rate.

class Weep extends SecondaryMotion {
  constructor(opts = {}) {
    super('weep');
    this._rate = opts.rate ?? 0.15;  // seconds between tears
  }

  update(entity, dt) {
    entity._weepT = (entity._weepT ?? 0) + dt;
    if (entity._weepT >= this._rate) {
      entity._weepT -= this._rate;
      entity.particles.push(new Teardrop(entity));
    }
  }

  cleanup(entity) {
    entity._weepT = null;
  }
}

// ── Sag (sad-specific verb) ──
// Entity drifts downward, losing momentum.

class Sag extends SoloVerb {
  constructor() { super('sag'); }

  update(entity, dt) {
    const floor = (entity._bounds?.bottom ?? 400) * 0.7;
    if (entity.y < floor) {
      entity.vy += 15 * dt;
    }
    // Heavy horizontal damping
    entity.vx *= Math.exp(-4.0 * dt);
    entity.vy *= Math.exp(-1.5 * dt);
  }
}

// ── Sad (decorator) ──

export class Sad extends Emotion {
  constructor(steps, opts = {}) {
    super(steps, {
      shape: 'circle',
      energy: 0.4,
      secondary: new Weep(),
      ...opts,
    });
  }

  update(entity, dt) {
    super.update(entity, dt);
    // Energy drains slowly — sadness is heavy
    entity.energy += (0.3 - entity.energy) * (1 - Math.exp(-0.2 * dt));
  }
}

// ── Instances ──

export const sad = new Sad(new Sag());
