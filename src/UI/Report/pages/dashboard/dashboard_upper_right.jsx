import { useState, useEffect } from "react";
import { HiArrowCircleDown } from "react-icons/hi";
import { Link } from "react-router-dom";
import ConfirmModal from "../../../globals/components/confirm_modal"
import { usePath } from "../../../../MAIN/Config/PathContext";
import Alert from "../../../globals/components/alert";

function Dashboard_Upper_Right({setIsLoading}) {

    const [showConfirm, setShowConfirm] = useState(false);
    const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const { path } = usePath();

    const [lastBackup, setLastBackup] = useState("");

    const getLastBackup = async () => {
        try {
            const success = await window.electron.getFiles(`${path}/Masp Tools/Backup Report`);
            const lastItem = success[success.length - 1];
            console.log(lastItem)
            setLastBackup(lastItem);
        } catch (error) {
            console.error("Errore durante il backup:", error);
        }
    };

    useEffect(() => {
        getLastBackup();
    }, []);

    const handleBackup = async () => {
        if (!path) {
            console.error("Entrambe le cartelle devono essere specificate.");
            return;
        }

        console.log(path);
        setIsLoading(true);
        setShowConfirm(false);

        try {
            const success = await window.electron.backupFolder(`${path}/Report`, `${path}/Masp Tools/Backup Report`);
            console.log(success ? "Backup completato con successo!" : "Errore durante il backup.");
            setShowConfirm(false);
            setShowSuccess(true);
            getLastBackup();
        } catch (error) {
            console.error("Errore durante il backup:", error);
            setShowError(true);
        } finally {
            setIsLoading(false);
        }
    };


    const formatDate = (isoString) => {
        if (!isoString) return "Nessun backup registrato";

        // Correggi il formato sostituendo i `-` con `:`
        const correctedIsoString = isoString.replace(/T(\d+)-(\d+)-(\d+)/, "T$1:$2:$3");

        // Crea un oggetto Date
        const date = new Date(correctedIsoString);

        // Verifica se il costruttore `Date` ha creato una data valida
        if (isNaN(date)) return "Formato data non valido";

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const seconds = String(date.getSeconds()).padStart(2, "0");

        return `${year} ${month} ${day} ${hours}:${minutes}:${seconds}`;
    };





    return (
        <>
            <div className="Dashboard_Upper_Right_MainDiv">
                Backup
                <div className="Dashboard_Upper_Right_Icon">
                    {/*<Link to="/doc">
                        <HiArrowCircleDown />
    </Link>*/}
                    <HiArrowCircleDown onClick={() => setShowConfirm(true)} />
                </div>
                <div className="Dashboard_Upper_Right_Backup">
                    <div> Ultimo backup</div>
                    {lastBackup ? formatDate(lastBackup) : "Ancora non effettuato"}
                </div>
            </div>
            {showConfirm && <ConfirmModal
                Title="Conferma"
                Description="Sei sicuro di voler eseguire un backup dei report? Troverai il backup dentro Masp Tools/Backup Report"
                onCancel={() => setShowConfirm(false)}
                onConfirm={handleBackup}
            />}
            {showSuccess && <Alert
                Type="success"
                Title="Successo"
                Description="Backup effettuato con successo! Troverai il backup dentro Masp Tools/Backup Report"
                onClose={() => setShowSuccess(false)}
            />
            }
            {showError && <Alert
                Type="error"
                Title="Errore"
                Description="Backup fallito. Riapire il programma o contattare l'assistenza"
                onClose={() => setShowError(false)}
            />
            }
        </>
    );
}

export default Dashboard_Upper_Right;
