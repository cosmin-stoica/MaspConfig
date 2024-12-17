import UserManagement from "./UserManagement";
import LogoutParams from "./LogoutParams";
import useLoginParser from "./useLoginParser";
import ConfirmModal from "../../globals/confirm_modal";
import UserModal from "./ux/user_modal"
import { usePath } from "../../PathContext";
import { TbArrowLeft } from "react-icons/tb";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

function LoginParser({ onSetActive, activeNavbar }) {

  const { path, modTablet } = usePath();
  const navigate = useNavigate();
  const [showNavigateConfirm, setShowNavigateConfirm] = useState(null);

  useEffect(() => {
    return () => onSetActive(true);
  }, []);

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
  } = useLoginParser(onSetActive);

  const handleSaveParams = () => {
    handleSaveLogout()
    setShowConfirmLogout(false)
  }

  const handleBackClick = () => {
    if (activeNavbar)
      navigate("/config");
    else {
      setShowNavigateConfirm(true);
    }
  }

  const handleAssertExit = () => {
    onSetActive(true);
    navigate("/config");
  }

  return (
    <>
      <div>
        <button className="Hal_Config_Back_Btn" onClick={handleBackClick}>
          <TbArrowLeft />
        </button>
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
                modTablet={modTablet}
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
      {showNavigateConfirm && <ConfirmModal Title="Conferma" Description="Hai effettuato delle modifiche senza salvare, sei sicuro di voler continuare?" onConfirm={handleAssertExit} onCancel={() => setShowNavigateConfirm(false)} />}
    </>
  );
}

export default LoginParser;
