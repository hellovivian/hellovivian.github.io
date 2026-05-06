export const timelineEntries = [

    
    {
        date: "2019",
        position: "left",
        title: "Prelude",
       description: ` `,
        // linkText: "blog post about my freelance days",
        images: ["https://akanazawa.github.io/human_dynamics/resources/videos/comp_fencing.mp4", "https://www.memo.tv/wpmemo/wp-content/uploads/2019/09/memoakten_learningtosee_waves_32c.gif"],
    },
    {
        date: "2019",
        position: "right",
        title: "Prelude",
       description: ` https://github.com/digital-standard/ThreeDPoseUnityBarracuda `,
        // linkText: "blog post about my freelance days",
        images: ["./blogpost_images/timeline/unitybarracuda.gif"],
    },
    {
        date: "Spring 2020",
        position: "right",
        title: "Prelude",
       description: `In between college and grad school, I freelanced AI stuff for a design agency, which I wrote about <a href="/blog/freelance">here</a>.`,
        // linkText: "blog post about my freelance days",
        images: ["./blogpost_images/car_shapes.gif", "./blogpost_images/latentspace_crosssection.gif"],
    },
    {
        date: "Aug 2020",
        subtitle: "2020",
        position: "right",
        title: "Grad school!",
        description: "I actually started remote because of COVID. Right before starting I remember trying to learn how to use bpy, Blender's python backdoor for scripting things. I used metaballs to make a 3D form of a dancer in fifth position. I had attended ICCC and met someone doing generative models for dance. Back then, I was so excited to be able to think about creativity academically.",
        images: ["./blogpost_images/timeline/dance.png","./blogpost_images/timeline/school_covid.jpg" ]
    },
    {
        date: "Jan 2021",
        position: "left",
        subtitle: "",
        title: "DALL-E",
        description: "My friend Mia mentioned it to me.",
        image: "https://cdn.prod.website-files.com/65328590ab6316e441f6589c/663a3278df94920f12208153_62bdd18a0c898dfe88e7b902_dall-e-2.jpeg",
        links: [
            { href: "https://openai.com/research/dall-e", text: "Ramesh et al., Zero-Shot Text-to-Image Generation (2021)" }
        ]
    },
 
    {
        date: "2021",
        position: "right",  
        title: "Back to shapes",
        subtitle: "2021",
        description: "I picked up my freelance project topic for my first graduate classes and tried to build upon them. I published a workshop paper that was -- both literally and figuratively -- a cute effort (<a> here </a>). My spring semester, I built a UI for it. I was interested in things like how we could make contributions from the training data transparent -- give people exploration and inspiration, but also attribute credit through a bibliography. <br><br> I call this my chicken nuggets and gummy bear era, because the shapes were machine-made but not very good. I tried a couple of sculpting approaches as well (in Unity, C#). ",
        images: ["./images/animals.gif","./blogpost_images/post1.jpg"]
    },
        {
        date: "July 2022",
        position: "right",
        title: "Sparks GPT-2",
        subtitle: "2022",
        description: "I helped out with my labmate Katy's paper, Sparks, which was about using GPT-2 to assist with science writing. While prescient (LLMs for writing), this was pretty painful because the models would hallucinate -- but back then we didn't even have that word to describe the model behavior. For the paper, we got experts to rate autocompleted sentences involving technical expertise. Consider this GPT-2 completed sentence: <em> One attribute of circadian rhythm is the circadian rhythmicity of gene expression. </em> -- is that right, is that wrong? Constructing evaluations was hard! ",
        links: [
            { href: "https://arxiv.org/abs/2210.02463", text: "Gero et al., Sparks: Inspiration for Science Writing (2022)" }
        ]
    },
    {
        date: "July 2021",
        title: "A shift to text-to-image",
        position: "right",
        subtitle: "San Francisco, CA",
        description: "I had to put my 3D project on ice. The bindings between language and 3D seem limited. Outside of some datasets about chairs and general shapes (ShapeNet), there wasn't a whole lot of labeled shape data out there. <br><br> But just like when I freelanced, I had kept some 2D art ideas at play. One day, my advisor and I had brunch with one of her old colleagues, who introduced us to VQGAN+CLIP in July of 2021. I think this was like the third image I ever tried generating -- something like <em> koalas, underwater. </em> maybe I added the term impressionism? ",
        image: "./blogpost_images/koala.png",
        links: [
            { href: "https://arxiv.org/abs/2103.00020", text: "Radford et al., CLIP (2021)" },
            { href: "https://arxiv.org/abs/2012.09841", text: "Esser et al., VQGAN (2021)" }
        ]
    },
        {
        date: "Aug 2021",
        title: "Text-to-image evaluation paper",
        position: "right",
        subtitle: "eh",
        description: "I had to put my 3D project on ice. The bindings between language and 3D seem limited. Outside of some datasets about chairs and general shapes (ShapeNet), there wasn't a whole lot of labeled shape data out there. <br><br> But just like when I freelanced, I had kept some 2D art ideas at play. One day, my advisor and I had brunch with one of her old colleagues, who introduced us to VQGAN+CLIP in July of 2021. I think this was like the third image I ever tried generating -- something like <em> koalas, underwater. </em> maybe I added the term impressionism? ",
        images: ["./blogpost_images/timeline/camreadybanner.jpg"]
    },
    {
        date:"June 2022",
        title: "Imagen is published",
        position: "left",
        subtitle: "",
        description: "text pretraining seems to be the key",
        image: "https://static.designboom.com/wp-content/uploads/2022/05/google-imagen-text-to-image-ai-designboom-005-818x507.jpg"
    },
    {
        date:"June 2022",
        title: "I finish a paper on text-to-image generation for conceptual CAD",
        position: "right",
        subtitle: "",
        description: "autodesk",
        image: ["images/3DALLE/3dalle_sped_big.gif"]
    },
        {
        date:"Nov 2022",
        title: "text-to-3D",
        position: "right",
        subtitle: "",
        description: "The text-image bindings are not only helpful for image generation -- they also help with text-to-3D generation, which lacks the same quantity of data online. I assist my colleague at Autodesk.",
        image: ["images/3DALLE/3dalle_sped_big.gif"]
    },
    {
        date: "Nov 2022",
        title: "",
        subtitle: "",
        position: "left",
        description: "I stop working on text-to-image stuff. I started thinking about what might be next, what if we could actually do something new with generation -- video?",
        video: "./disco_videos/lastcarnival.mp4"
    },
        {
        date: "Nov 2022",
        title: "",
        subtitle: "",
        position: "left",
        description: "I stop working on text-to-image stuff. I started thinking about what might be next, what if we could actually do something new with generation -- video?",
        video: "./disco_videos/lastcarnival.mp4"
    },
        {
        date: "April 2023",
        title: "Generative Disco",
        subtitle: "",
        position: "right",
        description: "I complete a text-to-video project, but it's a bit rushed and early. It's the first text-to-video project in human-computer interaction. In retrospect, it was confused in its interaction and interface ideas. We introduced what states and transitions could mean in generative video to as novice-friendly abstractions, but the paper was really going for keyframe-level control.",
        video: "./disco_videos/daftpunk.m4v"
    },
        {
        date: "April 2023",
        title: "ControlNet came out",
        position: "left",
        subtitle: "x",
        description: "Helped control composition, could fix issues like number of digits in hands etc.",
        image: ["https://learnopencv.com/storage/2023/03/controlnet-canny-deer-example.png"],
        links: [
            { href: "https://arxiv.org/abs/2302.05543", text: "Zhang et al., Adding Conditional Control to Text-to-Image Diffusion Models (2023)" }
        ]
    },
         {
        date: "June 2023",
        title: "StyleDrop",
        position: "left",
        subtitle: "Style controls came out",
        description: "Strategy, Social Media",
        images: ["./blogpost_images/timeline/deer1.png","./blogpost_images/timeline/deer2.png"],
    },
     {
        date: "Feb 2023",
        title: "FOLK",
        subtitle: "s",
        position: "right",
        description: "I think well what if we use generative images as textures",
        image: "./blogpost_images/timeline/folk.gif"
    },
       {
        date:"Apr 2023",
        title: "Generative Agents comes out",
        subtitle: "",
        position: "left",
        description: "",
        images: ["https://images.ctfassets.net/fxksiu7yxym3/4h1YJ7TYdeFFJBPIyYNmSX/9dfb4129b1f07e1bdf65c6794c9bd329/2023-04-10_Stanford_Generative_Agents.jpeg"],
        links: [
            { href: "https://arxiv.org/abs/2304.03442", text: "Park et al., Generative Agents: Interactive Simulacra of Human Behavior (2023)" }
        ]
    },
    {
        date: "Oct 2023",
        title:"Glaze comes out",
        subtitle: "",
        position: "left",
        description: "",
        image: "https://cs.uchicago.edu/wp-content/uploads/2023/02/fig2.png",
        link:"https://glaze.cs.uchicago.edu/"

    },
    {
        date: "Oct 2023",
        title: "",
        subtitle: "",
        position: "left",
        description: "A famous professor mentions that code representations will be great for controls. Because of my past experience trying to create semantic sliders, I mentioned that I was skeptical -- I was wrong. :p ",
        images: ["./logomotion_gifs/lax.gif", "./logomotion_gifs/stars.gif"]
    },
    {
        date: "Dec 2023",
        title :"Candidacy",
        position: "right",
        description: "I finish my candidacy, and my performance is a bit mediocre, because the framing was all over the place.",
        link: "",
    },
    {
        date: "Feb 2024",
        title: "",
        subtitle: "",
        position: "left",
        description: "Code generation seems to be the thing. I hear from the DARPA project I am collaborating on. ReAct as a framework is quite popular. ",
        images: ["https://vishwasg.dev/blog/img/react_agent.png"]
    },
    {
        date: "Apr 2024",
        title: "LogoMotion: visually grounded code generation",
        subtitle: "",
        position: "right",
        description: "I started working on animation",
        images: ["./logomotion_gifs/lax.gif", "./logomotion_gifs/stars.gif"]
    },
    {
        date: "Apr 2024",
        position: "left",
        description: "I am big tired. There are major newsworthy protests at Columbia about war. I pick up a copy of Marcus Aurelius' Meditations from a shop in Brooklyn. "
    },

    {
        date: "Apr 2024",
        title: "Project Salvador tech transfers",
        subtitle: "",
        position: "right",
        description: "My work at Autodesk tech transfers as a plug in called Project Salvador. I use it to make this ",
        images: ["https://www.autodesk.com/products/fusion-360/blog/wp-content/uploads/2024/04/Current-view-variation-generation-1-1536x1049.png", "./images/3DALLE/cow.gif"]
    },
    {
        date: "May 2024",
        title: "",
        subtitle: "",
        position: "left",
        description: "I stopped working on text-to-image stuff. By this time, it seemed pretty apparent that it was being rapidly solved by industry. I started thinking about what might be next -- video?",
        image: "https://cdn-uploads.huggingface.co/production/uploads/6126e46848005fa9ca5c578c/13B2HSVUuZ1t9UseffdHp.gif"
    },
    {
        date: "July 2024",
        title: "Disco for Kids",
        subtitle: "",
        position: "right",
        description: "I run a workshop to create music visualization. I ask the elementary school kids how many have heard of AI and they all raise their hands. This was the first time I had ever deployed something that had 30 people using at once. ",
        image: "./blogpost_images/timeline/disco1.png"
    },
    { date: "Jan 2025",
      title: "HICCS",
      description: "I present Disco at HICCS. "

    },
    {
        date:"Spring 2025",
        title: "",
        subtitle: "",
        position: "right",
        description: "I deal with PhD burnout by taking lots of walks in Central Park, watching TV, and having more weekends."
    },

    {
        date:"May 2025",
        title: "",
        subtitle: "",
        position: "left",
        description: "Veo comes out. People make a lot of weird things like honeycomb keyboards, beds made out of sashimi. I think it's the audio that makes it social media ready -- finally it has all the pieces. AI Slop enters the lexicon."
    },
    {
        date:"June 2025",
        title: "",
        subtitle: "",
        position: "right",
        description: "People are talking about how AI startups are reaching tens of millions in ARR and how people can get astronomical salaries."

    }, {
        date:"Summer 2025",
        title: "",
        subtitle: "",
        position: "right",
        description: "I talked to a lot of different startups, design agencies, and even a hedge fund. I studied and interviewed. This was a fun summer. I anticipated it would be my last one in NYC. "

    },
    {
        date:"Oct 2025",
        title: "",
        subtitle: "",
        position: "right",
        description: "I make a trip out to HKUST."

    },
    {
        date:"Nov 2025",
        title: "",
        subtitle: "",
        position: "right",
        description: "I make a trip out to UMichigan. "

    },
       {
        date:"Dec 2025",
        title: "",
        subtitle: "",
        position: "right",
        description: "I went to NeurIPS for kicks. "

    },
    
    {
        date: "Jan 2026",
        description: "I start my job at Autodesk. People told me it was dumb to start without finishing, and I had tried to avoid this arrangement previously by turning down job offers. But I had felt stagnant working remotely. Since it is a company that serves designers first and foremost, I learn a lot about design again."

    },

    {
        date: "March 2026",
        title: "fog",
        position: "right",
        subtitle: "emotions!",
        description: "I had talked about this with many researchers before -- the models don't really get emotions. ",
        images: ["./blogpost_images/timeline/emotions.gif", "./blogpost_images/timeline/predator_prey.gif"]
    },
    {
        date:"April 2026",
        title: "Emotion Vectors",
        subtitle:"",
        description: "",
        image:"https://www.anthropic.com/_next/image?url=https%3A%2F%2Fwww-cdn.anthropic.com%2Fimages%2F4zrzovbb%2Fwebsite%2Fde28cdddc83c97c1a55ebc1157e9feeca31a1dba-3764x2380.png&w=3840&q=75"
    }
];
