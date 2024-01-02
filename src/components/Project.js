import React from 'react';

const Project = (props) => {
  const projectname = props.projectname;
  const imgsrc = props.imgsrc;
  const authors = props.authors;
  const venue = props.venue;
  const projectpage = props.projectpage;

  const paperlink = props.paperlink;
  const codelink = props.codelink;
  const demolink = props.demolink;
  const video = props.video;

  return (
    <div className="project-row">
      <img className="project-preview" src={imgsrc} />

      <div>
        <h3>{projectname}</h3>
        <p>{authors}</p>
        <p>{venue}</p>

        <div className="external-links">

        {projectpage && projectpage.length > 0 && (
            <a class='link' href={projectpage}>Project Page</a>
        )}

        {paperlink && paperlink.length > 0 && (
            <a class='link' href={paperlink}>Paper</a>
        )}

        {video && video.length > 0 && (
            <a class='link' href={video}>Video</a>
        )}

        {codelink && codelink.length > 0 && (
            <a class='link' href={codelink}>Code</a>
        )}

        {demolink && demolink.length > 0 && (
            <a class='link' href={demolink}>Demo</a>
        )}

        </div>
      </div>
    </div>
  );
};

export default Project;