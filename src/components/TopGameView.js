import "../App.css";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ViewCount from "./ViewCount";

function TopGameView({ topGames, clickNext, clickPrev, disable, counter }) {
  console.log("TOPGAMEVIEW");
  console.log(topGames);
  return (
    <div>
      <div className="topSpace">
        <div className="center">
          <h1>Top Viewed Categories</h1>
          {"Page " + counter}
        </div>
      </div>

      <div className="card-group">
        {topGames.map((element, i) => (
          <ol key={i}>
            <Card style={{ width: "15rem" }}>
              <Card.Img variant="top" src={element.picUrl} />
              <Card.Body>
                <Card.Title>{element.gameName}</Card.Title>

                <ViewCount topGames={topGames[i].id}></ViewCount>

                <Link to={`/popularGames/${element.id}`}>
                  {"Watch " + element.gameName}
                </Link>
              </Card.Body>
            </Card>
          </ol>
        ))}
      </div>

      <div className="Next">
        <Button variant="link">{counter}</Button>
        <Button variant="outline-primary" onClick={clickPrev} hidden={disable}>
          Previous
        </Button>
        <Button variant="outline-primary" onClick={clickNext}>
          Next Page
        </Button>
      </div>
    </div>
  );
}

export default TopGameView;
