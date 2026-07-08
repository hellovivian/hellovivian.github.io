import { useRef, useEffect, useState } from 'react';
import { Entity } from '../lib/motion-emotion-interfaces/entity.js';
import { CW } from '../lib/motion-emotion-interfaces/canvas-constants.js';
import { joy } from '../lib/motion-emotion-interfaces/emotions/joy.js';
import { relaxed } from '../lib/motion-emotion-interfaces/emotions/relaxed.js';
import { sleepy } from '../lib/motion-emotion-interfaces/emotions/sleepy.js';
import { surprised } from '../lib/motion-emotion-interfaces/emotions/surprised.js';
import { fear } from '../lib/motion-emotion-interfaces/emotions/fear.js';
import { miserable } from '../lib/motion-emotion-interfaces/emotions/miserable.js';
import { miserableDrowningPrimary as miserableDrowning } from '../lib/motion-emotion-interfaces/emotions/miserable-drowning.js';
import { anger } from '../lib/motion-emotion-interfaces/emotions/anger.js';
import { stressed } from '../lib/motion-emotion-interfaces/emotions/stressed.js';

// ── Reference space ───────────────────────────────────────────────
const CELL = 200;
const REF_BOUNDS = { left: 0, top: 0, right: CELL, bottom: CELL };
const EMOTION_DURATION = 4;

const EMOTION_SEQUENCE = [
  { emotion: joy,               color: '#FFD54F', label: 'Joy',                startY: CELL * 0.65, boundary: 'rebound',  valence:  0.80, arousal:  0.60 },
  { emotion: relaxed,           color: '#81C784', label: 'Relaxed',            startY: CELL * 0.65, boundary: 'rebound',  valence:  0.70, arousal: -0.40 },
  { emotion: sleepy,            color: '#7986CB', label: 'Sleepy',             startY: CELL * 0.65, boundary: 'rebound',  valence:  0.05, arousal: -0.80 },
  { emotion: surprised,         color: '#F9A825', label: 'Surprised',          startY: CELL * 0.65, boundary: 'rebound',  valence:  0.20, arousal:  0.70 },
  { emotion: fear,              color: '#B39DDB', label: 'Fear',               startY: CELL * 0.65, boundary: 'rebound',  valence: -0.60, arousal:  0.70 },
  { emotion: miserable,         color: '#78909C', label: 'Miserable',          startY: CELL * 0.65, boundary: 'rebound',  valence: -0.70, arousal: -0.30 },
  { emotion: miserableDrowning, color: '#90A4AE', label: 'Miserable Drowning', startY: CELL * 0.15, boundary: 'deadStop', valence: -0.85, arousal: -0.60 },
  { emotion: anger,             color: '#EF5350', label: 'Anger',              startY: CELL * 0.65, boundary: 'rebound',  valence: -0.80, arousal:  0.85 },
  { emotion: stressed,          color: '#FF8A65', label: 'Stressed',           startY: CELL * 0.65, boundary: 'rebound',  valence: -0.45, arousal:  0.75 },
];

function buildEntity(entry) {
  const e = new Entity(CELL / 2, entry.startY, {
    radius: 24 * (CELL / CW),
    color: '#ffffff',
    boundaryBehavior: entry.boundary,
  });
  e._bounds = REF_BOUNDS;
  e._startY = entry.startY;
  e.primary = entry.emotion;
  e._stateDuration = EMOTION_DURATION;
  return e;
}

function resetEntity(entity, entry) {
  entity.x = CELL / 2;
  entity.y = entry.startY;
  entity.vx = 0; entity.vy = 0;
  entity.energy = 1;
  entity.radius = entity.baseRadius;
  entity.sx = 1; entity.sy = 1;
  entity.stretchAngle = 0;
  entity.history = []; entity.particles = [];
  entity._stateElapsed = 0;
  entity._currentPhase = null;
  entity._skipBoundary = false;
  entity._deformT = 0; entity._driftT = 0; entity._breathPhase = 0;
  entity.primary = entry.emotion;
  entity._stateDuration = EMOTION_DURATION;
}

