import { useEffect, useState } from "react";
import { usePath } from "../../../../MAIN/Config/PathContext";
import CsvViewer from "../../parsers/csvViewer";
import { IoArrowBackCircle } from "react-icons/io5";
import ListaToolbox from "./lista_toolbox";
import ListaTable from "./lista_table";
import Loader from "../../../globals/loader";
import { ListaSearchHandler } from "./handlers/lista_search_handler";
import Alert from "../../../globals/alert"

export default function ListaReport() {

    const [files, setFiles] = useState([]);
    const [currentPath, setCurrentPath] = useState("");
    const [pathHistory, setPathHistory] = useState([]);
    const [selectedFileContent, setSelectedFileContent] = useState(null);
    const [currentFile, setCurrentFile] = useState(null);
    const { path } = usePath();
    const pathToSearch = `${path}\\Report`;

    const [fileIndex, setFileIndex] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [currentQuery, setCurrentQuery] = useState("");
    const [currentProgressivo, setCurrentProgressivo] = useState("");
    const [currentOperatore, setCurrentOperatore] = useState("");
    const [currentBarcode, setCurrentBarcode] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [selectedStartDate, setSelectedStartDate] = useState("");
    const [selectedEndDate, setSelectedEndDate] = useState("");

    const [viewError, setViewEror] = useState(false);
    const [errorDescription, setErrorDescription] = useState("");


    const initialize = async () => {
        try {
            setIsLoading(true);

            const index = await window.electron.readIndexFile(`${pathToSearch}\\fileIndex.json`);
            setFileIndex(index);

            // Carica i file della directory iniziale
            await loadFiles(pathToSearch);
            setPathHistory([]);
        } catch (error) {
            console.error("Errore durante l'inizializzazione:", error);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        initialize();
    }, [pathToSearch]);


    const handleFileNameOnChange = (e) => {
        const value = e?.target?.value;
        if (!value) {
            setCurrentQuery("");
            return;
        }
        setCurrentQuery(value);
    };
    const handleStartDateChange = (e) => {
        const value = e?.target?.value;
        if (!value) {
            setSelectedStartDate("");
            return;
        }
        const formattedDate = new Date(value).toISOString();
        setSelectedStartDate(formattedDate);
    };
    const handleEndDateChange = (e) => {
        const value = e?.target?.value;
        if (!value) {
            setSelectedEndDate("");
            return;
        }
        const formattedDate = new Date(value).toISOString();
        setSelectedEndDate(formattedDate);
    };
    const handleProgressivoChange = (e) => {
        const value = e?.target?.value;
        if (!value) {
            setCurrentProgressivo("");
            return;
        }
        setCurrentProgressivo(value);
    };
    const handleOperatoreChange = (e) => {
        const value = e?.target?.value;
        if (!value) {
            setCurrentOperatore("");
            return;
        }
        setCurrentOperatore(value);
    };
    const handleBarcodeChange = (e) => {
        const value = e?.target?.value;
        if (!value) {
            setCurrentBarcode("");
            return;
        }
        setCurrentBarcode(value);
    };


    const handleExitSearch = () => {
        if (!selectedEndDate && !selectedStartDate && !currentQuery.trim() && !currentProgressivo && !currentOperatore && !currentBarcode) {
            setErrorDescription("Non è stato inserito nessun parametro");
            setViewEror(true)
            return false;
        }
        return true;
    }

    const handleSearch = () => {
        if (!handleExitSearch())
            return;
        console.log(selectedEndDate, selectedStartDate, currentQuery.trim(), currentProgressivo, currentOperatore, currentBarcode)
        const results = ListaSearchHandler(fileIndex, currentQuery, currentProgressivo, currentOperatore, currentBarcode, selectedStartDate, selectedEndDate);
        setSearchResults(results);
        if (results.length === 0) {
            setErrorDescription("Non è stato trovato nessun report");
            setViewEror(true)
        }
    };

    const handleCancelReportSearch = () => {
        setSearchResults([]);
        setCurrentQuery("");
    }

    // Carica i file della directory
    const loadFiles = async (folderPath) => {
        try {
            setIsLoading(true);
            const filesAndFolders = await window.electron.getAllFilesAndFolders(folderPath);
            setFiles(filesAndFolders);
            setCurrentPath(folderPath);
            setSelectedFileContent(null);
        } catch (error) {
            console.error("Errore durante la lettura dei file:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Parsing del file CSV
    const parseFile = async (filePath) => {
        try {
            const parsedContent = await window.electron.parseCsvFile(filePath);
            setSelectedFileContent(parsedContent);
            console.log(parsedContent)
        } catch (error) {
            console.error("Errore durante il parsing del file:", error);
        }
    };

    const handleFolderClick = (folderPath) => {
        setPathHistory((prevHistory) => [...prevHistory, currentPath]);
        setSearchResults([]);
        loadFiles(folderPath);
    };

    const handleFileClick = (filePath, file) => {
        parseFile(filePath);
        setCurrentFile(file);
    };


    const handleGoBack = () => {
        if (searchResults.length > 0) {
            setSearchResults([]);
        }
        if (pathHistory.length > 0) {
            const previousPath = pathHistory[pathHistory.length - 1];
            setPathHistory((prevHistory) => prevHistory.slice(0, -1));
            setSearchResults([]);
            loadFiles(previousPath);
        }
    };

    return (
        <>
            {isLoading && <Loader />}
            <div className="lista_MAIN_DIV">
                {(pathHistory.length > 0 || searchResults.length > 0) && (
                    <button className="lista_btn_indietro" onClick={handleGoBack}>
                        <IoArrowBackCircle />
                    </button>
                )}
                {!selectedFileContent ? (
                    <div className="table_lista_report_upper_upper">
                        <ListaToolbox
                            path={currentPath}
                            handleFileNameOnChange={handleFileNameOnChange}
                            handleSearchBtn={handleSearch}
                            handleStartDateChange={handleStartDateChange}
                            handleEndDateChange={handleEndDateChange}
                            handleCancelReportSearch={handleCancelReportSearch}
                            handleProgressivoChange={handleProgressivoChange}
                            handleOperatoreChange={handleOperatoreChange}
                            handleBarcodeChange={handleBarcodeChange}
                            setIsLoading={setIsLoading}
                            handleReloadIndex={initialize}
                        />
                        {<div className="table_lista_report_upper">
                            {searchResults.length > 0 ? (
                                <ListaTable
                                    files={searchResults}
                                    handleFileClick={handleFileClick}
                                    handleFolderClick={handleFolderClick}
                                />
                            ) : (
                                <ListaTable
                                    files={files}
                                    handleFileClick={handleFileClick}
                                    handleFolderClick={handleFolderClick}
                                />
                            )}
                        </div>}
                    </div>
                ) : (
                    <div className="CsvViewer_MainDiv">
                        <button className="lista_btn_indietro" onClick={() => setSelectedFileContent(null)}>
                            <IoArrowBackCircle />
                        </button>
                        <CsvViewer data={selectedFileContent} dataFile={currentFile} />
                    </div>
                )}
            </div>



            {viewError && <Alert
                Type="warning"
                Title="Attenzione"
                Description={errorDescription}
                Modal={true}
                onClose={() => {
                    setErrorDescription("")
                    setViewEror(false)
                }}
            />}
        </>
    );
};
