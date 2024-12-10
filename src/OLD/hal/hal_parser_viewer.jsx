import React, { useState } from "react";
import { TbBraces, TbBracesOff } from "react-icons/tb";
import { TbInfoCircleFilled, TbReload } from "react-icons/tb";
import { PiFloppyDiskFill } from "react-icons/pi";
import ConfirmModal from "../../globals/confirm_modal";
import { useNavigate } from "react-router";
import { usePath } from "../../PathContext";
import { MdDelete } from "react-icons/md";
import iconMap from "../config_hal/iconMap";

export default function HalParserViewer({ dummyFile, realFile, configName, groupName, configIcon }) {
    const [showConfirmReload, setShowConfirmReload] = useState(null);
    const [showConfirmDelete, setShowConfirmDelete] = useState(null);
    const [showConfirmSave, setShowConfirmSave] = useState(null);

    const { path } = usePath();
    const navigate = useNavigate();

    const [expandedSections, setExpandedSections] = useState({});
    const [inputValues, setInputValues] = useState(() => {
        const initialValues = {};
        Object.entries(dummyFile).forEach(([section, params]) => {
            initialValues[section] = {};
            Object.keys(params).forEach((key) => {
                initialValues[section][key] = realFile?.[section]?.[key] ?? ""; // Vuoto se non è in realFile
            });
        });
        return initialValues;
    });


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

    const renderInput = (key, value, section) => {
        const uniqueId = `${section}_${key}`;
        const firstChar = key[0];
        const inputValue = inputValues[section]?.[key] || "";

        switch (firstChar) {
            case "b":
                return (
                    <select
                        id={uniqueId}
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
            case "cstr":
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
        navigate(`/hal-parser?config=${encodeURIComponent(configName)}&group_name=${encodeURIComponent(groupName)}`);
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

        const HalFilePath = `${path}/Config/Hardware Config/${configName}.ini`;
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

    const handleDelete = () => {

        const HalFilePath = `${path}/Config/Hardware Config/${configName}.ini`;
        console.log(HalFilePath);
        window.electron
            .deleteFile(HalFilePath)
            .then(() => {
                console.log("File eliminato con successo!");
                setShowConfirmDelete(false);
            })
            .catch(console.error);
        navigate(`/hal?config=${encodeURIComponent(configName)}&group_name=${encodeURIComponent(groupName)}`);
    }

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
                        <div>
                            <MdDelete onClick={() => setShowConfirmDelete(true)} />
                        </div>
                    </div>
                    <div className="HardwareParserViewer_Secter">
                        {Object.entries(dummyFile).map(([section, params]) => (
                            <>
                                <div key={section} className="HardwareParserViewer_Section_Div" onClick={() => toggleSection(section)}>
                                    {/*<div className="HalParserViewer_Section_Div_Circle"></div>
                                    <div className="HalParserViewer_Section_Div_Circle2"></div>*/}
                                    <div className="HardwareParserViewer_Section_Div_Icon">
                                        {iconMap[configIcon] || ""}
                                    </div>
                                    {section}
                                </div>
                                {expandedSections[section] && (
                                    <div className='confirm_modal_overlay zindex1000'>
                                        <div className="HalParserViewer_Params">
                                            <div className="HalParserViewer_Params_Bar">
                                                {section}
                                                <button className="HalParserViewer_Params_CloseIcon" onClick={() => closeSection(section)}>X</button>
                                            </div>
                                            <div className="HalParserViewer_Params_Section">
                                                {Object.entries(params).map(([key]) => {
                                                    const value = realFile?.[section]?.[key];
                                                    const labelClass = value
                                                        ? "HalParserViewer_Label"
                                                        : "HalParserViewer_Label--missing";
                                                    return (<div key={key} className="HalParserViewer_Param">
                                                        <label htmlFor={key} className={labelClass}>
                                                            {key}
                                                        </label>
                                                        {renderInput(key, inputValues[section]?.[key] || "", section)}
                                                        <div className="HalParserViewer_Info">
                                                            <TbInfoCircleFilled />
                                                        </div>
                                                    </div>);
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </>
                        ))}
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
