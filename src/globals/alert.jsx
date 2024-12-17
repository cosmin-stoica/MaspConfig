import { IoIosCheckmarkCircle, IoIosCloseCircle, IoIosWarning } from "react-icons/io";

function Alert({ Type, Title, Description, onClose, Modal }) {
    const alertContent = (
        <div
            className={`Alert_MainDiv ${
                Type === 'error'
                    ? 'Alert_Error'
                    : Type === 'warning'
                    ? 'Alert_Warning'
                    : Type === 'success'
                    ? 'Alert_Success'
                    : ''
            }`}
        >
            <button onClick={onClose} className="Alert_MainDiv_Btn">
                X
            </button>
            <div className="Alert_MainDiv_Icon">
                {Type === 'error' ? (
                    <IoIosCloseCircle />
                ) : Type === 'warning' ? (
                    <IoIosWarning />
                ) : Type === 'success' ? (
                    <IoIosCheckmarkCircle />
                ) : (
                    ''
                )}
            </div>
            <div className="Alert_MainDiv_Title">{Title}</div>
            <div className="Alert_MainDiv_Description">{Description}</div>
        </div>
    );

    return Modal ? (
        <div className="confirm_modal_overlay zindex1000">
            {alertContent}
        </div>
    ) : (
        alertContent
    );
}

export default Alert;
