import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../../UI/globals/navbar";

/**
 * Wrapper per il componente NavBar che gestisce la visibilità della barra di navigazione
 * in base al percorso corrente della pagina.
 * 
 * @component
 * @param {Object} props - Le proprietà passate al componente.
 * @param {boolean} props.activeNavbar - Indica se la navbar deve essere attiva o meno.
 * @returns {React.Element|null} Il componente NavBar se la visibilità è abilitata, altrimenti null.
 */
function NavBarWrapper({ activeNavbar }) {
  // Ottiene il percorso corrente dalla posizione della route
  const location = useLocation();

  /**
   * Stato che determina se la NavBar deve essere visibile o meno.
   * @type {boolean}
   */
  const [shouldShowNavBar, setShouldShowNavBar] = useState(false);

  useEffect(() => {
    /**
     * Percorsi nei quali la navbar non deve essere visibile.
     * @type {string[]}
     */
    const NonNavbarPaths = ["/login", "/register"];

    // Imposta la visibilità della navbar in base al percorso corrente
    setShouldShowNavBar(!NonNavbarPaths.includes(location.pathname));
  }, [location.pathname]);

  // Rende la NavBar solo se dovrebbe essere visibile
  return shouldShowNavBar ? <NavBar activeNavbar={activeNavbar} /> : null;
}

export default NavBarWrapper;
