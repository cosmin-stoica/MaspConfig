import { useNavigate, useLocation } from "react-router-dom";
import LoginParser from "../../parsers/login/login_parser";
import ConfigParser from "../../parsers/config/config_parser";
import ComingSoon from "../../globals/coming_soon";
import MainParser from "../../parsers/main/main_parser";

import {
    PiHeadCircuitFill,
    PiDatabaseFill,
    PiGavelFill,
} from "react-icons/pi";
import AvvitaturaParser from "../../parsers/avvitatura/avvitatura_parser";

function ConfigOpener() {
    const navigate = useNavigate();
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const configName = queryParams.get("config");

    return (
        <>
            <div className="ConfigOpener_MainDiv">
                {/*<button onClick={() => navigate(`/config`)} className="ConfigOpener_MainDiv_BtnIndietro">Indietro</button>*/}
                {configName === "Login" ? (
                    <LoginParser />
                ) : configName === "Hardware Config" ? (
                    <ConfigParser configName={"Hardware Config"} configIcon={<PiHeadCircuitFill/>} />
                ) : configName === "Main Config" ? (
                    <MainParser />
                ) : configName === "Report Config" ? (
                    <ConfigParser configName={"Report Config"}  configIcon={<PiDatabaseFill/>} />
                ) : configName === "Rework Config" ? (
                    <ConfigParser configName={"Rework Config"}  configIcon={<PiGavelFill/>} />
                ) : configName === "Programmi di avvitatura" ? (
                    <AvvitaturaParser />
                ) : (
                    <>
                        <div className="width100 height100 flex-center-column c-white">
                            Non disponibile in questa versione
                            <ComingSoon />
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default ConfigOpener;
