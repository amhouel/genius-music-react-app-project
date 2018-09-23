import React, { Component } from "react";
import queryString from 'qs';
import GeniusLogin from "../GeniusLogin";
import LandingPage from "../LandingPage";
import Search from "../Search";
import SongList from "../SongList";
import SongDetails from "../SongDetails";
import "./style.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      accessToken: null,
      currentPanel: "search",
      artist: "",
      songList: [],
      songId: "",
    };
  }

  componentDidMount = async () => {
    const parsed = queryString.parse(window.location.hash);
    if (parsed['#access_token']) {
      this.setState({
        accessToken: parsed['#access_token'],
        loggedIn: true,
      }, () => {
        this.getData();
      })
    }
  }

  getData = async () => {
    const songList = await fetch(`https://api.genius.com/search?q=${this.state.artist}&access_token=${this.state.accessToken}`);
    const songListJson = await songList.json();
    this.setState({
      songList: songListJson.response.hits,
    });
  }

  logOut = event => {
    event.preventDefault();
    window.location.hash = '';
    this.setState({
      loggedIn: false,
      accessToken: null,
      currentPanel: "search",
      inputValue: "",
      artist: "",
      songList: [],
      songId: "",
    });
  };

  updateInputValue = (value) => {
    this.setState({
      inputValue: value,
    });
  }

  getArtistSongs = artist => {
    this.setState({
      artist: artist,
    }, () => {
      this.getData();
    });
  }

  displaySongDetails = songId => {
    this.setState({
      songId: songId,
      currentPanel: "song details",
    });
  }

  displaySearchPanel = () => {
    this.setState({
      currentPanel: "search",
      songId: "",
    });
  }

  render() {
    return (
      <div className="app-wrapper">
        <div className="title-login">
          <h1 className="title"><i className="fas fa-music"></i> Genius Music <i className="fas fa-music"></i></h1>
          <GeniusLogin loggedIn={this.state.loggedIn} logOut={this.logOut} />
        </div>
        {this.state.loggedIn === false && (
          <LandingPage />
        )}

        {this.state.currentPanel === 'search' && this.state.loggedIn === true && (
          <div>
            <Search
              inputValue={this.state.inputValue}
              updateInputValue={this.updateInputValue}
              getArtistSongs={this.getArtistSongs}
            />
            <h1 className="artist-name">{this.state.artist}</h1>
            <SongList
              artist={this.state.artist}
              songList={this.state.songList}
              displaySongDetails={this.displaySongDetails}
            />
          </div>
        )}

        {this.state.currentPanel === 'song details' && (
          <SongDetails
            songId={this.state.songId}
            artist={this.state.artist}
            accessToken={this.state.accessToken}
            songList={this.state.songList}
            displaySongDetails={this.displaySongDetails}
            inputValue={this.state.inputValue}
            updateInputValue={this.updateInputValue}
            getArtistSongs={this.getArtistSongs}
            displaySearchPanel={this.displaySearchPanel}
          />
        )}
      </div>
    );
  }
}

export default App;
