import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import api from "./api";
import "../App.css";

export default function Follower({ match }) {
  const [follower, setFollower] = useState([]);
  const [theUser, setUser] = useState();
  const [valid, setValid] = useState(true);
  let display = "";

  //Find Channels
  const getFollower = async () => {
    setFollower([]);

    await api
      .get(
        `https://api.twitch.tv/helix/users/follows?to_id=${match.params.id}&first=100`
      )
      .then((response) => {
        const result = response.data.data;
        if (result.length === 0) setValid(false);
        console.group(result);

        for (let i = 0; i < result.length; i++) {
          setFollower((prevState) => [
            ...prevState,
            {
              name: result[i].from_name,
              date: result[i].followed_at,
            },
          ]);
        }
        setUser(result[0].to_name);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    let mounted = true;

    if (mounted) getFollower();

    return () => (mounted = false);
  }, []);

  if (valid)
    display = (
      <div>
        <div className="topSpace">
          <h3 className="center">
            {" "}
            <Link to={`/channel/${theUser}`}>{theUser}</Link>'s followers
          </h3>
          <div className="card-group">
            {follower.map((element, i) => (
              <ol key={i}>
                <Card style={{ width: "25rem" }}>
                  {/* <Card.Img variant="top" src={} /> */}
                  <Card.Body>
                    <Card.Text>
                      {" "}
                      <Link to={`/channel/${element.name}`}>
                        {" "}
                        {element.name}
                      </Link>
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
  else display = <p className="centerMiddle">No results.</p>;

  return <div>{display}</div>;
}
