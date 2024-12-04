import { useEffect, useState } from "react";
import { usePath } from "../../PathContext";
import ini from "ini";

const useLoginParser = () => {
  const { path } = usePath();
  const [parsedLogin, setParsedLogin] = useState(null);
  const [missingParams, setMissingParams] = useState(null);
  const [dummyFile, setDummyFile] = useState(null);
  const [openAddUser, setOpenAddUser] = useState(false);
  const [showConfirmLogout, setShowConfirmLogout] = useState(false);

  const loadIniFile = () => {
    const ODPfilePath = `${path}/Config/Login.ini`;
    window.electron
      .parseIniFile(ODPfilePath)
      .then(setParsedLogin)
      .catch(console.error);
  };

  const loadDummyFile = async () => {
    try {
      //const response = await fetch("/assets/dummies/LoginDummy.ini");
      //const dummyText = await response.text();
      //return ini.parse(dummyText);
      const dummyPath = `${path}/Config/Dummies/LoginDummy.ini`;
      const dummyContent = await window.electron.parseIniFile(dummyPath);
      return dummyContent;
    } catch (error) {
      console.error("Errore durante il caricamento del file dummy:", error);
      return null;
    }
  };

  const compareFiles = (realFile, dummyFile) => {
    const missingParams = {};
    Object.keys(dummyFile).forEach((section) => {
      if (!realFile[section]) {
        missingParams[section] = dummyFile[section];
      } else {
        Object.keys(dummyFile[section]).forEach((key) => {
          if (!(key in realFile[section])) {
            if (!missingParams[section]) missingParams[section] = {};
            missingParams[section][key] = dummyFile[section][key];
          }
        });
      }
    });
    return missingParams;
  };

  useEffect(() => {
    const loadFiles = async () => {
      try {
        const dummyFile = await loadDummyFile();
        setDummyFile(dummyFile);
        if (!dummyFile) return;

        const ODPfilePath = `${path}/Config/Login.ini`;
        const realFile = await window.electron.parseIniFile(ODPfilePath);
        const missingParams = compareFiles(realFile, dummyFile);
        setMissingParams(missingParams);
        setParsedLogin(realFile);
      } catch (err) {
        console.error("Errore durante il caricamento dei file:", err);
      }
    };
    loadFiles();
  }, [path]);

  const handleSaveLogout = () => {
    if (!parsedLogin) return;

    const ODPfilePath = `${path}/Config/Login.ini`;
    const updatedData = { ...parsedLogin };

    updatedData.LOGOUT = updatedData.LOGOUT || {}; // Assicura che LOGOUT esista
    updatedData.UTILIZZATORI = updatedData.UTILIZZATORI || {}; // Assicura che UTILIZZATORI esista

    Object.entries(dummyFile?.LOGOUT || {}).forEach(([key]) => {
      if (!updatedData.LOGOUT.hasOwnProperty(key)) updatedData.LOGOUT[key] = "";
    });
    Object.entries(dummyFile?.UTILIZZATORI || {}).forEach(([key]) => {
      if (!updatedData.UTILIZZATORI.hasOwnProperty(key)) updatedData.UTILIZZATORI[key] = "";
    });

    window.electron.saveIniFile(ODPfilePath, updatedData)
      .then(loadIniFile)
      .catch(console.error);
  };


  const handleInputChange = (section, key, value) => {
    if (!parsedLogin || !missingParams) return;

    const type = dummyFile?.[section]?.[key] || "unknown";

    // Verifica tipo "b" (booleano)
    if (type === "b" && ["0", "1", ""].includes(value)) {
      setParsedLogin((prevState) => ({
        ...prevState,
        [section]: {
          ...prevState[section],
          [key]: value,
        },
      }));
    }

    // Verifica tipo "i" (interi, non stringhe)
    if (type === "i") {
      const parsedValue = parseInt(value, 10);
      if (!isNaN(parsedValue) && parsedValue.toString() === value) {
        setParsedLogin((prevState) => ({
          ...prevState,
          [section]: {
            ...prevState[section],
            [key]: value,
          },
        }));
      }
    }
  };


  return {
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
  };
};

export default useLoginParser;
