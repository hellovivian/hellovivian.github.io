// ── Stressed ──
// Continuous agitation — flies swarm around the entity, bumping it.
// Fly bumps trigger white flash. Flies are Particles on entity.particles.

import { lerpColor } from '../entity.js';
import { Emotion } from '../emotion.js';
import { Phase } from '../phase.js';
import { Fly } from '../particle.js';

const FLY_COUNT = 4;

class StressedEmotion extends Emotion {
  constructor(phases, opts = {}) {
    super(phases, opts);
  }

  decorate(entity, dt) {
    // Spawn flies if none exist
    if (!entity.particles.some(p => p.type === 'fly')) {
      entity._stressBaseColor = entity.color;
      entity._stressFlash = 0;
      for (let i = 0; i < FLY_COUNT; i++) {
        entity.particles.push(new Fly(entity));
      }
    }

    // Check fly bumps → trigger flash
    for (const p of entity.particles) {
      if (p.type !== 'fly') continue;
      const hit = p.bump(entity);
      if (hit) {
        entity._stressFlash = 0.6;
        // Flinch impulse away from fly
        entity.vx += hit.nx * 30;
        entity.vy += hit.ny * 30;
      }
    }

    // Flash decay
    entity._stressFlash = (entity._stressFlash ?? 0) * Math.exp(-12.0 * dt);
    if (entity._stressFlash < 0.01) entity._stressFlash = 0;
    if (entity._stressFlash > 0) {
      entity.color = lerpColor(entity._stressBaseColor || entity.color, '#ffffff', entity._stressFlash);
    }

    // Energy stays elevated, velocity damped
    entity.energy += (0.7 - entity.energy) * 0.4 * dt;
    const nrg = entity.energy;
    entity.vx *= (0.6 + 0.4 * nrg);
    entity.vy *= (0.6 + 0.4 * nrg);
  }
}

/** The entity jitters nervously in place with small erratic velocity
 * spikes, unable to settle. Flies orbit and occasionally bump the
 * entity, triggering a white flash and a flinch impulse. Energy
 * stays high — the agitation never fully resolves. */
export const stressed = new StressedEmotion([
  new Phase({
    name: 'agitate',
    description: 'Nervous jittering in place with erratic micro-movements, building tension as flies buzz closer',
    from: 0, to: 0.5,
    update(entity, dt, t) {
      const b = entity._bounds;
      const cx = (b.left + b.right) / 2;
      const cy = (b.top + b.bottom) / 2;
      const pt = t / 0.5;
      const jitter = 80 + pt * 120;
      entity.vx += (Math.random() - 0.5) * jitter * dt;
      entity.vy += (Math.random() - 0.5) * jitter * dt;

      // Drift toward center
      entity.vx += (cx - entity.x) * 0.5 * dt;
      entity.vy += (cy - entity.y) * 0.5 * dt;

      entity.vx *= Math.exp(-2.0 * dt);
      entity.vy *= Math.exp(-2.0 * dt);
    },
  }),
  new Phase({
    name: 'frenzy',
    description: 'Peak agitation — sharper jolts, faster jitter, entity cannot hold still as flies swarm aggressively',
    from: 0.5, to: 1.0,
    update(entity, dt, t) {
      const b = entity._bounds;
      const cx = (b.left + b.right) / 2;
      const cy = (b.top + b.bottom) / 2;
      const pt = (t - 0.5) / 0.5;
      const jitter = 200 - pt * 60;
      entity.vx += (Math.random() - 0.5) * jitter * dt;
      entity.vy += (Math.random() - 0.5) * jitter * dt;

      // Looser center pull
      entity.vx += (cx - entity.x) * 0.3 * dt;
      entity.vy += (cy - entity.y) * 0.3 * dt;

      entity.vx *= Math.exp(-1.5 * dt);
      entity.vy *= Math.exp(-1.5 * dt);
    },
  }),
], {
  energyFunction: t => 0.6 + 0.4 * Math.sin(t * Math.PI),
});

