import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./pages/dashboard/dashboard";
import Config from "./pages/config/config";
import Hal from "./pages/hal/hal";
import Job from "./pages/job/job";
import Img from "./pages/img/img";
import Doc from "./pages/doc/doc";
import Login from "./pages/login/login";
import ConfigOpener from "./pages/config/config_opener";
import HalParser from "./parsers/hal/hal_parser";
import Startup from "./pages/startup/startup";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="startup" element={<Startup/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/config" element={<Config />} />
      <Route path="/configopener" element={<ConfigOpener />} />
      <Route path="/hal" element={<Hal />} />
      <Route path="/hal-parser" element={<HalParser />} />
      <Route path="/job" element={<Job />} />
      <Route path="/img" element={<Img />} />
      <Route path="/doc" element={<Doc />} />
    </Routes>
  );
}

export default AppRoutes;
