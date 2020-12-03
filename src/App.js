import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import TopGameView from "./components/TopGameView";
import Search from "./components/Search";
import Nav from "./components/Nav";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SearchGames from "./components/SearchGames";
import SearchChannels from "./components/SearchChannels";

function App() {
  const [topGames, setTopGames] = useState([{ gameName: "", picUrl: "" }]);
  const [oAuth, setAuth] = useState("");
  const stateRef = useRef();

  //Get new OAuthenitcation key
  const getOAuth = () => {
    axios.get("oAuth").then((response) => {
      const data = response.data;
      setAuth(data);
      console.log("oAuth : " + oAuth);
    });
  };

  //Update top game names
  const updateTopGame = async () => {
    //get game names
    await axios
      .get("https://api.twitch.tv/helix/games/top", {
        headers: {
          "Client-ID": `${process.env.REACT_APP_CLIENTID}`,
          Authorization: `Bearer ${process.env.REACT_APP_OAUTHTOKEN}`,
        },
      })
      .then((response) => {
        const result = response.data;
        stateRef.current = result;
      });

    // Get game pic then put pic and name into array
    for (let i = 0; i < stateRef.current.data.length; i++) {
      await axios
        .get(
          `https://api.twitch.tv/helix/search/categories?query=` +
            stateRef.current.data[i].name,
          {
            headers: {
              "Client-ID": `${process.env.REACT_APP_CLIENTID}`,
              Authorization: `Bearer ${process.env.REACT_APP_OAUTHTOKEN}`,
            },
          }
        )
        .then((response) => {
          const result = response.data;

          let arrayElement = findString(
            result.data,
            stateRef.current.data[i].name,
            result.data.length
          );

          if (i == 0) {
            setTopGames([
              {
                gameName: stateRef.current.data[i].name,
                box_art_url: arrayElement.box_art_url,
              },
            ]);
          } else {
            setTopGames((prevState) => [
              ...prevState,
              {
                gameName: stateRef.current.data[i].name,
                box_art_url: arrayElement.box_art_url,
              },
            ]);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  //Find matching string in array and return the array element
  const findString = (array, target, length) => {
    for (let i = 0; i < length; i++) {
      if (array[i].name === target) return array[i];
    }
  };

  useEffect(() => {
    updateTopGame();
  }, []);

  const topGamesComponent = () => (
    <TopGameView
      topGames={topGames}
      updateTopGame={updateTopGame}
      getOAuth={getOAuth}
    />
  );
  return (
    <Router>
      <Nav />

      <Switch>
        <Route path="/" exact component={topGamesComponent} />
        <Route path="/search" component={Search} />
        <Route path="/searchGame" component={SearchGames} />
        <Route path="/searchChannel" component={SearchChannels} />
      </Switch>
    </Router>
  );
}

export default App;
