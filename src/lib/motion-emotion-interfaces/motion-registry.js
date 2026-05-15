// ── Motion Registry ──
// Global vocabulary of verbs, adverbs, emotions, and gestures.
// Scenes look up by string name. Base vocabulary is registered at
// import time; new motions can be registered dynamically at runtime.

import { Path } from './path.js';

const _verbs = {};
const _adverbs = {};
const _emotions = {};
const _gestures = {};
const _paths = {};

export const MotionRegistry = {
  registerVerb(name, cls)          { _verbs[name] = cls; },
  unregisterVerb(name)             { delete _verbs[name]; },
  registerAdverb(name, instance)  { _adverbs[name] = instance; },
  unregisterAdverb(name)          { delete _adverbs[name]; },
  registerEmotion(name, instance) { _emotions[name] = instance; },
  unregisterEmotion(name)         { delete _emotions[name]; },
  registerGesture(name, instance) { _gestures[name] = instance; },
  unregisterGesture(name)         { delete _gestures[name]; },
  registerPath(name, points)      { _paths[name] = Array.isArray(points) ? Path.fromPoints(points) : points; },

  verb(name, ...args) { const C = _verbs[name]; return C ? new C(...args) : undefined; },
  adverb(name)  { return _adverbs[name]; },
  emotion(name) { return _emotions[name]; },
  gesture(name) { return _gestures[name]; },
  path(name)    { return _paths[name]; },

  get verbs()    { return { ..._verbs }; },
  get adverbs()  { return { ..._adverbs }; },
  get emotions() { return { ..._emotions }; },
  get gestures() { return { ..._gestures }; },
  get paths()    { return { ..._paths }; },
};
