/**
 * Path Smoothing Utilities - Schneider Bezier Curve Fitting
 *
 * Converts a series of points into smooth Bezier curves using the
 * Schneider fitting algorithm. Extracted from path-simplify-demo.html.
 */

// ============================================================================
// Vector Math Helpers
// ============================================================================

function vec(x, y) {
  return { x, y };
}

function vAdd(a, b) {
  return { x: a.x + b.x, y: a.y + b.y };
}

function vSub(a, b) {
  return { x: a.x - b.x, y: a.y - b.y };
}

function vScale(a, s) {
  return { x: a.x * s, y: a.y * s };
}

function vDot(a, b) {
  return a.x * b.x + a.y * b.y;
}

function vNorm(a) {
  return Math.hypot(a.x, a.y);
}

function vNormalize(a) {
  const n = vNorm(a);
  return n === 0 ? { x: 0, y: 0 } : { x: a.x / n, y: a.y / n };
}

function distance(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.hypot(dx, dy);
}

// ============================================================================
// Bezier Curve Functions
// ============================================================================

export function bezierPoint(bez, t) {
  const mt = 1 - t;
  const mt2 = mt * mt;
  const t2 = t * t;
  const a = mt2 * mt;
  const b = 3 * mt2 * t;
  const c = 3 * mt * t2;
  const d = t * t2;
  return {
    x: bez[0].x * a + bez[1].x * b + bez[2].x * c + bez[3].x * d,
    y: bez[0].y * a + bez[1].y * b + bez[2].y * c + bez[3].y * d,
  };
}

function bezierDerivative(bez, t) {
  const mt = 1 - t;
  return {
    x: 3 * mt * mt * (bez[1].x - bez[0].x) + 6 * mt * t * (bez[2].x - bez[1].x) + 3 * t * t * (bez[3].x - bez[2].x),
    y: 3 * mt * mt * (bez[1].y - bez[0].y) + 6 * mt * t * (bez[2].y - bez[1].y) + 3 * t * t * (bez[3].y - bez[2].y),
  };
}

function bezierSecondDerivative(bez, t) {
  const mt = 1 - t;
  return {
    x: 6 * mt * (bez[2].x - 2 * bez[1].x + bez[0].x) + 6 * t * (bez[3].x - 2 * bez[2].x + bez[1].x),
    y: 6 * mt * (bez[2].y - 2 * bez[1].y + bez[0].y) + 6 * t * (bez[3].y - 2 * bez[2].y + bez[1].y),
  };
}

// ============================================================================
// Bezier Fitting Algorithm (Schneider)
// ============================================================================

function chordLengthParameterize(pts) {
  const u = [0];
  for (let i = 1; i < pts.length; i += 1) {
    u[i] = u[i - 1] + distance(pts[i], pts[i - 1]);
  }
  const total = u[u.length - 1] || 1;
  for (let i = 1; i < u.length; i += 1) {
    u[i] /= total;
  }
  return u;
}

function generateBezier(pts, u, leftTan, rightTan) {
  const n = pts.length - 1;
  const C = [[0, 0], [0, 0]];
  const X = [0, 0];

  for (let i = 0; i <= n; i += 1) {
    const t = u[i];
    const mt = 1 - t;
    const b0 = mt * mt * mt;
    const b1 = 3 * mt * mt * t;
    const b2 = 3 * mt * t * t;
    const b3 = t * t * t;

    const a1 = vScale(leftTan, b1);
    const a2 = vScale(rightTan, b2);
    C[0][0] += vDot(a1, a1);
    C[0][1] += vDot(a1, a2);
    C[1][0] += vDot(a1, a2);
    C[1][1] += vDot(a2, a2);

    const tmp = vSub(pts[i], vAdd(vScale(pts[0], b0 + b1), vScale(pts[n], b2 + b3)));
    X[0] += vDot(a1, tmp);
    X[1] += vDot(a2, tmp);
  }

  const detC0C1 = C[0][0] * C[1][1] - C[1][0] * C[0][1];
  let alphaL = 0;
  let alphaR = 0;
  if (Math.abs(detC0C1) > 1e-12) {
    const detC0X = C[0][0] * X[1] - C[0][1] * X[0];
    const detXC1 = X[0] * C[1][1] - X[1] * C[0][1];
    alphaL = detXC1 / detC0C1;
    alphaR = detC0X / detC0C1;
  }

  const segLength = distance(pts[0], pts[n]);
  const epsilon = 1e-6 * segLength;
  if (alphaL < epsilon || alphaR < epsilon) {
    alphaL = segLength / 3;
    alphaR = segLength / 3;
  }

  return [
    pts[0],
    vAdd(pts[0], vScale(leftTan, alphaL)),
    vAdd(pts[n], vScale(rightTan, alphaR)),
    pts[n],
  ];
}

function reparameterize(pts, u, bez) {
  return u.map((t, i) => newtonRaphsonRootFind(bez, pts[i], t));
}

