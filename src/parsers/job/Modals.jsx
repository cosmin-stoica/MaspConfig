import Alert from "../../globals/alert";
import ConfirmModal from "../../globals/confirm_modal";

export default function Modals({
    showConfirmReload,
    showDummyAlert,
    handleReload,
    setShowConfirmReload,
    setShowDummyAlert,
    DummyAlertMsg,
}) {
    return (
        <>
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
