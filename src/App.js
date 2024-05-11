import logo from './logo.svg';
import './App.css';
import AboutMe from './components/AboutMe';
import Project from './components/Project';
import Gallery from './components/Gallery';
import Navigation from './components/Navigation';
import projectData from './data/projectData';
import DiscoThree from './DiscoThree';
import ProjectOPAL from './projectOPAL';
import ProjectDesignGuidelines from './ProjectDesignGuidelines';


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomePage from './HomePage';

import AboutPage from './AboutPage';
import BlogPage from './BlogPage';

import ProjectPage3DALLE from './project3DALLE';

import DiscoProjectPage from './projectDisco';
import LogoMotionProjectPage from './projectLogoMotion';



function App() {
  return (
    <Router >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/About" element={<AboutPage />} />
        <Route path="/Blog" element={<BlogPage />} />

        <Route path="/logomotion" element={<LogoMotionProjectPage />} />

        <Route path="/3DALLE" element={<ProjectPage3DALLE />} />
        <Route path="/disco" element={<DiscoProjectPage />} />
        <Route path="/disco3" element={<DiscoThree />} />
        <Route path="/opal" element={<ProjectOPAL />} />
        <Route path="/designguidelines" element={<ProjectDesignGuidelines />} />
        





      </Routes>
    </Router>
    
    
  );
}



export default App;
