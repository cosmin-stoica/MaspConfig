import { useState } from "react";
import CustomInput from "../../../globals/custom_input";
import { TbZoomCancelFilled } from "react-icons/tb";
import { FaFilePdf } from "react-icons/fa6";
import ConfirmModal from "../../../globals/confirm_modal"

export default function CsvViewerToolbar({ handleOnWordChange, handleOnPdf }) {
    const [inputValue, setInputValue] = useState("");
    const [showConfirm, setShowConfirm] = useState(false);


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
                    width="100%"
                    placeHolder="Cerca parola chiave..."
                    value={inputValue}
                    handleOnChange={handleInputChange}
                />
                <div className="CsvViewer_Toolbar_CancelIcon" onClick={clearInput}>
                    <TbZoomCancelFilled />
                </div>
                <div className="CsvViewer_Toolbar_CancelIcon" onClick={() => setShowConfirm(true)}>
                    <FaFilePdf />
                </div>
            </div>
            {showConfirm && <ConfirmModal
                Title="Conferma"
                Description="Sei sicuro di voler creare una relazione pdf?"
                onCancel={() => {
                    setShowConfirm(false)
                }}
                onConfirm={() => {
                    handleOnPdf();
                    setShowConfirm(false)
                }}
            />}
        </>
    );
};
