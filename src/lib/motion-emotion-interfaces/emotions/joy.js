// ── Joy ──
// Buoyant bouncing arcs that travel across the space.
// Mid-high arousal, positive valence — light, warm elation.
//
// Improvements:
// (1) Exaggerated bounce heights, entity grows with happiness
// (2) Bounces travel sideways and use the floor for impact
// (3) Entity swells gently — puffs up with happiness
// (4) Weightless float at apex of each arc, squash on landing

import { Phase } from '../phase.js';
import { Emotion } from '../emotion.js';

const BOUNCES = 5;
const GRAVITY = 500;
const FLOAT_GRAVITY = 80;
const APEX_THRESHOLD = 30;

class JoyEmotion extends Emotion {
  constructor(phases, opts = {}) {
    super(phases, opts);
  }

  decorate(entity, dt) {
    // Gentle breathing pulse — warm and alive
    entity._joyBreathT = (entity._joyBreathT ?? 0) + dt;
    const nrg = entity.energy ?? 1;
    const breath = 1 + 0.06 * nrg * Math.sin(entity._joyBreathT * 2.5 * Math.PI * 2);
    const swell = entity._joySwell ?? 1;
    entity.radius = entity.baseRadius * breath * swell;
  }
}

export const joy = new JoyEmotion([
  new Phase({
    name: 'lift',
    description: 'Gentle lift off the ground — lightness taking over',
    from: 0, to: 0.08,
    onEnter(entity, bounds) {
      entity._joySwell = 1.0;
      entity._joyBreathT = 0;
      entity._joyGroundY = bounds ? bounds.bottom - entity.radius - 1 : entity.y;
      entity._joyDir = Math.random() > 0.5 ? 1 : -1;
      entity.vx = 0;
      entity.vy = 0;
    },
    update(entity, dt, t) {
      const pt = t / 0.08;
      // Gentle swell as joy builds
      entity._joySwell = 1.0 + 0.2 * pt;
      // Soft upward drift
      entity.vy = -40 * pt;
      entity.x += entity.vx * dt;
      entity.y += entity.vy * dt;
    },
  }),
  new Phase({
    name: 'bounce',
    description: 'Traveling arcs across the space — each bounce grows, floats at apex',
    from: 0.08, to: 0.82,
    onEnter(entity, bounds) {
      // Launch into first arc
      const dir = entity._joyDir ?? 1;
      entity.vx = dir * (60 + Math.random() * 40);
      entity.vy = -(280 + Math.random() * 60);
      entity._joyBounceCount = 0;
      entity._joySwell = 1.2;
    },
    update(entity, dt) {
      const bounds = entity._bounds;
      const speed = Math.abs(entity.vy);

      // Reduced gravity near apex — float effect
      const grav = speed < APEX_THRESHOLD ? FLOAT_GRAVITY : GRAVITY;
      entity.vy += grav * dt;

      entity.x += entity.vx * dt;
      entity.y += entity.vy * dt;

      // Floor bounce — squash then relaunch
      const groundY = bounds ? bounds.bottom - entity.radius : (entity._joyGroundY ?? 400);
      if (entity.y > groundY) {
        entity.y = groundY;
        entity._joyBounceCount = (entity._joyBounceCount ?? 0) + 1;
        const count = entity._joyBounceCount;

        // Each bounce gets slightly higher (building joy)
        const heightScale = 1 + count * 0.08;
        entity.vy = -Math.abs(entity.vy) * 0.85 * heightScale;
        // Cap so it doesn't fly off forever
        entity.vy = Math.max(entity.vy, -350);

        // Slight direction wobble on each landing
        entity.vx += (Math.random() - 0.5) * 50;

        // Swell grows with each bounce
        entity._joySwell = Math.min(1.2 + count * 0.06, 1.5);
      }

      // Side walls — gentle bounce, reverse travel direction
      if (bounds) {
        const r = entity.radius;
        if (bounds.left != null && entity.x - r < bounds.left) {
          entity.x = bounds.left + r;
          entity.vx = Math.abs(entity.vx) * 0.9;
        }
        if (bounds.right != null && entity.x + r > bounds.right) {
          entity.x = bounds.right - r;
          entity.vx = -Math.abs(entity.vx) * 0.9;
        }
        // Ceiling — soft tap
        if (bounds.top != null && entity.y - r < bounds.top) {
          entity.y = bounds.top + r;
          entity.vy = Math.abs(entity.vy) * 0.5;
        }
      }

      // Light horizontal drag
      entity.vx *= Math.exp(-0.8 * dt);

      entity._skipBoundary = true;
    },
  }),
  new Phase({
    name: 'settle',
    description: 'Gentle bobbing descent — still buoyant, softly returning to ground',
    from: 0.82, to: 1.0,
    update(entity, dt, t) {
      const settleT = (t - 0.82) / 0.18;
      const bounds = entity._bounds;
      const groundY = bounds ? bounds.bottom - entity.radius : (entity._joyGroundY ?? 400);

      // Gentle gravity
      entity.vy += 200 * dt;
      entity.x += entity.vx * dt;
      entity.y += entity.vy * dt;

      // Soft floor bounce with strong decay
      if (entity.y > groundY) {
        entity.y = groundY;
        entity.vy = -Math.abs(entity.vy) * 0.35 * (1 - settleT);
      }

      // Damp everything down
      entity.vx *= Math.exp(-4 * dt);
      entity.vy *= Math.exp(-2 * dt);

      // Swell eases back
      entity._joySwell = 1.5 - 0.4 * settleT;

      entity._skipBoundary = true;
    },
  }),
], {
  energyFunction: t => {
    if (t < 0.08) return 0.8 + 0.2 * (t / 0.08);
    if (t < 0.82) return 1.0;
    return 1.0 - 0.5 * ((t - 0.82) / 0.18);
  },
});
