import { useEffect, useState } from "react";
import { usePath } from "../../../MAIN/Config/PathContext";
import CsvViewer from "../../parsers/csvViewer";

export default function ListaReport() {
    const [files, setFiles] = useState([]);
    const [currentPath, setCurrentPath] = useState("");
    const [pathHistory, setPathHistory] = useState([]);
    const [selectedFileContent, setSelectedFileContent] = useState(null);
    const { path } = usePath();
    const pathToSearch = `${path}/Report`;

    const loadFiles = async (folderPath) => {
        try {
            const filesAndFolders = await window.electron.getAllFilesAndFolders(folderPath);
            setFiles(filesAndFolders);
            setCurrentPath(folderPath);
            setSelectedFileContent(null); // Resetta la vista del file selezionato
        } catch (error) {
            console.error("Errore durante la lettura dei file:", error);
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
        <div className="dashboard_report_div bg_main c-white pt-100">
            {pathHistory.length > 0 && (
                <button onClick={handleGoBack}>Indietro</button>
            )}
            {!selectedFileContent ? (
                <ul>
                    {files.map((file, index) => (
                        <li
                            key={index}
                            onClick={() =>
                                file.isFolder
                                    ? handleFolderClick(file.fullPath)
                                    : handleFileClick(file.fullPath)
                            }
                            style={{ cursor: file.isFolder ? "pointer" : "default" }}
                        >
                            {file.isFolder ? `📁 ${file.name}` : `📄 ${file.name}`}
                        </li>
                    ))}
                </ul>
            ) : (
                <div>
                    <button onClick={() => setSelectedFileContent(null)}>Torna alla lista</button>
                    <CsvViewer data={selectedFileContent} /> {/* Usa CsvViewer */}
                </div>
            )}
        </div>
    );
}

