import React from "react";
import axios from "axios";

import "../styles/songs.css";

import Sidebar from "../components/Sidebar";
import Song from "../components/Song";

class Songs extends React.Component {
  state = {
    songs: [],
    activeSong: {}
  };
  // methods
  playSong = song => {
    console.log(song);

    let songs = this.state.songs.map(e => {
      // console.log("e.id", e.id);
      // console.log("song.id", song.id);
      e.id == song.id ? (e.playing = true) : (e.playing = false);
      return e;
    });
    this.setState({ activeSong: song });
  };
  playActive = () => {
    this.playSong(this.state.activeSong);
  };
  stopSong = () => {
    let song = this.state.activeSong;
    song.playing = false;
    this.setState({ activeSong: song });
  };
  // lifecycle
  componentWillMount() {
    axios
      .get(`${process.env.REACT_APP_API}/songs`)
      .then(res => {
        if (res.status == 200) {
          let songs = res.data.map(e => {
            e.playing = false;
            return e;
          });
          this.setState({ songs });
        } else {
        }
      })
      .catch(err => {
        console.log({ err });
      });
  }
  render() {
    return (
      <div id="page">
        <Sidebar
          page="songs"
          song={this.state.activeSong}
          onStopSong={this.stopSong}
          onPlaySong={this.playActive}
        />
        <div id="songs">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Artist</th>
                <th>Album</th>
                <th>Genre</th>
              </tr>
            </thead>
            <tbody>
              {this.state.songs.map(e => (
                <Song
                  song={e}
                  key={e.id}
                  onPlaySong={this.playSong}
                  onStopSong={this.stopSong}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Songs;
