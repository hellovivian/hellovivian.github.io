import { useState, useRef, useEffect, useMemo } from 'react';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import './TimeCapsule.css';
import { timelineEntries } from './timeCapsuleData';

const isVideo = (src) => /\.(mp4|webm|mov)(\?.*)?$/i.test(src);

const MediaItem = ({ src, alt }) => isVideo(src)
    ? <video src={src} autoPlay loop muted playsInline />
    : <img src={src} alt={alt} />;

const extractYear = (dateStr) => {
    const m = dateStr?.match(/\d{4}/);
    return m ? m[0] : null;
};

const TimeCapsuleContent = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [minimapLevel, setMinimapLevel] = useState('all'); // 'all' | 'year'
    const [minimapSide, setMinimapSide] = useState('both'); // 'both' | 'left' | 'right'
    const entryRefs = useRef([]);

    useEffect(() => {
        const observers = [];
        const visibilityMap = new Map();

        const pickMostVisible = () => {
            let bestIndex = 0;
            let bestRatio = -1;
            visibilityMap.forEach((ratio, i) => {
                if (ratio > bestRatio) { bestRatio = ratio; bestIndex = i; }
            });
            setActiveIndex(bestIndex);
        };

        entryRefs.current.forEach((el, i) => {
            if (!el) return;
            const obs = new IntersectionObserver(
                ([entry]) => {
                    visibilityMap.set(i, entry.intersectionRatio);
                    pickMostVisible();
                },
                { threshold: [0, 0.25, 0.5, 0.75, 1] }
            );
            obs.observe(el);
            observers.push(obs);
        });

        return () => observers.forEach(o => o.disconnect());
    }, []);

    // Derive unique years and the first entry index for each
    const yearGroups = useMemo(() => {
        const seen = new Map();
        timelineEntries.forEach((entry, i) => {
            const year = extractYear(entry.date);
            if (year && !seen.has(year)) seen.set(year, i);
        });
        return Array.from(seen.entries()).map(([year, firstIndex]) => ({ year, firstIndex }));
    }, []);

    const activeYear = extractYear(timelineEntries[activeIndex]?.date);

    const scrollTo = (i) => {
        entryRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    return (
        <>
        <nav className="timeline-minimap">
            <div className="minimap-level-toggle">
                <button className={minimapLevel === 'year' ? 'active' : ''} onClick={() => setMinimapLevel('year')}>yr</button>
                <button className={minimapLevel === 'all'  ? 'active' : ''} onClick={() => setMinimapLevel('all')}>all</button>
            </div>
            <div className="minimap-level-toggle">
                <button className={minimapSide === 'left'  ? 'active' : ''} onClick={() => setMinimapSide(s => s === 'left'  ? 'both' : 'left')}>L</button>
                <button className={minimapSide === 'right' ? 'active' : ''} onClick={() => setMinimapSide(s => s === 'right' ? 'both' : 'right')}>R</button>
            </div>

            {minimapLevel === 'year'
                ? yearGroups
                    .filter(({ firstIndex }) => minimapSide === 'both' || timelineEntries[firstIndex]?.position === minimapSide)
                    .map(({ year, firstIndex }) => (
                        <button
                            key={year}
                            className={`minimap-entry${year === activeYear ? ' minimap-entry--active' : ''}`}
                            onClick={() => scrollTo(firstIndex)}
                            title={year}
                        >
                            <span className="minimap-dot" />
                            <span className="minimap-label">{year}</span>
                        </button>
                    ))
                : timelineEntries
                    .map((entry, i) => ({ entry, i }))
                    .filter(({ entry }) => minimapSide === 'both' || entry.position === minimapSide)
                    .map(({ entry, i }) => (
                        <button
                            key={i}
                            className={`minimap-entry${i === activeIndex ? ' minimap-entry--active' : ''}`}
                            onClick={() => scrollTo(i)}
                            title={entry.title || entry.date}
                        >
                            <span className="minimap-dot" />
                            <span className="minimap-label">{entry.date}</span>
                        </button>
                    ))
            }
        </nav>

        <p>
        I am collecting and reflecting as I'm finishing my PhD and looking at things in the rear view mirror. My PhD started in 2020 and is ending in 2026, so the time frame captured that point of inflection when AI really took off.
        </p>
        <p>
        I thought it would be cool to dump some of the media I have here, because I experimented with many types of generative models (language, image, code, video, 3D) early on.
        </p>
        <p>
        So on the right is my personal timeline and experiments. On the left are events that situate those experiments with what was happening in the tech and research sphere.
        </p>
        <p>
        {/* Kind of gives you a sense of how long a PhD is actually. */}
        In retrospect, it has been nice to see how my interests changed and persisted over time. :)
        </p>
        <VerticalTimeline animate={false}>
            {timelineEntries.map((entry, i) => {
                const images = entry.images ?? (entry.image ? [entry.image] : []);
                const hasImages = images.length > 0;
                return (
                    <VerticalTimelineElement
                        key={i}
                        date={entry.date}
                        position={entry.position}
                        iconStyle={{ background: entry.color || '#ccc', width: 20, height: 20, marginLeft: -10, marginTop: 10 }}
                        contentStyle={hasImages ? { background: entry.color, color: '#000' } : undefined}
                        contentArrowStyle={hasImages ? { borderRight: `7px solid ${entry.color}` } : undefined}
                    >
                        <div
                            ref={el => entryRefs.current[i] = el}
                            style={{ textAlign: entry.position === 'left' ? 'right' : 'left' }}
                        >
                            <h3 className="vertical-timeline-element-title">{entry.title}</h3>
                            {entry.subtitle && <h4 className="vertical-timeline-element-subtitle">{entry.subtitle}</h4>}
                            {images.length > 0 && (
                                <div className={images.length > 1 ? "timeline-image-gallery" : undefined}>
                                    {images.map((src, j) => (
                                        <MediaItem key={j} src={src} alt={entry.title} />
                                    ))}
                                </div>
                            )}
                            {entry.video && !images.length && <video src={entry.video} autoPlay loop muted playsInline />}
                            {entry.description && <p dangerouslySetInnerHTML={{ __html: entry.description }} />}
                            {entry.link && <a className="timeline-entry-link" href={entry.link}>{entry.linkText ?? "read more →"}</a>}
                            {entry.links && entry.links.length > 0 && (
                                <ul className="timeline-entry-links">
                                    {entry.links.map((l, k) => (
                                        <li key={k}><a href={l.href}>{l.text}</a></li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </VerticalTimelineElement>
                );
            })}
            <VerticalTimelineElement
                iconStyle={{ background: 'rgb(16, 204, 82)', width: 20, height: 20, marginLeft: -10, marginTop: 10 }}
            />
        </VerticalTimeline>
        </>
    );
};

export default TimeCapsuleContent;
