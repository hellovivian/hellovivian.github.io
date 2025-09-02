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


const items = [
    { src: './logomotion_gifs/chess1.gif', alt: 'Chess' },
    { src: './logomotion_gifs/lantern1.gif', alt: 'Lantern' },
    { src: './logomotion_gifs/cat1.gif', alt: 'Cat' },
    { src: './logomotion_gifs/warrior1.gif', alt: 'Warrior' },
    { src: './logomotion_gifs/acapella1.gif', alt: 'Acapella' },
    { src: './logomotion_gifs/adventure1.gif', alt: 'Adventure' },
    { src: './logomotion_gifs/crab1.gif', alt: 'Crab' },
    { src: './logomotion_gifs/tennis1.gif', alt: 'Tennis' },
    { src: './logomotion_gifs/tacos1.gif', alt: 'Tacos' },
    { src: './logomotion_gifs/circus1.gif', alt: 'Circus' },
  ];



  const items2 = [
    { src: './logomotion_gifs/stars.gif', alt: 'Stars' },
    { src: './logomotion_gifs/dj.gif', alt: 'DJ' },
    { src: './logomotion_gifs/lax.gif', alt: 'LAX' },
    { src: './logomotion_gifs/kundera.gif', alt: 'Kundera' },
    { src: './logomotion_gifs/tools.gif', alt: 'Tools' },
    { src: './logomotion_gifs/skull.gif', alt: 'Skull' },
  ];



  const userStudyItems = [
    { src: "./logomotion_gifs/user_study_example_pipe.gif", alt: 'Pipe' },
    { src: "./logomotion_gifs/userstudy_example_dino.gif", alt: 'Dino' },
    { src: "./logomotion_gifs/userstudy_example_manta.gif", alt: 'Manta' },
    { src: "./logomotion_gifs/user_study_example_sweethome.gif", alt: 'Sweet Home' },
  ];
  
  const GridGallery = () => (
    <div className="grid-container">
      {items.map((item, index) => (
        <div className="grid-item" key={index}>
          <img src={item.src} alt={item.alt} />
        </div>
      ))}
    </div>
  );

  const MiscGallery = () => (
    <div className="grid-container">
      {items2.map((item, index) => (
        <div className="grid-item" key={index}>
          <img src={item.src} alt={item.alt} />
        </div>
      ))}
    </div>
  );

  const UserStudyGallery = () => (
    <div className="grid-container">
      {userStudyItems.map((item, index) => (
        <div className="grid-item" key={index}>
          <img src={item.src} alt={item.alt} />
        </div>
      ))}
    </div>
  );





