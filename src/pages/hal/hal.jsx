import { useEffect, useState } from "react";
import Alert from "../../globals/alert";
import { usePath } from "../../PathContext";
import { useNavigate, useLocation } from "react-router";
import iconMap from "../../parsers/hal/iconMap";
import { TbArrowLeft } from "react-icons/tb";
import { FaSquarePlus } from "react-icons/fa6";

import {
    TbSettingsStar,
    TbBrandSpeedtest,
    TbCpu,
    TbCertificate,
    TbBuildingFactory2,
    TbBinaryTree,
    TbInfoCircleFilled
} from "react-icons/tb";


export default function Hal() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoadingConfigs, setIsLoadingConfigs] = useState(true);
    const [isLoadingFiles, setIsLoadingFiles] = useState(true);
    const [choice, setChoice] = useState(null);
    const [parsedJson, setParsedJson] = useState([]);
    const [error, setError] = useState(null);
    const [warning, setWarning] = useState(null);
    const [existingFiles, setExistingFiles] = useState([]);
    const { path } = usePath();
    const navigate = useNavigate();
    const location = useLocation();


    const queryParams = new URLSearchParams(location.search);
    const groupName = queryParams.get("group_name");

    useEffect(() => {
        setChoice(groupName)
    }, []);


    const defaultConfigs = [
        {
            name: "Automazione e Assemblaggio",
            icon: <TbSettingsStar />,
            isFlipped: false,
            info: "Questi job comprendono tecnologie e processi progettati per automatizzare e ottimizzare le operazioni di assemblaggio industriale, migliorando efficienza e precisione."
        },
        {
            name: "Collaudo Componenti Automotive",
            icon: <TbBrandSpeedtest />,
            isFlipped: false,
            info: "Questi job verificano il corretto funzionamento di cinture di sicurezza, airbag, sensori di presenza passeggero DPD o SBR, garantendo la conformità agli standard di sicurezza."
        },
        {
            name: "Unità di Controllo Elettronico",
            icon: <TbCpu />,
            isFlipped: false,
            info: "Questi job gestiscono le centraline elettroniche con bus CAN/LIN montate nelle autovetture, effettuandone la configurazione e la verifica del corretto funzionamento."
        },
        {
            name: "Controllo di Qualità e Verifica",
            icon: <TbCertificate />,
            isFlipped: false,
            info: "Questi job assicurano la qualità dei componenti con misurazioni, controllo del carico, verifica della coppia e ispezione visiva, rilevando difetti con tecnologie avanzate."
        },
        {
            name: "Gestione Produzione e Logistica",
            icon: <TbBuildingFactory2 />,
            isFlipped: false,
            info: "Questi job ottimizzano flussi e operazioni attraverso il monitoraggio logistico, la gestione della manutenzione, la reportistica e la stampa di etichette personalizzate."
        },
        {
            name: "Gestione Postazioni e Procedure",
            icon: <TbBinaryTree />,
            isFlipped: false,
            info: "Questi job coordinano e automatizzano le procedure svolte dalle postazioni di lavoro, ottimizzando l'efficienza e aumentando la produttività complessiva delle operazioni."
        },
    ];

    const [configs, setConfigs] = useState(defaultConfigs);

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const filePath = `${path}\\Config\\Dummies\\HalCategories.json`; // Percorso completo al file
                const data = await window.electron.readJsonFile(filePath);

                if (!data || Object.keys(data).length === 0) {
                    throw new Error("File JSON vuoto o non trovato");
                }

                setParsedJson(data);
            } catch (err) {
                console.error("Errore durante il parsing del file JSON:", err);
                setError(err.message);
            } finally {
                setIsLoadingConfigs(false); // Configurazioni caricate
            }
        };

        fetchConfig();

        const fetchFiles = async () => {
            try {
                const result = await window.electron.getFiles(`${path}\\config\\hardware config`);
                setExistingFiles(result);
            } catch (err) {
                console.error("Errore nel recupero dei file:", err);
            } finally {
                setIsLoadingFiles(false); // File caricati
            }
        };

        fetchFiles();
    }, [path]);

    useEffect(() => {
        if (!isLoadingConfigs && !isLoadingFiles) {
            setIsLoaded(true); // Setta isLoaded su true quando tutte le operazioni sono terminate
        }
    }, [isLoadingConfigs, isLoadingFiles]);

    const handleCardClick = (name) => {
        setChoice(name);
    };

    const handleBackClick = () => {
        setChoice(null);
    };

    const isFileActive = (fileName) => {
        return existingFiles.includes(`${fileName}.ini`);
    };

    const toggleFlip = (index) => {
        setConfigs((prevConfigs) =>
            prevConfigs.map((config, idx) =>
                idx === index ? { ...config, isFlipped: !config.isFlipped } : config
            )
        );
    };

    const handleFinalCardClick = (configName, groupName, configIcon) => {
        if (isFileActive(configName)) {
            navigate(`/hal-parser?config=${encodeURIComponent(configName)}&group_name=${encodeURIComponent(groupName)}&config_icon=${encodeURIComponent(configIcon)}`);
        }
    };

    const handleAddConfig = (configName, groupName, configIcon) => {
        navigate(`/hal-parser?config=${encodeURIComponent(configName)}&group_name=${encodeURIComponent(groupName)}&config_icon=${encodeURIComponent(configIcon)}&create=true`);
    }


    return (
        <div className="width100 height100 min-height100vh flex-center-column HalConfigContainer_MainDiv">
            {error && <Alert Type="error" Title="Errore" Description={error} />}
            {warning && <Alert Type="warning" Title="Warning" Description="Configurazione non esistente" onClose={setWarning(false)} />}

            {!error && (
                <>
                    {!choice ? (
                        <div className="ConfigIllustrator_Container HalConfigContainer">
                            {configs.map((config, index) => (
                                <div
                                    key={index}
                                    className={`ConfigIllustrator_Item HalConfigCard ${isLoaded ? 'slideIn' : ''} ${config.isFlipped ? 'flipped' : ''}`}
                                    style={isLoaded && !config.isFlipped ? { "--animation-delay": `${index * 200}ms` } : {}}
                                    onClick={() => handleCardClick(config.name)}
                                >
                                    <div className="ConfigIllustrator_Item_Circle"></div>
                                    <div className="ConfigIllustrator_Item_Circle2"></div>
                                    <div
                                        className="HalConfigCard_InfoIcon"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleFlip(index);
                                        }}
                                    >
                                        <TbInfoCircleFilled />
                                    </div>

                                    <div className="HalConfigCard_Front">
                                        <div className="ConfigIllustrator_Item_Icon">{config.icon}</div>
                                        <div className="ConfigIllustrator_Item_Title">{config.name}</div>
                                    </div>
                                    <div className="HalConfigCard_Back">
                                        {config.info}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <>
                            <button className="Hal_Config_Back_Btn" onClick={handleBackClick}>
                                <TbArrowLeft />
                            </button>
                            <div className="ConfigIllustrator_Container HalConfigContainer">
                                {parsedJson
                                    .filter((item) => item.name === choice)
                                    .flatMap((item) => item.configs)
                                    .map((config, index) => (
                                        <div
                                            key={index}
                                            className={`ConfigIllustrator_Item ${isLoaded ? 'slideIn' : ''} ${!isFileActive(config.name) ? 'NonActive' : ''}`}
                                            style={{ "--animation-delay": `${index * 200}ms` }}
                                            onClick={() => handleFinalCardClick(config.name, choice, config.icon)}
                                        >
                                            <div
                                                className={`ConfigIllustrator_Item_PlusIcon ${!isFileActive(config.name) ? '' : 'Disabled'}`}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    if(!isFileActive(config.name))
                                                        handleAddConfig(config.name, choice, config.icon);
                                                }}
                                            >
                                                <FaSquarePlus />
                                            </div>
                                            <div className="ConfigIllustrator_Item_Circle"></div>
                                            <div className="ConfigIllustrator_Item_Circle2"></div>
                                            <div className="ConfigIllustrator_Item_Icon">
                                                {iconMap[config.icon] || <TbSettingsStar />}
                                            </div>
                                            <div className="ConfigIllustrator_Item_Title">
                                                {config.name.startsWith("HAL Config") ? config.name.replace("HAL Config", "") : config.name}
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    );
}