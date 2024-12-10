import React, { createContext, useState, useContext } from "react";

// Creazione del context
const MessagesContext = createContext();

// Provider per il context
export const TCPProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  const addMessage = (message) => {
    setMessages(message);
  };

  return (
    <MessagesContext.Provider value={{ messages, addMessage }}>
      {children}
    </MessagesContext.Provider>
  );
};

// Hook per utilizzare il context più facilmente
export const useMessages = () => useContext(MessagesContext);
