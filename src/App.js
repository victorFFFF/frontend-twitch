
import './App.css';
import React, {Component} from 'react';
import axios from "axios";
import api from "./api";

class App extends Component {
  constructor() {
    super();

    this.state = {
      oAuth: "",
      topGames: []
      }
    }


     getOAuth () {
      axios
      .get('oAuth')
      .then((response) =>{
        const data = response.data;
        this.setState({oAuth : data})
        console.log(data);  
        console.log( "oAuth : " + this.oAuth)    
      })
  
    }


    componentDidMount = () =>{
    
      // axios.get('https://api.twitch.tv/helix/games/top',{
      // headers:{
      //   "Client-ID": `${process.env.REACT_APP_CLIENTID}`,
      //   "Authorization": `Bearer ${process.env.REACT_APP_OAUTHTOKEN} `}
      // })
      // .then( (response) => {
      //   const data = response.data;
      //   console.log(data);
      //   console.log(data.data.length)
      // })
      // }
      try{
      const fetchData = async () =>{
        const result = await api.get('https://api.twitch.tv/helix/games/top')
        console.log(result.data);
        for(let i = 0 ; i < result.data.data.length; i++)
        {
          this.setState({
            topGames: [...this.state.topGames, result.data.data[i].name]}
            )
        }
        }
        fetchData();
      }
      catch(e){
        console.log("Expired oAuth token")

        axios
            .get('oAuth')
            .then((response) =>{
              const data = response.data;
              console.log(data);      
            })
      }
    }  

  

  render(){
  return (
    <div>
      <button onClick={this.getOAuth}> Get new OAuth</button>
      <h1>{this.state.topGames}</h1>
      <h1>ok</h1>
    </div>

  );
  }
}

export default App;
