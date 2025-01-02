import { IoIosSearch } from "react-icons/io";

export default function CustomInput({ value, handleOnChange, inputRef, placeHolder }) {
    return (
        <>
            <div className="table_lista_report_toolboxBar_searchDiv">
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