import React from "react";
import ReactDOM from "react-dom/client";
import './index.css';
import App from './MAIN/Config/App';
import ReportApp from "./MAIN/Report/ReportApp";

/**
 * Crea e renderizza il componente principale dell'applicazione.
 * 
 * @function
 */
const root = ReactDOM.createRoot(document.getElementById('root'));


/**
 * Renderizza il componente App all'interno del nodo root con React.StrictMode abilitato.
 * 
 * @description
 * React.StrictMode è un wrapper che aiuta a identificare potenziali problemi nel codice durante lo sviluppo.
 */

if (!window.electron || !window.electron.getIsReport) {
  console.error("window.electron o getIsReport non è definito.");
} else {
  const storedIsReport = sessionStorage.getItem("isReport");

  if (storedIsReport !== null) {
    // Usa il valore salvato in sessionStorage
    const isReport = storedIsReport === "true";
    document.title = isReport ? "Masp Report" : "Masp Config";
    const SelectedApp = isReport ? ReportApp : App;

    root.render(
      <React.StrictMode>
        <SelectedApp />
      </React.StrictMode>
    );
  } else {
    // Recupera il valore da Electron
    window.electron.getIsReport().then((isReport) => {
      sessionStorage.setItem("isReport", isReport);
      document.title = isReport ? "Masp Report" : "Masp Config";
      const SelectedApp = isReport ? ReportApp : App;

      root.render(
        <React.StrictMode>
          <SelectedApp />
        </React.StrictMode>
      );
    }).catch((error) => {
      console.error("Errore durante il recupero di isReport:", error);
    });
  }
}
