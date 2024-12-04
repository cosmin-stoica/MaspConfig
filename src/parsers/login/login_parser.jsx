import UserManagement from "./UserManagement";
import LogoutParams from "./LogoutParams";
import useLoginParser from "./useLoginParser";
import ConfirmModal from "../../globals/confirm_modal";
import UserModal from "./ux/user_modal"
import { usePath } from "../../PathContext";

function LoginParser() {

  const { path } = usePath();
  const {
    parsedLogin,
    dummyFile,
    missingParams,
    setParsedLogin,
    handleSaveLogout,
    handleInputChange,
    loadIniFile,
    openAddUser,
    setOpenAddUser,
    showConfirmLogout,
    setShowConfirmLogout,
  } = useLoginParser();

  const handleSaveParams = () => {
    handleSaveLogout()
    setShowConfirmLogout(false)
  }

  return (
    <div>
      {openAddUser && (
        <UserModal
          onCancel={() => setOpenAddUser(false)}
          onConfirm={(newUser) => {
            const updatedUtilizzatori = { ...parsedLogin.UTILIZZATORI };
            const currentUserCount = parseInt(updatedUtilizzatori["Numero utilizzatori"], 10) || 0;
            const newIndex = currentUserCount + 1;

            updatedUtilizzatori[`Nome utilizzatore ${newIndex}`] = newUser.username;
            updatedUtilizzatori[`Password utilizzatore ${newIndex}`] = newUser.password;
            updatedUtilizzatori[`Tipo utilizzatore ${newIndex}`] = newUser.role;
            updatedUtilizzatori[`Barcode utilizzatore ${newIndex}`] = newUser.barcodeUtilizzatore || '';
            updatedUtilizzatori[`File fingerprint ${newIndex}`] = newUser.fileFingerprint || '';

            updatedUtilizzatori["Numero utilizzatori"] = newIndex.toString();

            const updatedParsedLogin = {
              ...parsedLogin,
              UTILIZZATORI: updatedUtilizzatori
            };

            setParsedLogin(updatedParsedLogin);

            const ODPfilePath = `${path}/Config/Login.ini`;
            window.electron.saveIniFile(ODPfilePath, updatedParsedLogin)
              .then(() => setOpenAddUser(false))
              .catch(console.error);
          }}
        />
      )}

      {showConfirmLogout && (
        <ConfirmModal
          Title="Conferma"
          Description="Vuoi salvare la nuova configurazione dei parametri?"
          onConfirm={handleSaveParams}
          onCancel={() => setShowConfirmLogout(false)}
        />
      )}

      {parsedLogin ? (
        <>
          <div className="LoginParser_Div_Upper">
            <LogoutParams
              parsedLogin={parsedLogin}
              dummyFile={dummyFile}
              handleInputChange={handleInputChange}
            />
            <UserManagement
              parsedLogin={parsedLogin}
              setParsedLogin={setParsedLogin}
              loadIniFile={loadIniFile}
              onAddUser={() => setOpenAddUser(true)}
              onConfirmLogout={() => setShowConfirmLogout(true)}
            />
          </div>
        </>
      ) : (
        <p>Caricamento...</p>
      )}
    </div>
  );
}

export default LoginParser;
