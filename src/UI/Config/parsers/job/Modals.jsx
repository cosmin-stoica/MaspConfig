import Alert from "../../../globals/components/alert";
import ConfirmModal from "../../../globals/components/confirm_modal"

export default function Modals({
    showConfirmReload,
    showDummyAlert,
    handleReload,
    setShowConfirmReload,
    setShowDummyAlert,
    DummyAlertMsg,
    showConfirmSave,
    setShowConfirmSave,
    handleSave
}) {
    return (
        <>
            {showConfirmSave && (
                <ConfirmModal 
                    Title="Conferma"
                    Description="Vuoi salvare il job?"
                    onCancel={() => setShowConfirmSave(false)}
                    onConfirm={handleSave}
                />
            )}

            {showConfirmReload && (
                <ConfirmModal
                    Title="Conferma"
                    Description="Vuoi ricaricare la configurazione dei parametri?"
                    onConfirm={handleReload}
                    onCancel={() => setShowConfirmReload(false)}
                />
            )}

            {showDummyAlert && (
                <Alert
                    Type="warning"
                    Title="Warning"
                    Description={DummyAlertMsg}
                    onClose={() => setShowDummyAlert(false)}
                />
            )}
            
        </>
    );
}
