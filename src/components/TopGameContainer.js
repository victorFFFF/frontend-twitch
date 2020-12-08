import React, { useState, useEffect } from "react";
import TopGameView from "./TopGameView";
import api from "./api";

function TopGameContainer() {
  const [topGames, setTopGames] = useState([
    { id: "", gameName: "", picUrl: "" },
  ]);

  //Update top game names
  const updateTopGame = async () => {
    //get game names

    await api.get("https://api.twitch.tv/helix/games/top").then((response) => {
      const result = response.data.data;
      console.log(response.data);
      for (let i = 0; i < result.length; i++) {
        if (i == 0) {
          setTopGames([
            {
              id: result[i].id,
              gameName: result[i].name,
              picUrl: result[i].box_art_url.replace(
                "{width}x{height}",
                "1000x1000"
              ),
            },
          ]);
        } else {
          setTopGames((prevState) => [
            ...prevState,
            {
              id: result[i].id,
              gameName: result[i].name,
              picUrl: result[i].box_art_url.replace(
                "{width}x{height}",
                "1000x1000"
              ),
            },
          ]);
        }
      }
    });
  };

  useEffect(() => {
    updateTopGame();
  }, []);

  return <TopGameView topGames={topGames} />;
}

export default TopGameContainer;
