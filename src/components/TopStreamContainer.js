import React, { useState, useEffect } from "react";
import axios from "axios";
import TopStreamView from "./TopStreamView";

function TopStreamContainer() {
  const [topStream, updateTopStream] = useState([
    {
      userName: "",
      viewCount: "",
      gameName: "",
      title: "",
      liveSince: "",
      language: "",
      pic: "",
    },
  ]);

  //Update top game names
  const getTopStream = async () => {
    //get game names
    updateTopStream([]);
    await axios
      .get("https://api.twitch.tv/helix/streams", {
        headers: {
          "Client-ID": `${process.env.REACT_APP_CLIENTID}`,
          Authorization: `Bearer ${process.env.REACT_APP_OAUTHTOKEN}`,
        },
      })
      .then((response) => {
        const result = response.data.data;
        console.log(result);
        for (let i = 0; i < result.length; i++) {
          updateTopStream((prevState) => [
            ...prevState,
            {
              userName: result[i].user_name,
              viewCount: result[i].viewer_count,
              gameName: result[i].game_name,
              title: result[i].title,
              liveSince: result[i].started_at,
              language: result[i].language,
              pic: result[i].thumbnail_url.replace(
                "{width}x{height}",
                "600x300"
              ),
            },
          ]);
        }
      });
  };

  useEffect(() => {
    getTopStream();
  }, []);

  return <TopStreamView topStream={topStream} />;
}

export default TopStreamContainer;
