import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import api from "./api";
import "../App.css";

export default function Channel({ match }) {
  const [searchedChannels, setSearchedChannels] = useState([]);
  const [isLive, setLive] = useState(false);

  //Find Channels
  const getChannel = async () => {
    setSearchedChannels([]);

    await api
      .get(
        `https://api.twitch.tv/helix/search/channels?query=" + ${match.params.id}`
      )
      .then((response) => {
        const result = response.data.data[0];

        console.group(result);

        //Find game name from gameid then put all the info into state
        findGameName(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //find game name corresponding to the game id
  const findGameName = async (result) => {
    await api
      .get("https://api.twitch.tv/helix/games?id=" + result.game_id)
      .then((response) => {
        const result2 = response.data.data[0].name;

        let status = "Offline";
        let startedAt = "N/A";

        if (result.is_live) {
          status = "Live";
          startedAt = result.started_at;
          setLive(true);
        }
        setSearchedChannels((prevState) => [
          ...prevState,
          {
            language: result.broadcaster_language,
            displayName: result.display_name,
            id: result.id,
            gameName: result2,
            gameID: result.game_id,
            live: status,
            liveSince: startedAt,
            thumbnail_url: result.thumbnail_url,
            title: result.title,
          },
        ]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getChannel();
  }, []);

  return (
    <div className="centerMiddle2">
      {searchedChannels.map((element, i) => (
        <ol key={i}>
          <Card style={{ width: "20rem" }}>
            <Card.Img variant="top" src={element.thumbnail_url} />
            <Card.Body>
              <Card.Text>Title : {element.title}</Card.Text>
              <Card.Text>Display Name: {element.displayName}</Card.Text>
              <Card.Text>User ID : {element.id} </Card.Text>
              <Card.Text>Live : {element.live}</Card.Text>
              <Card.Text>Live Since : {element.liveSince}</Card.Text>
              <Card.Text>Game Name : {element.gameName}</Card.Text>
              <Card.Text>Game ID : {element.gameID} </Card.Text>
              <Card.Text>Language : {element.language} </Card.Text>
              <Card.Text>
                <Link to={`/${element.displayName}/stream`} hidden={!isLive}>
                  Watch Stream
                </Link>
              </Card.Text>
              <Card.Text>
                <Link to={`/${element.id}/follower`}>View Followers</Link>
              </Card.Text>
              <Card.Text>
                <Link to={`/${element.id}/following`}>View Following </Link>
              </Card.Text>
            </Card.Body>
          </Card>
        </ol>
      ))}
    </div>
  );
}
