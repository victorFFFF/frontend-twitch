import React from "react";
import TheRoutes from "./Routes/TheRoutes";
import Nav from "./components/Nav";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div>
      <Nav></Nav>
      <TheRoutes></TheRoutes>
    </div>
  );
}

export default App;
