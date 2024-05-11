// AboutPage.js
import './App.css';
// import './Profile.css';
import BlogPost from './components/BlogPost';

import blogData from './data/blogData.js';
import AliceCarousel from 'react-alice-carousel';


import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import React from 'react';
import Navigation from './components/Navigation';
import Video from './components/Video';
import ReactPlayer from 'react-player'
import 'react-alice-carousel/lib/alice-carousel.css';

const responsive = {
  0: { items: 1 },
  256: { items: 2 },
  512: { items: 3 },
  768: { items: 4 },
  1024: { items: 5 },
};

const items = [
  <div className="item" data-value="1">

<video src="./disco_videos/lastcarnival.mp4" controls={true}></video>


  
   </div>,
     <div className="item" data-value="1">

{/* <video src="./disco_videos/lana.mp4" controls={true}></video> */}
 
  </div>,
  <div className="item" data-value="2">

{/* <video src="./disco_videos/taylor_mirrorball.mp4" controls={true}></video> */}

      
      
  </div>,
  <div className="item" data-value="3">
              {/* <img width="256px" src="./logomotion_gifs/warrior1.gif"></img> */}


  </div>

];

const Carousel = () => (

    


  <AliceCarousel

      mouseTracking
      items={items}
      responsive={responsive}
      controlsStrategy="alternate"
  />
);

const BlogPage = () => {
  return (
    <div className='container'>
        
     <Navigation />

      <h1>Blog</h1>
      
    <div className="profile-container">
    {/* <img height="256px" src="./images/profile.jpeg"/> */}
    <div>
    <p class="about_text">Under construction, please standby. :) </p>


   

        {blogData.map((project) => (


      
<BlogPost projectname={project.title} date={project.date} authors={project.authors} projectpage={project.links.pg} codelink={project.links.codelink} video={project.links.video} demolink={project.links.demolink} paperlink={project.links.paperlink} venue={project.venue} imgsrc={project.links.img_src}/>


))}
 {/* <div >
            <ReactPlayer
            className='react-player fixed-bottom'
            url="./disco_videos/lastcarnival.mp4"
            controls = {true}
            style={{dropShadow: "none"}}


            />

    

        </div> */}


    
      <p class="about_text">
      
      </p>

      {/* <p class="about_text">
      All the images on the front page have special meaning to me. They cover some of my first personal projects and professional experiences. 
      </p> */}



      <br></br>

    
      
      

    </div>

    </div>

      
<h3>Disco Playlist</h3>
<hr></hr>
    <Carousel></Carousel>

     
    </div>
  );
};

export default BlogPage;