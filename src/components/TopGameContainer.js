import React, { useState, useEffect } from "react";
import TopGameView from "./TopGameView";
import api from "./api";

function TopGameContainer() {
  const [topGames, setTopGames] = useState([
    { id: "", gameName: "", picUrl: "" },
  ]);
  const [cursor, setCursor] = useState([]);
  const [param, setParam] = useState("");
  var next = false;
  var prev = false;
  var page;

  //Update top game names
  const updateTopGame = async () => {
    //get game names
    page = cursor;

    if (page.length != 0) page = page[page.length - 1];

    if (next) {
      console.log("next");
      // setParam(`after=` + page);
    }

    if (prev) {
      if (cursor.length >= 2) {
        console.log("prev");
        cursor.pop();
        page = cursor.pop();
      } else if (cursor.length == 1) {
        cursor.pop();
        page = "";
      } else page = "";
    }

    await api
      .get(`https://api.twitch.tv/helix/games/top?after=${page}`)
      .then((response) => {
        const result = response.data.data;
        page = response.data.pagination.cursor;
        if (next) setCursor((prevState) => [...prevState, page]);

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
    console.log(cursor);
  };

  const clickNext = () => {
    next = true;
    prev = false;
    updateTopGame();
  };

  const clickPrev = () => {
    next = false;
    prev = true;
    updateTopGame();
  };

  useEffect(() => {
    updateTopGame();
  }, [cursor]);

  return (
    <TopGameView
      topGames={topGames}
      clickNext={clickNext}
      clickPrev={clickPrev}
    />
  );
}

export default TopGameContainer;
