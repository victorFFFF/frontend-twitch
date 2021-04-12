import "../App.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [username, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const inputUser = (e) => {
    e.preventDefault();
    setUser(e.target.value);
  };

  const inputPW = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const loginTheUser = async () => {
    await axios({
      method: "POST",
      data: {
        username: username,
        password: password,
      },
      withCredentials: true,
      url: "https://victor-twitch-server.herokuapp.com/login",
    }).then((res) => console.log(res));

    await axios({
      method: "GET",
      withCredentials: true,
      url: "https://victor-twitch-server.herokuapp.com/user",
    }).then((res) => setName(res.data.username));
  };

  useEffect(() => {}, [name]);
  return (
    <div className="centerMiddle3">
      {name ? <h1>Hello {name}</h1> : null}
      User: <input placeholder="UserName" onChange={inputUser} />
      <br></br>
      Password:
      <input
        placeholder="Password"
        type="password"
        name="password"
        onChange={inputPW}
      />
      <button onClick={loginTheUser}>Login</button>
      <br></br>
      <br></br>
      Dont' have a account?
      <br></br>
      <Link to="/register">Register Here!</Link>
    </div>
  );
}
