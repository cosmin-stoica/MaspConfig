import { useEffect, useState } from "react";
import { usePath } from "../../PathContext";
import ConfigParserViewer from "./config_parser_viewer";

export default function ConfigParser({configName, configIcon}) {

    const { path } = usePath();
    const [realFile, setRealFile] = useState([]);
    const [dummy, setDummy] = useState(null);

    useEffect(() => {
        const loadFiles = async () => {
            try {
                const filePath = `${path}/Config/${configName}.ini`;
                const realFile = await window.electron.parseIniFile(filePath);
                setRealFile(realFile);
                console.log("real", realFile);
            } catch (err) {
                console.error("Errore durante il caricamento dei file:", err);
            }
        };

        const loadDummyFile = async () => {
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
        };



        loadFiles();
        loadDummyFile();
    }, [path]);

    return (
        <>
            {dummy && realFile && (
                <ConfigParserViewer dummyFile={dummy} realFile={realFile} configName={configName} configIcon={configIcon}/>
            )}
        </>
    );    
};
