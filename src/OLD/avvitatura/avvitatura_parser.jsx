import { useEffect, useState } from "react";
import { usePath } from "../../PathContext";
import AvvitaturaParserViewer from "./avvitatura_parser_viewer";
import { PiScrewdriverFill } from "react-icons/pi";

export default function AvvitaturaParser() {
    const { path } = usePath();
    const [realFile, setRealFile] = useState([]);
    const [dummy, setDummy] = useState(null);
    const [configName, setConfigName] = useState("Programmi di avvitatura");
    const [configIcon, setConfigIcon] = useState(<PiScrewdriverFill />);

    useEffect(() => {
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
    }, [path, configName]);

    return (
        <>
            {dummy && realFile && (
                <AvvitaturaParserViewer
                    dummyFile={dummy}
                    realFile={realFile}
                    configName={configName}
                    configIcon={configIcon}
                />
            )}
        </>
    );
};