// ── Gaussian dot renderer ─────────────────────────────────────────

const hexToRgb = (hex) => {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r ? { r: parseInt(r[1], 16), g: parseInt(r[2], 16), b: parseInt(r[3], 16) } : { r: 0, g: 0, b: 0 };
};

function lerpHex(a, b, t) {
  const ca = hexToRgb(a), cb = hexToRgb(b);
  const ri = Math.round(ca.r + (cb.r - ca.r) * t);
  const gi = Math.round(ca.g + (cb.g - ca.g) * t);
  const bi = Math.round(ca.b + (cb.b - ca.b) * t);
  return `#${ri.toString(16).padStart(2,'0')}${gi.toString(16).padStart(2,'0')}${bi.toString(16).padStart(2,'0')}`;
}


function createGaussianDot(size, blur, color) {
  const safeSize = isFinite(size) ? size : 50;
  const safeBlur = isFinite(blur) ? blur : 10;
  const canvasSize = safeSize + safeBlur * 4;
  const c = document.createElement('canvas');
  c.width = canvasSize; c.height = canvasSize;
  const ctx = c.getContext('2d');

  const makeGrad = (stops) => {
    const g = ctx.createRadialGradient(canvasSize/2, canvasSize/2, 0, canvasSize/2, canvasSize/2, safeSize/2);
    stops.forEach(([offset, style]) => g.addColorStop(offset, style));
    return g;
  };

  if (color && color.startsWith('#')) {
    const { r, g, b } = hexToRgb(color);
    ctx.fillStyle = makeGrad([
      [0,   `rgba(${r},${g},${b},1)`],
      [0.7, `rgba(${r},${g},${b},0.53)`],
      [1,   `rgba(${r},${g},${b},0)`],
    ]);
  } else if (color && (color.startsWith('hsl') || color.startsWith('rgb'))) {
    const toA = (s, a) => s.startsWith('hsl')
      ? s.replace(')', `, ${a})`).replace('hsl(', 'hsla(')
      : s.replace(')', `, ${a})`).replace('rgb(', 'rgba(');
    ctx.fillStyle = makeGrad([
      [0, toA(color, 1)], [0.7, toA(color, 0.53)], [1, toA(color, 0)],
    ]);
  } else {
    ctx.fillStyle = color ?? '#000';
  }
  ctx.fillRect(0, 0, canvasSize, canvasSize);
  return c;
}

// ── Valence × Arousal map ─────────────────────────────────────────

const MAP_SIZE = 256;
const MAP_PAD  = 32;
const PROGRESS_R    = 16;
const PROGRESS_CIRC = 2 * Math.PI * PROGRESS_R;

// Hoisted so the RAF loop can compute arc position without a React render
const toMapX = (v) => MAP_PAD + ((v + 1) / 2) * (MAP_SIZE - 2 * MAP_PAD);
const toMapY = (a) => MAP_PAD + ((1 - a) / 2) * (MAP_SIZE - 2 * MAP_PAD);

