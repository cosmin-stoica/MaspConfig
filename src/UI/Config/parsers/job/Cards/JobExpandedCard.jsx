import { TbInfoCircleFilled } from "react-icons/tb";
import JobInputRenderer from "../Job_InputRenderer";

export default function JobExpandedCard({
    section,
    dummiesData,
    filteredData,
    closeSection,
    setInputValues,
    modTablet,
    inputValues
}) {
    return (
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
                    {Object.entries(dummiesData[section] ?? {}) // Accediamo direttamente a `dummiesData[section]`
                        .filter(
                            ([key]) =>
                                !key.startsWith("Tipo job") &&
                                !key.startsWith("separator_") &&
                                !key.startsWith("comment_")
                        )
                        .map(([key, value]) => {
                            const currentValue =
                                filteredData.find(([filteredSection]) => filteredSection === section)?.[1]?.[key] ?? false;
    
                            const labelClass = currentValue
                                ? "HalParserViewer_Label"
                                : "HalParserViewer_Label--missing";
    
                            return (
                                <div key={key} className="HalParserViewer_Param">
                                    <label htmlFor={key} className={labelClass}>
                                        {key}
                                    </label>
                                    <JobInputRenderer
                                        keyName={key}
                                        section={section}
                                        dummyValue={value}
                                        inputValues={inputValues}
                                        currentValue={currentValue}
                                        setInputValues={setInputValues}
                                        disabled={false}
                                        modTablet={modTablet}
                                    />
                                    <div className="HalParserViewer_Info">
                                        <TbInfoCircleFilled />
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );    
}