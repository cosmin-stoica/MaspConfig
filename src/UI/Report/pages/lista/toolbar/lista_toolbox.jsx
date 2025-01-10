import { IoSearchCircle } from "react-icons/io5";
import { TbZoomCancelFilled } from "react-icons/tb";
import { useState, useCallback, useMemo, useRef, useReducer, } from "react";
import { IoArrowBackCircle } from "react-icons/io5";
import CustomInput from "../../../../globals/components/custom_input";
import { BsPlusCircleFill } from "react-icons/bs";
import ConfirmModal from "../../../../globals/components/confirm_modal";
import { IoMdRefreshCircle } from "react-icons/io";
import ListaParamAgg from "./lista_param_agg";


export default function ListaToolbox({
    path,
    pathIndex,
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
    const [showConfirmRefresh, setShowConfirmRefresh] = useState(false);

    const [searchParams, setSearchParams] = useState({
        startDate: "",
        endDate: "",
        progressivo: "",
        operatore: "",
        barcode: "",
    });

    const handleInputChange = useCallback((key, e) => {
        const value = e?.target?.value || "";

        //searchParams.current = {
        //    ...searchParams.current,
        //    [key]: value,
        //};

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
                console.log("Caricamento completato, stato aggiornato.");
            }
        };
        setIsLoading(true);
        updateIndex();
        handleReloadIndex();
    }
    
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
                    setShowConfirmRefresh(false)
                }}
            />}
        </>
    );
};
