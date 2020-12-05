import React, { useState } from "react";
import api from "./api";
import "../App.css";
import SearchChannelView from "./SearchChannelView";

export default function SearchChannelContainer() {
  const [searchInput, setSearchInput] = useState("");
  const [searchedChannels, setSearchedChannels] = useState([
    {
      language: "",
      displayName: "",
      gameName: "",
      gameID: "",
      id: "",
      live: "Offline",
      liveSince: "",
      thumbnail_url: "",
      title: "",
    },
  ]);
  const [valid, setStatus] = useState(true);
  const [display2, setDisplay2] = useState();
  const [empty, setEmpty] = useState(true);
  const [loading, setLoading] = useState(false);

  let gameIDMap = new Map();
  let display;
  let filter = "&live_only=false";

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };
  const filterLive = (e) => {
    filter = "&live_only=true";
    updateSearch(e);
  };
  const filterDefault = (e) => {
    filter = "";
    updateSearch(e);
  };

  //Find Channels
  const updateSearch = async (e) => {
    setEmpty(false);
    setLoading(true);
    e.preventDefault();
    setSearchedChannels([]);
    setStatus(true);
    if (valid) {
      setDisplay2(
        <p>Top results of channels that streamed within the last 6 months</p>
      );
    }
    await api
      .get(
        "https://api.twitch.tv/helix/search/channels?query=" +
          searchInput +
          filter
      )
      .then((response) => {
        const result = response.data.data;

        //Find game name from gameid then put all the info into state
        findGameName(result);
      })
      .catch((err) => {
        console.log(err);
        setStatus(false);
      });
  };

  const findGameName = async (result) => {
    //find game name corresponding to the game id
    for (let i = 0; i < result.length; i++) {
      await api
        .get("https://api.twitch.tv/helix/games?id=" + result[i].game_id)
        .then((response) => {
          const result2 = response.data;

          if (!gameIDMap.has(result[i].game_id))
            gameIDMap.set(result[i].game_id, result2.data[0].name);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    //put all info into state
    for (let i = 0; i < result.length; i++) {
      let status = "Offline";

      if (result[i].is_live) status = "Live";
      setSearchedChannels((prevState) => [
        ...prevState,
        {
          language: result[i].broadcaster_language,
          displayName: result[i].display_name,
          id: result[i].id,
          gameName: gameIDMap.get(result[i].game_id),
          gameID: result[i].game_id,
          live: status,
          liveSince: result[i].started_at,
          thumbnail_url: result[i].thumbnail_url,
          title: result[i].title,
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <SearchChannelView
      display={display}
      valid={valid}
      filterDefault={filterDefault}
      filterLive={filterLive}
      display2={display2}
      searchedChannels={searchedChannels}
      handleInputChange={handleInputChange}
      loading={loading}
      empty={empty}
      updateSearch={updateSearch}
    ></SearchChannelView>
  );
}
