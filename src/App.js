import React from "react";
import { HashRouter } from "react-router-dom";
import AppRoutes from "./Routes";
import NavBar from "./globals/navbar";
import { PathProvider } from "./PathContext";
import NavBarWrapper from "./NavBarWrapper";

function App() {
  return (
    <HashRouter>
      <PathProvider>
        <div className="App">
          <NavBarWrapper />
          <AppRoutes />
        </div>
      </PathProvider>
    </HashRouter>
  );
}

export default App;
