// blogData.js
import MadeInBerkeleyContent from '../blog-content/MadeInBerkeley.js';
import ComputationalModelsContent from '../blog-content/ComputationalModels.js';
import DotContent from '../blog-content/Dot.js';
import FreelanceContent from '../blog-content/Freelance.js';
import BibliographyContent from '../blog-content/Bibliography.js';
import NeuralNetworkContent from '../blog-content/NeuralNetwork.js';
import PersonalInformaticsContent from '../blog-content/PersonalInformatics.js';
import AnimationPage from '../pages/AnimationPage.js';
import LalaLandPage from '../pages/LalaLandPage.js';
import LalaLandFinalPage from '../pages/LalaLandFinalPage.js';
import FadingStarPage from '../pages/FadingStarPage.js';
import UserInterfaceDustBunniesContent from '../blog-content/UserInterfaceDustBunnies.js';
import GaussianDotsContent from '../blog-content/GaussianDots.js';

const blogData = [
  // {
  //   id: 11,
  //   title: 'Gaussian Dots',
  //   slug: 'gaussian-dots',
  //   date: 'AUGUST 2025',
  //   venue: 'A canvas experiment',
  //   component: GaussianDotsContent,
  //   links: {
  //     paperlink: "",
  //     pg: "",
  //     codelink: "",
  //     demolink: "",
  //     blogpostlink: "/blog/gaussian-dots",
  //     video: "",
  //     img_src: "",
  //   }
  // },
  {
    id: 10,
    title: 'User Interface Dust Bunnies',
    slug: 'user-interface-dust-bunnies',
    date: 'AUGUST 2025',
    venue: 'Blasts from the past',
    component: UserInterfaceDustBunniesContent,
    links: {
      paperlink: "",
      pg: "",
      codelink: "",
      demolink: "",
      blogpostlink: "/blog/user-interface-dust-bunnies",
      video: "",
      img_src: "./blogpost_images/post1.jpg",
    }
  },

  {
    id: 5,
    title: 'Generating Tools for Oneself',
    slug: 'personal-informatics',
    date: 'AUGUST 2025', //22
    venue: 'A personal informatics self-experiment',
    component: PersonalInformaticsContent,
    links: {
      paperlink: "",
      pg: "",
      codelink: "",
      demolink: "",
      blogpostlink: "/blog/personal-informatics",
      video: "",
      img_src: "/images/gallery3.jpeg",
    }
  },
  {
    id: 4,
    title: 'A Neural Network, but Actually',
    slug: 'neural-network',
    date: 'AUGUST 2025', //14
    venue: 'AI for Science, re: Reproducing Papers with LLMs',
    component: NeuralNetworkContent,
    links: {
      paperlink: "",
      pg: "",
      codelink: "",
      demolink: "",
      blogpostlink: "/blog/neural-network",
      video: "",
      img_src: "/blogpost_images/computational_models/teaser.gif",
    }
  },

  {
    id: 2,
    title: 'Freelance at Design Agencies',
    venue: '',
    slug: 'freelance',
    date: 'AUGUST 2025', //15

    component: FreelanceContent,
    links: {
      paperlink: "",
      pg: "",
      codelink: "",
      demolink: "",
      blogpostlink: "/blog/freelance",
      video: "",
      img_src: "/blogpost_images/hintze_square.gif",
    }
  },


  {
    id: 2,
    title: 'Made in Berkeley',
    slug: 'made-in-berkeley',
    date: 'JULY 2025',  //20
    venue: 'Go bears ＼ʕ•ᴥ•ʔ／ ',
    component: MadeInBerkeleyContent,
    links: {
      paperlink: "",
      pg: "",
      codelink: "",
      demolink: "",
      blogpostlink: "/blog/made-in-berkeley",
      video: "",
      img_src: "/images/maker/lightbox.gif",
    }
  },


  {
    id: 2,
    title: 'Pointers',
    slug: 'bibliography',
    date: 'JULY 2025', //20
    venue: 'Pointers to papers & research.',
    component: BibliographyContent,
    links: {
      paperlink: "",
      pg: "",
      codelink: "",
      demolink: "",
      blogpostlink: "/blog/bibliography",
      video: "",
      img_src:"https://media1.tenor.com/m/MSPtDSAWTA4AAAAd/paper-plane-flying-original.gif"
    }
  },
        {
    id: 2,
    title: 'Vibes',
    slug: 'dot',
    date: 'JULY 2025', //26
    venue: '',
    component: DotContent,
    links: {
      paperlink: "",
      pg: "",
      codelink: "",
      demolink: "",
      blogpostlink: "/blog/dot",
      video: "",
      img_src: "/blogpost_images/vibes_slower.gif",
    }
  },
    {
    id: 1,
    title: 'Reproducing Papers with LLMs',
    slug: 'computational-models',
    date: 'MAY 2024',
    venue: 'Some thoughts I had while using an LLM to understand a computational models paper from cognitive science.',
    component: ComputationalModelsContent,
    links: {
      paperlink:"",
      pg: "",
      codelink: "",
      demolink: "",
      blogpostlink: "/blog/computational-models",
      video: "",
      img_src: "https://media2.giphy.com/media/5dYqPVcoq9mKuxleyR/200w.gif?cid=6c09b952f8f607ppa5nvos1pww9bbzswakr03af12aaw9eyx&ep=v1_gifs_search&rid=200w.gif&ct=g",
      demo: '',
      source: '',
    },
  }, 
  ];
    
    export default blogData;
