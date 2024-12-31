// project3DALLE.js
import './App.css';

import React from 'react';
import Navigation from './components/Navigation';
import LineDivider from './components/LineDivider';

const Bibliography = () => {
  const references = `
   
@inproceedings{Liu:2022:DGP,
author = {Liu, Vivian and Chilton, Lydia B},
title = {Design Guidelines for Prompt Engineering Text-to-Image Generative Models},
year = {2022},
isbn = {9781450391573},
publisher = {Association for Computing Machinery},
address = {New York, NY, USA},
url = {https://doi.org/10.1145/3491102.3501825},
doi = {10.1145/3491102.3501825},
booktitle = {Proceedings of the 2022 CHI Conference on Human Factors in Computing Systems},
articleno = {384},
numpages = {23},
keywords = {design guidelines, prompt engineering., multimodal generative models, text-to-image, AI co-creation, computational creativity},
location = {New Orleans, LA, USA},
series = {CHI '22}

}
  `;
  return (
    <div id="bibliography">
      <pre>{references}</pre>
    </div>
  );
};


const ProjectDesignGuidelines = () => {
  return (
    <div>
        
     <Navigation />

      <h3>Design Guidelines for Prompt Engineering Text-to-Image Generations</h3>
      <h4 class="paper_authors">Vivian Liu and Lydia Chilton</h4> <br></br>


    
      <img class="paper_figure" src="./images/design_guidelines/designguidelines_teaser.jpg"/><br></br>


      <h3>Short Summary</h3>
      <LineDivider />

      <p>
      In a series of experiments, we demonstrated that a range of "SUBJECT in the style of STYLE" generations can be arrived at quickly and easily with a text-to-image generative framework. We looked at different parameters for prompt engineering such as subject and style (Experiments 1, 4, 5) and studied the effects of modulating hyperparameters like the number of iterations and random initializations (Experiments 2, 3). 
      </p>

      <p>
      We condense our findings from the previous experiments into design guidelines and results to elaborate default parameters and methods for end users interacting with text-to-image models.

      </p>

      <p>
        <ul>
          <li>
          <strong>When picking the prompt, focus on subject and style keywords instead of connecting words.</strong> Rephrasings using the same keywords do not make a significant difference on the quality of the generation as no prompt permutation consistently succeeds over the rest.
          </li>
          <li>
          <strong>When generating, generate between 3 to 9 different seeds to get a representative idea of what a prompt can return. </strong>Generations may be significantly different owing to the stochastic nature of hyperparameters such as random seeds and initializations. Returning multiple results acknowledges this stochastic nature to users.
          </li>
          <li>
          <strong>When generating, for fast iteration, using shorter lengths of optimization between 100 and 500 iteration is sufficient.</strong> We found that the number of iterations and length of optimization did not significantly correlate with user satisfaction of the generation.
          </li>
          <li>
          <strong>When choosing the style of the generation, feel free to try any style, no matter how niche or broad.</strong> The deep learning frameworks capture an impressive breadth of style information, and can be surprisingly good even for niche styles. However, avoid style keywords that may be prone to misinterpretation.
          </li>
          <li>
            <strong>When picking the subject of the generation, pick subjects that can complement the chosen style in level of abstractness.</strong> This could be done by picking subjects for styles considering how abstract or concrete both are or pairing subjects that are easily interpretable or highly relevant to the style.
          </li>
          <li>
            <strong>When how the nature of the subject and style parameters can interact with each other.</strong> Subject and style have a significant effect on one another depending on the level of abstraction: whether a subject is concrete or abstract and whether a style is figurative or abstract.
          </li>
          <li>
            <strong>When looking at the results, present users with trigger warnings for pareidolia and offensive content.</strong>
          </li>
      

        </ul>
      </p>

      <h3>Abstract</h3>
      <LineDivider />

      <p class="paper_abstract">

   
      <strong>Abstract.</strong> 
      Text-to-image generative models are a new and powerful way to generate visual artwork. However, the open-ended nature of text as interaction is double-edged; while users can input anything and have access to an infinite range of generations, they also must engage in brute-force trial and error with the text prompt when the result quality is poor. We conduct a  study exploring what prompt keywords and model hyperparameters can help produce coherent outputs. In particular, we study prompts structured to include subject and style keywords and investigate success and failure modes of these prompts. Our evaluation of 5493 generations over the course of five experiments spans 51 abstract and concrete subjects as well as 51 abstract and figurative styles. From this evaluation, we present design guidelines that can help people produce better outcomes from  text-to-image generative models.
      
       </p>

      <h3>Motivation</h3>
      <LineDivider />

      <p class="paper_abstract">
      
       At the time of the study (Aug 2021), text-to-image generation models were early in their adoption and not as mainstream as they are now. There were a number of open questions within prompt engineering to explore for text-to-image models. Some questions relate to hyperparameters: how do variables influencing the length of optimization and random initializations affect model outcomes? Other questions involve the prompt: are there certain classes of words or sentence phrasings that yield better outcomes? These questions are necessary for the HCI community to answer so technical advancements in machine learning such as prompt engineering and multimodal models can be translated into usable interaction paradigms.

      To explore the generative possibilities of this system, we systematically approach prompt engineering for a family of prompts that have found traction within practitioners working with text-to-image systems: "[SUBJECT] in the style of [STYLE]" prompts. In this paper, we address key questions around prompt engineering in a series of five experiments:

      
      <ul>
        <li><strong>Experiment 1.</strong> We experiment with different phrasings of the prompt to see how modulating the language of the prompt with different orderings, function words, and filler words affects generation quality. </li>
        <li><strong>Experiment 2. </strong> We experiment with different random initializations to find an optimal range of generations to produce for each prompt, accounting for the probabilistic behavior of text-to-image frameworks.</li>
        <li><strong>Experiment 3.</strong>We experiment with the number of iterations to find an optimal range for the length of optimization.</li>
        <li><strong>Experiment 4.</strong>We experiment with styles as a parameter of the prompt to understand the breadth of styles the system can reproduce. Specifically, we explore 51 styles spanning different time periods (modern vs. premodern vs. digital), schools of culture (Western vs. non-Western), and levels of abstraction (abstract vs. figurative). Additionally, we look for biases across these different partitions of styles.</li>
        <li><strong>Experiment 5.</strong>We experiment with subjects as a parameter of the prompt to understand how subject and styles interact with each other. We tested 51 subjects across 31 styles to explore whether the system is better at producing abstract subjects or concrete subjects given an abstract or a figurative style.
        </li>
      </ul> 
      </p>

      <h3>Experiment 1. Prompt Permutations</h3>
      <LineDivider />

      <p class="paper_abstract">

      In language, there are many ways to say the same thing in different words. We wanted to understand the effect this in the context of text-to-image generation. Would users need to try many different permutations of the same prompt to get a sense of what a prompt would return, or would just one suffice? Additionally, would there be certain permutations of the prompt keywords that would lead to better generations and be the best way to word a prompt? For example, would prompting the model with "a woman in a Futurist style" lead to a significantly different generation than "a woman painted in a Futurist style", "woman with a Futurist style", or "a woman. Futurism style"? In this experiment, we wanted to rigorously examine the following question: <strong>do different rephrasings of a prompt using the same keywords yield significantly different generations? </strong>

      </p>

      <p class="paper_abstract">To study different permutations of prompts, we first had to generate a large number of images. To do this, we used the checkpoint and configuration of VQGAN+CLIP pretrained on Imagenet.
      

      <ul>
        <li> A [MEDIUM] of [SUBJECT] in the [STYLE] style --- Example: a painting of love in the abstract style
        </li>
        <li>A [MEDIUM] of [SUBJECT] in the [STYLE] style --- Example: a painting of love in the abstract style </li>
        <li>A [STYLE] [MEDIUM] of a [SUBJECT] --- Example: an abstract painting of love </li>
        <li> [SUBJECT] [STYLE] --- Example: love abstract art </li>
        <li> [SUBJECT]. [STYLE] --- Example: love.abstract art </li>
        <li>[SUBJECT] in the style of [STYLE] --- Example: love in the style of abstract art </li>
        <li>[SUBJECT] in the [STYLE] style --- Example: love painted in the abstract art style </li>
        <li>[SUBJECT] [VERB] in the [STYLE] style --- Example: love painted in the abstract style</li>
        <li>[SUBJECT] made/done/verb in the [STYLE] art style --- Example: love done in the abstract art style</li>
        <li>[SUBJECT] with a [STYLE] style. --- Example: love with an abstract art style</li> 


      </ul>
      </p>

      <img class="paper_figure" src="./images/design_guidelines/Experiment1_Permutations.jpg"/>


      <p >

      For Experiment 1, annotators judged 3x3 grids where generations from different prompt permutations were arranged randomly. Annotators evaluated 143 grids of generations for significantly better generations as well significantly worse generations. We found no significant difference between the quality of the images that these nine prompt permutations generated, and therefore no significant difference between different prompt permutations. <br></br>

      We synthesized the following guideline from this experiment: <strong>When picking the prompt, focus on subject and style keywords instead of connecting words. </strong>  The connecting words (i.e. function words,  punctuation, and words for ordering) did not contribute statistically meaningful differences in generation quality. Hence, we moved forward in the following experiments testing only one prompt permutation per subject and style combination rather than multiple rephrasings for the same combination.

      </p>



      <h3>Experiment 2. Hyperparameter Random Seed </h3>
      <LineDivider />

      <p> 

      A common parameter in generative models is seeds. Generative models are stochastic and highly dependent upon their initializations, which means that it is often hard to reproduce results. To mitigate this, people often use seeds to have reproducible results and behavior. We noticed that using different seeds with VQGAN+CLIP resulted in generations that would differ in composition. We wanted to understand: <strong>do different seeds using the same prompt yield significantly different generations?</strong> The motivation behind this question was to understand whether or not users would need to try multiple seeds before moving onto new combinations of keywords.
      </p>

      <p>
      To study the effect of seeds, we generated 1296 images from 12 subjects, 12 styles, and 9 seeds. We varied the seed chosen. We generated images using 10 randomly generated seeds and the prompt "[SUBJECT] in the style of [STYLE]". Annotators were shown 1296 generations in 3x3 grids where the seeds were arranged randomly.
      
      </p>

      <img class="paper_figure" src="./images/design_guidelines/designguidelines_randomseed.jpg"/>


      <p> We found that with a p-value of &lt; 0.01, the number of generations judged as outliers was significant when compared to the number of generations deemed not outliers. This result was surprising to us, because it demonstrated that even outside of the prompt, there are stochastic components of the generation that can significantly vary the quality of the generation.  We concluded from this experiment that it is prudent to try multiple seeds during prompt engineering. A design guideline that follows is to <strong> generate between 3 to 9 different seeds to get a representative idea of what a prompt can return.</strong></p>

      <h3>Experiment 3. Length of Optimization </h3>
      <LineDivider />

      <p>
      A free parameter during each run of text-to-image models is the length of optimization: the number of iterations the networks are run for. Typically, we can expect that the more iterations, the lower and more stable the loss, and ideally the better the image. We wanted to investigate on average how many iterations are needed to get a decent result. We also wanted to see if runs with lower iterations could produce images with just as good generation quality as runs with higher iterations; a lower number of iterations means faster results, and for future systems involving text-to-image generation, we would want to know an average number of iterations needed to arrive at a favorable result. Our specific research question was: <strong> does the length of optimization correlate with better evaluated generations? </strong>
      </p>

      <p>
      To investigate this, we tested 6 subjects (happiness, sadness, man, cat, ocean, and forest) across 12 styles, with a constant seed and one variety of prompt permutation. We ran the generations for 1000 iterations, and had users evaluate the generations every 100 iterations. We chose 1000 iterations as the maximum because we wanted to try a number of short to moderate wait times and 1000 is a suggested default. 
      </p>
      
      <p>
      We had annotators annotate rows of generations saved at different steps of the iteration. These were specifically steps that were multiples of 100 up to 1000. We found that the difference between the chosen iteration steps was significant upon performing a chi-squared test (p-value=0.01). This demonstrates that a higher number of iterations did not correlate with a more desirable generation, as one might have been expected considering that more iterations optimize the image and text representations towards one another. This is a non-intuitive result meaning that the  multimodal methods (of the time, Aug 2021) do not always optimize towards generations that we <em>prefer</em>.

      We conclude from this experiment <strong>when generating with fast iteration in mind, using shorter lengths of optimization between 100 and 500 iteration is sufficient </strong>. However, as can be seen in the Figure below, at the lower end of this range (ie. 100 iterations), the subject is not guaranteed to have manifested in the generation yet. One reason people preferred 100 or 200 iteration generations is because in certain styles such as abstract ones, the subject does not need to manifest as saliently. Therefore, we suggest 300 iterations as a good default, which is also what we use throughout the rest of the experiments.
      </p>

    
      <img class="paper_figure" src="./images/design_guidelines/designguidelines_iterations.jpg"/>

      <h3>Experiment 4. Style  </h3>
      <LineDivider />

      <p>
      We understood that style was a keyword we could use to suggest an aesthetic within a generation. However given that there are an abundant amount of styles, we wanted to see if the model would perform equally well across a breadth of styles. Could VQGAN+CLIP, in all its pretraining, handle <em>any</em> style? In addition, we also wanted to understand if the framework would perform differently for different classes of styles and if the framework was biased towards certain traditions of styles.
      </p>

      <p>
      To rigorously investigate this, we looked at three "partitions" of styles: abstract versus figurative, Western versus non-Western, and styles partitioned by time period (digital, modern, and premodern).

      </p>
      
      <p> 
      We had the following hypotheses for each:

        <ul>
          <li>
          For abstract versus figurative styles, we assumed abstract styles would perform better because we thought they would be more tolerant to the deconstructed, global incoherence endemic to many generations.
          </li>
          <li>
          For Western versus non-Western styles, we assumed that the model would perform better on Western art, since many of the computer science datasets relevant to art focus on Western schools of art (i.e. WikiArt and MetFaces).
          </li>
          <li>
          For styles partitioned by digital, modern, and premodern time periods, we thought digital styles would do better, as the model we used was trained on images and text from the Internet.
          </li>
        </ul>
      </p>

      <p>
      To comprehensively investigate the breadth of stylistic knowledge the framework had within reach and to see if we could use style as a keyword to structure prompts, we tested a large number of styles.

      A style, from the perspective of art history, represents a distinctive way in which visual arts can be grouped. To operate on this definition methodologically, we pulled styles from existing knowledge bases of art history and aesthetics online. We looked in particular at The Metropolitan Museum of Art Heilbrunn Timeline of Art History, the Aesthetics Wikia, the schema by which the WikiArt dataset was organized, and relevant Wikipedia articles to produce the set of 51 styles. These styles were chosen to balance certain factors that influence style such as time periods, culture, and whether they were abstract or figurative in the way the style represented the real world.

      </p>

      <img class="paper_figure" src="./images/design_guidelines/designguidelines_styles.jpg"/><br></br>

      <p>
      Annotators with backgrounds in media arts and art practice each received a set of subject and style combinations in random order. They additionally received links to Google Images for each style, in case they needed visual references for styles. They annotated each generated combination (which was just a single image) as per the following rubric: 
      <ul>
        <li>
        1: Extremely poor representation of the style, no motifs were present
        </li>
        <li>
        2: Bad representation of the style, few motifs were present
        </li>
        <li>
        3: Average representation of the style, some motifs were present
        </li>
        <li>
        4: Good representation of the style, high number of motifs were present
        </li>
        <li>
        5: Excellent representation of the style, very high number of motifs were present
        </li>
      </ul>
      
      </p>

      <p>
      The figure below shows average ratings for all 51 styles and illustrated that the model performed better on some styles than others. We first elaborate on the success modes and failure modes across all the styles as a whole before approaching the partition experiments in depth.
      </p>
      <img class="paper_figure" src="./images/design_guidelines/designguidelines_stylesall.jpg"/><br></br>

      <p>
      {/* The first recurring theme across successful styles was the presence of salient color schemes. This was apparent in some of the most positively judged styles such as <em>Ukiyo-e, glitch art, cyberpunk,</em> and <em>thangka</em>. These generations, pictured in the following figure,  demonstrate that text-to-image models can match styles to some of their signature color palettes without explicitly involving color details in the prompt.  */}

      We qualify different modes of success seen across the 51 styles we generated for. These modes were <em>color, technique, relationships in space,</em> and <em>motifs</em>. Generations were able to express <em>color</em>, well in terms of stereotypical color palettes, textures, and contrasts. The basics of <em>technique</em> were also captured in the variety of lines, elementary strokes, and shapes expressed. Generations also demonstrated proficiency in setting lighting and forming patterns, establishing good <em>relationships in space</em>. <em>Motifs</em> from styles were also readily accessible; for example, we can see ornate swirls in Baroque generations or the dimensional features relevant to Mayan relief sculptures in the last row.
      </p>

      <img class="paper_figure" src="./images/design_guidelines/DesignGuidelines_StylesFigureSuccess.jpg"/><br></br>

      <p>
      For Experiment 4, we illustrate the failure modes we observed across styles: misunderstandings owing to the multiple interpretations of the text prompt, an inability to correctly capture the style, style incongruencies, and defaulting to certain motifs. Style incongruencies occurred when text or elements otherwise incongruent with the style would emerge in the middle of the generation. The area shaded in green shows reference images of styles that give context for why certain generations were failures. 
      </p>
      <img class="paper_figure" src="./images/design_guidelines/DesignGuidelines_StyleFailureModes.jpg"/><br></br>


      <h3>Experiment 4 Continued. Style Partitions</h3>

      <p>

      In the left subgraphs, averages are reported for each category of the three partitions studied: (Abstract, Figurative), (West, Non-West), (Digital, Modern, Premodern). The right figures are bar graphs which rank each style included in the partitions by their aggregate means from low to high left to right, coloring for their respective categories. We found significant differences between the abstract and figurative styles as well as the digital, modern, and pre-modern styles.

      </p>
    
      <img class="paper_figure" src="./images/design_guidelines/designguidelines_stylepartitions.jpg"/>

      <p>
        <ul>
          <li><strong>Abstract vs. Figurative.</strong> We found that abstract styles averaged a 2.63 rating (standard error 0.06) , while figurative styles averaged a 3.16 rating (standard error 0.06) . After running a chi squared test on the frequencies of ratings we found the difference between these ratings was significant to a p value of 0.01.</li>
          <li><strong> Western vs. Non-Western </strong> We found that Western art styles averaged 2.92 (standard error: 0.07), while non-Western art styles averaged 2.95 (standard error: 0.06). Using a Mann-Whitney test, we found that there was an insignificant difference between the distribution of ratings for Western styles and the distribution for ratings for non-Western styles (p-value: 0.377).</li>
          <li><strong> Digital, Modern, Pre-modern.</strong> We found that digital styles performed the worst, then modern styles, and then premodern styles with aggregate annotator ratings of 2.41, 2.83, and 3.11 respectively. Using a Kruskal Wallace test, we found these differences to be highly significant p-value = 0.001. We found that this difference between the styles partitioned by time period was significant, and that digital styles performed the worst. One potential reason could be that the digital styles we covered had more inherent stylistic range.  </li>
        </ul>

        Models are able to capture an extensive range of styles even if it performs differently dependent upon the nature of the style. Many perform well so long as they are not prone to misinterpretation or other aforementioned failure modes. We conclude from this experiment the following design guideline: <strong>when choosing the style of the generation, feel free to try any styles, no matter how niche or broad.</strong>


      
    
      </p>
      
      
      <h3>Experiment 5: Interaction between subject and style</h3>
      <LineDivider />

      <p>

      Given the varied but still successful application of style as a steering keyword within prompts, we wanted to investigate the subject keywords similarly and then observe how subject and style as parameters would interact with each other. We focus on the interaction of subject and style in this experiment, and pursue the following research questions: <strong>To what degree do categories of subject and style influence one another? Do categories of styles, such as abstract or figurative styles, perform better on certain categories of subjects, such as abstract or concrete subjects?</strong>

      </p>

      <p>
      To study the effect of interaction of subject and style, we generated 1581 images from 51 subjects, 31 styles. Annotators with experience in art and design annotated each generated image for the coherency of subject and style within the image as a similar rubric to Experiment 4.
      </p>

      <p>
      Two variables we wanted to test in the experiment were the abstract or concrete nature of the subject and the abstract or figurative nature of the style. 1) We first studied just the abstract or concrete nature of the noun alone, aggregating results by subject. We found that the top ten subjects were all categorically concrete, with an average concreteness value of 4.47. They were all subjects that were universal across most cultures: ocean, forest, house, eye, bird. Examples of these top subjects crossed with different styles are illustrated in the Figure below. We found that when we compare the abstractness of the noun to the quality of the generation, there is an r value / Pearson's coefficient of 0.62, which implies a moderate to strong positive association. This means that on average there is a trend where concrete subjects tend to do better. 2) We then considered the influence of the abstract or figurative nature of style as well, by looking at the generations from a factorial 2x2 lens. We found the following aggregate rankings for the enumerated categories: abstract-abstract (3.05), abstract-concrete (3.17), figurative-abstract (3.49), and figurative-concrete (3.54). In running a two-way ANOVA on the annotations we found that all p-values were significant, being well below 0.01. This allows us to conclude that both factors have a significant effect on the rating of the generation. Likewise, we saw that their interaction is also significant to a p-value well below 0.01.
    
      </p>

      <p>
      In Experiment 5, we looked at both subject and style words in the prompt. We crossed abstract and concrete subjects with abstract and figurative styles. In this figure above, we show some success cases within each crossed category.
      </p>

      <img class="paper_figure" src="./images/design_guidelines/DesignGuidelines_SubjectStyleBest.jpg"/>


      {/* <p>
      <strong> Success modes included: correct application of symbolism, . </strong> In many subjects, the text-to-image framework was able to demonstrate that it could access and apply symbols. For example, in most generations for hearts, heart symbols emerged out of the image (even if the symbol was incongruent with the style, for example as a heart symbol would be in Ukiyo-e art). 
      </p> */}

      {/* <p>
      Also in Experiment 5, we illustrated the failure mode where the subject drops out for certain styles (see left three images).



      </p> */}


      <p>
        More details discussing the results each experiment and result can be found in the paper.
      </p>

      <LineDivider />

      <Bibliography />

      




     
      

    </div>
  );
};

export default ProjectDesignGuidelines;