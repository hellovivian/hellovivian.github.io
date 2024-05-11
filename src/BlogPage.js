// AboutPage.js
import './App.css';
// import './Profile.css';


import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import React from 'react';
import Navigation from './components/Navigation';
import Video from './components/Video';
import ReactPlayer from 'react-player'


const BlogPage = () => {
  return (
    <div className='container'>
        
     <Navigation />

      <h1>Blog</h1>
      
    <div className="profile-container">
    {/* <img height="256px" src="./images/profile.jpeg"/> */}
    <div>
    <p class="about_text">Under construction, please standby. :) </p>

    <div >
            <ReactPlayer
            className='react-player fixed-bottom'
            url="./disco_videos/lastcarnival.mp4"
            controls = {true}
            style={{dropShadow: "none"}}


            />

    

        </div>


    
      <p class="about_text">
      
      </p>

      {/* <p class="about_text">
      All the images on the front page have special meaning to me. They cover some of my first personal projects and professional experiences. 
      </p> */}



      <br></br>

    
      
      

    </div>

    </div>

      


     
    </div>
  );
};

export default BlogPage;