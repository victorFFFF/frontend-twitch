
import React, {Component} from 'react';


class TopGameView extends Component {    

    render(){
        return (
            <div>
              <h1>Top Viewed Categories</h1>
            {this.props.topGames.map((name,i) =>
            <ol key={i}> <img src={this.props.gameImage[i]} style={{height: "100px"}}/> {i+1} {name} </ol> 
            )}
            <button onClick={this.props.getOAuth}> Get new OAuth</button>
            <button onClick={this.props.updateTopGame}>Update Top Game</button>
          </div>
      
        );
        }

}

export default TopGameView;