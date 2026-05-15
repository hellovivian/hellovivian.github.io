// ── Particle ──
// Base class for entity-owned particles. Each type knows how to
// update and draw itself. Entity loops the array — emotions just spawn.
//
// Usage:
//   entity.particles.push(new Fly(entity));
//   // each frame: entity loops p.update(entity, dt), p.draw(ctx, entity)
//   // cleanup: entity.particles = entity.particles.filter(p => !p.dead);

export class Particle {
  constructor(type, entity) {
    this.type = type;
    this.x = entity.x;
    this.y = entity.y;
    this.vx = 0;
    this.vy = 0;
    this.dead = false;
  }

  update(entity, dt) {}
  draw(ctx, entity) {}
}

// ── Fly ──
// Orbits entity erratically using offsets from entity center.
// Returns { nx, ny } via bump() when it contacts the entity.

export class Fly extends Particle {
  constructor(entity) {
    super('fly', entity);
    const ang = Math.random() * Math.PI * 2;
    const r = 20 + Math.random() * 25;
    // Store as offset from entity
    this.ox = Math.cos(ang) * r;
    this.oy = Math.sin(ang) * r;
    this.vx = (Math.random() - 0.5) * 80;
    this.vy = (Math.random() - 0.5) * 80;
    this.phase = Math.random() * Math.PI * 2;
    this.size = 1.5 + Math.random() * 1;
  }

  update(entity, dt) {
    this.phase += (5 + Math.random() * 4) * dt;
    const orbitR = 18 + Math.sin(this.phase * 0.7) * 12;
    const tx = Math.cos(this.phase) * orbitR;
    const ty = Math.sin(this.phase * 1.3) * orbitR;

    this.vx += (tx - this.ox) * 8 * dt;
    this.vy += (ty - this.oy) * 8 * dt;
    this.vx += (Math.random() - 0.5) * 400 * dt;
    this.vy += (Math.random() - 0.5) * 400 * dt;
    this.vx *= Math.exp(-3.0 * dt);
    this.vy *= Math.exp(-3.0 * dt);

    this.ox += this.vx * dt;
    this.oy += this.vy * dt;

    // Sync absolute position for bump() and draw()
    this.x = entity.x + this.ox;
    this.y = entity.y + this.oy;
  }

  /** Check if fly is touching entity. Returns { nx, ny } or null. */
  bump(entity) {
    const dist = Math.hypot(this.ox, this.oy);
    if (dist < entity.radius + 2) {
      const nx = -this.ox / (dist || 1);
      const ny = -this.oy / (dist || 1);
      this.vx -= nx * 100;
      this.vy -= ny * 100;
      return { nx, ny };
    }
    return null;
  }

  draw(ctx, entity) {
    const color = entity._stressBaseColor || entity.color;
    const angle = Math.atan2(this.vy, this.vx);
    const s = this.size * 1.8;
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(angle);
    ctx.globalAlpha = 0.7;
    ctx.beginPath();
    ctx.moveTo(s, 0);
    ctx.lineTo(-s * 0.7, -s * 0.6);
    ctx.lineTo(-s * 0.7,  s * 0.6);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
  }
}
