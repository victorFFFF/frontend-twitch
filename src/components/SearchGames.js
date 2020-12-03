import React, { useState } from "react";
import axios from "axios";
import "../App.css";
import { Link } from "react-router-dom";

function SearchGames() {
  const [searchInput, setSearchInput] = useState("");
  const [searchedGames, setSearchedGames] = useState([]);
  const [valid, setStatus] = useState(true);
  const [display2, setDisplay2] = useState();
  let display;

  //search for games matching input
  const updateSearch = (e) => {
    e.preventDefault();
    setSearchedGames([]);
    setStatus(true);
    if (valid) {
      setDisplay2(<p>Top result of games/cateogories that match the query</p>);
    }
    axios
      .get(
        "https://api.twitch.tv/helix/search/categories?query=" + searchInput,
        {
          headers: {
            "Client-ID": `${process.env.REACT_APP_CLIENTID}`,
            Authorization: `Bearer ${process.env.REACT_APP_OAUTHTOKEN}`,
          },
        }
      )
      .then((response) => {
        const result = response.data;
        for (let i = 0; i < result.data.length; i++) {
          setSearchedGames((prevState) => [...prevState, result.data[i].name]);
        }
      })
      .catch((err) => {
        console.log(err);
        setStatus(false);
      });
  };
  const handleInputChange = (e) => {
    console.log(e.target.value);
    setSearchInput(e.target.value);
  };

  //Control what to display
  if (valid) {
    display = (
      <div>
        {display2}
        <div className="centerMiddle2">
          {searchedGames.map((name, i) => (
            <Link>
              <ol key={i}>
                {" "}
                {i + 1 + ")"} {name}
              </ol>
            </Link>
          ))}
        </div>
      </div>
    );
  } else {
    display = <p className="centerMiddle">No results.</p>;
  }

  return (
    <div>
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
