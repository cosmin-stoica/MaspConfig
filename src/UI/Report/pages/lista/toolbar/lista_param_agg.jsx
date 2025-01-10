import React from "react";
import CustomInput from "../../../../globals/components/custom_input";
import { IoArrowBackCircle } from "react-icons/io5";

const ListaParamAgg = React.memo(function ({ searchParams, handleInputChange, setOpenOtherParams }) {

    return (
        <div className='confirm_modal_overlay zindex1000'>
            <div
                className="GeneralModal_MainDiv"
            >
                <div className="GeneralModal_Header">
                    Parametri Aggiuntivi
                    <div className="GeneralModal_Btn_Exit">
                        <IoArrowBackCircle onClick={() => setOpenOtherParams(false)} />
                    </div>
                </div>
                <div className="table_lista_report_toolboxBar_otherParams_MainDiv">
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
                        <div className="c-black">
                            In caso fosse presente solo la data di inizio la ricerca viene fatta presentando i report con data uguale
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
        </div>
    );
});

export default ListaParamAgg;
