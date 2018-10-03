import React, { Component } from "react";
import Search from "../Search";
import SongList from "../SongList";
import "./style.css";

class SongDetails extends Component {

    constructor(props) {
        super(props)

        this.state = {
            loggedIn: true,
            accessToken: this.props.accessToken,
            currentPanel: "song details",
            artist: this.props.artist,
            songList: this.props.songList,
            songId: this.props.songId,
            songFullTitle: "",
            pageViews: "",
            songReleaseDate: "",
            songArt: "",
            songAlbum: "Sorry, we couldn't find the album",
            albumArt: require("./images/steve-harvey-697236-unsplash.jpg"),
            songMedia: [],
            songProducers: [],
            songWriters: [],
        }
    }

    componentDidMount = async () => {
        const songData = await fetch(`https://api.genius.com/songs/${this.state.songId}?text_format=html&access_token=${this.state.accessToken}`);
        const songDataJson = await songData.json();

        this.setState({
            albumArt: songDataJson.response.song.album? songDataJson.response.song.album.cover_art_url : this.state.albumArt,
            songAlbum: songDataJson.response.song.album? songDataJson.response.song.album.name : this.state.songAlbum,
            songArt: songDataJson.response.song.song_art_image_thumbnail_url,
            songReleasedDate: new Date(songDataJson.response.song.release_date).getFullYear(),
            songFullTitle: songDataJson.response.song.title_with_featured,
            songMedia: songDataJson.response.song.media,
            pageViews: songDataJson.response.song.pageviews,
            songProducers: songDataJson.response.song.producer_artists,
            songWriters: songDataJson.response.song.writer_artists,
        }, () => {
            this.addMediumLogo();
        });

    }

    addMediumLogo = () => {
        let songMediaArr = [...this.state.songMedia]
        let songMediaWithLogo = [];
        for (let i = 0; i < songMediaArr.length; i++) {
            let mediumObject = songMediaArr[i];
            if (mediumObject.provider === "youtube") {
                mediumObject.logoSrc = require("./images/yt_icon_rgb.jpg");
            }
            else if (mediumObject.provider === "apple_music" || mediumObject.provider === "apple_music_preview") {
                mediumObject.logoSrc = require("./images/Apple_Music_Icon.jpg");
            }
            else if (mediumObject.provider === "spotify") {
                mediumObject.logoSrc = require("./images/Spotify_Icon_RGB_Green.jpg");
            }
            else if (mediumObject.provider === "soundcloud") {
                mediumObject.logoSrc = require("./images/Soundcloud-logo.jpg");
            } else {
                mediumObject.logoSrc = require("./images/Play-icon.jpg");
            }
            songMediaWithLogo.push(mediumObject);
        }
        this.setState({
            songMedia: songMediaWithLogo,
        })
    }

    handleBackClick = () => {
        this.props.displaySearchPanel();
    }

    render() {
        return (
            <div>
                {this.state.currentPanel === "song details" && (
                    <div className="song-details-wrapper">
                        <div className="song-title-art">
                            <div className="song-art-wrapper">
                                <img className="song-art" src={this.state.songArt} alt="song art" />
                            </div>
                            <h1 className="full-title">{this.state.songFullTitle} by {this.state.artist}</h1>
                        </div>
                        <p className="release-year">({this.state.songReleasedDate})</p>
                        <div className="album-image-wrapper">
                            <h2 className="album-title">From Album <span className="album-title-italic">{this.state.songAlbum}</span></h2>
                            <img src={this.state.albumArt} alt="Album Art" />
                        </div>
                        <div className="song-producer-wrapper">
                            <h2 className="producer-writer-title">Producers:</h2>
                            <div className="song-producer-list">
                                {this.state.songProducers.map(producer => {
                                    return (
                                        <div key={producer.name} className="producer-name-image">
                                            <h3 className="producer-name">{producer.name}</h3>
                                            <img className="producer-image" src={producer.header_image_url} alt="producer" />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="song-writer-wrapper">
                            <h2 className="producer-writer-title">Writers:</h2>
                            <div className="song-writer-list">
                                {this.state.songWriters.map(writer => {
                                    return (
                                        <div key={writer.name} className="writer-name-image">
                                            <h3 className="writer-name">{writer.name}</h3>
                                            <img className="writer-image" src={writer.header_image_url} alt="writer" />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="media-wrapper">
                            <h3 className="media-title">Listen here  <i className="fas fa-play"></i></h3>
                            <div className="media-logo-wrapper">
                                {this.state.songMedia.map(medium => {
                                    return (
                                        <a className="medium-logo" key={medium.provider} href={medium.url} target="/blank">{medium.provider.replace(/_/g, " ")} <img className="logo-img" src={medium.logoSrc} alt="provider logo" /></a>
                                    );
                                })}
                            </div>
                        </div>
                        <button className="back-button pointer" onClick={this.handleBackClick}>Back</button>
                    </div>
                )}

                {this.state.currentPanel === "search" && this.state.loggedIn === true && (
                    <div>
                        <Search inputValue={this.props.inputValue} updateInputValue={this.props.updateInputValue} getArtistSongs={this.props.getArtistSongs} />
                        <h1 className="artist-name">{this.props.artist}</h1>
                        <SongList
                            artist={this.props.artist}
                            songList={this.props.songList}
                            displaySongDetails={this.props.displaySongDetails}
                        />
                    </div>
                )}
            </div>
        )
    }
}

export default SongDetails;