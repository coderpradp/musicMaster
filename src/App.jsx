import React, { Component } from 'react';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import axios from 'axios';
import Profile from './Profile';
import Gallery from './Gallery';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      artist: null,
      tracks: []
    }
  }

  search() {
    const BASE_URL = 'https://api.spotify.com/v1/search?';
    let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
    const ALBUM_URL = 'https://api.spotify.com/v1/artists/';
    const tokenType = "Bearer ";
    const accessToken = 'BQBJ_2zXZbNBBafo1eEk8JoxCoXGO-JWAMJ7TvUE6B9tbd5C7MsrB-cBFtmHunjgT2eqThkB2AAEdhTxmCLccV09l6zvOuAqISJHoBfME-rZj7E9XDXv2EWcuubJzdYATZevBstfuu0nJQ5OrTm11nJ_aTFBK7Qr';

    /* Fetching artist data */
    axios.get(FETCH_URL, {
      headers: {
        Authorization: tokenType+accessToken
      }
    })
    .then(response => response.data)
    .then(response => {
      const artist = response.artists.items[0];
      this.setState({artist});

      FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US&`;

      /* Fetching artist's top tracks */
      axios.get(FETCH_URL, {
        headers: {
          Authorization: tokenType+accessToken
        }
      })
      .then(response => response.data)
      .then(response => {
        const { tracks } = response;
        this.setState({tracks});
      })
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-title">Music Master</div>
        <FormGroup>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Search for an Artist"
              value={this.state.query}
              onChange={event => {this.setState({query: event.target.value})}}
              onKeyPress={event => {
                if(event.key === 'Enter') {
                  this.search();
                }
              }}
            />
            <InputGroup.Addon  className="Search-btn" onClick={() => this.search()}>
              <Glyphicon glyph="search"></Glyphicon>
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        {
          this.state.artist !== null
          ? <div>
              <Profile
                artist={this.state.artist}
              />
              <Gallery
                tracks={this.state.tracks}
              />
            </div>
          : <div></div>
        }
      </div>
    )
  }
}

export default App;
