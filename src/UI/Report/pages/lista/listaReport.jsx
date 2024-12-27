import { useEffect, useState } from "react";
import { usePath } from "../../../../MAIN/Config/PathContext";
import CsvViewer from "../../parsers/csvViewer";
import { IoArrowBackCircle } from "react-icons/io5";
import ListaToolbox from "./lista_toolbox";
import ListaTable from "./lista_table";
import Loader from "../../../globals/loader"

export default function ListaReport() {
    const [files, setFiles] = useState([]);
    const [currentPath, setCurrentPath] = useState("");
    const [pathHistory, setPathHistory] = useState([]);
    const [selectedFileContent, setSelectedFileContent] = useState(null);
    const { path } = usePath();
    const pathToSearch = `${path}\\ReportCollaudo`;

    const [isLoading, setIsLoading] = useState(false);

    const loadFiles = async (folderPath) => {
        try {
            setIsLoading(true);
            const filesAndFolders = await window.electron.getAllFilesAndFolders(folderPath);
            setFiles(filesAndFolders);
            setCurrentPath(folderPath);
            setSelectedFileContent(null);
            console.log(filesAndFolders);
            setIsLoading(false);
        } catch (error) {
            console.error("Errore durante la lettura dei file:", error);
            setIsLoading(false);
        }
    };

    const parseFile = async (filePath) => {
        try {
            const parsedContent = await window.electron.parseCsvFile(filePath);
            setSelectedFileContent(parsedContent); // Imposta il contenuto parsato
            console.log(parsedContent)
        } catch (error) {
            console.error("Errore durante il parsing del file:", error);
        }
    };

    useEffect(() => {
        setPathHistory([]);
        loadFiles(pathToSearch);
    }, []);

    const handleFolderClick = (folderPath) => {
        setPathHistory((prevHistory) => [...prevHistory, currentPath]);
        loadFiles(folderPath);
    };

    const handleFileClick = (filePath) => {
        parseFile(filePath);
    };

    const handleGoBack = () => {
        if (pathHistory.length > 0) {
            const previousPath = pathHistory[pathHistory.length - 1];
            setPathHistory((prevHistory) => prevHistory.slice(0, -1));
            loadFiles(previousPath);
        }
    };

    return (
        <>
        {isLoading && <Loader/>}
            <div className="lista_MAIN_DIV">
                {pathHistory.length > 0 && (
                    <button className="lista_btn_indietro" onClick={handleGoBack}><IoArrowBackCircle /></button>
                )}
                {!selectedFileContent ? (
                    <div className="table_lista_report_upper_upper">
                        <ListaToolbox path={currentPath} />
                        <div className="table_lista_report_upper">
                            <ListaTable files={files} handleFileClick={handleFileClick} handleFolderClick={handleFolderClick} />
                        </div>
                    </div>
                ) : (
                    <div>
                        <button onClick={() => setSelectedFileContent(null)}>Torna alla lista</button>
                        <CsvViewer data={selectedFileContent} />
                    </div>
                )}
            </div>
        </>
    );
}

