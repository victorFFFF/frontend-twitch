import "../App.css";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

export default function TopStreamView({ topStream }) {
  return (
    <div>
      <div className="center">
        <h3 className="topSpace">Top Live Viewed Channels</h3>
      </div>
      <div className="moveRight">
        <div className="card-group">
          {topStream.map((element, i) => (
            <ol key={i}>
              <Card style={{ width: "30rem" }}>
                <Card.Img variant="top" src={element.pic} />
                <Card.Body>
                  <Card.Title>{element.title}</Card.Title>
                  <Card.Text>
                    <Link to={`/channel/${element.userName}`}>
                      {element.userName}
                    </Link>{" "}
                  </Card.Text>
                  <Card.Text>
                    {" "}
                    <Link to={`/popularGames/${element.game_id}`}>
                      {element.gameName}
                    </Link>{" "}
                  </Card.Text>
                  <Card.Text>{element.viewCount} views</Card.Text>
                  <Card.Text>{element.langauge} </Card.Text>
                  <Card.Text className="text-muted">
                    {"Live since: " + element.liveSince}{" "}
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
