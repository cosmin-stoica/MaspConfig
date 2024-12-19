//return localStorage.getItem("selectedPath") || "C:\\Sabelt\\Aston Martin\\Collaudo";
import React, { createContext, useContext, useState, useEffect } from "react";

const PathContext = createContext();
export const PathProvider = ({ children }) => {
  const [path, setPath] = useState(() => {
    return localStorage.getItem("selectedPath");
  });

  // Salva il valore `path` in localStorage ogni volta che cambia
  useEffect(() => {
    if (path) {
      localStorage.setItem("selectedPath", path);
    }
  }, [path]);

  // Recupera il valore da Electron (se esiste) e lo imposta
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

  const [modTablet, setModTablet] = useState(() => {
    const storedValue = localStorage.getItem("modTablet");
    return storedValue !== null ? storedValue === "true" : true;
  });
  useEffect(() => {
    localStorage.setItem("modTablet", modTablet);
  }, [modTablet]);

  const [lightMode, setLightMode] = useState(() => {
    const storedValue = localStorage.getItem("lightMode");
    return storedValue !== null ? storedValue === "true" : false;
  });

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

// Hook per accedere al contesto Path
export const usePath = () => {
  return useContext(PathContext);
};
