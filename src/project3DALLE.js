// project3DALLE.js
import './App.css';

import React from 'react';
import Navigation from './components/Navigation';

const ProjectPage3DALLE = () => {
  return (
    <div>
        
     <Navigation />

      <h3>3DALL-E: Integrating Text-to-Image AI in 3D Design Workflows</h3>
      <h4 class="paper_authors">Vivian Liu, Jo Vermeulen, George Fitzmaurice, Justin Matejka</h4> <br></br>

      <img class="paper_figure" src="./images/3DALLE_teaser.png"/><br></br>





      <p class="paper_abstract">

      <strong>Abstract.</strong> Text-to-image AI are capable of generating novel images for inspiration, but their applications for 3D design workflows and how designers can build 3D models using AI-provided inspiration have not yet been explored. To investigate this, we integrated DALL-E, GPT-3, and CLIP within a CAD software in 3DALL-E, a plugin that generates 2D image inspiration for 3D design. 3DALL-E allows users to construct text and image prompts based on what they are modeling. In a study with 13 designers, we found that designers saw great potential in 3DALL-E within their workflows and could use text-to-image AI to produce reference images, prevent design fixation, and inspire design considerations. We elaborate on prompting patterns observed across 3D modeling tasks and provide measures of prompt complexity observed across participants. From our findings, we discuss how 3DALL-E can merge with existing generative design workflows and propose prompt bibliographies as a form of human-AI design history.
     
      </p>
      

      <img class="paper_figure" src="./images/3DALLE_sys.png"/><br>
      </br>
      <img class="paper_figure" src="./images/3DALLE_sys2.png"/><br></br>

      <img class="paper_figure" src="./images/3DALLE_fullworkflows.png"/><br></br>

      <img class="paper_figure" src="./images/3DALLE_promptbib.png"/>

      <img class="paper_figure" src="./images/p18.png"/><br>
      </br>

      

      


    </div>
  );
};

export default ProjectPage3DALLE;