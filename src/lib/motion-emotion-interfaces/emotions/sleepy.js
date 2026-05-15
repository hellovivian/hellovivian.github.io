// ── Sleepy ──
// Two-phase drowsiness: nod off → snap awake.
// Energy drains during nod-off, spikes on snap-awake, then settles.

import { Emotion } from '../emotion.js';
import { Phase } from '../phase.js';

class SleepyEmotion extends Emotion {
  constructor(phases, opts = {}) {
    super(phases, opts);
  }

  decorate(entity, dt) {
    const nrg = entity.energy;
    const damp = Math.exp(-(1.5 + 3.5 * (1 - nrg)) * dt);
    entity.vx *= damp;
    entity.vy *= damp;
  }
}

/** The entity sags downward as gravity slowly wins, lateral motion
 * damped to a near-stop. At the midpoint it jolts awake — a sharp
 * upward impulse that decays quickly back to stillness. Energy
 * drains through the nod and spikes briefly on the snap. */
export const sleepy = new SleepyEmotion([
  new Phase({
    name: 'nodOff',
    description: 'Sagging downward under increasing gravity, lateral motion fading, energy draining — the slow surrender to sleep',
    from: 0, to: 0.5,
    onEnter() {},
    update(entity, dt, t) {
      const pt = t / 0.5;
      // Increasing gravity pull
      entity.vy += (80 + pt * 200) * dt;
      // Gentle lateral damping
      entity.vx *= Math.exp(-3.0 * dt);
      // Head-bob oscillation — drooping nods
      entity.sx = 1 + Math.sin(pt * Math.PI * 3) * 0.08;
      entity.sy = 1 - Math.sin(pt * Math.PI * 3) * 0.08;
    },
  }),
  new Phase({
    name: 'snapAwake',
    description: 'Sharp upward jolt — a startled return to wakefulness that decays quickly into heavy stillness',
    from: 0.5, to: 1.0,
    onEnter(entity) {
      entity.vy = -(220 + Math.random() * 80);
    },
    update(entity, dt, t) {
      const pt = (t - 0.5) / 0.5;
      const decay = Math.exp(-(3.0 + pt * 6.0) * dt);
      entity.vx *= decay;
      entity.vy *= decay;
    },
  }),
], {
  energyFunction: t => {
    if (t < 0.5) return 0.4 - 0.25 * (t / 0.5);
    const snapT = (t - 0.5) / 0.5;
    return 0.15 + 0.55 * Math.exp(-4 * snapT);
  },
});
