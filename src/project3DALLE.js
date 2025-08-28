// project3DALLE.js
import './App.css';
import './3DALLE.css';

import Grid from '@mui/material/Grid';
import Navigation from './components/Navigation';
import LineDivider from './components/LineDivider';
import STLViewer from './components/STLViewer';

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



      <img class="paper_figure" src="./images/3DALLE/3DALLE_teaser.png" /><br/>

      <p class="paper_abstract">

        <strong>Abstract.</strong> Text-to-image AI are capable of generating novel images for inspiration, but their applications for 3D design workflows and how designers can build 3D models using AI-provided inspiration have not yet been explored. To investigate this, we integrated DALL-E, GPT-3, and CLIP within a CAD software in 3DALL-E, a plugin that generates 2D image inspiration for 3D design. 3DALL-E allows users to construct text and image prompts based on what they are modeling. In a study with 13 designers, we found that designers saw great potential in 3DALL-E within their workflows and could use text-to-image AI to produce reference images, prevent design fixation, and inspire functional design considerations. We elaborate on prompting patterns observed across 3D modeling tasks and provide measures of prompt complexity observed across participants. From our findings, we discuss how 3DALL-E can merge with existing generative design workflows and propose prompt bibliographies as a form of human-AI design history.



      </p>
      <br></br>

      <h3> Motivation </h3>
      <LineDivider />

      <div class="flex_row">
        <img class="trifold_img" src="./images/3DALLE/3dalle_motivation1.png"/>
        <img class="trifold_img" src="./images/3DALLE/3dalle_motivation2.png"/>
        <img class="trifold_img" src="./images/3DALLE/3dalle_motivation3.png"/>
      </div>
      <div class="flex_row">

        <a class="src-link" href="youtube.com/watch?v=3IZFQPCuZSk">[Src 1]</a>
        <a class="src-link" href="https://grabcad.com/library">[Src 2]</a>
        <a class="src-link" href="https://as1.ftcdn.net/jpg/03/21/03/42/1000_F_321034269_Ceha0k0brx3SrRmmLbUtikd0OnTWtGCv.jpg">[Src 3]</a>

      </div>


      <p class="paper_abstract">



        Computer-aided design (CAD) is a highly complex design activity. Designing CAD is challenging because while working in 3D, designers have to satisfy a number of functional and aesthetic goals, while also maintaining feasibility. Furthermore, it usually involves a significant amount of conceptual design, as later stages of prototyping can incur material costs. Coming up with ideas takes a lot of exploration, even for expert designers, so they often consult external resources for inspiration on how to define their geometry. In these early stages, designers gather inspiration from external sources like 3D model repositories (e.g. Onshape, Google Poly), video tutorials, and reference images to understand conventional designs and different aesthetics.



      </p>
      <p>
        Because CAD evolved in part from 2D drafting, CAD often relies on 2D representations such as freehand drawing and computer-assisted sketches [34, 45, 46]. Users operate over these 2D representations (sketch profiles and planes) to apply constraints and dimensions and to take their models into 3D using operations such as extrusion, lofting, and revolving [34]. In these early conceptual stages, CAD and product design “tends to be ambiguous, incomplete, and expressive with high levels of uncertainties” <a href="https://www.research.autodesk.com/publications/dreamsketch-early-stage-3d-design-explorations-with-sketching-and-generative-design/">[src]</a>, with less focus on constraints and parameters. There tends to be a lot of exploration of function, form, and material which varies depending on the type of designer; a mechanical engineer may perform system decomposition to understand model needs, an color material finish (CMF) designer may collect moodboards, while an industrial designer may draft and prototype forms in sketches. <strong>
          This process of conceptualizing CAD designs is pivotal to the product design process, yet few computational methods support it.
        </strong>

      </p>


      <p class="paper_abstract">

        3DALL-E explores:
        <ul>
          <li>How can 3D designers leverage text-to-image AI for support in computer-aided design (CAD)?</li>
          <li>Where in creative workflows can designers most benefit from AI assistance: at what stages and for what tasks?</li>
          <li>How can 3D designers represent their existing design to an AI model so that they can iterate and mutually build off from it? </li>
        </ul>
      </p>

      <p>
        While text-to-3D approaches also exist and can efficiently generate scene, voxel, pointcloud, and mesh 3D geometries to work with, text-to-3D approaches can start designers off at an unfamiliar stage in their workflow -- with a medium or high fidelity geometry they might not know how to edit, or with a representation they do not usually use for CAD. To support conceptual CAD from the earliest stages possible, we investigate text-to-image rather than text-to-3D in 3DALL-E as the starting point for AI-provided inspiration. 
      </p>

      <div class="flex_row">

        <img class="trifold_img" src="./images/3DALLE/prosthetic.png"/>
        <img class="trifold_img" src="./images/3DALLE/butterfly_chair.png"/>
        <img class="trifold_img" src="./images/3DALLE/robot_gripper.png"/>
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
      <img class="paper_figure" src="./images/3DALLE/3DALLE_system.gif" />


      {/* </div> */}



      <p class="paper_abstract">
        A designer inputs their goals (i.e. to design a "truck"). The plugin then provides a number of related 3D parts, styles, and conventional designs that help users craft text prompts. These suggestions are drawn from the world knowledge of GPT-3 to help users familiarize themselves with relevant design language and perform a structured search through text-to-image generation. 3DALL-E interactively updates an image preview from the software viewport that shows an image prompt which can be passed into DALL-E, giving users a direct bridge between their 3D design workspace and an AI model that can generate image inspiration. Users could choose to send this image prompt and ground the generation with what they had already created. The AI model would inpaint around their progress. Alternatively, they could choose to request generations guided purely by a text prompt.


      </p>
      {/* <img class="paper_figure" src="./images/3DALLE/3DALLE_sys.png"/> */}
      <div class="system_design">
        <img src="./images/3DALLE/sysdesign1.png" />
        <img src="./images/3DALLE/sysdesign_2.png" />

      </div>



      <br />
      <p>Additionally, we hypothesized that we could use the CLIP embeddings as a proxy for what DALL-E, the text-to-image model, might be better at generating. HCI papers have shown that users can build a mental model of the AI capabilities faster if the knowledge distribution of the AI is represented to the user in some form. Because 3DALL-E could actively render the 3D viewport, it could check against the prompt being developed and approximate the alignment between potential prompts and what had already been designed. This was achieved by using CLIP to compare text and image embeddings.</p>
            <img class="paper_figure" src="./images/3DALLE/3DALLE_sys2.png"/><br></br>

      
      <img class="paper_figure" src="./images/3DALLE/clip.png"/><br></br>



      <h3> User Evaluation </h3>
      <LineDivider />


      <p class="paper_abstract">
        To evaluate 3DALL-E and how well it can integrate into 3D workflows, we conducted a user study with thirteen users of Fusion 360 who spanned a variety of backgrounds from industrial design to robotics. We found that 3DALL-E can benefit CAD designers as a system that supports conceptual CAD, helps prevent design fixation, produces reference images, and inspires design considerations. Additionally, we compared 3DALL-E against <a href="https://www.autodesk.com/solutions/generative-design/manufacturing">existing generative tools for 3D design</a> by speaking with designers that had expertise in a different optimization-based but also generative workflow.
      </p>
      <img class="paper_figure" src="./images/3DALLE/3dalle-participants.png"/>


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
          <li>How can 3D designers leverage text-to-image AI for support in computer-aided design (CAD)? What use cases did users conceive?</li>
          <li>Where in creative workflows can designers most benefit from AI assistance? Are there certain patterns to how CAD designers use text-to-image generations
            within their workflows, and do these patterns differ depending upon the 3D modeling task?</li>

            How can 3D designers represent their existing design to an AI model so that they can iterate and mutually build off from it?


          <li>How can 3D designers represent their existing design to an AI model so that they can iterate and mutually build off from it? Could features like multimodal prompting and inpainted renders help users get ideas from AI that are grounded in their work-in-progress? Furthermore, how helpful were features like 1) structured prompt search, 2) CLIP highlighting as a form of information scent, and 3) viewport renders as inpaint-able image prompts in the scaffolding of a multimodal prompt? </li>
        </ul>
      </p>

      <p class="paper_abstract">
        We looked at two task settings within 3D design workflows: editing an existing model <em>(T-edit / Task A)</em> and creating from scratch <em>(T-create / Task B) </em>. The intention of having these two tasks was to show how 3DALL-E might affect creative workflows at different stages of the 3D modeling process. For each task, participants had 30 minutes to work on their model with the assistance of 3DALL-E. After completing each task, participants marked generations in their history that they felt were inspiring and completed a post-task questionnaire, which included NASA-TLX, Creativity Support Index (CSI), and workflow-specific questions. A semi-structured interview was conducted to understand their experience.
        {/* We found that there were three types of patterns of AI assistance for 3D design workflows that appeared in both T-create and T-edit.  */}
      </p>

      <div class="flex_row">

        <img width="50%" src="./images/3DALLE/3dalle_taska.png"/>
        <img width="50%" src="./images/3DALLE/3dalle_taskb.png"/>


      </div>


      <br></br>

      <h3> Qualitative Findings: Patterns of AI Assistance in Workflow </h3>
      <LineDivider />
      <p>Here are examples of users working with 3DALL-E during their CAD process from the user study. Three show users in Task B (create from scratch), modeling Batmobiles, speakers, and screwdrivers. One (bottom left) shows a user who brought in a robot and used 3DALL-E to ideate on how to create a different drive mechanism. </p>

      <div class="flex_row">
        <img width="50%" src="./images/3DALLE/3dalle_sped_big.gif"/>
        <img width="50%" src="./images/3DALLE/ai_throughout_nolabel.gif" />
      </div>
      <div class="flex_row">
        <img width="50%" src="./images/3DALLE/p1_presentation.gif"/>
        <img width="50%" src="./images/3DALLE/AI_last.gif" />
      </div>

      <br></br>


      <p class="paper_abstract">
        We instrumented 3DALL-E to log whenever a user used the AI capabilities and whenever they started and stopped modelling in Fusion. What you can see in the Gantt chart below is a rough timeline of each participant’s workflow with 3DALL-E during the study. This allowed us to visualize workflow decomposition and characterize different patterns of AI assistance that appeared in both Task A (edit) and Task B (create) and the handoff points between AI-assisted ideation and designer-led execution.
        </p>
        {/* These patterns represented salient ways participants engaged in generative  points in their workflow they took to 3DALL-E and at which points they focused on Fusion 360 (orange bars). */}

        <div class="two-column-gantt">

          <img class="workflow_figure" src="./images/3DALLE/3DALLE_patterns_a.png" />

          <img class="workflow_figure" src="./images/3DALLE/3DALLE_patterns_b.png" />


        </div>

        <h4>AI-Guided Ideation: Structured Search on Design Dimensions and Variation Capabilities</h4>
        <p >3DALL-E led users through ideation structured along three dimensions: 3D parts, conventional industrial designs, and design styles. Users sifted through AI generations until they a) had a better grasp of the expressive range of AI capabilities and b) found generations they liked. Users often used generations as blueprints to use as scaffolds during the 3D modeling process, helping users surmount the blank canvas problem that is common to design software.</p>
        <div class="flex_row">
          <img width="380px" src="./images/3DALLE/ai_first.jpg" />
          <div>

            <p >For example, P18, a technical software specialist with an industrial design background, was trying to make a car. They first began looking
              for inspiration for a matchbox car, before diving into prompt suggestions like “sports car” and adding specifity through perspective, number, and style keywords. P18 used a generation as a blueprint and modeled within Fusion 360 thereafter: tracing, extruding, beveling, and chamfering until they had a full car. </p>
            <p>In this workflow, AI supported ideation, helping elaborate a blueprint that the expert CAD designer could quickly execute. They could follow the blueprint to their liking-- abstracting out dimensions and constraints they wanted to use and leading with their expertise in the design execution. </p>
          </div>




        </div>



        {/* <img class="paper_figure" src="./images/3DALLE/3dalle_p18_still.png"></img> */}

        <br></br>
        <br></br>
        <h4> AI-Assisted Local and Global Exploration of Design Solutions </h4>
        <p>Many participants would turn to 3DALL-E when they wanted to make pivots, both big and small, with their design. One way of doing a small pivot and conducting local exploration with 3DALL-E was to send their current 3D model progress as a render and have 3DALL-E autocomplete it. We see these actions whenever participants would have a short window of Fusion time that led up to image+text generation (medium blue dots in the Gantt charts above). During these short windows, participants were generally changing their camera perspective or the visibility of different parts in their assemblies to retrieve different angles of inspiration.  </p>
        <div class="flex_row" >

          <img src="./images/3DALLE/AI_throughout.png" />
          <div>

            <p>
              P13 demonstrated this intermittent, local exploration with AI in their workflow. They first built up a base for an audio speaker that they wanted to have a Scandinavian-inspired design. They prompted for lighting features and tesselated the form until it had a more unique shape. Then they began to create image prompts for 3DALL-E by deleting 3D faces and hiding 3D bodies in their geometry. This way they could see different AI-inpainted concepts for the design of the middle section of their speaker.
            </p>
            <p>
              Independent of the task, users also liked to use text prompts to take them towards new directions at any point of their workflow -- more global exploration. This is evidenced by the purple diamonds in the Gantt chart. <strong>Many users mentioned that AI can help break design fixation, which is problem within CAD and other design disciplines that involve a lot of direct manipulation and implementation timesink that can leave less cognitive bandwidth for divergent exploration.</strong>

            </p>

            <p>
              <em> "A lot of times designers get stuck, they get tunnel vision...the folks at [toy design company] used to say to me, "We can't come up with enough designs...it takes too long to come up with a design, so then we only get two or three...we would like to see thousands of design options and variations...the [designer's] goal is to start throwing as many designs out there as they can. - CAD Professional  </em>

            </p>
          </div>


        </div>

        <br></br>
        <br></br>



        <h4>AI for Refinement and Design Alternatives</h4>
        <div class="flex_row">


          <img width="380px" src="./images/3DALLE/AI-last.png" />



          <div>
            <p>Many users in Task B (Create from Scratch) defaulted to their existing workflows and wanted to exercise their expertise before involving AI. </p>
            <p>
              P16 was a user who already had an existing screwdriver concept in their mind and wanted AI to assist only after they had already laid down a foundation. They began by dimensioning and extruding out a screwdriver grip and flat-head tip. After blocking out a rough model, they tried 3DALL-E for refinement and design alternatives to the flat-head tip, using their existing modeling progress as a constraint for 3DALL-E to inpaint around. P16 commented that 3DALL-E inspired them to consider different handle cross-sections (e.g. hexagonal, square) and grooved grips. This illustrates that AI has to be able to build on top of user progress and around their existing expertise, supporting with awareness of what the user has built with meaningful refinement.
            </p>

            {/* <p> We see this in the rows of Gantt chart that start off with orange bars, which indicate that participants started modeling from the get-go of the task. We noted that this happened more often when users defaulted to their existing workflows. </p> */}

          </div>


        </div>

         <div class="flex_row">


          <img width="380px" src="./images/3DALLE/p1_robot_refinement.jpg" />


          <div>
            
            <p>
              P1 worked on a tank-drive robot that they had built for a FIRST robotics competition during 𝑇𝑒𝑑𝑖𝑡 (pictured in Fig. 9). To craft image prompts, they played around with different angles of their models and toggled the visibility of parts like the wheels and ground plane of their model. This allowed them to focus on refining specific parts of the robot: first by focusing on the tank drive and next by focusing on the wheel.
            </p>

            {/* <p> We see this in the rows of Gantt chart that start off with orange bars, which indicate that participants started modeling from the get-go of the task. We noted that this happened more often when users defaulted to their existing workflows. </p> */}

          </div>


        </div>


        <br></br><br></br>
        {/* <h4>Breaking out of Design Fixation</h4> */}

        <h3>Examples of Generations Collected as Ideas for Blueprints, Reference Images, Materials, and Textures</h3>
        <LineDivider />
        <div class="flex_row">
          <img width="30%" src="./images/3DALLE/imageprompt.png" />
          <img width="70%" src="./images/3DALLE/image_prompt2.png" />
        </div>
        <div class="flex_row">
          <p width="25%" src="./images/3DALLE/imageprompt.png" > Bio-inspired robot grippers  </p>
          <p width="75%" src="./images/3DALLE/image_prompt2.png" > 3DALL-E autocompleting a render of a 3D mic setup by inpainting around existing work </p>
        </div>
        <div class="flex_row">
          <img width="50%" src="./images/3DALLE/matching_appearances.png"/>
          <img width="50%" src="./images/3DALLE/3dalle_perspective.png" />
        </div>
        <div class="flex_row">
          <p width="30%" src="./images/3DALLE/imageprompt.png" > User adapting 3D model towards generation appearance (brass material) </p>
          <p width="70%" src="./images/3DALLE/image_prompt2.png" > User working off of a top-down generation as a blueprint </p>
        </div>
        <div class="flex_row">
          <img width="25%" src="./images/3dalle/shelf_with_plants.png" />
          <img width="75%" src="./images/3dalle/active_chair.png" />
        </div>
        <div class="flex_row">
          <p width="25%"  > User generating a render with plants to visually situate their designs and see their 3D model in use</p>
          <p width="75%" > User generating designs to see a 3D model in use to see functional design considerations (e.g. a chair in a hospital setting should have rolling wheels)</p>
        </div>

        {/* {/* In the bottom left, a participant adapted the appearance of their 3D model to match the suggestion of a generation. In the bottom right, a participant used an axial view of an image as a blueprint. Participants further described use cases such as creating product design presentations that show the function or interaction of the 3D design in action. For example, a shelf was inpainted to have plants and a unrealized chairs were shown in a hospital setting to do product design within a context. 
           */}

        <p>However, many participants also described constraints that text-to-image generations would need to follow to be useful as reference images. <em>"I would probably need at least three images: top, side, and front view to even understand it three-dimensionally...that's what a designer would pass to an engineer to then build it. I would try to force it [3DALL-E] to create a top view, side, front view that are somehow matching"</em>. This surfaced a constraint that could be fine-tuned upon.
        </p>

        <h4>Use Cases Beyond the Individual at the Team and Industry Level</h4>
        <p>
          Users suggested that the tool could be “game-changing” for certain industries such as consumer products, automobiles, and game assets.  They likened it to existing search and intelligent suggestion tools like stock photography websites and Google Images, but noted that with 3DALL-E, it was better in that users could access inspiration without leaving their workbench.</p>
        <p>
          Collaboration Material between Teams. Many participants also acknowledged that 3DALL-E could be beneficial in teams. A user mentioned that from their industry experience, 3DALL-E would be excellent for establishing communication between mechanical engineers and industrial designers. Mechanical engineers focus on function, while industrial designers
