import { useEffect, useRef, useState } from 'react';
import { Entity } from '../lib/motion-emotion-interfaces/entity.js';
import { CW } from '../lib/motion-emotion-interfaces/canvas-constants.js';
import { SOLO_VERBS } from '../lib/motion_vocabulary/generated_verbs.js';
import './EmotionsReference.css';

const CELL_SIZE = 200;

const SPRITE_COLOR = '#6ec6ff';

const VERB_ENTRIES = Object.entries(SOLO_VERBS).map(([key, Cls]) => ({ key, Cls }));

function resetEntity(entity) {
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
  entity._currentPhase = null;
  entity._idleAnchorX = null;
  entity._idleAnchorY = null;
  entity._idlePath = null;
}

const VerbReference = () => {
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
    cellsRef.current = VERB_ENTRIES.map((entry, i) => {
      const canvas = canvasRefs.current[i];
      if (!canvas) return null;
      const bounds = { left: 0, top: 0, right: CELL_SIZE, bottom: CELL_SIZE };
      const entity = new Entity(CELL_SIZE / 2, CELL_SIZE * 0.65, {
        radius: 24 * (CELL_SIZE / CW),
        color: SPRITE_COLOR,
        boundaryBehavior: 'rebound',
      });
      entity._bounds = bounds;
      entity.primary = new entry.Cls();
      entity._stateDuration = 4;
      return { canvas, entity, bounds, key: entry.key };
    }).filter(Boolean);

    let lastTime = 0;
    const loop = (timestamp) => {
      const dt = lastTime ? Math.min((timestamp - lastTime) / 1000, 0.05) : 0.016;
      lastTime = timestamp;
      if (playingRef.current) {
        const isLight = themeRef.current === 'light';
        for (const cell of cellsRef.current) {
          const { canvas, entity, bounds } = cell;
          const ctx = canvas.getContext('2d');
          entity._stateElapsed += dt;
          if (entity._stateElapsed >= 6) resetEntity(entity);
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
        <button onClick={() => { cellsRef.current.forEach(c => resetEntity(c.entity)); setPlaying(true); }}>Replay</button>
        <button className="er-theme-toggle" onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
          {theme === 'light' ? '☀' : '☾'}
        </button>
      </div>
      <div className="er-grid">
        {VERB_ENTRIES.map((entry, i) => (
          <div key={entry.key} className="er-cell" style={{ backgroundColor: theme === 'light' ? '#f5f5f5' : '#0a0a0a' }}>
            <canvas ref={el => canvasRefs.current[i] = el} width={CELL_SIZE} height={CELL_SIZE} />
            <div className="er-cell-label" style={{ color: theme === 'light' ? '#333' : '#ccc' }}>{entry.key}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerbReference;
