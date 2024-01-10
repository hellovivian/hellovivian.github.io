import React from 'react';

const PressItem = (props) => {
  const projectname = props.projectname;
  const imgsrc = props.imgsrc;
  const date = props.date;
  const description = props.description;
  const projectpage = props.projectpage;

  const paperlink = props.paperlink;
  const codelink = props.codelink;
  const demolink = props.demolink;
  const video = props.video;

  return (
    <div className="project-row">
      {/* <img className="project-preview" src={imgsrc} /> */}

      <div>
        <p><strong>{projectname}</strong></p> 

        <p>{date}</p>
        <p>{description}</p>

        <div className="external-links">

        {/* {projectpage && projectpage.length > 0 && (
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
        )} */}

        </div>
      </div>
    </div>
  );
};

export default PressItem;