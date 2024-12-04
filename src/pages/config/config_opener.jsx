import { useNavigate, useLocation } from "react-router-dom";
import LoginParser from "../../parsers/login/login_parser";
import ComingSoon from "../../globals/coming_soon";

function ConfigOpener() {
    const navigate = useNavigate();
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const configName = queryParams.get("config");

    return (
        <>
            <div className="ConfigOpener_MainDiv">
                {/*<button onClick={() => navigate(`/config`)} className="ConfigOpener_MainDiv_BtnIndietro">Indietro</button>*/}
                {configName === "Login" ? <LoginParser /> :
                    <>
                        <div className="width100 height100 flex-center-column c-white">
                            Non disponibile in questa versione
                            <ComingSoon />
                        </div>
                    </>
                }
            </div>
        </>
    );
}

export default ConfigOpener;
