// AboutPage.js
import './App.css';
// import './Profile.css';


import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import React from 'react';
import Navigation from './components/Navigation';

const AboutPage = () => {
  return (
    <div className='container'>
        
     <Navigation />

      <h1>About</h1>
      
    <div className="profile-container">
    <img height="256px" src="./images/profile.jpeg"/>
    <div>
    <p class="about_text">I'm currently a fourth year Computer Science PhD Student at Columbia University and a National Science Foundation Graduate Research Fellow. I work on human-computer interaction with Professor Lydia Chilton in the Computational Design Lab.
      </p>

      <p class="about_text">
      In my free time, I like to design, write, and dance in New York City. During the third year of my PhD, I danced on the Columbia Dance Team, performing half time at football and basketball games. 

      </p>
      <p class="about_text">
      I graduated from UC Berkeley with Distinction in Computer Science and Cognitive Science. I also earned a certificate in New Media. During my undergrad, I loved to make things at the Jacobs Institute of Design.

      </p>

      {/* <p class="about_text">
      All the images on the front page have special meaning to me. They cover some of my first personal projects and professional experiences. 
      </p> */}



      <br></br>



      <Grid container id="maker_gallery" rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
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

        </Grid>
       
        {/* <Grid >
        <img class="maker_pic" src="./images/maker/priorwork.png"></img>

        </Grid> */}

        


      </Grid>
    
      
      

    </div>

    </div>

      


     
    </div>
  );
};

export default AboutPage;