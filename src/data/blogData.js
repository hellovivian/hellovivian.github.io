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

const blogData = [
  // {
  //   id: 9,
  //   title: 'The Dance of the Fading Star',
  //   slug: 'fading-star',
  //   date: 'AUGUST 2025',
  //   venue: 'A dramatic story told with three dots.',
  //   component: FadingStarPage,
  //   links: {
  //     paperlink: "",
  //     pg: "",
  //     codelink: "",
  //     demolink: "",
  //     blogpostlink: "/fading-star",
  //     video: "",
  //     img_src: "/blogpost_images/deck1.png",
  //   }
  // },
  // {
  //   id: 8,
  //   title: 'La La Land - Final Scene',
  //   slug: 'lalaland-final',
  //   date: 'AUGUST 2025',
  //   venue: 'A dot-based illustration of the final scene of La La Land.',
  //   component: LalaLandFinalPage,
  //   links: {
  //     paperlink: "",
  //     pg: "",
  //     codelink: "",
  //     demolink: "",
  //     blogpostlink: "/lalaland-final",
  //     video: "",
  //     img_src: "/blogpost_images/deck2.png",
  //   }
  // },
  // {
  //   id: 7,
  //   title: 'La La Land Animation',
  //   slug: 'lalaland',
  //   date: 'AUGUST 2025',
  //   venue: 'A dot-based illustration of La La Land.',
  //   component: LalaLandPage,
  //   links: {
  //     paperlink: "",
  //     pg: "",
  //     codelink: "",
  //     demolink: "",
  //     blogpostlink: "/lalaland",
  //     video: "",
  //     img_src: "/blogpost_images/ganaxies.gif",
  //   }
  // },
  // {
  //   id: 6,
  //   title: 'Interactive Animation',
  //   slug: 'animation',
  //   date: 'AUGUST 2025',
  //   venue: 'An interactive animation controlled by text prompts.',
  //   component: AnimationPage,
  //   links: {
  //     paperlink: "",
  //     pg: "",
  //     codelink: "",
  //     demolink: "",
  //     blogpostlink: "/animation",
  //     video: "",
  //     img_src: "/blogpost_images/vibes.gif",
  //   }
  // },
  {
    id: 5,
    title: 'Generating Tools for Oneself',
    slug: 'personal-informatics',
    date: 'AUGUST 2025', //22
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
