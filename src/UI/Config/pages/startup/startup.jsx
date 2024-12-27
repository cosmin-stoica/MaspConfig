import React, { useState } from "react";
import ConfirmModal from "../../../globals/confirm_modal"
import { usePath } from "../../../../MAIN/Config/PathContext";

export default function Startup({onConfirm}) {
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


      <div className="startup_modal_overlay">
        <div className="startup_maindiv">
          <div className="startup_maindiv_title">Benvenuto in Masp Config</div>
          <div className="startup_maindiv_desc">
            Per cominciare inizia a scegliere qui il path del tuo applicativo
          </div>
          <div className="path_selector">
            <button onClick={handleSelectPath} className="path_button">
              Scegli Percorso
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
        </div>
      </div>

      {showConfirm && <ConfirmModal Title="Conferma" Description="Sei sicuro di voler confermare?" onConfirm={handleConfirm} onCancel={() => setShowConfirm(false)}/>}
    </>
  );
}