focus on aesthetics. P16 felt that 3DALL-E could help both sides pass around design materials for discussion and common ground. P13, who was an industrial designer, noted that teams could also do multi-pronged exploration with 3DALL-E. Because each team member would have individual prompting trajectories, a team could easily produce diverse searches and more variety during brainstorming. P3 mentioned that there are already points within
their industry (automotives) where there are hand-offs between the people who generate design ideas and the people who execute them. Technical sales specialist P4 also mentioned that they could instantly see 3DALL-E being useful for their clients, many of whom have bespoke requests such as organic fixtures for restaurants and museums or optimized shapes for certain materials.
        </p>

          <h3> Comparing with Traditional Workflows</h3>

        <LineDivider />

        <p>Our exploratory study invited designers to stress test 3DALL-E across the settings of a wide range of disciplines. Participants were impressed with the ability of the model to generate even when they passed prompts filled with technical jargon like “CNC machines”, “L-brackets”, or “drone landing gear”. Still, prompting remains very distinct from the workflows participants usually go through. Many participants described their regular design process as multiple phase progressions from low fidelity to high fidelity. They mentioned roughing out designs first, putting placeholders within robotic assemblies (P1), box blocking up to complexity (P13), and redesigning from the ground up again and again (P18). Even though 3DALL-E only provided images of 3D designs, these designs could have high fidelity details that could shortcut participants to later stages of the design process.</p>

        <p>
          <strong> Text Interactions in 3D Workflow.</strong> The most distinct difference in workflows is that 3DALL-E is text-focused, but text is not central to 3D design workflows, which are usually based on the
