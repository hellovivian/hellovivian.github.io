// projectDisco.js

import React from 'react';

import './Disco.css';
import Navigation from './components/Navigation';
import './App.css';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import Video from './components/Video';

import discoData from './data/discoData';  // Assuming projectData is in the same directory

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
      <h3 id="discotitle">Generative Disco</h3>
      <h4 class="paper_authors">Vivian Liu, Tao Long, Nathan Raw, Lydia Chilton</h4> <br></br>

   

      
      <Carousel></Carousel>
      <p class="paper_abstract">
    <strong class="pink"> Abstract. </strong> Visuals can enhance our experience of music, owing to the way they can amplify the emotions and messages conveyed within it. However, creating music visualization is a complex, time-consuming, and resource-intensive process. We introduce Generative Disco, a generative AI system that helps generate music visualizations with large language models and text-to-video generation. The system helps users visualize music in intervals by finding prompts to describe the images that intervals start and end on and interpolating between them to the beat of the music. We introduce design patterns for improving these generated videos: transitions, which express shifts in color, time, subject, or style, and holds, which help focus the video on subjects. A study with professionals showed that transitions and holds were a highly expressive framework that enabled them to build coherent visual narratives. We conclude on the generalizability of these patterns and the potential of generated video for creative professionals.

    <br></br>
    <div id="disco_figure_gallery">
    <img class="paper_figure disco_figure" src="./images/disco/fig_systemdesign_0915.jpg">
    </img>
    <img class="paper_figure disco_figure" src="./images/disco/disco_fig_transitions.png">
    </img>
    <img class="paper_figure disco_figure" src="./images/disco/fig_disco_hold.png">
    </img>
    <img class="paper_figure disco_figure" src="./images/disco/fig_patterns_tgt.jpg">
    </img>
    <img class="paper_figure disco_figure" src="./images/disco/fig_waveforms_expanded.jpg">
    </img>

    </div>
   <br></br>


   
   
    </p>



      
    </div>
  );
};

export default DiscoProjectPage;