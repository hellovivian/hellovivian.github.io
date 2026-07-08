import { useEffect, useRef, useState } from 'react';
import { Entity } from '../lib/motion-emotion-interfaces/entity.js';
import { CW } from '../lib/motion-emotion-interfaces/canvas-constants.js';
import { SOLO_VERBS } from '../lib/motion_vocabulary/generated_verbs.js';
import './EmotionsReference.css';

const CW_MAIN = 512, CH_MAIN = 512;
const SPRITE_COLOR = '#6ec6ff';
const CHIP_LEAF   = { background: '#d8f9ea', borderColor: '#33dd99', color: '#2a5a4a' };
const CHIP_ACTIVE = { background: '#88eebb', borderColor: '#33dd99', color: '#0a3a2a' };

const VERB_ENTRIES = Object.entries(SOLO_VERBS).map(([key, Cls]) => ({ key, Cls }));

function makeEntity(entry) {
  const bounds = { left: 0, top: 0, right: CW_MAIN, bottom: CH_MAIN };
  const entity = new Entity(CW_MAIN / 2, CH_MAIN * 0.65, {
    radius: 24 * (CW_MAIN / CW),
    color: SPRITE_COLOR,
    boundaryBehavior: 'rebound',
  });
  entity._bounds = bounds;
  entity.primary = new entry.Cls();
  entity._stateDuration = 4;
  entity._stateElapsed = 0;
  return entity;
}

const VerbReference = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeIdxRef = useRef(0);
  const mainCanvasRef = useRef(null);
  const entityRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    entityRef.current = makeEntity(VERB_ENTRIES[0]);

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
        if (ent._stateElapsed >= 6) {
          ent._stateElapsed = 0;
          ent.x = CW_MAIN / 2; ent.y = CH_MAIN * 0.65;
          ent.vx = 0; ent.vy = 0;
        }
        try { ent.update(dt); ent.step(dt, bounds); } catch (e) {}

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
    entityRef.current = makeEntity(VERB_ENTRIES[i]);
  };

  return (
    <div className="er-panel">
      <div className="er-main-wrap" style={{ background: '#0a0a0a' }}>
        <canvas ref={mainCanvasRef} width={CW_MAIN} height={CH_MAIN} className="er-main-canvas" />
        <span className="er-main-label">{VERB_ENTRIES[activeIdx].key}</span>
      </div>
      <div className="er-chips">
        {VERB_ENTRIES.map((entry, i) => (
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

export default VerbReference;
