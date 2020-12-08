import "../App.css";
import React, { useState, useEffect } from "react";
import api from "./api";
import Card from "react-bootstrap/Card";

export default function Streamer({ match }) {
  const [streamers, setStreamers] = useState([{}]);
  const [gameName, setGameName] = useState();
  const [totalViews, setTotalView] = useState(0);
  const [loading, setLoading] = useState(true);
  let display;
  let display2;

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
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getStreamer();
  }, []);

  if (loading) {
    display2 = "Loading...";
  } else {
    display = (
      <div>
        <div className="center" style={{ padding: "50px" }}>
          <h3>{gameName}</h3>
          {totalViews + " viewers"}
        </div>

        <div className="card-group">
          {streamers.map((streamer, i) => (
            <ol key={i}>
              <Card style={{ width: "30rem" }}>
                <Card.Img variant="top" src={streamer.pic} />
                <Card.Body>
                  <Card.Title>{streamer.title}</Card.Title>
                  <Card.Text>
                    {streamer.name}{" "}
                    <p className="text-muted">{streamer.views + " viewers"}</p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </ol>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div>
      <p className="centerMiddle">{display2}</p>
      {display}
    </div>
  );
}
