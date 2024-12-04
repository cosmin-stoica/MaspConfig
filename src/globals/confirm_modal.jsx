import React from 'react';

function ConfirmModal({ Title, Description, onConfirm, onCancel }) {
    return (
        <div className='confirm_modal_overlay zindex1000'>
            <div className='confirm_modal'>
                <h2>{Title}</h2>
                <p>{Description}</p>
                <div>
                    <button onClick={onConfirm}>Conferma</button>
                    <button onClick={onCancel}>Annulla</button>
                </div>
            </div>
        </div>
    );
};



export default ConfirmModal;
