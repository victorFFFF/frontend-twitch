import "../App.css";
import React, { useState, useEffect } from "react";
import api from "./api";

export default function ViewCount({ topGames }) {
  const [totalViews, setTotalView] = useState();

  const getViews = async () => {
    setTotalView(0);

    await api
      .get(`https://api.twitch.tv/helix/streams?game_id=${topGames}&first=100`)
      .then((response) => {
        const result = response.data.data;

        for (let i = 0; i < result.length; i++) {
          setTotalView((prevState) => prevState + result[i].viewer_count);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getViews();
  }, []);

  return <div>{totalViews} views</div>;
}
