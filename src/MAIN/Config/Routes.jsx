import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "../../Config/pages/dashboard/dashboard";
import Config from "../../Config/pages/config/config";
import Hal from "../../Config/pages/hal/hal";
import Job from "../../Config/pages/job/job";
import Img from "../../Config/pages/img/img";
import Report from "../../Config/pages/report/report";
import Login from "../../Config/pages/login/login";
import ConfigOpener from "../../Config/pages/config/config_opener";
import Startup from "../../Config/pages/startup/startup";
import Settings from "../../Config/pages/settings/settings";
import JobList from "../../Config/pages/job/job_list";
import ConfigHalParser from "../../Config/parsers/config_hal/config_hal_parser";
import JobOverview from "../../Config/pages/job/job-overview";
import JobModifier from "../../Config/pages/job/job_modifier";

/**
 * Componente che gestisce le rotte principali dell'applicazione.
 * 
 * @component
 * @param {Object} props - Le proprietà passate al componente.
 * @param {boolean} props.activeNavbar - Lo stato che determina se la navbar è attiva.
 * @param {function} props.onSetActive - Funzione per impostare lo stato della navbar.
 * @returns {React.Element} Il componente contenente le rotte dell'applicazione.
 */
function AppRoutes({ activeNavbar, onSetActive }) {
  return (
    <Routes>
      {/* Rotta principale che redirige a /dashboard */}
      <Route path="/" element={<Navigate to="/dashboard" />} />

      {/* Rotta per la pagina di avvio */}
      <Route path="startup" element={<Startup />} />

      {/* Rotta per la pagina di login */}
      <Route path="/login" element={<Login />} />

      {/* Rotta per il dashboard */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Rotta per la pagina di configurazione */}
      <Route path="/config" element={<Config />} />

      {/* Rotta per aprire la configurazione, con navbar attiva */}
      <Route path="/configopener" element={<ConfigOpener activeNavbar={activeNavbar} onSetActive={onSetActive} />} />

      {/* Rotta per la pagina HAL */}
      <Route path="/hal" element={<Hal />} />

      {/* Rotta per la pagina di configurazione del parser HAL */}
      <Route path="/config-hal-parser" element={<ConfigHalParser activeNavbar={activeNavbar} onSetActive={onSetActive} />} />

      {/* Rotta per la gestione dei job */}
      <Route path="/job" element={<Job />} />

      {/* Rotta per la panoramica dei job */}
      <Route path="/job-overview" element={<JobOverview />} />

      {/* Rotta per la lista dei job */}
      <Route path="/job-list" element={<JobList />} />

      {/* Rotta per modificare un job */}
      <Route path="/job-modifier" element={<JobModifier />} />

      {/* Rotta per la pagina delle immagini */}
      <Route path="/img" element={<Img />} />

      {/* Rotta per la pagina dei report */}
      <Route path="/report" element={<Report />} />

      {/* Rotta per le impostazioni */}
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}

export default AppRoutes;
