import { useState } from "react";
import CustomInput from "../../../globals/custom_input";
import { TbZoomCancelFilled } from "react-icons/tb";

export default function CsvViewerToolbar({ handleOnWordChange }) {
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        handleOnWordChange(e);
    };

    const clearInput = () => {
        setInputValue("");
        handleOnWordChange({ target: { value: "" } });
    };

    return (
        <>
            <div className="CsvViewer_Toolbar_MainDiv">
                <CustomInput
                    width100={true}
                    placeHolder="Cerca parola..."
                    value={inputValue}
                    handleOnChange={handleInputChange}
                />
                <div className="CsvViewer_Toolbar_CancelIcon" onClick={clearInput}>
                    <TbZoomCancelFilled />
                </div>
            </div>
        </>
    );
};
