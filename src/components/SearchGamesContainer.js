import React, { useState } from "react";
import "../App.css";
import api from "./api";
import SearchGamesView from "./SearchGamesView";

function SearchGamesContainer() {
  const [searchInput, setSearchInput] = useState("");
  const [searchedGames, setSearchedGames] = useState([{}]);
  const [valid, setStatus] = useState(true);
  const [display2, setDisplay2] = useState();
  const [empty, setEmpty] = useState(true);

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

  return (
    <SearchGamesView
      valid={valid}
      empty={empty}
      display2={display2}
      handleInputChange={handleInputChange}
      updateSearch={updateSearch}
      searchedGames={searchedGames}
    ></SearchGamesView>
  );
}

export default SearchGamesContainer;
