// blogData.js
import MadeInBerkeleyContent from '../blog-content/MadeInBerkeley.js';
import ComputationalModelsContent from '../blog-content/ComputationalModels.js';
import DotContent from '../blog-content/Dot.js';
import FreelanceContent from '../blog-content/Freelance.js';
import BibliographyContent from '../blog-content/Bibliography.js';
import NeuralNetworkContent from '../blog-content/NeuralNetwork.js';
import PersonalInformaticsContent from '../blog-content/PersonalInformatics.js';

const blogData = [
  {
    id: 5,
    title: 'Generating Tools for Oneself',
    slug: 'personal-informatics',
    date: 'AUGUST 22 2025',
    venue: 'A health informatics self-experiment',
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
    date: 'AUGUST 14 2025',
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
    date: 'AUGUST 15 2025',

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
    date: 'JULY 20 2025',
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
    date: 'JULY 20 2025',
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
  //       {
  //   id: 2,
  //   title: 'Freelance',
  //   date: 'JULY 26 2025',
  //   venue: '',
  //   links: {
  //     paperlink: "",
  //     pg: "",
  //     codelink: "",
  //     demolink: "",
  //     blogpostlink: "/freelance",
  //     video: "",
  //     img_src: "/images/maker/hintzehall.gif",
  //   }
  // },

        {
    id: 2,
    title: 'Vibes',
    slug: 'dot',
    date: 'JULY 26 2025',
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
