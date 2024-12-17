export const initializeInputValues = (dummyFile, realFile) => {
    if (!dummyFile || typeof dummyFile !== "object") {
        console.error("DummyFile error");
        return {};
    }
    const initialValues = {};
    Object.entries(dummyFile).forEach(([section, params]) => {
        initialValues[section] = {};
        Object.keys(params).forEach((key) => {
            initialValues[section][key] = realFile?.[section]?.[key] ?? "";
        });
    });
    return initialValues;
};

export const saveConfiguration = (isAvv, isHal, inputValues, dummyFile, realFile, configName, path, setShowConfirmSave) => {
    const updatedData = {};
    console.log('input',inputValues)
    Object.entries(inputValues).forEach(([section, params]) => {
        const updatedSection = {};
        let x = 0;
        Object.entries(params).forEach(([key, value]) => {
            const actualValue = dummyFile?.[section]?.[key] || value;
            if (key.startsWith("separator_") && !isNaN(key.split("_")[1])) {
                const count = parseInt(actualValue.slice(1), 10);
                const firstChar = actualValue?.charAt(0) || "";
                updatedSection[`separator_${x}`] = firstChar.repeat(count);
                x = x + 1;
            } else if(key.startsWith("comment_") && !isNaN(key.split("_")[1])) {
                updatedSection[`comment_${x}`] = actualValue;
                x = x + 1;
            } else if (value) {
                updatedSection[key] = value;
            }
            //else if (realFile?.[section]?.[key]) {
            //    updatedSection[key] = realFile[section][key];
            //}
        });
        if (Object.keys(updatedSection).length > 0) {
            updatedData[section] = updatedSection;
        }
    });
    console.log('updated', updatedData)

    if (isAvv) {
        const numeroProgrammi = Object.entries(inputValues)
            .filter(([key, params]) => {
                if (key.startsWith("PROGRAMMA")) {
                    return Object.values(params).some(value => value !== "");
                }
                return false;
            }).length;

        if (!updatedData["SEZIONE GENERALE"]) {
            updatedData["SEZIONE GENERALE"] = {};
        }
        updatedData["SEZIONE GENERALE"]["Numero programmi"] = numeroProgrammi;

        const FilePath = `${path}/Config/${configName}.ini`;
        window.electron
            .saveIniFile(FilePath, updatedData)
            .then(() => setShowConfirmSave(false))
            .catch(console.error);
    } else {
        let FilePath = `${path}/Config/${configName}.ini`;
        if (isHal) {
            FilePath = `${path}/Config/Hardware Config/${configName}.ini`;
        }
        window.electron
            .saveIniFile(FilePath, updatedData)
            .then(() => setShowConfirmSave(false))
            .catch(console.error);
    }
};


export const deleteConfiguration = (isHal, configName, path, setShowConfirmDelete, navigate) => {
    let FilePath = `${path}/Config/${configName}.ini`;
    if (isHal) {
        FilePath = `${path}/Config/Hardware Config/${configName}.ini`;
    }
    window.electron
        .deleteFile(FilePath)
        .then(() => {
            setShowConfirmDelete(false);
            if (isHal) {
                navigate(`/hal`);
            }
            else {
                navigate(`/config`);
            }
        })
        .catch(console.error);
};

export const addNewProgram = (dummyFile, setShowAddProgramma) => {
    const newProgramNumber = Object.keys(dummyFile).filter(key => key.startsWith("PROGRAMMA")).length + 1;
    const newProgramKey = `PROGRAMMA ${newProgramNumber}`;
    const baseProgram = dummyFile["PROGRAMMA 1"];
    if (!baseProgram) {
        console.error("Programma 1 non trovato nel dummyFile. Impossibile aggiungere un nuovo programma.");
        return;
    }
    const newProgram = Object.keys(baseProgram).reduce((acc, key) => {
        acc[key] = baseProgram[key];
        return acc;
    }, {});
    dummyFile[newProgramKey] = { ...newProgram };
    setShowAddProgramma(false);
};
