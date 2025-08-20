const blogBibliographyData = {
  sections: [
    {
      heading: 'Research More Broadly',
      img: '',
      links: [
        { url: 'https://notes.andymatuschak.org/Work_with_the_garage_door_up', text: 'Work with the garage door up.', comment: 'A note that inspired me in 2021. As a researcher, you have the freedom to show your process. ' },

      ]
    },
    {
      heading: 'Essays about Creativity',
      img: '',
      links: [

        { url: 'https://computationalcreativity.net/iccc20/papers/030-iccc20.pdf', text: 'Post-creativity and AI: Reverse-engineering our Conceptual Landscapes of Creativity', comment: 'The definition of creativity changes over time -- and also as a function of technology.' },
        { url: 'https://www.glass-bead.org/article/a-theory-of-vibe/?lang=enview', text: 'A Theory of Vibe by Peli Grietzer', comment: 'Latent spaces as a way to represent vibe as a "local color".' },
        { url: 'https://www.tc.columbia.edu/faculty/bt2158/faculty-profile/files/2011_Tversky_VisualizingThoughts.pdf', text: 'Visualizing Thought by Barbara Tversky', comment: 'Visuals (diagrams, maps, instruction manuals) are a way we externalize our thoughts and organize them into action.' }
      ],
    },
    {
      heading: 'Societal Impacts - Art, Copyright, Automation, Science Communication',
      img: '',
      links: [

        { url: 'https://arxiv.org/pdf/2409.17410', text: "Copying style, Extracting value: Illustrators' Perception of AI Style Transfer and its Impact on Creative Labor", comment: 'Really well written paper about how artists are confronting style transfer capabilities from AI. It dives into what style means, what value it has in economic contexts of creative work, and why style transfer approaches lack the nuance that artists have in expressing semantics and style together.' },
        { url: 'https://jeffhuang.com/papers/GenerativeCopyright_DIS25.pdf', text: 'Copyrighting Generative AI Co-Creations', comment: 'Through this paper I was introduced to ideas about the abstraction test, which separates out the high-level idea from the expression of the idea.' },
        { url: 'https://dl.acm.org/doi/pdf/10.1145/3411764.3445156', text: 'Investigating the Homogenization of Web Design: A Mixed-Methods Approach', comment: 'I came across this paper early on in my PhD and I remember liking how they showed the homogenization on the web. Web standards that emerged are a confounding factor -- but still.' },
        {
          url: 'https://dl.acm.org/doi/pdf/10.1145/3673861', text: 'Prompting Considered Harmful', comment: 'A great thought piece on how systems built on tops of LLMs can be brittle and unreliable as the be-all end-all for end-user interfaces.'
        },
        {
          url: 'https://www.bondcap.com/report/pdf/Trends_Artificial_Intelligence.pdf', text: 'Trends - AI 2025',  comment: 'The question isn’t whether platforms or specialists win — it’s who can abstract the right layer, own the interface, and capture the logic of work itself. - Mary Meeker'
        },
        {url: "https://jcom.sissa.it/archive/19/03/JCOM_1903_2020_A02", text: "Post-Normal Science Communication", comment: "One of my first projects during the PhD was about science communication, and this paper characterized how science communication had changed upon the rise of digital networks and social media. Science did not have to reach the public through journalism or traditional venues -- the scientist could circumvent all of that and disseminate their results themselves. But that has made science communication more opinionated, polarized, and slanted towards advocacy."}
      ],
    },
    {
      heading: 'Superintelligence',
      img: '',
      links: [
        { url: 'https://arxiv.org/pdf/2310.16410', text: 'Bridging the Human–AI Knowledge Gap: Concept Discovery and Transfer in AlphaZero', 'comment': 'I like the idea of searching for concepts that might be easier for machines to understand, but which are not beyond the grasp of experts. They pictorally describe this in a simple Venn Diagram form between H (Humans) and M (Machines). In the case of chess, that is AlphaZero (M) discovering concepts within chess puzzles that grandmasters (H) could then intuit.' },
      ],
    },
    {
      heading: 'Agents',
      img: '',
      links: [
        { url: 'https://arxiv.org/pdf/2304.03442', text: 'Generative Agents: Interactive Simulacra of Human Behavior', comment: 'Spoiler alert: One of the results of emergent behavior is very charming: it is one agent asking another agent out to prom. Also, I thought the Elo method used in the evaluation was also quite clever.' },

      ]
    },
    {
      heading: 'Human-AI Interaction',
      img: '',
      links: [
        { url: 'https://arxiv.org/pdf/1902.02960', text: 'Human-Centered Tools for Coping with Imperfect Algorithms during Medical Decision-Making', comment: 'The system is called SMILY. =) Fun fact I got to work with Carrie Cai and Michael Terry (authors of this paper) at Google Deepmind four years after I read this paper.' },
        { url: 'https://www.youtube.com/watch?v=_sTDSO74D8Q', text: 'The Potential for AI in Science and Mathematics - Terence Tao', comment: '' },
      ],
    },

    // {
    //   heading: 'Machine Learning',
    //   img:'', 
    //   links: [
    //     {url: 'https://jalammar.github.io/illustrated-transformer/', text: 'The Illustrated Transformer' , comment: '' },

    //   ]
    {
      heading: 'Human-Computer Interaction (pre-Gen AI)',

      links: [{url: "https://www.lri.fr/~mbl/ENS/CSCW/2021/papers/Hutchinson-techprobes-03.pdf", text:'Technology Probes: Inspiring Design for and with Families', comment: "I come back to this paper now and then because it has a strong definition. This definition is of a 'technology probe', an exploratory technology that is field-tested in a real-world setting. It's an older paper and they show how they deploy these design probes that still seem futuristic today (a shared post-it board between a family etc.). One main goal was to facilitate connection across family members who are in different time zones, and I liked that it was technology and helping facilitate connection in the spirit of ambient tangible design. Other brownie points for a longitudinal evaluation (6 weeks).",

      },
    {url:"https://scispace.com/pdf/chronicle-capture-exploration-and-playback-of-document-16agiews9s.pdf", text:"Chronicle: Capture, Exploration, and Playback of Document Workflow Histories", comment:"The prescient idea in this paper is that when people create artifacts (e.g. a design), there is a whole trailing history of workflow and expertise that led to that artifact which is lost. But it can be captured, stored, and reused as a learning tool. Chronicle is a system that implements that idea. Chronicles = 'graphical representations of document revisions, visual scheme of state and event histories on an interactive timeline'. Seems pretty applicable for the agents era, where AI agents have to replicate the patterns of work people do."}, 
      {url:"https://damassets.autodesk.net/content/dam/autodesk/research/publications-assets/pdf/geppetto-enabling-semantic-design.pdf", text:"Geppeto: Enabling Semantic Design of Expressive Robot Behaviours", comment:"I came across this paper when I was looking at Autodesk Research in my second year of grad school. I really liked it then, and I still like it now because it makes some pretty cool inroads between motion and emotion (e.g. is the robot dance happy?) as well as human-robot interaction design."},
     {url:"https://www.research.autodesk.com/app/uploads/2023/03/workflow_graphs_a_computational_model_of_collective_task_strategies_for_3d_design_software.pdf_recCXepx1LXLVyWOU.pdf?_gl=1*1d6tu8k*_gcl_au*MTE1ODMxNTE2Mi4xNzUxNTY4MzUy*_ga*OTQyMTIwMjM2LjE3NTE1Njc0NDk.*_ga_NZSJ72N6RX*czE3NTU0Nzc2NzgkbzUkZzEkdDE3NTU0Nzc2NzgkajYwJGwwJGgw", text: "", comment: ""}
  
  ]
    }

    // },
    // {
    //   heading: ' Task Decomposition, Inference-Time Reasoning, Chain of Thought',
    //   links: [
    //     {url: 'https://arxiv.org/abs/2305.10601', text: 'Tree of Thoughts: Deliberate Problem Solving with Large Language Models' , comment: '' },
    //   ]
    // },
    // {
    //   heading: 'Controls from an AI Perspective',
    //   links: [
    //     {url: 'https://arxiv.org/pdf/2302.05543', text: 'ControlNet'}
    //   ]
    // },
    //     {
    //   heading: 'Biases in Machine Learning',
    //   links: [
    //     {url: '', text: 'Lipstick on a Pig'}
    //   ]
    // },
    // {
    //   heading: 'Expert Opinions on AI',
    //   img: '',
    //   links: [


    //     // { url: 'https://www.youtube.com/watch?v=07XJicGWMVo', text: 'Ben Affleck on How AI Will or Will Not Impact Hollywood', comment: '' },
    //   ],
    // },

  ],
};

export default blogBibliographyData;
