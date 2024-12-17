import { useState } from "react";
import iconMap from "./iconMap";
import InputRenderer from "./InputRenderer";
import { TbInfoCircleFilled } from "react-icons/tb";
import Alert from "../../globals/alert";

export default function SectionViewer({ dummyFile, realFile, configIcon, expandedSections, setExpandedSections, inputValues, setInputValues, isHal, modTablet }) {

    const [viewErrorInput, setViewErrorInput] = useState(false)

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
        <>
            <div className="HardwareParserViewer_Secter">
                {dummyFile && typeof dummyFile === "object" ? (
                    Object.entries(dummyFile)
                        .filter(([section]) => !section.startsWith("separator_") && !section.startsWith("comment_"))
                        .map(([section, params]) => {
                            // Controllo generale isAnyGroupActivated per questa section
                            const isAnyGroupActivated = Object.entries(params).some(
                                ([key, value]) =>
                                    key.startsWith("bIsUsed") &&
                                    parseInt(inputValues?.[section]?.[key] ?? dummyFile?.[section]?.[key] ?? false) === 1
                            );

                            return (
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
                                                    {Object.entries(params)
                                                        .filter(([key]) => !key.startsWith("separator_"))
                                                        .reduce((acc, [key, value]) => {
                                                            let currentGroup = acc.currentGroup;
                                                            let isFirstBooleanActivated = acc.isFirstBooleanActivated;

                                                            if (key.startsWith("group_begin")) {
                                                                currentGroup = value;
                                                                isFirstBooleanActivated = false;
                                                                acc.currentGroup = currentGroup;
                                                                acc.isFirstBooleanActivated = isFirstBooleanActivated;

                                                                acc.elements.push(
                                                                    <div key={key} className="HalParserViewer_Param_Group">
                                                                        <h5>{value}</h5>
                                                                    </div>
                                                                );
                                                            } else if (key.startsWith("group_end")) {
                                                                currentGroup = "";
                                                                isFirstBooleanActivated = false;
                                                                acc.currentGroup = currentGroup;
                                                                acc.isFirstBooleanActivated = isFirstBooleanActivated;
                                                            } else if (!key.startsWith("comment_")) {
                                                                const dummyValue = dummyFile?.[section]?.[key];
                                                                const currentValue =
                                                                    inputValues?.[section]?.[key] ??
                                                                    dummyFile?.[section]?.[key] ??
                                                                    false;

                                                                if (currentGroup && key.startsWith("bIsUsed")) {
                                                                    isFirstBooleanActivated =
                                                                        parseInt(currentValue) === 0 || !currentValue;
                                                                    acc.isFirstBooleanActivated = isFirstBooleanActivated;
                                                                }

                                                                const hasGroup = currentGroup || "";
                                                                const labelClass = currentValue
                                                                    ? "HalParserViewer_Label"
                                                                    : "HalParserViewer_Label--missing";

                                                                acc.elements.push(
                                                                    <div key={key} className="HalParserViewer_Param">
                                                                        <label
                                                                            htmlFor={key}
                                                                            className={`${labelClass} ${isFirstBooleanActivated &&
                                                                                    !key.startsWith("bIsUsed")
                                                                                    ? "Label_Disabled"
                                                                                    : ""
                                                                                }`}
                                                                        >
                                                                            {key}
                                                                        </label>
                                                                        <InputRenderer
                                                                            keyName={key}
                                                                            section={section}
                                                                            dummyValue={dummyValue}
                                                                            inputValues={inputValues}
                                                                            setInputValues={setInputValues}
                                                                            realFile={realFile}
                                                                            isHal={isHal}
                                                                            group={hasGroup}
                                                                            isGroupkey={hasGroup && key.startsWith("bIsUsed")}
                                                                            disabled={isFirstBooleanActivated}
                                                                            isAnyGroupActivated={isAnyGroupActivated}
                                                                            onErrorInput={() => setViewErrorInput(true)}
                                                                            modTablet={modTablet}
                                                                        />
                                                                        <div className="HalParserViewer_Info">
                                                                            <TbInfoCircleFilled />
                                                                        </div>
                                                                    </div>
                                                                );
                                                            }

                                                            return acc;
                                                        }, { currentGroup: "", isFirstBooleanActivated: false, elements: [] })
                                                        .elements}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })
                ) : (
                    <p>Nessuna configurazione disponibile.</p>
                )}
            </div>
            {viewErrorInput && <Alert Modal={true} Type="error" Title="Errore" Description="Hai già una sezione attiva, disabilitala prima di continuare" onClose={() => setViewErrorInput(false)} />}
        </>
    );
}
