import React, { createContext, useContext, useState, useEffect } from "react";

// Crea un contesto per gestire e condividere il percorso e altre impostazioni
const PathContext = createContext();

/**
 * Provider del contesto Path che gestisce la logica di memorizzazione e recupero dei dati 
 * come il percorso, la modalità tablet e la modalità luminosa nel localStorage e tramite Electron.
 * 
 * @component
 * @param {Object} props - Le proprietà passate al componente.
 * @param {ReactNode} props.children - I componenti figli che riceveranno il contesto.
 * @returns {React.Element} Il componente che fornisce il contesto Path.
 */
export const PathProvider = ({ children }) => {
  /**
   * Stato che contiene il percorso selezionato.
   * Recupera il valore iniziale dal localStorage.
   * 
   * @type {string}
   */
  const [path, setPath] = useState(() => {
    return localStorage.getItem("selectedPath");
  });

  /**
   * Salva il valore `path` nel localStorage ogni volta che cambia.
   * 
   * @effect
   */
  useEffect(() => {
    if (path) {
      localStorage.setItem("selectedPath", path);
    }
  }, [path]);

  /**
   * Recupera il valore del percorso da Electron (se esiste) e lo imposta nello stato.
   * 
   * @effect
   */
  useEffect(() => {
    if (window.electron) {
      window.electron.onPathValue((value) => {
        if (value) {
          setPath(value); // Imposta il valore da Electron
          console.log("Valore di path ricevuto:", value);
        }
      });
    }
  }, []);

  /**
   * Stato che gestisce la modalità tablet (modifica la visualizzazione).
   * Il valore iniziale viene recuperato dal localStorage.
   * 
   * @type {boolean}
   */
  const [modTablet, setModTablet] = useState(() => {
    const storedValue = localStorage.getItem("modTablet");
    return storedValue !== null ? storedValue === "true" : true;
  });

  /**
   * Salva il valore di `modTablet` nel localStorage ogni volta che cambia.
   * 
   * @effect
   */
  useEffect(() => {
    localStorage.setItem("modTablet", modTablet);
  }, [modTablet]);

  /**
   * Stato che gestisce la modalità luminosa (light mode).
   * Il valore iniziale viene recuperato dal localStorage.
   * 
   * @type {boolean}
   */
  const [lightMode, setLightMode] = useState(() => {
    const storedValue = localStorage.getItem("lightMode");
    return storedValue !== null ? storedValue === "true" : false;
  });

  /**
   * Salva il valore di `lightMode` nel localStorage e applica il tema al documento.
   * 
   * @effect
   */
  useEffect(() => {
    localStorage.setItem("lightMode", lightMode);
    if (lightMode) document.documentElement.setAttribute("data-theme", "light");
    else {
      document.documentElement.removeAttribute("data-theme");
    }
  }, [lightMode]);

  return (
    <PathContext.Provider
      value={{
        path,
        setPath,
        modTablet,
        setModTablet,
        lightMode,
        setLightMode,
      }}
    >
      {children}
    </PathContext.Provider>
  );
};

/**
 * Hook per accedere al contesto Path.
 * 
 * @returns {Object} I valori del contesto Path, inclusi `path`, `setPath`, `modTablet`, `setModTablet`, `lightMode`, `setLightMode`.
 */
export const usePath = () => {
  return useContext(PathContext);
};
