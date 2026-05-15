// ── PinMotion ──
// Anchors entity in place, zeroes velocity.
// Captures position on first update, snaps back every frame.
import { Verb } from './verb.js';

export class PinMotion extends Verb {
  constructor(verb = 'pin') {
    super(verb);
  }

  update(entity, dt) {
    if (entity._pinAnchorX == null) {
      entity._pinAnchorX = entity.x;
      entity._pinAnchorY = entity.y;
    }
    entity.x = entity._pinAnchorX;
    entity.y = entity._pinAnchorY;
    entity.vx = 0;
    entity.vy = 0;
  }

  cleanup(entity) {
    entity._pinAnchorX = null;
    entity._pinAnchorY = null;
  }
}
