import React, { useState } from "react";
import axios from "axios";
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
  let gameIDMap = new Map();
  let display;
  let filter = "&live_only=false";

  //Find Channels
  const updateSearch = async (e) => {
    setEmpty(false);
    e.preventDefault();
    setSearchedChannels([]);
    setStatus(true);
    console.log(valid);
    if (valid) {
      setDisplay2(
        <p>Top results of channels that streamed within the last 6 months</p>
      );
    }
    await axios
      .get(
        "https://api.twitch.tv/helix/search/channels?query=" +
          searchInput +
          filter,
        {
          headers: {
            "Client-ID": `${process.env.REACT_APP_CLIENTID}`,
            Authorization: `Bearer ${process.env.REACT_APP_OAUTHTOKEN}`,
          },
        }
      )
      .then((response) => {
        const result = response.data.data;

        //Find game name from gameid
        // for (let i = 0; i < result.length; i++) {
        //   console.log(result[i].game_id);
        //   axios
        //     .get("https://api.twitch.tv/helix/games?id=" + result[i].game_id, {
        //       headers: {
        //         "Client-ID": `${process.env.REACT_APP_CLIENTID}`,
        //         Authorization: `Bearer ${process.env.REACT_APP_OAUTHTOKEN}`,
        //       },
        //     })
        //     .then((response) => {
        //       const result2 = response.data;
        //       console.log(result2.data[0].name);

        //       if (!gameIDMap.has(result[i].game_id)) {
        //         gameIDMap.set(result[i].game_id, result2.data[0].name);
        //       }
        //     })
        //     .catch((err) => {
        //       console.log(err);
        //     });
        // }
        for (let i = 0; i < result.length; i++) {
          let status = "Offline";
          console.log("!!!!");
          console.log(gameIDMap);
          console.log(gameIDMap.get("Fortnite"));
          if (result[i].is_live) status = "Live";
          setSearchedChannels((prevState) => [
            ...prevState,
            {
              language: result[i].broadcaster_language,
              displayName: result[i].display_name,
              id: result[i].id,
              // gameName: gameIDMap.get(result[i].game_id),
              gameID: result[i].game_id,
              live: status,
              liveSince: result[i].started_at,
              thumbnail_url: result[i].thumbnail_url,
              title: result[i].title,
            },
          ]);
        }
      })
      .catch((err) => {
        console.log(err);
        setStatus(false);
      });
  };
  const handleInputChange = (e) => {
    console.log(e.target.value);
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

  //Control what to display
  if (valid && empty) {
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
      <form className="centerForm">
        <input
          type="text"
          className="input"
          placeholder="Search Channels"
          onChange={handleInputChange}
        />
        <button onClick={updateSearch}>Search</button>
      </form>
      {display}
    </div>
  );
}
