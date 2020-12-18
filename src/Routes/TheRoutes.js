import React from "react";
import { Switch, Route } from "react-router-dom";
import Search from "../components/Search";
import SearchGamesContainer from "../components/SearchGamesContainer";
import SearchChannelContainer from "../components/SearchChannelsContainer";
import Home from "../components/Home";
import TopGameContainer from "../components/TopGameContainer";
import TopStreamContainer from "../components/TopStreamContainer";
import Streamer from "../components/Streamer";
import Channel from "../components/Channel";
import Following from "../components/Following";
import SingleStream from "../components/SingleStream";
import Follower from "../components/Follower";

const TheRoutes = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/channel/:id" exact component={Channel} />
    <Route path="/:id/following" exact component={Following} />
    <Route path="/:id/follower" exact component={Follower} />
    <Route path="/:id/stream" exact component={SingleStream} />
    <Route path="/search" exact component={Search} />
    <Route path="/searchGame" exact component={SearchGamesContainer} />
    {/* <Route path="/searchGame:name" component={SearchGamesContainer} /> */}
    <Route path="/searchChannel" exact component={SearchChannelContainer} />
    <Route path="/searchChannel/:id" component={Streamer} />
    <Route path="/popularGames" exact component={TopGameContainer} />
    <Route path="/popularGames/:id" component={Streamer} />
    <Route path="/popularStreams" exact component={TopStreamContainer} />
  </Switch>
);

export default TheRoutes;
