import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Search from "../components/Search";
import SearchGames from "../components/SearchGames";
import SearchChannels from "../components/SearchChannels";
import Home from "../components/Home";
import TopGameContainer from "../components/TopGameContainer";
import topGames from "../components/TopGameContainer";
import TopStreamContainer from "../components/TopStreamContainer";

const TheRoutes = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/search" exact component={Search} />
    <Route path="/searchGame" exact component={SearchGames} />
    <Route path="/searchGame:name" component={SearchGames} />
    <Route path="/searchChannel" exact component={SearchChannels} />
    <Route path="/popularGames" exact component={TopGameContainer} />
    <Route
      path="/popularGames/:id"
      component={() => {
        window.location.href = "https://twitch.com";
        return null;
      }}
    />
    <Route path="/popularStreams" exact component={TopStreamContainer} />
  </Switch>
);

export default TheRoutes;
