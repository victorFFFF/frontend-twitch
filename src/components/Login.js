import "../App.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [userLogin, setUser] = useState("");
  const [passwordLogin, setPassword] = useState("");

  const inputUser = (e) => {
    e.preventDefault();
    setUser(e.target.value);
  };

  const inputPW = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const loginTheUser = () => {
    axios
      .post(
        "http://localhost:3001/User/login/",
        {
          userLogin,
          passwordLogin,
        },
        {
          headers: {
            withCredentials: true,
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="centerMiddle3">
      User: <input placeholder="UserName" onChange={inputUser} />
      <br></br>
      Password: <input placeholder="Password" onChange={inputPW} />
      <button onClick={loginTheUser}>Login</button>
      <br></br>
      <br></br>
      Dont' have a account?
      <br></br>
      <Link to="/register">Register Here!</Link>
    </div>
  );
}
