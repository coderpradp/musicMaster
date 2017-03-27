import React, { Component } from 'react';
import './App.css';

class Gallery extends Component {
  playAudio(previewUrl) {
    let audio =  new Audio(previewUrl);
    audio.play();
  }

  render() {
    const { tracks } = this.props;
    return (
      <div>
        {
          tracks.map((track, k) => {
            const trackImg = track.album.images[0].url;
            return (
              <div key={k} className="track">
                <img
                  src={trackImg}
                  className="track-img"
                  alt="track"
                  onClick={() => this.playAudio(track.preview_url)}
                />
                <p className="track-text">
                  {track.name}
                </p>
              </div>
            )
          })}
      </div>
    )
  }
}

export default Gallery;
