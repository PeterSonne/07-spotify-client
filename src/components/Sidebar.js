import React from "react";
import { Link } from "react-router-dom";

import "../styles/sidebar.css";

import Paywall from "./Paywall";
import Player from "./Player";

class Sidebar extends React.Component {
  state = {
    paywallOpen: false,
    activeSong: {}
  };
  getTab = link => {
    if (this.props.page === link) {
      return "active";
    } else {
      return "";
    }
  };
  openPayWall = () => {
    this.setState({
      paywallOpen: true
    });
  };
  closePaywall = () => {
    this.setState({
      paywallOpen: false
    });
  };
  stopSong = () => {
    if (this.props.onStopSong) {
      this.props.onStopSong();
    }
  };
  playSong = () => {
    if (this.props.onStopSong) {
      this.props.onPlaySong();
    }
  };
  componentWillReceiveProps(newProps) {
    if (newProps.song) {
      this.setState({ activeSong: newProps.song });
    }
  }
  render() {
    return (
      <>
        <div id="sidebar">
          <h1>Spotify</h1>
          <ul>
            <li>
              <Link to="/" className={this.getTab("songs")}>
                <i className="fas fa-fw fa-headphones-alt"></i>
                <span>Songs</span>
              </Link>
            </li>
            <li>
              <Link to="/albums" className={this.getTab("albums")}>
                <i className="fas fa-fw fa-record-vinyl"></i>
                <span>Albums</span>
              </Link>
            </li>
            <li>
              <a href="/artists" className={this.getTab("artists")}>
                <i className="fas fa-fw fa-users"></i>
                <span>Artists</span>
              </a>
            </li>
            <li>
              <a href="/genres" className={this.getTab("genres")}>
                <i className="fas fa-fw fa-guitar"></i>
                <span>Genres</span>
              </a>
            </li>
          </ul>
          <Paywall
            paywallOpen={this.state.paywallOpen}
            closePaywall={this.closePaywall}
          />
          <div id="upgrade">
            <h3>Get Premium</h3>
            <p>Play unlimited music with no ads.</p>
            <button onClick={this.openPayWall}>
              <span>Upgrade Now</span>
              <i className="fas fa-fw fa-arrow-up"></i>
            </button>
          </div>
          <Player
            song={this.state.activeSong}
            onStop={this.stopSong}
            onPlay={this.playSong}
          />
        </div>
      </>
    );
  }
}

export default Sidebar;
