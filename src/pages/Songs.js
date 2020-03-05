import React from "react";
import axios from "axios";

import "../styles/songs.css";

import Sidebar from "../components/Sidebar";
import Song from "../components/Song";

class Songs extends React.Component {
  state = {
    songs: []
  };
  componentWillMount() {
    axios
      .get(`${process.env.REACT_APP_API}/songs`)
      .then(res => {
        if (res.status == 200) {
          let songs = res.data;
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
        <Sidebar page="songs" />
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
                <Song song={e} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Songs;
