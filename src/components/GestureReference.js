import { useEffect, useRef, useState } from 'react';
import { Entity } from '../lib/motion-emotion-interfaces/entity.js';
import { CW } from '../lib/motion-emotion-interfaces/canvas-constants.js';
import { SOLO_VERBS } from '../lib/motion_vocabulary/generated_verbs.js';
import { GENERATED_GESTURE_CLASSES } from '../lib/eval/tech-eval/generated_gestures.js';
import './EmotionsReference.css';

const CW_MAIN = 512, CH_MAIN = 512;
const SPRITE_COLOR = '#6ec6ff';
const Idle = SOLO_VERBS.idle;

const toLabel = (key) => key.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

const GESTURE_ENTRIES = Object.entries(GENERATED_GESTURE_CLASSES).map(([key, Cls]) => ({
  key: toLabel(key),
  Cls,
}));

function makeEntity(entry) {
  const entity = new Entity(CW_MAIN / 2, CH_MAIN * 0.65, {
    radius: 24 * (CW_MAIN / CW),
    color: SPRITE_COLOR,
    boundaryBehavior: 'rebound',
  });
  entity._stateElapsed = 0;
  entity.primary = new Idle();
  entity.secondary = [new entry.Cls()];
  entity._stateDuration = 4;
  return entity;
}

const GestureReference = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const mainCanvasRef = useRef(null);
  const entityRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    entityRef.current = makeEntity(GESTURE_ENTRIES[0]);

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
        if (ent._stateElapsed >= 5) {
          ent._stateElapsed = 0;
          ent.x = CW_MAIN / 2; ent.y = CH_MAIN * 0.65;
          ent.vx = 0; ent.vy = 0;
        }
        try { ent.update(dt); ent.step(dt, bounds); } catch (e) {}

        ctx.fillStyle = '#0a0a0a';
        ctx.fillRect(0, 0, CW_MAIN, CH_MAIN);
        ctx.shadowColor = 'rgba(0,0,0,0.1)';
        ctx.shadowOffsetX = 2; ctx.shadowOffsetY = 3;
        ent.draw(ctx, { showEnergy: true, isLight: false });
        ctx.shadowColor = 'transparent';
        ctx.shadowOffsetX = 0; ctx.shadowOffsetY = 0;
      }

      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const select = (i) => {
    setActiveIdx(i);
    entityRef.current = makeEntity(GESTURE_ENTRIES[i]);
  };

  return (
    <div className="er-panel">
      <div className="er-main-wrap" style={{ background: '#0a0a0a' }}>
        <canvas ref={mainCanvasRef} width={CW_MAIN} height={CH_MAIN} className="er-main-canvas" />
        <span className="er-main-label">{GESTURE_ENTRIES[activeIdx].key}</span>
      </div>
      <div className="er-chips">
        {GESTURE_ENTRIES.map((entry, i) => (
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

export default GestureReference;