function ValenceArousalMap({ currentIdx, onSelect, progressArcRef, emotionLabelRef }) {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const axisColor  = '#d0d0d0';
  const labelColor = '#b0b0b0';
  const mid = MAP_SIZE / 2;

  const first = EMOTION_SEQUENCE[0];
  const initCx = toMapX(first.valence);
  const initCy = toMapY(first.arousal);

  return (
    <div style={{
      position: 'absolute',
      top: 16, right: 16,
      background: 'rgba(255,255,255,0.88)',
      borderRadius: 10,
      backdropFilter: 'blur(6px)',
      WebkitBackdropFilter: 'blur(6px)',
      padding: '8px 8px 4px',
      boxShadow: '0 1px 10px rgba(0,0,0,0.07)',
      userSelect: 'none',
    }}>
      <svg
        viewBox={`0 0 ${MAP_SIZE} ${MAP_SIZE}`}
        style={{ display: 'block', overflow: 'visible', width: 'min(256px, 45vw)', height: 'auto' }}
      >
        {/* Axes */}
        <line x1={MAP_PAD} y1={mid} x2={MAP_SIZE - MAP_PAD} y2={mid} stroke={axisColor} strokeWidth={1} />
        <line x1={mid} y1={MAP_PAD} x2={mid} y2={MAP_SIZE - MAP_PAD} stroke={axisColor} strokeWidth={1} />

        {/* Axis labels */}
        <text x={MAP_SIZE - MAP_PAD - 1} y={mid - 6} fontSize={13} fill={labelColor} textAnchor="end">positive</text>
        <text x={MAP_PAD + 1}            y={mid - 6} fontSize={13} fill={labelColor} textAnchor="start">negative</text>
        <text x={mid} y={MAP_PAD - 6}    fontSize={13} fill={labelColor} textAnchor="middle">arousal</text>
        <text x={mid} y={MAP_SIZE - MAP_PAD + 16} fontSize={13} fill={labelColor} textAnchor="middle">calm</text>

        {/* Progress arc — updated each frame via DOM ref, no re-render needed */}
        <circle
          ref={progressArcRef}
          cx={initCx}
          cy={initCy}
          r={PROGRESS_R}
          fill="none"
          stroke={first.color}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeDasharray={PROGRESS_CIRC}
          strokeDashoffset={PROGRESS_CIRC}
          transform={`rotate(-90, ${initCx}, ${initCy})`}
          style={{ pointerEvents: 'none' }}
        />

        {/* Emotion dots */}
        {EMOTION_SEQUENCE.map((e, i) => {
          const cx = toMapX(e.valence);
          const cy = toMapY(e.arousal);
          const isActive  = i === currentIdx;
          const isHovered = i === hoveredIdx;
          const r = isActive ? 10 : isHovered ? 8 : 6;
          return (
            <g
              key={e.label}
              onClick={() => onSelect(i)}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{ cursor: 'pointer' }}
            >
              {/* Invisible larger hit target */}
              <circle cx={cx} cy={cy} r={r + 4} fill="transparent" />
              <circle
                cx={cx} cy={cy} r={r}
                fill={isActive ? e.color : isHovered ? e.color : 'white'}
                stroke={isActive || isHovered ? e.color : '#ccc'}
                strokeWidth={isActive ? 2 : 1.5}
                style={{ transition: 'r 0.15s, fill 0.15s' }}
              />
            </g>
          );
        })}
      </svg>

      <div
        ref={emotionLabelRef}
        style={{
          fontSize: 11,
          fontFamily: 'monospace',
          color: '#888',
          textAlign: 'center',
          marginTop: 4,
          height: 16,
          letterSpacing: '0.02em',
        }}
      />
    </div>
  );
}

// ── Component ─────────────────────────────────────────────────────

