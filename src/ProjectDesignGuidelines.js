// project3DALLE.js
import './App.css';

import React from 'react';
import Navigation from './components/Navigation';

const ProjectDesignGuidelines = () => {
  return (
    <div>
        
     <Navigation />

      <h3>Design Guidelines for Prompt Engineering Text-to-Image Generations</h3>
      <h4 class="paper_authors">Vivian Liu and Lydia Chilton</h4> <br></br>


    
      <img class="paper_figure" src="./images/design_guidelines/designguidelines_teaser.jpg"/><br></br>


      <p class="paper_abstract">

   
      <strong>Abstract.</strong> 
      Text-to-image generative models are a new and powerful way to generate visual artwork. However, the open-ended nature of text as interaction is double-edged; while users can input anything and have access to an infinite range of generations, they also must engage in brute-force trial and error with the text prompt when the result quality is poor. We conduct a  study exploring what prompt keywords and model hyperparameters can help produce coherent outputs. In particular, we study prompts structured to include subject and style keywords and investigate success and failure modes of these prompts. Our evaluation of 5493 generations over the course of five experiments spans 51 abstract and concrete subjects as well as 51 abstract and figurative styles. From this evaluation, we present design guidelines that can help people produce better outcomes from  text-to-image generative models.
      
       </p>
      

      
      <img class="paper_figure" src="./images/design_guidelines/designguidelines_stylepartitions.jpg"/><br>
      </br>
     


      

      


    </div>
  );
};

export default ProjectDesignGuidelines;