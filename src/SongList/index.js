import React, { Component } from "react";
import Song from "../Song";
import ThreeMostViewed from "../ThreeMostViewed"
import "./style.css";

class SongList extends Component {

    render() {
        return (
            <div>
                <ThreeMostViewed songList={this.props.songList} />
                <ul>
                    <div className="song-list-wrapper">
                        {this.props.songList.map(song => {
                            return (
                                <Song
                                    key={song.result.id}
                                    songName={song.result.title}
                                    songId={song.result.id}
                                    songArt={song.result.song_art_image_thumbnail_url}
                                    pageViews={song.result.stats.pageviews}
                                    displaySongDetails={this.props.displaySongDetails}
                                />
                            );
                        })}
                    </div>
                </ul>
            </div>
        );
    }
}

export default SongList;