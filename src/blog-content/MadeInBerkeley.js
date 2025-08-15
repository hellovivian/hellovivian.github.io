import React from 'react';

const MadeInBerkeleyContent = () => {
    const images = [
        { src: "./images/maker/fishbox.png", alt: "Fishbox" },
        { src: "./images/maker/hand.png", alt: "Hand" },
        { src: "./images/maker/livinghingevase.png", alt: "Living Hinge Vase" },
        { src: "./images/cat.png", alt: "Cat" },
        { src: "./images/character.png", alt: "Character" },
        { src: "./images/maker/CADhand.png", alt: "CAD Hand" },
        { src: "./images/maker/infinity_mirror.png", alt: "Infinity Mirror" },
        { src: "./images/maker/tomandjerry.png", alt: "Tom and Jerry" },
        { src: "./images/maker/ballerina.png", alt: "Ballerina" },
        { src: "./images/maker/lightbox.gif", alt: "" },
        { src: "./images/maker/pacman.png", alt: "Pacman" },
        // { src: "./images/maker/hintzehall.gif", alt: "Hintz" },
        { src: "./images/maker/tamagotchi.gif", alt: "Tamagotchi" },
        { src: "./images/maker/angel_walker.jpg", alt: "Angel Walker" },
        { src: "./images/maker/social_butterfly.jpg", alt: "Social Butterfly" },
        { src: "./images/maker/petals.gif", alt: "Petals" },
        // { src: "./images/maker/watercolors.JPG", alt: "Watercolor Butterfly" },

    ];

    return (
        <>
            <h1>Made in Berkeley </h1>
            <br/>
            <p>

                I loved to make things at Jacobs Hall and the CITRIS Invention Lab. Jacobs Hall actually fully opened around the same time I started at Berkeley.



            </p>
            <p>
                I started off in graphic design and web design, but then started learning different tools in the makerspaces like CAD, 3D printing and laser cutting.

                I also made circuits and did quite a bit of physical computing with Arduino and Raspberry Pi.
                Here and there I did some AR/VR as well, so I got to work in game engines and with 3D / animation packages (Unity, Blender, three.js, ml5.js).
            </p>
            <p>
                I made a lot of things -- a Tamagotchi costume for Halloween, wearable butterfly wings, Tom and Jerry inspired automata, etc. Learning how to design at Berkeley alongside architects, mechanical engineers, artists, computer scientists -- anyone who wanted to make a gift or finish a class project -- was really the highlight of my college experience.

            </p>
            <p>
                In retrospect, these were all things I made with machines as part of the process. I think what made these things feel like my own though was the iteration it took to make something worth sharing.
            </p>


            <br/>


            {/* Graphic design, web design, 3D printing, laser cutting, physical computing, digital fabrication, VR/AR, computational photography, game engines. */}
            <br/>

            <div className="maker-gallery">
                {images.map((image, index) => (
                    <div className={`tile ${(index % 4 === 1 || index % 4 === 2) ? 'margin-top-2em' : ''}`} key={index}>
                        <img className="maker_pic" src={image.src} alt={image.alt} />
                    </div>
                ))}
            </div>

            {/* <h1>Process </h1> */}
            


            {/* <hr></hr> */}

            {/* <img width="480px" src="./blogpost_images/berkeley_me.jpg" alt="Collegeee" /> */}
        </>
    );
};

export default MadeInBerkeleyContent;
