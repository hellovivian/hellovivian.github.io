// ── Phase ──
// A time-ranged behavior slice within an Emotion.
// Phases own a t-range [from, to) and drive per-frame updates.
// Optional onEnter/onExit hooks run when the entity transitions between phases,
// receiving bounds so phases can compute spatial targets (center, corners, etc.).

export class Phase {
  /**
   * @param {object} opts
   * @param {string}   opts.name        — phase label (one word)
   * @param {string}   [opts.description] — what the phase achieves (choreographic intent)
   * @param {number}   [opts.from]      — start of t-range [0,1] (time-driven mode)
   * @param {number}   [opts.to]        — end of t-range [0,1] (time-driven mode)
   * @param {Function} opts.update      — (entity, dt, t) per-frame behavior
   * @param {Function} [opts.onEnter]   — (entity, bounds) called once on phase entry
   * @param {Function} [opts.onExit]    — (entity, bounds) called once on phase exit
   * @param {Function} [opts.draw]      — (ctx, entity) called after entity is drawn
   * @param {Function} [opts.condition] — (entity) → boolean, when true transition to next (event-driven mode)
   * @param {string|Function} [opts.next] — next phase name, or (entity) → string (event-driven mode)
   */
  constructor({ name, description, from, to, update, onEnter, onExit, draw, condition, next } = {}) {
    this.name = name;
    this.description = description ?? null;
    this.from = from;
    this.to = to;
    if (update) this.update = update;
    if (draw) this.draw = draw;
    this.onEnter = onEnter ?? null;
    this.onExit = onExit ?? null;
    this.condition = condition ?? null;
    this.next = next ?? null;
  }

  update(entity, dt, t) {}
  draw(ctx, entity) {}
}
