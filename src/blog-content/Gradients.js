
const GradientsContent = () => {

    return (
        <>
        <div style={{display: 'flex', width: "50%", margin: "0 auto", gap: '1rem', alignItems: 'center'}}>
                <img src="/blogpost_images/eyeapp.png" style={{flex: 1, maxWidth: '50%', objectFit: 'cover'}}></img>
                <img src="/blogpost_images/healthapp2.png" style={{flex: 1, maxWidth: '50%', objectFit: 'cover'}}></img>
            </div>
              <p style={{fontSize: '0.85em', color: '#666', textAlign: 'center', marginTop: '0.5rem'}}>I should have been writing my dissertation honestly...</p> 

            <p>
            For fun, I worked on my health tracking app for a bit this weekend, mostly focusing on the design system and look and feel. I recently discovered what mesh gradients were and thought it would be fun to incorporate them in my app. Back when I used to do mockups for UI design classes, I always loved to use gradients and transparent overlays, even though they weren’t fashionable or good UI best practice.          
            </p>
            <p>
            Gradients are powerful and fancy, and all the frontier companies use them as a design metaphor for AI. It makes sense — they are soothing abstract flows of color. They lend well to motion design and give you a sense of life and intelligence without a concrete graphic embodiment.<sup><a href="#fn1" style={{textDecoration: 'none'}}>1</a></sup>  I quite liked this motion design reflection done by Google's team on Gemini (<a href="https://design.google/library/gemini-ai-visual-design">link</a>). They write about how they thought about intentional motion, how transformations in shape and animation could represent AI activity like thinking and so on.  
            </p>
    
           
            {/* <div style={{display: 'flex', width: "70%", margin: "0 auto",gap: '1rem', alignItems: 'center'}}>
                <img src="https://cdn.mos.cms.futurecdn.net/hpa6hNJuF4TiXWonnRkE6L.jpg" style={{flex: 1, maxWidth: '50%', objectFit: 'cover'}}></img>
                <img src="https://i.ytimg.com/vi/fY5jwF7TQmE/maxresdefault.jpg" style={{flex: 1, maxWidth: '50%', objectFit: 'cover'}}></img>
            </div>
            <p style={{fontSize: '0.85em', color: '#666', textAlign: 'center', marginTop: '0.5rem'}}>Left: ChatGPT voice mode. Right: Google's voice mode.</p> */}

            <p>
            I started working on my health tracking app in August. Like most vibe-coded apps, it looked like trash at first: there was a database that was quite nakedly displayed on the home page; buttons were littered all over the interface (even overlapping), and the trash button had that tell-tale firefighter red background color Claude likes to come back with. But I did remember being proud of what I had gotten done in August. A fully deployed interface backed by a database, with a voice mode and many data visualization features working in concert, and a local model to assist with semantic search. It was tailored to how I wanted to track my health everyday. I remember thinking at that time that we were getting a lot closer to the promise of agents writing and rewriting apps. In the human-computer interaction community, some people call this malleable software. <sup><a href="#fn2" style={{textDecoration: 'none'}}>2</a></sup>  
            
            </p>

            <img style= {{width: "70%"}} src="/blogpost_images/healthdiary_all.jpg"></img>
            <p>
            But now that some months have passed, I feel that we’ve made it to the other side of the inflection point, when the acceleration slows but is still approaching that goal. There’s a lot of talk about this online, a lot of jokes about taste and some cajoling  —  “where are the promised apps, the fruits of all the vibe coding?” And then someone always goes, they’re not on the app store because people are making software for ~themselves~.
                
            </p>
            <p>
            As I was. I spent my Friday night working on rehauling the user interface and experience of my app.  I was supposed to watch In the Mood for Love, but instead I agents working in high parallelization over my app. I flipped back and forth between plan mode, Google Images, Figma Community, act mode, and localhost:5173. I let it carry out insane edits and inane edits: 1) insane: “can you add faceauth to my app?” Oh wow, it did it without fail.  2) inane: “can you make the button more subtle.” → “No, smaller.” → “Can you make it more turquoise?” → “Actually black, that just looks more professional.” → “Actually can you make it look professional?” After much "flibbertigibetting" (Anthropic's copy not mine) on the part of Claude Code, I went to sleep, resigned because the app was still ugly. But the next morning I thought about how the mesh gradients and frosted glass could work in tandem, and within an hour I had found my visual stride and was more pleased. 
            </p>

            <div style={{display: 'flex', margin:"0 auto", width:"70%", gap: '1rem', alignItems: 'center'}}>
                <img src="/blogpost_images/eyeapp.png" style={{flex: 1, maxWidth: '25%', objectFit: 'cover'}}></img>
                <img src="/blogpost_images/healthapp1.png" style={{flex: 1, maxWidth: '25%', objectFit: 'cover'}}></img>
                <img src="/blogpost_images/healthapp2.png" style={{flex: 1, maxWidth: '25%', objectFit: 'cover'}}></img>
                <img src="/blogpost_images/healthapp3.png" style={{flex: 1, maxWidth: '25%', objectFit: 'cover'}}></img>
            </div>


          
            <p>
            I think it looks zen, sweet, and playful. I dunked it in my favorite color (turquoise), and I’ve finally  implemented the transparent overlays I’ve always liked from college. Ironically, I had not liked the push for liquid glass from Apple in ios26, but I love that I got mesh gradients to work with this frosted glass look. 
            </p>
            <p>
            It is hard to make a well-designed application: it has to make good on function, form, and perceptual experience. From years of making progressively less ugly and mildly more usable applications, I have become savvy with full-stack engineering and design. I can figure out how to keep iterating the app towards a better spot: deprecating unnecessary complexity, reimagining the user flow and underlying representations of data, writing the design system as I go, and U-turning from bad asks of my AI agents. 
            </p>
            <p>
            I can’t see how we can push those decisions onto novice users just quite yet. They aren’t going to know how to setup a database, to know whether it should be local or writable to cloud. They aren’t going to know how to come up with a design system, and will probably tire of seeing the glaring perceptual feel of vibe-coding before they get to the finish line. They won’t want to rotate the keys in their .env once an agent trips over them.
            </p>
            <p>
            Vibe coding will benefit from scaffolding — some full-stack repo that bootstraps the process so that agents can really easily cut the cloth into bespoke user-specific software. It’s like finding the greatest common denominator for software, and I think some candidates and low-hanging fruit would be the planner, the note app, and the health / emotion tracking applications. This is what Canva did to Photoshop: pull out the best parts of the expert tools and provide the templating so that novices can make designs too.
            </p>
            <p>
            But all the vibe coding and vision of bespoke software has also made me wonder what the line is between bespoke and best practice. AI often comes up a confident technical specification for me, and tells me that it can implement it all for me. Often, I follow pretty diligently in the beginning, get the gist, and then accept before I finish reading till the end. Especially in my no-stakes project. The AI agents are just too verbose. For this reason, instead of using existing libraries, I think AI has implemented path motion and path smoothing algorithms for me a dozen times.
            </p>
            <p>
            I guess what am I saying is, sometimes I feel like I am rediscovering the wheel as I am designing bespoke software for myself — learning why things were made that way in the first place. So at what point should we go back to bootstrap, the old patchwork of libraries, and plain old best practices? In human-computer interaction work, there is a clear distinction between tools targeted towards novices and those targeted towards professionals. The skill delta between what each group produces is huge. The novice understands the problem they want to solve, but not necessarily how to execute a solution for it. The professional (say UI/UX designer or engineer) knows how to execute one part of the solution to best practice, but does not necessarily know how to tailor that solution for the user that is not them. It's a tension, and I’m sure many people must be studying it right now at Google, Lovable, and Figma.
            </p>
            <p>
            I think one of the visual ironies that kind of illustrates this is how gradients are used in AI user interfaces. On one end, you have the big league frontier labs using gradients to represent the energy in voice waveforms. On the other hand, you have people mocking vibe-coded interfaces for the purple gradient tip-offs that it was done by a novice.
            </p>
            <p>
            This made me think of the time I once I accidentally opened up a Claude Skill, which was very enlightening.
            </p>

            <p>
                <blockquote style={{borderLeft: '3px solid #ccc', paddingLeft: '1rem', color: '#555', fontStyle: 'italic'}}>
            NEVER use generic AI-generated aesthetics like overused font families (Inter, Roboto, Arial, system fonts), cliched color schemes (particularly purple gradients on white backgrounds), predictable layouts and component patterns, and cookie-cutter design that lacks context-specific character.
            Interpret creatively and make unexpected choices that feel genuinely designed for the context. No design should be the same. Vary between light and dark themes, different fonts, different aesthetics. NEVER converge on common choices (Space Grotesk, for example) across generations.
            IMPORTANT: Match implementation complexity to the aesthetic vision. Maximalist designs need elaborate code with extensive animations and effects. Minimalist or refined designs need restraint, precision, and careful attention to spacing, typography, and subtle details. Elegance comes from executing the vision well.
            Remember: Claude is capable of extraordinary creative work. Don't hold back, show what can truly be created when thinking outside the box and committing fully to a distinctive vision. -- Claude
            </blockquote>


            </p>

             <p style={{fontSize: '0.85em', color: '#666', textAlign: 'center', marginTop: '0.5rem'}}>  <em> Don't hold back. </em> I wish someone told me that as a researcher. And what’s wrong with Space Grotesk? Actually, now that I google it, it reminds me of an HTML page Codex coded up for me. Haha, ahhh the AI aesthetic.r</p> 
            

        
            
            <p>
            Sometimes, I really love vibe coding. <sup><a href="#fn4" style={{textDecoration: 'none'}}>3</a></sup> I think, thank god, I can preserve my vision with less hours sweatshopping in front of a screen. I am happy these agents take me to where I would otherwise not be able to go. Along the way, I even found a playful zen visual identity in frosted glass treatments and mesh gradients. It was a fun hyperspeed exercise I could only do, in between my two projects and dissertation writing, with a bunch of agents flibbertigibetting for me. 
            </p>
            <p>
            All in all, I actually love that there was so much to think and do in as the app morphed from the previous form factor to this one. It makes me optimistic about the amount of research we still have ahead to get vibe coding to work. Like it’s not there yet, but that is and always will be the fun part — because people aren’t easy to make happy.
            </p>
            <img style={{width: "25%"}} src="/blogpost_images/playful_zen.gif"></img>

            <hr style={{marginTop: '2rem', border: 'none', borderTop: '1px solid #ccc'}} />
            <ol style={{fontSize: '0.85em', color: '#666', paddingLeft: '1rem', textAlign: 'left'}}>
               
                <li id="fn1">
                Speaking of concrete graphical embodiments of AI. People liked Clippy. But we got rid of Clippy, and some twenty six years later after we got rid of Clippy's body, we now have AI that people think have the potential to make us all paperclips. Clippy's revenge era?
                </li>
                <li id="fn3">
                Malleable Interfaces from Haijun Xia's group. <a href="https://www.youtube.com/watch?v=MbWgRuM-7X8">(link)</a>
                </li>
                <li id="fn4">
                    Sometimes I also really hate vibe coding. I think it gets in the way of me solidifying my skills in Javascript, and I am actually taking caution and keeping my Python skills away from the practice, in a cryogenic chamber until I have time to do more in that language. (I fought to learn those skills when I was in Berkeley and don’t want to lose them.)
                </li>
            </ol>




        </>
    );
};

export default GradientsContent;
