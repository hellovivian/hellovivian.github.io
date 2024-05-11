// projectDisco.js

import React from 'react';


import Navigation from './components/Navigation';
import './App.css';
import './Logomotion.css';

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

        <img width="256px" src="./logomotion_gifs/chess1.gif"></img>
    
     </div>,
       <div className="item" data-value="1">

       <img width="256px" src="./logomotion_gifs/lantern1.gif"></img>
   
    </div>,
    <div className="item" data-value="2">

    <img width="256px" src="./logomotion_gifs/cat1.gif"></img>

        
        
    </div>,
    <div className="item" data-value="3">
                <img width="256px" src="./logomotion_gifs/warrior1.gif"></img>


    </div>,
    <div className="item" data-value="4">
        
        <img width="256px" src="./logomotion_gifs/acapella1.gif"></img>


    </div>,
    <div className="item" data-value="5">
        <img width="256px" src="./logomotion_gifs/adventure1.gif"></img>

    </div>,
    <div className="item" data-value="6">
        <img width="256px" src="./logomotion_gifs/crab1.gif"></img>

    </div>,
     <div className="item" data-value="7">
                <img width="256px" src="./logomotion_gifs/tennis1.gif"></img>

     </div>,
    <div className="item" data-value="8">
            <img width="256px" src="./logomotion_gifs/tacos1.gif"></img>

    </div>,
        <div className="item" data-value="9">
                    <img width="256px" src="./logomotion_gifs/circus1.gif"></img>

        </div>,

];



