// ── Arm motions: primaries + feelings ──
// The same split as fog's 2D engine (src/core/secondary-motion.js), moved from
// x/y into joint space:
//
//   PRIMARY  = the task. Owns the ABSOLUTE pose: 7 joint angles + gripper,
//              as a looping function of time.   primary.pose(t) → { q, grip, p }
//   FEELING  = the swappable secondary layer. May only ADD a small, bounded
//              offset to the joint angles the primary just produced.
//                                               feeling.delta(t) → { dq, dgrip }
//
// A feeling never sets a pose, so swapping or removing it leaves the task
// untouched. The composer adds them:  q = primary.q + intensity * feeling.dq
//
// Everything here is hand-written and pre-generated (no model call at runtime).
// It imports nothing, so it has no idea what the arm looks like.
//
// Joint cheat-sheet (Panda), used throughout:
//   q[0] base turn         + = turn left (seen from above)
//   q[1] shoulder          + = lean forward
//   q[2] upper-arm roll    swings the forearm sideways when the elbow is bent
//   q[3] elbow             always negative; toward 0 = straighter (hand rises)
//   q[4] forearm roll      turns/tilts the "head" (the hand)
//   q[5] wrist             + = hand looks up, − = looks down / curls in
//   q[6] hand twist
//   The hand points straight down when q[1] − q[3] − q[5] = 0.

const PI = Math.PI;
const TAU = 2 * PI;
const Q7 = PI / 4;

// ── small helpers ──
const clamp01 = (v) => Math.min(1, Math.max(0, v));
const frac = (v) => v - Math.floor(v);
const smooth = (s) => { s = clamp01(s); return s * s * s * (s * (s * 6 - 15) + 10); }; // ease in/out
const hash = (i) => frac(Math.sin(i * 127.1 + 311.7) * 43758.5453);                  // 0…1, repeatable
// A smooth 0→1→0 bump across [a, b].
const bump = (x, a, b) => (x <= a || x >= b) ? 0 : Math.sin(PI * (x - a) / (b - a)) ** 2;
// Fast repeatable jitter in −1…1 (sum of sines that never line up).
const jitter = (t, seed = 0) =>
  (Math.sin(t * 71.3 + seed) + Math.sin(t * 86.9 + seed * 2.3) + Math.sin(t * 108.7 + seed * 4.1)) / 3;

// Keyframe track: [{ t, q, grip, p }] → pose(t), eased between keys.
// p = "precision" 0…1: how much the task needs the hand to be exactly where it
// is right now (high while grasping). The composer can let feelings yield to it.
function track(keys) {
  return (t) => {
    let i = 0;
    while (i < keys.length - 2 && t >= keys[i + 1].t) i++;
    const a = keys[i], b = keys[i + 1];
    const s = smooth((t - a.t) / Math.max(1e-6, b.t - a.t));
    return {
      q: a.q.map((v, k) => v + (b.q[k] - v) * s),
      grip: a.grip + (b.grip - a.grip) * s,
      p: (a.p || 0) + ((b.p || 0) - (a.p || 0)) * s,
    };
  };
}
const key = (t, q, grip = 0.5, p = 0) => ({ t, q, grip, p });

// ── named poses ──
export const HOME   = [0, -PI / 4, 0, -3 * PI / 4, 0, PI / 2, Q7];   // the standard Panda "ready" pose
const ATTEND = [0, -0.35, 0, -2.1, 0, 2.9, Q7];                       // hand up like a head, looking forward
const REACH  = [0, 0.55, 0, -1.35, 0, 1.9, Q7];                       // stretched out over the table
const above  = (turn) => [turn, 0.15, 0, -2.2, 0, 2.35, Q7];          // hovering over a spot
const down   = (turn) => [turn, 0.42, 0, -2.2, 0, 2.62, Q7];          // lowered onto it
const PICK_TURN = 0.55;                                               // spot A is to the left, B to the right
const HOLD = 0.5;                                                     // gripper closed on the 4 cm cube

// ═════════════════════════════ PRIMARIES ═════════════════════════════

const standReady = {
  id: 'stand', label: 'Stand ready', blurb: 'Holds still, looking ahead. Best for seeing a feeling on its own.',
  duration: 6,
  pose: () => ({ q: ATTEND.slice(), grip: 0.5, p: 0 }),
};

