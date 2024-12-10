import { useState } from "react";
import iconMap from "./iconMap";
import InputRenderer from "./InputRenderer";
import { TbInfoCircleFilled } from "react-icons/tb";

export default function SectionViewer({ dummyFile, realFile, configIcon, expandedSections, setExpandedSections, inputValues, setInputValues, isHal }) {
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

    return (
        <div className="HardwareParserViewer_Secter">
            {dummyFile && typeof dummyFile === "object" ? (
                Object.entries(dummyFile).map(([section, params]) => (
                    <div key={section}>
                        <div className="HardwareParserViewer_Section_Div" onClick={() => toggleSection(section)}>
                            <div className="HardwareParserViewer_Section_Div_Icon">{iconMap[configIcon] || ""}</div>
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
                                                    {<InputRenderer
                                                        key={key}
                                                        keyName={key}
                                                        section={section}
                                                        dummyValue={dummyFile[section]?.[key] || ""}
                                                        inputValues={inputValues}
                                                        setInputValues={setInputValues}
                                                        realFile={realFile}
                                                        isHal={isHal}
                                                    />}
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
                    </div>
                ))
            ) : (
                <p>Nessuna configurazione disponibile.</p>
            )}
        </div>
    );
}
