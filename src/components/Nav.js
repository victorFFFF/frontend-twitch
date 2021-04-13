import "../App.css";
import { Link } from "react-router-dom";
import "react-dropdown/style.css";
import MenuSearch from "./MenuSearch";
import MenuPopular from "./MenuPopular";
import "./MenuSearch.css";
import React, { useState, useEffect } from "react";
import Axios from "axios";

function Nav() {
  const [style, setStyle] = useState("");

  useEffect(() => {
    Axios.get("online").then((response) => {
      if (response.data) setStyle("none");
      else setStyle("");

      console.log(response.data);
    });
  });

  return (
    <nav>
      <ul className="nav-links">
        <div className="Menu">
          <Link className={"m-item m-logo"} to="/">
            <li>Home</li>
          </Link>
        </div>

        <MenuSearch />
        <MenuPopular />
        <div className="Menu">
          <Link
            className={"m-item m-logo"}
            to="/login"
            style={{ display: `${style}` }}
          >
            <li>Login</li>
          </Link>
        </div>
      </ul>
    </nav>
  );
}

export default Nav;
