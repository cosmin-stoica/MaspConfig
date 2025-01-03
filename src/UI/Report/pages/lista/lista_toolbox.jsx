import { IoSearchCircle } from "react-icons/io5";
import { TbZoomCancelFilled } from "react-icons/tb";
import { useState } from "react";
import { IoArrowBackCircle } from "react-icons/io5";
import CustomInput from "../../../globals/custom_input";
import { BsPlusCircleFill } from "react-icons/bs";
import ConfirmModal from "../../../globals/confirm_modal";
import { IoMdRefreshCircle } from "react-icons/io";


export default function ListaToolbox({
    path,
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
    const [showConfirm, setShowConfirm] = useState(false);
    const [showConfirmRefresh, setShowConfirmRefresh] = useState(false);

    const [searchParams, setSearchParams] = useState({
        codice: "",
        progressivo: "",
        operatore: "",
        startDate: "",
        endDate: "",
        barcode: "",
    });

    const handleInputChange = (key, e) => {
        const value = e.target.value;
        setSearchParams((prev) => ({ ...prev, [key]: value }));
        if (key === "codice") handleFileNameOnChange(e);
        if (key === "startDate") handleStartDateChange(e);
        if (key === "endDate") handleEndDateChange(e);
        if (key === "progressivo") handleProgressivoChange(e);
        if (key === "operatore") handleOperatoreChange(e);
        if (key === "barcode") handleBarcodeChange(e);
    };

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
        const pathToSearch = `${path}`;
        const pathToSave = `${path}\\fileIndex.json`;

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
                <div className="confirm_modal_overlay zindex1000">
                    <div className="table_lista_report_toolboxBar_otherParams_MainDiv">
                        <div className="table_lista_report_toolboxBar_otherParams_MainDiv_Title">
                            Parametri Aggiuntivi
                        </div>
                        <div className="table_lista_report_toolboxBar_otherParams_MainDiv_ExitBtn"
                            onClick={() => setOpenOtherParams(false)}>
                            <IoArrowBackCircle />
                        </div>

                        <div className="table_lista_report_toolboxBar_otherParams_SingleDiv">
                            <h1>Ricerca per data</h1>
                            <div className="table_lista_report_toolboxBar_datePickerDiv">
                                <label>Data di inizio</label>
                                <input
                                    type="date"
                                    value={searchParams.startDate}
                                    onChange={(e) => handleInputChange("startDate", e)}
                                />
                            </div>
                            <div className="table_lista_report_toolboxBar_datePickerDiv">
                                <label>Data di fine</label>
                                <input
                                    type="date"
                                    value={searchParams.endDate}
                                    onChange={(e) => handleInputChange("endDate", e)}
                                />
                            </div>
                            <div>In caso fosse presente solo la data di inizio la ricerca
                                viene fatta presentando i report con data uguale
                            </div>
                        </div>
                        <div className="table_lista_report_toolboxBar_otherParams_SingleDiv">
                            <h1>Ricerca per progressivo</h1>
                            <CustomInput
                                value={searchParams.progressivo}
                                handleOnChange={(e) => handleInputChange("progressivo", e)}
                                placeHolder="Cerca per progressivo"
                                width="98%"
                            />
                        </div>
                        <div className="table_lista_report_toolboxBar_otherParams_SingleDiv">
                            <h1>Ricerca per operatore</h1>
                            <CustomInput
                                value={searchParams.operatore}
                                handleOnChange={(e) => handleInputChange("operatore", e)}
                                placeHolder="Cerca per operatore"
                                width="98%"
                            />
                        </div>
                        <div className="table_lista_report_toolboxBar_otherParams_SingleDiv">
                            <h1>Ricerca per barcode</h1>
                            <CustomInput
                                value={searchParams.barcode}
                                handleOnChange={(e) => handleInputChange("barcode", e)}
                                placeHolder="Cerca per barcode"
                                width="98%"
                            />
                        </div>
                    </div>
                </div>
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