const reachOut = {
  id: 'reach', label: 'Reach out', blurb: 'Stretches over the table, pauses, comes back.',
  duration: 5.4,
  pose: track([
    key(0, HOME, 0.5), key(1.7, REACH, 1), key(2.5, REACH, 1), key(4.3, HOME, 0.5), key(5.4, HOME, 0.5),
  ]),
};

// Carries a cube A → B, then back B → A, so the loop closes.
function pickPlaceKeys() {
  const leg = (t0, from, to) => [
    key(t0 + 1.2, above(from), 1),
    key(t0 + 2.0, down(from), 1, 1),
    key(t0 + 2.5, down(from), HOLD, 1),         // close
    key(t0 + 3.3, above(from), HOLD),
    key(t0 + 4.8, above(to), HOLD),
    key(t0 + 5.6, down(to), HOLD, 1),
    key(t0 + 6.1, down(to), 1, 1),              // open
    key(t0 + 6.9, above(to), 1),
    key(t0 + 8.0, HOME, 0.5),
  ];
  return [key(0, HOME, 0.5), ...leg(0, PICK_TURN, -PICK_TURN), ...leg(8, -PICK_TURN, PICK_TURN)];
}
const pickPlace = {
  id: 'pick-place', label: 'Pick and place', blurb: 'Carries a cube from one stand to the other and back.',
  duration: 16,
  pose: track(pickPlaceKeys()),
  // Named beats of the first leg (A → B), for timelines: [name, start, end].
  beats: [['approach', 0, 1.2], ['grasp', 1.2, 2.5], ['carry', 2.5, 4.8], ['place', 4.8, 6.1], ['return', 6.1, 8]],
  // Scene props for the composer: where the two stands go, and where the cube is.
  props: {
    spotA: down(PICK_TURN), spotB: down(-PICK_TURN),
    cubeAt(t) {                                  // 'A' | 'B' | 'held'
      if (t < 2.4) return 'A';
      if (t < 6.0) return 'held';
      if (t < 10.4) return 'B';
      if (t < 14.0) return 'held';
      return 'A';
    },
  },
};

// Raises the forearm and swings it side to side from the upper-arm roll.
const WAVE = [0, 0, 0, -1.0, 0, 3.3, Q7];
const waveBase = track([key(0, HOME, 0.5), key(1.3, WAVE, 1), key(4.9, WAVE, 1), key(6.3, HOME, 0.5), key(7, HOME, 0.5)]);
const wave = {
  id: 'wave', label: 'Wave hello', blurb: 'Lifts its hand and waves.',
  duration: 7,
  pose(t) {
    const base = waveBase(t);
    const env = bump(t, 1.0, 5.2) ** 0.5;        // fade the swing in and out
    const s = Math.sin(TAU * 1.35 * (t - 1.3));
    base.q[2] += 0.55 * env * s;
    base.q[6] += 0.35 * env * s;
    return base;
  },
};

const turned = (pose, turn, extra = {}) => pose.map((v, i) => (i === 0 ? turn : v + (extra[i] || 0)));
const lookAround = {
  id: 'look', label: 'Look around', blurb: 'Turns its "head" left, right, up, and down at the table.',
  duration: 12,
  pose: track([
    key(0, ATTEND),
    key(1.8, turned(ATTEND, 0.9)), key(2.8, turned(ATTEND, 0.9)),
    key(5.2, turned(ATTEND, -0.9)), key(6.2, turned(ATTEND, -0.9)),
    key(7.6, turned(ATTEND, 0, { 5: 0.6 })), key(8.4, turned(ATTEND, 0, { 5: 0.6 })),     // up
    key(9.8, turned(ATTEND, 0, { 1: 0.25, 5: -0.9 })), key(10.6, turned(ATTEND, 0, { 1: 0.25, 5: -0.9 })), // down
    key(12, ATTEND),
  ]),
};

