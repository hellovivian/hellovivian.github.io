import React from 'react';

const PersonalInformatics = () => {
    return (
        <>
        {/* <img width="600px" src="./images/gallery3.jpeg"></img> */}
                    <img height="535px" src="./blogpost_images/healthdiary_banner.jpg"></img>
                    <br></br><br></br>

            <p>
                Recently, I have been experimenting with using AI for a health informatics experiment. I wanted to know how
                factors like sleep, caffeine, and stress were impacting a health concern.
            </p>
            <p>
                In the past, when I have gone to a doctor, they would ask me diagnostic questions like, “Is this a problem that is worse in the
                morning or the evening? “Is it worse when you are stressed and have been working up till paper deadlines?ˮ I have always
                found it hard to conclusively answer these sort of questions. I would try to think back, but the human memory is naturally
                quite hazy. Maybe a memory or two would surface, and I would answer based on sparse recollection. “No. I donʼt think so.
                Probably?ˮ
            </p>
            <p>
                There were always some usual suspects I had informal hypotheses about — sleep, stress, screen time, mood, and caffeine
                — but there were so many confounding factors from living life that made it hard to disentangle if any specific factor was a
                trigger.
            </p>
            <p>
                Plus, even I had some perfect, complete data log of all the different possible factors, it still wouldnʼt tell the full story.
                Perhaps all the data combined wouldnʼt have as much explanatory power as a sentence would. “During this week when my issue was acting
                up, I was extremely busy, but I also had very regular exercise from being on the dance team. I was super fulfilled.ˮ Or ,
                “During these two weeks, I was extremely busy with a paper deadline and only eating assorted muffins, so I was very
                stressed and my mood yo-yoʼed a lot.ˮ Personal context shapes data.
            </p>
            <p>
                I had actually tried using ChatGPT to do some of this health logging in 2022 / 2023. It was convenient for keeping a running
                personalized context. However, quickly chats became untenable, because the AI responses added too much noise in
                between each entry I logged. The chat interface was also too strict— it only supported linear organization of information,
                which once something becomes long, becomes hard to engage with <a href="https://arxiv.org/pdf/2305.11483">[1]</a>.
            </p>

            <p>
                My idea has been to make a little diary specific to my health concern. There are so many trackers and apps online, but I was motivated to
                make my own personalized tool, because I needed something for me.
            </p>
            <h4>Sketch of the System</h4>
            <p>
                <strong>Input.</strong> The health diary would take in a voice or text note as input. Voice interactions are great for when you are on the go,
                multi-tasking, at home, have sufficient privacy, or trying to communicate over a distance. Text interactions are great for
                when you need privacy (e.g. at work, in class) or donʼt feel up to the physical effort of voice. Having both would allow
                me to have coverage over different settings would encourage me to log as close to a health event as possible. I could
                log a quick note using voice while on a walk or type a note while at my desk.
            </p>
            <p><strong>Input ➔ Output. </strong>
                That voice or text note would be transformed through GPT from a freeform note into an entry in a
                database. <br></br>
                <br></br>For example, a voice note transcribed as “Today, I only slept two hours because of the summer heat, but the morning meetings went
                fine.ˮ would be transformed accordingly.
            </p>
            
            <table>
                <thead>
                    <tr>
                        <th>Timestamp</th>
                        <th>Title</th>
                        <th>Mode</th>
                        {/* <th>Screen Time</th> */}
                        <th>Sleep</th>
                        <th>AI Analysis (really just summarization of what I said)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Aug 5, 2025, 12:30 PM</td>
                        <td>Sleep deprivation noted</td>
                        <td>Voice</td>
                        {/* <td>null</td> */}
                        <td>2 hrs</td>
                        <td>Sleep a possible factor, but user was fine during active engagements of work.</td>
                    </tr>
                </tbody>
            </table>
            <p>
                <strong>Output.</strong> This would allow me to have a database of entries that I could then flexibly visualize. If I could stick to logging
                longitudinally, I could do some personal analysis. (e.g. Is it actually worse in the morning? Is sleep deprivation the root cause? Is the OTC med working?)
            </p>
            <br></br>
            <p>
                {/* Yay. So I vibe coded (except vibe coding is still a lot of patchwork on the part of the developer to diagnose errors -- its like the art of sprezzatura but for developers). */}
                So I implemented this system. I want to say that I vibe coded it, but there was so much patchwork on my part that I hesitate to say it was a bunch of agents-sprezzatura-magic.
            </p>
            <img width="80%" src="./blogpost_images/healthdiary_all.jpg"></img>
            <br></br>
            <h4>Implementation Notes</h4>
            <p>

            I had to think about how what I logged would be transformed as data across the tool. At first, the input is unstructured voice transcription / text. But then it becomes a structured entry in a database with a schema attached to it. In a later stage, it has to be amenable to visualization.
            </p>


            <p>
                The unstructured nature of the input makes it so that AI could infer very different sets of dimensions from each input. For example, I could say something like "Today sucked" and that would be a far less data-complete picture than something like "Today at 8:33pm, I felt fantastic. I had slept 9 hrs, and spent the whole day at the beach, so 0 screen time..."
            
            </p>
            <p>
                Similarly, the dimensions I care about tracking could change -- and they did, even in the short course of time I have been tracking. I came across an over-the-counter intervention I wanted to try. That meant this tool had to infer a new dimension (Med), update the underlying schema, and backfill entries. So this tool definitely had to be more dynamic and reconfigure itself so that it could support calibration, iteration, and interaction.
            </p>
            

            {/* <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Time of Day / Context</th>
                        <th>Symptom Type & Behavior</th>
                        <th>Severity / Functional Impact</th>
                        <th>Mental / Cognitive / Emotional Load</th>
                        <th>Social Interaction Impact</th>
                        <th>Notable Triggers or Associations</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>8/22 </td>
                        <td>Morning Meetings</td>
                        <td>...</td>
                        <td>Moderate</td>
                        <td>...</td>
                        <td>...</td>
                        <td>...</td>
                    </tr>
                </tbody>
            </table>
            <p>
                Or the database entry could look like this, if I was more minimal in what I shared. "Today was just alright. Light issues during a long Zoom call."
            </p>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Context</th>
                        <th>Symptoms</th>
                        <th>Notes / Associations</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>08/22</td>
                        <td>No special shared. </td>
                        <td>Virtual meeting length.</td>
                        <td>Mood is alright.</td>

                    </tr>
                </tbody>
            </table>
            <p>
                Or perhaps, as it happened to be the case for me, I tried an intervention — a new over-the-counter medication, and wanted
                to flag on which days that was happening. The AI tool would to reconfigure around this update and backfill entries.
            </p>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Contexts</th>
                        <th style={{ backgroundColor: 'lightgreen' }}>Med (Y/N)</th>
                        <th>Symptoms</th>
                        <th>Severity / Functional Impact</th>
                        <th>Social Interaction Impact</th>
                        <th>Notes on Symptom Dynamics</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td style={{ backgroundColor: '#e0f0e0' }}>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                    </tr>
                </tbody>
            </table> */}
            
            <table style={{width: '40%'}}>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Title</th>
                        <th style={{ backgroundColor: 'lightblue' }}>Med (Y/N)</th>
                        

                        <th>Rating (1-10)</th>
                        <th>Stressors</th>

                        <th>Notes</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td style={{ backgroundColor: 'lightblue' }}>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                    </tr>
                </tbody>
            </table>
      
            {/* <p>
                And of course interaction such as being able to edit entries would allow me to make sure that whatever the AI was inferring
                was correct.
            </p>
            <h4>Before Editing</h4>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Context</th>
                        <th>Sleep</th>
                        <th>Symptoms</th>
                        <th>Severity / Functional Impact</th>
                        <th>Social Interaction Impact</th>
                        <th>Emotional / Behavioral Notes</th>
                        <th>Interpretation Trend</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Aug 22, 2025, 1:00 PM</td>
                        <td>Work</td>
                        <td>8 hours</td>
                        <td>Eye Strain</td>
                        <td>High</td>
                        <td>None</td>
                        <td>Stressed</td>
                        <td>Positive</td>
                    </tr>
                </tbody>
            </table>
            <h4>After Editing</h4>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Context</th>
                        <th>Sleep</th>
                        <th>Symptoms</th>
                        <th>Severity / Functional Impact</th>
                        <th>Social Interaction Impact</th>
                        <th>Emotional / Behavioral Notes</th>
                        <th>Interpretation Trend</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={{ backgroundColor: 'lightturquoise' }}>Aug 22, 2025, 2:30 PM</td>
                        <td>Work</td>
                        <td>8 hours</td>
                        <td>Eye Strain</td>
                        <td style={{ backgroundColor: 'lightturquoise' }}>Low</td>
                        <td>None</td>
                        <td style={{ backgroundColor: 'lightturquoise' }}>Calm</td>
                        <td>Negative</td>
                    </tr>
                </tbody>
            </table> */}
            <h4>Results</h4>
            <p>
                It works for me. :) I log and I learn. The tool can support logging, editing, and basic visualizations. However, it does not yet support bespoke visualization (e.g. prompting for AI-generated plots like "let me see my mood plotted against sleep", so that's some future work I guess. :)  
            </p>
            <p>This is a dialed-down, even more minimal version of this idea that I am putting online so you can get the idea in an interactive form. There is no voice mode and just dummy data.
                
           </p>
           <br>
           </br>
                <a class="cv-button" href="https://health-diary-lite.netlify.app/"> Minimalist Demo </a>
           <br>
           </br>
        

           <br></br>
            <h4>Related HCI Work</h4>
             <p>
                This idea is motivated by a lot of the work of my peers and mentors. It's kind of nice to see the threads synthesize in a tool that is personal and helpful to me.
            </p>
            <p>
                <strong>Schema Induction. </strong> 
                The idea of dynamically evolving a schema is schema induction, and my advisor <a href="https://www.cs.columbia.edu/~chilton/index.html">Lydia</a> and my
                labmate <a href="https://sitong-wang.github.io/">Sitong</a> introduced me to it (it is the focus of Sitongʼs thesis). Schema induction is this established idea from
                cognitive psychology that problems can be solved by abstracting out the fundamental template of the solution and
                extrapolating it onto other problems. There is this famous UMichigan paper <a href="https://deepblue.lib.umich.edu/bitstream/handle/2027.42/25331/0000776.pdf?sequence=1"> by Gick and Holyoak</a> that provides a nice example of this sort of problem-
                solving by analogy. For example, treating cancer at a number of different sites with weak radiation (setting A) has the
                same abstract approach as trying to conquer a city with a multi-site offense using small army units (setting B). Thus,
                they share the same schema, and this schema can be applied to other problem settings.
            </p>
            
            <p><strong>Personal app generation / vibe coding. </strong>
                My labmate <a href="https://jennygzma.github.io/">Jenny</a> wrote a very cool paper called <a href="https://arxiv.org/pdf/2410.00400">Dynex</a> about generative app
                generation. Dynex was kind of a paper about vibe coding before vibe coding was a thing, and its HCI contribution was
                that it helps users with the intention specification problem that many people say is half the battle with AI workflows
                (since people are iteratively figuring out what they want). 
            </p>
            
            <p>
                <strong>Data transformation and generated widgets. </strong>
                The first time I heard of dynamic user interfaces driven by AI-generated
                widgets was in <a href="https://arxiv.org/pdf/2401.10880">Dynavis</a> (dynamically synthesized UI widgets for visualization editing). I think Notion and the way it has
                different views over the database is also another instance of how powerful it can be to visualize your data in different
                ways. But the generative boost can give a user access to truly bespoke visualizations rather than the typical histogram /
                countplot.
            </p>
            
            <p>
                <strong>Sensemaking and dimension discovery. </strong>
                There are quite a few really great papers on sensemaking and dimension
                discovery. <a href="https://dl.acm.org/doi/pdf/10.1145/3613904.3642400">Luminate</a>, <a href="https://arxiv.org/pdf/2305.11483">Sensecape</a>, <a href="https://arxiv.org/pdf/2404.12259">LLooM</a>. They contribute different ideas: Sensecape is about managing the information
                density of information exploration in chats through levels of abstraction. Lloom is about discovering concepts from
                qualitative datasets framed as an LLM algorithm.
            </p>
           
            <p>
                 <strong>Personal sensors. </strong>
                When I first joined PAIR at Deepmind as an intern, my teammates <a href="https://lxieyang.github.io/">Michael</a> and <a href="https://savvaspetridis.github.io/">Savvas</a> had just
                been submitted called Gensors, which introduced this idea of creating personalized sensors and emphasized how the
                multimodal and streaming capabilities of AI models could actively track things for you. I springboarded a lot from these
                ideas.
            </p>
            
            <p><strong>Personal informatics.</strong>
                One of my mentors at Autodesk, Jo had was on a paper about situated <a href="https://pure.au.dk/ws/portalfiles/portal/284853630/CHI_2022_Data_Every_Day_Designing_and_Living_with_Personal_Sit">personal situated
                visualizations</a>, and I remembered it because I liked that it had an autobiographical approach to the methodology. I
                thought that was unique — like oh, designing for oneself is actually allowed. There is also this paper called <a href="https://dl.acm.org/doi/pdf/10.1145/238386.238493">LifeLines</a> which aligns with these ideas a lot too -- "visualizing personal histories described in discrete events by a tool".
            </p>
            <br></br>
            
            <p></p>
            <p></p>
            {/* <img width="600px" src="https://pbs.twimg.com/media/DHMrhDwVwAEB4oM?format=jpg&name=large"></img>
            <p>I have been thinking a lot of tools,This image is from 2001: The Space Odyssey, and I guess recently I have been thinking a lot about tools. </p> */}
            
        </>
    );
};

export default PersonalInformatics;
