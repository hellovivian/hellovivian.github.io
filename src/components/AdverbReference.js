import { useEffect, useRef, useState } from 'react';
import { Entity } from '../lib/motion-emotion-interfaces/entity.js';
import { CW } from '../lib/motion-emotion-interfaces/canvas-constants.js';
import { SOLO_VERBS } from '../lib/motion_vocabulary/generated_verbs.js';
import {
  Slowly, Quickly, Suddenly, Urgently, Eagerly, Forcefully,
  Hesitantly, Nervously, Lazily, Erratically, Gently, Playfully,
} from '../lib/eval/tech-eval/generations/adverbs_2026-03-14_1351.js';
import './EmotionsReference.css';

const CW_MAIN = 512, CH_MAIN = 512;
const SPRITE_COLOR = '#6ec6ff';
const CHIP_LEAF   = { background: '#ffe0f0', borderColor: '#ff69b4', color: '#8a1a50' };
const CHIP_ACTIVE = { background: '#ffb0d6', borderColor: '#ff69b4', color: '#6a0a3a' };
const BaseVerbCls = SOLO_VERBS.wander;

const ADVERB_ENTRIES = [
  { key: 'Slowly',      Cls: Slowly },
  { key: 'Quickly',     Cls: Quickly },
  { key: 'Suddenly',    Cls: Suddenly },
  { key: 'Urgently',    Cls: Urgently },
  { key: 'Eagerly',     Cls: Eagerly },
  { key: 'Forcefully',  Cls: Forcefully },
  { key: 'Hesitantly',  Cls: Hesitantly },
  { key: 'Nervously',   Cls: Nervously },
  { key: 'Lazily',      Cls: Lazily },
  { key: 'Erratically', Cls: Erratically },
  { key: 'Gently',      Cls: Gently },
  { key: 'Playfully',   Cls: Playfully },
];

function makeEntity(entry) {
  const entity = new Entity(CW_MAIN / 2, CH_MAIN * 0.65, {
    radius: 24 * (CW_MAIN / CW),
    color: SPRITE_COLOR,
    boundaryBehavior: 'rebound',
  });
  entity._stateElapsed = 0;
  const verb = new BaseVerbCls();
  const adverb = new entry.Cls();
  adverb.decorate(verb, entity);
  entity.primary = verb;
  entity._stateDuration = 4;
  return entity;
}

const AdverbReference = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const mainCanvasRef = useRef(null);
  const entityRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    entityRef.current = makeEntity(ADVERB_ENTRIES[0]);

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
    entityRef.current = makeEntity(ADVERB_ENTRIES[i]);
  };

  return (
    <div className="er-panel">
      <div className="er-main-wrap" style={{ background: '#0a0a0a' }}>
        <canvas ref={mainCanvasRef} width={CW_MAIN} height={CH_MAIN} className="er-main-canvas" />
        <span className="er-main-label">{ADVERB_ENTRIES[activeIdx].key}</span>
      </div>
      <div className="er-chips">
        {ADVERB_ENTRIES.map((entry, i) => (
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

export default AdverbReference;
