// AboutPage.js
import './App.css';
import BlogPost from './components/BlogPost.js';
import blogData from './data/blogData.js';
import Navigation from './components/Navigation.js';
import 'react-alice-carousel/lib/alice-carousel.css';

const BlogPage = () => {
  return (
    <div className='container'>
      <Navigation />
      <h1>Blog</h1>


      <div className="profile-container">
        <div>
          {blogData.map((project) => (
            <BlogPost projectname={project.title} date={project.date} authors={project.authors} projectpage={project.links.pg} codelink={project.links.codelink} video={project.links.video} demolink={project.links.demolink} blogpostlink={project.links.blogpostlink} paperlink={project.links.paperlink} venue={project.description} imgsrc={project.links.img_src} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;