function newtonRaphsonRootFind(bez, point, u) {
  const q = bezierPoint(bez, u);
  const q1 = bezierDerivative(bez, u);
  const q2 = bezierSecondDerivative(bez, u);
  const diff = vSub(q, point);
  const numerator = vDot(diff, q1);
  const denominator = vDot(q1, q1) + vDot(diff, q2);
  if (denominator === 0) return u;
  return u - numerator / denominator;
}

function computeMaxError(pts, bez, u) {
  let maxDist = 0;
  let maxIndex = Math.floor(pts.length / 2);
  for (let i = 1; i < pts.length - 1; i += 1) {
    const p = bezierPoint(bez, u[i]);
    const dist = distance(p, pts[i]);
    if (dist > maxDist) {
      maxDist = dist;
      maxIndex = i;
    }
  }
  return { maxDist, maxIndex };
}

function fitCubic(pts, leftTan, rightTan, error) {
  if (pts.length === 2) {
    const dist = distance(pts[0], pts[1]) / 3;
    return [[
      pts[0],
      vAdd(pts[0], vScale(leftTan, dist)),
      vAdd(pts[1], vScale(rightTan, dist)),
      pts[1],
    ]];
  }

  let u = chordLengthParameterize(pts);
  let bez = generateBezier(pts, u, leftTan, rightTan);
  let { maxDist, maxIndex } = computeMaxError(pts, bez, u);

  if (maxDist < error) {
    return [bez];
  }

  if (maxDist < error * error) {
    for (let i = 0; i < 4; i += 1) {
      u = reparameterize(pts, u, bez);
      bez = generateBezier(pts, u, leftTan, rightTan);
      const check = computeMaxError(pts, bez, u);
      maxDist = check.maxDist;
      maxIndex = check.maxIndex;
      if (maxDist < error) {
        return [bez];
      }
    }
  }

  const centerTan = vNormalize(vSub(pts[maxIndex - 1], pts[maxIndex + 1]));
  const left = fitCubic(pts.slice(0, maxIndex + 1), leftTan, centerTan, error);
  const right = fitCubic(pts.slice(maxIndex), vScale(centerTan, -1), rightTan, error);
  return left.concat(right);
}

function fitCurve(pointsToFit, error) {
  if (!pointsToFit || pointsToFit.length < 2) return [];
  const leftTan = vNormalize(vSub(pointsToFit[1], pointsToFit[0]));
  const rightTan = vNormalize(vSub(pointsToFit[pointsToFit.length - 2], pointsToFit[pointsToFit.length - 1]));
  return fitCubic(pointsToFit, leftTan, rightTan, error);
}

// ============================================================================
// Public API
// ============================================================================

/**
 * Fit a smooth Bezier curve to a series of points
 * @param {Array<{x: number, y: number}>} points - Array of points to fit
 * @param {number} tolerance - Maximum error distance (default 4.0)
 * @returns {Array<Array<{x: number, y: number}>>} Array of Bezier curves, each with 4 control points
 */
export function fitBezierCurve(points, tolerance = 4.0) {
  return fitCurve(points, tolerance);
}

/**
 * Convert Bezier curves to SVG path string
 * @param {Array<Array<{x: number, y: number}>>} beziers - Array of Bezier curves
 * @returns {string} SVG path data string
 */
export function beziersToSVGPath(beziers) {
  if (!beziers || beziers.length === 0) return '';
  const parts = [];
  beziers.forEach((bez, idx) => {
    if (idx === 0) {
      parts.push(`M ${bez[0].x.toFixed(1)} ${bez[0].y.toFixed(1)}`);
    }
    parts.push(
      `C ${bez[1].x.toFixed(1)} ${bez[1].y.toFixed(1)} ` +
      `${bez[2].x.toFixed(1)} ${bez[2].y.toFixed(1)} ` +
      `${bez[3].x.toFixed(1)} ${bez[3].y.toFixed(1)}`
    );
  });
  return parts.join(' ');
}

/**
 * Sample bezier curves into a flat [{x,y}] point array.
 * Converts the editor's bezier storage format into the format
 * that createPathState() expects.
 * @param {Array<Array<{x: number, y: number}>>} beziers - Array of cubic bezier curves, each [p0,p1,p2,p3]
 * @param {number} samplesPerCurve - Number of sample points per bezier segment (default 10)
 * @returns {Array<{x: number, y: number}>} Sampled points along the path
 */
export function sampleBeziersToPoints(beziers, samplesPerCurve = 10) {
  if (!beziers || beziers.length === 0) return [];
  const points = [];
  for (let b = 0; b < beziers.length; b++) {
    const bez = beziers[b];
    const startI = (b === 0) ? 0 : 1;
    for (let i = startI; i <= samplesPerCurve; i++) {
      points.push(bezierPoint(bez, i / samplesPerCurve));
    }
  }
  return points;
}
