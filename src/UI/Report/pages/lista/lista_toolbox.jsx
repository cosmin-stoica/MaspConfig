import { IoIosSearch } from "react-icons/io";
import { IoSearchCircle } from "react-icons/io5";
import { TbZoomCancelFilled } from "react-icons/tb";
import { useRef, useState } from "react";

export default function ListaToolbox({ path, handleFileNameOnChange, handleSearchBtn, handleStartDateChange, handleEndDateChange }) {
    const inputRef = useRef(null);

    const handleCancelSearch = () => {
        if (inputRef.current) {
            inputRef.current.value = "";
            handleFileNameOnChange("");
        }
    };

    return (
        <>
            <div className="table_lista_report_toolboxBar">
                <div className="table_lista_report_toolboxBar_pathDiv">
                    {path}
                </div>
                <div className="table_lista_report_toolboxBar_searchDiv">
                    <div>
                        <IoIosSearch />
                    </div>
                    <input
                        type="text"
                        placeholder="Cerca codice"
                        onChange={(e) => handleFileNameOnChange(e.target.value)}
                        ref={inputRef}
                    />
                </div>
                <div className="table_lista_report_toolboxBar_searchBtn" onClick={handleSearchBtn}>
                    <IoSearchCircle />
                </div>
                <div className="table_lista_report_toolboxBar_searchBtn" onClick={handleCancelSearch}>
                    <TbZoomCancelFilled />
                </div>
                <div className="table_lista_report_toolboxBar_datePickerDiv">
                    <input
                        type="date"
                        onChange={handleStartDateChange}
                    />
                </div>
                <div className="table_lista_report_toolboxBar_datePickerDiv">
                    <input
                        type="date"
                        onChange={handleEndDateChange}
                    />
                </div>
            </div>
        </>
    );
};
