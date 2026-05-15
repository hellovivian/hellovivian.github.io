// ── Shrug Emotion ──
// Two hand particles rise symmetrically while the body dips down.
// Matches the shrug keyframe pattern: rise → hold → drop → rest.
// Speed parameter controls cycle frequency.

import { Gesture } from '../gesture.js';

// ── Helpers ── (none — shape is now a method on Shrug)

// ── Shrug — MotionGesture ──

export class Shrug extends Gesture {
  constructor(params = {}) {
    super('shrug', {
      speed: 1.0,            // cycle speed multiplier (1.0 = 2.2s base)
      liftHeight: 1.0,       // how high hands rise (multiplier on entity radius)
      cycles: 1,             // one-shot: plays once within state duration
      baseCycle: 2.2,        // seconds per shrug cycle
      ...params,
    });
  }

  // Smooth shrug shape — smoothstep lift with C1-continuous transitions.
  //   0–35%: rise,  35–58%: hold,  58–78%: drop,  78–100%: rest
  shapeFunction(t) {
    t = t % 1;
    if (t < 0.35) {
      const s = t / 0.35;
      return s * s * (3 - 2 * s);
    } else if (t < 0.58) {
      return 1;
    } else if (t < 0.78) {
      const s = (t - 0.58) / 0.2;
      return 1 - s * s * (3 - 2 * s);
    }
    return 0;
  }

  update(entity, dt) {
    const p = this.params;
    this.advanceCycle(entity, dt);

    entity.hands.left.visible = true;
    entity.hands.right.visible = true;

    const lift = this.shapeFunction(this.cycle);
    const liftPx = lift * entity.radius * 0.65 * p.liftHeight;
    const spread = entity.radius * 1.0;

    // Hands arc outward and upward — subtle extra spread at peak
    const extraSpread = lift * entity.radius * 0.2;
    entity.hands.left.x  = entity.x - spread - extraSpread;
    entity.hands.left.y  = entity.y - liftPx;
    entity.hands.right.x = entity.x + spread + extraSpread;
    entity.hands.right.y = entity.y - liftPx;

    // Body squash when hands are up (visual only)
    entity._shrugSquashY = 1 - lift * 0.12;
    entity._shrugSquashX = 1 + lift * 0.06;
    entity._shrugDipY = lift * entity.radius * 0.1;
  }

  cleanup(entity) {
    entity.restHands();
    entity._shrugSquashX = undefined;
    entity._shrugSquashY = undefined;
    entity._shrugDipY = undefined;
  }

  applyVisuals(entity) {
    entity.sx *= entity._shrugSquashX ?? 1;
    entity.sy *= entity._shrugSquashY ?? 1;
    entity.y += entity._shrugDipY ?? 0;
  }

}

