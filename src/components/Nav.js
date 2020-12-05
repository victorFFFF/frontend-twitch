import "../App.css";
import { Link } from "react-router-dom";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import Button from "react-bootstrap/Button";
import MenuSearch from "./MenuSearch";
import MenuPopular from "./MenuPopular";

function Nav() {
  const navStyle = {
    color: "White",
    textDecoration: "none",
  };
  console.log("NAV");
  return (
    <nav>
      <ul className="nav-links">
        <Link style={navStyle} to="/">
          <li>Home</li>
        </Link>

        <MenuSearch />
        <MenuPopular />
      </ul>
    </nav>
  );
}

export default Nav;
