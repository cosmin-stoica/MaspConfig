import ItodoImage from "../elements/itodo-img";
import { HiCog } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { usePath } from "../../MAIN/Config/PathContext";

function ReportNavBar({ activeNavbar }) {
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
                            className={`Navbar_Button ${isActive(['/lista']) ||
                                (isActive(['/lista']) && !isActive(['/lista'], '', ''))
                                ? 'isActive'
                                : ''
                                }`}
                        >
                            LISTA
                        </button>
                        : <Link to={!activeNavbar ? "#" : "/lista"}>
                            <button
                                className={`Navbar_Button ${isActive(['/lista']) ||
                                    (isActive(['/lista']) && !isActive(['/lista'], '', ''))
                                    ? 'isActive'
                                    : ''
                                    }`}
                            >
                                LISTA
                            </button>
                        </Link>
                    }


                    {!activeNavbar ?
                        <button
                            className={`Navbar_Button ${isActive(['/setup']) ||
                                (isActive(['/setup']) && !isActive(['/setup'], '', ''))
                                ? 'isActive'
                                : ''
                                }`}
                        >
                            SETUP
                        </button>
                        : <Link to={!activeNavbar ? "#" : "/setup?config=Report Config"}>
                            <button
                                className={`Navbar_Button ${isActive(['/setup']) ||
                                    (isActive(['/setup']) && !isActive(['/setup'], '', ''))
                                    ? 'isActive'
                                    : ''
                                    }`}
                            >
                                SETUP
                            </button>
                        </Link>
                    }
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
                </div>
            </div>
        </>
    );
}

export default ReportNavBar;
