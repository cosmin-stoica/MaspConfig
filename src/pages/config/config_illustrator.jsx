import React, { useState, useEffect } from "react";
import {
    PiHeadCircuitFill,
    PiAddressBookFill,
    PiBrainFill,
    PiClipboardTextFill,
    PiDatabaseFill,
    PiGavelFill,
    PiScrewdriverFill
} from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import Alert from "../../globals/alert";

function ConfigIllustrator({ files }) {
    const [alertDetails, setAlertDetails] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false); // Stato per il trigger dell'animazione
    const navigate = useNavigate();

    const defaultConfigs = [
        { name: "Hardware Config", icon: <PiHeadCircuitFill /> },
        { name: "Login", icon: <PiAddressBookFill /> },
        { name: "Main Config", icon: <PiBrainFill /> },
        { name: "ODP Config", icon: <PiClipboardTextFill /> },
        { name: "Report Config", icon: <PiDatabaseFill /> },
        { name: "Rework Config", icon: <PiGavelFill /> },
        { name: "Programmi di avvitatura", icon: <PiScrewdriverFill /> },
    ];

    const normalize = (str) => str.trim().toLowerCase().replace(/\.ini$/, '');

    const handleNonActiveClick = (configName) => {
        setAlertDetails({
            Type: "warning",
            Title: "Warning",
            Description: `La configurazione "${configName}" non è presente.`,
        });
    };

    const handleActiveClick = (configName) => {
        navigate(`/configopener?config=${encodeURIComponent(configName)}`);
    };

    const closeAlert = () => {
        setAlertDetails(null);
    };

    useEffect(() => {
        // Imposta lo stato per il trigger dell'animazione
        setIsLoaded(true);
    }, []);

    return (
        <>
            {alertDetails && (
                <Alert
                    Type={alertDetails.Type}
                    Title={alertDetails.Title}
                    Description={alertDetails.Description}
                    onClose={closeAlert}
                />
            )}
            <div className="ConfigIllustrator_Container">
                {defaultConfigs.map((config, index) => {
                    const isActive = files.some(file => normalize(file) === normalize(config.name));
                    return (
                        <div
                            key={index}
                            className={`ConfigIllustrator_Item ${isLoaded ? 'slideIn' : ''} ${!isActive ? 'NonActive' : ''}`}
                            style={{ '--animation-delay': `${index * 200}ms` }}
                            onClick={
                                isActive
                                    ? () => handleActiveClick(config.name)
                                    : () => handleNonActiveClick(config.name)
                            }
                        >
                            <div className="ConfigIllustrator_Item_Circle"></div>
                            <div className="ConfigIllustrator_Item_Circle2"></div>
                            <div className="ConfigIllustrator_Item_Icon">
                                {config.icon}
                            </div>
                            <div className="ConfigIllustrator_Item_Title">
                                {config.name}
                            </div>
                        </div>
                    );

                })}
            </div>
        </>
    );
}

export default ConfigIllustrator;
