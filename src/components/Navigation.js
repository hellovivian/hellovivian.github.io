import React from 'react';
import { Link } from 'react-router-dom';


const Navigation = () => {
  return (
    <div className="navigation">

      <Link to="/">Home</Link>
      <Link to="/About">About</Link>
      <Link to="/Updates">Updates</Link>
      <Link to="/Blog">Blog</Link>
      <a href="https://scholar.google.com/citations?user=Luod1JsAAAAJ&hl=en" target="_blank" rel="noopener noreferrer">
        <i className="fas fa-graduation-cap"></i>
      </a>
    </div>
  );
};

export default Navigation;
