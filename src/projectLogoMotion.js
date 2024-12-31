// projectDisco.js

import React from 'react';


import Navigation from './components/Navigation';
import './App.css';
import './Logomotion.css';

import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';




const Bibliography = () => {
    const references = `
      @misc{Liu2024Logomotion,
      title={LogoMotion: Visually Grounded Code Generation for Content-Aware Animation}, 
      author={Vivian Liu and Rubaiat Habib Kazi and Li-Yi Wei and Matthew Fisher and Timothy Langlois and Seth Walker and Lydia Chilton},
      year={2024},
      eprint={2405.07065},
      archivePrefix={arXiv},
      primaryClass={cs.HC},
      url={https://arxiv.org/abs/2405.07065}, 
}
  
    `;
    return (
      <div id="bibliography">
        <pre>{references}</pre> {/* Display BibTeX as preformatted text */}
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

const userStudyExamples = [
    <div className="item" data-value="1">
        <img width="256px" src="./logomotion_gifs/user_study_example_pipe.gif"></img>
    </div>,
    <div className="item" data-value="2">
    <img width="256px" src="./logomotion_gifs/userstudy_example_dino.gif"></img>
    </div>,
    <div className="item" data-value="3">
        <img width="256px" src="./logomotion_gifs/userstudy_example_manta.gif"></img>
    </div>,
    <div className="item" data-value="4">
    <img width="256px" src="./logomotion_gifs/user_study_example_sweethome.gif"></img>
</div>,
]
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

const Carousel2 = () => (

    <AliceCarousel
        mouseTracking
        items={items2}
        responsive={responsive}
        controlsStrategy="alternate"
    />
);

const UserStudyCarousel = () => (
    <AliceCarousel
        items = {userStudyExamples}
        mouseTracking
        responsive={responsive}
        controlsStrategy="alternate"
    />
);
const LogoMotionProjectPage = () => {
    return (

        <div >
            <Navigation />
            <h3 id="title">LogoMotion: Visually-Grounded Code Synthesis for Creating and Editing Animation</h3>
            <p class="paper_authors">Vivian Liu, Rubaiat Habib Kazi, Li-Yi Wei, Matthew Fisher, Timothy Langlois, Seth Walker, Lydia Chilton</p>
            <p class="paper_affiliations">Columbia University, Adobe Research</p> <br></br>


            <Carousel class="logomotion-example-carousel"></Carousel>

            <p class="paper_abstract">
                <h3 class="logomotion_header"> Abstract </h3>
                <hr></hr>

                Creating animation takes time, effort, and technical expertise. To help novices with animation, we present LogoMotion, an AI code generation approach that helps users create semantically meaningful animation for logos. LogoMotion automatically generates animation code with a method called visually-grounded code synthesis and program repair. This method performs visual analysis, instantiates a design concept, and conducts visual checking to generate animation code. LogoMotion provides novices with code-connected editing widgets that help them edit the motion, grouping, and timing of their animation. In a comparison study on 276 animations, LogoMotion was found to produce more content-aware animation than an industry-leading tool. In a user evaluation (n=16) comparing against a prompt-only baseline, these code-connected widgets were found to be capable of supporting users at animation editing with control, exploration, and iteration.
                <br></br>
                <div>


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

                    </div>
                </div>


                <h3 class="logomotion_header"> LogoMotion Overview </h3>
                <hr></hr>

                <img class="paper_figure logomotion_figure" src="./images/logomotion/logomotion_rr_figure.jpg">
                </img>
                <br></br>

                We present LogoMotion, an AI code generation and editing tool that helps novices create semantically meaningful animation for logos. LogoMotion automatically generates animation code for a logo design using <strong>visually-grounded code synthesis and program repair</strong>. This method takes in a logo as input and generates an HTML page and animation code as output. Visually-grounded code synthesis performs visual analysis, instantiates a design concept, and conducts visual checking to generate animation code. The animation that executes on the page is semantically meaningful to the logo design. For example, a skier element can ski in from the left and do a flip, and the title text can pulse as the skier lands. 
                
                <br></br><br></br>
                Novices can customize this animation using <strong>code-connected AI editing widgets</strong> such as a narrative timeline, layer panel, and quick actions. These code-connected widgets implement edits to motion, grouping, and timing of their animation by doing targeted regeneration of the underlying code. For example, a user can edit the skier to have a different hero moment (e.g. skier skis in diagonally as if on a slope) or synchronize the timing of the mountains and line elements with the skier's entrance. 
                

                <br></br>


                <h3 class="logomotion_header"> Visually-Grounded Code Synthesis </h3>
                <hr></hr>
                <br></br>

                This method performs visual analysis on a static layout and instantiates a design concept to guide AI implementation of animation code.
                

                <img class="paper_figure logomotion_figure" src="./images/logomotion/logomotion_codesynthesis_noheader.jpg">
                </img>
                
                <ul>
                    <li>
                    In Step 1, a PDF of a logo is converted into an HTML representation of the canvas. LogoMotion has pre-processing steps to caption each image element, extract its bounding box, and assign a z-order as per the layer ordering of the document.
                    </li>
                    <li>
                        In Step 2, the HTML is augmented with information about visual hierarchy of the logo layout (e.g. what are primary / secondary elements, what elements group together).
                    </li>
                
                    
                    <li>
                        In Step 3, a design concept for the animated logo suggested. 
                    </li>
                    <li>
                    In Step 4, the LLM implements animation code for the design concept that will animate the logo HTML.
                    </li>

                </ul>
                
                <br></br>


                <h3 class="logomotion_header"> Visually-Grounded Program Repair </h3>
                <hr></hr>

                This method takes visual feedback from the canvas to self-debug animation code errors. It identifies bugs in animation code by checking for differences between elements in the target layout and elements in the last frame of the animation. 

                <br></br>

                <img class="paper_figure logomotion_figure" src="./images/logomotion/logomotion_programrepair_noheader.jpg">
                </img>
                <br></br>

                If there is a visual error, a VLM receives 1) image pair of only the affected element (the rest of the layout behind the skier element is pictured only for context), 2) a bug description, and 3) the original code to output a code fix.

                <h3 class="logomotion_header"> Code-Connected AI Editing Widgets </h3>
                <hr></hr>

                LogoMotion provides users code-connected widgets to edit their animation. It provides quick actions (B), a narrative timeline (C), a layer panel (D), and prompt interaction (E). These widgets help users make targeted edits to the motion, grouping, and timing of their animation. An example animation edit output is shown in (F). 

                <img class="paper_figure logomotion_figure" src="./images/logomotion/logomotion_interface_noheader.jpg">
                </img>

                <h3 class="logomotion_header"> Evaluations </h3>
                
                <hr></hr>
                We conducted three evaluations to understand the quality of our LLM system: 1) a comparison study against an industry standard and baseline informed by professional animated logo designers 2) an empirical analysis of program repair testing different experimental settings, 3) an evaluation with novices to understand \nickname's capacity for customization. These evaluations are centered around the following research questions:

                <ul>
                    <li>
                        RQ1. To what extent does LogoMotion generate animation that is relevant to design elements on a canvas
                    </li>
                    <li>
                        RQ2. What are the overall strengths and the weaknesses of LogoMotion at animation?
                    </li>
                    <li>
                        RQ3. What sorts of errors does LogoMotion tend to make? 
                    </li>
                    <li>
                        RQ4. How capably can visually-grounded program repair debug errors and what settings of program repair impact performance?
                    </li>
                    <li>
                        RQ5. To what extent can LogoMotion's code-connected widgets help novices with animation editing?
                    </li>
                </ul>
                <br></br>
                <div class="three_column">
                    <div class="third1">
                        <img class="paper_figure logomotion_column_figure" src="./images/logomotion/logomotion_barchart.jpg"></img>


                    </div>
                    <div class="third2">
                        <img class="paper_figure logomotion_column_figure" src="./images/logomotion/visual_error_solve_rate_with_se.jpg">
                        </img>

                    </div>
                    <div class="third3">
                        <img class="paper_figure logomotion_column_figure" src="./images/logomotion/exploration_tree_twoboxplot.jpg"></img>

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
                        RQ5. To evaluate the code-connected widgets (RQ5), we compared LogoMotion with a prompt-only baseline. Boxplots show the distribution of animations explored and the iteration depth.  Participants explored significantly more animations and had longer lengths of iteration with LogoMotion over the baseline.
                            
                            
                            </p>
                    </div>



                


                </div>

                <h3 class="logomotion_header"> User Study Outputs </h3>
                <hr></hr>

                <br></br>



                <UserStudyCarousel></UserStudyCarousel>
                
                <h3 class="logomotion_header">LogoMotion Archive</h3>
                <hr></hr>
                <br></br>
                LogoMotion was run hundreds of times, but the prompting pipeline changed over time. Here are some examples from past iterations of LogoMotion. We experimented with having LogoMotion animate social media posts, showing that LogoMotion can extrapolate beyond logo animation.
                </div>

                <br></br>

            </p>
            <Carousel2></Carousel2>

            <hr></hr>

            <Bibliography/>



            





        </div>

    );
};

export default LogoMotionProjectPage;