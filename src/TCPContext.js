import React, { createContext, useState, useContext, useEffect } from "react";

// Creazione del context
const MessagesContext = createContext();

// Provider per il context
export const TCPProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [clientIP, setClientIP] = useState(() => {
    return localStorage.getItem("clientIP") || "127.0.0.1";
  });
  const [clientPort, setClientPort] = useState(() => {
    return localStorage.getItem("clientPort") || "3001";
  });

  useEffect(() => {
    localStorage.setItem("clientIP", clientIP);
  }, [clientIP]);
  useEffect(() => {
    localStorage.setItem("clientPort", clientPort);
  }, [clientPort]);


  const addMessage = (message) => {
    setMessages(message);
  };

  return (
    <MessagesContext.Provider value={{ messages, addMessage, clientIP, setClientIP, clientPort, setClientPort }}>
      {children}
    </MessagesContext.Provider>
  );
};

// Hook per utilizzare il context più facilmente
export const useMessages = () => useContext(MessagesContext);

