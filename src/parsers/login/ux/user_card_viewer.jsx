import { useState } from "react";

function UserCardViewer({ Mode, onClose, Username, Password, Role, Barcode, Fingerprint, onSave }) {
    const [editedUsername, setEditedUsername] = useState(Username);
    const [editedPassword, setEditedPassword] = useState(Password);
    const [editedRole, setEditedRole] = useState(Role);
    const [editedBarcode, setEditedBarcode] = useState(Barcode);
    const [editedFingerprint, setEditedFingerprint] = useState(Fingerprint);

    const handleSave = () => {
        onSave({
            Username: editedUsername,
            Password: editedPassword,
            Role: editedRole,
            Barcode: editedBarcode,
            Fingerprint: editedFingerprint,
        });
    };

    return (
        <>
            <div className='confirm_modal_overlay'>
                <div className="user_card_viewer">
                    <button onClick={onClose}>X</button>
                    <div className="user_card_viewer_descpart">
                        <div className="user_card_viewer_circle">
                            {Username.charAt(0)}
                        </div>
                        <div className="user_card_viewer_desc">
                            <div className="user_card_viewer_desc_item">
                                <label>Username</label>
                                {Mode === "visualize" ? Username : (
                                    <input
                                        type="text"
                                        value={editedUsername}
                                        onChange={(e) => setEditedUsername(e.target.value)}
                                    />
                                )}
                            </div>
                            <div className="user_card_viewer_desc_item">
                                <label>Password</label>
                                {Mode === "visualize" ? Password : (
                                    <input
                                        type="text"
                                        value={editedPassword}
                                        onChange={(e) => setEditedPassword(e.target.value)}
                                    />
                                )}
                            </div>
                            <div className="user_card_viewer_desc_item">
                                <label>Ruolo</label>
                                {Mode === "visualize" ? (
                                    Role
                                ) : (
                                    <select value={editedRole} onChange={(e) => setEditedRole(e.target.value)}>
                                        <option value="">Nessuno</option>
                                        <option value="Coord">Coord</option>
                                        <option value="Admin">Admin</option>
                                    </select>
                                )}
                            </div>

                        </div>
                    </div>
                    <div className="user_card_viewer_desc_item">
                        <label>Barcode</label>
                        {Mode === "visualize" ? Barcode : (
                            <input
                                type="text"
                                value={editedBarcode}
                                onChange={(e) => setEditedBarcode(e.target.value)}
                            />
                        )}
                    </div>
                    <div className="user_card_viewer_desc_item">
                        <label>Fingerprint</label>
                        {Mode === "visualize" ? Fingerprint : (
                            <input
                                type="text"
                                value={editedFingerprint}
                                onChange={(e) => setEditedFingerprint(e.target.value)}
                            />
                        )}
                    </div>
                    {Mode === "modify" && (
                        <button onClick={handleSave}>Salva</button>
                    )}
                </div>
            </div>
        </>
    );
}

export default UserCardViewer;
