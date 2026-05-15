// ── Surprised ──
// A sudden jolt — entity launches upward, lands, recovers.
// Flash halo draws on startle via customDraw.

import { Emotion } from '../emotion.js';
import { Phase } from '../phase.js';

/** Entity idles near center, then startles — launching upward and
 * away in a ballistic arc with a white flash halo. Gravity pulls
 * it back down; on landing it squashes flat and all velocity kills.
 * Finally it drifts back toward center, energy settling. */
export const surprised = new Emotion([
  new Phase({
    name: 'idle',
    description: 'Drifting gently near center, calm before the startle',
    from: 0, to: 0.25,
    update(entity, dt) {
      const b = entity._bounds;
      const cx = (b.left + b.right) / 2;
      const cy = (b.top + b.bottom) / 2;
      entity.vx += (cx - entity.x) * 0.8 * dt;
      entity.vy += (cy - entity.y) * 0.8 * dt;
      entity.vx *= Math.exp(-3 * dt);
      entity.vy *= Math.exp(-3 * dt);
    },
  }),
  new Phase({
    name: 'startle',
    description: 'Ballistic arc — sharp impulse up and away from center, gravity pulling back down, flash halo fires',
    from: 0.25, to: 0.50,
    onEnter(entity, bounds) {
      const cx = (bounds.left + bounds.right) / 2;
      const awayX = entity.x < cx ? -1 : 1;
      entity.vx = awayX * (60 + Math.random() * 40);
      entity.vy = -(140 + Math.random() * 40);
      entity._startleFlash = 1;
      entity._groundY = entity.y;
    },
    update(entity, dt) {
      entity.vy += 900 * dt;
      // Flash decay
      entity._startleFlash = Math.max(0, (entity._startleFlash ?? 0) - dt * 4);
      // Velocity-driven squash/stretch
      const speed = Math.hypot(entity.vx, entity.vy);
      if (speed > 30) {
        const stretch = Math.min(speed / 300, 0.3);
        entity.sx += ((1 - stretch) - entity.sx) * (1 - Math.exp(-10 * dt));
        entity.sy += ((1 + stretch) - entity.sy) * (1 - Math.exp(-10 * dt));
      }
    },
  }),
  new Phase({
    name: 'land',
    description: 'Snap to ground — heavy squash on impact, all velocity killed, stunned stillness',
    from: 0.50, to: 0.70,
    onEnter(entity) {
      if (entity._groundY != null) entity.y = entity._groundY;
      entity.vy = 0;
    },
    update(entity, dt) {
      entity.vx *= Math.exp(-18 * dt);
      entity.vy *= Math.exp(-18 * dt);
      // Recover shape
      entity.sx += (1 - entity.sx) * (1 - Math.exp(-10 * dt));
      entity.sy += (1 - entity.sy) * (1 - Math.exp(-10 * dt));
      entity._startleFlash = Math.max(0, (entity._startleFlash ?? 0) - dt * 4);
    },
  }),
  new Phase({
    name: 'recover',
    description: 'Drift back toward center with light damping, energy settling',
    from: 0.70, to: 1.0,
    update(entity, dt) {
      const b = entity._bounds;
      const cx = (b.left + b.right) / 2;
      const cy = (b.top + b.bottom) / 2;
      const dx = cx - entity.x, dy = cy - entity.y;
      const d = Math.hypot(dx, dy) || 1;
      entity.vx += (dx / d) * 120 * dt;
      entity.vy += (dy / d) * 120 * dt;
      entity.vx *= Math.exp(-3 * dt);
      entity.vy *= Math.exp(-3 * dt);
      entity.sx += (1 - entity.sx) * (1 - Math.exp(-6 * dt));
      entity.sy += (1 - entity.sy) * (1 - Math.exp(-6 * dt));
    },
  }),
], {
  energyFunction: t => {
    if (t < 0.25) return 0.5;
    if (t < 0.50) return 0.5 + 0.5 * ((t - 0.25) / 0.25);
    if (t < 0.70) return 1.0 - 0.3 * ((t - 0.50) / 0.20);
    return 0.7 - 0.2 * ((t - 0.70) / 0.30);
  },
  draw: (ctx, entity) => {
    const flash = entity._startleFlash ?? 0;
    if (flash < 0.01) return;
    ctx.globalAlpha = flash * 0.4;
    ctx.beginPath();
    ctx.arc(entity.x, entity.y, entity.radius + 15, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.globalAlpha = 1;
  },
});
