// project3DALLE.js
import './App.css';
import './3DALLE.css';

import Grid from '@mui/material/Grid';
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
    <div class="paper-container">
        
     <Navigation />

      <h3>3DALL-E: Integrating Text-to-Image AI in 3D Design Workflows</h3>
      <h4 class="paper_authors">Vivian Liu, Jo Vermeulen, George Fitzmaurice, Justin Matejka</h4>
            <h4 class="paper_authors">DIS 2023</h4> 

      <div class="flex_row">

        <div class="button"> <a href="https://www.research.autodesk.com/app/uploads/2023/08/3DALL-E_DIS23-v2-compressed.pdf">Paper </a></div>
        <div class="button"> <a href="https://www.youtube.com/watch?v=c45gIiAEWZU&ab_channel=VivianL">Video </a></div>
        <div class="button"> <a href="https://patents.google.com/patent/US20240104275A1/en">Patent </a></div>
      

      </div>
      <div class="flex_row">


        <div class="button"> <a href="https://www.autodesk.com/products/fusion-360/blog/project-salvador-autodesk-fusion-app-store/">Tech Transfer in Product</a></div>
                <div class="button"> <a href="https://www.youtube.com/watch?v=vsewugyXYXI&ab_channel=MichiganEngineering">Highlight in AI & Human Values Lecture</a></div>

      </div>
            


      <img class="paper_figure" src="./images/3DALLE/3DALLE_teaser.png"/><br></br>

      <p class="paper_abstract">

      <strong>Abstract.</strong> Text-to-image AI are capable of generating novel images for inspiration, but their applications for 3D design workflows and how designers can build 3D models using AI-provided inspiration have not yet been explored. To investigate this, we integrated DALL-E, GPT-3, and CLIP within a CAD software in 3DALL-E, a plugin that generates 2D image inspiration for 3D design. 3DALL-E allows users to construct text and image prompts based on what they are modeling. In a study with 13 designers, we found that designers saw great potential in 3DALL-E within their workflows and could use text-to-image AI to produce reference images, prevent design fixation, and inspire design considerations. We elaborate on prompting patterns observed across 3D modeling tasks and provide measures of prompt complexity observed across participants. From our findings, we discuss how 3DALL-E can merge with existing generative design workflows and propose prompt bibliographies as a form of human-AI design history.
     


      </p>
      <br></br>

      <h3> Motivation </h3>
      <LineDivider />

      <div class="flex_row">
        <img class="trifold_img" src="./images/3DALLE/3dalle_motivation1.png"></img>
        <img class="trifold_img" src="./images/3DALLE/3dalle_motivation2.png"></img>
        <img class="trifold_img" src="./images/3DALLE/3dalle_motivation3.png"></img>
      </div>
      <div class="flex_row">

        <a class="src-link" href="youtube.com/watch?v=3IZFQPCuZSk">[Src 1]</a>
        <a class="src-link" href="https://grabcad.com/library">[Src 2]</a>
        <a class="src-link" href="https://as1.ftcdn.net/jpg/03/21/03/42/1000_F_321034269_Ceha0k0brx3SrRmmLbUtikd0OnTWtGCv.jpg">[Src 3]</a>

      </div>
      
      
      <p class="paper_abstract">

  

      CAD is a highly complex design activity. Designing CAD is challenging because while working in 3D, designers have to satisfy a number of functional and aesthetic goals, while also maintaining feasibility. Furthermore, it usually involves a significant amount of conceptual design, as later stages of prototyping can incur material costs. Coming up with ideas takes a lot of exploration, even for expert designers, so they often consult external resources for inspiration on how to define their geometry. In these early stages, designers gather inspiration from external sources like 3D model repositories (e.g. Onshape, Google Poly), video tutorials, and reference images to understand conventional designs and different aesthetics.
      
      
      
      </p>
      <p>
        Because CAD evolved in part from 2D drafting, CAD often relies on 2D representations such as freehand drawing and computer-assisted sketches [34, 45, 46]. Users operate over these 2D representations (sketch profiles and planes) to apply constraints and dimensions and to take their models into 3D using operations such as extrusion, lofting, revolving and so on [34]. It has been found that early stage CAD and product design “tends to be ambiguous, incomplete, and expressive with high levels of uncertainties” <a href="https://www.research.autodesk.com/publications/dreamsketch-early-stage-3d-design-explorations-with-sketching-and-generative-design/">[src]</a>, and there is less focus on constraints and parameters. Conceptual CAD also can involve text and image exploration; mechanical engineers perform system decomposition to understand model needs, and industrial designers collect moodboards and perform market research. <strong>
        This process of conceptualizing CAD designs is pivotal to the product design process, yet few computational methods support it.  
      </strong>
     
      </p>
      

      <p class="paper_abstract">
        
         3DALL-E explores: 
         <ul>
          <li>How can 3D designers leverage text-to-image AI for support in computer-aided design (CAD)?</li>
          <li>Where in creative workflows can designers most benefit from AI assistance: at what stages and for what tasks?</li>
          <li>How do 3D designers and AI models respond to AI inpainting and image prompts as a method for representing and updating the the design being mutually built off of?  </li>
         </ul>
      </p>

      <p>
        While text-to-3D approaches also exist and can efficiently generate scene, voxel, pointcloud, and mesh 3D geometries to work with, this can start designers off at an unfamiliar stage in their workflow -- with a medium or high fidelity geometry they might not know how to edit, or with a representation they do not usually use for CAD. To support conceptual CAD from the earliest stages possible, we investigate text-to-image rather than text-to-3D in 3DALL-E as the starting point for AI-provided inspiration. 
      </p>

      <div class="flex_row">

      <img class="trifold_img" src="./images/3DALLE/prosthetic.png"></img>
      <img class="trifold_img" src="./images/3DALLE/butterfly_chair.png"></img>
      <img class="trifold_img" src="./images/3DALLE/robot_gripper.png"></img>
      </div>
      <div class="flex_row">

        <p>DALL-E: Low poly 3d model of a prosthetic hand with screwdrivers as fingers
          </p>
      <p>DALL-E: 3d model of a butterfly chair in a contemporary style</p>
      <p>DALL-E: Fusion 360 and low poly can be used to create an S-shaped robot gripper</p>

      </div>

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
        We integrated three large AI models---DALL-E, GPT-3, and CLIP---within Fusion 360, an industry standard software for computer-aided design (CAD). 3DALL-E is a plugin helps translate a designer's goals into multimodal (text and image) prompts which can produce image inspiration for them. As input it takes in a multimodal prompt (text prompt or image + text prompt containing an image render of the 3D workspace). As output it produces 2D image inspiration for CAD.
      </p>

        {/* <div class="flex_row"> */}
          {/* <img class="paper_figure" src="./images/3DALLE/3dalle_overview.png" /> */}
            <img  class="paper_figuregit " src="./images/3DALLE/3DALLE_system.gif" />


        {/* </div> */}
      


      <p class="paper_abstract">
        A designer inputs their goals (i.e. to design a "truck"). The plugin then provides a number of related parts, styles, and designs that help users craft text prompts. These suggestions are drawn from the world knowledge of GPT-3 to help users familiarize themselves with relevant design language and 3D keywords that can better specify the text prompt. The plugin interactively updates an image preview from the software viewport that shows an image prompt which can be passed into DALL-E, giving users a direct bridge between their 3D design workspace and an AI model that can generate image inspiration. Additionally, having a lens on what the designer is actively working on allows the plugin to highlight what prompt suggestions may work best, which is implemented in the system by using CLIP to approximate model knowledge. 
        

      </p>
      {/* <img class="paper_figure" src="./images/3DALLE/3DALLE_sys.png"/> */}
      <div  class="system_design">
        <img src="./images/3DALLE/sysdesign1.png"/>
      <img src="./images/3DALLE/sysdesign_2.png"/>

      </div>
      

      
      <br>
      </br>

      {/* <img class="paper_figure" src="./images/3DALLE/3DALLE_sys2.png"/><br></br> */}

      <h3> User Evaluation </h3>
      <LineDivider />
      

       <p class="paper_abstract">
          To evaluate 3DALL-E and how well it can integrate into 3D workflows, we conducted a user study with thirteen users of Fusion 360 who spanned a variety of backgrounds from industrial design to robotics. We found that 3DALL-E can benefit CAD designers as a system that supports conceptual CAD, helps prevent design fixation, produces reference images, and inspires design considerations. Additionally, we compared 3DALL-E against <a href="https://www.autodesk.com/solutions/generative-design/manufacturing">existing generative tools for 3D design</a> by speaking with designers that had expertise in a different optimization-based but also generative workflow. 
          </p>
                <img class="paper_figure" src="./images/3DALLE/3dalle-participants.png"></img>


      {/* <p class="paper_abstract">
      We wanted to understand the following research questions.
      
        <ul>
          <li>
          <strong>RQ) Generation Patterns within Workflows.</strong> Are there certain patterns to how CAD designers use text-to-image generations within their workflows, and do these patterns differ depending upon the 3D modeling task?
          </li>
          <li>
          <strong>RQ) Multimodal Prompt Construction.</strong> How helpful are different features (prompt suggestions, CLIP highlighting, automatically captured viewport images) for the construction of text and image prompts?
          </li>
      
        </ul>
      </p> */}

      
      <p class="paper_abstract">
        
      These were guiding research questions:
         <ul>
          <li>How can 3D designers leverage text-to-image AI for support in computer-aided design (CAD)? What use cases did participants derive?</li>
          <li>Where in creative workflows can designers most benefit from AI assistance.  Are there certain patterns to how CAD designers use text-to-image generations
