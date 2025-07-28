import React from 'react';
import Navigation from './components/Navigation';

const BlogFreelancePage = () => {
    const images = [

        // { src: "./images/maker/hintzehall.gif", alt: "Hintz" },
        { src: "./images/maker/ganaxies.gif", alt: "Ganaxies" },
        // { src: "./images/maker/ganaxies.gif", alt: "La la land" },


    ];

    return (
        <div className='container'>
            <Navigation />

            <h1>Freelance</h1>
            <img width="720px" src="./images/maker/hintzehall.gif" />  
            <br></br>
            <p>

                So after college I didn't have a job lined up. I had interviewed at Apple and Disney Imagineering for creative technologist roles and made it to final rounds, but I didn't get any of them. College was kind of a lot for me, and I thought I would figure it out in due time. 
                
                While I interviewed, I tried to learn some stuff in Blender and Unity. The banner image was something I made that winter: I took a photogrammetry model of Hintze Hall (<a href="https://sketchfab.com/3d-models/hintze-hall-45f5e56887f44075bbf283977c99541f">credit</a>) and used Unity's Vfx graph to post-process it with a particle cloud effect.

            </p>

            <p>
                I ended up doing some freelance gigs, first for this design agency in SF called <a href="">All of It Now (AOIN) </a> and another gig for a design agency called prefrontal cortex. I got connected with the first role because I had attended SF Design Week, and AOIN had done an open house. When I noticed that they had done some of the work for BTS and Halsey, and I talked to one of the designers about their experience working on the road for artists. I also showed them a portfolio I had printed out of my work, which had both digital fabrication as well as immersive projects. Though at the time, they told me they didn't see a fit or possible internship, a few months later they reached out again, this time to ask if I knew how to create RFID sensors. I knew quite a bit about sensing and actuation actually, but I had never worked specifically with RFID technology. My mentors at Berkeley encouraged me to take the opportunity to learn on the job. That was how I got my first freelance contract.

            </p>
            <p>
            </p>
            

            <div sx={{"display": "flex", "flexDirection": 'row'}} >
                <img src="./blogpost_images/bts.gif"/>
                                {/* <img src="./blogpost_images/bts.gif"/> */}


            </div>
            
            <p>
                CAR CHAIR SHAPES 

                After that first gig was done, I heard back from the second design agency, who wanted to explore an interactive experience with 3D machine learning. I learned how to make these warping shapes, which I showed to my future advisor when I interviewed with her.
            </p>
            <p>
                 Many years, for a conference in Germany, I got to visit in person. 
            </p>
            {/* <p>
                tl;drs: 
                - Keep a portfolio.
                - Learn on the job. 
            </p> */}
            <p>
            </p>


            <br></br>


            {/* Graphic design, web design, 3D printing, laser cutting, physical computing, digital fabrication, VR/AR, computational photography, game engines. */}
            <br></br>

            <div className="maker-gallery">
                {images.map((image, index) => (
                    <div className={`tile ${(index % 4 === 1 || index % 4 === 2) ? 'margin-top-2em' : ''}`} key={index}>
                        <img className="maker_pic" src={image.src} alt={image.alt} />
                    </div>
                ))}
            </div>

            {/* <h1>Process </h1> */}


            {/* <hr></hr> */}

        </div>
    );
};

export default BlogFreelancePage;
