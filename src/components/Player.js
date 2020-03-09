import React, { Component } from "react";
import { Howl } from "howler";
import Moment from "moment";
require("../styles/player.css");

export class Player extends Component {
  state = {
    activeSong: {},
    audio: null,
    pos: {
      seek: 0,
      duration: 1
    }
  };
  posUpdater = null;
  componentWillReceiveProps(newProps) {
    if (
      this.state.audio != null &&
      newProps.song.id !== this.state.activeSong.id
    ) {
      this.stop();
    }
    if (newProps.song.id !== this.state.activeSong.id) {
      let audio = new Howl({
        html5: true,
        src: [newProps.song.audio]
      });
      audio.on("end", this.stopClick);
      this.setState({ activeSong: newProps.song, audio: audio, pos: 0 }, () => {
        if (this.state.activeSong.playing) {
          this.play();
        } else {
          this.stop();
        }
      });
    } else if (this.state.audio) {
      if (newProps.song.playing) {
        this.play();
      } else {
        this.stop();
      }
    }
  }
  updatePos = () => {
    if (this.state.audio) {
      this.setState({
        pos: {
          seek: Math.floor(this.state.audio.seek()),
          duration: Math.floor(this.state.audio.duration())
        }
      });
    }
  };
  getFormattedTimeFromMinutes = min => {
    if (Number.isNaN(min)) {
      return "0:00";
    }
    min++;
    const ret = Math.floor(min / 60);
    let sec = min - ret * 60;
    console.log("Minute", min);
    console.log("typeof Minute", typeof min);
    // console.log("Calc", `ret = ${ret} , sec = ${min} - ${ret} * 60 = ${sec}`);
    sec = `${sec < 10 ? "0" : ""}${sec.toFixed(0)}`;
    return `${ret}:${sec}`;
  };
  play = () => {
    if (this.state.audio == null) {
      return;
    }
    this.state.audio.play();
    this.updatePos();

    this.posUpdater = setInterval(this.updatePos, 500);
  };
  stop = () => {
    this.state.audio.pause();
    clearInterval(this.posUpdater);
  };
  playClick = () => {
    if (this.props.onPlay) {
      this.props.onPlay();
    }
  };
  stopClick = () => {
    console.log("Stopping audio in click-stop()");
    if (this.props.onStop) {
      this.props.onStop();
    }
  };
  progressClick = e => {
    let pos = this.state.pos;
    let progElem = document.querySelector(".buttons > .progress");
    pos.seek =
      ((e.clientX - progElem.clientLeft) / progElem.clientWidth) * pos.duration;
    this.state.audio.seek(pos.seek);
    this.setState({ pos });
  };
  render() {
    return (
      <div className="player">
        <div
          className="cover"
          style={{ backgroundImage: `url(${this.state.activeSong.cover})` }}
        >
          <div className="songinfo">
            <span className="title">{this.state.activeSong.name}</span>
            <span className="artist">{this.state.activeSong.artist}</span>
          </div>
          <div className="buttons">
            <div className="progress" onClick={this.progressClick}>
              <div
                className="progressBar"
                style={{
                  width: `calc(100% * ${this.state.pos.seek /
                    this.state.pos.duration})`
                }}
              ></div>
            </div>
            <div className="buttonBar">
              <span>
                {this.state.audio
                  ? this.getFormattedTimeFromMinutes(this.state.pos.seek)
                  : ""}
              </span>
              {!this.state.activeSong.playing ? (
                <i
                  className="button far fa-play-circle"
                  onClick={e => this.playClick()}
                ></i>
              ) : (
                <i
                  className="button far fa-pause-circle"
                  onClick={e => this.stopClick()}
                ></i>
              )}
              <span>
                {this.state.audio
                  ? this.getFormattedTimeFromMinutes(this.state.pos.duration)
                  : ""}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Player;
