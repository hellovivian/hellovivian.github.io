// AboutPage.js
import './App.css';
// import './Profile.css';


import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import React from 'react';
import Navigation from './components/Navigation';
import { Link } from 'react-router-dom';


const AboutPage = () => {
  return (
    <div >
        
     {/* <Navigation /> */}

      {/* <h1>About</h1> */}
      
    {/* <div className="profile-container"> */}
    {/* <img height="256px" src="./images/profile.jpeg"/>
    <div>
    <p class="about_text">I'm currently a fourth year Computer Science PhD Student at Columbia University and a National Science Foundation Graduate Research Fellow. I work on human-computer interaction with Professor Lydia Chilton in the Computational Design Lab.
      </p>

      <p class="about_text">
      In my free time, I like to design, write, and dance in New York City. During the third year of my PhD, I danced on the Columbia Dance Team, performing half time at football and basketball games. 

      </p>
      <p class="about_text">
      I graduated from UC Berkeley with Distinction in Computer Science and Cognitive Science. I also earned a certificate in New Media. During my undergrad, I loved to make things at the Jacobs Institute of Design.

      </p>

      <Link to="/Blog">Blog</Link>

      {/* <p class="about_text">
      All the images on the front page have special meaning to me. They cover some of my first personal projects and professional experiences. 
      </p> */}



      <br></br> 
      <div class="empty">

      </div>
      <div class="video_title_card_container">
  <p class="video_title"><strong>LogoMotion</strong>
  </p>
  {/* <hr></hr>
  <p class="video_authors">Vivian Liu<sup>1,2</sup>, Rubaiat Habib Kazi<sup>2</sup>, Li-Yi Wei<sup>2</sup>, Matthew Fisher<sup>2</sup>, Timothy Langlois<sup>2</sup>, Seth Walker<sup>2</sup>, Lydia Chilton<sup>1</sup>

  </p>
      
  <p class="video_authors">
  Columbia University<sup>1</sup>, Adobe Research<sup>2</sup>

  </p> */}

</div>




      <Grid container id="maker_gallery" rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={2}>
        {/* <img class="maker_pic" src="./images/maker/fishbox.png"></img> */}
        <img width="256px" src="./logomotion_gifs/chess1.gif"></img>

        </Grid>
        <Grid item xs={2}>

          {/* <img class="maker_pic" src="./images/maker/hand.png"></img> */}
          <img width="256px" src="./logomotion_gifs/lantern1.gif"></img>

        </Grid>
        <Grid item xs={2}>
        {/* <img class="maker_pic" src="./images/maker/livinghingevase.png"></img> */}
        <img width="256px" src="./logomotion_gifs/cat1.gif"></img>

        </Grid>
        <Grid item xs={2}>
        {/* <img class="maker_pic" src="./images/cat.png"></img> */}
        <img width="256px" src="./logomotion_gifs/warrior1.gif"></img>

        </Grid>
        <Grid item xs={2}>
        {/* <img class="maker_pic" src="./images/character.png"></img> */}
        <img width="256px" src="./logomotion_gifs/acapella1.gif"></img>


        </Grid>
        <Grid item xs={2}>
        {/* <img class="maker_pic" src="./images/maker/CADhand.png"></img> */}
        <img width="256px" src="./logomotion_gifs/adventure1.gif"></img>


        </Grid>
        <Grid item xs={2}>
        {/* <img class="maker_pic" src="./images/maker/infinity_mirror.png"></img> */}
        <img width="256px" src="./logomotion_gifs/crab1.gif"></img>


        </Grid>
        <Grid item xs={2}>
        {/* <img class="maker_pic" src="./images/maker/tomandjerry.png"></img> */}
        <img width="256px" src="./logomotion_gifs/tennis1.gif"></img>


        </Grid>
       
        <Grid item xs={2}>
        {/* <img class="maker_pic" src="./images/maker/priorwork.png"></img> */}
        <img width="256px" src="./logomotion_gifs/tacos1.gif"></img>


        </Grid>

        <Grid item xs={2}>
        {/* <img class="maker_pic" src="./images/maker/priorwork.png"></img> */}
        <img width="256px" src="./logomotion_gifs/circus1.gif"></img>


        </Grid>

        <Grid item xs={2}>
        {/* <img class="maker_pic" src="./images/maker/priorwork.png"></img> */}
        <img width="256px" src="./logomotion_gifs/stars.gif"></img>


        </Grid>

       
        <Grid item xs={2}>
        {/* <img class="maker_pic" src="./images/maker/priorwork.png"></img> */}
        <img width="256px" src="./logomotion_gifs/hockey.gif"></img>


        </Grid>
        


        




      </Grid>

{/* <div class="video_title_card_container">
  <p class="video_title"><strong>LogoMotion</strong>
  </p>
  <hr></hr>
  <p class="video_authors">Vivian Liu<sup>1,2</sup>, Rubaiat Habib Kazi<sup>2</sup>, Li-Yi Wei<sup>2</sup>, Matthew Fisher<sup>2</sup>, Timothy Langlois<sup>2</sup>, Seth Walker<sup>2</sup>, Lydia Chilton<sup>1</sup>

  </p>
      
  <p class="video_authors">
  Columbia University<sup>1</sup>, Adobe Research<sup>2</sup>

  </p>

</div> */}

      
      

    {/* </div> */}

    {/* </div> */}

      


     
    </div>
  );
};

export default AboutPage;




