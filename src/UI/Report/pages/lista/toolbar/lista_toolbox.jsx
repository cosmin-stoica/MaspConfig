import { IoSearchCircle } from "react-icons/io5";
import { TbZoomCancelFilled } from "react-icons/tb";
import { useState, useCallback } from "react";
import { FaFilePdf } from "react-icons/fa6";
import CustomInput from "../../../../globals/components/custom_input";
import { BsPlusCircleFill } from "react-icons/bs";
import ConfirmModal from "../../../../globals/components/confirm_modal";
import { IoMdRefreshCircle } from "react-icons/io";
import ListaParamAgg from "./lista_param_agg";
import Alert from "../../../../globals/components/alert";
import PdfCreator from "../../../pdf/pdf_creator";
import Loader from "../../../../globals/loader";


export default function ListaToolbox({
    path,
    pathIndex,
    searchResults,
    handleFileNameOnChange,
    handleSearchBtn,
    handleStartDateChange,
    handleEndDateChange,
    handleCancelReportSearch,
    handleProgressivoChange,
    handleOperatoreChange,
    handleBarcodeChange,
    setIsLoading,
    handleReloadIndex
}) {


    const [openOtherParams, setOpenOtherParams] = useState(false);
    const closeOtherParams = useCallback(() => setOpenOtherParams(false), []);
    const [showConfirm, setShowConfirm] = useState(false);

    const [showConfirmPdfCreation, setShowConfirmPdfCreation] = useState(false);
    const [showConfirmPdfCreationInner, setShowConfirmPdfCreationInner] = useState(false);
    const [showErrorFindingPdf, setShowErrorFindingPdf] = useState(false);
    const [showErrorPdfNumberExcedeed, setShowErrorPdfNumberExcedeed] = useState(false);

    const [showConfirmRefresh, setShowConfirmRefresh] = useState(false);
    const [showRefreshingDone, setShowRefreshingDone] = useState(false);

    const [searchParams, setSearchParams] = useState({
        startDate: "",
        endDate: "",
        progressivo: "",
        operatore: "",
        barcode: "",
    });

    const handleInputChange = useCallback((key, e) => {
        const value = e?.target?.value || "";

        setSearchParams((prev) => ({
            ...prev,
            [key]: value,
        }));
        const handlers = {
            codice: handleFileNameOnChange,
            startDate: handleStartDateChange,
            endDate: handleEndDateChange,
            progressivo: handleProgressivoChange,
            operatore: handleOperatoreChange,
            barcode: handleBarcodeChange,
        };

        if (handlers[key]) {
            handlers[key](e);
        }


    }, [handleFileNameOnChange, handleStartDateChange, handleEndDateChange, handleProgressivoChange, handleOperatoreChange, handleBarcodeChange]);


    const handleCancelSearch = () => {
        setSearchParams({
            codice: "",
            progressivo: "",
            operatore: "",
            startDate: "",
            endDate: "",
            barcode: "",
        });

        handleFileNameOnChange("");
        handleStartDateChange("");
        handleEndDateChange("");
        handleProgressivoChange("");
        handleBarcodeChange("");
        handleCancelReportSearch();
    };

    const handleConfirmRefresh = () => {
        const pathToSearch = `${pathIndex}\\Report`;
        const pathToSave = `${pathIndex}\\Masp Tools\\FileIndex\\fileIndex.json`;

        const updateIndex = async () => {
            console.log("Inizio aggiornamento indice...");
            try {
                await window.electron.indexFilesAndFolders(pathToSearch, pathToSave);
                console.log("Indice aggiornato correttamente.");
            } catch (error) {
                console.error("Errore durante l'aggiornamento dell'indice:", error);
            } finally {
                setIsLoading(false);
                handleReloadIndex();
                setShowRefreshingDone(true);
                console.log("Caricamento completato, stato aggiornato.");
            }
        };

        setIsLoading(true);
        updateIndex();
    };


    const [mergedData, setMergedData] = useState(null);
    const [fileItems, setFileItems] = useState([]);

    const parseAllFilesFromSearching = async () => {

        if(searchResults.length > 500){
            setShowErrorPdfNumberExcedeed(true);
            console.log('Errore', 'Lunghezza dei risultati > 500', searchResults.length);
            return;
        }

        try {
            setIsLoading(true);
            console.log(searchResults);

            const itt = searchResults.filter(item => !item.isFolder);

            const filesWithKeys = itt.reduce((acc, item, index) => {
                acc[`file_${index + 1}`] = item;
                return acc;
            }, {});
            setFileItems(filesWithKeys);

            const parsedContents = await Promise.all(
                itt.map(item => window.electron.parseCsvFile(item.fullPath))
            );

            const merged = parsedContents.reduce((acc, content, index) => {
                acc[`file_${index + 1}`] = content;
                return acc;
            }, {});


            if (!merged || Object.keys(merged).length === 0) {
                setShowErrorFindingPdf(true);
                return;
            }

            setMergedData(merged);
            setShowConfirmPdfCreationInner(true);
        } catch (error) {
            console.error("Errore durante il parsing del file:", error);
        } finally {
            setIsLoading(false);
        }
    };



    return (
        <>
            <div className="table_lista_report_toolboxBar">
                <div className="table_lista_report_toolboxBar_pathDiv">
                    {path}
                </div>
                <CustomInput
                    value={searchParams.codice}
                    handleOnChange={(e) => handleInputChange("codice", e)}
                    placeHolder="Cerca per codice"
                    width="45%"
                />
                <div className="table_lista_report_toolboxBar_search_advanced_Btn"
                    onClick={() => setOpenOtherParams(true)}>
                    <BsPlusCircleFill />
                </div>
                <div className="table_lista_report_toolboxBar_searchBtn" onClick={handleSearchBtn}>
                    <IoSearchCircle />
                </div>
                <div className="table_lista_report_toolboxBar_pdfBtn" onClick={() => setShowConfirmPdfCreation(true)}><FaFilePdf /></div>
                <div className="table_lista_report_toolboxBar_search_cancel_Btn" onClick={() => setShowConfirm(true)}>
                    <TbZoomCancelFilled />
                </div>
                <div className="table_lista_report_toolboxBar_search_cancel_Btn refresh" onClick={() => setShowConfirmRefresh(true)}>
                    <IoMdRefreshCircle />
                </div>
            </div>
            {openOtherParams &&
                <ListaParamAgg
                    handleInputChange={handleInputChange}
                    setOpenOtherParams={closeOtherParams}
                    searchParams={searchParams}
                />
            }

            {showConfirm && <ConfirmModal
                Title="Conferma"
                Description="Sei sicuro di voler cancellare la ricerca?"
                onCancel={() => {
                    setShowConfirm(false)
                }}
                onConfirm={() => {
                    handleCancelSearch();
                    setShowConfirm(false)
                }}
            />}
            {showConfirmRefresh && <ConfirmModal
                Title="Conferma"
                Description="Sei sicuro di voler ricaricare i  file?"
                onCancel={() => {
                    setShowConfirmRefresh(false)
                }}
                onConfirm={() => {
                    handleConfirmRefresh();
                    setShowConfirmRefresh(false);
                }}
            />}
            {showRefreshingDone && <Alert
                Type="success"
                Title="Successo"
                Description={`Hai ricaricato i file correttamente \n Ritorna alla Dashboard e poi su Lista per completare il refresh`}
                onClose={() => setShowRefreshingDone(false)}
                Modal={true}
            />}
            {showConfirmPdfCreation && <ConfirmModal
                Title="Conferma"
                Description="Stai per creare un pdf dei report per la pagina corrente, sei sicuro?"
                onCancel={() => {
                    setShowConfirmPdfCreation(false)
                }}
                onConfirm={() => {
                    parseAllFilesFromSearching();
                    setShowConfirmPdfCreation(false);
                }}
            />}
            {showConfirmPdfCreationInner && <PdfCreator
                dataMerged={mergedData}
                dataFileMultiple={fileItems}
                OnExit={() => setShowConfirmPdfCreationInner(false)}
                setIsLoading={setIsLoading}
                useLoader={true}
            />}
            {showErrorFindingPdf && <Alert
                Type="error"
                Title="Errore"
                Description="Non sono stati trovati file pdf in questa ricerca"
                onClose={() => setShowErrorFindingPdf(false)}
                Modal={true}
            />}
            {showErrorPdfNumberExcedeed && <Alert
                Type="error"
                Title="Errore"
                Description="Puoi creare un pdf su un massimo di 500 report"
                onClose={() => setShowErrorPdfNumberExcedeed(false)}
                Modal={true}
            />}
        </>
    );
};
