import React, { useState, useEffect } from "react";
import axios from "axios";
import TopGameView from "./components/TopGameView";
import SearchView from "./components/SearchView";

function App() {
  const [topGames, setTopGames] = useState([]);
  // const [topGamesID, setTopGamesId] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchedGames, setSearchedGames] = useState([]);
  const [gameImage, setGameImage] = useState([]);
  const [oAuth, setoAut] = useState("");

  //Get new OAuthenitcation key
  const getOAuth = () => {
    // axios.get("oAuth").then((response) => {
    //   const data = response.data;
    //   // this.setState({ oAuth: data });
    //   console.log(data);
    //   console.log("oAuth : " + this.oAuth);
    // });
  };

  //Update top game with image
  const updateTopGame = () => {
    setTopGames([]);
    axios
      .get("https://api.twitch.tv/helix/games/top", {
        headers: {
          "Client-ID": `${process.env.REACT_APP_CLIENTID}`,
          Authorization: `Bearer ${process.env.REACT_APP_OAUTHTOKEN}`,
        },
      })
      .then((response) => {
        const result = response.data;
        for (let i = 0; i < result.data.length; i++) {
          setTopGames((prevState) => [...prevState, result.data[i].name]);
        }
      });

    //image code
    async function waitImage() {
      console.log("topGames name");
      console.log(topGames);
      setGameImage([]);
      for (let i = 0; i < topGames.length; i++) {
        await axios
          .get(
            `https://api.twitch.tv/helix/search/categories?query=` +
              topGames[i],
            {
              headers: {
                "Client-ID": `${process.env.REACT_APP_CLIENTID}`,
                Authorization: `Bearer ${process.env.REACT_APP_OAUTHTOKEN}`,
              },
            }
          )
          .then((response) => {
            const result = response.data;
            console.log("result " + i);
            console.log(result);
            let stringName = findString(
              result.data,
              topGames[i],
              result.data.length
            );
            setGameImage((prevState) => [...prevState, stringName.box_art_url]);
          });
      }
    }
    waitImage();
  };

  //search for games matching input
  const updateSearch = (e) => {
    e.preventDefault();
    setSearchedGames([]);
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
        console.log(result);
        for (let i = 0; i < result.data.length; i++) {
          setSearchedGames((prevState) => [...prevState, result.data[i].name]);
        }
      });
  };

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const findString = (array, target, length) => {
    for (let i = 0; i < length; i++) {
      if (array[i].name === target) return array[i];
    }
  };

  useEffect(() => {
    updateTopGame();
  }, []);

  return (
    <div>
      <SearchView
        searchedGames={searchedGames}
        updateSearch={updateSearch}
        handleInputChange={handleInputChange}
      />
      <TopGameView
        topGames={topGames}
        updateTopGame={updateTopGame}
        getOAuth={getOAuth}
        gameImage={gameImage}
      />
    </div>
  );
}

export default App;
