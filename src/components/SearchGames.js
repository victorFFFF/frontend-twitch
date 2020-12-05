import React, { useState } from "react";
import axios from "axios";
import "../App.css";
import { Link } from "react-router-dom";

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
    await axios
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
        {display2}
        <div className="centerMiddle2">
          {searchedGames.map((element, i) => (
            <Link>
              <ol key={i}>
                {i + 1 + ")"} <img src={element.pic}></img>
                {element.name}
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
