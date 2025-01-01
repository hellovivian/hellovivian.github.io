import React from 'react';
import { Link } from 'react-router-dom';

const BlogPost = (props) => {
  const projectname = props.projectname;
  const imgsrc = props.imgsrc;
  const authors = props.authors;
  const venue = props.venue;
  const projectpage = props.projectpage;
  console.log(projectpage);

  const paperlink = props.paperlink;
  const date = props.date;

  const codelink = props.codelink;
  const demolink = props.demolink;
  const blogpostlink = props.blogpostlink;
  const video = props.video;

  return (
    <div className="project-row">
      <img className="project-preview" src={imgsrc} />

      <div>
        <h3>{projectname}</h3>
        <p class="normal_p">{authors}</p>
        <p class="normal_p">{venue}</p>
        <p class="normal_p">{date}</p>


        <div className="external-links">

        {projectpage && projectpage.length > 0 && (


                <div class='project-page-link'> <Link to={projectpage}>Project Page</Link></div>
                // <a class='link' href={projectpage}>  Project Page</a>

        )}

        {paperlink && paperlink.length > 0 && (
            // <div className="external-link-button">


                <a class='link' href={paperlink}> 
                {/* <img className='link-icon' src='./images/pdficon.png'></img> */}
                Paper
                </a>
            // </div>
            
        )}

        {video && video.length > 0 && (
            <a class='link' href={video}>
                {/* <img className='link-icon' src='./images/video-player.png'>

                </img> */}

                    Video 

            </a>
        )}

        {codelink && codelink.length > 0 && (
            <a class='link' href={codelink}>Code</a>
        )}

        {demolink && demolink.length > 0 && (
            <a class='link' href={demolink}>Demo</a>
        )}

        {blogpostlink && blogpostlink.length > 0 && (
                    // <a class='link' href={blogpostlink}>Read more</a>
                    <div class='project-page-link'> 

                    <Link to={blogpostlink}>Blog Post </Link>
                    </div>)}

        </div>
      </div>
    </div>
  );
};

export default BlogPost;