const LogoMotionProjectPage = () => {
    return (

        <div class="paper-container" >
            <Navigation />
            <h3 id="title">LogoMotion: Visually-Grounded Code Synthesis for Creating and Editing Animation</h3>
            <p class="paper_authors">Vivian Liu, Rubaiat Habib Kazi, Li-Yi Wei, Matthew Fisher, Timothy Langlois, Seth Walker, Lydia Chilton</p>
            <p class="paper_affiliations">Columbia University, Adobe Research</p> <br></br>

            <GridGallery class="logomotion-grid-carousel"></GridGallery>

            {/* <Carousel class="logomotion-example-carousel"></Carousel> */}

            <p class="paper_abstract">
                <h3 class="logomotion_header"> Abstract </h3>
                <hr></hr>
                Creating animation takes time, effort, and technical expertise. To help novices with animation, we present LogoMotion, an AI code generation approach that helps users create semantically meaningful animation for logos. LogoMotion automatically generates animation code with a method called visually-grounded code synthesis and program repair. This method performs visual analysis, instantiates a design concept, and conducts visual checking to generate animation code. LogoMotion provides novices with code-connected AI editing widgets that help them edit the motion, grouping, and timing of their animation. In a comparison study on 276 animations, LogoMotion was found to produce more content-aware animation than an industry-leading tool. In a user evaluation (n=16) comparing against a prompt-only baseline, these code-connected widgets helped users edit animations with control, iteration, and creative expression.

                
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
                      Motion suggests life. <a href="https://pubmed.ncbi.nlm.nih.gov/33678806/">[1]</a> Motion designers use animation to signal change, suggest relationships between objects, convey personality, and connect objects to the actions and activities they take on in the real world. They make cars drive, bumblebees fly, and stars twinkle, because people have visual expectations for how these objects should move. The dynamics of animation can further communicate meaning. A delivery truck driving in fast onto the screen can symbolize speedy service; the way a circle vertically moves can symbolize something as gentle as a sunrise or something as playful as a bouncing ball. Animation is delightful when it is semantically meaningful: when it <em>"reflects and reinforces the semantic relationships"</em> between design elements <a href="https://alistapart.com/article/ui-animation-and-ux-a-not-so-secret-friendship/#section4">[2]</a>.


                        {/* Authoring an animated logo is challenging. Logos are often more than just a pairing of icon with text. Because they can have different layouts, layers, color, and typography, they can take on great variety and be complex artifacts to animate. For a novice designer, it can be difficult to understand which design elements should be animated, in what sequence, and how to build up compelling and believable motion. */}
                

                    
                        {/* Large language models (LLMs) present the potential for <em>content-aware</em> animation. They can generate animation code that is specific to the design elements and their layout on the canvas. Because LLMs encode a vast amount of world knowledge, they can draw upon actions and activities related to the content being animated and generate a near infinite number of animations. This open-ended generative capacity can go beyond the scope of what existing animation approaches (e.g. templates and presets) usually cover. */}



                    </div>
                
                </div>


                      Currently, creating semantically meaningful animation is difficult for novices. Professional tools like After Effects allow this, but they can require technical expertise and fine-grained editing that can be time consuming. End-user animation tools such as Canva and Adobe Express are popular with novice designers and provide support for animation. However, their animation tools are largely based on animation presets and templates. Generative AI can move beyond rigid and rule-based systems like templates and presets to provide more flexible means of creation.  AI can generate animation code that is more complex and expressive than presets. Furthermore, AI has the multimodal capability to perform visual analysis and understand the semantics of an image, such as what each element depicts and what role each element plays on the canvas. We leverage these capabilities within LogoMotion.
                      
                      {/* For example, an AI can visually analyze that the skier in the logo (Fig. 1-A) is the primary element and that there are a group of mountains. Using this analysis, it can come up with a design concept ("have the skier ski in from the left and do a flip into place, the mountains rise in, and the text enter as the skier lands") and implement code executing that concept. We call this <strong>visually-grounded code synthesis</strong>, a method that performs visual analysis and instantiates a design concept to guide the AI implementation of animation code. However, AI-generated code can have errors, and AI approaches should help users fix the errors they create. We introduce <strong>visually-grounded program repair</strong> to run AI-generated code, visually inspect the animation result for errors ("skier position is off"), and let the AI automatically debug itself. Together, visually-grounded code synthesis and repair generate an animation that is semantically meaningful to the logo design (Fig. 1-G). */}

                        <br></br> <br></br>


                      {/* Although this automatic logo animation approach often generates good results by itself, users should be able to edit and perfect it. Prompt-based editing of code has potential but can lack the control necessary for editing animation. A prompt can regenerate the entire animation code, change parts the user likes, or introduce new errors as the AI tries to fulfill the user's desired edit. To offer users more control over the editing of generated code, we introduce <strong>code-connected AI editing widgets</strong>. LogoMotion's editing UI contains familiar animation editing widgets such as a timeline, a layer panel, and quick actions ("more subtle", "faster", "synchronize timing"). When the user interacts with these widgets, LogoMotion translates the GUI interaction into targeted edits over the code corresponding to the motion, grouping, and timing of the animation. These code-connected AI editing widgets let users gain the expressiveness and controllability of a code representation while having a visual representation that lets them focus on the creative aspects of editing. */}

                  

                      <br></br><br></br>





                <h3 class="logomotion_header"> LogoMotion Overview </h3>
                <hr></hr>

                <img class="paper_figure logomotion_figure" src="./images/logomotion/logomotion_rr_figure.jpg">
                </img>
                <br></br>

                LogoMotion is an AI code generation and editing tool that helps novices create semantically meaningful animation for logos. LogoMotion automatically generates animation code for a logo design using <strong>visually-grounded code synthesis and program repair</strong>. This method takes in a logo as input and generates an HTML page and animation code as output. Visually-grounded code synthesis performs visual analysis, instantiates a design concept, and conducts visual checking to generate animation code. The animation that executes on the page is semantically meaningful to the logo design. For example, a skier element can ski in from the left and do a flip, and the title text can pulse as the skier lands. Two technical evaluations showing that 1) in comparison study of 276 animations, visually-grounded code synthesis produces more semantically meaningful animations than an industry-leading animation tool, 2) visually-grounded program repair can solve 96% of detected errors within four attempts.
                
                <br></br><br></br>
                Novices can customize this animation using <strong>code-connected AI editing widgets</strong> such as a narrative timeline, layer panel, and quick actions. These code-connected widgets implement edits to motion, grouping, and timing of their animation by doing targeted regeneration of the underlying code. For example, a user can edit the skier to have a different hero moment (e.g. skier skis in diagonally as if on a slope) or synchronize the timing of the mountains and line elements with the skier's entrance.  A user study (n=16) comparing with a prompt-only baseline showed that code-connected AI widgets helped users edit with control, iteration, and creative expression.  We conclude with a discussion of how LogoMotion's methods of combining code representations with visual understanding and code-connected widgets can apply to other design tasks beyond logo animation.



                
{/* gain the expressiveness and controllability of a code representation while having a visual representation that lets them focus on the creative aspects of editing */}


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
                We conducted three evaluations to understand the quality of our LLM system: 1) a comparison study against an industry standard and baseline informed by professional animated logo designers 2) an empirical analysis of program repair testing different experimental settings, 3) an evaluation with novices to understand LogoMotion's capacity for customization. These evaluations are centered around the following research questions:

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
                <UserStudyGallery class="logomotion-grid-carousel"></UserStudyGallery>


                

                <h3 class="logomotion_header">Discussion</h3>

                 <hr></hr>
                {/* We have introduced LogoMotion, a VLM-powered code generation approach that helps users create semantically meaningful animation using 1) visually-grounded code synthesis and repair and 2) code-connected editing widgets. We now discuss how the merits of these contributions and how they generalize beyond logo animation.  */}


                <br></br>


                <strong>Strengths of Visually-Grounded Code Synthesis and Repair. </strong> 
                Visually-grounded code synthesis is powerful because it unlocks how code generation approaches can be guided by an AI's ability to analyze images. LogoMotion shows how to do this by building an HTML representation that is visually aware of what is on the canvas. The HTML representation reflects the visual hierarchy of the elements in the image and captures grouping information in the code hierarchy organization. LogoMotion demonstrates how a VLM can be applied to understand layer content, automatically make groups, and update the HTML representation when users interact with a layers panel. This is relevant to design tools such as Adobe Illustrator and Figma, where users engage with hundreds of layers and groups. LogoMotion shows how an AI approach can solve classic painpoints like layer organization and group layers for users. 
                {/* Secondly, LogoMotion shows how a code generation approach can help animation tools move beyond templates and presets approaches and more towards semantically meaningful animation.  */}
                {/* Visually-grounded code synthesis can also extend to other creative tasks like slide creation (where visual hierarchy and grouping is key) or text animation (where the motion must match the semantic meaning of the text).  */}

                {/* <br></br><br></br> */}

                {/* LogoMotion's visually-grounded program repair mechanism can also be effective for many other tasks where code renders visual output such as UI mockups, front-end prototyping, and game design. For example, if a UI prototype is generated from a visual mockup, it can be checked for if whether components meet the visual specification of the mockup. Furthermore, for this checking process to be able to isolate visual differences, visual reflection has to be able to support different "beams of focus". LogoMotion shows how to implement visually-grounded program repair with a layer-wise beam of focus and effectively solve 96% of detected errors within four attempts.  */}
                {/* Though in LogoMotion we only checked the last frame of the animation against the target layout, in future work, we can check intermediate frames of animation to build a deeper understanding of motion. */}

                <br></br><br></br>
              
                <strong>Strengths of Code-Connected AI Editing Widgets. </strong> Code-connected AI editing widgets allow users to enjoy the benefits of a code representation (controllability, greater expressive range) without having to engage with the technical details of implementation. Each time the animation was edited, the AI implementation would automatically produce a well-eased and smooth animation, without requiring any tedious manipulation of timestamps or fine-grained editing that is common with traditional tools. LogoMotion's timeline widget allowed users to pair the expressiveness gained from prompts with the other modes of controls that come from GUIs (e.g. selection, reordering, drag-and-drop). These code-connected AI widgets are new components that open up interactions beyond the standard chatbot paradigm.
                
                {/* The narrative timeline that we introduce is also a novel improvement upon traditional timelines, which are not capable of describing the events that take place within their keyframes and blocks. Narrative timelines can generalize to other design tasks such as video editing. Overall,  */}

                <br></br><br></br>

                {/* <strong>Semantic vs. Specific Controls for Animation Editing. </strong> */}