// Low over the table, sweeping arcs that creep outward.
const WIPE = [0, 0.36, 0, -2.2, 0, 2.56, Q7];
const wipeBase = track([key(0, HOME, 0.5), key(1.4, WIPE, 0.2, 0.7), key(7.4, WIPE, 0.2, 0.7), key(9, HOME, 0.5)]);
const wipe = {
  id: 'wipe', label: 'Wipe the table', blurb: 'Sweeps back and forth low over the table.',
  duration: 9,
  pose(t) {
    const base = wipeBase(t);
    const env = bump(t, 1.0, 7.8) ** 0.5;
    const out = clamp01((t - 1.4) / 6);          // creeps outward over the sweep
    base.q[0] += 0.6 * env * Math.sin(TAU * 0.5 * (t - 1.4));
    base.q[1] += 0.12 * env * out;
    base.q[3] += 0.22 * env * out;
    base.q[5] -= 0.10 * env * out;
    return base;
  },
};

// Hand level, arm extended toward a spot off to the right; then checks back in.
const POINT = [-0.7, 0.5, 0, -1.2, 0, 3.27, Q7];
const point = {
  id: 'point', label: 'Point at something', blurb: 'Points off to the side, holds, looks back at you.',
  duration: 8,
  pose: track([
    key(0, ATTEND, 0.5), key(1.5, POINT, 0), key(3.6, POINT, 0),
    key(5.0, ATTEND, 0.5), key(5.8, ATTEND, 0.5), key(6.9, POINT, 0), key(7.3, POINT, 0), key(8, ATTEND, 0.5),
  ]),
};

export const PRIMARIES = [standReady, reachOut, pickPlace, wave, lookAround, wipe, point];

// ═════════════════════════════ FEELINGS ═════════════════════════════
// Each returns OFFSETS only. `tempo` is an optional hint (how fast this feeling
// would do the task); the composer applies it only if the user turns that on.
// The composer also clamps every offset to ±MAX_DELTA, so "bounded" is enforced
// there rather than trusted here.

export const MAX_DELTA = 0.6;                     // rad, per joint

// The one place primary + feeling are added. Used by the composer page and by
// the figure renderer (scripts/render-arm.mjs) so both show the same motion.
//   base  = primary.pose(t)            delta = feeling.delta(t)
//   yieldAtContact: fade the feeling while the task needs a precise hand (base.p).
export function composePose(base, delta, { intensity = 1, yieldAtContact = true } = {}) {
  const p = base.p || 0;
  const k = intensity * (yieldAtContact ? 1 - 0.85 * p : 1);
  const dq = delta.dq.map((d) => Math.min(MAX_DELTA, Math.max(-MAX_DELTA, d * k)));
  return { dq, q: base.q.map((v, i) => v + dq[i]), grip: base.grip + delta.dgrip * k * (1 - p) };
}

const none = {
  id: 'none', label: 'None', blurb: 'Just the task.', tempo: 1,
  delta: () => ({ dq: [0, 0, 0, 0, 0, 0, 0], dgrip: 0 }),
};

// Bouncy and lifted: a springy up-beat, head high, hand wagging.
const happy = {
  id: 'happy', label: 'Happy', blurb: 'Bouncy, lifted, wagging.', tempo: 1.15,
  delta(t) {
    const b = Math.abs(Math.sin(PI * 2.1 * t));  // bounce: quick off the floor, round at the top
    const sway = Math.sin(TAU * 0.52 * t);
    return {
      dq: [0.05 * Math.sin(TAU * 0.52 * t + 1), -0.05 * b, 0, 0.13 * b, 0.12 * sway,
           0.18 + 0.06 * b, 0.30 * Math.sin(TAU * 1.05 * t)],
      dgrip: 0.25 + 0.2 * Math.sin(TAU * 2.1 * t),
    };
  },
};

// Heavy and folded in: slumped forward, head down, a slow sway and now and then a sigh.
const sad = {
  id: 'sad', label: 'Sad', blurb: 'Slumped, head down, slow sighs.', tempo: 0.7,
  delta(t) {
    const sigh = bump(frac(t / 5.5), 0, 0.6);    // a slow rise that sinks back
    return {
      dq: [0.05 * Math.sin(TAU * 0.18 * t), 0.20 - 0.03 * sigh, 0, -0.14 + 0.08 * sigh, 0.10,
           -0.45 + 0.10 * sigh, 0],
      dgrip: -0.15,
    };
  },
};

