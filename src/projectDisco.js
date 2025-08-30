// projectDisco.js

import React from 'react';
import './Disco.css';
import Navigation from './components/Navigation';
import SphereBanner from './components/SphereBanner';
import './App.css';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import Video from './components/Video';
import LineDivider from './components/LineDivider';


const Bibliography = () => {
    const references = `
    @inproceedings{inproceedings,
author = {Liu, Vivian and Long, Tao and Ma, Jenny and Raw, Nathan and Yang, Jiaxin and Tang, Claudia and Wang, Lulu and Yang, Yumo and Chilton, Lydia},
year = {2025},
month = {01},
pages = {},
title = {Digital "Double Hatters": Augmenting Audiovisual Creative Work with a Generative Text-to-Video Workflow},
doi = {10.24251/HICSS.2025.323}
}
  
    `;
    return (
      <div id="bibliography">
        <pre>{references}</pre>
      </div>
    );
  };

const responsive = {
    0: { items: 1 },
    256: { items: 2 },
    512: { items: 3 },
    768: { items: 4 },
    1024: { items: 5 },
};

const items = [

    <div className="item" data-value="1">

        <Video className='videoCard' song="One More Time" artist='Daft Punk' url="./disco_videos/daftpunk.m4v"/>
        
    </div>,
    <div className="item" data-value="2">
        <Video className='videoCard' song="Last Carnival" artist='Norihiro Tsuru' url="./disco_videos/lastcarnival.mp4"/>
    </div>,
    <div className="item" data-value="3">
        <Video className='videoCard' song="Clair de Lune" artist='Debussy' url="./disco_videos/AIArt2.mp4"/>
    </div>,
    <div className="item" data-value="4">
        <Video className='videoCard' song="Creep" artist='Radiohead' url="./disco_videos/creep_done.m4v"/>
    </div>,
    <div className="item" data-value="5">
        <Video className='videoCard' song="Dark Horse" artist='Katy Perry' url="./disco_videos/darkhorse.m4v"/>
    </div>,
    <div className="item" data-value="6">
    <Video className='videoCard' song="Fighting Gravity " artist='Of Mice and Men' url="./disco_videos/fightinggravity.m4v"/>
    </div>,
        <div className="item" data-value="7">
        <Video className='videoCard' song="Temple of Time" artist='Soulrez' url="./disco_videos/soulrez.mp4"/>
    </div>,
     <div className="item" data-value="8">
     <Video className='videoCard' song="Cowgirl Remix" artist='Anon Artist' url="./disco_videos/stitched_output.m4v"/>
     </div>,
         <div className="item" data-value="9">
     <Video className='videoCard' song="Empire State of Mind" artist='Alicia Keys ft. Jay-Z' url=" ./disco_videos/nyc.mp4"/>
     </div>,
      <div className="item" data-value="10">
     <Video className='videoCard' song="Lucky Ones" artist='Lana Del Rey' url="./disco_videos/lucky_ones.mp4"/>
     </div>,
    <div className="item" data-value="11">
    <Video className='videoCard' song="Nights" artist='Avicii' url="./disco_videos/stitched_nights.m4v"/>
    </div>,
        <div className="item" data-value="12">
        <Video className='videoCard' song="Yerb" artist='Anon Artist' url="./disco_videos/yerb.m4v"/>
        </div>,
         <div className="item" data-value="13">
     <Video className='videoCard' song="Lucky Ones" artist='Lana Del Rey' url="./disco_videos/lana.mp4"/>
     </div>,
         // <div className="item" data-value="1">

    //     <Video className='videoCard' song="Beauty and a Beat" artist='Justin Bieber' url="./disco_videos/AIArt1.mp4"/>
    
    //  </div>,
    

       
        

];



const Carousel = () => (

    
    <AliceCarousel
        mouseTracking
        items={items}
        responsive={responsive}
        controlsStrategy="alternate"
    />
);

