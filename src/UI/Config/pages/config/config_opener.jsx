import { useNavigate, useLocation } from "react-router-dom";
import LoginParser from "../../parsers/login/login_parser";
import ComingSoon from "../../../globals/coming_soon";
import MainParser from "../../parsers/main/main_parser";
import { useEffect } from "react";

function ConfigOpener({ activeNavbar, onSetActive, isReportApp }) {
    const navigate = useNavigate();
    const location = useLocation();


    const queryParams = new URLSearchParams(location.search);
    const configName = queryParams.get("config");

    useEffect(() => {
        if (configName === "Hardware Config") {
            navigate(`/configopener?config=${encodeURIComponent("Hardware Config")}&config_icon=${encodeURIComponent("PiHeadCircuitFill")}&isHal=false`);
            return;
        }
        if (configName === "Report Config") {
            if (isReportApp) {
                navigate(`/configopener?config=${encodeURIComponent("Report Config")}&config_icon=${encodeURIComponent("PiDatabaseFill")}&isHal=false&isReportApp=true`);
                return;
            }
            navigate(`/configopener?config=${encodeURIComponent("Report Config")}&config_icon=${encodeURIComponent("PiDatabaseFill")}&isHal=false`);
            return;
        }
        if (configName === "Rework Config") {
            navigate(`/configopener?config=${encodeURIComponent("Rework Config")}&config_icon=${encodeURIComponent("PiGavelFill")}&isHal=false`);
            return;
        }
        if (configName === "Programmi di avvitatura") {
            navigate(`/configopener?config=${encodeURIComponent("Programmi di avvitatura")}&config_icon=${encodeURIComponent("PiScrewdriverFill")}&isHal=false&isAvv=true`);
            return;
        }
        if (configName === "Login") {
            //onSetActive(false);
        }
    }, []);



    return (
        <>
            <div className="ConfigOpener_MainDiv">
                {/*<button onClick={() => navigate(`/config`)} className="ConfigOpener_MainDiv_BtnIndietro">Indietro</button>*/}
                {configName === "Login" ? (
                    <>
                        <LoginParser onSetActive={onSetActive} activeNavbar={activeNavbar} />
                    </>
                ) : configName === "Main Config" ? (
                    <MainParser />
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
