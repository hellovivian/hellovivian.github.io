// AboutPage.js
import './App.css';
import './Profile.css';

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
    <p>I'm currently a fourth year Computer Science PhD Student at Columbia University and a National Science Foundation Graduate Research Fellow. I work on human-computer interaction with Professor Lydia Chilton in the Computational Design Lab.
      </p><br>
      </br>
      <p>
      I graduated from UC Berkeley with Distinction in Computer Science and Cognitive Science. I also earned a certificate in New Media.
      </p><br></br>
      <p>
      In my free time, I like to design, write, and dance on the Columbia Dance Team. 
      </p>

    </div>

    </div>

      


     
    </div>
  );
};

export default AboutPage;