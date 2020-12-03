import React, { useState } from "react";
import axios from "axios";
import "../App.css";
import { Link } from "react-router-dom";

function Search() {
  return (
    <div class="centerMiddle">
      <Link to="/searchGame">
        <button>Search Games</button>
      </Link>
      <Link to="/searchChannel">
        <button>Search Channels</button>
      </Link>
    </div>
  );
}

export default Search;