const DiscoProjectPage = () => {
  return (
    
    <div className="paper-container">
        
     <Navigation />
     
      <h3 >Digital "Double Hatters": Augmenting Audiovisual Creative Work with a Generative Text-to-Video Workflow</h3>
      <h4 class="paper_authors">Vivian Liu, Tao Long, Jenny Ma, Nathan Raw, Jiaxin Yang, Claudia Tang, Lulu Wang, Yumo Yang, Lydia Chilton</h4> <br></br>
      <h4>HICSS 2025</h4>
      {/* <SphereBanner /> */}
      <img class="centered" src="./images/disco/disco_banner.gif"></img>
   

      <p>Generative AI is transforming work for creative professionals. Text-to-image and text-to-video tools provide alternative methods for visual content creation, circumventing the traditional workflows creative professionals have developed. This transformation raises the pressing question of whether these new generative workflows will augment or supplant creative work. To investigate this question, we introduce Generative Disco, a text-to-video system for music visualization, and use it as a technology probe for creative professionals who freelance audiovisual work. In a mixed-methods study (n=12), we observe that professionals found Generative Disco easy to use, highly expressive, and capable of supporting many professional use cases. Its generative workflow enabled professionals to become digital "double hatters", expanding their creative range into adjacent domains. We conclude on how creatives can benefit from this new means of skill mobility.</p>

      <h3>
        Motivation
      </h3>
      <LineDivider />
      

        <p >
        Generative AI has changed the landscape of creative work. A group of people who are directly impacted are freelance creatives and independent artists. Previously, clients would seek these creative professionals in talent marketplaces for jobs involving design, video, and content creation work. Creative professionals would be hired based off of their skills, clients would hand professionals concepts to fulfill, and they would work together towards a desired outcome.
      </p>



          <img class="paper_figure" src="./images/disco/motivation2.png"></img>
          
          
          <p>
        Generative AI has disrupted this traditional exchange of creative work by presenting people with powerful new tools for content creation. Text-to-image and text-to-video models allow users to write prompts to generate images and video that can express a near infinite range of visual concepts [<a href="https://openai.com/index/dall-e-2/">1</a>,<a href="https://openai.com/sora/">2</a>]. These workflows are generally simple and declarative, and they present alternatives to the steep skill verticals associated with traditional tools like Photoshop or Premiere. These “low floor, high ceilings” advantages have led to the rapid adoption of tools such as DALL-E and Midjourney and the emergence of AI-generated content on social media.

      </p>

      {/* <div class="flex_row">
        <img class="trifold_img" src="./images/disco/cat_cooking.gif"></img>
        <img class="trifold_img" src="https://plugins-media.makeupar.com/smb/blog/post/2023-11-01/c9f504f9-649b-47cd-b006-32b0443c1831.gif"></img>
      </div>

       */}

      

      <p>
        Another driving force behind the adoption of generative AI is the neverending demand for visual content. To visually represent the different things we create and disseminate on media platforms, we need art. When a song is released, it has to be accompanied by album art, music videos, and visualizers. When news is published or books are released, they have to be paired with news illustrations and book covers <a href="/#/opal">[Opal]</a>. Generative methods provide people with efficient and personalizable means to do so but raise the question if such methods will augment or displace creative work <a href="https://arxiv.org/pdf/2303.10130">[3]</a>. 
      </p>

      <p>
        We explore how these new generative workflows can impact creative professionals who freelance audiovisual work. To focus our scope, we study how music and video professionals engage with a text-to-video workflow for music visualization. We choose music visualization, because it is a richly multimodal task fusing music and video that is representative of the complex projects creative professionals are tasked with. Music visualization is an activity that is core to social media --- people create content around viral songs and sounds, and a niche of AI-generated content consisting of generated music videos and dance animations has emerged on platforms like TikTok. 
      </p>

      <p>
        For this task, we introduce Generative Disco, a text-to-video workflow we built for music visualization. The tool presents an interactive pipeline incorporating large language model assistance, text-to-image generation, and text-to-video generation to help users take a music file as input and produce an animated music video as output. The tool introduces design patterns called transition shots and hold shots that users can interactively apply to scaffold the construction of text-to-video narratives.
         {/* An example music visualization from the tool is shown in Fig. \ref{fig:waveform}. */}
      </p>

      <p>
        We conducted a first-use user study with video and music professionals (n=12) who tried Disco and compared and contrasted its generative workflow with their own expert ones. We present qualitative findings showing that generative workflows enable audiovisual professionals to be digital “double hatters” by allowing them to augment their skillsets and expand their creative range into adjacent domains. Music professionals were empowered to visually represent their work and concretely convey the vibes and visuals carried within music. Video professionals could extend their range into visual spaces that were previously outside of their usual technical capabilities, such as stylized animation and morphing. We additionally report use cases professionals described of how they could use AI to overcome time and resource constraints and also quantify the perceived usefulness and ease of use of the generative workflow. We conclude by discussing how digital double hatting can enable horizontal expansion across domains and the implications of such skill mobility for creatives.
      </p>

      <h3>Background</h3>
      <LineDivider />
      <p><strong>AI Impacts on the Creative Workforce. </strong> Creative work is often done by freelancers and artists who take on high-skill content creation work such as design and video editing. These are independent, self-employed workforces that often work under tight timeframes for variable compensation and without the support structure of a team. Studies of freelancers have shown that they are over two times more likely to use generative AI in their workflows than non-freelancers <a href="https://www.upwork.com/research/freelance-forward-2023-research-report">[Upwork]</a>. When creative professionals connect to clients through gig work platforms, they often have to operate within a reputation economy (e.g. five star system) and are rated after jobs for their skills, delivery, and communication <a href="https://doi.org/10.1287/mksc.2013.0809">[src]</a>. Such evaluations can add pressure and strain worker autonomy. Creative professionals on platforms such as Upwork also have the option to offer full-service packages (e.g. creating an explainer video or an animated logo), which can put often put creative professionals in situations where they handle the end-to-end delivery of a creative product alone.</p>

      <p>
        Many of the industries and occupational tasks traditionally open to independent work have been suggested to have high exposure to generative AI. For example, Eloundou et. al. conduct an analysis studying exposure across O*NET occupational skills and find that programming and writing are the skills most positively correlated with exposure. Upwork <a href="https://www.upwork.com/research/freelance-forward-2023-research-report">[src]</a> empirically corroborates this, identifying research, translation, brainstorming, writing, and coding as points where freelancers turn to generative AI. A longitudinal deployment of a generative writing support tool found that technical experts do benefit from the efficiency gains of an AI tool beyond a novelty effect <a href="https://doi.org/10.1145/3643834.3661587">[src]</a>. In a large-scale deployment of AI assistance for customer support agents, Brynjolfsson et. al.  <a href="http://www.nber.org/papers/w31161">[src]</a> found that AI can improve productivity and even the skill curve between workers by surfacing the tacit knowledge of the most productive workers to help the less experienced ones.
      </p>

      <p><strong>AI for Content Creation on Social Media. </strong>Creative work often targets publication on social media. An estimated one quarter of freelance work is targeted for social media platforms such as Youtube, TikTok, and Instagram <a href="https://www.upwork.com/research/freelance-forward-2023-research-report">[src]</a>. Shortform video is a predominant format on these platforms, and its creation process can often be a high-production effort to create involving scripts, music, voiceover, footage, and effects. In a study of Youtuber use of generative AI in videos, Lyu et. al. <a href="http://dx.doi.org/10.1145/3613905.3651057">[src]</a> found that creators were utilizing generative AI at each touchpoint of their creative process: ideating new video topics, drafting scripts, generating assets, upscaling existing content, and automating voiceovers. Bruns et. al. <a href="https://www.sciencedirect.com/science/article/pii/S0969698924000869">[src]</a> also found that generative AI has disrupted the marketing content creation process for brands and influencers and has been attenuating how consumers perceive brand authenticity on social media.</p>

      {/* <p>Generative methods provide people with efficient and personalizable means to create content so but raise the question if such methods will augment or displace creative work. We explore how these new generative workflows can impact creative professionals who freelance audiovisual work. To focus our scope, we study how music and video professionals engage with a text-to-video workflow for music visualization. </p> */}

      {/* <p>
      For this task, we introduce Generative Disco, a text-to-video workflow we built for music visualization. The tool presents an interactive pipeline incorporating large language model assistance, text-to-image generation, and text-to-video generation to help users take a music file as input and produce an animated music video as output. The tool introduces design patterns called transitions and holds that users can interactively apply to scaffold the construction of text-to-video narratives. 
      </p> */}

      {/* <h3>
        Abstract
      </h3>
      <LineDivider />

      <p class="paper_abstract">
    <strong class="pink"> Abstract. </strong> Visuals can enhance our experience of music, owing to the way they can amplify the emotions and messages conveyed within it. However, creating music visualization is a complex, time-consuming, and resource-intensive process. We introduce Generative Disco, a generative AI system that helps generate music visualizations with large language models and text-to-video generation. The system helps users visualize music in intervals by finding prompts to describe the images that intervals start and end on and interpolating between them to the beat of the music. We introduce design patterns for improving these generated videos: transitions, which express shifts in color, time, subject, or style, and holds, which help focus the video on subjects. A study with professionals showed that transitions and holds were a highly expressive framework that enabled them to build coherent visual narratives. We conclude on the generalizability of these patterns and the potential of generated video for creative professionals.

    <br></br> */}

{/* 
    <h3>
        Formative Work
    </h3>
    <LineDivider />


      <img class="paper_figure disco_figure" src="./images/disco/fig_patterns_tgt.jpg" />

     */}
    <h3>
    System: Generative Disco
    </h3><LineDivider />
    <p>To explore a multimodal AI workflow for creative professionals engaged in content creation, we built Generative Disco, a text-to-video tool for music visualization that is illustrated above. It takes music in as input and generates music visualization in the form of shortform video as output. Its guiding design principles are to help users express music by 1) supporting simple prompt-based interactions, 2) structuring the creation of a text-to-video narrative, 3) helping users brainstorm visuals to interpolate into video, and 4) generating videos that have open-ended artistic possibilities. </p>
 
    <img class="paper_figure disco_figure" src="./images/disco/fig_systemdesign_0915.jpg">
    </img>

  <p><strong>Input Music and Interactive Segmentation. </strong>

  The system begins by taking a music file input and representing it within the interface as a waveform (A). Users interactively choose how they would like to segment the music by adding intervals and editing the time boundaries delineating intervals. The waveform illustrates the music's structure and helps highlight volume dynamics, lyric boundaries, and other musical elements.  


    </p>

    <p><strong>LLM-Based Prompt Ideation. </strong> 
    To generate video for a music segment, users have to define prompts for images to START and END intervals on (C). To streamline the prompting process  we provide a BRAINSTORMING AREA (D) which incorporates large language model assistance. Users provide goals for specific intervals (B) and GPT-4 returns relevant visual subjects. Below the subject suggestions, Disco also provides a palette of style keywords that can add aesthetic specificity to the prompt. 
    </p>

    <p><strong>Text-to-Image Visual Brainstorming. </strong>
