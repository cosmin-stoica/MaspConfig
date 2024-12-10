import { PiFloppyDiskFill } from "react-icons/pi";
import { TbReload } from "react-icons/tb";
import { MdDelete, MdAddCircle } from "react-icons/md";

export default function ToolPanel({ isAvv, setShowConfirmSave, setShowConfirmReload, setShowConfirmDelete, setShowAddProgramma }) {
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
            {isAvv && (
                <div>
                    <MdAddCircle onClick={() => setShowAddProgramma(true)} />
                </div>
            )}
        </div>
    );
}
