// ── Scene Base Class ──
// A Scene owns entities and a StateMachine, providing the standard
// init / update / draw lifecycle used by all social-dynamics scenarios.
// Motion composition is delegated to motion-composer.js.
// Editor hooks (locking, drag, user paths) are delegated to editor-hooks.js.

import { collide } from './physics.js';
import { StateMachine } from './state-machine.js';
import './emotions/index.js';                                // register emotions & gestures
import './verbs.js';                                          // register verbs
import './adverbs.js';                                        // register adverbs
import { BOUNDS } from './canvas-constants.js';
import { composeMotions } from './motion-composer.js';
import * as editorHooks from './editor-hooks.js';

export class Scene {
  label = '';
  backgroundColor = '';

  _entityMap = {};
  states = [];
  elapsedTime = 0;
  done = false;
  stateMachine = null;
  bounds = BOUNDS;

  // Editor hook state (managed by editor-hooks.js)
  _lockedState = null;
  _lockSnapshot = null;
  _userPaths = {};

  /** Assign as named map — also iterable via forEach / for-of. */
  get entities() { return this._entityMap; }
  set entities(val) {
    if (val && typeof val === 'object' && !Array.isArray(val)) {
      Object.defineProperty(val, Symbol.iterator, {
        value: function* () { yield* Object.values(this); },
      });
      Object.defineProperty(val, 'forEach', {
        value: function (fn, thisArg) { Object.values(this).forEach(fn, thisArg); },
      });
      for (const [name, e] of Object.entries(val)) e._name = name;
    }
    this._entityMap = val;
  }

  /** Subclass must override: create entities, build state machine via this.start(states). */
  init() {
    throw new Error('Subclass must implement init()');
  }

  /** Creates a StateMachine from state definitions and starts it. */
  start(states, options = {}) {
    const { reset = false } = options;
    const statesArray = Array.isArray(states) ? states : null;
    if (Array.isArray(states)) {
      const defs = {};
      for (const s of states) {
        defs[s.name] = {
          duration: s.duration,
          entities: s.entities,
        };
      }
      states = defs;
    }
    this.elapsedTime = 0;
    this.done = false;
    this.stateMachine = new StateMachine(states, { reset });
    this.stateMachine.start();

    if (statesArray) {
      this._statesArray = statesArray;
    }
  }

  get state() {
    return this.stateMachine?.state;
  }

  // ── Editor hook API (delegates to editor-hooks.js) ──

  set userPaths(paths) { this._userPaths = paths || {}; }
  get userPaths() { return this._userPaths; }

  lockToState(name) { editorHooks.lockToState(this, name); }
  replayLocked() { editorHooks.replayLocked(this); }
  unlock() { editorHooks.unlock(this); }

  // ── Core lifecycle ──

  /** Fixed update loop — advances time, ticks state machine, dispatches motions, integrates entities. */
  update(dt) {
    if (this.done) return;
    this.elapsedTime += dt;

    // Detect state transitions to reset entity clocks
    const prevState = this.stateMachine.state;
    this.stateMachine.tick(dt);
    const stateChanged = this.stateMachine.state !== prevState;

    // Tick entity clocks
    for (const e of this.entities) {
      // _stateElapsed is time elapsed in the state
      // Skip reset when locked — isolation needs continuous elapsed for entity.t
      if (stateChanged && !this._lockedState) e._stateElapsed = 0;
      e._stateElapsed += dt;
    }

    // State-lock guard
    if (editorHooks.guardStateLock(this)) return;

    // User-drawn path locomotion (editor)
    editorHooks.applyUserPaths(this, dt);

    // Motion composition: resolve configs → entity slots
    const entityConfigs = this.stateMachine.current?.entities;
    if (entityConfigs) {
      (this._composeFunction || composeMotions)(this._entityMap, entityConfigs, this.stateMachine, this.bounds, dt);
    }

    // Run motion pipeline (primary → secondary), then physics
    for (const e of this.entities) {
      e.update(dt);
      e.step(dt, this.bounds);
    }
    collide(this.entities);
  }

  /** Subclasses override to supply a dynamic isLight value. */
  get isLight() { return false; }

  /** Default draw — each entity draws itself (body, gesture overlays, verb overlays). */
  draw(ctx) {
    const opts = { isLight: this.isLight, showSpeed: this._showSpeed };

    // Draw phantom targets for single-entity relational verbs
    const entityConfigs = this.stateMachine?.current?.entities;
    if (entityConfigs) {
      for (const config of Object.values(entityConfigs)) {
        const pt = config._phantomTarget;
        if (!pt) continue;
        ctx.save();
        ctx.globalAlpha = 0.18;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.radius, 0, Math.PI * 2);
        ctx.fillStyle = opts.isLight ? '#000' : '#fff';
        ctx.fill();
        ctx.restore();
      }
    }

    for (const entity of this.entities) {
      entity.draw(ctx, opts);
    }
  }
}
