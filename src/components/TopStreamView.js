import "../App.css";
import Card from "react-bootstrap/Card";

export default function TopStreamView({ topStream }) {
  return (
    <div>
      <div className="center">
        <h3 className="topSpace">Top Live Viewed Channels</h3>
        <div className="moveRight">
          <div className="card-group">
            {topStream.map((element, i) => (
              <ol key={i}>
                <Card style={{ width: "30rem" }}>
                  <Card.Img variant="top" src={element.pic} />
                  <Card.Body>
                    <Card.Title>{element.title}</Card.Title>
                    <Card.Text>{element.userName} </Card.Text>
                    <Card.Text>{element.gameName} </Card.Text>
                    <Card.Text>{element.viewCOunt} </Card.Text>
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
    </div>
  );
}
