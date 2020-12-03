import "../App.css";
import { Link } from "react-router-dom";

function TopGameView({ topGames, getOAuth, updateTopGame }) {
  return (
    <div>
      <h3 className="center">Top Viewed Categories</h3>
      <div className="centerList">
        {topGames.map((element, i) => (
          <ol key={i}>
            {" "}
            <img
              src={element.box_art_url}
              alt={"pic"}
              style={{ height: "100px" }}
            />
            <Link to="/a">
              {i + 1 + ")"} {element.gameName}{" "}
            </Link>
          </ol>
        ))}
      </div>
      <div className="center">
        <button onClick={getOAuth}> Get new OAuth</button>
        <button onClick={updateTopGame}>Update Top Game</button>
      </div>
    </div>
  );
}

export default TopGameView;
