import React, { useState } from 'react';

function UserModal({ onConfirm, onCancel }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [barcodeUtilizzatore, setBarcodeUtilizzatore] = useState('');
    const [fileFingerprint, setFileFingerprint] = useState('');

    const handleConfirm = () => {
        const userData = {
            username,
            password,
            role,
        };

        userData.barcodeUtilizzatore = barcodeUtilizzatore;
        userData.fileFingerprint = fileFingerprint;

        onConfirm(userData);
    };

    return (
        <div className='confirm_modal_overlay'>
            <div className="user_modal">
                <form className="user_modal_form" onSubmit={(e) => e.preventDefault()}>
                    <h2>Inserisci Utente</h2>
                    <div className="user_modal_form_group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="user_modal_form_group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="user_modal_form_group">
                        <label htmlFor="role">Ruolo</label>
                        <select
                            id="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            required
                        >
                            <option value="">Seleziona un ruolo</option>
                            <option value="Admin">Admin</option>
                            <option value="Coord">Coord</option>
                        </select>
                    </div>

                    <>
                        <div className="user_modal_form_group">
                            <label htmlFor="barcodeUtilizzatore">Barcode Utilizzatore</label>
                            <input
                                type="text"
                                id="barcodeUtilizzatore"
                                value={barcodeUtilizzatore}
                                onChange={(e) => setBarcodeUtilizzatore(e.target.value)}
                                required
                            />
                        </div>
                        <div className="user_modal_form_group">
                            <label htmlFor="fileFingerprint">File Fingerprint</label>
                            <input
                                type="text"
                                id="fileFingerprint"
                                value={fileFingerprint}
                                onChange={(e) => setFileFingerprint(e.target.value)}
                                required
                            />
                        </div>
                    </>

                    <div className="user_modal_form_actions">
                        <button className='user_modal_form_actions_buttonconfirm' type="button" onClick={handleConfirm}>
                            Conferma
                        </button>
                        <button className='user_modal_form_actions_buttonannulla' type="button" onClick={onCancel}>
                            Annulla
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UserModal;
