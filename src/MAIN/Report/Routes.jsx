import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "../../UI/Report/pages/dashboard/dashboard";
import ListaReport from "../../UI/Report/pages/lista/listaReport";
import Settings from "../../UI/Config/pages/settings/settings"
import Setup from "../../UI/Report/pages/setup/setup";
import ConfigHalParser from "../../UI/Config/parsers/config_hal/config_hal_parser"
import { useState } from "react";

/**
 * Componente che gestisce le rotte principali dell'applicazione.
 * 
 * @component
 * @returns {React.Element} Il componente contenente le rotte dell'applicazione.
 */
function AppRoutes() {

  const [activeNavbar, setActiveNavbar] = useState(false)

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/lista" element={<ListaReport/>} />
      <Route path="/settings" element={<Settings/>} />
      <Route path="/setup" element={<Setup/>} />
      <Route path="/configopener" element={<ConfigHalParser activeNavbar={activeNavbar} onSetActive={setActiveNavbar} />} />
    </Routes>
  );
}

export default AppRoutes;
