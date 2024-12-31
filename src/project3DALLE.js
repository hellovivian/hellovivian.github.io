// project3DALLE.js
import './App.css';
import './3DALLE.css';


import React from 'react';
import Navigation from './components/Navigation';
import LineDivider from './components/LineDivider';

const Bibliography = () => {
  const references = `
    @misc{Liu20233DALLE,
      title={3DALL-E: Integrating Text-to-Image AI in 3D Design Workflows}, 
      author={Vivian Liu and Jo Vermeulen and George Fitzmaurice and Justin Matejka},
      year={2023},
      eprint={2210.11603},
      archivePrefix={arXiv},
      primaryClass={cs.HC},
      url={https://arxiv.org/abs/2210.11603}, 
}
  `;
  return (
    <div id="bibliography">
      <pre>{references}</pre>
    </div>
  );
};


const ProjectPage3DALLE = () => {
  return (
    <div>
        
     <Navigation />

      <h3>3DALL-E: Integrating Text-to-Image AI in 3D Design Workflows</h3>
      <h4 class="paper_authors">Vivian Liu, Jo Vermeulen, George Fitzmaurice, Justin Matejka</h4> <br></br>

      <img class="paper_figure" src="./images/3DALLE/3DALLE_teaser.png"/><br></br>

      <p class="paper_abstract">

      <strong>Abstract.</strong> Text-to-image AI are capable of generating novel images for inspiration, but their applications for 3D design workflows and how designers can build 3D models using AI-provided inspiration have not yet been explored. To investigate this, we integrated DALL-E, GPT-3, and CLIP within a CAD software in 3DALL-E, a plugin that generates 2D image inspiration for 3D design. 3DALL-E allows users to construct text and image prompts based on what they are modeling. In a study with 13 designers, we found that designers saw great potential in 3DALL-E within their workflows and could use text-to-image AI to produce reference images, prevent design fixation, and inspire design considerations. We elaborate on prompting patterns observed across 3D modeling tasks and provide measures of prompt complexity observed across participants. From our findings, we discuss how 3DALL-E can merge with existing generative design workflows and propose prompt bibliographies as a form of human-AI design history.
     
      </p>

      <h3> Motivation </h3>
      <LineDivider />

      <p class="paper_abstract">
      Designing CAD is so challenging because while working in 3D, designers have to satisfy a number of functional and aesthetic goals, while also maintaining feasibility. Coming up with ideas takes a lot of exploration, even for expert designers, so they often consult external resources for inspiration on how to define their geometry. They browse 3D model repositories, video tutorials, and use image search to understand conventional designs and different aesthetics. 
      This process of conceptualizing CAD designs is pivotal to the product design process, yet few computational methods support it.

      </p>

      <p class="paper_abstract">
        
         3DALL-E explores: 1) text-to-image AI can assist 3D designers with conceptual CAD and design inspiration, 2) where in creative workflows designers can most benefit from AI assistance, and 3) how text-to-image tools respond to image prompts sent from 3D designers as they build up complexity in their designs. 
      </p>

      {/* <p class="paper_abstract">

        Our contributions are the following:
        
        <ul>
          <li>
          3DALL-E, a plugin that generates AI-provided image inspiration for CAD and product design by helping users craft text prompts with design language (different parts, styles, and designs for a 3D object) and image prompts connected to their work in progress.
          </li>
          <li>
          An exploratory user study (n=13) demonstrating text-to-image AI use cases in 3D design workflows and an analysis of prompting patterns and prompt complexity.
          </li>
        </ul>
      </p> */}

      <h3> System Design </h3>
      <LineDivider />

      <p class="paper_abstract">
        We integrated three large AI models---DALL-E, GPT-3, and CLIP---within Fusion 360, an industry standard software for computer-aided design (CAD). 3DALL-E is a plugin helps translate a designer's goals into multimodal (text and image) prompts which can produce image inspiration for them.
      </p>

      <p class="paper_abstract">
      A designer inputs their goals (i.e. to design a "truck"). The plugin then provides a number of related parts, styles, and designs that help users craft text prompts. These suggestions are drawn from the world knowledge of GPT-3 to help users familiarize themselves with relevant design language and 3D keywords that can better specify the text prompt. The plugin interactively updates an image preview from the software viewport that shows an image prompt which can be passed into DALL-E, giving users a direct bridge between their 3D design workspace and an AI model that can generate image inspiration. Additionally, having a lens on what the designer is actively working on allows the plugin to highlight what prompt suggestions may work best, which is implemented in the system by using CLIP to approximate model knowledge. 

      </p>
      <img class="paper_figure" src="./images/3DALLE/3DALLE_sys.png"/>
      <br>
      </br>

      {/* <img class="paper_figure" src="./images/3DALLE_sys2.png"/><br></br> */}

      <h3> User Evaluation </h3>
      <LineDivider />
      

      <div class="two-column">
        <div class="left_column">
            <img class="" src="./images/3DALLE/3DALLE.gif">
            </img>
        </div>
        <div class="right_column">
          <p class="paper_abstract">
          To evaluate 3DALL-E and how well it can integrate into 3D workflows, we conducted a user study with thirteen users of Fusion 360 who spanned a variety of backgrounds from industrial design to robotics. We found that 3DALL-E can benefit CAD designers as a system that supports conceptual CAD, helps prevent design fixation, produces reference images, and inspires design considerations. 
          </p>
        </div>
      </div>

      <p class="paper_abstract">
      We wanted to understand the following research questions.
      
        <ul>
          <li>
          <strong>RQ) Generation Patterns within Workflows.</strong> Are there certain patterns to how CAD designers use text-to-image generations within their workflows, and do these patterns differ depending upon the 3D modeling task?
          </li>
          <li>
          <strong>RQ) Assisted Prompt Construction.</strong> How helpful are different features (prompt suggestions, CLIP highlighting, automatically captured viewport images) for the construction of text and image prompts?
          </li>
          <li><strong>RQ) Prompt complexity. </strong>How many concepts do people like to put within prompts?
          </li>
        </ul>
      </p>

      





      <p class="paper_abstract">
      We looked at two settings of 3D design tasks: creating from scratch <emphasize>(T-create) </emphasize>and editing an existing model <emphasize>(T-edit)</emphasize>. The intention of having these two tasks was to show how 3DALL-E might affect creative workflows at different stages of the 3D modeling process. We found that there were three types of patterns of AI assistance for 3D design workflows that appeared in both T-create and T-edit. 
      </p>

      

      <h3> Qualitative Findings </h3>
      <LineDivider />
      
    
      
      <p class="paper_abstract">
      We instrumented 3DALL-E to log whenever a user used the AI capabilities and whenever they started and stopped modelling in Fusion. What you can see in the Gantt chart below is a rough timeline of each participant’s workflow with 3DALL-E during the study.

      <img class="paper_figure" src="./images/3DALLE/3DALLE_patterns_b.png"/> <br></br>


      <strong>Patterns of AI Assistance: AI-first, AI-last, AI-throughout.</strong>
      One of the most salient ways to distinguish participants was at which points in their workflow they took to 3DALL-E and at which points they focused on Fusion 360.
      <ul>
      <li>Some participants were <strong>AI-first</strong>, meaning they tended to sift through AI generations first until they had a better grasp of its abilities or until they found a design that they liked before taking any significant 3D design actions. </li>
      
      <li>The <strong>AI-last</strong> pattern occurred when participants jumped straight into their existing workflows for 3D design and tried 3DALL-E later. We see this in the rows of Gantt chart that start off with orange bars, which indicate that participants started modeling from the get-go of the task. </li>

      <li>
      Participants also queried <strong>AI-throughout</strong>. Many participants would intermittently craft an image prompt by briefly working within Fusion 360 and then start generating. Participants wanted to see the different ways their CAD work in progress could be autocompleted.  

      </li>
      <li>
      Participants liked to use text prompts to take them towards new directions at any point of their workflow. This is evidenced by the purple diamonds in the Gantt chart. This shows how AI assistance can help break design fixation, which is problem within CAD and other design disciplines that involve the details of direct manipulation.

      </li>

      </ul>

      
      <em> "A lot of times designers get stuck, they get tunnel vision...the folks at [toy design company] used to say to me, ``We can't come up with enough designs...it takes too long to come up with a design, so then we only get two or three...we would like to see thousands of design options and variations...the [designer's] goal is to start throwing as many designs out there as they can. - CAD Professional Participant </em> <br></br><br></br>

      Many participants described constraints text-to-image generations would need to follow to be useful as reference images. <em>"I would probably need at least three images: top, side, and front view to even understand it three-dimensionally...that's what a designer would pass to an engineer to then build it. I would try to force it [3DALL-E] to create a top view, side, front view that are somehow matching."</em> <br></br><br></br>

      Participants further described use cases such as creating product design presentations that show the function or interaction of the 3D design in action or applying materials and textures based on the appearance of the design in the generations. 
      
      </p>

      <h3> Participant 3D Design Workflows </h3>
      <LineDivider />

      

      {/* <img class="paper_figure" src="./images/3DALLE/3DALLE_patterns_a.png"/> <br></br> */}
    
      <img class="paper_figure" src="./images/3DALLE/3DALLE_fullworkflows.png"/><br></br>

      <p class="paper_abstract">
      Here are examples of participant CAD workflows that illustrate these patterns. <br></br>
      
      <ul>
        <li>The leftmost column shows an AI-last pattern, where the user explored a number of different design options conceptually before doing any CAD.</li>
        <li>The middle column shows the user sending in image prompts with their current design to find ways to autocomplete the middle portion of the sound speaker they were designing. </li>
        <li>The rightmost column shows how a user first generated to see how the AI would adapt their existing model first before finding an area of the model they wanted to refine further (e.g. the wheel / tank drive of their robot).</li>
      </ul>
       
      
      </p>

      
      <h3> Prompt Bibliographies </h3>
      <LineDivider/>
      <p class="paper_abstract">
      In our discussion, we propose prompt bibliographies, a concept of human-AI design history to track inspiration from text-to-image AI.
      </p>
      

       

      <img class="paper_figure" src="./images/3DALLE/3DALLE_promptbib.png"/><br></br>

      <LineDivider/>

      <Bibliography /> 

    </div>
  );
};

export default ProjectPage3DALLE;