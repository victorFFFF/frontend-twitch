import React, { useState } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import api from "./api";

function SearchGames() {
  const [searchInput, setSearchInput] = useState("");
  const [searchedGames, setSearchedGames] = useState([{}]);
  const [valid, setStatus] = useState(true);
  const [display2, setDisplay2] = useState();
  const [empty, setEmpty] = useState(true);
  let display;

  //search for games matching input
  const updateSearch = async (e) => {
    e.preventDefault();
    setSearchedGames([]);
    setEmpty(false);
    setStatus(true);
    if (valid) {
      setDisplay2(<p>Top result of games/cateogories that match the query</p>);
    }
    await api
      .get("https://api.twitch.tv/helix/search/categories?query=" + searchInput)
      .then((response) => {
        const result = response.data;
        console.log(result);
        for (let i = 0; i < result.data.length; i++) {
          setSearchedGames((prevState) => [
            ...prevState,
            {
              name: result.data[i].name,
              pic: result.data[i].box_art_url.replace("52x72", "100x150"),
            },
          ]);
        }
      })
      .catch((err) => {
        console.log(err);
        setStatus(false);
      });
  };
  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

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

export default SearchGames;
