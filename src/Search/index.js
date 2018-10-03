import React, { Component } from "react";
import "./style.css";

class Search extends Component {

    handleChange = (event) => {
        event.preventDefault();
        this.props.updateInputValue(event.target.value);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.getArtistSongs(this.props.inputValue);
    }

    render() {
        return (
            <div className="song-search">
                <form onSubmit={this.handleSubmit}>
                    <label className="search-label">
                        Search Songs by Artist Name:<br/>
                        <input className="artist-input" type="text" value={this.value} placeholder="Type artist name here" onChange={this.handleChange}></input>
                    </label>
                    <button className="search-button pointer" type="submit">Search</button>
                </form>
            </div>
        )
    }
}

export default Search;