import React, { useState } from "react";

function TopGameView({ topGames, getOAuth, updateTopGame }) {
  return (
    <div>
      <h1>Top Viewed Categories</h1>
      {topGames.map((element, i) => (
        <ol key={i}>
          {" "}
          <img
            src={element.picUrl}
            alt={"pic"}
            style={{ height: "100px" }}
          />{" "}
          {i + 1} {element.gameName}{" "}
        </ol>
      ))}
      <button onClick={getOAuth}> Get new OAuth</button>
      <button onClick={updateTopGame}>Update Top Game</button>
    </div>
  );
}

export default TopGameView;
