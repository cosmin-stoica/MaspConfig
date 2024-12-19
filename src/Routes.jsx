import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./pages/dashboard/dashboard";
import Config from "./pages/config/config";
import Hal from "./pages/hal/hal";
import Job from "./pages/job/job";
import Img from "./pages/img/img";
import Report from "./pages/report/report";
import Login from "./pages/login/login";
import ConfigOpener from "./pages/config/config_opener";
import Startup from "./pages/startup/startup";
import Settings from "./pages/settings/settings";
import JobList from "./pages/job/job_list";
import ConfigHalParser from "./parsers/config_hal/config_hal_parser";
import JobOverview from "./pages/job/job-overview";
import JobModifier from "./pages/job/job_modifier";

function AppRoutes({ activeNavbar, onSetActive }) {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="startup" element={<Startup/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/config" element={<Config />} />
      <Route path="/configopener" element={<ConfigOpener activeNavbar={activeNavbar} onSetActive={onSetActive}/>} />
      <Route path="/hal" element={<Hal />} />
      <Route path="/config-hal-parser" element={<ConfigHalParser activeNavbar={activeNavbar} onSetActive={onSetActive}/>}  />
      <Route path="/job" element={<Job />} />
      <Route path="/job-overview" element={<JobOverview />} />
      <Route path="/job-list" element={<JobList />} />
      <Route path="/job-modifier" element={<JobModifier />} />
      <Route path="/img" element={<Img />} />
      <Route path="/report" element={<Report />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}

export default AppRoutes;
