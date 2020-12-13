import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import api from "./api";
import "../App.css";

export default function Following({ match }) {
  const [following, setFollowing] = useState([]);
  const [theFollower, setFollower] = useState();

  //Find Channels
  const getFollowing = async () => {
    setFollowing([]);

    await api
      .get(
        `https://api.twitch.tv/helix/users/follows?from_id=${match.params.id}&first=100`
      )
      .then((response) => {
        const result = response.data.data;
        console.group(result);

        for (let i = 0; i < result.length; i++) {
          setFollowing((prevState) => [
            ...prevState,
            {
              name: result[i].to_name,
              date: result[i].followed_at,
            },
          ]);
        }
        setFollower(result[0].from_name);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getFollowing();
  }, []);

  return (
    <div>
      <div className="topSpace">
        <h3 className="center">{theFollower} is following</h3>
        <div className="card-group">
          {following.map((element, i) => (
            <ol key={i}>
              <Card style={{ width: "25rem" }}>
                {/* <Card.Img variant="top" src={} /> */}
                <Card.Body>
                  <Card.Text>
                    {" "}
                    <Link to={`/channel/${element.name}`}> {element.name}</Link>
                  </Card.Text>
                  Followed since : {element.date}
                </Card.Body>
              </Card>
            </ol>
          ))}
        </div>
      </div>
    </div>
  );
}