{/* Furthermore, in language it is easier to have conceptual reach and to divergently explore animations.  */}
            {/* LogoMotion allowed us to explore when it is best to support users with generative, semantic-based controls (prompts), when it is best to support users with granular specific controls (timelines), and when there are opportunities to bind these two types of controls together within an interface. The obvious benefit of semantic controls is that it opens up animation to novices--expressing animation is as simple as expressing a thought or story.  */}
            
            LogoMotion opens up animation to novices--expressing animation is as simple as expressing a thought or story. Participants used properties of language like metaphors (<em>"gentle baby walk"</em>) and action description (<em>"swimming as if fighting against a current" </em>) to create a visual message. However, language as the sole mode of expression is insufficient--it lacks the control necessary for animation, which has many dimensions that rely on perceptual feel such as timing, dynamics, and synchronization. These aspects are hard for users to find the language for. A novice can write that one object should be faster than another, but by how much? What does it mean for two elements to "come in together"? Quickly, it becomes unwieldy to find the right balance between underspecification and overspecification in natural language. LogoMotion's code-connected components allowed users to divert many of these editing goals to GUI interactions that are second nature (e.g. interacting with a timeline). Overall, LogoMotion showed how prompts and precise GUI controls can pair together to span the different levels of abstraction necessary for animation editing.
            
            {/* At the same time, LogoMotion demonstrated how semantic and specific controls can be paired together to regenerate the underlying code. Pairing prompts to blocks on the narrative timeline by selection helped ground semantic intents in aspects of the code, supporting local exploration with constraints such as what elements were being targeted or what snippet of the underlying code should be edited. Overall, LogoMotion showed how semantic and specific controls can be integrated within an interface to span the different levels of abstraction necessary for animation creation and iteration. */}


            {/* <h4>
              Limitations and Future Work
              </h4>

            We discussed LogoMotion outputs with professional motion designers, who provided insights about LogoMotion's limitations. While  of quality, LogoMotion does not produce animations that are on a professional level. The animations do not at a meta-level guide the viewer's eye. The animations also often unevenly apply fundamental principles of animation. They mentioned how the the design concept could excessively apply overlapping action and could miss the opportunity to create complex interactions between groups. LogoMotion also does not support complex motion paths, morphing, and physics-based animation. We made efforts to explore path motion but found that it was hard to integrate an SVG path defined outside of the design concept into the generated code. Motion paths that can define primary and secondary motion, incorporate richer curved motion, and open up the opportunity for direct manipulation represent an important next step. 
            <br></br><br></br>

Another limitation is that LogoMotion scoped around logos. To focus on creating semantically meaningful animation, we made design decisions specific to logos (e.g. there is generally one hero element that should get more emphasis in the animation). However, other formats have different motion design principles. We experimented with having LogoMotion animate social media posts as well as a few webpages. We found that in these formats where there is more text, the animation had to be more subtle to balance readability and advertisement. This helped further establish the importance of having layer panel interactions and quick actions (Synchronize, Make Subtle). To adapt to other domains like CSS animation or vector animation, LogoMotion would likely have to adapt to generate and check on color and shape change. It is possible that the focus on the entrance description and use of the word "motion" predisposed LogoMotion to animate in terms of motion rather than these other properties. 
 */}

            {/* <h3>Conclusion</h3>
            <hr></hr>


LogoMotion presents an VLM-powered tool that allows users to automatically and interactively animate logos and create semantically meaningful motion. Its approach has three stages:  visually-grounded code synthesis, visually-grounded program repair, and code-connected widgets. Within this editor, a narrative timeline, layer panel, and quick actions helped users edit for motion, grouping, and timing of their animation. We show in evaluations that LogoMotion outperforms a state-of-the-art industry tool at producing animation that is relevant to its design elements. LogoMotion was found to be expressive and enjoyable for novices to create and edit logo animation.
 */}


                <h3 class="logomotion_header">LogoMotion Archive</h3>
                <hr></hr>
                <br></br>
                LogoMotion was run hundreds of times, but the prompting pipeline changed over time. Here are some examples from past iterations of LogoMotion. We experimented with having LogoMotion animate social media posts, showing that LogoMotion can extrapolate beyond logo animation.
                </div>

                <br></br>

            </p>
            <MiscGallery class="logomotion-grid-carousel"></MiscGallery>


            <hr></hr>

            <Bibliography/>



            





        </div>

    );
};

export default LogoMotionProjectPage;