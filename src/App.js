import React, { useState, useEffect } from "react";
import TheRoutes from "./Routes/TheRoutes";
import Nav from "./components/Nav";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

export const MessageContext = React.createContext({
  message: "",
  setMessage: () => {},
});

function App() {
  const [message, setMessage] = useState("");
  const value = { message, setMessage };
  const history = useHistory("");
  const [style, setStyle] = useState("");

  const getUser = () => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:3001/user",
    })
      .then((res) => {
        {
          console.log(res);
          if (res.data.username != null) {
            setMessage("Welcome " + res.data.username);
            setStyle("");
          } else setStyle("none");
        }
      })
      .catch((err) => console.log(err));
  };

  const logout = async () => {
    await axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:3001/logout",
    }).then((res) => {
      // setSession(false);
      setMessage("");
      history.push("/");
    });
  };

  useEffect(() => {
    getUser();
  });

  return (
    <div>
      <MessageContext.Provider value={value}>
        <Nav></Nav>
        <h4 className="greeting">{message}</h4>
        <button onClick={logout} style={{ display: `${style}` }}>
          logout
        </button>
        <TheRoutes></TheRoutes>
      </MessageContext.Provider>
    </div>
  );
}

export default App;
