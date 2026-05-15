import { useEffect, useRef, useState } from 'react';
import { Entity } from '../lib/motion-emotion-interfaces/entity.js';
import { CW } from '../lib/motion-emotion-interfaces/canvas-constants.js';
import { SOLO_VERBS } from '../lib/motion_vocabulary/generated_verbs.js';
import { Clap } from '../lib/motion-emotion-interfaces/emotions/clap.js';
import { Dance } from '../lib/motion-emotion-interfaces/emotions/dance.js';
import { Wave } from '../lib/motion-emotion-interfaces/emotions/wave.js';
import { Nod } from '../lib/motion-emotion-interfaces/emotions/nod.js';
import { HeadShake } from '../lib/motion-emotion-interfaces/emotions/headshake.js';
import { Shrug } from '../lib/motion-emotion-interfaces/emotions/shrug.js';
import { TrembleGesture } from '../lib/motion-emotion-interfaces/emotions/tremble.js';
import { Sag } from '../lib/motion-emotion-interfaces/emotions/sag.js';
import './EmotionsReference.css';

const CELL_SIZE = 200;
const SPRITE_COLOR = '#6ec6ff';
const Idle = SOLO_VERBS.idle;

const GESTURE_ENTRIES = [
  { key: 'Clap',       Cls: Clap },
  { key: 'Dance',      Cls: Dance },
  { key: 'Wave',       Cls: Wave },
  { key: 'Nod',        Cls: Nod },
  { key: 'Head Shake', Cls: HeadShake },
  { key: 'Shrug',      Cls: Shrug },
  { key: 'Tremble',    Cls: TrembleGesture },
  { key: 'Sag',        Cls: Sag },
];

function resetEntity(entity, gestureCls) {
  entity.x = CELL_SIZE / 2;
  entity.y = CELL_SIZE * 0.65;
  entity.vx = 0;
  entity.vy = 0;
  entity.energy = 1;
  entity.radius = entity.baseRadius;
  entity.sx = 1;
  entity.sy = 1;
  entity.stretchAngle = 0;
  entity.history = [];
  entity.particles = [];
  entity._stateElapsed = 0;
  entity._idleAnchorX = null;
  entity._idleAnchorY = null;
  entity._idlePath = null;
  entity.primary = new Idle();
  entity.secondary = [new gestureCls()];
}

const GestureReference = () => {
  const [playing, setPlaying] = useState(true);
  const [theme, setTheme] = useState('dark');
  const canvasRefs = useRef([]);
  const cellsRef = useRef([]);
  const rafRef = useRef(null);
  const playingRef = useRef(playing);
  const themeRef = useRef(theme);

  useEffect(() => { playingRef.current = playing; }, [playing]);
  useEffect(() => { themeRef.current = theme; }, [theme]);

  useEffect(() => {
    cellsRef.current = GESTURE_ENTRIES.map((entry, i) => {
      const canvas = canvasRefs.current[i];
      if (!canvas) return null;
      const bounds = { left: 0, top: 0, right: CELL_SIZE, bottom: CELL_SIZE };
      const entity = new Entity(CELL_SIZE / 2, CELL_SIZE * 0.65, {
        radius: 24 * (CELL_SIZE / CW),
        color: SPRITE_COLOR,
        boundaryBehavior: 'rebound',
      });
      entity._bounds = bounds;
      entity.primary = new Idle();
      entity.secondary = [new entry.Cls()];
      entity._stateDuration = 4;
      return { canvas, entity, bounds, key: entry.key, Cls: entry.Cls };
    }).filter(Boolean);

    let lastTime = 0;
    const loop = (timestamp) => {
      const dt = lastTime ? Math.min((timestamp - lastTime) / 1000, 0.05) : 0.016;
      lastTime = timestamp;
      if (playingRef.current) {
        const isLight = themeRef.current === 'light';
        for (const cell of cellsRef.current) {
          const { canvas, entity, bounds, Cls } = cell;
          const ctx = canvas.getContext('2d');
          entity._stateElapsed += dt;
          if (entity._stateElapsed >= 5) resetEntity(entity, Cls);
          try {
            entity.update(dt);
            entity.step(dt, bounds);
          } catch (e) { /* skip frame on error */ }
          ctx.fillStyle = isLight ? '#f5f5f5' : '#0a0a0a';
          ctx.fillRect(0, 0, CELL_SIZE, CELL_SIZE);
          if (isLight) {
            ctx.shadowColor = 'rgba(0,0,0,0.15)';
            ctx.shadowOffsetX = 2;
            ctx.shadowOffsetY = 3;
          }
          entity.draw(ctx, { showEnergy: true, isLight });
          ctx.shadowColor = 'transparent';
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 0;
        }
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  return (
    <div className={`emotions-reference ${theme}`}>
      <div className="er-controls">
        <button onClick={() => setPlaying(p => !p)}>{playing ? 'Pause' : 'Play'}</button>
        <button onClick={() => { cellsRef.current.forEach(c => resetEntity(c.entity, c.Cls)); setPlaying(true); }}>Replay</button>
        <button className="er-theme-toggle" onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
          {theme === 'light' ? '☀' : '☾'}
        </button>
      </div>
      <div className="er-grid">
        {GESTURE_ENTRIES.map((entry, i) => (
          <div key={entry.key} className="er-cell" style={{ backgroundColor: theme === 'light' ? '#f5f5f5' : '#0a0a0a' }}>
            <canvas ref={el => canvasRefs.current[i] = el} width={CELL_SIZE} height={CELL_SIZE} />
            <div className="er-cell-label" style={{ color: theme === 'light' ? '#333' : '#ccc' }}>{entry.key}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GestureReference;
