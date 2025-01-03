import React, { useState, useEffect } from "react";
import { HashRouter } from "react-router-dom";
import AppRoutes from "./Routes";
import { PathProvider } from "./PathContext";
import NavBarWrapper from "./NavBarWrapper";
import { TCPProvider, useMessages } from "./TCPContext";

/**
 * Componente principale dell'applicazione che gestisce lo stato della navbar e la gestione dei messaggi TCP.
 * 
 * @component
 */
const AppContent = () => {
  /**
   * Stato che determina se la navbar è attiva o meno.
   * @type {boolean}
   */
  const [activeNavbar, setActiveNavbar] = useState(true);
  
  /**
   * Funzione che permette di aggiungere un messaggio tramite il contesto TCP.
   * @function
   * @param {string} data - I dati ricevuti via TCP.
   */
  const { addMessage } = useMessages();

  /**
   * Funzione per aggiornare lo stato della navbar.
   * 
   * @param {boolean} isActive - Indica se la navbar deve essere attiva o meno.
   */
  const handleSetActive = (isActive) => {
    setActiveNavbar(isActive);
  };

  useEffect(() => {
    /**
     * Ascolta i dati TCP in ingresso e li aggiunge al contesto dei messaggi.
     * Viene eseguito al caricamento del componente.
     */
    window.electron.onTcpData((data) => {
      addMessage(data);
      console.log("Dati ricevuti:", data);
    });
  }, [addMessage]);

  return (
    <div className="App">
      {/* Componente NavBarWrapper che riceve lo stato della navbar come prop */}
      <NavBarWrapper activeNavbar={activeNavbar} />
      {/* Componente per la gestione delle route, con lo stato della navbar */}
      <AppRoutes activeNavbar={activeNavbar} onSetActive={handleSetActive} />
    </div>
  );
};

/**
 * Componente di livello superiore che gestisce il routing, i contesti e l'applicazione principale.
 * 
 * @component
 */
function App({isReport}) {
  return (
    <HashRouter>
      {/* PathProvider gestisce il contesto relativo ai percorsi */}
      <PathProvider isReport={isReport}>
        {/* TCPProvider gestisce il contesto relativo alla comunicazione TCP */}
        <TCPProvider>
          <AppContent />
        </TCPProvider>
      </PathProvider>
    </HashRouter>
  );
}

export default App;
