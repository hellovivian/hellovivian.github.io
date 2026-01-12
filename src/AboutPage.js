// AboutPage.js
import './App.css';

import Grid from '@mui/material/Grid';
import React from 'react';
import Navigation from './components/Navigation';



const AboutPage = () => {
  return (
    <div class="container" >

      <Navigation />

      <h1>About</h1>

      <div className="profile-container">
        <div class="split-horizontal">
          <div class="vertical-flex">

            <p class="about_text">I'm currently a fifth year Computer Science PhD Student at Columbia University. My PhD was supported by a National Science Foundation Graduate Research Fellowship. I work on the intersection of human-computer interaction and generative AI with <a href="https://www.cs.columbia.edu/~chilton/#">Professor Lydia Chilton</a> in the Computational Design Lab. Previously, I worked at Google Deepmind, Adobe Research, and Autodesk Research.</p>

            <p class="about_text">
              In my free time, I like to design, write, and dance in New York City. During the third year of my PhD, I danced on the Columbia Dance Team, performing half time at football and basketball games.

            </p>
            <p class="about_text">
              I graduated from UC Berkeley with Distinction in Computer Science and Cognitive Science. I also earned a certificate in New Media. During my undergrad, I loved to <a href="/#/blog/made-in-berkeley">make things </a>  at the Jacobs Institute of Design.

            </p>
            <br></br>
            <a class="cv-button" href="VivianLiu_Columbia_CV_Dec_2025.pdf">Curriculum Vitae</a>
          </div>

          <img height="484px" src="./images/me.jpg" />

        </div>



        <div>

          <br></br>


          <br></br><br></br>

          <Grid container className="maker_gallery" rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={3}>
              <img class="maker_pic" src="./images/maker/fishbox.png"></img>


            </Grid>
            <Grid item xs={3}>

              <img class="maker_pic" src="./images/maker/hand.png"></img>


            </Grid>
            <Grid item xs={3}>
              <img class="maker_pic" src="./images/maker/livinghingevase.png"></img>


            </Grid>
            <Grid item xs={3}>
              <img class="maker_pic" src="./images/cat.png"></img>


            </Grid>
            <Grid item xs={3}>
              <img class="maker_pic" src="./images/character.png"></img>



            </Grid>
            <Grid item xs={3}>
              <img class="maker_pic" src="./images/maker/CADhand.png"></img>



            </Grid>
            <Grid item xs={3}>
              <img class="maker_pic" src="./images/maker/infinity_mirror.png"></img>



            </Grid>
            <Grid item xs={3}>
              <img class="maker_pic" src="./images/maker/tomandjerry.png"></img>
              {/* <img width="256px" src="./logomotion_gifs/tennis1.gif"></img> */}


            </Grid>


          </Grid>


        </div>
      </div>





    </div>
  );
};

export default AboutPage;




