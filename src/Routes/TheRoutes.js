import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Search from "../components/Search";
import SearchGames from "../components/SearchGames";
import SearchChannels from "../components/SearchChannels";
import Home from "../components/Home";
import TopGameContainer from "../components/TopGameContainer";
import TopStreamContainer from "../components/TopStreamContainer";

const TheRoutes = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/search" component={Search} />
    <Route path="/searchGame" component={SearchGames} />
    <Route path="/searchChannel" component={SearchChannels} />
    <Route path="/popularGames" component={TopGameContainer} />
    <Route path="/popularStreams" component={TopStreamContainer} />
  </Switch>
);

export default TheRoutes;
