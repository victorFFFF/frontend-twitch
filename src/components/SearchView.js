import React, { useState } from "react";

function SearchView({ handleInputChange, updateSearch, searchedGames }) {
  return (
    <div>
      <form className="form" id="addItemForm">
        <input
          type="text"
          className="input"
          placeholder="Search Games"
          onChange={handleInputChange}
        />
        <button className="button is-info" onClick={updateSearch}>
          Search
        </button>
      </form>

      <h1>Top Search Result</h1>
      {searchedGames.map((name, i) => (
        <ol key={i}>
          {" "}
          {i + 1} {name}
        </ol>
      ))}
    </div>
  );
}

export default SearchView;
