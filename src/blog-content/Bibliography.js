import React from 'react';
import BlogBibliography from '../blogBibliography';
import blogBibliographyData from '../data/blogBibliographyData';
import '../Bibliography.css'; 


const BibliographyContent = () => {
  return (
    <>
      <h1>Pointers to Papers, Research, and Essays</h1>
      {/* <img width="360px" src="./blogpost_images/Squilliam_Returns_098.webp" alt="Related Work"/> */}
      <div className="profile-container">
        <p>
        Here are some pointers to work that shaped my thinking and work. This page is actively under construction.

        </p>
        <hr></hr>

        <BlogBibliography
          projectname={blogBibliographyData.projectname}
          sections={blogBibliographyData.sections}
        />
        {/* <img width="480px" src="https://64.media.tumblr.com/1fdb4166f6f04fc65aca4ad6240f1dd6/tumblr_nobbxwN7Ik1rwfctbo4_1280.gif"></img> */}


    </div>

     
      </>

  );
};

export default BibliographyContent;
