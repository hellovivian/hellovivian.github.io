import React from 'react';
import { Link } from 'react-router-dom';

const BlogBibliography = (props) => {
  const projectname = props.projectname;
  const sections = props.sections; // New prop for an array of section objects

  return (
    <div className="project-row">
      <div>

        <div className="bibliography-links">
          {sections && sections.length > 0 && (
            sections.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                <h4>{section.heading}</h4>
                <ul>
                  {section.links.map((linkItem, linkIndex) => (
                    <li key={linkIndex} className="bibliography-link-item">

                        <a href={linkItem.url} target="_blank" rel="noopener noreferrer">
                        {linkItem.text}
                      </a>


                        {linkItem.comment && ( <div>
                        <span className="link-comment"> 
                          Comment: {linkItem.comment}
                        </span>
                        </div>
                      )} 
                      
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogBibliography;