// Pulled back and trembling: recoiled, darting glances, sudden flinches.
const fear = {
  id: 'fear', label: 'Fear', blurb: 'Recoiled, trembling, flinching.', tempo: 1,
  delta(t) {
    // Flinches: one roughly every 2.6 s at an irregular moment — a sharp jerk that decays.
    let flinch = 0, side = 1;
    const n = Math.floor(t / 2.6);
    for (const i of [n - 1, n]) {
      const since = t - (i * 2.6 + 0.9 * hash(i));
      if (since >= 0) {
        const e = Math.exp(-4 * since) * clamp01(since * 25);
        if (e > flinch) { flinch = e; side = hash(i + 50) > 0.5 ? 1 : -1; }
      }
    }
    // Darting glances: jump to a new direction every 0.8 s.
    const g = t / 0.8, gi = Math.floor(g);
    const from = hash(gi + 9) * 2 - 1, to = hash(gi + 10) * 2 - 1;
    const glance = from + (to - from) * smooth(frac(g) * 4);
    const tr = (seed) => jitter(t, seed);        // the tremble
    return {
      dq: [
        0.020 * tr(1) + 0.12 * side * flinch,
        -0.14 - 0.12 * flinch + 0.012 * tr(2),
        0.020 * tr(3),
        -0.20 - 0.15 * flinch + 0.012 * tr(4),
        0.20 * glance + 0.020 * tr(5),
        0.10 + 0.20 * flinch + 0.012 * tr(6),
        0.025 * tr(7),
      ],
      dgrip: -0.4,
    };
  },
};

// Tight and forward: looming, a hard shake, sharp downward jabs.
const angry = {
  id: 'angry', label: 'Angry', blurb: 'Looming, shaking, sharp jabs.', tempo: 1.2,
  delta(t) {
    const jab = Math.exp(-8 * frac(1.3 * t));    // snaps down, eases off
    const shake = Math.sin(TAU * 6.5 * t) * (0.6 + 0.4 * Math.sin(TAU * 0.4 * t));
    return {
      dq: [0, 0.12 + 0.05 * jab, 0, 0.05 - 0.12 * jab, 0.035 * shake, -0.10, 0.06 * shake],
      dgrip: -0.5,
    };
  },
};

// Leaning in with a tilted head that switches sides, peeking around.
const curious = {
  id: 'curious', label: 'Curious', blurb: 'Leans in, tilts its head, peeks.', tempo: 0.95,
  delta(t) {
    const tilt = Math.tanh(3 * Math.sin(TAU * t / 4.8));   // settles on one side, then the other
    return {
      dq: [0.10 * Math.sin(TAU * 0.3 * t), 0.10, 0, 0, 0.38 * tilt,
           0.06 + 0.12 * Math.sin(TAU * 0.22 * t), 0.20 * tilt],
      dgrip: 0.15,
    };
  },
};

// Nodding off: sinks slowly, then jerks back up.
const tired = {
  id: 'tired', label: 'Tired', blurb: 'Sinks slowly, jerks awake.', tempo: 0.6,
  delta(t) {
    const ph = frac(t / 4.2);
    const sag = ph < 0.82 ? smooth(ph / 0.82) : 1 - smooth((ph - 0.82) / 0.18);
    return {
      dq: [0.04 * Math.sin(TAU * 0.11 * t), 0.20 * sag, 0, -0.14 * sag, 0.06 * sag, -0.40 * sag, 0],
      dgrip: -0.1,
    };
  },
};

// Tall and unhurried: chest up, head high, a slow swell.
const proud = {
  id: 'proud', label: 'Proud', blurb: 'Tall, head high, unhurried.', tempo: 0.9,
  delta(t) {
    const swell = Math.sin(TAU * 0.25 * t);
    return {
      dq: [0.05 * Math.sin(TAU * 0.15 * t), -0.12, 0, 0.16 + 0.03 * swell, 0, 0.30, 0],
      dgrip: 0,
    };
  },
};

// Turned away with its head down, stealing a look back now and then.
const shy = {
  id: 'shy', label: 'Shy', blurb: 'Turns away, steals a look back.', tempo: 0.85,
  delta(t) {
    const peek = bump(frac(t / 3.8), 0.55, 0.9);
    return {
      dq: [0.30 - 0.22 * peek, -0.06, 0, -0.10, 0.25 - 0.20 * peek, -0.30 + 0.25 * peek,
           0.03 * Math.sin(TAU * 0.4 * t)],
      dgrip: -0.2,
    };
  },
};

export const FEELINGS = [none, happy, sad, fear, angry, curious, tired, proud, shy];
