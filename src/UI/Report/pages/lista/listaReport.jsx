import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { usePath } from "../../../../MAIN/Config/PathContext";
import CsvViewer from "../../parsers/csvViewer";
import { IoArrowBackCircle } from "react-icons/io5";
import ListaToolbox from "./toolbar/lista_toolbox";
import ListaTable from "./lista_table";
import Loader from "../../../globals/loader";
import { ListaSearchHandler } from "./handlers/lista_search_handler";
import Alert from "../../../globals/components/alert"
import PdfCreator from "../../pdf/pdf_creator";

export default function ListaReport() {

    const [files, setFiles] = useState([]);
    const [currentPath, setCurrentPath] = useState("");
    const [pathHistory, setPathHistory] = useState([]);
    const [selectedFileContent, setSelectedFileContent] = useState([]);
    const [currentFile, setCurrentFile] = useState(null);
    const { path } = usePath();
    const pathToSearch = `${path}\\Report`;

    const [fileIndex, setFileIndex] = useState([]);
    const [searchResults, setSearchResults] = useState([]);

    const currentQuery = useRef("");
    const currentProgressivo = useRef("");
    const currentOperatore = useRef("");
    const currentBarcode = useRef("");
    const [selectedStartDate, setSelectedStartDate] = useState("");
    const [selectedEndDate, setSelectedEndDate] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const [viewError, setViewEror] = useState(false);
    const [typeError, setTypeError] = useState("warning");
    const [errorDescription, setErrorDescription] = useState("");

    const initialize = async () => {
        try {
            setIsLoading(true);

            const index = await window.electron.readIndexFile(`${path}\\Masp Tools\\FileIndex\\fileIndex.json`);
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


    const handleFileNameOnChange = useCallback((e) => {
        const value = e?.target?.value || "";
        currentQuery.current = value;

        console.log('currentQuery', currentQuery)
    }, []);

    const handleStartDateChange = useCallback((e) => {
        const value = e?.target?.value || "";
        setSelectedStartDate(value ? new Date(value).toISOString() : "");
    }, []);

    const handleEndDateChange = useCallback((e) => {
        const value = e?.target?.value || "";
        setSelectedEndDate(value ? new Date(value).toISOString() : "");
    }, []);

    const handleProgressivoChange = useCallback((e) => {
        const value = e?.target?.value || "";
        //setCurrentProgressivo(value);
        currentProgressivo.current = value;
    }, []);

    const handleOperatoreChange = useCallback((e) => {
        const value = e?.target?.value || "";
        //setCurrentOperatore(value);
        currentOperatore.current = value;
    }, []);

    const handleBarcodeChange = useCallback((e) => {
        const value = e?.target?.value || "";
        //setCurrentBarcode(value);
        currentBarcode.current = value;
    }, []);


    const handleExitSearch = useCallback(() => {
        //console.log(!selectedEndDate , !selectedStartDate , !currentQuery.current.trim() , !currentProgressivo.current.trim()  , !currentOperatore.current.trim() , !currentBarcode.current.trim() )
        if (!selectedEndDate && !selectedStartDate && !currentQuery.current.trim() && !currentProgressivo.current.trim() && !currentOperatore.current.trim() && !currentBarcode.current.trim()) {
            setErrorDescription("Non è stato inserito nessun parametro");
            setTypeError("error");
            setViewEror(true);
            return false;
        }
        return true;
    }, [selectedEndDate, selectedStartDate, currentQuery, currentProgressivo, currentOperatore, currentBarcode]);


    const handleSearch = () => {
        if (!handleExitSearch())
            return;
        const results = ListaSearchHandler(fileIndex, currentQuery.current, currentProgressivo.current, currentOperatore.current, currentBarcode.current, selectedStartDate, selectedEndDate);
        setSearchResults(results);

        if (results.length === 0) {
            setErrorDescription("Non è stato trovato nessun report \n Se pensi sia sbagliato ricarica i file con l'icona della toolbar sulla destra");
            setTypeError("warning");
            setViewEror(true)
        }
    };

    const handleCancelReportSearch = () => {
        setSearchResults([]);
        setSelectedStartDate("")
        setSelectedEndDate("")
        currentQuery.current = "";
        currentProgressivo.current = "";
        currentOperatore.current = "";
        currentBarcode.current = "";
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
            console.log('parsedContent', parsedContent)
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
                            pathIndex={path}
                            searchResults={searchResults.length > 0 ? searchResults : files}
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
                Type={typeError}
                Title="Attenzione"
                Description={errorDescription}
                Modal={true}
                onClose={() => {
                    setErrorDescription("")
                    setViewEror(false)
                }}
            />}

            {false && <PdfCreator />}
        </>
    );
};
