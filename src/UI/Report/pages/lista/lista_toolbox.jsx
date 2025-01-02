import { IoSearchCircle } from "react-icons/io5";
import { TbZoomCancelFilled } from "react-icons/tb";
import { useState } from "react";
import { IoArrowBackCircle } from "react-icons/io5";
import CustomInput from "../../../globals/custom_input";
import { BsPlusCircleFill } from "react-icons/bs";

export default function ListaToolbox({
    path,
    handleFileNameOnChange,
    handleSearchBtn,
    handleStartDateChange,
    handleEndDateChange,
    handleCancelReportSearch,
    handleProgressivoChange,
    handleOperatoreChange
}) {
    const [openOtherParams, setOpenOtherParams] = useState(false);

    const [searchParams, setSearchParams] = useState({
        codice: "",
        progressivo: "",
        operatore: "",
        startDate: "",
        endDate: "",
    });

    const handleInputChange = (key, e) => {
        const value = e.target.value;
        setSearchParams((prev) => ({ ...prev, [key]: value }));
        if (key === "codice") handleFileNameOnChange(e);
        if (key === "startDate") handleStartDateChange(e);
        if (key === "endDate") handleEndDateChange(e);
        if (key === "progressivo") handleProgressivoChange(e);
        if (key === "operatore") handleOperatoreChange(e);
    };

    const handleCancelSearch = () => {
        setSearchParams({
            codice: "",
            progressivo: "",
            operatore: "",
            startDate: "",
            endDate: "",
        });
        handleFileNameOnChange("");
        handleStartDateChange("");
        handleEndDateChange("");
        handleProgressivoChange("");
        handleCancelReportSearch();
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
                />
                <div className="table_lista_report_toolboxBar_search_advanced_Btn"
                    onClick={() => setOpenOtherParams(true)}>
                    <BsPlusCircleFill />
                </div>
                <div className="table_lista_report_toolboxBar_searchBtn" onClick={handleSearchBtn}>
                    <IoSearchCircle />
                </div>
                <div className="table_lista_report_toolboxBar_search_cancel_Btn" onClick={handleCancelSearch}>
                    <TbZoomCancelFilled />
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
                            />
                        </div>
                        <div className="table_lista_report_toolboxBar_otherParams_SingleDiv">
                            <h1>Ricerca per operatore</h1>
                            <CustomInput
                                value={searchParams.operatore}
                                handleOnChange={(e) => handleInputChange("operatore", e)}
                                placeHolder="Cerca per operatore"
                            />
                        </div>
                    </div>
                </div>
            }
        </>
    );
};
