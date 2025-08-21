import React from 'react';
import { useParams } from 'react-router-dom';
import blogData from '../data/blogData';
import Navigation from '../components/Navigation';

const BlogPostPage = () => {
    const { slug } = useParams();
    const blogPost = blogData.find(post => post.slug === slug);

    if (!blogPost) {
        return <div>Blog post not found!</div>;
    }

    const ContentComponent = blogPost.component;

    if (slug === 'dot') {
        return <ContentComponent />;
    }

    return (
        <div className='container'>
            <Navigation />
            <div className="profile-container">
                <div>
                    <h3 id="title">{blogPost.title}</h3>
                    <p class="blog_date">{blogPost.date}</p>
                    <ContentComponent />
                </div>
            </div>
        </div>
    );
};

export default BlogPostPage;