Generating a prompt generates a set of images from Stable Diffusion. Generations that users liked could be dragged to the interval START and END images for each interval to keyframe the text-to-video generation. Users could also create variations of generations (F), which would regenerate images with automatically modified parameters (e.g. prompt with shuffled phrases, different seed hyperparameters). Disco's visual brainstorming features allow users to work on filling out the music at a high-level and prototype different visual narratives.
    </p>

    <p><strong>Generating Text-to-Video Intervals. </strong>Once a user chooses a pair of START and END images, a music visualization clip can be generated by interpolating between them to the intensity and beat of the music. The interpolation is implemented by interpolating between the text embeddings of their associated prompts and noise latents. The audioreactivity is implemented by taking a beat-based analysis (harmonic percussive source separation) of the input music. Both capabilities are enabled by the open-source repository Stable Diffusion Videos <a href="https://github.com/nateraw/stable-diffusion-videos">[src]</a>. Frames were collected together at 24 fps.</p>

    <p><strong>Output Video. </strong>Generated intervals (G) are stitched together using the 'STITCH VIDEO' button. The final output video is placed at the top right of the interface in the VIDEO AREA (H). 
</p>

<p><strong>Text-to-Video Design Patterns. </strong>A challenge unique to text-to-video is that when generated videos are not conditioned on base images or video, they lack the intuitive physics and temporal constraints we expect from real video. In Disco, we choose to guide the generation with only text prompts and not with initial image or video prompts. This way, the text-to-video outputs would not constrained by what is expected from reality or existing media and have the same open-sky possibilities allowed in art.
 
