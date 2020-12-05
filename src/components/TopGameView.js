import "../App.css";
import { Link } from "react-router-dom";

function TopGameView({ topGames }) {
  return (
    <div>
      <h3 className="center">Top Viewed Categories</h3>
      <div className="centerList">
        {topGames.map((element, i) => (
          <ol key={i} className="col">
            {i + 1 + "."}
            <p></p>
            <img src={element.picUrl} alt={"pic"} />
            <p></p>
            <Link to="/a">{element.gameName} </Link>
          </ol>
        ))}
      </div>
    </div>
  );
}

export default TopGameView;