within their workflows, and do these patterns differ depending upon the 3D modeling task?</li>
          <li>How do 3D designers and AI models respond to AI inpainting and image prompts as a method for representing and updating the the design being mutually built off of? Furthermore, how helpful were different features (dimensioned prompt exploration, CLIP highlighting as a form of information scent, and automatically captured viewport images) in scaffolding the multimodal prompting process? </li>
         </ul>
      </p>

      <p class="paper_abstract">
      We looked at two task settings within 3D design workflows: editing an existing model <emphasize>(T-edit)</emphasize> and creating from scratch <emphasize>(T-create / Task A) </emphasize>. The intention of having these two tasks was to show how 3DALL-E might affect creative workflows at different stages of the 3D modeling process. For each task, participants had 30 minutes to work on their model with the assistance of 3DALL-E. After completing each task, participants marked generations in their history that they felt were inspiring and completed a post-task questionnaire, which included NASA-TLX, Creativity Support Index (CSI), and workflow-specific questions. A semi-structured interview was conducted to understand their experience.
      {/* We found that there were three types of patterns of AI assistance for 3D design workflows that appeared in both T-create and T-edit.  */}
      </p>

      <div class="flex_row">

        <img width="50%" src="./images/3DALLE/3dalle_taska.png"></img>
        <img width="50%" src="./images/3DALLE/3dalle_taskb.png"></img>


      </div>


        <br></br>

      <h3> Qualitative Findings: Patterns of AI Assistance in Workflow </h3>
      <LineDivider  />
      <div class="flex_row">
        <img width="50%" src="./images/3DALLE/3dalle_sped_big.gif"></img>
        <img width="50%" src="./images/3DALLE/AI_throughout_nolabel.gif" />
      </div>
      <div class="flex_row">
        <img width="50%" src="./images/3DALLE/p1_presentation.gif"></img>
        <img width="50%" src="./images/3DALLE/AI_last.gif" />
      </div>

      
    
      
      <p class="paper_abstract">
      We instrumented 3DALL-E to log whenever a user used the AI capabilities and whenever they started and stopped modelling in Fusion. What you can see in the Gantt chart below is a rough timeline of each participant’s workflow with 3DALL-E during the study. This allowed us to visualize workflow decomposition and characterize three patterns of AI assistance that appeared in both Task A (edit) and Task B (create): AI-first, AI-throughout, AI-last. 
      {/* These patterns represented salient ways participants engaged in generative  points in their workflow they took to 3DALL-E and at which points they focused on Fusion 360 (orange bars). */}

        <div class="two-column-gantt">

            <img class="workflow_figure" src="./images/3DALLE/3DALLE_patterns_a.png"/> 

            <img class="workflow_figure" src="./images/3DALLE/3DALLE_patterns_b.png"/> 

          
        </div>
       
      {/* <strong>Patterns of AI Assistance: AI-first, AI-last, AI-throughout. </strong> */}



      
      
      <h3>AI-First Workflow</h3>
        <p>Some participants were <strong>AI-first</strong>, meaning they tended to sift through AI generations first until they had a better grasp of its abilities or until they found a design that they liked before taking any significant 3D design actions. </p>
      <div class="flex_row">
        <img width="380px" src="./images/3DALLE/ai_first.jpg" />
        <div>
          
         <p >For example, P18, a technical software specialist with an industrial design background, was trying to make a car. They first began looking
