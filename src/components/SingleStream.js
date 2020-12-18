import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import api from "./api";
import "../App.css";

export default function SingleStream({ match }) {
  const [stream, setStream] = useState([]);

  const getStream = async () => {
    setStream([]);
    await api
      .get(`https://api.twitch.tv/helix/streams?user_login=${match.params.id}`)
      .then((response) => {
        const result = response.data.data;
        console.group(result);

        setStream((prevState) => [
          ...prevState,
          {
            user_name: result[0].user_name,
            img: result[0].thumbnail_url.replace("{width}x{height}", "500x300"),
            title: result[0].title,
            game_name: result[0].game_name,
            viewer_count: result[0].viewer_count,
            game_id: result[0].game_id,
          },
        ]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getStream();
  }, []);

  return (
    <div>
      <div className="centerMiddle2">
        <div className="card-group">
          {stream.map((element, i) => (
            <ol key={i}>
              <Card style={{ width: "25rem" }}>
                <img src={element.img}></img>
                <Card.Body>
                  <h3>{element.title}</h3>
                  <Card.Text>
                    <Link to={`/channel/${element.user_name}`}>
                      {element.user_name}
                    </Link>{" "}
                  </Card.Text>
                  <Card.Text> {element.viewer_count} views </Card.Text>
                  <Card.Text>
                    {" "}
                    <Link to={`/popularGames/${element.game_id}`}>
                      {" "}
                      {element.game_name}
                    </Link>
                  </Card.Text>
                </Card.Body>
              </Card>
            </ol>
          ))}
        </div>
      </div>
    </div>
  );
}
