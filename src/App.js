import logo from './logo.svg';
import './App.css';
import AboutMe from './components/AboutMe';
import Project from './components/Project';
import Gallery from './components/Gallery';
import Navigation from './components/Navigation';
import projectData from './data/projectData';
import DiscoThree from './DiscoThree';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomePage from './HomePage';

import AboutPage from './AboutPage';
import ProjectPage3DALLE from './project3DALLE';

import DiscoProjectPage from './projectDisco';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/About" element={<AboutPage />} />
        <Route path="/3DALLE" element={<ProjectPage3DALLE />} />
        <Route path="/disco" element={<DiscoProjectPage />} />
        <Route path="/disco3" element={<DiscoThree />} />



      </Routes>
    </Router>
    
    
  );
}



export default App;
