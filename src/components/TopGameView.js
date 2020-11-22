import React, { useState } from "react";

function TopGameView({
  gameImage,
  topGames,
  getOAuth,
  updateTopGame,
  updateTopGameImage,
}) {
  return (
    <div>
      <h1>Top Viewed Categories</h1>
      {topGames.map((name, i) => (
        <ol key={i}>
          {" "}
          <img
            src={gameImage[i]}
            alt={"pic"}
            style={{ height: "100px" }}
          />{" "}
          {i + 1} {name}{" "}
        </ol>
      ))}
      <button onClick={getOAuth}> Get new OAuth</button>
      <button onClick={updateTopGame}>Update Top Game</button>
    </div>
  );
}

export default TopGameView;
