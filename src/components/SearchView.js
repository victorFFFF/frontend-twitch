
import React, {Component} from 'react';


class SearchView extends Component {    

    render(){
        return (
            <div>
            <form className="form" id="addItemForm">
            <input type="text" className="input" placeholder="Search Games" onChange={this.props.handleInputChange}/>
            <button className="button is-info" onClick={this.props.updateSearch}>
              Search
            </button>
          </form>
        
            <h1>Top Search Result</h1>
            {this.props.searchedGames.map((name,i) =>
            <ol key={i}> {i+1} {name}</ol>)}
            
    </div>

      
        );
        }

}

export default SearchView;