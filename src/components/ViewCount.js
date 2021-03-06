import "../App.css";
import React, { useState, useEffect } from "react";
import api from "./api";

export default function ViewCount({ gameID }) {
  const [totalViews, setTotalView] = useState();
  const [isMounted, setIsMounted] = useState(true);
  let page = "";
  let count;

  const getViews = async () => {
    try {
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
    } catch (err) {
      console.log(err);
    }

    //Loops until end of pagnation and viewcount greater than 10
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
    if (isMounted) getViews();

    return () => {
      setIsMounted(false);
    };
  }, []);

  return <div>{totalViews} views</div>;
}
