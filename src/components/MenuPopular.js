import React, { useState } from "react";

// router
import { withRouter } from "react-router-dom";

// styling
import "./MenuSearch.css";

const MenuPopular = (props) => {
  // conditionally render dropdown affect based on this boolean
  const [openMenu, setOpenMenu] = useState(false);

  // parameter num corresponds to .open-# classes
  // is assigned when Menu clicked triggering animated dropdown
  const setClassNames = (num) => {
    const classArr = ["m-item"];
    if (openMenu) classArr.push(`open-${num}`);
    return classArr.join(" ");
  };

  // takes route string as parameter
  const pushToRoute = (route) => {
    props.history.push(route);
    setOpenMenu(false);
  };

  return (
    <div className="Menu">
      <div className={"m-item m-logo"} onClick={() => setOpenMenu(!openMenu)}>
        Popular
      </div>
      <div
        className={setClassNames(1)}
        onClick={() => pushToRoute("/popularGames")}
      >
        Category
      </div>
      <div
        className={setClassNames(2)}
        onClick={() => pushToRoute("/popularStreams")}
      >
        Channel
      </div>
      {/* <div className={setClassNames(3)} onClick={() => pushToRoute("/")}>
        Sign out
      </div> */}
    </div>
  );
};

export default withRouter(MenuPopular);
