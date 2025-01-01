

import './App.css';
import AboutMe from './components/AboutMe';
import Project from './components/Project';
import Gallery from './components/Gallery';
import Navigation from './components/Navigation';
import projectData from './data/projectData';
import fullProjectData from './data/fullProjectData';
import workshopData from './data/workshopData';


function HomePage() {
  return (
    <div className="container">
        <header className="App-header">
        <Navigation />
      <AboutMe />
      <Gallery />

    <br></br>
    <br></br>
      <h2> Publications</h2>


      {projectData.map((project) => (

          <Project projectname={project.title} authors={project.authors} projectpage={project.links.pg} codelink={project.links.codelink} video={project.links.video} demolink={project.links.demolink} paperlink={project.links.paperlink} venue={project.venue} imgsrc={project.links.img_src}/>


      ))}

    <hr  style={{
        color: '#eeeeee',
        width: '100%',
        borderColor : '#eeeeee'
    }}/>

    {fullProjectData.map((project) => (

      
    <Project projectname={project.title} authors={project.authors} projectpage={project.links.projectpage} codelink={project.links.codelink} video={project.links.video} demolink={project.links.demolink} paperlink={project.links.paperlink} venue={project.venue}  imgsrc={project.links.img_src}/>


    ))}

    <hr  style={{
            color: '#eeeeee',
            width: '100%',
            borderColor : '#eeeeee'
        }}/>

    <h2> Workshop Papers  </h2>

    {workshopData.map((project) => (
        

      
    <Project projectname={project.title} authors={project.authors} projectpage={project.links.pg} codelink={project.links.codelink} video={project.links.video} demolink={project.links.demolink} paperlink={project.links.paperlink} venue={project.venue}  imgsrc={project.links.img_src}/>


    ))}

    {/* <hr  style={{
            color: '#eeeeee',
            width: '100%',
            borderColor : '#eeeeee'
        }}/> */}

    {/* <h2> Updates  </h2> */}



    {/* {pressData.map((project) => (

        
    <PressItem projectname={project.title} authors={project.authors} projectpage={project.links.projectpage} codelink={project.links.codelink} video={project.links.video} demolink={project.links.demolink} paperlink={project.links.paperlink} venue={project.venue} projectpage="" imgsrc={project.links.img_src}/>


    ))} */}
   




      


    </header>
  </div>
    
    
  );
}



export default HomePage;