for inspiration for a matchbox car, before diving into prompt suggestions like “sports car”. Text prompts that P18 tried included “a single sports car built like a Lego building block, view from the top.”
and “The Dark Knight Rises: the body of a car as a Lego building set”. They added perspective (“view from the top”) and a number word (“single”) to specify the composition of their generation and tried “The Dark Knight Rises” as a style suggested by 3DALL-E for the query “matchbox car”. After liking one of the resulting generations, P18 used the result as a reference image. For the rest of
the duration of the task, P18 modelled within Fusion 360. P18 first traced over half of the generation like a blueprint before extruding faces to varying heights. They then beveled and chamfered these starting blocks of a car to add ridges and windshields and subtracted material to make room for wheels. They ended by mirroring the half of the car they modeled to create a full symmetrical car.</p>
<p>In this AI-first workflow, AI supported ideation, helping elaborate a blueprint that the expert CAD designer could quickly execute. They could follow the blueprint to their liking-- abstracting out dimensions and constraints they wanted to use.</p>
        </div>
         



      </div>
  


{/* <img class="paper_figure" src="./images/3DALLE/3dalle_p18_still.png"></img> */}


<h3>AI-Throughout</h3>
  <p></p>
<div class="flex_row" >

  <img  src="./images/3DALLE/AI_throughout.png" />
  <div>
     <p>
  Many participants would intermittently craft an image prompt by briefly working within Fusion 360 and then start generating. Participants wanted to see the different ways their CAD work in progress could be autocompleted. We see these actions whenever participants would have a short window of Fusion time that led up to image+text generation (medium blue dots in Fig. 10 and Fig. 11). During these short windows, participants were generally changing their camera perspective or the visibility of different parts in their assemblies.   
