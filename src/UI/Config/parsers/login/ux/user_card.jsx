import { PiUserFill, PiUserGearFill, PiEraserFill, PiPencilBold, PiArrowSquareUpRightFill } from "react-icons/pi";
import ConfirmModal from "../../../../globals/confirm_modal"
import { useState } from "react";
import UserCardViewer from "./user_card_viewer";

function UserCard({ ID, Username, Password, Role, onDelete, onSave, Barcode, Fingerprint }) {
    const [openModal, setOpenModal] = useState(false);
    const [seeInfo, setSeeInfo] = useState(false);
    const [seeInfoModify, setSeeInfoModify] = useState(false);

    const handleOnDelete = () => {
        onDelete();
        setOpenModal(false);
    };

    const handleOnSave = (updatedUser) => {
        onSave(updatedUser);
        setSeeInfoModify(false);
    }

    return (
        <>
            {openModal && (
                <ConfirmModal
                    Title="Conferma"
                    Description="Sei sicuro di voler eliminare l'utente?"
                    onConfirm={handleOnDelete}
                    onCancel={() => setOpenModal(false)}
                />
            )}
            <div className="user_card">
                <div className="user_card_icon">
                    {Role === "Coord" || Role === "Admin" ? <PiUserGearFill /> : <PiUserFill />}
                    <div className="user_card_icon_index">
                        {ID}
                    </div>
                </div>
                <div className="user_card_desc">
                    <div className="user_card_desc_item_user">{Username}</div>
                    <div className="user_card_desc_item_pass">{Password}</div>
                    <div className="user_card_desc_item_role">{Role !== "N/A" ? Role : ''}</div>
                </div>
                <div className="user_card_buttons">
                    <PiArrowSquareUpRightFill className="user_card_button" onClick={() => setSeeInfo(true)} />
                    <PiPencilBold className="user_card_button" onClick={() => setSeeInfoModify(true)} />
                    <PiEraserFill className="user_card_button" onClick={() => setOpenModal(true)} />
                </div>
            </div>
            {seeInfo && <UserCardViewer Mode="visualize" Username={Username} Password={Password} Role={Role} Barcode={Barcode} Fingerprint={Fingerprint} onClose={() => setSeeInfo(false)} />}
            {seeInfoModify && <UserCardViewer Mode="modify" onSave={handleOnSave} Username={Username} Password={Password} Role={Role} Barcode={Barcode} Fingerprint={Fingerprint} />}
        </>
    );
}

export default UserCard;

