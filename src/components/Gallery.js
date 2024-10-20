import React from 'react';

const Gallery = (props) => {

  const imgsrc = props.imgsrc;

  return (
    <div className="gallery-container">

    <div className="gallery-row">
        <img className="gallery-preview" src="./images/gallery1.jpeg"/>
        <img className="gallery-preview" src="./images/gallery2.jpeg"/>
        <img className="gallery-preview" src="./images/gallery3.jpeg"/>

    </div>

    <div className="gallery-row">
        <img className="gallery-preview" src="./images/gallery4.jpeg"/>
        <img className="gallery-preview" src="./images/gallery5.jpeg"/>
        <img className="gallery-preview" src="./images/gallery6.jpeg"/>

    </div>

    
    

      
      

    </div>
  );
};

export default Gallery;