direct manipulation of the geometry. P13 mentioned that designers primarily operate visually. <em>“The only reason I really use text in an industrial design context is [for] making notations on a design...to
explain what a feature is...to write a design specification...but the majority of the time is image focused.” </em> Because of this, P13 preferred the “image-based approach” within 3DALL-E where they could <em>“provide it with a starting image and get variants of that”.</em> P4, however, thought that in some respects designers are often engaging with text, but in the form of numbers, properties, parameters, equations, and configurations. <em>“[We] do it in a smart way...[we] drive it with the math equation. This is something we can do in parameters, and it is very text-based.”</em>

        </p>

        <p><strong> Driving the Design </strong> When AI input is added into a workflow, questions of who drives the design process and who owns the final design can arise. While P9 liked that 3DALL-E augmented their
workflow with what they called dynamic feedback, they felt as though their design was being driven by the generations. As for ownership, many participants felt like the designs they created with 3DALL-E would still be their own. P1 stated on ownership, <em>“A lot of 3D modeling is stealing...borrowing premade files online, and then assembling it together into a new thing. For this robot, we borrowed these assemblies from already premade files that were sold by the company. We modelled based off of that, but the majority of this robot can be considered ours because we determined the placement.” </em> P13 was also not worried about ownership concerns, stating that even now, anyone can recreate any model found online, but that <em>“it’s about the steps you go through to get there.”</em></p>

        <p>P18 mentioned that for an AI to be applied to the real world, it still takes an expert designer’s understanding of the market and customer needs. <em>“I would use my know-how of manufacturing processes and the market or style. My service would adopt AI as a source of inspiration rather than as the solution.”</em> Reflecting on if AI inspiration became mainstream without designers in the loop, they expressed concerns that <em> "if everyone would converge on the same designs [because] it only learns from the input it gets from people... we might lose creativity.”</em></p>
        

      <h3>Comparison with Existing Generative CAD Tools</h3>

      <img class="paper_figure" src="./images/3DALLE/fusiongd.png"/>

      <p>Five of 13 participants had experience with the existing generative design mode within the 3D CAD software [38]. Generative design (GD) is an environment in Fusion 360 in which the completion of a 3D design is set up like a problem: users define physical constraints and geometric filters that allow a model to be autocompleted. We did not directly compare with GD, because hardware constraints made 3DALL-E incompatible with GD. However, we did ask participants with experience in GD to compare and contrast the two.</p>

      <p>A primary difference was that GD allows users to directly manipulate the model geometry, which differs from the text-based interaction of 3DALL-E. GD results therefore free the user from doing more modeling work. What one participant liked about GD was that “once they set up the problem, they could just hit go... don’t have to actually worry about lofting and modeling”. However, participants mentioned that GD has a higher barrier of entry; users are burdened with calculating loads and non-conflicting constraints, which requires some understanding of physics and engineering.</p>

      <p>
        <em>"You’re [GD ] focused on strength, endurability of the model itself, really driven as a manufacturing task... your end result is something that’s makeable... whereas this process [3DALL-E ] is more on the creative side."</em>
      </p>
      

      <p>P2 mentioned that 3DALL-E allowed users to come up with outcomes far more efficiently than GD. In the span of a 30-minute task, users were able to browse hundreds of results, with the first results coming in a matter of seconds, whereas P2 has previously had to wait multiple hours or even days for GD. P2 and P18 were enthusiastic that GD and 3DALL-E could merge. P10 suggested that one way these two tools could complement each other is if <em>“this tool [3DALL-E] could be used to generate shapes... pass it off to the generative design [GD] to optimize”</em></p>

        {/* <img class="paper_figure" src="./images/3DALLE/3DALLE_patterns_a.png"/> <br></br> */}

        <img class="paper_figure" src="./images/3DALLE/3DALLE_fullworkflows.png" /><br/>

        <h3>Quantitative Findings</h3>
        <LineDivider />
          <h4>Creativity Support and NASA-TLX Results.</h4>
          <p>
            The metrics we measured showed that designers responded to 3DALL-E with enthusiasm. All responses were on a 7-point Likert scale. In terms of enjoyment, 12/13 participants rated their experience positively (≥ 5 out of 7) for 𝑇𝑒𝑑𝑖𝑡 (median: 6) and 11/13 for𝑇𝑐𝑟𝑒𝑎𝑡𝑒 (median: 6) . The majority of participants also responded positively that they were able to find at least one design to satisfy their goal: 10/13 respondents in 𝑇𝑒𝑑𝑖𝑡 (median: 6), 12/13 respondents in 𝑇𝑐𝑟𝑒𝑎𝑡𝑒 (median: 7). Likewise, most participants reported that the system helped them fully explore the space of designs (9/13 responded positively for 𝑇𝑒𝑑𝑖𝑡 (median: 6) , 11/13 for 𝑇𝑐𝑟𝑒𝑎𝑡𝑒 (median: 6)).
          </p>
         
         <p>In general, the post-task questionnaire results were similar for 𝑇𝑒𝑑𝑖𝑡 and 𝑇𝑐𝑟𝑒𝑎𝑡𝑒 . However, on a few dimensions, participant responses were distributed slightly differently. For example for effort, responses for 𝑇𝑒𝑑𝑖𝑡 about tool performance (“How successful were you in accomplishing what you set out to do?”) were split across the spectrum, with 6/13 rating the tool positively (median: 4). For 𝑇𝑐𝑟𝑒𝑎𝑡𝑒 , 10/13 participants rated the performance positively (median: 5). In terms of ease of prompting, while 13/13 respondents were positive that for 𝑇𝑐𝑟𝑒𝑎𝑡𝑒 it was easy to come up with prompts (median: 7), 10/13 responded positively for 𝑇𝑒𝑑𝑖𝑡 (median: 5). We hypothesize that this could have been because for𝑇𝑒𝑑𝑖𝑡 participants had to work under more constraints, bringing in 3D models that were often custom and near finished.</p>

         <p>We note that frustration was low for both Tasks; 11/13 responded on the low side of the spectrum for 𝑇𝑒𝑑𝑖𝑡 (≤ 3) (median: 3), and 10/13 on the low side for 𝑇𝑐𝑟𝑒𝑎𝑡𝑒 . For 𝑇𝑒𝑑𝑖𝑡 (median: 2), frustration was low in spite of the fact that 6/13 of participants disagreed to some degree (≤ 3) about having control over the generations.
