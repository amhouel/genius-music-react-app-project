import React, { Component } from "react";
import "./style.css";

class GeniusLogin extends Component {
    render() {
        return (
            <div className="login pointer">
                {!this.props.loggedIn && (
                    <a className="login-link" href="https://api.genius.com/oauth/authorize?client_id=BoWcfLC6K5r8b-Hoe_oiAEvBPl3XE0TLvnjP14GlXk3yGRUoj_JIeGo3ERZzLski&redirect_uri=https://genius-music.herokuapp.com/&scope=me&response_type=token" >
                        Genius Login
                    </a>
                )}

                {this.props.loggedIn && (
                    <a className="login-link" onClick={this.props.logOut} >
                        Genius Logout
                    </a>
                )}
            </div>
        );
    }
}

export default GeniusLogin;