import React from 'react';

const FreelanceContent = () => {
    const images = [


        { src: "./images/maker/ganaxies.gif", alt: "Ganaxies" },
        { src: "./blogpost_images/car_shapes.gif", alt: "La la land" },


    ];

    return (
        <>
            <h1>Postgrad, Freelance Portfolios test</h1>
            <img width="480px" src="./images/maker/hintzehall.gif" />  
            <br></br>
            <p>

                So after college I didn't have a job lined up. I had interviewed at Apple and Disney Imagineering for creative technologist roles and made it to final rounds, but I didn't get any of jobs in the end. That was okay. College was kind of a lot for me, and I thought I would figure it out in due time. While I interviewed, I tried to learn some stuff in Blender and Unity. The main image was something I made that winter, where I took a photogrammetry model of Hintze Hall and did something with Unity's Vfx graph that made the point cloud / shader / Bloom pass effect.

            </p>

            <p>
                I ended up doing some freelance gigs, first for this design agency in SF called All of It Now (AOIN) and another gig for a design agency called prefrontal cortex. I got connected with the first role because I had attended SF Design Week. I walked into AOIN and saw that they had done some of the work for BTS and Halsey, and I talked to one of the designers about my experience making things. They told me they didn't see where that might fit in with the work that they did. A few months later they contacted me to ask if I knew how to create RFID sensors. I knew quite a bit about sensing and actuation actually, but I had never worked specifically with RFID technology. My mentors at Berkeley encouraged me to take the opportunity to learn on the job (lol).

            </p>

            <div sx={{"display": "flex", "flexDirection": 'row'}} >
                <img src="./blogpost_images/bts.gif"/>



            </div>
            
            <p>
              
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

        </>
    );
};

export default FreelanceContent;
