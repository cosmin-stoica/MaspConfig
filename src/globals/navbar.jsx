import ItodoImage from "../elements/itodo-img";
import { HiCog, HiUser } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";

function NavBar() {
    const location = useLocation();

    return (
        <div className="Navbar_MainDiv">
            <div className="Navbar_MainDiv_LogoPart">
                <Link to="/dashboard">
                    <ItodoImage className="Navbar_MainDiv_Logo" alt="logo" src="images/solohead.png" />
                </Link>
            </div>
            <div className="Navbar_MainDiv_Buttons">
                <Link to="/dashboard">
                    <button className={`Navbar_Button ${location.pathname === '/dashboard' ? 'isActive' : ''}`}>
                        DASHBOARD
                    </button>
                </Link>
                <Link to="/config">
                    <button className={`Navbar_Button ${location.pathname === '/config' ? 'isActive' : ''}`}>
                        CONFIG
                    </button>
                </Link>
                <Link to="/hal">
                    <button className={`Navbar_Button ${location.pathname === '/hal' ? 'isActive' : ''}`}>
                        HAL
                    </button>
                </Link>
                <Link to="/job">
                    <button className={`Navbar_Button ${location.pathname === '/job' ? 'isActive' : ''}`}>
                        JOB
                    </button>
                </Link>
                <Link to="/img">
                    <button className={`Navbar_Button ${location.pathname === '/img' ? 'isActive' : ''}`}>
                        IMG
                    </button>
                </Link>
                <Link to="/doc">
                    <button className={`Navbar_Button ${location.pathname === '/doc' ? 'isActive' : ''}`}>
                        DOC
                    </button>
                </Link>
            </div>
            <div className="Navbar_MainDiv_Account">
                <div className="Navbar_MainDiv_Account_Container">
                    <HiCog />
                </div>
                <div className="Navbar_MainDiv_Account_Container">
                    <Link to="/login" className="no-link-style">
                        <HiUser />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default NavBar;
