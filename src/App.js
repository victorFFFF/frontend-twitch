import React, { useState, useEffect } from "react";
import axios from "axios";
import TopGameView from "./components/TopGameView";
import Search from "./components/Search";
import Nav from "./components/Nav";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [topGames, setTopGames] = useState([{ gameName: "", picUrl: "" }]);
  const [renderIt, setRender] = useState();
  const [oAuth, setAuth] = useState("");

  //Get new OAuthenitcation key
  const getOAuth = () => {
    axios.get("oAuth").then((response) => {
      const data = response.data;
      setAuth(data);
      console.log(data);
      console.log("oAuth : " + this.oAuth);
    });
  };

  //Update top game names
  const updateTopGame = () => {
    console.log(" *****************  updateTopGame called ******************");
    getImage();
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
          console.log(result);
          if (i == 0) {
            setTopGames([{ gameName: result.data[i].name, picUrl: "" }]);
          } else {
            setTopGames((prevState) => [
              ...prevState,
              { gameName: result.data[i].name, picUrl: "" },
            ]);
          }
        }
        console.log("FINISHED UPDATETOPGAME!!!!!!!!");
      });
  };

  //retrieves image
  const getImage = () => {
    console.log("*****************  getImage called ******************");

    for (let i = 0; i < topGames.length; i++) {
      console.log("looping");
      axios
        .get(
          `https://api.twitch.tv/helix/search/categories?query=` +
            topGames[i].gameName,
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
            topGames[i].gameName,
            result.data.length
          );

          let index = topGames.findIndex(
            (x) => x.gameName == topGames[i].gameName
          );
          topGames[index].picUrl = arrayElement.box_art_url;
          setTopGames(topGames);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  //Find matching string and return the array element
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
      </Switch>
    </Router>
  );
}

export default App;