</p>

<p><em>“The amount of control you have with the system is very dependent upon how specific you get with the text. For example, if I make it super broad, you’re obviously going to have less control because DALL-E is working off of less information. So it may provide its own information. It has to kind of fill in the gaps of what you’re trying to say. But the more specific I got, the better results I got.” - P1</em></p>




        <img class="paper_figure" src="./images/3DALLE/nasatlx.png"/><br/>
        <img class="paper_figure" src="./images/3DALLE/creativitysupport.png"/><br/>
        <h4>Workflow-Specific Questions</h4>

        <p>


        Lastly, to understand how helpful different features (prompt suggestions, CLIP highlighting, automatically captured viewport images) are in the construction of text and image prompts, we discuss workflowspecific questions about the prompting pipeline of 3DALL-E. Participants were asked about the usefulness of 3DALL-E for their usual workflow. For 𝑇𝑒𝑑𝑖𝑡, 10/13 felt that it would be helpful (median: 5). For 𝑇𝑐𝑟𝑒𝑎𝑡𝑒 , 10/13 also felt it would be helpful (median: 7). In another question, we asked whether it was easy for participants to come up with new ways to prompt the system. Participants responded unilaterally positively for 𝑇𝑐𝑟𝑒𝑎𝑡𝑒 (13/13 responded ≥ 5) and positively for 𝑇𝑒𝑑𝑖𝑡 (median: 6) (10/13 responded ≥ 5) (median: 6). Participants were also asked to rate how useful they found the GPT-3 suggestions. For 𝑇𝑒𝑑𝑖𝑡 and 𝑇𝑐𝑟𝑒𝑎𝑡𝑒 , the responses were generally positive, at least 8/13 participants responded with 5 or higher for both tasks (𝑇𝑒𝑑𝑖𝑡 median: 7, 𝑇𝑐𝑟𝑒𝑎𝑡𝑒 median: 6).

        </p>

        <p>
          On whether or not the highlighting of prompt suggestions was useful, participants responded with more even distributions, though the distributions still skewed positive (8/13 in 𝑇𝑒𝑑𝑖𝑡 and 7/13 in 𝑇𝑐𝑟𝑒𝑎𝑡𝑒 rated the statement at 5 or higher (median: 5, for both tasks). Participants tended to click on suggestions that were highlighted more strongly for text-image alignment, often choosing the most strongly highlighted suggestion within the category.

        </p>
        <p>
          Lastly, we gauged participant response to image prompts, asking if they agreed that image prompts were incorporated well in their generations. For 𝑇𝑒𝑑𝑖𝑡, 10/13 participants responded with a 5 or 6 for agreement (median: 6). For 𝑇𝑐𝑟𝑒𝑎𝑡𝑒 , 8/13 participants responded with a 6 or 7 (median: 6).
        </p>

        

        <img class="paper_figure" src="./images/3DALLE/workflow.png"/>

        <p><em>“Image prompts definitely allowed me to tailor the outcomes towards what I was hoping for or
expecting maybe... I’d have struggled to replicate [the render type] if I hadn’t done the click on the image [sent in an image prompt] and create some variations. I think once I found something I liked, using those variations made it much easier to stuck to that design theme.” - P13
</em></p>
<p><em>“This middle one is pretty insane. . .it has integrated my design into the image properly... even as an assembly, I think that’s completely nuts... [An image prompt] connects what I’m working on with it [DALL-E]. . . otherwise it might be giving some random results, and after a while it might become redundant for me.”] - P18</em></p>

        <h4>Empirical Analysis of Prompt Behavior</h4>
         <p> It can be challenging for an end user to understand how lengthy or
          detailed a text-to-image prompt should generally be, which is why we studied prompt complexity with 3DALL-E. Because prompts were chosen through a faceted approach along three dimensions (conventional design, 3D parts, style keywords and modifiers) and then reworded using GPT-3, we wanted to see how many concepts participants wanted to focus on in each 3DALL-E iteration. Prompt complexity was measured across participants, where complexity is the count of concepts in each text-only and image+text prompt. Participants span the X-axis, sorted by the count of their most complex prompt. The values are jittered to show multiplicity; many prompts mapped to the same number of concepts. Complexity tended to concentrate between two to six concepts, as seen by the density of prompts within that interval. Each datapoint was colored based on prompt task.
        </p>
        <p> As prompt complexity tended to concentrate between two and six concepts, this helped elaborate a design guideline that could serve as user education for users new to prompting.</p>


        <img class="paper_figure" src="./images/3DALLE/promptcomplexity.png" /><br/>
       


      

        <p class="paper_abstract">
         
          {/* <ul>
        <li>The leftmost column shows an AI-last pattern, where the user explored a number of different design options conceptually before doing any CAD.</li>
        <li>The middle column shows the user sending in image prompts with their current design to find ways to autocomplete the middle portion of the sound speaker they were designing. </li>
        <li>The rightmost column shows how a user first generated to see how the AI would adapt their existing model first before finding an area of the model they wanted to refine further (e.g. the wheel / tank drive of their robot).</li>
      </ul>
        */}

        </p>




        <h3> Discussion </h3>

        
        <LineDivider />
        <p class="paper_abstract"><strong> Prompt Bibliographies. </strong>
          A strength of studying 3D workflows was that there was no conflict between the AI and human on the canvas, as the AI had no part in the physical realization of the design. We believe this helps mitigate ownership concerns and makes text-to-image AI very promising for 3D design tools. Currently, AI-generated content is a gray area due to concerns of attribution and intellectual property. Currently, there is no way to tell how heavily an AI-generated image borrows from existing materials. As generated content becomes more prevalent on platforms, it is important to develop practices of data provenance.  We propose the notion of prompt bibliographies to provide information on what informed designs and to separate out which contributions were human and which were AI. These can work to clarify ownership and intellectual property concerns.
          In our discussion, we propose prompt bibliographies, a concept of human-AI design history to track inspiration from text-to-image AI. 
        </p>
        <p>
          Prompt bibliographies could likewise help track designer intentions and enrich the design histories that software tools provide, which generally capture commands and actions (but not intentions). The bibliographies can be merged within the history timeline features that are present in tools like Fusion 360, helping prompting integrate better with the traditional workspaces of creative tools. Sharing prompt bibliographies with their outcomes (i.e. 3D models) can also help respect all the parties that are behind these AI systems. End users already query for the styles of artists to create derivative works that dilutes the pool of images attributed to human artistry. Prompt bibliographies may be especially relevant for CAD designers as CAD is highly intertwined with patents, manufacturing, and consumer products.

        </p>
        <img class="paper_figure" src="./images/3DALLE/3DALLE_promptbib.png" /><br/>

        <p>It is important to understand where in a workflow assistance can be of most use. Our survey results reflect that 3DALL-E produced a slightly more positive experience when it was introduced earlier on in the process. This was corroborated by many participants who said they saw this tool being most helpful in the early stages of design. Well-placed AI assistance, such as early stage ideation with GPT-3, trying a text-only prompt to pivot directions, or carefully setting up an image prompt for 3DALL-E to fill in—can be greatly constructive and address painpoints like design fixation that CAD and 3D designers in general feel today/ Furthermore, if we understand the scope of the tasks we want AI to handle within a workflow, such as having GPT-3 suggest different parts of a model or having DALL-E generate reference images from front, side, and top views (and not just this but fine-tuned to be perspective or orthographic), we can better fit general purpose models to their downstream task. We can have stronger checks on the prompt inputs and generation outputs if we understand what is within scope of the task. For example, when P16 wanted a “flat head” screwdriver, they were returned results about a medical syndrome—something that could be avoided with content filtering guards checking for relevance to 3D design. AI models may not have to bear the full burden of providing good and ethical answers if we can have multiple checkpoints for propriety.</p>

        <p><strong>Generalizability. </strong>The design workflow posed in 3DALL-E is generalizable and can easily be used as a blueprint for text-to-image AI integration with different design software. The idea behind surfacing 3D keywords from application related data (as we did with Fusion 360 Screencast data) also introduces ideas for how prompts can be tailored towards the technical vocabulary of a software. The idea of passing in image prompts is also easily extendable to different creative tools, even those outside of the 3D space. For example, graphic editing tools can pass in image prompts based on active layers chosen by a user. Animation software and video editors can send in choice frames for anchored animations and video stylization. A takeaway of this paper is to take advantage of the complex hierarchies that users build up as they design, such as the way 3DALL-E takes advantage of the fact that 3D models are generally assemblies of parts. With 3DALL-E, users could isolate parts and send clean image prompts without the burden of erasing or masking anything themselves.
