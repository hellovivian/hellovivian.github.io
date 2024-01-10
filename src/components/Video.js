import React, { Component } from 'react'
import ReactPlayer from 'react-player'

const Video = (props) => {
    return (
        <div className='videoCard player-wrapper'>
            <ReactPlayer
            className='react-player fixed-bottom'
            url= {props.url}
            controls = {true}


            />

            <h3 className='songName'>
            {props.song}
            </h3>
            <p className='artistName'>
            <strong> 
                {props.artist}
            </strong>
            </p>
        </div>
    );
};

export default Video;