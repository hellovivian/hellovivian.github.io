import React from 'react';
import { CopyBlock, dracula } from "react-code-blocks";
import AliceCarousel from 'react-alice-carousel';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import 'react-alice-carousel/lib/alice-carousel.css';

const code = `import numpy as np
import matplotlib.pyplot as plt

# Function to normalize matrices to a desired total gain
def normalize_matrix(matrix, desired_gain):
    current_gain = np.sum(np.abs(matrix))
    normalized_matrix = matrix * (desired_gain / current_gain)
    return normalized_matrix

# Parameters
m1, m2 = 10, 10  # Number of motor neurons for two different muscles
learning_rate = 0.01
n_max = 1.0
n_min = 0.1  # Ensure n_min is never zero
num_learning_steps = 200
num_time_steps = 200
num_trials = 10
ratios = np.linspace(0.2, 2.0, 10)  # Ratios of s1/s2 to test

# Gain values for the simulations
gains = [0.95, 1.05]

def simulate_neural_activity(C, W, num_neurons=100, num_time_steps=200, loop_gain=1.0, lambda_max=20):
    # Normalize C and W to the desired total gain
    C = normalize_matrix(C, loop_gain)
    W = normalize_matrix(W, loop_gain)

    # Initialize neural activity matrix
    neural_activity = np.zeros((num_neurons, num_time_steps))
    active_neurons = np.zeros(num_time_steps)
    
    # Initial random motor command (spike counts)
    neural_activity[:, 0] = np.random.poisson(lambda_max / 2, num_neurons)
    
    for t in range(1, num_time_steps):
        # Update sensory activation
        s = np.dot(W, neural_activity[:, t-1])
        # Update motor activation based on Poisson statistics with rates given by CWm(t)
        rates = np.dot(C, s)
        rates = np.clip(rates, 0, lambda_max)  # Ensure rates are non-negative and do not exceed lambda_max
        neural_activity[:, t] = np.random.poisson(rates)
        active_neurons[t] = np.sum(neural_activity[:, t] > 0)
    
    return neural_activity, active_neurons

# Simulation for each ratio
Td_values_for_ratios = []
C_norm_changes = []
loop_gains = []

for ratio in ratios:
    s1 = int(20 * ratio / (1 + ratio))
    s2 = 20 - s1

    # Initialize random block-diagonal matrix W
    W = np.block([
        [np.random.uniform(0, 0.1, size=(s1, m1)), np.zeros((s1, m2))],
        [np.zeros((s2, m1)), np.random.uniform(0, 0.1, size=(s2, m2))]
    ])

    # Initialize random mapping C
    C = np.random.randn(m1 + m2, s1 + s2)

    # Hebbian learning rule
    def hebbian_update(C, m, s, learning_rate):
        return C + learning_rate * np.outer(m, s)

    # Track changes in C norm during learning
    C_norm_diff = []

    # Training phase
    for step in range(num_learning_steps):
        m = np.random.randn(m1 + m2)  # Random motor cortical activation
        s = np.random.randn(s1 + s2)  # Random sensory cortical activation
        C_new = hebbian_update(C, m, s, learning_rate)
        C_norm_diff.append(np.linalg.norm(C_new - C))
        C = C_new

    # Store the C_norm_diff for this ratio
    C_norm_changes.append(C_norm_diff)

    # Clip values of C to impose thresholds
    C = np.clip(C, n_min, n_max)

    # Testing phase
    Td_values = []

    for _ in range(num_trials):
        # Initial motor activation
        m = np.random.randn(m1 + m2)
        s = np.zeros(s1 + s2)

        for t in range(num_time_steps):
            # Update sensory activation
            s = np.dot(W, m)  # Ensure correct dimensions for W and m
            # Update motor activation
            m = np.dot(C, s)

            # Check for spontaneous neural activity stop
            if np.allclose(m, 0) and np.allclose(s, 0):
                break

        # Measure Td: time required for spontaneous neural activity to stop
        Td = t if np.allclose(m, 0) and np.allclose(s, 0) else num_time_steps
        Td_values.append(Td)

    # Average Td for this ratio
    Td_average = np.mean(Td_values)
    Td_values_for_ratios.append(Td_average)

# Plotting Td values for different ratios
plt.figure(figsize=(10, 6))
plt.plot(ratios, Td_values_for_ratios, marker='o', linestyle='-', color='b')
plt.xlabel('Ratio s1/s2')
plt.ylabel('Td (Time steps)')
plt.title('Time required for spontaneous neural activity to stop (Td) across different s1/s2 ratios')
plt.grid(True)
plt.show()

# Plotting changes in C norm during learning for different ratios
plt.figure(figsize=(10, 6))
for i, ratio in enumerate(ratios):
    plt.plot(C_norm_changes[i], label=f'Ratio {ratio:.1f}')
plt.xlabel('Learning Step')
plt.ylabel('Norm of Change in C')
plt.title('Changes in Sensorimotor Mapping (C) During Learning')
plt.legend()
plt.grid(True)
plt.show()

# Simulation for each gain value
for gain in gains:
    neural_activity, active_neurons = simulate_neural_activity(C, W, num_neurons=m1 + m2, num_time_steps=num_time_steps, loop_gain=gain)

    # Plotting
    fig, axs = plt.subplots(2, 1, figsize=(15, 10))

    # Raster plot
    axs[0].imshow(neural_activity, aspect='auto', cmap='Greys', interpolation='none')
    axs[0].set_title(f'Neural Activity (gain = {gain})')
    axs[0].set_xlabel('Time step')
    axs[0].set_ylabel('Neuron index')

    # Total active neurons
    axs[1].plot(active_neurons)
    axs[1].set_title(f'Total Active Neurons (gain = {gain})')
    axs[1].set_xlabel('Time step')
    axs[1].set_ylabel('Number of active neurons')

    plt.tight_layout()
    plt.show()
`;

