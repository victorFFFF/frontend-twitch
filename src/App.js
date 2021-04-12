import React, { useState, useEffect } from "react";
import TheRoutes from "./Routes/TheRoutes";
import Nav from "./components/Nav";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

export const MessageContext = React.createContext({
  message: "Welcome",
  setMessage: () => {},
});

function App() {
  const [message, setMessage] = useState("Welcome");
  const value = { message, setMessage };

  return (
    <div>
      <MessageContext.Provider value={value}>
        <Nav></Nav>
        <h4 className="greeting">{message}</h4>
        <TheRoutes></TheRoutes>
      </MessageContext.Provider>
    </div>
  );
}

export default App;
