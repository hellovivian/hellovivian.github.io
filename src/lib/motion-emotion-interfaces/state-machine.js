// ── State Machine ──
// State machine. 

export class StateMachine {
  constructor(states, { reset = true } = {}) {
    this._states = states;
    this._stateNames = Object.keys(states);
    this._shouldReset = reset;

    this._index = 0;
    this._totalDuration = 0;
    this._elapsedTimeInState = 0;
    this._animationComplete = false;
  }

  start() {
    this._index = 0;
    this._totalDuration = 0;
    this._elapsedTimeInState = 0;
    this._animationComplete = false;
  }

  get state() { return this._stateNames[this._index]; }
  get current() { return this._states[this._stateNames[this._index]]; }
  get totalDuration() { return this._totalDuration; }
  get elapsed() { return this._elapsedTimeInState; }
  get done() { return this._animationComplete; }

  jumpToState(name) {
    const index = this._stateNames.indexOf(name);
    if (index === -1) throw new Error(`Unknown state: ${name}`);
    this._index = index;
    this._elapsedTimeInState = 0;
    this._animationComplete = false;
  }

  tick(deltaTime) {
    if (this._animationComplete) return;
    const name = this._stateNames[this._index];
    const state = this._states[name];

    this._totalDuration += deltaTime;
    this._elapsedTimeInState += deltaTime;

    if (state.duration != null && this._elapsedTimeInState >= state.duration) {
      if (state.next) {
        this.jumpToState(state.next);
      } else {
        this._advanceState();
      }
    }
  }

  _advanceState() {
    this._index++;
    if (this._index >= this._stateNames.length) {
      if (this._shouldReset) this._index = 0;
      else { this._animationComplete = true; return; }
    }
    this._elapsedTimeInState = 0;
  }
}