</p>

        <p><strong>Benefits of Text-to-Image for CAD. </strong> Few tools currently explicitly support conceptual CAD. 3DALL-E supports conceptual CAD not only at the beginning of
the design process, but also throughout their workflow, as evidenced by the different usage patterns. It provides visual assets for CAD / product design as well as design knowledge that is otherwise difficult to collect (e.g. standard designs, specific part terminology). These visual assets can be utilized for detailed sketching within CAD, for appearance editing through materials, or for the inspiration of design considerations. 3DALL-E also presented directions that can solve weaknesses of existing generative tools (GD) for CAD. By having 3DALL-E define shapes and then having the GD environment optimize them, existing generative tools could better align with what designers visually want, and go beyond physical constraints like loads and forces.
</p>

<p>We demonstrated the efficacy of 3DALL-E at supporting a diverse set of potential CAD end users: mechanical engineers, industrial
designers, roboticists, machining specialists, and hobbyist makers. 3DALL-E’s interdisciplinary design knowledge is both a strength of AI pretraining as well as the ability of designers to make <a href="https://dl.acm.org/doi/10.1145/3511599" >"integrative leaps"</a> to meet the AI halfway. Additionally, the modular nature of 3DALL-E in Fusion 360 demonstrates an idea of separating out AI assistance from traditional non-AI direct manipulation features. Lastly, the text-based nature of the tool and its ready acceptance with designers demonstrates how text interactions can facilitate a "low threshold, high ceiling" design tool for CAD.</p>

