import "../App.css";
import { Link } from "react-router-dom";
import "react-dropdown/style.css";
import MenuSearch from "./MenuSearch";
import MenuPopular from "./MenuPopular";
import "./MenuSearch.css";

function Nav() {
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
          <Link className={"m-item m-logo"} to="/login">
            <li>Login</li>
          </Link>
        </div>
      </ul>
    </nav>
  );
}

export default Nav;