</p>

<p>
P13 showed this AI-throughout pattern. They first built up a base for an audio speaker they wanted to design and applied wood and chrome finishes for a Scandinavian design aesthetic. They then tried prompts with lighting elements (e.g. “Isometric Scandinavian minimalism audio speaker with built-in lights”). They built towards a generation they liked for a while, adding details of a speaker cone and applying tessellation and reducing operations to give the speaker body structural texture. Then they began to create image prompts for 3DALL-E to fill in—deleting faces and extrusions or hiding bodies in their geometry. They wanted to see the different ways the middle section of their speaker could be autocompleted.
</p>

  </div>
 

</div>



   
  <h3>AI-Last</h3>
  <div class="flex_row">


    <img width="380px" src="./images/3DALLE/AI-last.png" />

    <div>
      <p>
          P16 was an AI-last participant who already had an existing screwdriver concept in their mind. They began by sketching and extruding a rounded rectangle for the grip of the screwdriver, dimensioning accordingly. They worked on the flat-head tip by extruding a narrow cylinder and lofting the face out to a point. After making a rough model, they tried 3DALL-E with prompts specific to flat-head screwdrivers and used their
      existing modeling progress as an image prompt. P16 commented that 3DALL-E inspired them to consider different handle crosssections (e.g. hexagonal, square) and grooved grips.
        </p>

      <p>The <strong>AI-last</strong> pattern occurred when participants jumped straight into their existing workflows for 3D design and tried 3DALL-E later. We see this in the rows of Gantt chart that start off with orange bars, which indicate that participants started modeling from the get-go of the task. We noted that this happened more often when users defaulted to their existing workflows. </p>
      
    </div>
        

  </div>


     
    <h3>Qualitative Findings -- Use Cases</h3>
    <LineDivider />
    <h4>Breaking out of Design Fixation</h4>
     <p>
      In both task settings, participants liked to use text prompts to take them towards new directions at any point of their workflow. This is evidenced by the purple diamonds in the Gantt chart. This shows how AI assistance can help break design fixation, which is problem within CAD and other design disciplines that involve a lot of fine-grained editing (direct manipulation) that leave less cognitive bandwidth for divergent design directions.

      </p>

        <p>
           <em> "A lot of times designers get stuck, they get tunnel vision...the folks at [toy design company] used to say to me, "We can't come up with enough designs...it takes too long to come up with a design, so then we only get two or three...we would like to see thousands of design options and variations...the [designer's] goal is to start throwing as many designs out there as they can. - CAD Professional Participant </em> <br></br><br></br>

        </p>
        <h4>Generations as Blueprints, Reference Images, Materials, and Textures</h4>
        <div class="flex_row">
          <img width="30%" src="./images/3dalle/imageprompt.png" />
          <img width="70%" src="./images/3dalle/image_prompt2.png" />
        </div>
        <div class="flex_row">
          <img width="50%" src="./images/3dalle/matching_appearances.png"></img>
          <img width="50%" src="./images/3DALLE/3dalle_perspective.png"/><br></br>
        </div>

       
        {/* <div class="flex_row">
       
          
          <p>Here a participant adjusted the appearance of their 3D model to take the suggestion of the generation. </p>

        </div> */}
         <p>
          In the above images, participants used generations as a source of material and form. They used generations as a way to sketch out bio-inspired robot grippers (top left). In the top right, they played with the visibility of different elements in an assembly to see how DALL-E would inpaint and autocomplete a new rendered assembly, as was done with a 3D microphone setup. </p> <br></br>
          <p> In the bottom left, a participant adapted the appearance of their 3D model to match the suggestion of a generation. In the bottom right, a participant used an axial view of an image as a blueprint. </p>
          <p>
          However, many participants also described constraints that text-to-image generations would need to follow to be useful as reference images. <em>"I would probably need at least three images: top, side, and front view to even understand it three-dimensionally...that's what a designer would pass to an engineer to then build it. I would try to force it [3DALL-E] to create a top view, side, front view that are somehow matching."</em>

        </p>
        
        <h4>Renders of Design in Use</h4>

        <div class="flex_row">
              <img width="30%" src="./images/3dalle/shelf_with_plants.png">
          </img>
          <img src="./images/3dalle/active_chair.png">
          </img>
      
        </div>
     
        
        <p>
          Participants further described use cases such as creating product design presentations that show the function or interaction of the 3D design in action. For example, a shelf was inpainted to have plants and a unrealized chairs were shown in a hospital setting to do product design within a context.


        </p>
     

      
      </p>

      <h3>Quantitative Findings</h3> 
      <LineDivider />

        <img class="paper_figure"  src="./images/3DALLE/nasatlx.png"></img><br></br>
        <img class="paper_figure"  src="./images/3DALLE/creativitysupport.png"></img><br></br>
        <img class="paper_figure"  src="./images/3DALLE/workflow.png"></img>

        <img class="paper_figure" src="./images/3DALLE/promptcomplexity.png"/><br></br>
        <p> It can be challenging for an end user to understand how lengthy or
