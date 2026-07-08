import { useState, useEffect, useRef } from 'react';
import './MotionAPIReference.css';

const VERB_GROUPS = [
  { name: 'SoloVerb',       leaves: ['Flinch'] },
  { name: 'RelationalVerb', leaves: ['Follow', 'Chase', 'Avoid', 'Flee', 'Cling', 'Lunge', 'Recoil'] },
  { name: 'PathMotion',     leaves: ['Walk', 'Swoop', 'Arc', 'Spiral', 'Drift', 'Jump'] },
  { name: 'PinMotion',      leaves: ['Anchor', 'Stationary', 'Freeze'] },
];

const EMOTION_LEAVES = ['Anger', 'Joy', 'Miserable', 'Stressed', 'Ecstatic', 'Fear', 'Sleepy', 'Sad'];
const GESTURE_LEAVES = ['Clap', 'Dance', 'Wave', 'Nod', 'HeadShake', 'Shrug', 'TrembleGesture', 'Sag'];
const ADVERB_LEAVES  = ['Slowly', 'Quickly', 'Suddenly', 'Urgently', 'Eagerly', 'Forcefully', 'Hesitantly', 'Nervously', 'Lazily', 'Erratically', 'Gently', 'Playfully'];

// ── Source file map: class name → public URL ──
const SRC = '/source/motion-emotion-interfaces';
const SOURCE_FILES = {
  // Core
  Entity:         `${SRC}/entity.js`,

  // Bases
  Motion:         `${SRC}/motion.js`,
  Verb:           `${SRC}/verb.js`,
  SoloVerb:       `${SRC}/verb.js`,
  RelationalVerb: `${SRC}/verb.js`,
  PathMotion:     `${SRC}/path-motion.js`,
  PinMotion:      `${SRC}/pin-motion.js`,
  Emotion:        `${SRC}/emotion.js`,
  Gesture:        `${SRC}/gesture.js`,
  Adverb:         `${SRC}/adverbs.js`,

  // Verb leaves (mostly in solo-verbs.js / relational-verbs.js)
  Flinch:         `${SRC}/solo-verbs.js`,
  Anchor:         `${SRC}/solo-verbs.js`,
  Stationary:     `${SRC}/solo-verbs.js`,
  Freeze:         `${SRC}/solo-verbs.js`,
  Drift:          `${SRC}/solo-verbs.js`,
  Walk:           `${SRC}/solo-verbs.js`,
  Arc:            `${SRC}/solo-verbs.js`,
  Lunge:          `${SRC}/solo-verbs.js`,
  Recoil:         `${SRC}/solo-verbs.js`,
  Follow:         `${SRC}/relational-verbs.js`,
  Chase:          `${SRC}/relational-verbs.js`,
  Avoid:          `${SRC}/relational-verbs.js`,
  Flee:           `${SRC}/relational-verbs.js`,
  Cling:          `${SRC}/relational-verbs.js`,
  Swoop:          `${SRC}/relational-verbs.js`,
  Jump:           `${SRC}/relational-verbs.js`,
  // From generated_verbs (PathMotion subclasses)
  Spiral:         '/source/motion_vocabulary/generations/verbs_2026-03-14_1726.js',

  // Gestures (in emotions/ folder)
  Clap:           `${SRC}/emotions/clap.js`,
  Dance:          `${SRC}/emotions/dance.js`,
  Wave:           `${SRC}/emotions/wave.js`,
  Nod:            `${SRC}/emotions/nod.js`,
  HeadShake:      `${SRC}/emotions/headshake.js`,
  Shrug:          `${SRC}/emotions/shrug.js`,
  TrembleGesture: `${SRC}/emotions/tremble.js`,
  Sag:            `${SRC}/emotions/sag.js`,

  // Emotions
  Anger:          `${SRC}/emotions/anger.js`,
  Joy:            `${SRC}/emotions/joy.js`,
  Miserable:      `${SRC}/emotions/miserable.js`,
  Stressed:       `${SRC}/emotions/stressed.js`,
  Ecstatic:       `${SRC}/emotions/ecstatic.js`,
  Fear:           `${SRC}/emotions/fear.js`,
  Sleepy:         `${SRC}/emotions/sleepy.js`,
  Sad:            `${SRC}/emotions/sad.js`,

  // Adverbs (all in one generated file)
  Slowly:      '/source/eval/tech-eval/generations/adverbs_2026-03-14_1351.js',
  Quickly:     '/source/eval/tech-eval/generations/adverbs_2026-03-14_1351.js',
  Suddenly:    '/source/eval/tech-eval/generations/adverbs_2026-03-14_1351.js',
  Urgently:    '/source/eval/tech-eval/generations/adverbs_2026-03-14_1351.js',
  Eagerly:     '/source/eval/tech-eval/generations/adverbs_2026-03-14_1351.js',
  Forcefully:  '/source/eval/tech-eval/generations/adverbs_2026-03-14_1351.js',
  Hesitantly:  '/source/eval/tech-eval/generations/adverbs_2026-03-14_1351.js',
  Nervously:   '/source/eval/tech-eval/generations/adverbs_2026-03-14_1351.js',
  Lazily:      '/source/eval/tech-eval/generations/adverbs_2026-03-14_1351.js',
  Erratically: '/source/eval/tech-eval/generations/adverbs_2026-03-14_1351.js',
  Gently:      '/source/eval/tech-eval/generations/adverbs_2026-03-14_1351.js',
  Playfully:   '/source/eval/tech-eval/generations/adverbs_2026-03-14_1351.js',
};

