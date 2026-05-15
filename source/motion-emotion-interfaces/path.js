// ── Path ──
// Encapsulates path geometry with arc-length sampling.
// Also exports the older procedural path API (createPathState, pathPointAt,
// nearestPointOnPath) for backward compatibility.

import { sampleBeziersToPoints } from '../utilities/pathSmoothingUtils.js';

export class Path {
  /**
   * @param {Array<{x,y}>} points - ordered point array (minimum 2)
   */
  constructor(points) {
    this._points = points;
    this._lengths = null;
    this._totalLength = 0;
    this._rebuild();
  }

  /** Straight line from A to B. */
  static fromEndpoints(start, end) {
    return new Path([
      { x: start.x, y: start.y },
      { x: end.x, y: end.y },
    ]);
  }

  /** Wrap an existing point array. */
  static fromPoints(points) {
    return new Path(points);
  }

  /** Compute cumulative arc lengths. */
  _rebuild() {
    const pts = this._points;
    if (!pts || pts.length < 2) {
      this._lengths = [0];
      this._totalLength = 0;
      return;
    }
    const lengths = [0];
    for (let i = 1; i < pts.length; i++) {
      lengths.push(lengths[i - 1] + Math.hypot(
        pts[i].x - pts[i - 1].x,
        pts[i].y - pts[i - 1].y,
      ));
    }
    this._lengths = lengths;
    this._totalLength = lengths[lengths.length - 1];
  }

  get points() { return this._points; }
  get lengths() { return this._lengths; }
  get totalLength() { return this._totalLength; }
  get start() { return this._points?.[0] ?? null; }
  get end() { return this._points?.[this._points.length - 1] ?? null; }

  /** Sample position, tangent, and normal at arc-length distance. */
  sampleAt(dist) {
    const pts = this._points;
    if (!pts || pts.length < 2) {
      return { x: 0, y: 0, tx: 1, ty: 0, nx: 0, ny: 1 };
    }
    const d = Math.max(0, Math.min(dist, this._totalLength));
    const lengths = this._lengths;
    let i = 1;
    while (i < lengths.length - 1 && lengths[i] < d) i++;
    const segLen = lengths[i] - lengths[i - 1];
    const frac = segLen > 0 ? (d - lengths[i - 1]) / segLen : 0;
    const a = pts[i - 1], b = pts[i];
    const dx = b.x - a.x, dy = b.y - a.y;
    const len = Math.hypot(dx, dy) || 1;
    return {
      x: a.x + dx * frac, y: a.y + dy * frac,
      tx: dx / len, ty: dy / len,
      nx: -dy / len, ny: dx / len,
    };
  }
}

/**
 * BezierPath — a Path generated from cubic bezier control points.
 * Stores the canonical {p0, p1, p2, p3} so handles can be edited and resampled.
 */
export class BezierPath extends Path {
  /**
   * @param {{p0,p1,p2,p3}} bezier - cubic bezier control points
   * @param {number} [samplesPerCurve=20] - sample density
   */
  constructor(bezier, samplesPerCurve = 20) {
    const { p0, p1, p2, p3 } = bezier;
    const sampled = sampleBeziersToPoints([[p0, p1, p2, p3]], samplesPerCurve);
    super(sampled);
    this._bezier = { p0, p1, p2, p3 };
    this._samplesPerCurve = samplesPerCurve;
  }

  /** Generate a swooping arc from start to end with perpendicular offset handles. */
  static fromEndpoints(start, end, { perpOffset = 0.4, side = 1 } = {}) {
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const dist = Math.hypot(dx, dy) || 1;
    const nx = (-dy / dist) * side;
    const ny = (dx / dist) * side;
    const offset = dist * perpOffset;
    return new BezierPath({
      p0: { x: start.x, y: start.y },
      p1: { x: start.x + dx / 3 + nx * offset, y: start.y + dy / 3 + ny * offset },
      p2: { x: start.x + 2 * dx / 3 + nx * offset, y: start.y + 2 * dy / 3 + ny * offset },
      p3: { x: end.x, y: end.y },
    });
  }

