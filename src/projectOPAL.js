// project3DALLE.js
import './App.css';

import React from 'react';
import Navigation from './components/Navigation';

const ProjectOPAL = () => {
  return (
    <div>
        
     <Navigation />

      <h3>Opal: Multimodal Image Generation for News Illustration</h3>

      <h4 class="paper_authors">Vivian Liu, Han Qiao, and Lydia Chilton</h4> <br></br>

    
      <img class="paper_figure" src="./images/opal/Opal_TeaserFigure.png"/><br></br>




      <p class="paper_abstract">

      <p>*Opal is a portmanteau of Ouevre (an artist's body of work) and Palette.
        </p>
      <strong>Abstract.</strong> Advances in multimodal AI have presented people with powerful ways to create images from text. Recent work has shown that text-to-image generations are able to represent a broad range of subjects and artistic styles. However, finding the right visual language for text prompts is difficult. In this paper, we address this challenge with Opal, a system that produces text-to-image generations for news illustration. Given an article, Opal guides users through a structured search for visual concepts and provides a pipeline allowing users to generate illustrations based on an article's tone, keywords, and related artistic styles. Our evaluation shows that Opal efficiently generates diverse sets of news illustrations, visual assets, and concept ideas. Users with Opal generated two times more usable results than users without. We discuss how structured exploration can help users better understand the capabilities of human AI co-creative systems. 
      </p>
      

      <img class="paper_figure" id="opal_system_design" src="./images/opal/Opal_SystemDesign.png"/><br></br>

      <img class="paper_figure" src="./images/opal/Opal_Examples.png"/><br>
      </br>
      <div class="flex_figures">
      <img class="paper_figure" src="./images/opal/Opal_CreativitySupport.png"/>      <img class="paper_figure" src="./images/opal/Opal_NASAStudy2.png"/>

      </div>
      

      <img class="paper_figure" src="./images/opal/Opal-HumanGPT3.png"/><br></br>

      <img class="paper_figure" src="./images/opal/Opal_VisualAssets.png"/> <br></br>




      

      


    </div>
  );
};

export default ProjectOPAL;