import React, { useState } from "react";
import { TbBraces, TbBracesOff } from "react-icons/tb";
import { TbInfoCircleFilled, TbReload } from "react-icons/tb";
import { PiFloppyDiskFill } from "react-icons/pi";
import ConfirmModal from "../../globals/confirm_modal";
import { useNavigate } from "react-router";
import { usePath } from "../../PathContext";
import { useEffect } from "react";

export default function HalParserViewer({ dummyFile, realFile, configName, groupName }) {
    const [comments, setComments] = useState({});
    const [showConfirmReload, setShowConfirmReload] = useState(null);
    const [showConfirmSave, setShowConfirmSave] = useState(null);

    const { path } = usePath();
    const navigate = useNavigate();


    // Pre-popola i separatori trovati in realFile
    useEffect(() => {
        const initialComments = {};
        console.log("RealFile con separatori:", realFile);

        Object.entries(realFile || {}).forEach(([section, params]) => {
            initialComments[section] = {};
            Object.entries(params).forEach(([key, value]) => {
                // Identifica i separatori dalla chiave
                if (key.startsWith("__separator_")) {
                    const index = key.split("_")[1]; // Ottieni l'indice del separatore
                    initialComments[section][`;-------------_${index}`] = value || ";-------------";
                }
            });
        });

        console.log("Comments pre-popolati:", initialComments);
        setComments(initialComments);
    }, [realFile]);


    const toggleComment = (section, key) => {
        setComments((prevComments) => {
            const sectionComments = { ...prevComments[section] };
            if (sectionComments[key]) {
                delete sectionComments[key];
                if (Object.keys(sectionComments).length === 0) {
                    const { [section]: _, ...rest } = prevComments;
                    return rest;
                }
                return { ...prevComments, [section]: sectionComments };
            } else {
                return {
                    ...prevComments,
                    [section]: { ...sectionComments, [key]: ";-------------------------" },
                };
            }
        });
    };


    const renderInput = (key, value) => {
        const firstChar = key[0];
        switch (firstChar) {
            case "b":
                return (
                    <select
                        id={key}
                        defaultValue={value !== undefined ? value : ""}
                        className="HalParserViewer_Input"
                    >
                        <option value=""></option>
                        <option value="0">0</option>
                        <option value="1">1</option>
                    </select>
                );
            case "n":
                return (
                    <input
                        id={key}
                        type="number"
                        defaultValue={value || ""}
                        className="HalParserViewer_Input"
                    />
                );
            case "d":
                return (
                    <input
                        id={key}
                        type="number"
                        step="0.01"
                        defaultValue={value || ""}
                        className="HalParserViewer_Input"
                    />
                );
            case "cstr":
            case "str":
                return (
                    <input
                        id={key}
                        type="text"
                        defaultValue={value || ""}
                        className="HalParserViewer_Input"
                    />
                );
            default:
                return (
                    <input
                        id={key}
                        type="text"
                        defaultValue={value || ""}
                        className="HalParserViewer_Input"
                    />
                );
        }
    };

    const handleReload = () => {
        navigate(`/hal-parser?config=${encodeURIComponent(configName)}&group_name=${encodeURIComponent(groupName)}`);
        window.location.reload(); // Forza il ricaricamento della pagina
    };

    const handleSave = () => {
        const updatedData = {};

        // Itera sulle sezioni e parametri di dummyFile
        Object.entries(dummyFile).forEach(([section, params]) => {
            const updatedSection = {};

            Object.entries(params).forEach(([key], index) => {
                const inputElement = document.getElementById(key);
                const value = inputElement?.value.trim();

                // Aggiungi il parametro solo se ha un valore
                if (value) {
                    updatedSection[key] = value;
                }

                // Aggiungi il separatore ;------------- con una chiave univoca
                if (comments[section]?.[key]) {
                    updatedSection[`;-------------_${index}`] = ""; // Inserisci un separatore univoco
                }
            });

            // Aggiungi la sezione solo se contiene dati
            if (Object.keys(updatedSection).length > 0) {
                updatedData[section] = updatedSection;
            }
        });

        // Salva il file tramite Electron
        const HalFilePath = `${path}/Config/Hardware Config/${configName}.ini`; // Percorso reale
        console.log("Percorso file:", HalFilePath);
        console.log("Dati aggiornati:", updatedData);

        window.electron
            .saveIniFile(HalFilePath, updatedData)
            .then(() => {
                console.log("File salvato con successo!");
                setShowConfirmSave(false);
            })
            .catch(console.error);
    };




    return (
        <>
            <div className="HalParserViewerMainDiv">
                <div className="HalParserViewer">
                    <div className="HalParserViewer_Toolpanel">
                        <div>
                            <PiFloppyDiskFill onClick={() => setShowConfirmSave(true)} />
                        </div>
                        <div>
                            <TbReload onClick={() => setShowConfirmReload(true)} />
                        </div>
                    </div>
                    {Object.entries(dummyFile).map(([section, params]) => (
                        <div key={section} className="HalParserViewer_Section">
                            <h1>{section}</h1>
                            <div className="HalParserViewer_Params">
                                {Object.entries(params).map(([key]) => {
                                    const value = realFile?.[section]?.[key];
                                    const labelClass = value ? "HalParserViewer_Label" : "HalParserViewer_Label--missing";
                                    const hasComment = comments[section]?.[key];
                                    return (
                                        <div key={key} className="HalParserViewer_Param">
                                            <label htmlFor={key} className={labelClass}>
                                                {key}
                                            </label>
                                            {renderInput(key, value)}
                                            <div
                                                className="HalParserViewer_ToggleComment"
                                                onClick={() => toggleComment(section, key)}
                                            >
                                                {hasComment ? <TbBracesOff /> : <TbBraces />}
                                            </div>
                                            {hasComment && (
                                                <div className="HalParserViewer_Comment">
                                                    {comments[section][key]}
                                                </div>
                                            )}
                                            <div className="HalParserViewer_Info">
                                                <TbInfoCircleFilled />
                                            </div>
                                        </div>
                                    );
                                })}

                            </div>
                        </div>
                    ))}
                </div>
            </div>
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
        </>
    );
}
