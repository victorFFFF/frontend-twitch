import React, { useState } from "react";
import api from "./api";
import "../App.css";
import SearchChannelView from "./SearchChannelView";

export default function SearchChannelContainer() {
  const [searchInput, setSearchInput] = useState("");
  const [searchedChannels, setSearchedChannels] = useState([]);
  const [valid, setStatus] = useState(true);
  const [empty, setEmpty] = useState(true);

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
    setStatus(true);
    setEmpty(false);
    e.preventDefault();
    setSearchedChannels([]);

    await api
      .get(
        "https://api.twitch.tv/helix/search/channels?query=" +
          searchInput +
          filter
      )
      .then((response) => {
        const result = response.data.data;
        console.log(result);
        if (result.length === 0) setStatus(false);
        for (let i = 0; i < result.length; i++) {
          setSearchedChannels((prevState) => [
            ...prevState,
            {
              displayName: result[i].display_name,
              thumbnail_url: result[i].thumbnail_url,
            },
          ]);
        }

        console.group(result);

        //Find game name from gameid then put all the info into state
      })
      .catch((err) => {
        console.log(err);
        setStatus(false);
        setEmpty(false);
      });
  };

  return (
    <SearchChannelView
      display={display}
      valid={valid}
      filterDefault={filterDefault}
      filterLive={filterLive}
      searchedChannels={searchedChannels}
      handleInputChange={handleInputChange}
      empty={empty}
      updateSearch={updateSearch}
    ></SearchChannelView>
  );
}
