import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./styles/global.css";

import Songs from "./pages/Songs";
import Albums from "./pages/Albums";
import Album from "./pages/Album";
import Artists from "./pages/Artists";
import Artist from "./pages/Artist";
import Genres from "./pages/Genres";
import Genre from "./pages/Genre";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/albums/:id" component={Album} />
          <Route path="/albums" component={Albums} />
          <Route path="/artists/:id" component={Artist} />
          <Route path="/artists" component={Artists} />
          <Route path="/genres/:id" component={Genre} />
          <Route path="/genres" component={Genres} />
          <Route path="/" component={Songs} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
