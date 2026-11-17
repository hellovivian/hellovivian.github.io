// BlogPage.js
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import './BlogIndex.css';
import blogData from './data/blogData.js';
import Navigation from './components/Navigation.js';
import BlogPost from './components/BlogPost.js';
import 'react-alice-carousel/lib/alice-carousel.css';

// Posts that take over the whole page and don't preview well inline.
const NO_INLINE_PREVIEW = new Set(['dot']);
// Wait this long before expanding, so rows don't flap open while the
// cursor is just passing over them on the way somewhere else.
const HOVER_DELAY_MS = 250;
const VISUALS = 'img, video, canvas, figure, iframe, svg';

const postPath = (post) => post.links.blogpostlink || `/blog/${post.slug}`;

// Hover-to-expand only makes sense with a real pointer (not touch screens).
const canHover = () =>
  typeof window !== 'undefined' && window.matchMedia &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches;

// Prepare the preview: hide the lead visual(s) that come before the first
// paragraph of text (they usually repeat the square thumbnail), and report
// whether the post has any text at all.
const preparePreview = (root, hideAllVisuals) => {
  const firstText = Array.from(root.querySelectorAll('p')).find((p) => p.textContent.trim());
  root.querySelectorAll(VISUALS).forEach((el) => {
    const isLead = !firstText ||
      (firstText.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_PRECEDING &&
        !el.contains(firstText));
    if (hideAllVisuals || isLead) el.classList.add('is-lead');
  });
  return Boolean(firstText);
};

const HoverPreviewPost = ({ post }) => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  // Mount the post's content on first hover and keep it, so heavy posts
  // only load if someone shows interest, and re-hovering is instant.
  const [mounted, setMounted] = useState(false);
  const [hasText, setHasText] = useState(true);
  const timer = useRef(null);
  const contentRef = useRef(null);
  const Content = post.component;
  const previewable = !NO_INLINE_PREVIEW.has(post.slug) && canHover();
  // previewMode: 'image' shows the content as-is (no lead-image hiding, no
  // text requirement). previewMode: 'live' shows the post's interactive demo.
  const live = post.previewMode === 'live';
  const asIs = post.previewMode === 'image' || live;
  // Once someone interacts with a live demo, keep it open even if the cursor
  // wanders out of the row (e.g. while dragging to orbit).
  const [pinned, setPinned] = useState(false);
  const open = (hovered || pinned) && (asIs || hasText);

  useEffect(() => () => clearTimeout(timer.current), []);

  useLayoutEffect(() => {
    if (asIs || !mounted || !contentRef.current) return;
    setHasText(preparePreview(contentRef.current, post.previewImages === false));
  }, [asIs, mounted, post.previewImages]);

  const onEnter = () => {
    if (!previewable) return;
    clearTimeout(timer.current);
    timer.current = setTimeout(() => { setMounted(true); setHovered(true); }, HOVER_DELAY_MS);
  };
  const onLeave = () => {
    clearTimeout(timer.current);
    setHovered(false);
  };

  return (
    <div className={`blog-hover${open ? ' is-open' : ''}${live ? ' is-live' : asIs ? ' is-as-is' : ''}`} onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <BlogPost projectname={post.title} date={post.date} authors={post.authors} projectpage={post.links.pg} codelink={post.links.codelink} video={post.links.video} demolink={post.links.demolink} blogpostlink={post.links.blogpostlink} paperlink={post.links.paperlink} venue={post.description} imgsrc={post.links.img_src} />

      {previewable && live && (
        <div className="blog-hover-panel" aria-hidden={!open}>
          {pinned && (
            <button type="button" className="blog-hover-close" onClick={() => { setPinned(false); setHovered(false); }}>
              Close ✕
            </button>
          )}
          <div className="blog-hover-live" onPointerDown={() => setPinned(true)}>
            {mounted && <Content live />}
          </div>
        </div>
      )}

      {previewable && !live && (
        <div className="blog-hover-panel" aria-hidden={!open}>
          <div className="blog-hover-preview" onClick={() => navigate(postPath(post))}>
            <div className="blog-hover-content" ref={contentRef}>{mounted && <Content />}</div>
            <div className="blog-hover-fade" />
          </div>
        </div>
      )}
    </div>
  );
};

const BlogPage = () => (
  <div className="container">
    <Navigation />
    <h1>Blog</h1>

    <div className="profile-container">
      <div>
        {blogData.map((post) => <HoverPreviewPost key={post.slug} post={post} />)}
      </div>
    </div>
  </div>
);

export default BlogPage;
