import { useEffect, useRef, useState } from 'react';
import { Entity } from '../lib/motion-emotion-interfaces/entity.js';
import { CW } from '../lib/motion-emotion-interfaces/canvas-constants.js';
import { GENERATED_EMOTION_CLASSES, EMOTION_VARIANT_MAP } from '../lib/eval/tech-eval/generated_emotions.js';
import './EmotionsReference.css';

const CW_MAIN = 512, CH_MAIN = 512;

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const EMOTION_ENTRIES = Object.entries(GENERATED_EMOTION_CLASSES).map(([variant, emotion]) => ({
  key: capitalize(EMOTION_VARIANT_MAP[variant]),
  emotion,
}));

function resetEntity(entity) {
  entity.x = CW_MAIN / 2;
  entity.y = entity._startY ?? CW_MAIN * 0.65;
  entity.vx = 0; entity.vy = 0;
  entity.energy = 1;
  entity.radius = entity.baseRadius;
  entity.sx = 1; entity.sy = 1; entity.stretchAngle = 0;
  entity.history = []; entity.particles = [];
  entity._stateElapsed = 0; entity._currentPhase = null;
  entity._skipBoundary = false; entity._deformT = 0;
  entity._driftT = 0; entity._breathPhase = 0;
}

function makeEntity(entry) {
  const bounds = { left: 0, top: 0, right: CW_MAIN, bottom: CH_MAIN };
  const entity = new Entity(CW_MAIN / 2, CH_MAIN * 0.65, {
    radius: 24 * (CW_MAIN / CW),
    color: '#6ec6ff',
    boundaryBehavior: 'rebound',
  });
  entity._bounds = bounds;
  entity._startY = CH_MAIN * 0.65;
  entity.primary = entry.emotion;
  entity._stateDuration = 4;
  return entity;
}

const EmotionsReference = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeIdxRef = useRef(0);
  const mainCanvasRef = useRef(null);
  const entityRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    entityRef.current = makeEntity(EMOTION_ENTRIES[0]);

    const canvas = mainCanvasRef.current;
    const ctx = canvas.getContext('2d');
    const bounds = { left: 0, top: 0, right: CW_MAIN, bottom: CH_MAIN };
    let lastTime = 0;

    const loop = (ts) => {
      const dt = lastTime ? Math.min((ts - lastTime) / 1000, 0.05) : 0.016;
      lastTime = ts;

      const ent = entityRef.current;
      if (ent) {
        ent._stateElapsed = (ent._stateElapsed || 0) + dt;
        if (ent.t >= 1) resetEntity(ent);
        ent.update(dt);
        ent.step(dt, bounds);

        ctx.fillStyle = '#0a0a0a';
        ctx.fillRect(0, 0, CW_MAIN, CH_MAIN);
        ent.draw(ctx, { showEnergy: true, isLight: false });
      }

      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const select = (i) => {
    setActiveIdx(i);
    activeIdxRef.current = i;
    entityRef.current = makeEntity(EMOTION_ENTRIES[i]);
  };

  return (
    <div className="er-panel">
      <div className="er-main-wrap" style={{ background: '#0a0a0a' }}>
        <canvas ref={mainCanvasRef} width={CW_MAIN} height={CH_MAIN} className="er-main-canvas" />
        <span className="er-main-label">{EMOTION_ENTRIES[activeIdx].key}</span>
      </div>
      <div className="er-chips">
        {EMOTION_ENTRIES.map((entry, i) => (
          <button
            key={entry.key}
            className={`er-chip${i === activeIdx ? ' er-chip--active' : ''}`}
            onClick={() => select(i)}
          >
            {entry.key}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmotionsReference;
