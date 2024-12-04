import React, { useState } from 'react';

const CommentModal = ({ isOpen, onClose, onSave, currentComment}) => {
    const [comment, setComment] = useState(currentComment);

    const handleSave = () => {
        onSave(comment);
        onClose();
    };

    return isOpen ? (
        <>
            <div className="modal-overlayComment">
                <div className="modalBrowser">
                <button className="btn-closeBrowser" onClick={onClose}>
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                        >
                            <path fill="none" d="M0 0h24v24H0V0z"></path>
                            <path
                                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
                                fill="var(--c-text-secondary)"
                            ></path>
                        </svg>
                    </button>
                    <div className="modal-headerBrowser">
                        <div className="modal-bodyBrowserComment">

                            <h2>Aggiungi Commento</h2>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                rows="5"
                            />
                            <button className="SalvaCommentoBtn" onClick={handleSave}>Salva</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    ) : null;
};

export default CommentModal;
