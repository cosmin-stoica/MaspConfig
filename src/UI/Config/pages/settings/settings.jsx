import { useState, useEffect } from "react";
import Loader from "../../../globals/loader"
import SettingCard from "./setting_card";
import Directories from "./pages/directories";
import { GoFileDirectoryFill } from "react-icons/go";
import { FaArrowAltCircleLeft, FaUser, FaSlidersH } from "react-icons/fa";
import ComingSoon from "../../../globals/coming_soon";
import Connection from "./pages/connection";
import { GrConnect } from "react-icons/gr";
import Preferences from "./pages/preferences";
import { usePath } from "../../../../MAIN/Config/PathContext";

export default function Settings() {
    const [isLoading, setIsLoading] = useState(true);
    const [currentSettings, setCurrentSettings] = useState("");
    const { isReportApp } = usePath()
  
    useEffect(() => {
        console.log(isReportApp)
    }, [isReportApp]);

    useEffect(() => {
        const loaderTimeout = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(loaderTimeout);
    }, []);

    const handleSettingsClick = (title) => {
        setCurrentSettings(title);
        console.log(`Current settings: ${title}`);
    };

    const renderSettings = (current) => {
        switch (current) {
            case "Cartelle":
                return <Directories onConfirm={() => handleSettingsClick(null)} />;
            case "Connesioni":
                return isReportApp ? <div className="height90 width100 flex-center-column c-mode">Opzione non disponibile in questa versione<ComingSoon /></div> : <Connection />;
            case "Preferenze":
                return <Preferences />;
            default:
                return <div className="height90 width100 flex-center-column c-mode">Opzione non disponibile in questa versione<ComingSoon /></div>
        }
    };

    return (
        <>
            {isLoading && <Loader />}
            <div className="Settings_MainDiv">
                <div className="Settings">
                    {currentSettings && <div className="Settings_GoBack" onClick={() => handleSettingsClick(null)}>
                        <FaArrowAltCircleLeft />
                    </div>}
                    <div className="Settings_Title">
                        {!currentSettings ? "Impostazioni" : currentSettings}
                    </div>
                    {!currentSettings && (
                        <>
                            <SettingCard
                                onClick={() => handleSettingsClick("Preferenze")}
                                Icon={FaSlidersH}
                                Title="Preferenze"
                            />
                            <SettingCard
                                onClick={() => handleSettingsClick("Cartelle")}
                                Icon={GoFileDirectoryFill}
                                Title="Cartelle"
                            />
                            <SettingCard
                                onClick={() => handleSettingsClick("Connesioni")}
                                Icon={GrConnect}
                                Title="Connesioni"
                            />
                            <SettingCard
                                onClick={() => handleSettingsClick("Utenti")}
                                Icon={FaUser}
                                Title="Utenti"
                            />
                        </>
                    )}
                    {currentSettings && renderSettings(currentSettings)}
                </div>
            </div>
        </>
    );
}
