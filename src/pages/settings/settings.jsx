import { useState, useEffect } from "react";
import Loader from "../../globals/loader";
import SettingCard from "./setting_card";
import Directories from "./pages/directories";
import { GoFileDirectoryFill } from "react-icons/go";
import { FaArrowAltCircleLeft, FaUser } from "react-icons/fa";
import ComingSoon from "../../globals/coming_soon"
import Connection from "./pages/connection";
import { GrConnect } from "react-icons/gr";

export default function Settings() {
    const [isLoading, setIsLoading] = useState(true);
    const [currentSettings, setCurrentSettings] = useState("Connections");

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
            case "Directories":
                return <Directories onConfirm={() => handleSettingsClick(null)} />;
            case "Connections":
                return <Connection/>;
            default:
                return <div className="height90 width100 flex-center-column c-white">Opzione non disponibile in questa versione<ComingSoon/></div>
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
                                onClick={() => handleSettingsClick("Directories")}
                                Icon={GoFileDirectoryFill}
                                Title="Cartelle"
                            />
                              <SettingCard
                                onClick={() => handleSettingsClick("Connections")}
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
