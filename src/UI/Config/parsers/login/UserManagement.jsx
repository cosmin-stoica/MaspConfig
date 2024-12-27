import { PiUserPlusFill, PiFloppyDiskFill } from "react-icons/pi";
import UserCard from "./ux/user_card";
import { usePath } from "../../../../MAIN/Config/PathContext";

function UserManagement({ parsedLogin, setParsedLogin, loadIniFile, onAddUser, onConfirmLogout }) {

  const { path } = usePath();

  const handleDeleteUser = (userIndex) => {
    if (!parsedLogin) return;
  
    const userKeysToDelete = [
      `Nome utilizzatore ${userIndex}`,
      `Password utilizzatore ${userIndex}`,
      `Tipo utilizzatore ${userIndex}`,
      `Barcode utilizzatore ${userIndex}`,
      `File fingerprint ${userIndex}`,
    ];
  
    const updatedUtilizzatori = Object.fromEntries(
      Object.entries(parsedLogin.UTILIZZATORI).filter(
        ([key]) => !userKeysToDelete.includes(key)
      )
    );
  
    const reorganizedUtilizzatori = reorganizeUsers(updatedUtilizzatori);
    const updatedParsedLogin = { ...parsedLogin, UTILIZZATORI: reorganizedUtilizzatori };
    setParsedLogin(updatedParsedLogin);

    const ODPfilePath = `${path}/Config/Login.ini`;
    window.electron.saveIniFile(ODPfilePath, updatedParsedLogin).then(loadIniFile).catch(console.error);
  };
  


  const handleOnSave = (userIndex, updatedUser) => {
    const updatedParsedLogin = { ...parsedLogin };

    if (updatedUser.Username !== "N/A") {
        updatedParsedLogin.UTILIZZATORI[`Nome utilizzatore ${userIndex}`] = updatedUser.Username;
    }
    if (updatedUser.Password !== "N/A") {
        updatedParsedLogin.UTILIZZATORI[`Password utilizzatore ${userIndex}`] = updatedUser.Password;
    }
    if (updatedUser.Role !== "N/A") {
        updatedParsedLogin.UTILIZZATORI[`Tipo utilizzatore ${userIndex}`] = updatedUser.Role;
    }
    if (updatedUser.Barcode !== "N/A") {
        updatedParsedLogin.UTILIZZATORI[`Barcode utilizzatore ${userIndex}`] = updatedUser.Barcode;
    }
    if (updatedUser.Fingerprint !== "N/A") {
        updatedParsedLogin.UTILIZZATORI[`File fingerprint ${userIndex}`] = updatedUser.Fingerprint;
    }

    const reorganizedUtilizzatori = reorganizeUsers(updatedParsedLogin.UTILIZZATORI);
    updatedParsedLogin.UTILIZZATORI = reorganizedUtilizzatori;
    setParsedLogin(updatedParsedLogin);

    const ODPfilePath = `${path}/Config/Login.ini`;
    window.electron
        .saveIniFile(ODPfilePath, updatedParsedLogin)
        .then(loadIniFile)
        .catch(console.error);
};


  const reorganizeUsers = (utilizzatori) => {
    const updatedUtilizzatori = {};
    let currentIndex = 1;
  
    const users = Object.entries(utilizzatori)
      .filter(([key]) => key.startsWith("Nome utilizzatore"))
      .map(([key, username]) => {
        const userIndex = key.split(" ")[2];
        return {
          index: parseInt(userIndex, 10),
          username,
          password: utilizzatori[`Password utilizzatore ${userIndex}`],
          role: utilizzatori[`Tipo utilizzatore ${userIndex}`],
          barcode: utilizzatori[`Barcode utilizzatore ${userIndex}`],
          fingerprint: utilizzatori[`File fingerprint ${userIndex}`]
        };
      })
      .sort((a, b) => a.index - b.index);
  
    Object.entries(utilizzatori).forEach(([key, value]) => {
      if (!key.startsWith("Nome utilizzatore") && !key.startsWith("Password utilizzatore") &&
          !key.startsWith("Tipo utilizzatore") && !key.startsWith("Barcode utilizzatore") &&
          !key.startsWith("File fingerprint")) {
        updatedUtilizzatori[key] = value;
      }
    });
  
    updatedUtilizzatori["Numero utilizzatori"] = users.length.toString();
    users.forEach((user) => {
      if (user.username) updatedUtilizzatori[`Nome utilizzatore ${currentIndex}`] = user.username;
      if (user.password) updatedUtilizzatori[`Password utilizzatore ${currentIndex}`] = user.password;
      if (user.role) updatedUtilizzatori[`Tipo utilizzatore ${currentIndex}`] = user.role;
      if (user.barcode) updatedUtilizzatori[`Barcode utilizzatore ${currentIndex}`] = user.barcode;
      if (user.fingerprint) updatedUtilizzatori[`File fingerprint ${currentIndex}`] = user.fingerprint;

      currentIndex++;
    });
  
    return updatedUtilizzatori;
  };
  
  

  return (
    <div className="LoginParser_UserDiv">
      <div className="LoginParser_UserDiv_Bar Utenti_Bar">
        <h2>Utenti</h2>
        <div className="LoginParser_UserDiv_Bar_Lower">
          <PiUserPlusFill className="LoginParser_UserDiv_Bar_Icon" onClick={onAddUser} />
          <PiFloppyDiskFill className="LoginParser_UserDiv_Bar_Icon" onClick={onConfirmLogout} />
        </div>
      </div>
      <div className="LoginParser_UserDiv_List">
        {Object.entries(parsedLogin.UTILIZZATORI)
          .filter(([key]) => key.startsWith("Nome utilizzatore"))
          .map(([key, username]) => {
            const userIndex = key.split(" ")[2];
            const password = parsedLogin.UTILIZZATORI[`Password utilizzatore ${userIndex}`] || "N/A";
            const role = parsedLogin.UTILIZZATORI[`Tipo utilizzatore ${userIndex}`] || "N/A";
            const barcode = parsedLogin.UTILIZZATORI[`Barcode utilizzatore ${userIndex}`] || "N/A";
            const fingerprint = parsedLogin.UTILIZZATORI[`File fingerprint ${userIndex}`] || "N/A";

            return (
              <UserCard
                key={userIndex}
                ID={userIndex}
                Username={username}
                Password={password}
                Role={role}
                Barcode={barcode}
                Fingerprint={fingerprint}
                onDelete={() => handleDeleteUser(userIndex)}
                onSave={(updatedUser) => handleOnSave(userIndex, updatedUser)}
              />
            );
          })}
      </div>
    </div>
  );
}

export default UserManagement;