const items2 = [
    <div className="item" data-value="1">

        <img width="256px" src="./logomotion_gifs/stars.gif"></img>
    
     </div>,
       <div className="item" data-value="1">

       <img width="256px" src="./logomotion_gifs/dj.gif"></img>
   
    </div>,
    <div className="item" data-value="2">

    <img width="256px" src="./logomotion_gifs/lax.gif"></img>

        
        
    </div>,
    <div className="item" data-value="3">
                <img width="256px" src="./logomotion_gifs/kundera.gif"></img>


    </div>,
    <div className="item" data-value="4">
        
        <img width="256px" src="./logomotion_gifs/tools.gif"></img>


    </div>,
     <div className="item" data-value="5">

     <img width="256px" src="./logomotion_gifs/skull.gif"></img>
 
         
         
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

const Carousel2= () => (

    


    <AliceCarousel

        mouseTracking
        items={items2}
        responsive={responsive}
        controlsStrategy="alternate"
    />
);
const LogoMotionProjectPage = () => {
  return (
    
    <div >
        
     <Navigation />
      <h3 id="title">LogoMotion: Visually-Grounded Code Generation for Content Aware Animation</h3>
      <p class="paper_authors">Vivian Liu, Rubaiat Habib Kazi, Li-Yi Wei, Matthew Fisher, Timothy Langlois, Seth Walker, Lydia Chilton</p> 
      <p class="paper_affiliations">Columbia University, Adobe Research</p> <br></br>



      
      <Carousel></Carousel>

      <p class="paper_abstract">
    <h3 class="logomotion_header"> Abstract </h3> 
    <hr></hr>

    Animated logos are a compelling and ubiquitous way individuals and brands represent themselves online. Manually authoring these logos can require significant artistic skill and effort. To help novice designers animate logos, design tools currently offer templates and animation presets. However, these solutions can be limited in their expressive range. Large language models have the potential to help novice designers create animated logos by generating animation code that is tailored to their content. In this paper, we introduce LogoMotion, an LLM-based system that takes in a layered document and generates animated logos through visually-grounded program synthesis. We introduce techniques to create an HTML representation of a canvas, identify primary and secondary elements, synthesize animation code, and visually debug animation errors. When compared with an industry standard tool, we find that LogoMotion produces animations that are more content-aware and are on par in terms of quality. We conclude with a discussion of the implications of LLM-generated animation for motion design.
    <br></br>
    <div>
    <br></br>
    {/* <strong>   </strong>  */}
    {/* <hr></hr> */}
    <img class="paper_figure logomotion_figure" src="./images/logomotion/figure_teaser.jpg">
    </img>
    <br></br>
    <h3 class="logomotion_header"> Motivation </h3> 
    <hr></hr>
    <div class="two_column">
        <div class="left_column">
        <img class="paper_figure logomotion_column_figure" src="./logomotion_gifs/taxi.gif">
    </img>

        </div>
        <div class="right_column">

        Authoring an animated logo is challenging. Logos are often more than just a pairing of icon with text. Because they can have different layouts, layers, color, and typography, they can take on great variety and be complex artifacts to animate. For a novice designer, it can be difficult to understand which design elements should be animated, in what sequence, and how to build up compelling and believable motion.
        <br></br>
        <br></br>

        Large language models (LLMs) present the potential for <em>content-aware</em> animation. They can generate animation code that is specific to the design elements and their layout on the canvas. Because LLMs encode a vast amount of world knowledge, they can draw upon actions and activities related to the content being animated and generate a near infinite number of animations. This open-ended generative capacity can go beyond the scope of what existing animation approaches (e.g. templates and presets) usually cover.

        {/* While there is a great demand for animated content, it is difficult for people outside of motion design to develop this kind of expertise. Design tools such as Adobe Express, Canva, and Figma often provide solutions in the form of animated templates and automatic animation techniques. While templates and automatic techniques can get users to a starting point fast, neither solution works with a recognition of the user's content, which is something that can be enabled by emerging technologies. */}
        </div>
    </div>
    
    

    <br></br>
    <h3 class="logomotion_header"> LogoMotion Overview</h3> 
    <hr></hr>

    We present LogoMotion, a LLM-based method that automatically animates logos based on their content. The input is a static PDF document which can consist of image and text layers. The output is an HTML page with JavaScript code that renders the animation.
    
    <img class="paper_figure logomotion_figure" src="./images/logomotion/figure_overview2.jpg">
    </img>

    <br></br>

    <strong>Visually-Grounded Program Synthesis.</strong> In Step 1, a PDF of a logo is converted into an HTML representation of the canvas. LogoMotion has pre-processing steps to caption each image element, extract its bounding box, and assign a z-order as per the layer ordering of the document. In Step 2, the HTML is augmented with information about visual hierarchy of the logo layout (e.g. what are primary / secondary elements, what elements group together). In Step 3, a design concept for the animated logo suggested. In Step 4, the LLM implements animation code for the design concept that will animate the logo HTML. <br></br>


    <img class="paper_figure logomotion_figure" src="./images/logomotion/figure_program_repair.jpg">
    </img>
    <br></br>
    <strong>Visually-Grounded Program Repair</strong> identifies bugs in animation code by checking the bounding boxes between elements in the target layout and elements in the last frame of the animation. If errors are identified, the LLM is triggered to perform self-refinement with the visual description of the bug. A code fix is generated and merged back into the original code, provided if it fixes the error.
  
    <h3 class="logomotion_header"> Evaluations </h3>     <hr></hr>
    We conducted three evaluations to understand the quality of our LLM system: 1) a comparison study against an industry standard and baseline informed by professional animated logo designers 2) an empirical analysis of program repair testing different experimental settings, 3) an evaluation with novices to understand \nickname's capacity for customization. These evaluations are centered around the following research questions:

    <ul>
        <li><strong>RQ1. Across a wide range of designs, to what extent does LogoMotion support content-aware animation?
        </strong>
        </li>
        <li>
        <strong>
        RQ2. What are the overall strengths and the weaknesses of LogoMotion at animation? 
        </strong>
        </li>
        <li>
        <strong>
        RQ3. What sorts of errors does LogoMotion tend to make?
        </strong>
        </li>
        <li>
        <strong>
        RQ4. How capably can visually-grounded program repair debug such errors and what settings of program repair impact performance?
        </strong>
        </li>
        <li>
        <strong>
        RQ5. To what extent can user interaction and iteration improve the quality of the automatically generated animated logos?
        </strong>
        </li>
    </ul>
    <br></br>
    <div class="three_column">
        <div class="third1">
        <img class="paper_figure logomotion_column_figure" src="./images/logomotion/logomotion_barchart.jpg"></img>

        
        </div>
        <div class="third2">
        <img class="paper_figure logomotion_column_figure" src="./images/logomotion/solve_rate_vs_k.jpg">
    </img>

        </div>
        <div class="third3">
        <img class="paper_figure logomotion_column_figure" src="./images/logomotion/program_repair_attempts_across_k.jpg"></img>
   

   
    </div>
    </div>
    <div class="three_column">
        <div class="third1">
            <p class="caption">
           RQ1. LogoMotion was rated to have significant more relevance to the subject matter of the animated logos than both Magic Animate, an industry standard tool for automatic animation and an ablated version of LogoMotion.


            </p>
        
        

        
        </div>
        <div class="third2">
        <p class="caption">
        RQ4. For the program repair stage, when LogoMotion is given more attempts to debug each error (increase in <em>k</em>), LogoMotion improves in solve rate. Solve rate refers to the proportion of animation code samples that were error-free on all design elements after program repair.
            </p>
            

        </div>
        <div class="third3">
        <p class="caption">
        RQ4. Aggregated across all design elements with errors (rather than across runs of animation code, as done in the figure to the left), we saw that the majority of the time, LogoMotion solves visual errors in one attempt.</p>
        </div>
   

   
    </div>

    Please refer to the paper for more details about the evaluations around the research questions. This page is under construction and will next be updated in early June.


   

    <h3 class="logomotion_header">LogoMotion Archive</h3>
    <hr></hr>
    <br></br>
    LogoMotion was run hundreds of times, but the prompting pipeline changed over time. Here are some examples from past iterations of LogoMotion.
    
    
    

    </div>

   <br></br>


   
   
    </p>

   

    <Carousel2></Carousel2>



      
    </div>
    
  );
};

export default LogoMotionProjectPage;