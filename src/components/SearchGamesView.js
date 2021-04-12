import { Link } from "react-router-dom";
import ViewCount from "./ViewCount";
import Card from "react-bootstrap/Card";

export default function SearchGamesView({
  valid,
  empty,
  display2,
  handleInputChange,
  updateSearch,
  searchedGames,
  cursor,
}) {
  let display;
  //Control what to display
  if (valid && empty) display = "";
  else if (valid) {
    display = (
      <div className="topSpace">
        <div className="center">{display2}</div>
        <div className="card-group">
          {searchedGames.map((element, i) => (
            <ol key={i}>
              <Card style={{ width: "15rem" }}>
                <Card.Img variant="top" src={element.pic} />
                <Card.Body>
                  <ViewCount
                    gameID={searchedGames[i].id}
                    cursor={cursor}
                  ></ViewCount>
                  <Link to={`/searchChannel/${element.id}`}>
                    {element.name}
                  </Link>
                </Card.Body>
              </Card>
            </ol>
          ))}
        </div>
      </div>
    );
  } else {
    display = <p className="centerMiddle">No results.</p>;
  }

  return (
    <div>
      <div className="center">
        <h1>Search Games</h1>
        <p style={{ marginTop: "10%" }}>
          Returns a list of games or categories that match the query via name
          either entirely or partially.
        </p>
      </div>
      <form className="centerForm">
        <input
          type="text"
          className="input"
          placeholder="Search Games"
          onChange={handleInputChange}
        />
        <button type="button" className="btn btn-dark" onClick={updateSearch}>
          Search
        </button>
      </form>
      {display}
    </div>
  );
}
