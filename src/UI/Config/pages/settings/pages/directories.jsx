import React, { useState } from "react";
import ConfirmModal from "../../../../globals/confirm_modal"
import { usePath } from "../../../../../MAIN/Config/PathContext";

export default function Directories({ onConfirm }) {
    const { path, setPath } = usePath();
    const [selectedPath, setSelectedPath] = useState(path);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleSelectPath = async () => {
        const chosenPath = await window.electron.selectPath();
        if (chosenPath) {
            setSelectedPath(chosenPath);
        }
    };

    const handleConfirm = () => {
        setPath(selectedPath);
        console.log("Percorso confermato e salvato:", selectedPath);
        setShowConfirm(false)
        onConfirm()
    };

    return (
        <>
            <div className="Directories">
                <div className="path_selector">
                    <div className="Directories_Title">
                        Percorso principale
                    </div>
                    <div className="Directories_Desc">
                        Il percorso principale è quello che userà l'applicativo per interagire con i file al suo interno
                        <br></br>
                        Si prega di inserire il percorso dove risiedono tutte le cartelle di configurazione (Config, Bin...)
                    </div>
                    <button onClick={handleSelectPath} className="path_button">
                        Cambia
                    </button>
                    <input
                        type="text"
                        value={selectedPath}
                        readOnly
                        className="path_input"
                        placeholder="Nessun percorso selezionato"
                    />

                    {selectedPath && (
                        <button onClick={() => setShowConfirm(true)} className="confirm_button_startup">
                            Conferma
                        </button>
                    )}
                </div>
                <div className="path_selector">
                    <div className="Directories_Title">
                        Percorso dei dummies
                    </div>
                    <div className="Directories_Desc">
                        Il percorso dei dummies è quello che userà l'applicativo per prendere i file template per la generazione dei file
                    </div>
                    <button disabled style={{background: 'rgb(16, 71, 32', color: 'rgb(200,200,200'}}onClick={handleSelectPath} className="path_button">
                        Cambia
                    </button>
                    <input
                        type="text"
                        value={selectedPath}
                        readOnly
                        className="path_input"
                        placeholder="Nessun percorso selezionato"
                        disabled
                    />

                    {selectedPath && (
                        <button onClick={() => setShowConfirm(true)} className="confirm_button_startup">
                            Conferma
                        </button>
                    )}
                </div>
            </div>
            {showConfirm && <ConfirmModal Title="Conferma" Description="Sei sicuro di voler confermare?" onConfirm={handleConfirm} onCancel={() => setShowConfirm(false)} />}
        </>
    );
};