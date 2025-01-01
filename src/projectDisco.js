// projectDisco.js

import React from 'react';
import './Disco.css';
import Navigation from './components/Navigation';
import './App.css';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import Video from './components/Video';
import LineDivider from './components/LineDivider';






const Bibliography = () => {
    const references = `
     @misc{Liu:2023:Disco,
      title={Generative Disco: Text-to-Video Generation for Music Visualization},
      author={Vivian Liu, Tao Long, Jenny Ma, Nathan Raw, Jiaxin Yang, Claudia Tang, Lulu Wang, Yumo Yang and Lydia Chilton},
      year={2023},
      eprint={2304.08551},
      archivePrefix={arXiv},
      primaryClass={cs.HC}
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

        <Video className='videoCard' song="Beauty and a Beat" artist='Justin Bieber' url="./disco_videos/AIArt1.mp4"/>
    
     </div>,
    <div className="item" data-value="2">

        
        <Video className='videoCard' song="One More Time" artist='Daft Punk' url="./disco_videos/daftpunk.m4v"/>
        
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
     <Video className='videoCard' song="Cowgirl Remix" artist='-' url="./disco_videos/stitched_output.m4v"/>
     </div>,
    <div className="item" data-value="8">
    <Video className='videoCard' song="Nights" artist='Avicii' url="./disco_videos/stitched_nights.m4v"/>
    </div>,
        <div className="item" data-value="9">
        <Video className='videoCard' song="Yerb" artist='-' url="./disco_videos/yerb.m4v"/>
        </div>,

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
    
    <div className="discoContainer">
        
     <Navigation />
      <h3 >Generative Disco</h3>
      <h4 class="paper_authors">Vivian Liu, Tao Long, Jenny Ma, Nathan Raw, Jiaxin Yang, Claudia Tang, Lulu Wang, Yumo Yang, Lydia Chilton</h4> <br></br>
   
      <Carousel></Carousel>

      <h3>
        Motivation
      </h3>
      <LineDivider />

      <p>Generative methods provide people with efficient and personalizable means to create content so but raise the question if such methods will augment or displace creative work. We explore how these new generative workflows can impact creative professionals who freelance audiovisual work. To focus our scope, we study how music and video professionals engage with a text-to-video workflow for music visualization. </p>

      <p>
      For this task, we introduce Generative Disco, a text-to-video workflow we built for music visualization. The tool presents an interactive pipeline incorporating large language model assistance, text-to-image generation, and text-to-video generation to help users take a music file as input and produce an animated music video as output. The tool introduces design patterns called transitions and holds that users can interactively apply to scaffold the construction of text-to-video narratives. 
      </p>

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
    System Design
    </h3>
    <LineDivider />

    <p>
    Generative Disco takes music in as input and generates music visualization in the form of shortform video as output. Its guiding design principles are to help users express music by 1) supporting simple prompt-based interactions, 2) structuring the creation of a text-to-video narrative, 3) helping users brainstorm visuals to interpolate into video, and 4) generating videos that have open-ended artistic possibilities.

    </p>
    <p>
    Generative Disco system design. Users begin by interacting with the waveform to create intervals within the music (A). To find prompts that will define the start and end of intervals (C), users can brainstorm prompts using suggestions from GPT-4 (B, D) and explore text-to-image generations (E, I). Results users like can be dragged and dropped into the start and end areas (C), after which a text-to-video interval can be generated. These show in the Tracks (G) and can be stitched into a video placed in the Video Area (H).
    </p>

     

    <img class="paper_figure disco_figure" src="./images/disco/fig_systemdesign_0915.jpg">
    </img>

    <h3>Evaluation</h3>
    <LineDivider />
    <p>
    We conducted a first-use user study with video and music professionals (n=12) who tried \nickname and compared and contrasted its generative workflow with their own expert ones. We present qualitative findings showing that generative workflows enable audiovisual professionals to be digital “double hatters” by allowing them to augment their skillsets and expand their creative range into adjacent domains. Music professionals were empowered to visually represent their work and concretely convey the vibes and visuals carried within music. Video professionals could extend their range into visual spaces that were previously outside of their usual technical capabilities, such as stylized animation and morphing. 

    
    </p>
    <img class="paper_figure disco_figure" src="./images/disco/fig_waveforms_expanded.jpg">
    </img>
    
    <h3>Qualitative Findings</h3>
    <LineDivider />
    <p>

    <strong>AI for Overcoming Time and Resource Constraints.</strong> We report use cases professionals described of how they could use AI to overcome time and resource constraints and also quantify the perceived usefulness and ease of use of the generative workflow.

    To contextualize the quantitative feedback, we describe use cases reported by freelancers (RQ1). 
    </p>

    <p>

   

    <em>“Looking for footage to use is very time consuming. It's probably my least favorite part of the process for my workflow… I’ve been using it [stock footage] all my life, but I don’t even have access to amazing stock footage websites or anything, because sometimes it can get really expensive... I would say with this [Generative Disco], you gotta learn it, it’s a whole new way of working... If I was doing it without its help, it would be a lot of me cutting to the music… but it wouldn’t look as flawless the way that it does [here] with the transitions on the beat. ”</em> -P1
    </p>

    <p>

    
    Professionals mentioned that the generative capacity of AI tools can be especially helpful when they have to provide a long stream of content, as in livestreams, live production, or VJ loops. <em>“A lot of content for DJs doesn’t need to be real clean. It can be busy. You're providing content for a half hour, so having stuff that you don’t have to recycle, if you could have really long clips and premade stuff--that could benefit [VJs].”</em>
    </p>

    <p>
    <strong>Skill Augmentation in Visual Work.</strong> Even for advanced freelancers, there can be visual techniques such as morphing and stylization that are gated by technical know-how. These examples in the figure below illustrate how Generative Disco could expand the visual repertoire of a freelancer and help them move into adjacent visual spaces like animation.
    </p>

    <p><strong>Enabling Double Hatting: Music and Video</strong>Likewise, we found that Generative Disco could boost music experts into the visual space. A music artist that participated described how even though they had no professional experience in visual work, one way they understood music was as changes in color and visual intensity.</p>

    <p><em>“Songs can kind of sound brighter or darker, depending on what sound you use or the frequency range that's dominant. You can think about how color might inform our understanding of this sound, like frequency range of darker colors mapping to shorter wavelengths on a color spectrum.” </em>- P8</p>

    <p>Some audiovisual professionals had blended experience with music and video. For these participants, a primary strength of Generative Disco was that it computationally assisted with <strong>audiovisual alignment</strong>, which is something that is difficult to manually achieve. Freelancers drew upon their expertise in color and motifs to make the visuals resonate with the music at a high-level, while the system also handled the way visuals would snap to the music at the low-level. </p>

    <img class="paper_figure disco_figure" src="./images/disco/disco_fig_transitions.png">
    </img>
    {/* <img class="paper_figure disco_figure" src="./images/disco/fig_disco_hold.png"> */}
    {/* </img> */}
    <h3>Discussion: Digital ``Double Hatting"</h3>
    <LineDivider />

    <p>



    Many existing tools give people the means to create visual content if they are willing to learn tool-specific skill verticals (e.g. Photoshop, Premiere). When users learn the design languages specific to domains like music or video, they often find that the artistic expertise they developed in one domain does not carry over to the next. For example, a musician may work on mixing and mastering compositions within a music software, but not be able to translate that deep understanding of their music into design actions in a video editing software, because they have different low-level tool primitives. The language interactions in Generative Disco pulled people out of that low-level focus so that they could focus on the high-level story they wanted to craft around music. This form of interaction proved easy to learn: all participants learned how to utilize every generative function of Generative Disco within fifteen minutes, which is vastly different from the steeper learning curves expected to master audiovisual tools. 

    </p>
    <p>
    We show in our study that \nickname could enable <em>horizontal expansion</em> across different domains and increase skill mobility. This result adds a dimension to previous findings that generally only capture vertical acceleration domain experts get from generative AI in the form of speed and productivity gains. It also adds a datapoint that runs counter to concerns raised about AI deskilling.

    </p>
    
    
    
    


   <br></br>


   
   
    <LineDivider />
    <Bibliography />



      
    </div>
  );
};

export default DiscoProjectPage;