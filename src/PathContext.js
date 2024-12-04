import React, { createContext, useContext, useState, useEffect } from "react";

const PathContext = createContext();

export const PathProvider = ({ children }) => {
  const [path, setPath] = useState(() => {
    //return localStorage.getItem("selectedPath") || "C:\\Sabelt\\Aston Martin\\Collaudo";
    return localStorage.getItem("selectedPath");
  });

  useEffect(() => {
    localStorage.setItem("selectedPath", path);
  }, [path]);

  return (
    <PathContext.Provider value={{ path, setPath }}>
      {children}
    </PathContext.Provider>
  );
};

export const usePath = () => {
  return useContext(PathContext);
};
