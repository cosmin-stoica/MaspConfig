import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "../../UI/Report/pages/dashboard/dashboard";
import ListaReport from "../../UI/Report/pages/lista/listaReport";
import Settings from "../../UI/Config/pages/settings/settings"

/**
 * Componente che gestisce le rotte principali dell'applicazione.
 * 
 * @component
 * @returns {React.Element} Il componente contenente le rotte dell'applicazione.
 */
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/lista" element={<ListaReport/>} />
      <Route path="/settings" element={<Settings/>} />
    </Routes>
  );
}

export default AppRoutes;
