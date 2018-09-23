import React, { Component } from "react";
import "./style.css";

class Song extends Component {

    handleSongClick = (event) => {
        this.props.displaySongDetails(event.target.value);
    }

    render() {
        return (
            <div className="song-wrapper">
                <li className="song-item pointer" value={this.props.songId} onClick={this.handleSongClick}>{this.props.songName}</li>
                <p className="views">views: {this.props.pageViews}</p>
                <div className="song-image-wrapper">
                    <img className="song-image" src={this.props.songArt} alt="Song Art" />
                </div>
            </div>
        )
    }
}

export default Song;