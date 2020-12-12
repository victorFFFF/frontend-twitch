import "../App.css";
import React, { useState, useEffect } from "react";
import api from "./api";

export default function ViewCount({ gameID, cursor }) {
  const [totalViews, setTotalView] = useState();

  const getViews = async () => {
    let page;
    setTotalView(0);

    console.log("first api");
    await api
      .get(`https://api.twitch.tv/helix/streams?game_id=${gameID}&first=100`)
      .then((response) => {
        const result = response.data.data;
        page = response.data.pagination.cursor;

        for (let i = 0; i < result.length; i++) {
          setTotalView((prevState) => prevState + result[i].viewer_count);
        }
      })
      .catch((err) => console.log(err));

    console.log("second api");

    // while (!cursor.includes(page)) {
    //   await api
    //     .get(
    //       `https://api.twitch.tv/helix/streams?game_id=${topGames}&first=100`
    //     )
    //     .then((response) => {
    //       const result = response.data.data;
    //       page = response.data.pagination.cursor;

    //       for (let i = 0; i < result.length; i++) {
    //         setTotalView((prevState) => prevState + result[i].viewer_count);
    //       }
    //     })
    //     .catch((err) => console.log(err));
    // }
  };

  useEffect(() => {
    getViews();
  }, []);

  return <div>{totalViews} views</div>;
}
