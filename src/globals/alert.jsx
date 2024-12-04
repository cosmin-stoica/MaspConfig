import { IoIosCheckmarkCircle, IoIosCloseCircle,IoIosWarning   } from "react-icons/io";

function Alert({ Type, Title, Description, onClose }) {
    return (
        <div className={`Alert_MainDiv ${Type === 'error' ? 'Alert_Error' : Type === 'warning' ? 'Alert_Warning' : Type === 'success' ? 'Alert_Success' : ''}`}>
            <button onClick={onClose} className="Alert_MainDiv_Btn">X</button>
            <div className="Alert_MainDiv_Icon">
            {Type === 'error' ? <IoIosCloseCircle/> : Type === 'warning' ? <IoIosWarning/> : Type === 'success' ? <IoIosCheckmarkCircle/> : ''}
            </div>
            <div className="Alert_MainDiv_Title">
                {Title}
            </div>
            <div className="Alert_MainDiv_Description">
                {Description}
            </div>
        </div>
    );
}

export default Alert;
