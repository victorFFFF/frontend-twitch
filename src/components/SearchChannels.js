import React, { useState } from "react";
import api from "./api";
import "../App.css";

export default function SearchChannel() {
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

  //Control what to display
  if (loading) display = <h3 className="centerMiddle">loading...</h3>;
  else if (valid && empty) {
    display = "";
  } else if (valid) {
    display = (
      <div className="centerMiddle2">
        Filter by:
        <button onClick={filterDefault} style={{ padding: "10px" }}>
          Live/Offline
        </button>
        <button onClick={filterLive} style={{ padding: "10px" }}>
          Live
        </button>
        {display2}
        <div>
          {searchedChannels.map((element, i) => (
            <ol key={i}>
              <img
                src={element.thumbnail_url}
                alt="pic"
                style={{ height: "100px" }}
              ></img>
              <h3>
                {i + 1 + ")"} {element.displayName}
                {}
              </h3>
              <p>User ID: {element.id}</p>
              <p>Status: {element.live}</p>
              <p>Live Since: {element.liveSince}</p>
              <p>BroadCast langauge: {element.language}</p>
              <p>Stream Title: {element.title}</p>
              <p>Game : {element.gameName}</p>
              <p>Game ID: {element.gameID}</p>
            </ol>
          ))}
        </div>
      </div>
    );
  } else {
    display = <p className="centerMiddle">No results.</p>;
  }

  return (
    <div>
      <p className="center">
        Returns a list of channels (users who have streamed within the past 6
        months) that match the query via channel name or description either
        entirely or partially. Results include both live and offline channels
      </p>
      <form className="centerForm">
        <input
          type="text"
          className="input"
          placeholder="Search Channels"
          onChange={handleInputChange}
        />
        <button onClick={updateSearch} disabled={loading}>
          Search
        </button>
      </form>
      {display}
    </div>
  );
}
