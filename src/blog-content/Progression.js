// A flat, top-to-bottom look at how Eye Diary changed over a year of iterations.
// Six representative moments — not every screen — each framed as a little browser
// window. Drop <Progression /> into a post; edit STEPS / the intro copy freely.
import logger from './images/progression/01-logger.webp';
import dashboard from './images/progression/02-dashboard.webp';
import entries from './images/progression/03-entries.webp';
import conversation from './images/progression/04-conversation.webp';
import hypothesis from './images/progression/05-hypothesis.webp';
import eyescan from './images/progression/06-eyescan.webp';

const STEPS = [
  {
    img: logger, w: 1280, h: 1316, tag: 'Oct 2025',
    title: 'It started as a spreadsheet',
    caption:
      'A dense table: type what happened, then tag severity, sleep, stressors, meds. ' +
      'Capable — but logging felt like data entry.',
  },
  {
    img: dashboard, w: 1280, h: 924, tag: 'Feb 2026',
    title: 'Then a dashboard',
    caption:
      'The table gave way to a glass dashboard — a greeting, your totals and severity ' +
      'at a glance, and charts that surfaced patterns instead of rows.',
  },
  {
    img: entries, w: 1280, h: 724, tag: 'Jul 2026',
    title: 'Entries you can read — and place',
    caption:
      'Logs became a scannable timeline with severity gems, and a Paint Location mode ' +
      'to mark where a symptom actually happened.',
  },
  {
    img: conversation, w: 1280, h: 800, tag: 'Nov 2026',
    title: 'The whole thing became a conversation',
    caption:
      'Home collapsed to a single line. Say what happened and pick what it should do — ' +
      'Log, Chat, or Search — and the diary answers.',
  },
  {
    img: hypothesis, w: 1280, h: 910, tag: 'Now',
    title: 'Questions become real statistics',
    caption:
      'Ask “is my severity worse on low-sleep days?” and the agent writes an actual ' +
      'statistical test that runs on your device — on aggregates, never your raw entries.',
  },
  {
    img: eyescan, w: 1280, h: 1102, tag: 'Now',
    title: 'And it started measuring the eye itself',
    caption:
      'Record a few seconds and MediaPipe tracks eye-opening over time — blinks, ' +
      'left/right asymmetry, mean openness — entirely in the browser.',
  },
];

export default function Progression() {
  return (
    <>
 
      <p>
        A while back (late summer of 2025), I started working on a health tracking tool. I've written about it before in past blog posts. I'll mention a few things I experimented with, before writing about a feature I've implemented that I'm excited about (hypothesis testing).
      </p>

      {/* <h4> Iteration and Experimentation </h4> */}


      <p>In earlier iterations, the application was a simple CRUD (create-read-update-delete) app. But I thought this wasn't very current or experimental, so I force-added a chat feature. Because that is so original right (/sarcasm)? However, chat interfaces are a nice playground right now for generative user interfaces.</p>

      <p>In some respects, the chat feature was tricky, because the data that my app deals with is wellness data (sleep, stress, severity on a scale of 1-10). While it's not clinical data or medical records, I didn't want to pass all of that through frontier models. Especially if the value-add was small, like having Claude make a tool call to create a new entry. So at first, I experimented with local models and embeddings. I also explored training a custom on-device classifier, so it could classify the user request coming through chat. In the end, I realized the low-tech, GUI option was best: have some UI chips at the front to set the mode and nature of the request. I think this interaction pattern is one that Cursor got right early on.</p>

      <img width="80%" src="./blogpost_images/hypothesis_testing/eyediary_composer_modes.png"></img>


      <p>Another thing I tried experimenting with was 1) optical flow and 2) MediaPipe keypoints. Optical flow was a direction I quickly went in on and quickly U-turned from. I was asking AI to implement it, but the results kept looking like garbage / noisy tracking. I didn't have the expertise or energy to invest going further on it. However, I felt really excited about the MediaPipe effort. I was able to fewshot a computer vision pipeline I worked on many times before in undergrad / grad school in no time.  </p>

      <p>The thing that excites me the most out of all the things I have tried the past few months is a <strong>hypothesis testing</strong> feature. This is a bit ironic to me, because usually when I am doing an evaluation for science, finding statistical significance in the data is hard. But here I am trying to apply it to my own noisy life data. After I had collected around 200 datapoints, I knew I could run statistical tests (t-tests). Put more plainly, I could ask questions like "Is my health better when I am in New York or when I am in San Francisco?". How this works in the app is that the agent generates some code, sends it over to the browser for analysis to happen. The agent then receives that data in aggregate, so the original data is kept away from it. It's got some privacy designed into it, though it's a work in progress.</p>

       <img width="80%" src="./blogpost_images/hypothesis_testing/hypothesis_test_wide.png"></img>


      <p>I enjoy showing this app to my friends. It's a small passion project, but I like it because it's my exercise in solving a painpoint. A lot of my friends relate too -- everyone has something wonky about their body, whether its headaches or jaw tension or what have you. </p>

      <p>But there was a time I got some pushback when I showed it to a stranger at a conference. We had sat down by chance during a morning coffee break. They mentioned how much they didn't like self-tracking and the whole direction of the quantified self. They said, "do I really need to know how much I or my friend walked or biked? When do you look at that data anyways?" I certainly understood their point.  am not often sifting through old entries, though I have certainly had use for them. Additionally, while the hypothesis testing feature I implemented is technically charming to me, I know I'm not likely to ever get a statistically significant result from it, whereas I would tell a clinician exactly what I think my triggers are. All those insights have come more from the process of actively reflecting with my little app.</p>

      <p>I'm actually really excited to bring a PDF of this to my doctor's visit and see how it goes. :p</p>

      {/* {STEPS.map((s, i) => (
        <div key={i}>
          <p style={{fontSize: '0.85em', color: '#666'}}>{s.tag}</p>
          <p><strong>{s.title}</strong></p>
          <p>{s.caption}</p>
          <img
            src={s.img}
            width={s.w}
            height={s.h}
            alt={`${s.tag} — ${s.title}`}
            loading="lazy"
            decoding="async"
            style={{maxWidth: '100%'}}
          />
        </div>
      ))} */}
    </>
  );
}
