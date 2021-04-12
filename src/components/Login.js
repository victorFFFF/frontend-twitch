import "../App.css";
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { MessageContext } from "../App";

export default function Login() {
  const [username, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { message, setMessage } = useContext(MessageContext);

  const inputUser = (e) => {
    e.preventDefault();
    setUser(e.target.value);
  };

  const inputPW = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const getUser = () => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:3001/user",
    }).then((res) => {
      {
        setName(res.data.username);
        if (res.data.username != null)
          setMessage("Welcome " + res.data.username);
      }
    });
  };

  const loginTheUser = async () => {
    await axios({
      method: "POST",
      data: {
        username: username,
        password: password,
      },
      withCredentials: true,
      url: "http://localhost:3001/login",
    }).then((res) => console.log(res.data));

    await getUser();
  };

  useEffect(() => {
    getUser();
  }, [name]);
  return (
    <div className="centerMiddle3">
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
