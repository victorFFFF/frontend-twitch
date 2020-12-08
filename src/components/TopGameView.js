import "../App.css";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";

function TopGameView({ topGames }) {
  return (
    <div>
      <h3 className="center">
        <p className="topSpace">Top Viewed Categories</p>
      </h3>
      <div className="card-group">
        {topGames.map((element, i) => (
          <ol key={i}>
            <Card style={{ width: "15rem" }}>
              <Card.Img variant="top" src={element.picUrl} />
              <Card.Body>
                <Card.Title>{element.gameName}</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
                <Link to={`/popularGames/${element.id}`}>
                  {"Watch " + element.gameName}
                </Link>
              </Card.Body>
            </Card>
          </ol>
        ))}
      </div>
    </div>
  );
}

export default TopGameView;
