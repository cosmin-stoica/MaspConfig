import { useState } from "react";
import { PiFloppyDiskFill } from "react-icons/pi";
import { TbReload } from "react-icons/tb";
import { MdDelete } from "react-icons/md";

export default function JobToolPanel({
    setShowConfirmSave,
    setShowConfirmReload,
    setShowConfirmDelete,
    onCheckboxChange, 
}) {
    const [isChecked, setIsChecked] = useState(false);

    const handleOrdinaJob = () => {
        const newValue = !isChecked;
        setIsChecked(newValue);
        onCheckboxChange(newValue);
    };

    return (
        <div className="HalParserViewer_Toolpanel">
            <div>
                <PiFloppyDiskFill onClick={() => setShowConfirmSave(true)} />
            </div>
            <div>
                <TbReload onClick={() => setShowConfirmReload(true)} />
            </div>
            <div>
                <MdDelete onClick={() => setShowConfirmDelete(true)} />
            </div>
            <div className="JobToolPanel_Part" onClick={handleOrdinaJob}>
                <div className="JobToolPanel_Title">
                    Reorder automatico
                </div>
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) => {
                        const newValue = e.target.checked;
                        setIsChecked(newValue);
                        onCheckboxChange(newValue); 
                    }}
                />
            </div>
        </div>
    );
}
