import React, { useEffect } from 'react';
import 'katex/dist/katex.min.css';
import { CopyBlock, dracula } from "react-code-blocks";

import { InlineMath, BlockMath } from 'react-katex';

const NeuralNetworkContent = () => {
    useEffect(() => {
        const canvasStable = document.getElementById('canvasStable');
        const ctxStable = canvasStable.getContext('2d');
        const canvasUnstable = document.getElementById('canvasUnstable');
        const ctxUnstable = canvasUnstable.getContext('2d');
        const startButton = document.getElementById('startButton');

        const N_MOTOR = 20;
        const N_SENSORY = 20;
        const TIME_STEPS = 100;
        const LMAX = 20.0;
        const INIT_RATE = 1.5;
        const DT = 50; // ms per time step

        let L_stable, L_unstable; // Loop matrices
        let simulationIntervalStable, simulationIntervalUnstable;

        // --- Utility Functions ---

        function multiply(matrix, vector) {
            const rows = matrix.length;
            const cols = vector.length;
            const result = new Array(rows).fill(0);
            for (let i = 0; i < rows; i++) {
                let sum = 0;
                for (let j = 0; j < cols; j++) {
                    sum += matrix[i][j] * vector[j];
                }
                result[i] = sum;
            }
            return result;
        }

        function poissonRandom(lambda) {
            if (lambda <= 0) return 0;
            let l = Math.exp(-lambda);
            let k = 0;
            let p = 1;
            do {
                k++;
                p *= Math.random();
            } while (p > l);
            return k - 1;
        }

        // --- Simulation Setup ---

        function powerIteration(matrix, iterations = 20) {
            let b = Array.from({ length: matrix.length }, () => Math.random());
            for (let i = 0; i < iterations; i++) {
                const Ab = multiply(matrix, b);
                const norm = Math.sqrt(Ab.reduce((sum, val) => sum + val * val, 0));
                b = Ab.map(val => val / norm);
            }
            const Ab = multiply(matrix, b);
            const eigenvalue = Ab.reduce((sum, val, i) => sum + val * b[i], 0);
            return eigenvalue;
        }

        function createLoopMatrix(targetGain) {
            const C = Array.from({ length: N_MOTOR }, () =>
                Array.from({ length: N_SENSORY }, () => Math.random())
            );
            const W = Array.from({ length: N_SENSORY }, () =>
                Array.from({ length: N_MOTOR }, () => Math.random())
            );

            const L = Array.from({ length: N_MOTOR }, () => new Array(N_MOTOR).fill(0));
            for (let i = 0; i < N_MOTOR; i++) {
                for (let j = 0; j < N_MOTOR; j++) {
                    let sum = 0;
                    for (let k = 0; k < N_SENSORY; k++) {
                        sum += C[i][k] * W[k][j];
                    }
                    L[i][j] = sum;
                }
            }

            const spectralRadius = powerIteration(L);
            const scale = spectralRadius === 0 ? 1 : targetGain / spectralRadius;

            for (let i = 0; i < N_MOTOR; i++) {
                for (let j = 0; j < N_MOTOR; j++) {
                    L[i][j] *= scale;
                }
            }
            
            console.log(`Target Gain: ${targetGain}, Achieved Spectral Radius: ${powerIteration(L)}`);
            return L;
        }
        
        function setupMatrices() {
            console.log("Setting up simulation matrices...");
            L_stable = createLoopMatrix(0.95);
            L_unstable = createLoopMatrix(1.05);
            console.log("Matrices created.");
        }

        // --- Main Simulation Logic ---

        function runSimulation(ctx, canvas, loopMatrix) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            let m = Array.from({ length: N_MOTOR }, () => poissonRandom(INIT_RATE));
            let totalActivityHistory = [];
            let currentTimeStep = 0;

            const rasterHeight = canvas.height * 0.75;
            const graphHeight = canvas.height * 0.25;
            const graphTop = rasterHeight;

            function drawStep() {
                if (currentTimeStep >= TIME_STEPS) {
                    if (loopMatrix === L_stable) clearInterval(simulationIntervalStable);
                    else clearInterval(simulationIntervalUnstable);
                    return;
                }
                
                const totalFiring = m.reduce((sum, val) => sum + (val > 0 ? 1 : 0), 0);
                totalActivityHistory.push(totalFiring);

                // Draw Raster
                const colWidth = canvas.width / TIME_STEPS;
                ctx.fillStyle = 'black';
                for (let i = 0; i < N_MOTOR; i++) {
                    if (m[i] > 0) {
                        ctx.fillRect(currentTimeStep * colWidth, i * (rasterHeight / N_MOTOR), 2, 2);
                    }
                }

                // Draw Graph
                ctx.clearRect(0, graphTop, canvas.width, graphHeight);
                ctx.beginPath();
                ctx.moveTo(0, graphTop + graphHeight);
                ctx.strokeStyle = 'steelblue';
                ctx.lineWidth = 2;
                for (let t = 0; t < totalActivityHistory.length; t++) {
                    const y = graphTop + graphHeight - (totalActivityHistory[t] / N_MOTOR) * graphHeight;
                    ctx.lineTo(t * colWidth, y);
                }
                ctx.stroke();

                const m_float = m.map(val => parseFloat(val));
                let lambda_next = multiply(loopMatrix, m_float);
                
                // Clip lambda_next values
                lambda_next = lambda_next.map(lambda => Math.max(0, Math.min(lambda, LMAX)));
                
                m = lambda_next.map(lambda => poissonRandom(lambda));
                
                currentTimeStep++;
            }
            return setInterval(drawStep, DT);
        }

        function startAllSimulations() {
            clearInterval(simulationIntervalStable);
            clearInterval(simulationIntervalUnstable);
            simulationIntervalStable = runSimulation(ctxStable, canvasStable, L_stable);
            simulationIntervalUnstable = runSimulation(ctxUnstable, canvasUnstable, L_unstable);
        }

        startButton.addEventListener('click', startAllSimulations);

        // Initial setup
        setupMatrices();
        startAllSimulations();
    }, []);
    return (
        <>
            {/* <h4>AI-Assisted Replication and Extension of Science</h4> */}
            <br />
            <p>
                Informally, I have been benchmarking foundation models on how well they can implement a paper about sensorimotor loops and neuroplasticity (how the brain updates itself). The paper that I use is called <a href="https://journals.physiology.org/doi/pdf/10.1152/jn.2000.84.5.2458">"A Computational Model of the Role of Sensory Disorganization in Focal Task-Specific Dystonia"</a>, and it is a neuroscience x control theory paper by Terence Sanger and Michael Merzenich from the year 2000. Something cool about it is that it introduces a neural network that literally models the brain in terms of neurons, firing activity, and sensorimotor mappings. And it does so in the most minimal way possible, with a linear algebra formulation involving a couple of small matrices (40x40). I liked this paper a lot in undergrad because I discovered it while learning linear algebra and it made the math more relevant to my interests.
            </p>
            <p>
                I had blogged about this paper and how I tried to use GPT-4o to replicate it in 2024. At the time, I was quite inspired to see how much the model understood about the paper and how I could do back-and-forth with AI to deepen my own understanding. Plus, I had just wrapped up a paper about code generation, so I tested GPT to see if it could implement the simulations in Python. It didn't do very well at this, and made a lot of noisy plots / plots that plotted nothing. Still, I thought the coding effort was coherent and better than what I could do given my bandwidth.
            </p>

            <p>
                One year later -- the models are now far better. They have focused on coding, math, and science, and now the pitch is that they are PhD-level (I mean, I believe it). So I tried again with Gemini-2.5-Pro and GPT-5. This time around, they both could replicate quite a few of the experiments, figures, and equation derivations without a hitch -- some, but not all.
            </p>

            <h3>
               Use Case #1. AI Replicating Experiments from the Paper
            </h3>

            <p>
                For example, this is the third figure in the paper, which shows how the firing pattern of a population of neurons can be made stable or unstable depending on a value they define as <InlineMath>\gamma</InlineMath>, the loop gain. If <InlineMath>\gamma \lt 1 </InlineMath>, the firing activity decays as it should. For example, if you bump your knee against something, you expect the pain of the sensation to subside because the signal decays. If <InlineMath>\gamma \gt 1</InlineMath> however, the firing activity is instable, does not decay, and continues firing over time to the point of saturation. This is shown in one of the first result graphs of the paper.

            </p>

            <h4> Original Paper: Figure 3: Demonstrating Signal Decay in a Sensorimotor Loop </h4>

            <img width="90%" src="./blogpost_images/computational_models/computational_models_figure3.png" />

            <br>
            </br>
            <p> This is GPT-5 implementing it. Gemini came up with a similar implementation. </p>


            <h4> GPT-5 Implementation of Figure 3: Demonstrating Signal Decay in a Sensorimotor Loop </h4>


            <div style={{ display: "flex" }}>
                <div style={{ width: "60%" }}>
                    <img src="./blogpost_images/computational_models/gpt_figure3.png" />

                </div>
                <div style={{ width: "40%", fontSize: "0.5em", textAlign: "left" }}>

                    <CopyBlock
                        text={`def make_random_nonneg_matrix(rows, cols, scale=1.0, rng=rng):
    return rng.random((rows, cols)) * scale

def normalize_spectral_radius(A, target_radius):
    eigvals = np.linalg.eigvals(A)
    rho = np.max(np.abs(eigvals))
    return A if rho == 0 else A * (target_radius / rho)

# Small discrepancy: I used n=20 neurons rather than 100.
def simulate_loop(target_gain=0.95, n_motor=20, n_sensory=20, T=100,
                  init_rate=1.5, lmax=20.0, rng=rng):
    C = make_random_nonneg_matrix(n_motor, n_sensory, scale=1.0, rng=rng)
    W = make_random_nonneg_matrix(n_sensory, n_motor, scale=1.0, rng=rng)
    A = normalize_spectral_radius(C @ W, target_gain)

    m = rng.poisson(init_rate, size=(n_motor,))
    spikes = np.zeros((n_motor, T), dtype=int)
    totals = np.zeros(T, dtype=int)

    for t in range(T):
        spikes[:, t] = (m > 0).astype(int)
        totals[t] = spikes[:, t].sum()
        lam_next = np.clip(A @ m.astype(float), 0, lmax)
        m = rng.poisson(lam_next)

    return spikes, totals

# Simulate
spikes_stable,  totals_stable  = simulate_loop(target_gain=0.95, T=100)
spikes_unstable, totals_unstable = simulate_loop(target_gain=1.05, T=100)`
                        }
                        language="python"
                        // showLineNumbers={props.showLineNumbers}
                        theme={dracula}

                    />


                </div>
            </div>

            <p> 
            Usually, when you see papers in figures, they are static and laid in stone. They show you capital-R results. But here I could essentially take a paper from the year 2000 and "git pull" it to run the same experiments, because AI helped me come up with a code base where there was none. Here it was helping make science more accessible to me. Plus, I could even pass the Python code in and get a Javascript adaptation, to help me see the experiment interactively. It's these emergent properties of LLM's that I like to take advantage of the most (e.g. translation across modalities or coding languages). <br></br>
            
            
            
            </p>
            <p>
                (To be honest though I'm not as confident in the Javascript implementation, because Javascript doesn't natively support matrix multiplications the way Python libraries like numpy do, and the triple for loop in the code looks suspiciously inefficient but probably correct.)
            </p>


            <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", gap: "20px", width: "100%" }}>
                <div style={{ textAlign: "center" }}>
                    <h4>A: Stable System (Gain = 0.95)</h4>
                    <canvas style={{ outline: "solid 1px #bebebe" }} id="canvasStable" width="400" height="300"></canvas>
                </div>
                <div style={{ textAlign: "center" }}>
                    <h4>B: Unstable System (Gain = 1.05)</h4>
                    <canvas style={{ outline: "solid 1px #bebebe" }} id="canvasUnstable" width="400" height="300"></canvas>
                </div>
            </div>

            <p>

            </p>


            <div class="controls">
                <button  style={{color: "black", outline: "solid 1px black" }} id="startButton">Run Simulation</button>
            </div>
            
            <br></br>
            <h3>
                Use Case #2. AI Visualization Tools to Support Paper Understanding
            </h3>

            <p>Something my advisor has often advocated for is visualization tools to help see what is going on during experimentation. In the paper, the authors explained that there are certain neurophysiological settings which could lead to instable reactions and loop gain instability. They listed three: A) enlarged sensory representation, B) cross-coupling between different neuron populations, 3) co-activation of different neuron populations. Quite quickly, the paper describes how these conditions are implemented in <InlineMath> C </InlineMath> and <InlineMath> W </InlineMath>, how <InlineMath>C</InlineMath> is learned through a Hebbian update, and what assumptions they make about connections between sensory and motor neurons in the matrices. This is the stuff that I usually have to just take as a given to keep reading on in the paper. But I thought, what does <InlineMath> C  </InlineMath> look like?  To visualize this, I had GPT create a GIF showing the evolution of the matrix across different time steps of learning. Below are the evolutions of the <InlineMath>C</InlineMath> matrix across 200 steps of Hebbian updates for condition A and condition B. This was the learning phase, separate from the testing phase with motor neurons in the loop, and it was neat to think about the training / inference loop in the completely different setting. A real but minimal neural network, if you will.</p>


            <div style={{display: "flex"}}>
            <div style={{width: "50%"}}>
                <img src="./blogpost_images/computational_models/C_evolution_caseA_ratio0.20_groups_fixedloop.gif" />


            </div>
            <div style={{width: "50%"}}>
                <img src="/blogpost_images/computational_models/C_evolution_caseB_offdiag0.20_groupsloop.gif" />

            </div>
            </div>

            <p> Nonetheless, GPT-5 and Gemini still had difficulty convincing me that their implementation of other experiments (Figure 5 / Figure 6) were correct. Even though they could implement one experiment (Figure 3), that simulation was technically simple. It is conceptually challenging,but it is only a handful of lines. This is because the weight matrices <InlineMath> C </InlineMath> and <InlineMath>W </InlineMath> were essentially random and held fixed, while the loop gain was a value that was held fixed at either 0.95 or 1.05 and embedded in <InlineMath> C @ W </InlineMath> as the largest eigenvalue. The other experiments get more complex in the sensory-motor mappings, settings of the network (learn / train vs. test ), and I don't believe that GPT-5 and Gemini have reliably implemented them yet (e.g. Figure 5 and Figure 6). I will revisit this at another time.</p>

            <br>
            </br>
            
            <h3>
                Use Case #3. AI-Assisted Interrogation of the Math / Guided Derivation
            </h3>

            <p>
                (These headers are titled the way they are, in this AI-pilled way, because of the habits I picked up in paper writing these past few years. )

            </p>
            <img width="480px" src="./blogpost_images/computational_models/screenshot1.png"></img>
            <p>

                In the paper, there is a quick succession of math that seems to quickly grow laterally in terms of symbols and vertically in terms of derivations. There is a good amount of conceptual skip between the lines and the rationales borrow sometimes from  neuroscience and sometimes from linear algebra. Long story short it's hard to understand and once upon a time I needed a PhD student in math who was my TA to help me. (They were like, I don't understand the neuroscience, but I can help with the math.)
            </p>

            <p>
                In this paper the firing rate of a neuron is represented with a <a href="https://en.wikipedia.org/wiki/Poisson_distribution">Poisson</a> distribution. Okay, simple enough. They make assumptions that the expected rate of spike firing should be small so that <InlineMath>C</InlineMath> and <InlineMath>W</InlineMath> can be linearly approximated, and hence a matrix.
            </p>
                        <BlockMath math="\lambda_m(t + \Delta t) = CW\lambda_m(t)" />

        
            <p>   
                To represent the gain over a population of neurons, they take the L2 norm (<InlineMath>|| x||^2 = x^Tx</InlineMath>) of the right hand side above.

            </p>
            <p>
                But why is that a valid assumption?
            </p>
            <p>
                GPT-5 gave me a few different answers / interpretations (I paraphrased out some math). 

            </p>
            <p>
                  <ul >
                <li><em> "It’s a natural way to quantify the total activity of the neuron population in a way that works cleanly with the linear algebra and stability analysis they want to do."</em></li>
                <li><em>"It’s an “energy” measure. The L² norm comes from physics and signal processing. It is like “total power” or “energy” in the activity pattern. In population coding, squaring emphasizes large contributors, and summing squares handles positive and negative contributions symmetrically (not an issue here since rates are ≥ 0, but still mathematically consistent)."</em></li>
                <li><em> ... ratio becomes a Rayleigh quotient — which means stability is determined by the largest eigenvalue. This direct link between “population gain” and eigenvalues only works neatly with the L2 norm."</em></li>
            </ul>

            </p>

            <p>
                Okay, cool. So now I understood the connection they were making between neuron population activity (neuroscience) and a magnitude (linear algebra). 
            </p>

            <p> GPT-5 then helped me fill out a few more lines in between the equations provided in the paper, which I felt like were big conceptual skips. The lines below are additional steps GPT-5 helped me fill in. </p>
          
            <BlockMath math="\gamma = \frac{\|\lambda_m(t + \Delta t)\|^2}{\|\lambda_m(t)\|^2}" />
            <p>Substituting <InlineMath>\lambda_m(t + \Delta t) = CW\lambda_m(t)</InlineMath>, the numerator thus becomes:</p>
            {/* <BlockMath math="\gamma = \frac{\|CW\lambda_m(t)\|^2}{\|\lambda_m(t)\|^2}" /> */}

            <BlockMath math="\|CW\lambda_m(t)\|^2 =  \lambda^T_m(t) W^T C^T CW\lambda_m(t)" />

            <p>Hence</p>
            <BlockMath math="\gamma = \frac{ \lambda^T_m(t) W^T C^T CW\lambda_m(t) }{\lambda^T_m(t) \lambda_m(t) }" />


            <p>
                My improved understanding of the math made the code implementation make more sense to me as well. Doing more of this back and forth made me understand why there was an eigendecomposition, why in the code they were doing a np.max(np.abs(eigvals)), and what the theoretical basis was. I also learned new terms like spectral radius and Rayleigh quotient. Being supported in finding the right language to talk about a problem when you are in an area outside of your expertise is a result I have seen quite a few times from human-AI interaction. 
            </p>


            <h3>
                Use Case #4. Science through AI-Guided Extrapolation
            </h3>
            <p> I revisited this experiment because I was watching Andrej Karpathy's Zero-to-Hero series, and in the first video he shows how one can instantiate a neural network with just matrices. It was a nice reminder of how we can go back to the basics, and that made me think back to this paper. I thought that I could mess around with the matrix formulation of the network far better now that there are reasoning / thinking models (GPT-5, Gemini) and coding agents (Cline). And I was proven right in these small experiments.</p>
            <p>
                Anyways, people do want AI to help with science, and I think this exploration helped me see certain use cases more clearly.  There is definitely a nuance between agents driving the and AI augmentation, and in this case I choose to focus on augmentation (of my expertise). Instead of more passively taking in a result ("The simulations show that changes in the sensory representation can lead to instability in the sensory-motor loop"), I could see it, test it, and verify it. But I could also see agents doing a lot of experiments on their own -- evolving the linear setup to take in a MLP, trying directions offered up by the (de-differentiation of motor neurons rather than sensory ones), making the abstract model more concrete with actual settings (e.g. mapping more strongly to actual cortical areas or muscles etc.)  This experimentation has kind of been like git pulling, rolling back to an old git checkpoint, and making a new branch out in a new direction. Which is kind of what research sort of is, right? --  a monorepo of human knowledge.
            
            </p>
        <br></br>
        </>
    );
};

export default NeuralNetworkContent;
