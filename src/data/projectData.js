// projectData.js
const projectData = [
  {
    id: 0,
    title: 'LogoMotion: Visually-Grounded Code Synthesis for Creating and Editing Animation',
    authors: 'Vivian Liu, Rubaiat Habib Kazi, Li-Yi Wei, Matt Fisher, Timothy Langlois, Seth Walker, Lydia Chilton',
    venue: 'CHI 2025',
    links: {
      paperlink:"/papers/Logomotion_ACM.pdf",
      pg: "/logomotion",
      codelink: "",
      demolink: "https://logomotion.vercel.app/",
      video: "https://youtu.be/WLiK3qkOkP0",
      img_src: "./logomotion_gifs/cat1.gif",

      source: '',
    },
  },
    {
      id: 1,
      title: 'Digital "Double Hatters": Augmenting Audiovisual Creative Work with a Generative Text-to-Video Workflow',
      authors: 'Vivian Liu, Tao Long, Jenny Ma, Nathan Raw, Jiaxin Yang, Claudia Tang, Lulu Wang, Yumo Yang, Lydia Chilton',
      venue: 'HICCS 2025',
      links: {
        paperlink:"/papers/Generative_Disco.pdf",
        pg: "/disco",
        codelink: "",
        demolink: "",
        video: "",
        img_src: "./images/disco.gif",
        demo: './images/disco.gif',
        source: '',
      },
    },
    {
      id: 2,
      title: '3DALL-E: Integrating Text-to-Image AI into 3D Design Workflows',
      description: 'Description for Project 2.',
      authors: 'Vivian Liu, Jo Vermeulen, George Fitzmaurice, Justin Matejka',
      venue: 'DIS 2023',
      links: {
        paperlink: "/papers/3DALLE_ACM.pdf",
        pg: "/3DALLE",
        codelink: "",
        demolink:"https://apps.autodesk.com/FUSION/en/Detail/Index?id=8558451727109537930",
        video: "https://www.youtube.com/watch?v=c45gIiAEWZU&ab_channel=VivianL",
        img_src: "./images/3DALLE/3DALLE.gif",
        source: '',
      },
    },
    {
      id: 3,
      title: 'Opal: Multimodal Image Generation for News Illustration',
      description: '',
      authors: 'Vivian Liu, Han Qiao, Lydia Chilton',
      venue: 'UIST 2022',
      links: {
        pg:"/opal",
        img_src: "./images/opal.png",
        demolink:"",
        codelink:"",
        video: "https://youtu.be/grrdo6TtV88",
        paperlink: "/papers/Opal_ACM.pdf",
      },
    },
    {
      id: 4,
      title: 'Design Guidelines for Prompt Engineering Text-to-Image Generations',
      authors: 'Vivian Liu, Lydia Chilton',
      description: 'Description',
      venue: 'CHI 2022',
      links: {
        img_src: "./images/designguidelines.jpeg",
        pg: "/designguidelines",
        demolink:"",
        video:"https://www.youtube.com/watch?v=7-XnIuH8r3U&ab_channel=ACMSIGCHI",
        codelink:"",
        paperlink:"/papers/DesignGuidelines_ACM.pdf",
        slides: 'https://docs.google.com/presentation/d/1krOov5w_c1byOoDsgwNDHmfytrqofac32M-CzWx6f5E/edit#slide=id.gceeec265cf_0_4'
      },
    }
  ];
  
  export default projectData;