  get bezier() { return this._bezier; }

  /** Update a control point (p0, p1, p2, or p3) and resample. */
  setBezierHandle(key, pos) {
    this._bezier[key] = { x: pos.x, y: pos.y };
    const { p0, p1, p2, p3 } = this._bezier;
    this._points = sampleBeziersToPoints([[p0, p1, p2, p3]], this._samplesPerCurve);
    this._rebuild();
  }
}

// ================================================================
//  Procedural path API (legacy, used by reference demos & emotions)
// ================================================================

/**
 * createPathState(points)
 * Build path data structure with precomputed arc lengths.
 */
export function createPathState(points) {
  const lengths = [0];
  for (let i = 1; i < points.length; i++) {
    lengths.push(lengths[i - 1] + Math.hypot(points[i].x - points[i - 1].x, points[i].y - points[i - 1].y));
  }
  return {
    points, lengths,
    totalLength: lengths[lengths.length - 1],
    dist: 0,
    speed: 0,
    minSpeed: 0
  };
}

/**
 * pathPointAt(state, dist)
 * Interpolate position/tangent/normal at distance along path.
 */
export function pathPointAt(state, dist) {
  const clampedDist = Math.max(0, Math.min(dist, state.totalLength));
  const lengths = state.lengths;
  let i = 1;
  while (i < lengths.length - 1 && lengths[i] < clampedDist) i++;
  const segLength = lengths[i] - lengths[i - 1];
  const fraction = segLength > 0 ? (clampedDist - lengths[i - 1]) / segLength : 0;
  const pointA = state.points[i - 1], pointB = state.points[i];
  const deltaX = pointB.x - pointA.x, deltaY = pointB.y - pointA.y;
  const length = Math.hypot(deltaX, deltaY) || 1;
  return {
    x: pointA.x + deltaX * fraction, y: pointA.y + deltaY * fraction,
    tx: deltaX / length, ty: deltaY / length,
    nx: -deltaY / length, ny: deltaX / length
  };
}

/**
 * nearestPointOnPath(state, x, y)
 * Project a 2D point onto the path. Returns the closest point,
 * its parametric distance, tangent, normal, and cross-track error.
 */
export function nearestPointOnPath(state, x, y) {
  let bestDistSq = Infinity;
  let bestX, bestY, bestSegIdx, bestT;

  for (let i = 1; i < state.points.length; i++) {
    const ax = state.points[i - 1].x, ay = state.points[i - 1].y;
    const bx = state.points[i].x,     by = state.points[i].y;
    const abx = bx - ax, aby = by - ay;
    const segLenSq = abx * abx + aby * aby;

    let t = segLenSq > 0 ? ((x - ax) * abx + (y - ay) * aby) / segLenSq : 0;
    t = Math.max(0, Math.min(1, t));

    const projX = ax + abx * t;
    const projY = ay + aby * t;
    const dx = x - projX, dy = y - projY;
    const distSq = dx * dx + dy * dy;

    if (distSq < bestDistSq) {
      bestDistSq = distSq;
      bestX = projX;
      bestY = projY;
      bestT = t;
      bestSegIdx = i;
    }
  }

  const segLength = state.lengths[bestSegIdx] - state.lengths[bestSegIdx - 1];
  const paramDist = state.lengths[bestSegIdx - 1] + bestT * segLength;

  const ax = state.points[bestSegIdx - 1].x, ay = state.points[bestSegIdx - 1].y;
  const bx = state.points[bestSegIdx].x,     by = state.points[bestSegIdx].y;
  const ddx = bx - ax, ddy = by - ay;
  const len = Math.hypot(ddx, ddy) || 1;

  return {
    x: bestX, y: bestY,
    dist: paramDist,
    tx: ddx / len, ty: ddy / len,
    nx: -ddy / len, ny: ddx / len,
    error: Math.sqrt(bestDistSq)
  };
}
