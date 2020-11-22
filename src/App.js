import React, { useState, useEffect } from "react";
import axios from "axios";
import TopGameView from "./components/TopGameView";
import SearchView from "./components/SearchView";

function App() {
  const [topGames, setTopGames] = useState([]);
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

  //Update top game
  const updateTopGame = () => {
    setTopGames([]);
    // setGameImage([...gameImage, [] ]);
    axios
      .get("https://api.twitch.tv/helix/games/top", {
        headers: {
          "Client-ID": `${process.env.REACT_APP_CLIENTID}`,
          Authorization: `Bearer ${process.env.REACT_APP_OAUTHTOKEN}`,
        },
      })
      .then((response) => {
        const result = response.data;
        console.log(result.data.length);
        for (let i = 0; i < result.data.length; i++) {
          setTopGames((prevState) => [...prevState, result.data[i].name]);
        }
      });
  };

  //Update image
  const updateTopGameImage = () => {
    // console.log(this.state.topGames);
    // for (let i = 0; i < 20; i++) {
    //   axios
    //     .get(
    //       `https://api.twitch.tv/helix/search/categories?query=${this.state.topGames[i]}`,
    //       {
    //         headers: {
    //           "Client-ID": `${process.env.REACT_APP_CLIENTID}`,
    //           Authorization: `Bearer ${process.env.REACT_APP_OAUTHTOKEN}`,
    //         },
    //       }
    //     )
    //     .then((response) => {
    //       const result = response.data;
    //       this.setState({
    //         gameImage: [...this.state.gameImage, result.data[0].box_art_url],
    //       });
    //     });
    // }
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

  useEffect(() => {
    updateTopGame();
  }, []);

  // console.log(this.state.gameImage);
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
