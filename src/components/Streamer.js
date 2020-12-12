import "../App.css";
import React, { useState, useEffect } from "react";
import api from "./api";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ViewCount from "./ViewCount";

export default function Streamer({ match }) {
  const [streamers, setStreamers] = useState([{}]);
  const [gameName, setGameName] = useState();
  const [loading, setLoading] = useState(true);
  const [cursor, setCursor] = useState([]);
  const [counter, setCount] = useState(1);
  const [disable, setDisable] = useState(false);
  var next = false;
  var prev = false;
  var page;
  let display;
  let display2;

  const getStreamer = async () => {
    console.log(cursor);
    page = cursor;

    if (page.length !== 0) page = page[page.length - 1];

    if (next) {
      setCount((prevState) => prevState + 1);
      console.log("next");
    }

    if (prev) {
      console.log("prev");
      setCount((prevState) => prevState - 1);

      //EVEN
      if (counter % 2 === 0) {
        console.log("EVEN");
        cursor.pop();
        if (cursor.length === 0) page = "";
        else {
          page = cursor;
          page = page[cursor.length - 1];
        }

        //ODD
      } else if (counter % 2 !== 0) {
        cursor.pop();
        page = cursor;
        page = page[cursor.length - 1];
      }
    }
    await api
      .get(
        `https://api.twitch.tv/helix/streams?game_id=${match.params.id}&first=100&after=${page}`
      )
      .then((response) => {
        const result = response.data.data;
        page = response.data.pagination.cursor;
        if (next) setCursor((prevState) => [...prevState, page]);
        console.log(response);
        setGameName(result[0].game_name);
        for (let i = 0; i < result.length; i++) {
          if (i == 0) {
            setStreamers([]);
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
        }
        setLoading(false);
        if (cursor.length === 0) setDisable(true);
        else setDisable(false);
      })
      .catch((err) => console.log(err));
  };

  const clickNext = () => {
    next = true;
    prev = false;
    getStreamer();
  };

  const clickPrev = () => {
    next = false;
    prev = true;
    getStreamer();
  };

  useEffect(() => {
    getStreamer();
  }, [cursor]);

  if (loading) {
    display2 = "Loading...";
  } else {
    display = (
      <div>
        <div className="center" style={{ padding: "50px" }}>
          <h3>{gameName}</h3>
          <ViewCount gameID={match.params.id} cursor={cursor}></ViewCount>
          {+" viewers"}
        </div>

        <div className="moveRight">
          <div className="card-group">
            {streamers.map((streamer, i) => (
              <ol key={i}>
                <Card style={{ width: "30rem" }}>
                  <Card.Img variant="top" src={streamer.pic} />
                  <Card.Body>
                    <Card.Title>{streamer.title}</Card.Title>
                    <Card.Text>{streamer.name}</Card.Text>
                    <Card.Text>{streamer.views + " viewers"}</Card.Text>
                  </Card.Body>
                </Card>
              </ol>
            ))}
          </div>
        </div>
        <div className="Next">
          <Button variant="link">{counter}</Button>
          <Button
            variant="outline-primary"
            onClick={clickPrev}
            hidden={disable}
          >
            Previous
          </Button>
          <Button variant="outline-primary" onClick={clickNext}>
            Next Page
          </Button>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="centerMiddle">{display2}</div>
      {display}
    </div>
  );
}
