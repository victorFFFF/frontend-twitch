import "../App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [oAuth, setAuth] = useState("");

  //Get new OAuthenitcation key
  const getOAuth = () => {
    axios.get("oAuth").then((response) => {
      const data = response.data;
      setAuth(data);
      console.log("oAuth : " + oAuth);
    });
  };
  return (
    <div className="center">
      <h3>
        Welcome to a third party Website that utilizies Twitch API to get
        information.
      </h3>
      <button onClick={getOAuth}> Get new OAuth</button>
    </div>
  );
}
