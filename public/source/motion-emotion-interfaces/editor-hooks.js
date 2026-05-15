// ── Editor Hooks ──
// Mixin-style functions that attach editor-specific capabilities to a Scene:
//   - State locking (isolation mode)
//   - User-drawn path injection
//   - Drag override

import { PathMotion } from './path-motion.js';

// ── State Locking ──

/** Lock to a specific state — fast-forwards then prevents transitions past it. */
export function lockToState(scene, name) {
  const targetIdx = scene.stateMachine._stateNames.indexOf(name);
  if (targetIdx < 0) return;
  let safety = 0;
  while (scene.stateMachine._stateNames.indexOf(scene.stateMachine.state) < targetIdx && safety < 20000) {
    scene.update(0.016);
    safety++;
  }
  scene._lockedState = name;
  // Reset state machine elapsed so playback starts from t=0 of this state
  scene.stateMachine.jumpToState(name);
  scene._lockSnapshot = [];
  for (const e of scene.entities) {
    scene._lockSnapshot.push({ x: e.x, y: e.y, vx: e.vx, vy: e.vy });
    e._stateElapsed = 0;
  }
}

/** Replay the locked state from the top — resets elapsed and restores entity positions. */
export function replayLocked(scene) {
  if (!scene._lockedState) return;
  scene.stateMachine.jumpToState(scene._lockedState);
  scene.done = false;
  if (scene._lockSnapshot) {
    let i = 0;
    for (const e of scene.entities) {
      e._stateElapsed = 0;
      if (i < scene._lockSnapshot.length) {
        const snap = scene._lockSnapshot[i];
        e.x = snap.x; e.y = snap.y;
        e.vx = snap.vx; e.vy = snap.vy;
      }
      i++;
    }
  }
}

/** Release state lock — allows normal state machine transitions. */
export function unlock(scene) {
  scene._lockedState = null;
  scene._lockSnapshot = null;
}

// ── User-drawn Path Injection ──

const _pathMotion = new PathMotion('user-drawn');

/** Apply user-drawn paths to entities for the current state. */
export function applyUserPaths(scene, dt) {
  const userPaths = scene._userPaths;
  if (!userPaths || !scene.entities) return;
  const currentStateName = scene.stateMachine ? scene.stateMachine.state : null;
  scene.entities.forEach((e, i) => {
    if (e._grabbed) return;
    const key = String(i);
    const ps = userPaths[key] || userPaths['global'];
    if (ps && (ps.stateName === null || ps.stateName === currentStateName)) {
      e._path = ps.path;
      if (!e._stateDuration) e._stateDuration = ps.duration;
      _pathMotion.update(e, dt);
    }
  });
}

// ── State-lock guard (called during update) ──

/** Returns true if the scene should stop (done). */
export function guardStateLock(scene) {
  if (scene._lockedState && (scene.stateMachine.done || scene.state !== scene._lockedState)) {
    scene.stateMachine.jumpToState(scene._lockedState);
    scene.done = false;
    return false;
  } else if (scene.stateMachine.done) {
    scene.done = true;
    return true;
  }
  return false;
}
