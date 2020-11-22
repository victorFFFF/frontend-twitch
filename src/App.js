import React, { Component } from "react";
import axios from "axios";
import TopGameView from "./components/TopGameView";
import SearchView from "./components/SearchView";

class App extends Component {
  constructor() {
    super();

    this.state = {
      oAuth: "",
      topGames: [],
      searchInput: "",
      searchedGames: [],
      gameImage: [],
    };
    this.updateTopGame = this.updateTopGame.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getOAuth = this.getOAuth.bind(this);
    this.updateTopGameImage = this.updateTopGameImage.bind(this);
  }

  //Get new OAuthenitcation key
  getOAuth() {
    axios.get("oAuth").then((response) => {
      const data = response.data;
      this.setState({ oAuth: data });
      console.log(data);
      console.log("oAuth : " + this.oAuth);
    });
  }

  //Update top game
  updateTopGame() {
    this.setState({ topGames: [], gameImage: [] });
    axios
      .get("https://api.twitch.tv/helix/games/top", {
        headers: {
          "Client-ID": `${process.env.REACT_APP_CLIENTID}`,
          Authorization: `Bearer ${process.env.REACT_APP_OAUTHTOKEN}`,
        },
      })
      .then((response) => {
        const result = response.data;
        console.log(result.data);
        for (let i = 0; i < result.data.length; i++) {
          this.setState({
            topGames: [...this.state.topGames, result.data[i].name],
          });
        }
      });
  }

  //Update image
  updateTopGameImage() {
    console.log("TOP");
    console.log(this.state.topGames);
    for (let i = 0; i < 20; i++) {
      axios
        .get(
          `https://api.twitch.tv/helix/search/categories?query=${this.state.topGames[i]}`,
          {
            headers: {
              "Client-ID": `${process.env.REACT_APP_CLIENTID}`,
              Authorization: `Bearer ${process.env.REACT_APP_OAUTHTOKEN}`,
            },
          }
        )
        .then((response) => {
          const result = response.data;
          this.setState({
            gameImage: [...this.state.gameImage, result.data[0].box_art_url],
          });
        });
    }
  }

  //search for games matching input
  updateSearch(e) {
    e.preventDefault();
    this.setState({ searchedGames: [] });
    axios
      .get(
        "https://api.twitch.tv/helix/search/categories?query=" +
          this.state.searchInput,
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
          this.setState({
            searchedGames: [
              ...this.state.searchedGames,
              result.data[i].box_art_url,
            ],
          });
        }
      });
  }

  handleInputChange(e) {
    this.setState({ searchInput: e.target.value });
  }

  componentWillMount = () => {
    this.updateTopGame();
  };

  componentDidMount = () => {
    this.updateTopGameImage();
  };

  render() {
    // console.log(this.state.gameImage);
    return (
      <div>
        <SearchView
          searchedGames={this.state.searchedGames}
          updateSearch={this.updateSearch}
          handleInputChange={this.handleInputChange}
        />
        <TopGameView
          topGames={this.state.topGames}
          updateTopGame={this.updateTopGame}
          getOAuth={this.getOAuth}
          gameImage={this.state.gameImage}
        />
      </div>
    );
  }
}

export default App;
