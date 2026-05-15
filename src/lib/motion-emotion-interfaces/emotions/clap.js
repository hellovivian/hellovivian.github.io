// ── Clap Gesture ──
// Two hand particles clap together rhythmically.
// Hands spread apart then snap inward to meet, with a small body bounce on contact.
// Speed parameter controls clap frequency.

import { Gesture } from '../gesture.js';

// ── Helpers ── (none — shape is now a method on Clap)

// ── Clap — MotionGesture ──

export class Clap extends Gesture {
  constructor(params = {}) {
    super('clap', {
      speed: 1.0,            // cycle speed multiplier (1.0 = ~2 claps/s)
      spread: 1.0,           // how wide hands open (multiplier on entity radius)
      cycles: 'continuous',  // loops at natural rate by default
      baseCycle: 0.5,        // seconds per clap cycle
      ...params,
    });
  }

  // Hand spread: 0 = clapping, 1 = apart.
  //   0–30%: open,  30–45%: snap shut,  45–55%: hold clap,  55–75%: open,  75–100%: hold open
  shapeFunction(t) {
    t = t % 1;
    if (t < 0.30) return 1;
    if (t < 0.45) {
      const s = (t - 0.30) / 0.15;
      return 1 - s * s * (3 - 2 * s);
    }
    if (t < 0.55) return 0;
    if (t < 0.75) {
      const s = (t - 0.55) / 0.20;
      return s * s * (3 - 2 * s);
    }
    return 1;
  }

  update(entity, dt) {
    if (this._wait && entity._stateElapsed < this._wait) return;
    const p = this.params;
    this.advanceCycle(entity, dt);

    entity.hands.left.visible = true;
    entity.hands.right.visible = true;

    const raw = this.shapeFunction(this.cycle);
    const openness = this._easing ? this._easing(raw) : raw;

    const exag = 1 + this._exaggeration;
    const spreadPx = entity.radius * 0.5 * p.spread * exag;
    const gap = entity.radius * 0.08;
    const handDist = openness * spreadPx + (1 - openness) * gap;

    const liftY = -entity.radius * 0.35 * (1 - openness);
    const handY = entity.y + liftY - entity.radius * 0.15;

    // Position hands symmetrically
    entity.hands.left.x  = entity.x - handDist;
    entity.hands.left.y  = handY;
    entity.hands.right.x = entity.x + handDist;
    entity.hands.right.y = handY;

    // Impact squash on clap contact
    const closeness = 1 - openness;
    const impact = Math.pow(Math.max(0, closeness - 0.85) / 0.15, 2);
    entity._clapSquash = impact;
    entity._clapRecoilY = impact * entity.radius * 0.12 * exag;
  }

  applyVisuals(entity) {
    const squash = entity._clapSquash ?? 0;
    const mag = 0.1 * squash * (1 + this._exaggeration);
    entity.sx *= 1 + mag;
    entity.sy *= 1 - mag * 0.8;
    const recoil = entity._clapRecoilY ?? 0;
    entity.y += recoil;
    // Shift hands with the body so they don't get left behind
    entity.hands.left.y  += recoil;
    entity.hands.right.y += recoil;
  }

  cleanup(entity) {
    entity.restHands();
    entity.sx = 1;
    entity.sy = 1;
  }
}

