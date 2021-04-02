import "../App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";

export default function Home() {
  const [oAuth, setAuth] = useState("");

  //Get new OAuthenitcation key
  const getOAuth = () => {
    axios.get("oAuth").then((response) => {
      const data = response.data;
      setAuth(data);
      console.log("oAuth : " + oAuth);
    });

    axios
      .get("https://api.twitch.tv/helix/moderation/moderators")
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <div className="centerMiddleText">
      <h3>
        Welcome to Victor Twitch website. This website utilizies Twitch API to
        get information.
      </h3>
      {/* {
        <Button variant="info" onClick={getOAuth}>
          Get new OAuth
        </Button>
      }
      {<h3>{"OAuth :" + oAuth}</h3>} */}
    </div>
  );
}
