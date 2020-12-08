import "../App.css";
import React, { useState, useEffect } from "react";
import api from "./api";

export default function Streamer({ match }) {
  const [streamers, setStreamers] = useState([{}]);
  const [gameName, setGameName] = useState();
  const [totalViews, setTotalView] = useState(0);

  const getStreamer = async () => {
    await api
      .get(
        `https://api.twitch.tv/helix/streams?game_id=${match.params.id}&first=100`
      )
      .then((response) => {
        const result = response.data.data;
        console.log(result);
        setGameName(result[0].game_name);
        for (let i = 0; i < result.length; i++) {
          if (i == 0) {
            setStreamers([
              {
                title: result[i].title,
                name: result[i].user_name,
                views: result[i].viewer_count,
                pic: result[i].thumbnail_url.replace(
                  "{width}x{height}",
                  "500x300"
                ),
              },
            ]);
          } else {
            setStreamers((prevState) => [
              ...prevState,
              {
                title: result[i].title,
                name: result[i].user_name,
                views: result[i].viewer_count,
                pic: result[i].thumbnail_url.replace(
                  "{width}x{height}",
                  "500x300"
                ),
              },
            ]);
          }
          setTotalView((prevState) => prevState + result[i].viewer_count);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getStreamer();
  }, []);

  return (
    <div>
      <div className="center">
        <h3>{gameName}</h3>
        {totalViews + " viewers"}
      </div>
      <div className="centerList2">
        {streamers.map((streamer, i) => (
          <ol key={i} className="col2">
            <img src={streamer.pic}></img>
            <h3>{streamer.title}</h3>
            <p>{streamer.name}</p>
            {streamer.views + " viewers"}
          </ol>
        ))}
      </div>
    </div>
  );
}
