import React, { useState, useEffect } from "react";
import { HashRouter } from "react-router-dom";
import AppRoutes from "./Routes";
import { PathProvider } from "./PathContext";
import NavBarWrapper from "./NavBarWrapper";
import { TCPProvider, useMessages } from "./TCPContext";

const AppContent = () => {
  const [activeNavbar, setActiveNavbar] = useState(true);
  const { addMessage } = useMessages();

  const handleSetActive = (isActive) => {
    setActiveNavbar(isActive);
  };

  useEffect(() => {
    window.electron.onTcpData((data) => {
      addMessage(data);
      console.log("Dati ricevuti:", data);
    });
  }, [addMessage]);

  return (
    <div className="App">
      <NavBarWrapper activeNavbar={activeNavbar} />
      <AppRoutes activeNavbar={activeNavbar} onSetActive={handleSetActive} />
    </div>
  );
};

function App() {
  return (
    <HashRouter>
      <PathProvider>
        <TCPProvider>
          <AppContent />
        </TCPProvider>
      </PathProvider>
    </HashRouter>
  );
}

export default App;