</p>
<p>We provide two design patterns, transitions and holds, to help structure text-to-video narratives. Generated video has to have the right amount of visual interest: it should not be as still as a slideshow but it should also not be a video of nonstop change. <em>Hold shots</em> are a way to help focus the video on specific shots, highlighting subjects of interest. In contrast, <em>transition shots</em> drive visual change, moving the narrative from subject to subject and shifting the color palette and style aesthetic to reflect the energy and emotions latent in music. 
 </p>
 <p>Disco supported these design patterns by surfacing images suitable for implementing them. Holds could be implemented by parameterizing start and end frames of intervals with images that were highly similar (e.g. variations of one another). Transitions could be implemented by using the subject and style suggestion features to find pairs of images that had larger semantic and visual distances between them. Users could interactively apply a combination of holds and transitions to create a visual cadence that is acceptable to the human eye.</p>
   
    {/* <p>
    The system begins by taking a music file input and representing it within the interface as a waveform (A).  The waveform illustrates the music's structure and helps highlight volume dynamics, lyric boundaries, and other musical elements.  To find prompts that will define the start and end of intervals (C), users can brainstorm prompts using suggestions from GPT-4 (B, D) and explore text-to-image generations (E, I). Results users like can be dragged and dropped into the start and end areas (C), after which a text-to-video interval can be generated. These show in the Tracks (G) and can be stitched into a video placed in the Video Area (H).
    </p> */}

       <p class="note"> Note that this system was built Feb 2023-April 2023, a year before the announcement of Sora and other technological advances that came after. The frame-to-frame interface design pattern Disco introduced to increase user control has been seen also implemented in Google Deepmind's Flow Studio and Veo2, showing that it was a valid and forward-thinking design decision. </p>

    

    <h3>Evaluation</h3>
    <LineDivider />

    <p>
      We conducted a mixed methods study, where 12 video and music experts were brought in to field test Generative Disco and compare its generative workflow against their expertise. This evaluation centered around the following research questions. 

      <ul>
      <li><strong>RQ1. </strong> To what extent do freelancers find Generative Disco useful and usable? 
      </li>
      <li><strong>RQ2. </strong>How does Generative Disco impact the skillsets of creative professionals--does such a tool augment their skillset or supplant it? </li>
      <li><strong>RQ3. </strong> What is the expressive range of Generative Disco as a generative framework: what does it succeed at visualizing and what are its failure modes?</li>
    </ul>
    </p>

    
    <p>
    
   <strong> Participants. </strong>Our participants were recruited from 1) Upwork, a platform for freelancers, where we reached out to creatives with professional video or music experience 2) independent musicians from a local computer music organization.  Participants were paid $40 per hour for their time, and the study was conducted for 2 hours. Twelve people (6 male, 4 female, 2 non-binary) participated. The experimental IRB protocol was approved by the institution.  </p>

<table>
  <caption><strong>Table.</strong> Participant details: background, engagement with video work, years of experience in music or video, exposure to generative AI, and genre of music for task.</caption>
  <thead>
    <tr>
      <th>ID</th>
      <th>Background</th>
      <th>Video Freq</th>
      <th>Yrs Exp</th>
      <th>AI-Art Freq</th>
      <th>Genre</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>P1</td>
      <td>Video Pro, Lyric Videos</td>
      <td>Daily</td>
      <td>7</td>
      <td>Never</td>
      <td>Metalcore</td>
    </tr>
    <tr>
      <td>P2</td>
      <td>Video Pro, VJ</td>
      <td>Daily</td>
      <td>14</td>
      <td>Never</td>
      <td>Original Composition</td>
    </tr>
    <tr>
      <td>P3</td>
      <td>Video Pro</td>
      <td>Daily</td>
      <td>3</td>
      <td>Weekly</td>
      <td>Pop</td>
    </tr>
    <tr>
      <td>P4</td>
      <td>Video Pro, live production, VJ</td>
      <td>Weekly</td>
      <td>15</td>
      <td>Weekly</td>
      <td>Funk Rock</td>
    </tr>
    <tr>
      <td>P5</td>
      <td>Video Pro, Sound Design</td>
      <td>Daily</td>
      <td>5</td>
      <td>Never</td>
      <td>Alternative Indie</td>
    </tr>
    <tr>
      <td>P6</td>
      <td>Music Expert</td>
      <td>Yearly</td>
      <td>4</td>
      <td>Yearly</td>
      <td>Acoustic</td>
    </tr>
    <tr>
      <td>P7</td>
      <td>Music Expert, Classical + Digital</td>
      <td>Monthly</td>
      <td>5</td>
      <td>Never</td>
      <td>Hard Rock / Remix</td>
    </tr>
    <tr>
      <td>P8</td>
      <td>Music Expert, Acoustics + Production</td>
      <td>Weekly</td>
      <td>8</td>
      <td>Monthly</td>
      <td>Original Composition</td>
    </tr>
    <tr>
      <td>P9</td>
      <td>Music Expert, Video Pro</td>
      <td>Yearly</td>
      <td>10</td>
      <td>Monthly</td>
      <td>Dance / Electronic</td>
    </tr>
    <tr>
      <td>P10</td>
      <td>Video Pro, Music Videos</td>
      <td>Monthly</td>
      <td>10</td>
      <td>Weekly</td>
      <td>Locked Groove</td>
    </tr>
    <tr>
      <td>P11</td>
      <td>Video Pro</td>
      <td>Daily</td>
      <td>6</td>
      <td>Weekly</td>
      <td>Afrobeats / Pop</td>
    </tr>
    <tr>
      <td>P12</td>
      <td>Music Expert</td>
      <td>Yearly</td>
      <td>20</td>
      <td>Never</td>
      <td>Original Vocals / Rock</td>
    </tr>
  </tbody>