const items2 = [
    <div className="item" data-value="0">

        <img width="784px" src="./blogpost_images/computational_models/gain1.png"></img>

    </div>,
    <div className="item" data-value="1">

        <img width="784px" src="./blogpost_images/computational_models/gain2.png"></img>

    </div>,
    <div className="item" data-value="2">

        <img width="784px" src="./blogpost_images/computational_models/gain3.png"></img>



    </div>,

    ,


];

const code_outputs = [
    <div className="item" data-value="0">

        <img width="784px" src="./blogpost_images/computational_models/figure1.png"></img>

    </div>,
    <div className="item" data-value="1">

        <img width="784px" src="./blogpost_images/computational_models/figure2.png"></img>

    </div>,
    <div className="item" data-value="2">

        <img width="784px" src="./blogpost_images/computational_models/figure3.png"></img>



    </div>,

    ,


];

const Carousel2 = () => (


    <AliceCarousel

        mouseTracking
        items={items2}

        controlsStrategy="alternate"
    />
);

const FiguresFromCode = () => (


    <AliceCarousel

        mouseTracking
        items={code_outputs}

        controlsStrategy="alternate"
    />
);

const ComputationalModelsContent = (props) => {
    return (
        <>
            <img src="./blogpost_images/computational_models/teaser.gif" width="480" height="480" />
            <a href="https://media2.giphy.com/media/5dYqPVcoq9mKuxleyR/200w.gif?cid=6c09b952f8f607ppa5nvos1pww9bbzswakr03af12aaw9eyx&ep=v1_gifs_search&rid=200w.gif&ct=g" ><br></br> Image Credit </a>

            <p>
                While at Berkeley for undergrad, I double majored in computer science and cognitive science. One summer, while I was conducting independent research and taking a linear algebra course, I came across <a href="https://pubmed.ncbi.nlm.nih.gov/11067988/"> a cognitive neuroscience paper by Terence Sanger and Michael Merzenich  </a> (from 2000!) about neuroplasticity that really inspired me. It was a paper that computationally modeled a sensorimotor loop. Using a control theory framework and matrix formulation of transformations, it represented the way sensations come through our perception as initial signals, pass through our cognitive mappings, and then transform into motor movement. Specifically, it was trying to illustrate how different edge case scenarios could create abnormal behavior-- maladaptive neuroplasticity. An example of this: if muscles were used in conjunction too often (e.g. overuse of hand leading to writer's cramp), the cognitive maps bound to those muscles could become wired together. This maladaptive neuroplasticity could lead to abnormal and antagonistic muscle activity.
            </p>

            <p>
                Many of the specific mechanics of the paper were out of my technical depth, and I remember approaching my linear algebra TA to help me connect the proofs within the paper to decompositions we were learning about in class. Understanding the paper was actually really fun on an intellectual level.

            </p>




            <p>
                It has been on my bucket list for a long time to read the paper again, and ever since GPT has become multimodal (e.g. capable of taking in visual inputs like images and screenshots), I have been meaning to experiment if I could use it as an aid for deeper understanding. I was not able to get to this for a few months, because of paper deadlines, the necessary refractory period after paper deadlines, and a combination of current and personal events, but finally, on Friday night of a week I decided to be a staycation, I read it again with the help of ChatGPT-4o. I sent in equations and paragraphs from the paper in screenshots, giving the paper to GPT in piecemeal.
            </p>


            <br></br>
            <br></br>
            <p> <strong>Screenshot Inputs </strong>

            </p>


            <Grid container className="grid_gallery" rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={4}>
                    <img class="grid_pic" src="./blogpost_images/computational_models/screenshot0.png"></img>


                </Grid>
                <Grid item xs={4}>
                    <img class="grid_pic" src="./blogpost_images/computational_models/screenshot1.png"></img>

                </Grid>
                <Grid item xs={4}>

                    <img class="grid_pic" src="./blogpost_images/computational_models/screenshot2.png"></img>

                </Grid>
                <Grid item xs={4}>
                    <img class="grid_pic" src="./blogpost_images/computational_models/screenshot3.png"></img>


                </Grid>
                <Grid item xs={4}>
                    <img class="grid_pic" src="./blogpost_images/computational_models/screenshot4.png"></img>


                </Grid>



            </Grid>

            <br></br>
            <br></br>
            <p>
                 {/* To get through them, you usually need some amount of stamina and openness. You have to have enough mental bandwidth to understand a paper's framing and the work that it sits upon. That combination of stamina and openness is the momentum I have built over the years to get me through a paper. Plus, you have to weigh how you feel about the paper's conjectures and how aligned you are with the way the problem is formalized. */}
                The first plus of using GPT as I read was that I could ask "dumb" questions. Papers generally are long and dense--they are not light reading. As I was making progress through this one, because this was a recreational but challenging read that I was intentionally exploring with GPT, I did not feel the need to keep up any kind of momentum and hence took as many intellectual detours as I needed. For example, this paper is for expert computational neuroscientists. It assumes that I understand what "gain" through a sensorimotor loop means--I don't. So I asked GPT, after rounds of conversation with context from the paper, "What is gain here?". I got back a definition that was tailored to the cognitive neuroscience x control theory background of the paper.

            </p>


            <br></br>

            <br></br>
            <br></br>
            <p> <strong>ChatGPT Responses </strong>

            </p>
            <div className="grid_gallery">
                <Carousel2 />
            </div>

            <br></br>
            <br></br>

            {/* <div className="excerpt">
<p>
    <strong>Gain in Control Systems:</strong> In control theory, gain represents the ratio of the output signal to the input signal. A higher gain means that a small input signal will produce a larger output signal, indicating a more sensitive or responsive system. Conversely, a lower gain indicates a less responsive system.

    </p>

    <br></br>
    <p>
    <strong>Biological Interpretation: </strong>In the context of the sensorimotor loop, gain can be thought of as the sensitivity of the motor system to sensory inputs. Higher gain means the motor system reacts more strongly to sensory inputs, while lower gain means the system is less sensitive to those inputs.


    </p>

</div> */}


            <br></br>


            <p>
                It even took it back to Equation 6! It's that dexterity of moving between different domains that I found so helpful for understanding this interdisciplinary paper. It makes me recall a detail from when my linear algebra TA had been helping me understand the paper. He was wrapping up his math PhD at Berkeley and was going to join a hedge fund. He said that he could only speak to the math underpinnings and not to any of the neuroscience parts of the paper, which was a standard and proper disclaimer. As people and particularly as PhD students, we are trained to find a scholarly vertical. What is nice about GPT is that a) we can ask dumb questions without expense to our ego (which you can't even do in a reading seminar group with all your peers) and b) we can unpack the paper language into language that is more familiar to us. I could work through concepts of the paper, study them in their different facets, and not have to just take them at face value as abstractions or building blocks.

            </p>

            <p>
                Another thing I noticed about this paper was its structure. It justified its idea conceptually (through neuroscience), mathematically (through linear algebra derivations), and then empirically (through simulations). I think this structure was more apparent because I had an outsider's looking in perspective and because papers from 20 years ago were shorter. Now as I reflect on the paper as a PhD student rather than an undergraduate, I not only get why all these components appear, but also see this structure as something I hope my papers can achieve in the future.

            </p>

            <p>
                Lastly, I asked for code implementations of the simulations in the paper. In undergrad, I had wanted to code up the stuff up myself, but I knew that that the effort would undoubtedly become sunk costs. The paper is about an inspiring but outdated cognitive model. By my time in undergrad, there was already an entirely new brand of neural networks. Additionally, their linear matrix formulation was something that I only had loose reins on. I would never be able to confidently check my implementation.

            </p>

            <p>
                Fast forward to 2024. I asked GPT for an implementation of the simulations and it began to go brrr. 
            </p>


            <br></br>
            <br></br>
            <p><strong>Figures from Code GPT-4o Produced</strong></p>
            <div className="grid_gallery">
                <FiguresFromCode />
            </div>

            <br></br>
            <br></br>

            <p>
                Within a conversation turn or two, I had multiple graphs attempting to replicate different figures and results. Of course, it's not magic. These graphs don't tell a story or show any sense of learning and change. Even though I had gotten to a starting point efficiently, after one or two hours of tinkering with the prompts and code, I still was not able to replicate any results. That being said, I was definitely engaging deeper with the figures and the framework because of my efforts.

            </p>

            <p>
                For the past year, on Twitter people have been showing off the mental gymnastics GPT can get up to and the tasks it can achieve (LaTex! Animation! Taxes!). It does not faze anyone really what GPT can do now, and it is no secret that it is always the human in the loop that orchestrating some of the most complex achievements (e.g. reading a research paper). But I think what was valuable about going down this rabbit hole was that I learned, using subject material that was oddly personal to me, how to use GPT to cross technical chasms and how to appreciate papers at a meta-level, both in their structure and their ability to inspire.

            </p>

            <h3>Bibliography</h3>

            <a href="https://pubmed.ncbi.nlm.nih.gov/11067988/"><p>
                Computational model of the role of sensory disorganization in focal task-specific dystonia - T.D. Sanger, M. M. Merzenich in J. Neurophysiology
            </p></a>

            {/* <h3>Appendix</h3> */}
            {/* <p><strong>Code GPT-4o Produced</strong></p> */}

            {/* <hr></hr> */}
            {/* <div className="codeblock" >
                <CopyBlock
                    text={code}
                    language="python"
                    showLineNumbers={props.showLineNumbers}
                    theme={dracula}

                />

            </div> */}
        </>
    );
};

export default ComputationalModelsContent;
