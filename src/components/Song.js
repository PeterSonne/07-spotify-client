import React from "react";
import { Howl } from "howler";

class Song extends React.Component {
  state = {
    playing: false,
    audio: {}
  };
  componentDidMount() {
    let audio = new Howl({
      html5: true,
      src: [this.props.song.audio]
    });
    this.setState({ audio });
  }
  componentWillReceiveProps(newProps) {
    this.setState({ playing: newProps.song.playing });
  }
  play = () => {
    this.props.onPlaySong(this.props.song);
  };
  stop = () => {
    this.props.onStopSong();
  };
  render() {
    return (
      <tr className={this.state.playing ? "playing" : ""}>
        <td>
          {!this.state.playing ? (
            <i
              className="button far fa-play-circle"
              onClick={e => this.play()}
            ></i>
          ) : (
            <i
              className="button far fa-pause-circle"
              onClick={e => this.stop()}
            ></i>
          )}
        </td>
        <td>{this.props.song.name}</td>
        <td>{this.props.song.artist}</td>
        <td>{this.props.song.album}</td>
        <td>{this.props.song.genre}</td>
      </tr>
    );
  }
}

export default Song;
