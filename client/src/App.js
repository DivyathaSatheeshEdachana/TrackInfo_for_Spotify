import React, { Component } from 'react';
import './App.css';
import Spotify from 'spotify-web-api-js';

const spotifyApi = new Spotify();

function func(){
   window.location.href = this.state.TopTracks.preview_url;
}

class App extends Component {
  constructor(){
    super();
    const params = this.getHashParams();
    this.state = {
      loggedIn: params.access_token ? true : false,
      CurrentPlay: {
        name: 'xxx',
        preview_url: '',
        id: '',
        artist: 'xxx',
        artistid: '',
        currenttype: '',
        device: 'your device',
        image: ''
      },
      ArtistRelatedArtists: {
        artistname1: '',
        artist1image: '',
        artistname2: '',
        artist2image: '',
        artistname3: '',
        artist2image: '',
        artistname4: '',
        artist3image: '',
        artistname5: '',
        artist4image: '',
      },
      TopTracks: {
        trackname1: 'No track found',
        trackname2: 'No track found'
      },
      MyTopTracks: {
        mytrackname1: 'No track found',
        mytrackname2: 'No track found',
        previmage1: '',
        previmage2: ''
      }
    }
    if(params.access_token)
      spotifyApi.setAccessToken(params.access_token)
  }

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    return hashParams;
  }

  getCurrentPlay(){
    spotifyApi.getMyCurrentPlaybackState()
      .then((response) => {
        this.setState({
          CurrentPlay: {
              name: response.item.name,
              preview_url: response.item.preview_url,
              id: response.item.id,
              artist: response.item.album.artists[0].name,
              artistid: response.item.album.artists[0].id,
              currenttype: response.currently_playing_type,
              device: response.device.name,
              image: response.item.album.images[1].url
          }
        });
      })
  }

  getArtistRelatedArtists(){
    spotifyApi.getArtistRelatedArtists(this.state.CurrentPlay.artistid)
      .then((response) => {
        this.setState({
          ArtistRelatedArtists: {
              artistname1: response.artists[0].name,
              artist1image: response.artists[0].images[1].url,
              artistname2: response.artists[1].name,
              artist2image: response.artists[1].images[1].url,
              artistname3: response.artists[2].name,
              artist3image: response.artists[2].images[1].url,
              artistname4: response.artists[3].name,
              artist4image: response.artists[3].images[1].url,
              artistname5: response.artists[4].name,
              artist5image: response.artists[4].images[1].url
          }
        });
      })
  }

  getMyTopTracks(){
    spotifyApi.getMyTopTracks()
      .then((response) => {
        this.setState({
          MyTopTracks: {
              mytrackname1: response.body.Tracks[0].name,
              mytrackname2: response.Tracks[1].name
          }
        });
      })
  }

  getArtistTopTracks(){
    spotifyApi.getArtistTopTracks(this.state.CurrentPlay.artistid, "IN")
      .then((response) => {
        this.setState({
          TopTracks: {
              trackname1: response.tracks[0].name,
              preview_url1: response.tracks[0].preview_url,
              previmage1: response.tracks[0].album.images[0].url,
              trackname2: response.tracks[1].name,
              preview_url2: response.tracks[1].preview_url,
              previmage2: response.tracks[1].album.images[0].url,
          }
        });
      })
  }

  render() {
    return (
      <div className="App">
        <a href='http://localhost:8888'>
          <button>Login with Spotify</button>
        </a>
        <div className="nowplay">
          <div>You are listening to { this.state.CurrentPlay.name } on { this.state.CurrentPlay.device } </div>
          <div>sung by { this.state.CurrentPlay.artist } </div>
          <div>
            <img src={this.state.CurrentPlay.image} style={{ height: 150 }}/>
          </div>
          <button onClick={() => this.getCurrentPlay()}>
            Current Song
          </button>
        </div>
        <div className="artistplay">
          <button onClick={() => this.getArtistRelatedArtists()}>
            Related Artists
          </button>
          <div>{ this.state.ArtistRelatedArtists.artistname1 } </div>
          <div>
            <img src={this.state.ArtistRelatedArtists.artist1image} style={{ height: 150 }}/>
          </div>
          <div>{ this.state.ArtistRelatedArtists.artistname2 } </div>
          <div>
            <img src={this.state.ArtistRelatedArtists.artist2image} style={{ height: 150 }}/>
          </div>
          <div>{ this.state.ArtistRelatedArtists.artistname3 } </div>
          <div>
            <img src={this.state.ArtistRelatedArtists.artist3image} style={{ height: 150 }}/>
          </div>
          <div>{ this.state.ArtistRelatedArtists.artistname4 } </div>
          <div>
            <img src={this.state.ArtistRelatedArtists.artist4image} style={{ height: 150 }}/>
          </div>
          <div>{ this.state.ArtistRelatedArtists.artistname5 } </div>
          <div>
            <img src={this.state.ArtistRelatedArtists.artist5image} style={{ height: 150 }}/>
          </div>
          <div className="TopTracks">
            <button onClick={() => this.getArtistTopTracks()}>
              { this.state.CurrentPlay.artist }'s Top Tracks
            </button>
            <a href= {this.state.TopTracks.preview_url1}><button><div>{ this.state.TopTracks.trackname1 }</div><img src={this.state.TopTracks.previmage1} style={{ height: 100 }}/></button></a>
            <a href= {this.state.TopTracks.preview_url2}><button><div>{ this.state.TopTracks.trackname2 }</div><img src={this.state.TopTracks.previmage2} style={{ height: 100 }}/></button></a>
          </div>
          <div className="MyTopTracks">
            <div> { this.state.MyTopTracks.mytrackname1 } </div>
            <div> { this.state.MyTopTracks.mytrackname2 } </div>
            <button onClick={() => this.getMyTopTracks()}>
              My Top Tracks
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
