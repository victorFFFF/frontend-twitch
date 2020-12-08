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
                    <Card.Text>
                      <p>{element.userName}</p>
                      <p>{element.gameName}</p>
                      <p>{element.viewCount + " viewers"}</p>
                      <p>{element.language}</p>
                      <p className="text-muted">
                        {"Live since: " + element.liveSince}
                      </p>
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
