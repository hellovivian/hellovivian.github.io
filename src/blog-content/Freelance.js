

const FreelanceContent = () => {

    return (
        <>
            {/* <img width="600px" src="./images/maker/hintzehall.gif"></img><br></br> */}


            <img width="600px" src="./blogpost_images/hintze.png" />  
            <br></br>
            <p>

                So after college I didn't have a job lined up. I had interviewed at Apple and Disney Imagineering for creative technologist roles and made it to final rounds, but I didn't get any of jobs in the end. That was okay. College was kind of a lot for me, and I thought I would figure it out in due time. 

            </p>

            <p>
                I ended up doing some freelance work, first for this one design agency in SF called All of It Now (AOIN) and another for a design agency in Germany called prefrontal cortex. I got connected with the first role because I had attended SF Design Week. I walked into All of It Now and saw that they had done some of work for <a href="https://kevzhu.com/stuff/bts-world-tour">BTS</a> and Halsey concerts. When I saw this AR heart signal from one of BTS guys, I thought "woah" -- I should stay and talk to these designers. I had my paper portfolio on hand, so I shared some my prototyping work, which had some parts digital fabrication and some parts mixed reality (AR/ VR) work.</p>
                
                 <img width="600px"  src="./blogpost_images/bts.gif"/>

               <p> The designers were very nice even though they didn't see a fit. But a few months later, they contacted me to ask if I knew how to create RFID sensors. I knew quite a bit about sensing and actuation actually, and it was the perfect niche short-term job for me to accept. I had never worked specifically with RFID technology, but that was fine, every physical computing project tended to involve new parts and circuitry. My mentors at Berkeley encouraged me to take the opportunity and said they knew I could learn on the job. So I accepted.

            </p>
            <p> Because of some rules in California that were meant to protect independent contractors, to engage with design agencies as a business entity, I ended up getting a business license, writing a business proposal, and figuring out how to keep a book for my expenses. I still have some receipts from Ace Hardware and Adafruit where it says I paid something like $3.61 for nuts and bolts, $35 for each Raspberry Pi I ordered (haha). </p>

            <p>
              
            After that first gig was done, I heard back from the second design agency, prefrontal cortex. They were open to collaborating with me, and I was ecstatic about this. We floated different ideas around sensors but eventually gravitated towards an interactive AI and art experience. This gig gave me the opportunity to learn and do more independent work on deep learning. At the time, transfer learning, GANs, autoencoders, and latent spaces were in vogue architectures, and Refik Anadol was a popular artist working and exhibiting with machine learning as part of his art practice. I started with this motivation and began learning generated 2D images and 3D shapes (because I had come across a neat paper about <a href="https://proceedings.mlr.press/v80/achlioptas18a/achlioptas18a.pdf"> pointclouds with open source code </a>). I think it is worth mentioning that AI art meant something quite different in 2020. Any model that generated anything was typically class-specific (e.g. generate only birds, only faces, or only house facades), and there were no bindings to natural language (e.g. you couldn't prompt a picture).
            
            </p>
            <p>
                I ideated some fun things with Felix Herbst, my collaborator at prefrontal cortex. One concept was to take the learned latent space, which was hyperdimensional (n=512 dimensions) and apply dimensionality reduction to fit it into a 3-dimensions to make a 3D minimap of the latent space. If we walked along one of the xyz dimensions, while taking cross-sections of the down-projected latent space, we could essentially do an "MRI" of a latent space. Plus, with a 3D minimap, a user could explore the latent space spatially; moving up / down / left / right would change the generated image. This was a very-artistic, yet very-engineering project because there was AI, interactivity, and a desire to make things as real-time as possible. On low-truncation (a hyperparameter), I noticed that color was the most salient thing that changed, and it shifted in a very legible yet beautiful way.
                {/* To make things as real-time as possible, I remember using Spout to handle the GPU graphics sharing between Unity and the GAN model I had opened on another port. */}

            </p>
            <img width="600px" src="./blogpost_images/latentspace_crosssection.gif"></img>

            <p>
                Another concept was to train on a dataset of NASA images and make a planetarium show by doing a Fulldome projection. 
            </p>
            <img src="./blogpost_images/ganaxies.gif"></img>
            <p>
            Concurrently, I was also learning how to make latent spaces representing 3D shapes. By interpolating between two latents and sampling the intermediate vectors, one could create a shape interpolation. I actually showed this car-table warp and explained the method to my advisor when I interviewed with her for the PhD.
            
             {/* I also trained on 3D meshes of animals and made these digital pinata blobs that zipped between different animals (color function credit: <a href="https://x.com/hybridherbst?lang=en"> Felix</a>). I recently found the deck I made for this project -- it was called "Hyperdimensional Matter". Haha, I think it was trying for that lofty art world speak, but from a technical standpoint, it's actually an accurate title.  */}


            </p>
            
           <img width="600px" src="./blogpost_images/car_shapes.gif" /><br></br>
                      {/* <img width="600px"  src="./blogpost_images/hyperdimensional_matter.gif" /> */}

            <br></br>
           {/* <div style={{ display: "flex", width: "600px", margin: "0 auto" }}>
                <div style={{ width: "50%" }}>
                    <img src="./blogpost_images/deck1.png" />

                </div>
                <div style={{ width: "50%" }}>
                                        <img src="./blogpost_images/deck2.png" />

                </div>
            </div> */}


     
            <p>
            Curiously, I think I acquired technical skills at a steeper curve while freelancing than I did in undergrad or grad school. At the time, I was messing around in Keras, Tensorflow, and Pytorch; moving back and forth between programming on Mac Windows and Linux; learning networking on the go; trying to be as production and deployment-friendly with Docker / hypervirtualization; implementing real-time streaming facilitated by the GPU sharing of generated textures etc. Looking back it was quite a bit. 
            </p>



                 <p>
            I really enjoyed freelancing for design agencies, as these were unique organizations where art and engineering were both valued. The pursuit of something high-fidelity and production quality was something I was searching for, and something an interviewer at Apple had encouraged me to improve upon in my final round. The people I met were also inspiring outside of work -- many at AOIN moonlighted as VJs, and this definitely influenced some of my later projects (Generative Disco). Freelancing also gave me some personal context to think about the ecosystem of creative labor.
            {/* which was helpful for when I worked with artists and designers on evaluations. */}
           </p>
           {/* <p> Three years later, I was also able to meet up with my colleagues from prefrontal cortex in Germany while passing through for a conference, something that meant a lot, as they were my teammates during COVID.</p> */}

            <p>A few things I learned freelancing that might be transferable to a new grad / intern / early stage researcher:</p>
            <p>
                <ul>
            
                <li><strong>Keep a portfolio of your work or whatever else helps share your thought process. </strong>I had my portfolio on hand when I talked to the design agency. I have also found that it's helpful in first meetings to have material on hand to show, so both parties can have some common material to anchor on. 
                </li>
                <li>
                <strong> Keeping a weekly cadence and self-manage. </strong> Throughout my time freelancing (eight months before I began the PhD), I learned a lot about how to track and communicate progress on a week-to-week basis. This turned out to be tremendously helpful and relevant to my experience in the PhD and at internships, which have that same cadence for check-ins.
            
                </li>
                <li> <strong> Document process. </strong> I kept very visual decks, scrapbooking my progress in slides. I kept up this habit throughout the PhD too, and slides acted like a lab journal of sorts. This had a lot of benefit throughout the PhD as well, because I could often very easily create presentations from the lab journal -- the slides were already halfway there, they just had to be worked into a narrative. I have been told by mentors at internships that this habit was appreciated. I think the origin of this habit for me comes from Critical Making at UC Berkeley, where I learned to document my process as much as possible.  
                </li>
                <li><strong>Make your own opportunities.</strong> There was definitely freedom and fun in freelancing. What is there to fear about not having a job after graduation? You can create your own. Any ambiguity is opportunity. :) </li>


                  

            </ul>
            </p>
            
            <br></br>
            <p>
            p.s. The banner image above is something I made while I interviewed. I tried to learn some stuff in Blender and Unity. The main image was something I made that winter, where I took a photogrammetry model of Hintze Hall and did something with Unity's Vfx graph that made the point cloud / shader / Bloom pass effect.
        

            </p>
            
            <img width="600px" src="./images/maker/hintzehall.gif"></img><br></br>

            <img width="600px" src="./blogpost_images/dance_pointclouds.gif"></img>
            

        </>
    );
};

export default FreelanceContent;
