import React from 'react';
import Project from './Project';
import projectData from '../data/projectData';  // Assuming projectData is in the same directory

const ProjectPageTemplate = () => {
    return (
        <div>
            <h1>ProjectName</h1>
            {projectData.map((project) => (
                <Project
                    key={project.id}
                    projectname={project.title}
                    authors={project.authors}
                    projectpage={project.links.projectpage}
                    codelink={project.links.codelink}
                    video={project.links.video}
                    demolink={project.links.demolink}
                    paperlink={project.links.paperlink}
                    venue={project.venue}
                    imgsrc={project.links.img_src}
                />
            ))}
        </div>
    );
};

export default ProjectPageTemplate;