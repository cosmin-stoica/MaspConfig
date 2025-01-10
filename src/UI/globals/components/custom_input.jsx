import { IoIosSearch } from "react-icons/io";
import { usePath } from "../../../MAIN/Config/PathContext";

export default function CustomInput({ width, value, handleOnChange, inputRef, placeHolder }) {
    const { modTablet } = usePath();

    const handleFocus = () => {
        if (modTablet)
            window.electron.openKeyboard();
    };


    return (
        <>
            <div className="table_lista_report_toolboxBar_searchDiv" style={{width : width}}>
                <div>
                    <IoIosSearch />
                </div>
                <input
                    value={value}
                    type="text"
                    placeholder={placeHolder}
                    onChange={(e) => handleOnChange(e)}
                    ref={inputRef} 
                    onClick={handleFocus}
                />
            </div>
        </>
    );
}