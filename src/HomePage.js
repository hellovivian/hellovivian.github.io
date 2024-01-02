

import './App.css';
import AboutMe from './components/AboutMe';
import Project from './components/Project';
import Gallery from './components/Gallery';
import Navigation from './components/Navigation';
import projectData from './data/projectData';
import fullProjectData from './data/fullProjectData';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function HomePage() {
  return (
    <div className="container">
        <header className="App-header">

        <Navigation />

      

      <AboutMe />
      <Gallery />

      <h2> Select Publications</h2>


      {projectData.map((project) => (

      
          <Project projectname={project.title} authors={project.authors} projectpage={project.links.projectpage} codelink={project.links.codelink} video={project.links.video} demolink={project.links.demolink} paperlink={project.links.paperlink} venue={project.venue} projectpage="" imgsrc={project.links.img_src}/>


      ))}

    <h2> Full Publications  </h2>
    <p> Ordered Chronologically </p>

    {fullProjectData.map((project) => (

      
    <Project projectname={project.title} authors={project.authors} projectpage={project.links.projectpage} codelink={project.links.codelink} video={project.links.video} demolink={project.links.demolink} paperlink={project.links.paperlink} venue={project.venue} projectpage="" imgsrc={project.links.img_src}/>


    ))}

      


    </header>
  </div>
    
    
  );
}



export default HomePage;
