import "../App.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";

export default function Register() {
  const [userLogin, setUser] = useState("");
  const [passwordLogin, setPassword] = useState("");
  const [passwordLoginVerify, setPasswordVerify] = useState("");

  const inputUser = (e) => {
    e.preventDefault();
    setUser(e.target.value);
  };

  const inputPW = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const inputPWVerify = (e) => {
    e.preventDefault();
    setPasswordVerify(e.target.value);
  };

  const register = () => {
    if (passwordLogin !== passwordLoginVerify) {
      console.log("password has to match");
    } else {
      axios
        .post(
          "http://localhost:3001/User/register/",
          { userLogin, passwordLogin },
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
    }
  };

  return (
    <div className="centerMiddle3">
      User: <input placeholder="UserName" onChange={inputUser} />
      <br></br>
      Password:{" "}
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={inputPW}
      />
      Verifiy Password:{" "}
      <input
        type="password"
        name="password"
        placeholder="Verify password"
        onChange={inputPWVerify}
      />
      <button onClick={register}>Register</button>
      <br></br>
      <br></br>
      Already a member?
      <br></br>
      <Link to="/login">Login Here!</Link>
    </div>
  );
}
