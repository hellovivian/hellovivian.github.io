import { useEffect, useRef, useState } from 'react';
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
import './EmotionsReference.css';

const CELL_SIZE = 200;

const EMOTION_ENTRIES = [
  { key: 'Joy',                emotion: joy,               color: '#FFD54F' },
  { key: 'Relaxed',            emotion: relaxed,           color: '#81C784' },
  { key: 'Sleepy',             emotion: sleepy,            color: '#7986CB' },
  { key: 'Surprised',          emotion: surprised,         color: '#F9A825' },
  { key: 'Fear',               emotion: fear,              color: '#B39DDB' },
  { key: 'Miserable',          emotion: miserable,         color: '#78909C' },
  { key: 'Miserable Drowning', emotion: miserableDrowning, color: '#90A4AE' },
  { key: 'Anger',              emotion: anger,             color: '#EF5350' },
  { key: 'Stressed',           emotion: stressed,          color: '#FF8A65' },
];

function resetEntity(entity) {
  entity.x = CELL_SIZE / 2;
  entity.y = entity._startY ?? CELL_SIZE * 0.65;
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
  entity._skipBoundary = false;
  entity._deformT = 0;
  entity._driftT = 0;
  entity._breathPhase = 0;
}

const EmotionsReference = () => {
  const [playing, setPlaying] = useState(true);
  const [theme, setTheme] = useState('light');
  const canvasRefs = useRef([]);
  const cellsRef = useRef([]);
  const rafRef = useRef(null);
  const playingRef = useRef(playing);
  const themeRef = useRef(theme);

  useEffect(() => { playingRef.current = playing; }, [playing]);
  useEffect(() => { themeRef.current = theme; }, [theme]);

  useEffect(() => {
    cellsRef.current = EMOTION_ENTRIES.map((entry, i) => {
      const canvas = canvasRefs.current[i];
      if (!canvas) return null;

      const bounds = { left: 0, top: 0, right: CELL_SIZE, bottom: CELL_SIZE };
      const startY = entry.key === 'Miserable Drowning' ? CELL_SIZE * 0.15 : CELL_SIZE * 0.65;
      const entity = new Entity(CELL_SIZE / 2, startY, {
        radius: 24 * (CELL_SIZE / CW),
        color: '#ffffff',
        boundaryBehavior: entry.key === 'Miserable Drowning' ? 'deadStop' : 'rebound',
      });
      entity._bounds = bounds;
      entity._startY = startY;
      entity.primary = entry.emotion;
      entity._stateDuration = 4;

      return { canvas, entity, bounds, key: entry.key, emotionBg: entry.color };
    }).filter(Boolean);

    let lastTime = 0;
    const loop = (timestamp) => {
      const dt = lastTime ? Math.min((timestamp - lastTime) / 1000, 0.05) : 0.016;
      lastTime = timestamp;

      if (playingRef.current) {
        const isLight = themeRef.current === 'light';
        for (const cell of cellsRef.current) {
          const { canvas, entity, bounds, emotionBg } = cell;
          const bgColor = isLight ? emotionBg : '#0a0a0a';
          const ctx = canvas.getContext('2d');

          entity._stateElapsed += dt;
          if (entity.t >= 1) resetEntity(entity);

          entity.update(dt);
          entity.step(dt, bounds);

          ctx.fillStyle = bgColor;
          ctx.fillRect(0, 0, CELL_SIZE, CELL_SIZE);
          if (isLight) {
            ctx.shadowColor = 'rgba(0,0,0,0.15)';
            ctx.shadowBlur = 0;
            ctx.shadowOffsetX = 2;
            ctx.shadowOffsetY = 3;
          }
          entity.draw(ctx, { showEnergy: true, isLight });
          ctx.shadowColor = 'transparent';
          ctx.shadowBlur = 0;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 0;

          if (cell.key === 'Miserable Drowning') {
            ctx.save();
            ctx.globalAlpha = 1;
            ctx.fillStyle = isLight ? '#ffffff' : '#2a344d';
            ctx.beginPath();
            ctx.arc(entity.x, entity.y, entity.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
        }
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleReplay = () => {
    cellsRef.current.forEach(c => resetEntity(c.entity));
    setPlaying(true);
  };

  return (
    <div className={`emotions-reference ${theme}`}>
      <div className="er-controls">
        <button onClick={() => setPlaying(p => !p)}>{playing ? 'Pause' : 'Play'}</button>
        <button onClick={handleReplay}>Replay</button>
        <button
          className="er-theme-toggle"
          onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
          title="Toggle theme"
        >
          {theme === 'light' ? '☀' : '☾'}
        </button>
      </div>
      <div className="er-grid">
        {EMOTION_ENTRIES.map((entry, i) => (
          <div
            key={entry.key}
            className="er-cell"
            style={{ backgroundColor: theme === 'light' ? entry.color : '#0a0a0a' }}
          >
            <canvas
              ref={el => canvasRefs.current[i] = el}
              width={CELL_SIZE}
              height={CELL_SIZE}
            />
            <div className="er-cell-label">{entry.key}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmotionsReference;
