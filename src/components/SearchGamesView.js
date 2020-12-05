import { Link } from "react-router-dom";

export default function SearchGamesView({
  valid,
  empty,
  display2,
  handleInputChange,
  updateSearch,
  searchedGames,
}) {
  let display;
  //Control what to display
  if (valid && empty) display = "";
  else if (valid) {
    display = (
      <div>
        <div className="centerList">
          {display2}
          {searchedGames.map((element, i) => (
            <div className="col">
              <ol key={i}>
                <Link to={`/searchGame/${element.name}`}>
                  {i + 1 + ")"} <img src={element.pic} alt="pic"></img>
                  <p>{element.name}</p>
                </Link>
              </ol>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    display = <p className="centerMiddle">No results.</p>;
  }

  return (
    <div>
      <p className="center">
        Returns a list of games or categories that match the query via name
        either entirely or partially.
      </p>
      <form className="centerForm">
        <input
          type="text"
          className="input"
          placeholder="Search Games"
          onChange={handleInputChange}
        />
        <button onClick={updateSearch}>Search</button>
      </form>
      {display}
    </div>
  );
}
