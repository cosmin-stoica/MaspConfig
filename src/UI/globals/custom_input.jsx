import { IoIosSearch } from "react-icons/io";

export default function CustomInput({ width100, value, handleOnChange, inputRef, placeHolder }) {
    return (
        <>
            <div className="table_lista_report_toolboxBar_searchDiv" style={{width : width100 ? "100%" : "10%"}}>
                <div>
                    <IoIosSearch />
                </div>
                <input
                    value={value}
                    type="text"
                    placeholder={placeHolder}
                    onChange={(e) => handleOnChange(e)}
                    ref={inputRef} 
                />
            </div>
        </>
    );
}