// projectDisco.js

import React from 'react';

import './Disco.css';
import Navigation from './components/Navigation';
import './App.css';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import Video from './components/Video';

import discoData from './data/discoData';  // Assuming projectData is in the same directory

const responsive = {
    0: { items: 1 },
    256: { items: 2 },
    512: { items: 3 },
    768: { items: 4 },
    1024: { items: 5 },
};

const items = [
    <div className="item" data-value="1">

        <Video className='videoCard' song="Beauty and a Beat" artist='Justin Bieber' url="./disco_videos/AIArt1.mp4"/>
    
     </div>,
    <div className="item" data-value="2">

        
        <Video className='videoCard' song="One More Time" artist='Daft Punk' url="./disco_videos/daftpunk.m4v"/>
        
    </div>,
    <div className="item" data-value="3">
        <Video className='videoCard' song="Empire State of Mind" artist='Alicia Keys' url="./disco_videos/nyc.mp4"/>
    </div>,
    <div className="item" data-value="4">
        <Video className='videoCard' song="Creep" artist='Radiohead' url="./disco_videos/creep_done.m4v"/>
    </div>,
    <div className="item" data-value="5">
        <Video className='videoCard' song="Dark Horse" artist='Katy Perry' url="./disco_videos/darkhorse.m4v"/>
    </div>,
    <div className="item" data-value="6">
    <Video className='videoCard' song="Beauty and a Beat" artist='' url="./disco_videos/fightinggravity.m4v"/></div>

];



const Carousel = () => (

    


    <AliceCarousel
        mouseTracking
        items={items}
        responsive={responsive}
        controlsStrategy="alternate"
    />
);
const DiscoProjectPage = () => {
  return (
    
    <div className="discoContainer">
        
     <Navigation />
      <h3>Disco</h3>

      <img src=""></img>
      <Carousel></Carousel>
      
    </div>
  );
};

export default DiscoProjectPage;