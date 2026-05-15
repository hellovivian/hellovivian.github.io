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

const FogProjectPage = () => {
  const heroRef = useRef(null);
  const [dims, setDims] = useState({ width: window.innerWidth, height: window.innerHeight * 0.5 });

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

        <h4 className="paper_authors">Vivian Liu, Lydia Chilton</h4>
        <h4 className="paper_authors">Under Submission</h4>

        <div className="flex_row" style={{ justifyContent: 'center', gap: '1rem', margin: '1rem 0' }}>
          <div className="button"><a href="#">Paper</a></div>
          <div className="button"><a href="#">Video</a></div>
          <div className="button"><a href="#">Code</a></div>
        </div>

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

        <h3>Motivation</h3>
        <LineDivider />
        <p className="paper_abstract">
          Motion is emotion without the 'e'. As people, we tend to interpret meaning, intentionality, and animacy from things that move. This has been well established in cognitive science. In 1944, Heider and Simmel [HeiderSimmel] ran a famous psychology experiment using an animation where three shapes played out a series of events. They found that even when the animation ran without sound or words, participants still described a story of love, joy, fight, and chase. This experiment showed that motion alone can narratively express emotions and social dynamics.

        </p>
        <p>

          We present <em>fog</em>, a function-composition framework that demonstrates how AI can implement |Motion| and |Emotion| classes to produce animation functions spanning |Verbs|, |Adverbs|, |Gestures|, and |Emotions|. In this framework, |Motion| is applied onto entities that accept function compositions manipulating their external and internal state. For example, entities can |chase| and |avoid| each other, instancing |Verbs| to create attraction and rejection in motion. |Adverbs| and |Emotions| can compose with these |verbs| to modify motion performance. Function composition is achieved by having abstract classes such as |Verbs| and |Adverbs| contract on channels like speed, acceleration, and easing. <em>fog</em> also supports |Gestures|, which add little units of socially meaningful motion on top of primary motion, like |waving| or |nodding|. Lastly, <em>fog</em> supports the expression of |Emotion| through motion. For example, |Anger| can be expressed in phases of motion as tremors (a build-up of internal turmoil), an aggressive lunge towards a wall (expression towards a target), and collision (recoil).

        </p>
                {/* <p>
          However, it is hard to animate emotion and social dynamics. Even simple moments are hard to get right. How do you make something look happy or sad? How do you represent conflict between two characters? These tensions are the fundamental challenges of storytelling, and this challenge of animating emotion and social dynamics through motion is the problem we address in this paper. Animation has previously explored this problem through the lens of character animation, puppet animation, physics-based animation, and so on. In this paper, we choose to look at Heider-Simmel animations, where stories are acted out by shapes. While these animations are simple and abstract in motion representation, they can help us understand what building blocks are necessary for spatial behavior to convey story.

        </p> */}
                <p>
          Our goal in this paper is to bridge the symbolic nature of storytelling with a numerical understanding of motion and to give people control with AI over both aspects. Our main insight is that there is a connection between motion and emotion – both reduce down to forces, energy, and states in time. We can capture the semantic dimensions of both motion and emotion in class-based abstractions, so AI can implement new instances and help users create an open-ended vocabulary of animation functions.

        </p>


        <h3>System Design</h3>
        <LineDivider />
        <p className="paper_abstract">
          [placeholder]
        </p>

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

        <h3>Citation</h3>
        <LineDivider />
        <Bibliography />

      </div>
    </div>
  );
};

export default FogProjectPage;