<p><strong>Future work and limitations.</strong>
  A necessary line of future work to make text-to-image AI more usable for CAD will be to integrate it with sketch-based modeling. Sketching is fundamental to CAD and reliant on the creation and
manipulation of clean primitives (splines, lines, etc.), and controlling the composition of text-to-image generations based on sketches would be highly useful.
</p>

<p><strong>Broader Impacts. </strong> Text-to-image methods have entered the mainstream conversation as a tool that has the potential to impact creative jobs and livelihoods. People have begun to utilize these methods to generate logos, vector illustrations, fashion designs, and so on. This paper is a case study for how generative AI tools can be integrated within the conceptual CAD design stages and how CAD design processes can be augmented rather than automated away. There are ongoing discussions about copyright and existing artist work being leveraged as training data that are rightfully merited. However, we believe that the positive response from participants to 3DALL-E illustrates the utility that these tools can present to creatives. Key aspects we think are important for these tools to be successful are that they are narrowed in scope, introduced at early stages of the design process, and still leave room for the creative to exercise their artistic license.</p>


      <h3>Community Creations </h3>
      <LineDivider />
      <p>
              3DALL-E was tech-transferred to Fusion 360 as Project Salvador, meaning there is a production-ready version that the public can use. 
              As suggested in the future work section above, image-to-sketch features were added, greatly enhancing the ease of use for designers to integrate text-to-image AI within their workflow. Here are some creations people have made with the assistance of Project Salvador. The first row (cow stencil) are what the first author created. The other images were collected from the following sources. <a href="https://www.fabbaloo.com/news/create-complex-sketches-easily-with-fusion-360s-project-salvador-ai-plugin">[Src 1]</a>, <a href="https://forums.autodesk.com/t5/fusion-design-validate-document/project-salvador-leveraging-generative-ai-to-unlock-enhanced/td-p/12705518">[Src 2]</a>


      </p>
      
      <div class="flex_row">
        <img src="./images/3DALLE/cow.png"/>
        <img src="./images/3DALLE/cow.gif"/>

      </div>
      
      <h4>STL View of Cow Stencil (rotate me!)</h4>
      <STLViewer stlFile="./images/3DALLE/cow.stl" />



        <Grid container className="maker_gallery" rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={3}>
            <img class="maker_pic" src="./images/3DALLE/trace.webp"/>

          </Grid>
          <Grid item xs={3}>

            <img class="maker_pic" src="./images/3DALLE/projsalvador1.jpg"/>


          </Grid>
          <Grid item xs={3}>
            <img class="maker_pic" src="./images/3DALLE/projsalvador2.jpg"/>


          </Grid>
          <Grid item xs={3}>
            <img class="maker_pic" src="./images/3DALLE/projsalvador3.jpg"/>


          </Grid>

          <Grid item xs={3}>
            <img class="maker_pic" src="./images/3DALLE/projsalvador4.png"></img>



          </Grid>


        </Grid>
     

              {/* <h3>Conclusion</h3>
                   <LineDivider />

          <p>
            3DALL-E introduced text-to-image AI into 3D workflows and was evaluated in an exploratory study with 13 designers. This study elaborated a number of use cases for text-to-image AI from providing reference images to facilitating collaboration to inspiring design considerations. From participant prompts, we observed different types of prompting patterns depending on whether the user engaged with 3DALL-E first, last, or throughout their process. Furthermore, we provided measures of prompt complexity across participants and propose a concept for tracking human-AI design history
through prompt bibliographies.
          </p> */}
          
   
        <h3>Citation</h3>
        <LineDivider/>

        <Bibliography />

    </div>
  );
};

export default ProjectPage3DALLE;
