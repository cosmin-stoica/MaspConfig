import iconMap from "./iconMap"
import JobInputRenderer from "./Job_InputRenderer";
import { TbInfoCircleFilled } from "react-icons/tb";
import { useState, useEffect } from "react";
import { usePath } from "../../PathContext";

export default function JobSectionViewer({ dummiesData, jobData = {}, configIcon, expandedSections = {}, setExpandedSections, inputValues = {}, setInputValues, isHal, modTablet, ordinaJob }) {

    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        if (Array.isArray(jobData) && jobData.length > 0) {
            setFilteredData(jobData);
        }
    }, [jobData]);

    const [originalData, setOriginalData] = useState([]);
    const { path } = usePath()

    useEffect(() => {
        if (filteredData && Array.isArray(filteredData) && originalData.length === 0) {
            setOriginalData(filteredData);
        }

        if (filteredData && Array.isArray(filteredData)) {
            const sorted = [...filteredData].sort((a, b) => {
                if (ordinaJob) {
                    const getJobNumber = (job) => parseInt(job.match(/\d+/)?.[0] || 0, 10);
                    const numA = getJobNumber(a[0]);
                    const numB = getJobNumber(b[0]);
                    return numA - numB;
                } else {
                    return 0;
                }
            });
            setFilteredData(ordinaJob ? sorted : originalData);
        }
    }, [ordinaJob]);

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

    const capitalize = (str) => {
        if (typeof str !== "string") return "";
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };

    return (
        <div className="HardwareParserViewer_Secter">
            {filteredData && Array.isArray(filteredData) && filteredData.length > 0 ? (
                filteredData
                    .map(([section, params]) => (
                        <div key={section}>
                            <div className="HardwareParserViewer_Section_Div" onClick={() => toggleSection(section)}>
                                <div className="HardwareParserViewer_Section_Div_Icon">{iconMap(capitalize(params["Tipo job"]) || "Sezione") || ""}</div>
                                {section === "SEZIONE GENERALE" ? "SEZIONE GENERALE" :
                                    <>
                                        <div className="Section_Job_Number">{section.replace("JOB", "")}</div>
                                        {capitalize(params["Tipo job"] || "")}
                                    </>
                                }
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
                                            {dummiesData[section]?.["JOB 1"] && typeof dummiesData[section]?.["JOB 1"] === "object" && Object.entries(dummiesData[section]?.["JOB 1"])
                                                .filter(([key]) => !key.startsWith("separator_") && !key.startsWith("comment_"))
                                                .map(([key, value]) => {
                                                    const currentValue =
                                                        filteredData.find(([filteredSection]) => filteredSection === section)?.[1]?.[key] ?? false;

                                                    //console.log('trvoato:', currentValue);

                                                    const labelClass = currentValue
                                                        ? "HalParserViewer_Label"
                                                        : "HalParserViewer_Label--missing";

                                                    return (
                                                        <div key={key} className="HalParserViewer_Param">
                                                            <label
                                                                htmlFor={key}
                                                                className={`${labelClass}`}
                                                            >
                                                                {key}
                                                            </label>
                                                            <JobInputRenderer
                                                                keyName={key}
                                                                section={section}
                                                                dummyValue={value}
                                                                inputValues={filteredData}
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
                            )}
                        </div>
                    ))
            ) : (
                <p>Nessuna configurazione disponibile.</p>
            )}
        </div>
    );
}