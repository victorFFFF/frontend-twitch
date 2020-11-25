import "../App.css";
import { Link } from "react-router-dom";

function Nav() {
  const navStyle = {
    color: "White",
  };

  return (
    <nav>
      <ul className="nav-links">
        <Link style={navStyle} to="/">
          <li>Home</li>
        </Link>
        <Link style={navStyle} to="/search">
          <li>Search</li>
        </Link>
      </ul>
    </nav>
  );
}

export default Nav;
