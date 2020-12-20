import "../App.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";

export default function Register() {
  return (
    <div className="centerMiddle3">
      User: <input placeholder="UserName" />
      <br></br>
      Password: <input placeholder="Password" />
      Verifiy Password: <input placeholder="Verify password" />
      <button>Register</button>
      <br></br>
      <br></br>
      Already a member?
      <br></br>
      <Link to="/login">Login Here!</Link>
    </div>
  );
}
