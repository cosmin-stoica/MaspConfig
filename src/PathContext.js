//return localStorage.getItem("selectedPath") || "C:\\Sabelt\\Aston Martin\\Collaudo";
import React, { createContext, useContext, useState, useEffect } from "react";

const PathContext = createContext();
export const PathProvider = ({ children }) => {
  const [path, setPath] = useState(() => {
    return localStorage.getItem("selectedPath");
  });
  useEffect(() => {
    localStorage.setItem("selectedPath", path);
  }, [path]);

  const [modTablet, setModTablet] = useState(() => {
    const storedValue = localStorage.getItem("modTablet");
    return storedValue !== null ? storedValue === "true" : true;
  });
  useEffect(() => {
    localStorage.setItem("modTablet", modTablet);
  }, [modTablet]);

  const [lightMode, setLightMode] = useState(() => {
    const storedValue = localStorage.getItem("lightMode");
    return storedValue !== null ? storedValue === "true" : true;
  });

  useEffect(() => {
    localStorage.setItem("lightMode", lightMode);
    if(lightMode)
      document.documentElement.setAttribute("data-theme","light");
    else{
      document.documentElement.removeAttribute("data-theme");
    }
  }, [lightMode]);

  return (
    <PathContext.Provider value={{ path, setPath, modTablet, setModTablet, lightMode, setLightMode }}>
      {children}
    </PathContext.Provider>
  );
};

// Hook per accedere al contesto Path
export const usePath = () => {
  return useContext(PathContext);
};