</table>

<p>Participants were first interviewed about their creative expertise and traditional workflows for video editing. They were also asked about their exposure to generative AI. Seven participants had exposure to generative AI tools such as ChatGPT and had used it professionally. Participants described using it to generate royalties agreements with clients (P12), write routines that mixed and mastered their original music (P10), and write video scripts for their clients (P3). P8 and P3 had both posted their own music online with text-to-image generations as cover art.</p>
    

    <p> <strong>Experimental Protocol. </strong>
      After a brief interview about their professional experience, an experimenter explained concepts behind Generative Disco through a slide deck that gave them a primer about text-to-image generation, prompts, and hyperparameters (seeds). Afterwards, an experimenter demonstrated how to brainstorm prompts, generate images, and choose images to start and end intervals on the interface. Participants were then given a training task to playtest the design patterns of transition shots and hold shots by generating them for a provided song. This helped them familiarize themselves with the kinds of outputs the system could generate.

Participant backgrounds are described in the Table above. Prior to the experiment, participants had selected a song of their choice and sent a short 10-15 second music clip. The experimental task was to generate music visualization for this clip. After completing the open-ended experimental task, participants filled out a post-study questionnaire and were interviewed about their experience.  All text-to-video intervals and associated prompt pairs were also collected for analysis.

    </p>


    <h3>Quantitative Feedback</h3>
    <LineDivider/>
    <p>To answer RQ1, we first report quantitative metrics on Generative Disco's usefulness and ease of use. </p>
    <div class="flex_row">
      <img class="quantitative-feedback-image" src="./images/disco/disco_hiccs_quant.jpg" />

      <div class="quantitative-feedback-text">
        <p><strong>Workflow-Specific Questions. </strong>
       The majority (7 of 12) rated the system positively for how closely it allowed them to engage with the music (median: 5). Nine of 12 rated the system positively for audiovisual alignment (<em>"The system helped me come up with visuals that aligned with the music."</em>, median: 5). Eleven of 12 participants were positive about the helpfulness of GPT-4 subject brainstorming (median: 5.5). Nine of 12 participants were positive that the style keyword brainstorming area was helpful (median: 5.5). When asked if Generative Disco would be a useful addition to their current video / music workflow, 9 of 12 participants responded positively for agreement (median: 5.5).
