import "../App.css";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [username, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [passwordLoginVerify, setPasswordVerify] = useState("");
  const history = useHistory();
  const [status, setStatus] = useState("");

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

  const registerUser = () => {
    if (password !== passwordLoginVerify) {
      setStatus("Password has to match!");
    } else {
      axios({
        method: "post",
        data: {
          username: username,
          password: password,
        },
        withCredentials: true,
        url: "http://localhost:3001/register",
      }).then((res) => {
        if (res.data === "User Already Exists")
          setStatus("Username already exist");
        else {
          setStatus("");
          history.push("/login");
        }
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
      <button className="btn btn-success" onClick={registerUser}>
        Register
      </button>
      <p style={{ color: "red" }}> {status ? status : ""} </p>
      Already a member?
      <br></br>
      <Link to="/login">Login Here!</Link>
    </div>
  );
}
