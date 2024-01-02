// AboutPage.js
import './App.css';

import React from 'react';
import Navigation from './components/Navigation';

const AboutPage = () => {
  return (
    <div>
        
     <Navigation />

      <h1>About</h1>
      


      <p>I'm currently a third year Computer Science PhD Student at Columbia University and a National Science Foundation Graduate Research Fellow. I work on human-computer interaction with Professor Lydia Chilton in the Computational Design Lab.
      </p><br>
      </br>
      <p>
      I graduated from UC Berkeley with Distinction in Computer Science and Cognitive Science. I also earned a certificate in New Media.
      </p><br></br>
      <p>
      In my free time, I like to design, write, and dance on the Columbia Dance Team. 
      </p>


      <img width="256px" src="./images/profile.png"/>
    </div>
  );
};

export default AboutPage;