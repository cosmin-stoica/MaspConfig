import ItodoImage from "../elements/itodo-img";
import { HiCog, HiUser } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { usePath } from "../PathContext";

function NavBar({ activeNavbar }) {
    const location = useLocation();

    const { lightMode } = usePath();

    const isActive = (paths, queryKey = null, queryValue = null) => {
        const currentPath = location.pathname;
        const currentQueryParams = new URLSearchParams(location.search);

        const pathMatches = paths.includes(currentPath);
        const queryMatches =
            queryKey && queryValue ? currentQueryParams.get(queryKey) === queryValue : true;

        return pathMatches && queryMatches;
    };



    return (
        <>
            <div className="Navbar_MainDiv">
                <div className="Navbar_MainDiv_LogoPart">
                    {!activeNavbar ?
                        <div>
                            <ItodoImage className="Navbar_MainDiv_Logo" alt="logo" src={`images/solohead${lightMode ? "_black" : ""}.png`} />
                        </div>
                        : <Link to="/dashboard">
                            <ItodoImage className="Navbar_MainDiv_Logo" alt="logo" src={`images/solohead${lightMode ? "_black" : ""}.png`} />
                        </Link>
                    }
                </div>
                <div className="Navbar_MainDiv_Buttons">
                    {!activeNavbar ?
                        <button className={`Navbar_Button ${isActive(['/dashboard', '/home', '']) ? 'isActive' : ''}`}>
                            DASHBOARD
                        </button>
                        : <Link to={!activeNavbar ? "#" : "/dashboard"}>
                            <button className={`Navbar_Button ${isActive(['/dashboard', '/home', '']) ? 'isActive' : ''}`}>
                                DASHBOARD
                            </button>
                        </Link>
                    }

                    {!activeNavbar ?
                        <button
                            className={`Navbar_Button ${isActive(['/config', '/configopener']) ||
                                (isActive(['/config-hal-parser']) && !isActive(['/config-hal-parser'], 'isHal', 'true'))
                                ? 'isActive'
                                : ''
                                }`}
                        >
                            CONFIG
                        </button>
                        : <Link to={!activeNavbar ? "#" : "/config"}>
                            <button
                                className={`Navbar_Button ${isActive(['/config', '/configopener']) ||
                                    (isActive(['/config-hal-parser']) && !isActive(['/config-hal-parser'], 'isHal', 'true'))
                                    ? 'isActive'
                                    : ''
                                    }`}
                            >
                                CONFIG
                            </button>
                        </Link>
                    }



                    {!activeNavbar ?
                        <button
                            className={`Navbar_Button ${isActive(['/config-hal-parser'], 'isHal', 'true') || isActive(['/hal'])
                                ? 'isActive'
                                : ''
                                }`}
                        >
                            HAL
                        </button>
                        :
                        <Link to={!activeNavbar ? "#" : "/hal"}>
                            <button
                                className={`Navbar_Button ${isActive(['/config-hal-parser'], 'isHal', 'true') || isActive(['/hal'])
                                    ? 'isActive'
                                    : ''
                                    }`}
                            >
                                HAL
                            </button>
                        </Link>
                    }


                    {!activeNavbar ?
                        <button className={`Navbar_Button ${isActive(['/job', '/job-list']) ? 'isActive' : ''}`}>
                            JOB
                        </button>
                        :
                        <Link to={!activeNavbar ? "#" : "/job"}>
                            <button className={`Navbar_Button ${isActive(['/job', '/job-list']) ? 'isActive' : ''}`}>
                                JOB
                            </button>
                        </Link>
                    }

                    {!activeNavbar ?
                        <button className={`Navbar_Button ${isActive(['/img', '/images']) ? 'isActive' : ''}`}>
                            IMG
                        </button>
                        :
                        <Link to={!activeNavbar ? "#" : "/img"}>
                            <button className={`Navbar_Button ${isActive(['/img', '/images']) ? 'isActive' : ''}`}>
                                IMG
                            </button>
                        </Link>
                    }

                    {/*!activeNavbar ?
                        <button className={`Navbar_Button ${isActive(['/report', '/documents']) ? 'isActive' : ''}`}>
                            REPORT
                        </button>
                        :
                        <Link to={!activeNavbar ? "#" : "/report"}>
                            <button className={`Navbar_Button ${isActive(['/report', '/documents']) ? 'isActive' : ''}`}>
                                REPORT
                            </button>
                        </Link>
                */}

                </div>
                <div className="Navbar_MainDiv_Account">
                    <div className="Navbar_MainDiv_Account_Container">
                        {!activeNavbar ?
                            <HiCog />
                            :
                            <Link to="/settings" className="no-link-style">
                                <HiCog />
                            </Link>
                        }
                    </div>
                    {/*<div className="Navbar_MainDiv_Account_Container">
                    <Link to="/login" className="no-link-style">
                        <HiUser />
                    </Link>
                </div>*/}
                </div>
            </div>
        </>
    );
}

export default NavBar;
