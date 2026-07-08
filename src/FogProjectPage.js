import { useRef, useEffect, useState } from 'react';
import './App.css';
import './ProjectPage.css';
import './FogProjectPage.css';
import Navigation from './components/Navigation';
import LineDivider from './components/LineDivider';
import GaussianBlob from './components/GaussianBlob';
import EmotionsReference from './components/EmotionsReference';
import VerbReference from './components/VerbReference';
import GestureReference from './components/GestureReference';
import AdverbReference from './components/AdverbReference';
import MotionAPIReference from './components/MotionAPIReference';
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
// import SceneCanvas from './components/SceneCanvas';
// import { GALLERY_ITEMS } from './data/fog-gallery-code';

// function highlight — used by gallery (currently commented out)

const TABS = ['Verbs', 'Gestures', 'Adverbs', 'Emotions'];

const TabbedReferences = () => {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div className="fog-tabs">
      <div className="fog-tab-bar">
        {TABS.map((label, i) => (
          <button
            key={label}
            className={`fog-tab-btn${activeTab === i ? ' fog-tab-btn--active' : ''}`}
            onClick={() => setActiveTab(i)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="fog-tab-content">
        {activeTab === 0 && <VerbReference />}
        {activeTab === 1 && <GestureReference />}
        {activeTab === 2 && <AdverbReference />}
        {activeTab === 3 && <EmotionsReference />}
      </div>
    </div>
  );
};

const Bibliography = () => {
  const references = `@misc{fog2026,
  title={fog: Expressing Emotions and Social Dynamics through Function Composition of AI-Generated Code},
  author={First Last and First Last},
  year={2026},
}`;
  return (
    <div id="bibliography">
      <pre>{references}</pre>
    </div>
  );
};

const TldrModal = ({ onClose }) => (
  <div className="fog-modal-backdrop" onClick={onClose}>
    <div className="fog-modal" onClick={e => e.stopPropagation()}>
      <p className="fog-modal-label">tl;dr</p>
      <p className="fog-modal-text">Motion and emotion can be expressed through code functions spanning different levels of abstraction (from semantics to physics).</p>
      <button className="fog-modal-close" onClick={onClose}>×</button>
    </div>
  </div>
);

const FogProjectPage = () => {
  const heroRef = useRef(null);
  const [dims, setDims] = useState({ width: window.innerWidth, height: window.innerHeight * 0.5 });
  const [tldrOpen, setTldrOpen] = useState(false);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const obs = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setDims({ width, height });
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div>

      <div className="paper-container">
        <Navigation />
      </div>

      <div
        ref={heroRef}
        style={{ width: '100%', height: '50vh', border: '1px solid #e0e0e0', overflow: 'hidden' }}
      >
        <GaussianBlob width={dims.width} height={dims.height} dotSize={200} blur={22} />
      </div>

      <div className="paper-container">

        <h3 id="title">
          fog: Expressing Emotions and Social Dynamics through Function Composition of AI-Generated Code
        </h3>

        <h4 className="paper_authors">Vivian Liu Lydia Chilton</h4>
        <h4 className="paper_authors">Under Submission</h4>

        <div className="flex_row" style={{ justifyContent: 'center', gap: '1rem', margin: '1rem 0', width: '100%' }}>
          <div className="button"><a href="/fog/fog.pdf">Paper</a></div>
          <div className="button"><a href="https://drive.google.com/file/d/1Pi3-gIZsHo3nmtK9OiRdxABtkFh8UBwN/view?usp=sharing">Video</a></div>
          <div className="button"><a href="#">Code</a></div>
          <div className="button" onClick={() => setTldrOpen(true)} style={{ cursor: 'pointer' }}>tl;dr</div>
        </div>
        {tldrOpen && <TldrModal onClose={() => setTldrOpen(false)} />}

        <p className="paper_abstract">
          <strong>Abstract.</strong> Motion and emotion are core parts of intelligent, expressive behavior. In this paper, we introduce fog, a function composition framework for implementing and composing motion functions. We demonstrate how <em>fog</em> can be used to express social dynamics and emotions in Heider-Simmel-style animations. This code generation framework can help users generate functions for verbs, adverbs, gestures, and emotions to create an open-ended motion vocabulary. It is complemented by an animation editor that helps users refine motion through direct manipulation and dynamically generated UI. We evaluate our approach with a perceptual evaluation, where we test 452 fog-generated animations to see if people can recognize the semantic meaning of the motion. We find that fog's motion functions can be recognized at 68% accuracy on motion kinematics alone, a 2.68x improvement over a chance baseline. In a mixed-methods user study with professionals and novices, we show that fog in interface form can support users with more rapid iteration, exploration, and control.
        </p>


        {/* <p>
          Today, AI can create visual storytelling by generating video and animation. However the challenges of control with AI that have been extensively discussed in text and image only get harder with animation, where motion is dynamic across both space and time. For example, if a character is moving through a scene, it becomes hard for the user to describe exactly how fast or slow the character is going, what path they should take to get from A to B, and whether they want the motion to look hesitant, urgent, or soft. AI tools do not give users ways to easily explore and iterate on motion dynamics such as speed, force, easing, and timing.
        </p> */}




        <h3>Motion Vocabulary</h3>
        <LineDivider />
        <TabbedReferences />

        <h3>Motion API</h3>
        <LineDivider />
        <MotionAPIReference />

        <h3>Animation Engine</h3>
        <LineDivider />
        <div className="anim-engine-layout">
          <div className="anim-eq">
            <BlockMath math="x = \int v \, dt" />
            <BlockMath math="x(t + \Delta t) = x(t) + v \cdot \Delta t" />
          </div>
          <pre className="anim-engine-code api-snippet"><div className="api-snippet-header">physics.js — integrate</div><code>{`export function integrate(entity, deltaTime) {
  // cap to maxSpeed if set
  if (entity.maxSpeed < Infinity) {
    const s = entity.speed;
    if (s > entity.maxSpeed) {
      entity.vx *= entity.maxSpeed / s;
      entity.vy *= entity.maxSpeed / s;
    }
  }

  // Euler step: x = x + v · dt
  entity.x += entity.vx * deltaTime;
  entity.y += entity.vy * deltaTime;

  // rotate to face direction of travel
  if (entity.speed > 5 && !entity._lockOrientation) {
    const target = Math.atan2(entity.vy, entity.vx);
    let diff = target - entity.orientation;
    while (diff >  Math.PI) diff -= Math.PI * 2;
    while (diff < -Math.PI) diff += Math.PI * 2;
    entity.orientation += diff * 0.13;
  }
}`}</code></pre>
        </div>

        <h3>Motivation</h3>
        <LineDivider />
        <p className="paper_abstract">
          Motion is emotion without the 'e'. As people, we tend to interpret meaning, intentionality, and animacy from things that move. This has been well established in cognitive science. In 1944, Heider and Simmel [HeiderSimmel] ran a famous psychology experiment using an animation where three shapes played out a series of events. They found that even when the animation ran without sound or words, participants still described a story of love, joy, fight, and chase. This experiment showed that motion alone can narratively express emotions and social dynamics.

        </p>
        <p>

          We present <em>fog</em>, a function-composition framework that demonstrates how AI can implement Motion and Emotion classes to produce animation functions spanning <code>Verbs</code>, <code>Adverbs</code>, <code>Gestures</code>, and <code>Emotions</code>. In this framework, <code>Motion</code> is applied onto entities that accept function compositions manipulating their external and internal state. For example, entities can <code>chase</code> and avoid each other, instancing <code>Verbs</code> to create attraction and rejection in motion. <code>Adverbs</code> and <code>Emotions</code> can compose with these <code>verbs</code> to modify motion performance. Function composition is achieved by having abstract classes such as <code>Verbs</code> and <code>Adverbs</code> contract on channels like speed, acceleration, and easing. <em>fog</em> also supports <code>Gestures</code>, which add little units of socially meaningful motion on top of primary motion, like <code>waving</code> or <code>nodding</code>. Lastly, <em>fog</em> supports the expression of <code>Emotion</code> through motion. For example, <code>Anger</code> can be expressed in phases of motion as tremors (a build-up of internal turmoil), an aggressive lunge towards a wall (expression towards a target), and collision (recoil).

        </p>
                {/* <p>
          However, it is hard to animate emotion and social dynamics. Even simple moments are hard to get right. How do you make something look happy or sad? How do you represent conflict between two characters? These tensions are the fundamental challenges of storytelling, and this challenge of animating emotion and social dynamics through motion is the problem we address in this paper. Animation has previously explored this problem through the lens of character animation, puppet animation, physics-based animation, and so on. In this paper, we choose to look at Heider-Simmel animations, where stories are acted out by shapes. While these animations are simple and abstract in motion representation, they can help us understand what building blocks are necessary for spatial behavior to convey story.

        </p> */}
                <p>
          Our goal in this paper is to bridge the symbolic nature of storytelling with a numerical understanding of motion and to give people control with AI over both aspects. Our main insight is that there is a connection between motion and emotion – both reduce down to forces, energy, and states in time. We can capture the semantic dimensions of both motion and emotion in class-based abstractions, so AI can implement new instances and help users create an open-ended vocabulary of animation functions.

        </p>
          <p>

          
        <ul className="fog-contributions">
          <li><em>fog</em>, a function composition framework of abstract classes for motion and emotion. It introduces a generative vocabulary of functions spanning <code>Verbs</code>, <code>Adverbs</code>, <code>Gestures</code>, and <code>Emotions</code>.</li>
          <li>An animation editor that shows how users can 1) generate new motion functions on-the-fly, 2) compose functions into scenes and stories, and 3) use a suite of interaction techniques from prompts to direct manipulation controls for motion refinement.</li>
          <li>Perceptual evaluation testing 452 animations (spanning 32 verbs, 12 adverbs, 12 gestures, 12 emotions and their function compositions) to see if people can recognize the semantic meaning of <em>fog</em>-generated motion. We demonstrate that people can match the motion to the verb, adverb, gesture, or emotion at 68% accuracy, a 2.68x improvement over a chance baseline.</li>
          <li>Mixed-methods user study (n=10) with 6 professionals and 4 novices showing that <em>fog</em> enables more rapid iteration compared to a prompt-based baseline and provides support for user control and exploration.</li>
        </ul>
        </p>

        {/* <h3>Function Composition</h3>
        <LineDivider />
         */}


        {/* <h3>System Design</h3>
        <LineDivider />
        <p className="paper_abstract">
          [placeholder]
        </p>
        <FogABCompare adverbName="quickly" labelA="walk" labelB="walk + quickly" /> */}
        

        {/* <h3>User Evaluation</h3>
        <LineDivider />
        <p className="paper_abstract">
          [placeholder]
        </p> */}

        {/* <h3>Discussion</h3>
        <LineDivider />
        <p className="paper_abstract">
          [placeholder]
        </p> */}

        <h3>Results</h3>
        <LineDivider />
        <p className="paper_abstract">
          Methodology: Four alternative forced-choice task with crowdworkers testing the following sets of words:
        </p>
        <pre className="fog-eval-words"><code>{'Verbs (32):     idle, tremble, struggle, throb, flinch, shrink, wander, bounce,\n                walk, spiral, zigzag, pace, glide, dart, swoop, lunge,\n                follow, avoid, flee, cling, guard, watch, repel, hug,\n                chase, orbit, escort, mirror, weave, intercept, flank, leapfrog'}</code></pre>
        <pre className="fog-eval-words"><code>{'Adverbs (12):   slowly, quickly, suddenly, urgently, eagerly, forcefully,\n                hesitantly, nervously, lazily, erratically, gently, playfully'}</code></pre>
        <pre className="fog-eval-words"><code>{'Gestures (12):  nod, shake head, tilt, perk up, wave, clap, hands up, point,\n                dance, shrug, stretch, sag'}</code></pre>
        <pre className="fog-eval-words"><code>{'Emotions (12):  ecstatic, happy, surprise, awe, relaxed, tenderness,\n                anger, confusion, disgust, fear, boredom, sadness'}</code></pre>
        {/* <p className="paper_abstract">
          For a four-alternative forced-choice setup (4AFC), we needed to generate fair distractors to be the other multiple-choice answers. We did this by using an embedding-based approach. First, we computed embeddings for each word using all-MiniLM-L6-v2 from Sentence-BERT and created a pairwise distance table. We selected the two closest distractors from within-category and one distractor from outside the category. For example, if we were evaluating an emotion like ecstatic, happy and surprise could be within-category (positive valence) distractors while fear would be an out-category distractor (negative valence). We then generated a fog implementation for each stimulus word in batch with factory generation scripts for each class. Each class implementation was done with Claude Opus, with max tokens at 12,000 and a thinking budget of 10,000 tokens. The prompt was the abstract class definitions and minimal guidelines (e.g. no imports, speed ranges to anchor it in what values were fast or slow). We did not pass in few-shot examples.
        </p>
        <p className="paper_abstract">
          Next, we conducted our crowdworking study on CloudResearch Connect. On a web page showing four animations, each crowdworker was asked to judge which of the four choices best fit the motion expressed within the animation. For example, if the circle was approaching another character fast, was the verb follow, fight, avoid, or cling? If the circle was moving slowly towards the bottom of the screen and shrinking slightly in scale, was the emotion fear, sadness, anger, or surprise? This 4AFC setup meant our baseline was chance (guessing) at 25%. Each crowdworker rated all the stimulus words for the dimension, meaning they went through all 12 of the adverbs, gestures, and emotions, or all 32 of the verbs. The median time for this experiment ranged from 2.30 min (Gestures) to 4.25 min (Verbs), including the time taken to do two practice trials. We did a post hoc inspection of crowdworkers to flag for 1) outlier time taken 2) low accuracy below chance, and 3) position bias (always clicking the same answer). For each stimulus word, we had 10 people judge the animation and make a choice. Participants were paid $0.75 for a 3 min task, which maps to a $15/hr wage.
        </p> */}
        <figure className="fog-table-figure">
          <table className="fog-table">
            <caption>Recognition of Motion Function Composition in 4 Alternatives Forced Choice Task</caption>
            <thead>
              <tr>
                <th>Dimension</th>
                <th>N (stimuli × judgments)</th>
                <th>Accuracy (%)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Verbs</td><td>320 (32×10)</td><td>77.7</td></tr>
              <tr><td>Adverbs</td><td>120 (12×10)</td><td>62.5</td></tr>
              <tr><td>Gesture</td><td>120 (12×10)</td><td>78.0</td></tr>
              <tr><td>Emotion</td><td>120 (12×10)</td><td>64.2</td></tr>
              <tr><td>Adverb + Verb</td><td>192 (8×8×3)</td><td>58.3</td></tr>
              <tr><td>Gesture + Verb</td><td>192 (8×8×3)</td><td>69.8</td></tr>
              <tr><td>Emotion + Verb</td><td>192 (8×8×3)</td><td>57.8</td></tr>
              <tr className="fog-table-total"><td>Overall</td><td>1256 (260 stimuli)</td><td>67.8</td></tr>
            </tbody>
          </table>
        </figure>
        {/* <p className="paper_abstract"><em>Circle- and triangle-land is not Hollywood.</em></p>

        <h3>Gallery</h3>
        <LineDivider />
        <div className="fog-gallery">
          {GALLERY_ITEMS.map((item, i) => (
            <div key={item.img || i} className="fog-gallery-card">
              {item.scene ? <SceneCanvas scene={item.scene} /> : item.img && <img src={item.img} alt={item.alt} />}
              <pre className="card-impl"><code>{highlight(item.code)}</code></pre>
            </div>
          ))}
        </div> */}

        {/* <h3>Findings</h3>
        <LineDivider /> */}


        <h3>Citation</h3>
        <LineDivider />
        <Bibliography />

      </div>
    </div>
  );
};

export default FogProjectPage;
