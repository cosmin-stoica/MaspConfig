import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "./globals/navbar";

function NavBarWrapper() {
  const location = useLocation();
  const [shouldShowNavBar, setShouldShowNavBar] = useState(false);

  useEffect(() => {
    const NonNavbarPaths = ["/login", "/register"];
    setShouldShowNavBar(!NonNavbarPaths.includes(location.pathname));
  }, [location.pathname]);

  return shouldShowNavBar ? <NavBar /> : null;
}

export default NavBarWrapper;
