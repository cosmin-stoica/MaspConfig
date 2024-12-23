import ConfirmModal from "../../../globals/confirm_modal"

export default function ConfirmModals({
    showConfirmReload,
    showConfirmSave,
    showConfirmDelete,
    showAddProgramma,
    handleReload,
    handleSave,
    handleDelete,
    handleAddAvvitatura,
    setShowConfirmReload,
    setShowConfirmSave,
    setShowConfirmDelete,
    setShowAddProgramma,
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
            {showConfirmSave && (
                <ConfirmModal
                    Title="Conferma"
                    Description="Vuoi salvare la configurazione dei parametri?"
                    onConfirm={handleSave}
                    onCancel={() => setShowConfirmSave(false)}
                />
            )}
            {showConfirmDelete && (
                <ConfirmModal
                    Title="Conferma"
                    Description="Vuoi sicuro di voler eliminare questa configurazione? L'azione è irreversibile"
                    onConfirm={handleDelete}
                    onCancel={() => setShowConfirmDelete(false)}
                    TextConfirm={true}
                    TextToConfirm="elimina"
                />
            )}
            {showAddProgramma && (
                <ConfirmModal
                    Title="Conferma"
                    Description="Vuoi aggiungere un nuovo programma di avvitatura? Lo troverai come ultimo"
                    onConfirm={handleAddAvvitatura}
                    onCancel={() => setShowAddProgramma(false)}
                />
            )}
        </>
    );
}
