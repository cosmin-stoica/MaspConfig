import React, { createContext, useState, useContext, useEffect } from "react";

// Creazione del context per la gestione dei messaggi TCP
const MessagesContext = createContext();

/**
 * Provider per il context dei messaggi TCP.
 * Gestisce lo stato dei messaggi, dell'IP e della porta del client.
 * 
 * @component
 * @param {Object} props - Le proprietà passate al componente.
 * @param {ReactNode} props.children - I componenti figli che riceveranno il context.
 * @returns {React.Element} Il componente che fornisce il context dei messaggi TCP.
 */
export const TCPProvider = ({ children }) => {
  /**
   * Stato che contiene i messaggi ricevuti.
   * 
   * @type {Array}
   */
  const [messages, setMessages] = useState([]);

  /**
   * Stato per l'indirizzo IP del client. Il valore iniziale viene recuperato da localStorage.
   * 
   * @type {string}
   */
  const [clientIP, setClientIP] = useState(() => {
    return localStorage.getItem("clientIP") || "127.0.0.1";
  });

  /**
   * Stato per la porta del client. Il valore iniziale viene recuperato da localStorage.
   * 
   * @type {string}
   */
  const [clientPort, setClientPort] = useState(() => {
    return localStorage.getItem("clientPort") || "3001";
  });

  /**
   * Salva l'indirizzo IP del client in localStorage ogni volta che cambia.
   * 
   * @effect
   */
  useEffect(() => {
    localStorage.setItem("clientIP", clientIP);
  }, [clientIP]);

  /**
   * Salva la porta del client in localStorage ogni volta che cambia.
   * 
   * @effect
   */
  useEffect(() => {
    localStorage.setItem("clientPort", clientPort);
  }, [clientPort]);

  /**
   * Aggiunge un nuovo messaggio alla lista dei messaggi.
   * 
   * @function
   * @param {string} message - Il messaggio ricevuto.
   */
  const addMessage = (message) => {
    setMessages(message);
  };

  return (
    <MessagesContext.Provider value={{ messages, addMessage, clientIP, setClientIP, clientPort, setClientPort }}>
      {children}
    </MessagesContext.Provider>
  );
};

/**
 * Hook per accedere al context dei messaggi TCP.
 * 
 * @returns {Object} Oggetto con i messaggi, le funzioni per aggiungere messaggi e per gestire l'IP e la porta del client.
 */
export const useMessages = () => useContext(MessagesContext);