detailed a text-to-image prompt should generally be, which is why we studied prompt complexity with 3DALL-E. Because prompts were chosen through a faceted approach along three dimensions (conventional design, 3D parts, style keywords and modifiers) and then reworded using GPT-3, we wanted to see how many concepts participants wanted to focus on in each 3DALL-E iteration. Prompt complexity was measured across participants, where complexity is the count of concepts in each text-only and image+text prompt. Participants span the X-axis, sorted by the count of their most complex prompt. The values are jittered to show multiplicity; many prompts mapped to the same number of concepts. Complexity tended to concentrate between two to six concepts, as seen by the density of prompts within that interval. Each datapoint was colored based on prompt task.
        </p>

      

      <h3> Participant 3D Design Workflows </h3>
      
      <LineDivider />
       
      

      {/* <img class="paper_figure" src="./images/3DALLE/3DALLE_patterns_a.png"/> <br></br> */}
    
      <img class="paper_figure" src="./images/3DALLE/3DALLE_fullworkflows.png"/><br></br>

      <p class="paper_abstract">
      {/* Here are examples of participant CAD workflows that illustrate these patterns. <br></br> */}
      
      {/* <ul>
        <li>The leftmost column shows an AI-last pattern, where the user explored a number of different design options conceptually before doing any CAD.</li>
        <li>The middle column shows the user sending in image prompts with their current design to find ways to autocomplete the middle portion of the sound speaker they were designing. </li>
        <li>The rightmost column shows how a user first generated to see how the AI would adapt their existing model first before finding an area of the model they wanted to refine further (e.g. the wheel / tank drive of their robot).</li>
      </ul>
        */}
      
      </p>

      
      <h3> Prompt Bibliographies </h3>
      <LineDivider/>
      <p class="paper_abstract">
      In our discussion, we propose prompt bibliographies, a concept of human-AI design history to track inspiration from text-to-image AI.
      </p>
      <img class="paper_figure" src="./images/3DALLE/3DALLE_promptbib.png"/><br></br>


      <h3>Community Creations </h3>
      3DALL-E was tech-transferred to Fusion 360 as Project Salvador, meaning there is a production-ready version that the public can use. Here are some creations people have made with the assistance of Project Salvador.
      
      <LineDivider />
      <div class="flex_row">
        <img src="./images/3DALLE/cow.png"/>
        <img src="./images/3DALLE/cow.gif"/>

      </div>
      


          <Grid container className="maker_gallery" rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={3}>
              <img class="maker_pic" src="./images/3DALLE/trace.webp"></img>

            </Grid>
            <Grid item xs={3}>

              <img class="maker_pic" src="./images/3DALLE/projsalvador1.jpg"></img>


            </Grid>
            <Grid item xs={3}>
              <img class="maker_pic" src="./images/3DALLE/projsalvador2.jpg"></img>


            </Grid>
            <Grid item xs={3}>
              <img class="maker_pic" src="./images/3DALLE/projsalvador3.jpg"></img>


            </Grid>
         
            <Grid item xs={3}>
              <img class="maker_pic" src="./images/3DALLE/projsalvador4.png"></img>



            </Grid>


          </Grid>



      <LineDivider/>

      <Bibliography /> 

    </div>
  );
};

export default ProjectPage3DALLE;
