// project3DALLE.js
import './App.css';

import React from 'react';
import LineDivider from './components/LineDivider';
import Navigation from './components/Navigation';
import './ProjectPage.css';



const Bibliography = () => {
  const references = `
    @inproceedings{Liu2022Opal,
    author = {Liu, Vivian and Qiao, Han and Chilton, Lydia},
    title = {Opal: Multimodal Image Generation for News Illustration},
    year = {2022},
    isbn = {9781450393201},
    publisher = {Association for Computing Machinery},
    address = {New York, NY, USA},
    url = {https://doi.org/10.1145/3526113.3545621},
    doi = {10.1145/3526113.3545621},
    series = {UIST '22}
    }

  `;
  return (
    <div id="bibliography">
      <pre>{references}</pre> {/* Display BibTeX as preformatted text */}
    </div>
  );
};


const ProjectOPAL = () => {
  return (
    <div>

      <Navigation />

      <h3>Opal: Multimodal Image Generation for News Illustration</h3>

      <h4 class="paper_authors">Vivian Liu, Han Qiao, and Lydia Chilton</h4> <br></br>

      <img class="paper_figure" src="./images/opal/Opal_TeaserFigure.png" /><br></br>

      <p class="paper_abstract">

        <p>*Opal is a portmanteau of Ouevre (an artist's body of work) and Palette.
        </p>
        <strong>Abstract.</strong> Advances in multimodal AI have presented people with powerful ways to create images from text. Recent work has shown that text-to-image generations are able to represent a broad range of subjects and artistic styles. However, finding the right visual language for text prompts is difficult. In this paper, we address this challenge with Opal, a system that produces text-to-image generations for news illustration. Given an article, Opal guides users through a structured search for visual concepts and provides a pipeline allowing users to generate illustrations based on an article's tone, keywords, and related artistic styles. Our evaluation shows that Opal efficiently generates diverse sets of news illustrations, visual assets, and concept ideas. Users with Opal generated two times more usable results than users without. We discuss how structured exploration can help users better understand the capabilities of human AI co-creative systems.
      </p>

      <h3> Motivation </h3>
      <p>
        <LineDivider />
      </p>

      <p class="paper_abstract">
        Text-to-image AI lets users to generate images based on text. However, it is not guaranteed that any prompt passed through a text-to-image AI will produce an outcome that satisfies the user. We explore the challenge of translating text into images in a systematic, structured, and efficient way within the research context of news illustrations, which have a text basis (the news article) but require an accompanying visual to spark interest.

      </p>

      <p class="paper_abstract">
        To help news illustrators efficiently ideate and create text-to-image news illustrations, we present Opal, a system that guides users through a structured search for visual concepts around news article content. It switches between conceptual exploration facilitated by a large language model (GPT-3) and visual exploration of a design space facilitated by a text-to-image model (VQGAN+CLIP).

      </p>
      <br></br>

      <img class="paper_figure" id="opal_system_design" src="./images/opal/Opal_SystemExample.gif" />
      <br></br>


      <h3> System Design </h3>
      <LineDivider />

      <p class="paper_abstract">
        From co-design with news illustrators, we learned that they worked off of text they received from writers. They would first conceptually explore the text and find related phrases and concepts to visually capture the article. Building off of this, we focused on article text as the beginning point of exploration and developed simple prompt engineering methods to retrieve keyword, tone, icon, and style suggestions.

      </p>
      <br></br>

      <img class="paper_figure" src="./images/opal/Opal_Pipelines.png" />
      <br></br>
      <p class="paper_abstract">
        At each level, visual concepts were generated to show users a design space of news illustrations.

        Abstract-to-concrete expansion steps made visual concepts more easy to visualize and generate.

      </p>
      <img class="paper_figure" src="./images/opal/Opal_Abstract_Concrete.png" />

      <h3>User Evaluation</h3>
      <LineDivider />
      <p class="paper_abstract">

        We conducted two evaluations: 1) annotation studies compared human vs. GPT-3 performance and
        benchmarked against traditional NLP approaches such as semantic embedding-based search and 2) a user evaluation.
        <br></br>

        We describe the results of our user study in shortform here.

        <br></br>


        <strong> RQ) Does Opal help users arrive at more usable generations compared to our baseline?</strong> The average number of generations explored from Opal was significantly higher (2.68x). The number of usable generations from Opal was also significantly higher (2.28x). 
       
        </p>




        
      <img class="paper_figure smaller-figure" src="./images/opal/Opal_Usable_Generations.png" />


      <p class="paper_abstract">
      
  
      <strong> RQ) Does Opal help users arrive at a set of generations with greater creative expression than our baseline?</strong> We found significant difference in terms of exploration. Opal helped users better explore the space of potential designs.

      </p>
      


        {/* <img class="paper_figure" src="./images/opal/Opal_CreativitySupport.png" /> */}
      <img class="paper_figure smaller-figure" src="./images/opal/Opal_NASAStudy2.png" />


      <p class="paper_abstract">
      <strong> RQ) To what extent can Opal help users create generations of usable quality? </strong> Participants found usable generations in all three of the categories we defined for usability: use as is, use as a visual asset, and use as a conceptual idea.
      </p>
      



      <img class="paper_figure" src="./images/opal/Opal_Examples.png" />

      <br></br>

      {/* <p class="paper_abstract">
      Participants
      </p> */}
      

      {/* <img class="paper_figure" src="./images/opal/Opal_VisualAssets.png" /> <br></br> */}


      <LineDivider />

      <Bibliography/>


      






    </div>
  );
};

export default ProjectOPAL;