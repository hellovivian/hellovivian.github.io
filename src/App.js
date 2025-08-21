import logo from './logo.svg';
import './App.css';
import DiscoThree from './DiscoThree';
import ProjectOPAL from './projectOPAL';
import ProjectDesignGuidelines from './ProjectDesignGuidelines';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import AboutPage from './AboutPage';
import BlogPage from './BlogPage';
import UpdatesPage from './UpdatesPage';
import ProjectPage3DALLE from './project3DALLE';
import DiscoProjectPage from './projectDisco';
import LogoMotionProjectPage from './projectLogoMotion';
import BlogPostPage from './pages/BlogPostPage';
import CrudPage from './pages/CrudPage';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {

  return (
    <Router >
      <ScrollToTop />
      <Routes>
        <Route path="/About" element={<AboutPage />} />
        <Route path="/Updates" element={<UpdatesPage />} />
        <Route path="/Blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />

        <Route path="/logomotion" element={<LogoMotionProjectPage />} />
        <Route path="/3DALLE" element={<ProjectPage3DALLE />} />
        <Route path="/disco" element={<DiscoProjectPage />} />
        <Route path="/disco3" element={<DiscoThree />} />
        <Route path="/opal" element={<ProjectOPAL />} />

        {/* <Route path="/crud" element={<CrudPage />} /> */}

        <Route path="/designguidelines" element={<ProjectDesignGuidelines />} />

        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
