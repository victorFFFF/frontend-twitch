import "../App.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";

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

  console.log("USER " + userLogin);
  console.log("Password " + passwordLogin);
  return (
    <div className="centerMiddle3">
      User: <input placeholder="UserName" onChange={inputUser} />
      <br></br>
      Password: <input placeholder="Password" onChange={inputPW} />
      <button>Login</button>
      <br></br>
      <br></br>
      Dont' have a account?
      <br></br>
      <Link to="/register">Register Here!</Link>
    </div>
  );
}
