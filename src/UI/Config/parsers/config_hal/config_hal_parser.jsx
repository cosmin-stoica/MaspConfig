import { useEffect, useState } from "react";
import { usePath } from "../../../../MAIN/Config/PathContext";
import { useLocation, useNavigate } from "react-router";
import ConfigParserViewer from "./config_hal_parser_viewer";
import { TbArrowLeft } from "react-icons/tb";
import Loader from "../../../globals/loader"

export default function ConfigHalParser({ activeNavbar, onSetActive }) {

    const location = useLocation();
    const navigate = useNavigate();

    const queryParams = new URLSearchParams(location.search);
    const configName = queryParams.get("config");
    const groupName = queryParams.get("group_name");
    const configIcon = queryParams.get("config_icon");
    const isHal = queryParams.get("isHal") === "true";
    const isAvv = queryParams.get("isAvv") === "true";
    const [isLoading, setIsLoading] = useState(true);

    const { path } = usePath();
    const [realFile, setRealFile] = useState([]);
    const [dummy, setDummy] = useState(null);

    useEffect(() => {
        const loaderTimeout = setTimeout(() => setIsLoading(false), 1000);
        if (!isAvv) {
            const loadFiles = async () => {
                if (isHal) {
                    try {
                        const dummyFilePath = `${path}/Config/Hardware Config/${configName}.ini`;
                        const realFile = await window.electron.parseIniFile(dummyFilePath);
                        setRealFile(realFile);
                    } catch (err) {
                        console.error("Errore durante il caricamento dei file:", err);
                    }
                }
                else {
                    try {
                        const filePath = `${path}/Config/${configName}.ini`;
                        const realFile = await window.electron.parseIniFile(filePath);
                        setRealFile(realFile);
                        console.log("real", realFile);
                    } catch (err) {
                        console.error("Errore durante il caricamento dei file:", err);
                    }
                }
            };

            const loadDummyFile = async () => {
                if (isHal) {
                    try {
                        const filePath = `${path}/Config/Dummies/Hardware Config/${configName}.ini`;
                        const parsedData = await window.electron.parseIniFile(filePath);

                        if (!parsedData) {
                            console.error("Errore: il file INI non è stato parsato correttamente.");
                            setDummy(null);
                            return;
                        }

                        setDummy(parsedData);
                        console.log(parsedData);
                    } catch (error) {
                        console.error("Errore durante il caricamento del file dummy:", error);
                    }
                }
                else {
                    try {
                        const filePath = `${path}/Config/Dummies/${configName}.ini`;
                        const parsedData = await window.electron.parseIniFile(filePath);

                        if (!parsedData) {
                            console.error("Errore: il file INI non è stato parsato correttamente.");
                            setDummy(null);
                            return;
                        }

                        setDummy(parsedData);
                        console.log("dummy", parsedData);
                    } catch (error) {
                        console.error("Errore durante il caricamento del file dummy:", error);
                    }
                }
            };

            loadFiles();
            loadDummyFile();
        }
        else {
            const loadFiles = async () => {
                try {
                    const realFilePath = `${path}/Config/${configName}.ini`;
                    const dummyFilePath = `${path}/Config/Dummies/${configName}.ini`;

                    const [realFileData, dummyFileData] = await Promise.all([
                        window.electron.parseIniFile(realFilePath),
                        window.electron.parseIniFile(dummyFilePath)
                    ]);

                    if (!realFileData || !dummyFileData) {
                        console.error("Errore nel caricamento dei file INI.");
                        return;
                    }

                    setRealFile(realFileData);

                    const numeroProgrammi = Object.keys(realFileData).filter(key => key.startsWith("PROGRAMMA")).length;
                    const baseDummy = dummyFileData["PROGRAMMA 1"];
                    const generatedDummy = { ...dummyFileData, "SEZIONE GENERALE": dummyFileData["SEZIONE GENERALE"] };

                    for (let i = 1; i <= numeroProgrammi; i++) {
                        generatedDummy[`PROGRAMMA ${i}`] = { ...baseDummy };
                    }

                    setDummy(generatedDummy);
                } catch (error) {
                    console.error("Errore durante il caricamento dei file:", error);
                }
            };

            loadFiles();
        }
        return () => clearTimeout(loaderTimeout);
    }, [path]);

    return (

        <>
            {isLoading && <Loader />}
            {!isHal && dummy && realFile && (
                <>
                    <ConfigParserViewer activeNavbar={activeNavbar} onSetActive={onSetActive} isAvv={isAvv} dummyFile={dummy} realFile={realFile} configName={configName} configIcon={configIcon} />
                </>
            )}
            {isHal && dummy && (
                <div className="HalParser_MainDiv bg_main width100 height100 min-height100vh c-white">
                    <div>
                        {dummy ?
                            <ConfigParserViewer onSetActive={onSetActive} isHal={true} dummyFile={dummy} realFile={realFile} configName={configName} groupName={groupName} configIcon={configIcon} /> :
                            <div className="width100 flex-center-row height100vh">Configurazione non presente</div>}
                    </div>
                </div>
            )}
        </>
    );
};
