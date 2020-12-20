import "../App.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";

export default function Login() {
  return (
    <div className="centerMiddle3">
      User: <input placeholder="UserName" />
      <br></br>
      Password: <input placeholder="Password" />
      <button>Login</button>
      <br></br>
      <br></br>
      Dont' have a account?
      <br></br>
      <Link to="/register">Register Here!</Link>
    </div>
  );
}