const GaussianBlob = ({ width = 500, height = 400, dotSize = 200, blur = 22 }) => {
  const canvasRef      = useRef(null);
  const rafRef         = useRef(null);
  const progressArcRef = useRef(null);

  const propsRef = useRef({ width, height, dotSize, blur });
  useEffect(() => { propsRef.current = { width, height, dotSize, blur }; }, [width, height, dotSize, blur]);

  const [emotionIdx, setEmotionIdx] = useState(0);
  const [helpOpen, setHelpOpen] = useState(false);
  const emotionIdxRef     = useRef(0);
  const pendingEmotionRef = useRef(null);

  const stateRef = useRef({
    mouseX: width / 2, mouseY: height / 2, isHovering: false,
    posX: width / 2, posY: height / 2,
    squishX: 1, squishY: 1, isSquishing: false, squishT0: 0,
    trail: [],
    displayColor: EMOTION_SEQUENCE[0].color,
  });

  const entityRef = useRef(buildEntity(EMOTION_SEQUENCE[0]));
  // const reactionActiveRef   = useRef(false);  // DEPRECATED: surprised-on-hover reaction
  // const reactionCooldownRef = useRef(0);
  // const reactionLabelRef    = useRef(null);
  const emotionLabelRef     = useRef(null);

  // Mouse events
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const s = stateRef.current;

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      s.mouseX = e.clientX - rect.left;
      s.mouseY = e.clientY - rect.top;
      s.isHovering = true;
    };
    const onLeave = () => { s.isHovering = false; };
    const onClick = () => {
      if (s.isSquishing) return;
      s.isSquishing = true;
      s.squishT0 = performance.now();
    };
    // DEPRECATED: surprised-on-hover reaction
    // const onEnter = () => {
    //   const now = performance.now();
    //   if (now - reactionCooldownRef.current < 4000) return;
    //   reactionCooldownRef.current = now;
    //   reactionActiveRef.current = true;
    //   resetEntity(entityRef.current, EMOTION_SEQUENCE[3]); // surprised
    //   if (reactionLabelRef.current) reactionLabelRef.current.classList.add('visible');
    // };

    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseleave', onLeave);
    canvas.addEventListener('mousedown', onClick);
    // canvas.addEventListener('mouseenter', onEnter);
    return () => {
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseleave', onLeave);
      canvas.removeEventListener('mousedown', onClick);
      // canvas.removeEventListener('mouseenter', onEnter);
    };
  }, []);

  // Main RAF loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const s = stateRef.current;

    let lastTime = 0;
    const loop = (timestamp) => {
      rafRef.current = requestAnimationFrame(loop);
      const { width, height, dotSize, blur } = propsRef.current;
      const dt = lastTime ? Math.min((timestamp - lastTime) / 1000, 0.05) : 0.016;
      lastTime = timestamp;

      const entity = entityRef.current;

      // Handle map-click emotion jump
      if (pendingEmotionRef.current !== null) {
        const idx = pendingEmotionRef.current;
        pendingEmotionRef.current = null;
        emotionIdxRef.current = idx;
        resetEntity(entity, EMOTION_SEQUENCE[idx]);
      }

      // Advance entity
      entity._stateElapsed += dt;
      if (entity.t >= 1) {
        // DEPRECATED: surprised-on-hover reaction
        // if (reactionActiveRef.current) {
        //   reactionActiveRef.current = false;
        //   if (reactionLabelRef.current) reactionLabelRef.current.classList.remove('visible');
        //   resetEntity(entity, EMOTION_SEQUENCE[emotionIdxRef.current]);
        // } else {
          const next = (emotionIdxRef.current + 1) % EMOTION_SEQUENCE.length;
          emotionIdxRef.current = next;
          setEmotionIdx(next);
          resetEntity(entity, EMOTION_SEQUENCE[next]);
        // }
      }

      entity.update(dt);
      entity.step(dt, REF_BOUNDS);

      // Update emotion label via DOM
      if (emotionLabelRef.current) {
        // DEPRECATED: reactionActiveRef.current ? 'Surprised' : ...
        emotionLabelRef.current.textContent = `Current Emotion: ${EMOTION_SEQUENCE[emotionIdxRef.current].label}`;
      }

      // ── Update progress arc via DOM (no React re-render) ──────────
      const arc = progressArcRef.current;
      if (arc) {
        const entry = EMOTION_SEQUENCE[emotionIdxRef.current];
        const cx = toMapX(entry.valence);
        const cy = toMapY(entry.arousal);
        const offset = PROGRESS_CIRC * (1 - entity.t);
        arc.setAttribute('cx', cx);
        arc.setAttribute('cy', cy);
        arc.setAttribute('stroke', entry.color);
        arc.setAttribute('stroke-dashoffset', offset);
        arc.setAttribute('transform', `rotate(-90, ${cx}, ${cy})`);
      }

      // Scale ref-space position to canvas
      const autoX = (entity.x / CELL) * width;
      const autoY = (entity.y / CELL) * height;

      // Squish on click
      if (s.isSquishing) {
        const elapsed = (timestamp - s.squishT0) / 400;
        if (elapsed < 1) {
          const sq = Math.sin(Math.PI * 2 * elapsed) * 0.22 * Math.exp(-3 * elapsed);
          s.squishX = 1 + sq; s.squishY = 1 - sq;
        } else {
          s.squishX = 1; s.squishY = 1;
          s.isSquishing = false;
        }
      }

      // // Lerp toward target — scale tracking speed to entity velocity so fast
      // // lunges (anger, surprised) snap through rather than getting smoothed away
      // const targetX = (s.isHovering && !reactionActiveRef.current) ? s.mouseX : autoX;
      // const targetY = (s.isHovering && !reactionActiveRef.current) ? s.mouseY : autoY;
      // const entitySpeed = Math.hypot(entity.vx, entity.vy); // px/s in ref space
      // const velocityBoost = Math.min(entitySpeed / 200, 1) * 0.25;
      // const lerpSpeed = s.isHovering ? 0.16 : 0.08 + velocityBoost;
      // s.posX += (targetX - s.posX) * lerpSpeed;
      // s.posY += (targetY - s.posY) * lerpSpeed;
      s.posX = autoX;
      s.posY = autoY;

      // Color
      const emotionColor = EMOTION_SEQUENCE[emotionIdxRef.current].color;
      s.displayColor = lerpHex(s.displayColor, emotionColor, 0.06);
      // const activeColor = s.isHovering
      //   ? getMouseColor(s.posX, s.posY, width, height)
      //   : s.displayColor;
      const activeColor = s.displayColor;

      // Combine click-squish with emotion's own squash/stretch (e.g. anger seethe)
      const totalSx = s.squishX * (entity.sx ?? 1);
      const totalSy = s.squishY * (entity.sy ?? 1);

      // Draw blob
      const dot = createGaussianDot(dotSize, blur, activeColor);
      const dotX = s.posX - dot.width / 2;
      const dotY = s.posY - dot.height / 2;

      s.trail.push({ x: dotX, y: dotY, sx: totalSx, sy: totalSy });
      if (s.trail.length > 15) s.trail.shift();

      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < s.trail.length - 1; i++) {
        const tr = s.trail[i];
        const prog = (i + 1) / s.trail.length;
        const td = createGaussianDot(dotSize * (0.3 + 0.7 * prog), blur, activeColor);
        ctx.save();
        ctx.globalAlpha = prog * 0.35;
        ctx.translate(tr.x + td.width / 2, tr.y + td.height / 2);
        ctx.scale(tr.sx, tr.sy);
        ctx.drawImage(td, -td.width / 2, -td.height / 2);
        ctx.restore();
      }

      ctx.save();
      ctx.translate(dotX + dot.width / 2, dotY + dot.height / 2);
      ctx.rotate(entity.stretchAngle ?? 0);
      ctx.scale(totalSx, totalSy);
      ctx.rotate(-(entity.stretchAngle ?? 0));
      ctx.drawImage(dot, -dot.width / 2, -dot.height / 2);
      ctx.restore();
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const handleSelect = (idx) => {
    pendingEmotionRef.current = idx;
    setEmotionIdx(idx);
  };

  return (
    <div style={{ position: 'relative', width, height }}>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{ display: 'block', cursor: 'crosshair' }}
      />
      {/* DEPRECATED: surprised-on-hover reaction label */}
      {/* <div ref={reactionLabelRef} className="gaussian-reaction-label"></div> */}
      <button
        className="gaussian-help-btn"
        onClick={() => setHelpOpen(o => !o)}
        aria-label="Help"
      >?</button>
      {helpOpen && (
        <div className="gaussian-help-popover">
          The dot is an agent cycling through emotions. If it notices you — your cursor entering the canvas — it will act surprised.
        </div>
      )}
      <ValenceArousalMap
        currentIdx={emotionIdx}
        onSelect={handleSelect}
        progressArcRef={progressArcRef}
        emotionLabelRef={emotionLabelRef}
      />
    </div>
  );
};

export default GaussianBlob;
