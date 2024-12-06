import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { usePath } from "../../PathContext";
import { TbInfoCircleFilled, TbReload } from "react-icons/tb";
import { PiFloppyDiskFill, PiHeadCircuitFill } from "react-icons/pi";
import { MdDelete } from "react-icons/md";
import ConfirmModal from "../../globals/confirm_modal";

export default function ConfigParserViewer({ dummyFile, realFile, configName, configIcon }) {
    const [showConfirmReload, setShowConfirmReload] = useState(null);
    const [showConfirmDelete, setShowConfirmDelete] = useState(null);
    const [showConfirmSave, setShowConfirmSave] = useState(null);

    const [expandedSections, setExpandedSections] = useState({});
    const [inputValues, setInputValues] = useState(() => {
        if (!dummyFile || typeof dummyFile !== "object") {
            console.error("DummyFile error");
            return {};
        }
        const initialValues = {};
        Object.entries(dummyFile).forEach(([section, params]) => {
            initialValues[section] = {};
            Object.keys(params).forEach((key) => {
                initialValues[section][key] = realFile?.[section]?.[key] ?? ""; // Vuoto se non è in realFile
            });
        });
        return initialValues;
    });
    const { path } = usePath();
    const navigate = useNavigate();

    const toggleSection = (section) => {
        setExpandedSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    const closeSection = (section) => {
        setExpandedSections((prev) => ({
            ...prev,
            [section]: false,
        }));
    };

    const handleInputChange = (section, key, value) => {
        setInputValues((prev) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [key]: value,
            },
        }));
    };

    const renderInput = (key, value, section, dummyValue) => {
        const uniqueId = `${section}_${key}`;
        const inputValue = inputValues[section]?.[key] || "";
        switch (dummyValue) {
            case "b":
                return (
                    <select
                        id={uniqueId}
                        type="text"
                        value={inputValue}
                        onChange={(e) => handleInputChange(section, key, e.target.value)}
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
                        id={uniqueId}
                        type="number"
                        value={inputValue}
                        onChange={(e) => handleInputChange(section, key, e.target.value)}
                        className="HalParserViewer_Input"
                    />
                );
            case "i":
                return (
                    <input
                        id={uniqueId}
                        type="number"
                        value={inputValue}
                        onChange={(e) => handleInputChange(section, key, e.target.value)}
                        className="HalParserViewer_Input"
                    />
                );
            case "d":
                return (
                    <input
                        id={uniqueId}
                        type="number"
                        step="0.01"
                        value={inputValue}
                        onChange={(e) => handleInputChange(section, key, e.target.value)}
                        className="HalParserViewer_Input"
                    />
                );
            case "str":
                return (
                    <input
                        id={uniqueId}
                        type="text"
                        value={inputValue}
                        onChange={(e) => handleInputChange(section, key, e.target.value)}
                        className="HalParserViewer_Input"
                    />
                );
            case "cstr":
                return (
                    <input
                        id={uniqueId}
                        type="text"
                        value={inputValue}
                        onChange={(e) => handleInputChange(section, key, e.target.value)}
                        className="HalParserViewer_Input"
                    />
                );
            default:
                return (
                    <input
                        id={uniqueId}
                        type="text"
                        value={inputValue}
                        onChange={(e) => handleInputChange(section, key, e.target.value)}
                        className="HalParserViewer_Input"
                    />
                );
        }

    };


    const handleReload = () => {
        navigate(`/configopener?config=${encodeURIComponent(configName)}`);
        window.location.reload();
    };


    const handleSave = () => {
        const updatedData = {};

        Object.entries(inputValues).forEach(([section, params]) => {
            const updatedSection = {};

            Object.entries(params).forEach(([key, value]) => {
                if (value) {
                    updatedSection[key] = value;
                } else if (realFile?.[section]?.[key]) {
                    updatedSection[key] = realFile[section][key];
                }
            });

            if (Object.keys(updatedSection).length > 0) {
                updatedData[section] = updatedSection;
            }
        });

        const FilePath = `${path}/Config/${configName}.ini`;
        console.log("Percorso file:", FilePath);
        console.log("Dati aggiornati:", updatedData);

        window.electron
            .saveIniFile(FilePath, updatedData)
            .then(() => {
                console.log("File salvato con successo!");
                setShowConfirmSave(false);
            })
            .catch(console.error);
    };

    const handleDelete = () => {

        const FilePath = `${path}/Config/${configName}.ini`;
        console.log(FilePath);
        window.electron
            .deleteFile(FilePath)
            .then(() => {
                console.log("File eliminato con successo!");
                setShowConfirmDelete(false);
            })
            .catch(console.error);
        navigate(`/config`);
    }

    return (
        <>
            <div className="HardwareParserViewerMainDiv">
                <div className="HalParserViewer">
                    <div className="HalParserViewer_Toolpanel">
                        <div>
                            <PiFloppyDiskFill onClick={() => setShowConfirmSave(true)} />
                        </div>
                        <div>
                            <TbReload onClick={() => setShowConfirmReload(true)} />
                        </div>
                        <div>
                            <MdDelete onClick={() => setShowConfirmDelete(true)} />
                        </div>
                    </div>
                    <div className="HardwareParserViewer_Secter">
                        {dummyFile && typeof dummyFile === "object" ? (
                            Object.entries(dummyFile).map(([section, params]) => (
                                <>
                                    <div
                                        key={section}
                                        className="HardwareParserViewer_Section_Div"
                                        onClick={() => toggleSection(section)}
                                    >
                                        <div className="HardwareParserViewer_Section_Div_Icon">{configIcon}</div>
                                        {section}
                                    </div>
                                    {expandedSections[section] && (
                                        <div className="confirm_modal_overlay zindex1000">
                                            <div className="HalParserViewer_Params">
                                                <div className="HalParserViewer_Params_Bar">
                                                    {section}
                                                    <button
                                                        className="HalParserViewer_Params_CloseIcon"
                                                        onClick={() => closeSection(section)}
                                                    >
                                                        X
                                                    </button>
                                                </div>
                                                <div className="HalParserViewer_Params_Section">
                                                    {Object.entries(params).map(([key]) => {
                                                        const value = realFile?.[section]?.[key];
                                                        const labelClass = value
                                                            ? "HalParserViewer_Label"
                                                            : "HalParserViewer_Label--missing";
                                                        return (
                                                            <div key={key} className="HalParserViewer_Param">
                                                                <label
                                                                    htmlFor={key}
                                                                    className={labelClass}
                                                                >
                                                                    {key}
                                                                </label>
                                                                {renderInput(
                                                                    key,
                                                                    inputValues[section]?.[key] || "",
                                                                    section,
                                                                    dummyFile[section]?.[key] || "",
                                                                )}
                                                                <div className="HalParserViewer_Info">
                                                                    <TbInfoCircleFilled />
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </>
                            ))
                        ) : (
                            <p>Nessuna configurazione disponibile.</p>
                        )}
                    </div>
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
        </>
    );
}