// Some emotion files export a primary instance with a different name than the file class
// (e.g., `joy.js` exports `joy` as an Emotion instance). Try several patterns.
const EXTRACT_PATTERNS = (name) => [
  new RegExp(`export class ${name}\\b[^{]*\\{`),  // export class Name extends X {
  new RegExp(`class ${name}\\b[^{]*\\{`),         // class Name extends X {
];

function extractBlock(source, name) {
  let startIdx = -1;
  for (const re of EXTRACT_PATTERNS(name)) {
    const m = re.exec(source);
    if (m) { startIdx = m.index; break; }
  }
  if (startIdx === -1) return null;

  // Walk forward and balance braces to find the closing }
  let depth = 0;
  let started = false;
  for (let i = startIdx; i < source.length; i++) {
    const c = source[i];
    if (c === '{') { depth++; started = true; }
    else if (c === '}') {
      depth--;
      if (started && depth === 0) return source.slice(startIdx, i + 1);
    }
  }
  return source.slice(startIdx);
}

// Lightweight syntax highlighting — just style keywords, strings, numbers, comments
function highlight(code) {
  const KEYWORDS = /\b(class|extends|constructor|super|new|return|if|else|for|while|const|let|var|function|this|import|export|from|null|true|false|typeof|in|of)\b/g;
  const out = [];
  let i = 0;
  const n = code.length;

  while (i < n) {
    const c = code[i];
    const next = code[i + 1];

    // Line comment
    if (c === '/' && next === '/') {
      const end = code.indexOf('\n', i);
      const txt = code.slice(i, end === -1 ? n : end);
      out.push(<span key={i} className="hl-cmt">{txt}</span>);
      i = end === -1 ? n : end;
      continue;
    }
    // Block comment
    if (c === '/' && next === '*') {
      const end = code.indexOf('*/', i);
      const stop = end === -1 ? n : end + 2;
      out.push(<span key={i} className="hl-cmt">{code.slice(i, stop)}</span>);
      i = stop;
      continue;
    }
    // String
    if (c === "'" || c === '"' || c === '`') {
      const quote = c;
      let end = i + 1;
      while (end < n && code[end] !== quote) {
        if (code[end] === '\\') end++;
        end++;
      }
      end = Math.min(end + 1, n);
      out.push(<span key={i} className="hl-str">{code.slice(i, end)}</span>);
      i = end;
      continue;
    }
    // Number
    if (/[0-9]/.test(c) && (i === 0 || /[^a-zA-Z_]/.test(code[i - 1]))) {
      let end = i;
      while (end < n && /[0-9.]/.test(code[end])) end++;
      out.push(<span key={i} className="hl-num">{code.slice(i, end)}</span>);
      i = end;
      continue;
    }
    // Word
    if (/[a-zA-Z_$]/.test(c)) {
      let end = i;
      while (end < n && /[a-zA-Z0-9_$]/.test(code[end])) end++;
      const word = code.slice(i, end);
      KEYWORDS.lastIndex = 0;
      if (KEYWORDS.test(word)) {
        out.push(<span key={i} className="hl-kw">{word}</span>);
      } else if (/^[A-Z]/.test(word)) {
        out.push(<span key={i} className="hl-type">{word}</span>);
      } else {
        out.push(word);
      }
      i = end;
      continue;
    }
    // Default
    out.push(c);
    i++;
  }
  return out;
}