</p>
        <p><strong>Creativity Support Index Metrics. </strong> Disco performed well in terms of Creativity Support Index (CSI) metrics. These participant responses (all on a 7-point Likert scale), are visualized in the middle subplot of the quantitative charts. All 12 participants rated the system a 6 or 7 for enjoyment (median:7). Ten of 12 participants gave positive feedback (positive defined as $\geq$ 5 out of 7) that the results were worth their effort (median: 6.5). Eight of 12 participants agreed that they could sufficiently explore a number of outcomes without tedious interaction (median: 6). Expressiveness was similarly generally positive (median: 5.5). 
      </p>

      <p> There was a slight split in opinion on control <em>"I had control over the intervals and the video I was generating"</em>, median: 5) Nine of 12 participants rated it 5 or higher, but the remaining three (P1, P2, P9) found that they had lower ability to control the system, a problem that characterizes many generative workflows. (For example, if a user prompted for a person standing, they didn't have pixel-level control over how that person stood.) There was a similar divergence of opinion for Ability <em>"I generated videos I would have otherwise not been able to create.")</em>. Nine of 12 participants were in agreement with this statement about Ability (median: 7). The remainder thought that creating such work was within their abilities but that Disco could speed up the process.</p>

      <p><strong>NASA-TLX Metrics. </strong>The majority of participants recorded very positive responses for system performance (median: 6). The vast majority also did not find the system to be frustrating, temporally demanding (median:2), mentally demanding (median: 2), or effort-intensive (median: 3). Almost every participant (11/12) responded that their frustration during the task was low (low defined as less than 3 out of 7, median: 2).</p>

      

      </div>
    </div>

    



    <h3>Qualitative Findings</h3>
    <LineDivider />
    <p>
      To contextualize the quantitative feedback, we describe use cases reported by freelancers (RQ1). </p>


    <p><strong>AI for Overcoming Time and Resource Constraints.</strong> We report use cases professionals described of how they could use AI to overcome time and resource constraints and also quantify the perceived usefulness and ease of use of the generative workflow. P1 had made over 100 lyric videos for clients in their seven years of experience. They described how Generative Disco could solve a friction point (searching for stock footage) while also providing content that was uniquely music-aware.
    </p>
            {/* <img src="./disco_videos/fall_cool_war.gif"></img> */}

    <p>
    
    <em>“Looking for footage to use is very time consuming. It's probably my least favorite part of the process for my workflow… I’ve been using it [stock footage] all my life, but I don’t even have access to amazing stock footage websites or anything, because sometimes it can get really expensive... I would say with this [Generative Disco], you gotta learn it, it’s a whole new way of working... If I was doing it without its help, it would be a lot of me cutting to the music… but it wouldn’t look as flawless the way that it does [here] with the transitions on the beat. ”</em> -P1
    </p>

    <p>P5 similarly expressed that Generative Disco could greatly benefit their workflows as a footage generator. </p>

    <p><em>
    "I couldn't "reach" that [transition] with actual footage from [stock footage site] or [stock footage site]. I would have to shoot it myself with my camera and hire a real actor... It would cost me my time, my energy." - P5</em></p>


      <p>
    Professionals mentioned that the generative capacity of AI tools can be especially helpful when they have to provide a long stream of content, as in livestreams, live production, or VJ loops. <em>“A lot of content for DJs doesn’t need to be real clean. It can be busy. You're providing content for a half hour, so having stuff that you don’t have to recycle, if you could have really long clips and premade stuff--that could benefit [VJs].”</em> P4, P5, and P10 all described how Disco outputs could be used as a mixing layer to merge and layer with real footage or as the background of a video. P10 additionally described that Disco could help them test out color corrections, color boards, and scales, which to them <em>"tended to be the hardest part of making or doing anything with videos".</em>
    </p>
    <p style={{textAlign:"center"}}>
  <video style={{height:"360px"}}controls>
        <source src="./disco_videos/soulrez.mp4" type="video/mp4"></source>
      </video>
        
    </p>

   

    

    
    <p> <strong>Skill Augmentation in Visual Work. </strong>  Creative professionals who specialized in video work described how Generative Disco gave them access to techniques and content that is often out of their reach. </p>
    {/* <img class="paper_figure disco_figure" src="./images/disco/fig_waveforms_expanded.jpg"> */}
    {/* </img> */}

        <div class="flex_row">
       <video class="example_video" controls>
        <source src="./disco_videos/stitched_nights.m4v" type="video/mp4"></source>
      </video>
      <video class="example_video" controls>
        <source src="./disco_videos/fightinggravity.m4v" type="video/mp4"></source>
      </video>

    </div>

     
    <p>
      For example, P3 described how Generative Disco made stylized animation more accessible to them when they created a music visualization for "Nights" by Avicii that is pictured in the video (left) above. To the beginning lyrics, <em>"Someday you'll leave this world behind..."</em>, P3 generated a focused shot on an astronaut in space. At the next lyric phrase <em>"so live a life you will remember"</em>, they applied a color transition shot, saturating the blue moon background into a rainbow one and expressing the lyrics with fullness and color. In the last lyric phrase, <em>"My father told me when I was young"</em>, they generated another focus shot on a father and son holding hands in a watercolor style. P3 commented that the stylized animation effect would have been outside of their technical expertise and required animation expertise they did not have.

    </p>
    <p>

    <p>
       "I think a lot of AI-generated art has that dream-like quality. I would be curious to see a human turn into a tree. I feel like AI does that well."-P2

      </p> 
       <div class="flex_row">
       <img width="256px" src="./disco_videos/man_to_tree2.gif"/>
        <img width="256px" src="./disco_videos/flowers_dying.gif"/>
          
    </div>




    </p>
<p>
  P2 and P10 also described how Disco enabled them to use other visual techniques that were new to them such as morphing. P2 generated a subject transition that morphed a human silhouette into a tree, as quoted above. P10 depicted how a vibrant bouquet of flowers decayed into a dead bouquet. They did this by finding a pair of prompts that differed only by one prompt keyword ("desaturation"). 


</p>

    <p class="note">
  This suggests an interaction pattern. Users could "search" around the same prompts to find sibling images. The AI could help with the inbetweening, but this inbetweening was most effective when the transition depicted something more emergent -- for example an <strong> event</strong> marked by time (like the decay of flowers) or a <strong>transition</strong> from a blue-maned lion to a rainbow-maned lion. These helped users lean into a "new media" affordance of AI -- the way it created a new artistic effect that blended traditional techniques (e.g. morphing) with semantic change.

  

  <div class="flex_row" style={{"margin": "0 auto", "paddingTop":"1em",  }}> 
      <div class="flex_column" >
        <div>

           <img style={{height: "256px", paddingRight: "0.5em"}} src="./images/disco/lionstart.png"></img>
            <img style={{height: "256px", paddingRight:"2em"}} src="./images/disco/lionend.png"></img> 

        </div>
       
        Start-End Pair
      </div>

      <div>
        <div>
          <img style={{height: "256px", paddingRight: "0.5em"}} src="./images/disco/bluelion.png"></img>
          <img style={{height: "256px", paddingRight: "0.5em"}} src="./images/disco/rainbowlion.png"></img>

        </div>
         Start-End Pair (regenerated 2025 for illustrative purposes) 
         

      </div>
      
  </div>

    </p>
    <br></br>

    



            <br></br>




<p>
Even for advanced freelancers, there can be visual techniques such as morphing and stylization that are gated by technical know-how. These examples illustrate how Generative Disco could expand the visual repertoire of a freelancer and help them move into adjacent visual spaces like animation.
</p>





<p><strong>Enabling Double Hatting: Music and Video. </strong>

Likewise, we found that Disco could boost music experts into the visual space. P8, a music artist, described how even though they had no professional experience in visual work, one way they understood music was as changes in color and visual intensity.
</p>


<p>
<em>“Songs can kind of sound brighter or darker, depending on what sound you use or the frequency range that's dominant. You can think about how color might inform our understanding of this sound, like frequency range of darker colors mapping to shorter wavelengths on a color spectrum.” - P8 </em>
</p>
    
      
<p>
Using Disco, P8 was able to act on this notion. They brought in an original composition and had an artistic vision for what they wanted their video to achieve. They wanted to express vibes of by sunlight streaming through a window, morning coffee, and yellows and greens to evoke hiking imagery. To achieve their vision, they utilized the visual brainstorming pipeline to find generations representing <em>“Golden sky, sun emerging slowly, sunny, vignette, warm, storybook”</em> and <em>“Cozy cabin basking in sunrise, vignette, warm, storybook illustration”</em>. A time transition generated with the golden sky image and sun rays (Row 4) helped them express those morning sentiments and the sense of musical brightness they referred to. 

</p>
    <div class="flex_row">
       <video class="example_video" controls>
        <source src="./disco_videos/yerb.m4v" type="video/mp4"></source>
      </video>


    </div>
<p>
P7 was a classically-trained musician who was also a novice to video creation. They found it easy to grasp the generative workflow concepts (e.g. the design patterns of focus shots and transitions) and use the visual brainstorming pipeline to explore concepts based on color and symbols. 
</p>
<p>
<em>
    "I am really impressed by it. I think it's so cool, because I don't have an animation background or a computer science background. So having this interface--as someone who has no experience in either of those fields--it was very user-friendly, really fun to experiment with. How I was able to create a final product with an idea that I had in my brain--with no experience--I didn't think that that was possible." -P7

</em>
</p>




<p>
  Video professionals could also create in a music-first way. Rather than considering music as just one track or as an underscoring background element, they could engage with the different structures latent in the songs. They could move across the layers in the music, moving from beats to lyrics to other musical elements highlighted by amplitude changes in the waveform representation of the music. 
</p>
  
<p>It is worth noting that some freelancers had blended experience with music and video (P1, P4, P10). For these participants, a primary strength of Generative Disco was that it computationally assisted with audiovisual alignment, which is something that is difficult to manually achieve. While the people (freelance artists) drew upon their expertise and design eye to make the visuals resonate with the music <strong>at a high-level </strong>, the system (AI) also handled the <strong>low-level, generally more painful parts of design execution </strong> like way video visuals would align with the music. P10 appreciated this audiovisual alignment support as they visualized a locked groove from techno music. They used color as a strategy to highlight strong percussive elements in the music. 


</p>

<p style={{textAlign:"center"}}> 
      <video preload="auto" class="example_video" controls src="./disco_videos/stitched_output.m4v" ></video>

</p>
<p>
   
<em>
"[I am] trying to keep to the philosophy of what a locked groove is, making small variations between the broader theme, from black and white to color." -P10
</em>
</p>


<p><strong>Failure Modes (RQ3). </strong>Motion artifacts were one of the main deciders for what made a generated interval usable or not. For example, P5 once tried to generate an interval depicting a couple. In the middle, intermediate frames pictured extra people, introducing a glitchy motion artifact. A similar issue was jitter; because our text-to-video inference process was conditioned on the input music, when the music had too many simultaneous features, the generated video could suffer from excessive audioreactivity.


</p>
<p>
  Additionally, our system implementation was based on a model that did not afford composition control or camera motion control. Faces and bodies were prone to distortion when interpolated, causing participants to stay away from picturing people. Without camera motion control, participants were unable to take actions that are ingrained in their usual workflows such as panning, zooming, and rotation. We can incorporate new advancements from text-to-video models to implement features that resolve these issues.
</p>






    {/* // <p><strong>Enabling Double Hatting: Music and Video</strong>Likewise, we found that Generative Disco could boost music experts into the visual space. A music artist that participated described how even though they had no professional experience in visual work, one way they understood music was as changes in color and visual intensity.</p>

    // <p><em>“Songs can kind of sound brighter or darker, depending on what sound you use or the frequency range that's dominant. You can think about how color might inform our understanding of this sound, like frequency range of darker colors mapping to shorter wavelengths on a color spectrum.” </em>- P8</p>

    // <p>Some audiovisual professionals had blended experience with music and video. For these participants, a primary strength of Generative Disco was that it computationally assisted with <strong>audiovisual alignment</strong>, which is something that is difficult to manually achieve. Freelancers drew upon their expertise in color and motifs to make the visuals resonate with the music at a high-level, while the system also handled the way visuals would snap to the music at the low-level. </p>

 */}
<br></br>
      
        {/* <div style={{width: "88.5%"}}>
           <img  src="./images/disco/disco_fig_transitions.png" />
        </div> */}
       

    
     {/* </div> */}
         {/* <p style={{textAlign:"center"}}>
  <video style={{height:"360px"}}controls>
        <source src="./disco_videos/lucky_ones.mp4" type="video/mp4"></source>
      </video>
        
    </p> */}





 
    {/* <img class="paper_figure disco_figure" src="./images/disco/fig_disco_hold.png"> */}
    {/* </img> */}
    <h3>Discussion</h3>
    <LineDivider />
      <h4>Digital "Double Hatting"</h4>
    <p>
    The world is more multimedia than ever. A musician who wants to release a song needs album art and video visualizers to help visually package their work on social media. The shortform content creator who wants to tell stories needs image and video assets to make their stories more immersive.

    </p>

    {/* <p style={{textAlign:"center"}}> 
      <video preload="auto" controls src="./disco_videos/lana.mp4" ></video>

</p> */}
  
    <p>
      Many existing tools give people the means to create visual content if they are willing to learn tool-specific skill verticals (e.g. Photoshop, Premiere). When users learn the design languages specific to domains like music or video, they often find that the artistic expertise they developed in one domain does not carry over to the next. For example, a musician may work on mixing and mastering compositions within a music software, but not be able to translate that deep understanding of their music into design actions in a video editing software, because they have different low-level tool primitives. The language interactions in Generative Disco pulled people out of that low-level focus so that they could focus on the high-level story they wanted to craft around music. This form of interaction proved easy to learn: all participants learned how to utilize every generative function of Generative Disco within fifteen minutes, which is vastly different from the steeper learning curves expected to master audiovisual tools. 
    </p>

    <p>
      We show in our study that Generative Disco could enable <em>horizontal</em> expansion across different domains and increase skill mobility. This result adds a dimension to previous findings that generally only capture vertical acceleration domain experts get from generative AI in the form of speed and productivity gains <a href="https://www.science.org/doi/abs/10.1126/science.adh2586">[src]</a>. It also adds a datapoint that runs counter to concerns raised about AI deskilling.

    </p>

    <h4>Multimodal Expression of Vibe</h4>
    <p>Generative Disco helped users express abstract concepts like musical vibe. Participants drew upon their artistic expertise to apply color and symbols that made their music visualization less literal, more narrative, and capable of accessing higher-order expressions of aesthetics and mood. We found that there were certain conceptual spaces such as color and emotion that participants kept returning to as ways of bridging the music and visual modalities. Discovering more multimodal spaces and ways of exploring them can help generative workflows better leverage artistic expertise. Creating richer points of interaction in these tools will give creative professionals more ways to highlight the creativity they are fundamentally hired for.</p>


    <h4>Future Work and Limitations</h4>
    <p>
      Generative Disco can still be improved on both its music and visual dimensions. We plan to explore methods for automatic music segmentation by analyzing songs in terms of melody, lyrics, dynamics, and rhythm. This can help users build longer narratives by reducing their listening taskload. Furthermore, we plan to incorporate more control modalities and stronger motion priors (e.g. ControlNet, AnimateDiff). Generative Disco's workflow can also generalize to other motion graphic domains by providing assets for kinetic typography or virtual backgrounds. 
          

    </p>

    <p style={{textAlign: "center"}} >
            {/* <img  width="20%" src="./images/AIArt3.gif"></img> */}

    </p>
 
    <p>
      Generative Disco's characterization of digital double hatting can continue to be studied under different sociotechnical lens. This form of horizontal skill expansion can impact transparency within client-artist relationships. Additionally, participants made observations that there could be impacts on labor ecosystems tertiary to their own, such as the stock footage space. Digital double hatting could also potentially introduce friction between creatives, who may have previously depended on each other through collaboration and joint projects. The longitudinal impacts of generative AI on the social dynamics surrounding creative professionals merits future work. 

    </p>
    <p><strong> Note </strong> It is also worth noting that the user study was conducted in April 2023, and social media attitudes towards generative AI content has changed over time.</p>

    {/* <p>


    Many existing tools give people the means to create visual content if they are willing to learn tool-specific skill verticals (e.g. Photoshop, Premiere). When users learn the design languages specific to domains like music or video, they often find that the artistic expertise they developed in one domain does not carry over to the next. For example, a musician may work on mixing and mastering compositions within a music software, but not be able to translate that deep understanding of their music into design actions in a video editing software, because they have different low-level tool primitives. The language interactions in Generative Disco pulled people out of that low-level focus so that they could focus on the high-level story they wanted to craft around music. This form of interaction proved easy to learn: all participants learned how to utilize every generative function of Generative Disco within fifteen minutes, which is vastly different from the steeper learning curves expected to master audiovisual tools. 

    </p>
    <p>
    We show in our study that Generative Disco could enable <em>horizontal expansion</em> across different domains and increase skill mobility. This result adds a dimension to previous findings that generally only capture vertical acceleration domain experts get from generative AI in the form of speed and productivity gains. It also adds a datapoint that runs counter to concerns raised about AI deskilling.

    </p> */}

    <h3>Conclusion</h3>
    <LineDivider />
    {/* <img src="./images/disco/doublehatting.png" style={{ width: "256px", display: "block", marginLeft: "auto", marginRight: "auto"}}></img> */}
    <p>
In this paper, we introduce Generative Disco, a generative text-to-video workflow for music visualization. In a user study field testing Generative Disco with audio and visual freelance creatives, we found that creatives found the generative tool easy to use, expressive, and capable of supporting a number of professional use cases. Generative Disco helped creative professionals work across modalities and empowered them to have more artistic reach. We characterize type of labor augmentation as digital "double hatting" and detail how it can increase the skill mobility of creative professionals into adjacent domains. 
    </p>

<h3>Examples</h3>
<LineDivider/>

          <Carousel></Carousel>

        {/* <div  style={{ width:"70%", flexDirection: "row", flexWrap:"wrap", position: "relative", margin: "0 auto"}} >
        
       
            <img class="example_videos" style={{width: "196px", height: "196px"}} src="./disco_videos/kaleidoscope.gif"></img>
            <img class="example_videos" style={{width: "196px", height: "196px"}} src="./disco_videos/stars_bg.gif"></img>
            <img class="example_videos" style={{width: "196px", height: "196px"}} src="./disco_videos/flowers_dying.gif"></img>
                        <img class="example_videos" style={{width: "196px", height: "196px"}} src="./disco_videos/sunrise.gif"></img>


            
                                    <img class="example_videos" style={{width: "196px", height: "196px"}} src="./disco_videos/wannadance.gif"></img>

              <img class="example_videos" style={{width: "196px", height: "196px"}} src="./disco_videos/style_shift.gif"></img>
          <img class="example_videos" style={{width: "196px", height: "196px"}} src="./disco_videos/swamp.gif"></img>

        </div>
     */}
    
    
    


   <br></br>


   
   
    <LineDivider />
    <Bibliography />



      
    </div>

  );
};

export default DiscoProjectPage;
