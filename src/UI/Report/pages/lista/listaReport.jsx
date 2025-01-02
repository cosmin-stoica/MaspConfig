import { useEffect, useState } from "react";
import { usePath } from "../../../../MAIN/Config/PathContext";
import CsvViewer from "../../parsers/csvViewer";
import { IoArrowBackCircle } from "react-icons/io5";
import ListaToolbox from "./lista_toolbox";
import ListaTable from "./lista_table";
import Loader from "../../../globals/loader";

export default function ListaReport() {

    const [files, setFiles] = useState([]);
    const [currentPath, setCurrentPath] = useState("");
    const [pathHistory, setPathHistory] = useState([]);
    const [selectedFileContent, setSelectedFileContent] = useState(null);
    const { path } = usePath();
    const pathToSearch = `${path}\\ReportCollaudo`;

    const [fileIndex, setFileIndex] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [currentQuery, setCurrentQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [selectedStartDate, setSelectedStartDate] = useState("");
    const [selectedEndDate, setSelectedEndDate] = useState("");

    useEffect(() => {
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

        initialize();
    }, [pathToSearch]);


    const handleFileNameOnChange = (value) => {
        setCurrentQuery(value);
    };
    const handleStartDateChange = (e) => {
        setSelectedStartDate(new Date(e.target.value).toISOString());
    };
    const handleEndDateChange = (e) => {
        setSelectedEndDate(new Date(e.target.value).toISOString());
    };

    const handleSearch = () => {
        if (!currentQuery.trim() && (!selectedEndDate && !selectedStartDate)) {
            setSearchResults([]);
            return;
        }

        const formatDate = (dateString) => {
            const date = new Date(dateString);
            return date.toISOString().split("T")[0]; // Ritorna solo YYYY-MM-DD
        };


        
        const results = fileIndex.filter((item) => {
            const itemCreationDate = formatDate(item.creationDate);

            const isQueryMatched =
                !item.isFolder &&
                item.csvDataCodice &&
                item.csvDataCodice.toLowerCase().includes(currentQuery.toLowerCase());

            const isStartDateMatched =
                selectedStartDate && itemCreationDate === selectedStartDate;

            const isEndDateMatched =
                selectedStartDate &&
                selectedEndDate &&
                itemCreationDate >= selectedStartDate &&
                itemCreationDate <= selectedEndDate;

            return (
                isQueryMatched &&
                ((selectedStartDate && !selectedEndDate && isStartDateMatched) ||
                    (selectedStartDate && selectedEndDate && isEndDateMatched) ||
                    (!selectedStartDate && !selectedEndDate))
            );
        });

        setSearchResults(results);
    };

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
        } catch (error) {
            console.error("Errore durante il parsing del file:", error);
        }
    };

    const handleFolderClick = (folderPath) => {
        setPathHistory((prevHistory) => [...prevHistory, currentPath]);
        setSearchResults([]);
        loadFiles(folderPath);
    };

    const handleFileClick = (filePath) => {
        parseFile(filePath);
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
                {pathHistory.length > 0 || searchResults.length > 0 && (
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
                        />
                        <div className="table_lista_report_upper">
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
                        </div>
                    </div>
                ) : (
                    <div>
                        <button onClick={() => setSelectedFileContent(null)}>
                            Torna alla lista
                        </button>
                        <CsvViewer data={selectedFileContent} />
                    </div>
                )}
            </div>
        </>
    );
};
