import "../App.css";
import { Link } from "react-router-dom";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import Button from "react-bootstrap/Button";
import MenuSearch from "./MenuSearch";

function Nav() {
  const navStyle = {
    color: "White",
    textDecoration: "none",
  };

  const options = ["Search Game", "Search Channel"];

  return (
    <nav>
      <ul className="nav-links">
        <Link style={navStyle} to="/">
          <li>Home</li>
        </Link>

        <MenuSearch />
      </ul>
    </nav>
  );
}

export default Nav;
