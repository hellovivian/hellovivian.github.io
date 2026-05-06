import React from 'react';

function UserInterfaceDustBunniesContent() {

    const cropContainerStyle = {
    overflow: 'hidden',

    display: 'inline-block',
  };

  const imageStyle = {
    // marginLeft: '-76px',
    // marginRight: '-40px',
    display: 'block',
  };

  return (
    <div>

      <div style={cropContainerStyle}>
        <img src="./images/chairs.gif"  alt="chairs gif" />


 </div>
      <p>From 2021. Latent space exploration and sensemaking over 3D shapes (wow that felt special back then). <br></br>UMAP, <a href="https://sbert.net/examples/sentence_transformer/applications/semantic-search/README.html"> semantic search </a> from SentenceTransformer embeddings etc.</p> 
      <p>And yes UMAP is prone to visualizing spurious correlations [<a href="https://db7894.github.io/misleading-embeddings/">1</a>, <a href="https://pair-code.github.io/understanding-umap/">2</a>]. It still made for a nice 2D minimap, and its clustering was tracked pretty well with the keywords.</p>
      <p></p>

    </div>
  );
}

export default UserInterfaceDustBunniesContent;
