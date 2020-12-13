import "../App.css";
import React, { useState, useEffect } from "react";
import api from "./api";

export default function ViewCount({ gameID, cursor }) {
  const [totalViews, setTotalView] = useState();
  let page = "";
  let count;

  const getViews = async () => {
    setTotalView(0);

    await api
      .get(`https://api.twitch.tv/helix/streams?game_id=${gameID}&first=100`)
      .then((response) => {
        const result = response.data.data;
        page = response.data.pagination.cursor;

        for (let i = 0; i < result.length; i++) {
          setTotalView((prevState) => prevState + result[i].viewer_count);
          count = result[i].viewer_count;
        }
      })
      .catch((err) => console.log(err));

    //Loops until end of pagnation
    while (page !== undefined && count > 10) {
      await api
        .get(
          `https://api.twitch.tv/helix/streams?game_id=${gameID}&first=100&after=${page}`
        )
        .then((response) => {
          const result = response.data.data;
          page = response.data.pagination.cursor;
          console.log("loop");

          for (let i = 0; i < result.length; i++) {
            setTotalView((prevState) => prevState + result[i].viewer_count);
            count = result[i].viewer_count;
          }
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    getViews();
  }, [page]);

  return <div>{totalViews} views</div>;
}