const CodeSnippet = ({ name, code, loading }) => (
  <pre className="api-snippet">
    <div className="api-snippet-header">{name}</div>
    <code>
      {loading ? <span className="hl-cmt">// loading…</span> : highlight(code || `// ${name} — source not available`)}
    </code>
  </pre>
);

const MotionAPIReference = () => {
  const [selected, setSelected] = useState('Chase');
  const [cache, setCache] = useState({});
  const [loading, setLoading] = useState(false);
  const [connectors, setConnectors] = useState([]);
  const wrapperRef  = useRef(null);
  const motionRef   = useRef(null);
  const verbRef     = useRef(null);
  const emotionRef  = useRef(null);
  const gestureRef  = useRef(null);
  const adverbRef   = useRef(null);

  useEffect(() => {
    function compute() {
      const wrapper = wrapperRef.current;
      const refs = [motionRef, verbRef, emotionRef, gestureRef, adverbRef];
      if (!wrapper || refs.some(r => !r.current)) return;
      const wRect = wrapper.getBoundingClientRect();
      const [mR, vR, eR, gR, aR] = refs.map(r => r.current.getBoundingClientRect());
      const mx = mR.left + mR.width / 2 - wRect.left;
      const my = mR.bottom - wRect.top;
      const paths = [vR, eR, gR, aR].map(tR => {
        const tx = tR.left + tR.width / 2 - wRect.left;
        const ty = tR.top - wRect.top;
        const mid = my + (ty - my) * 0.5;
        return `M ${mx} ${my} L ${mx} ${mid} L ${tx} ${mid} L ${tx} ${ty}`;
      });
      setConnectors(paths);
    }
    compute();
    const obs = new ResizeObserver(compute);
    if (wrapperRef.current) obs.observe(wrapperRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!selected) return;
    if (cache[selected] !== undefined) return;
    const url = SOURCE_FILES[selected];
    if (!url) {
      setCache(c => ({ ...c, [selected]: null }));
      return;
    }
    setLoading(true);
    fetch(url)
      .then(r => r.text())
      .then(text => {
        const block = extractBlock(text, selected);
        setCache(c => ({ ...c, [selected]: block }));
      })
      .catch(() => setCache(c => ({ ...c, [selected]: null })))
      .finally(() => setLoading(false));
  }, [selected, cache]);

  const Node = ({ name, kind = 'leaf', nodeRef }) => (
    <button
      ref={nodeRef}
      type="button"
      className={`node ${kind} ${selected === name ? 'selected' : ''}`}
      onClick={() => setSelected(s => s === name ? null : name)}
    >
      {name}
    </button>
  );

  return (
    <div className="motion-api">
      <p className="motion-api-hint">Click any function to read its implementation.</p>
      <div className="motion-api-layout">
        <div className="motion-api-tree">
          <div className="entity-row">
            <Node name="Entity" kind="motion" />
          </div>
          <div className="split col-labels-row">
            <div className="split-col left"><div className="col-label">Primary Motion</div></div>
            <div className="split-col right"><div className="col-label">Secondary Motion</div></div>
          </div>

          <div ref={wrapperRef} style={{ position: 'relative' }}>
            <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', overflow: 'visible' }}>
              {connectors.map((d, i) => (
                <path key={i} d={d} fill="none" stroke="#ddd" strokeWidth={1} />
              ))}
            </svg>

            <div className="root-row">
              <Node name="Motion" kind="motion" nodeRef={motionRef} />
            </div>

            <div className="split">
              {/* PRIMARY MOTION (left) */}
              <div className="split-col left">
                <ul className="tree col-verb">
                  <li>
                    <Node name="Verb" kind="root" nodeRef={verbRef} />
                    <ul>
                      {VERB_GROUPS.map(group => (
                        <li key={group.name}>
                          <Node name={group.name} kind="base" />
                          <div className="leaf-row">
                            {group.leaves.map(leaf => (
                              <Node key={leaf} name={leaf} kind="leaf" />
                            ))}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </li>
                </ul>

                <ul className="tree col-emotion" style={{ marginTop: 8 }}>
                  <li>
                    <Node name="Emotion" kind="root" nodeRef={emotionRef} />
                    <div className="leaf-row">
                      {EMOTION_LEAVES.map(leaf => (
                        <Node key={leaf} name={leaf} kind="leaf" />
                      ))}
                    </div>
                  </li>
                </ul>
              </div>

              {/* SECONDARY MOTION (right) */}
              <div className="split-col right">
                <ul className="tree col-gesture">
                  <li>
                    <Node name="Gesture" kind="root" nodeRef={gestureRef} />
                    <div className="leaf-row">
                      {GESTURE_LEAVES.map(leaf => (
                        <Node key={leaf} name={leaf} kind="leaf" />
                      ))}
                    </div>
                  </li>
                </ul>

                <ul className="tree col-adverb" style={{ marginTop: 8 }}>
                  <li>
                    <Node name="Adverb" kind="root" nodeRef={adverbRef} />
                    <div className="leaf-row">
                      {ADVERB_LEAVES.map(leaf => (
                        <Node key={leaf} name={leaf} kind="leaf" />
                      ))}
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className={`motion-api-code${selected ? ' motion-api-code--visible' : ''}`}>
          {selected && (
            <CodeSnippet name={selected} code={cache[selected]} loading={loading && cache[selected] === undefined} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MotionAPIReference;
