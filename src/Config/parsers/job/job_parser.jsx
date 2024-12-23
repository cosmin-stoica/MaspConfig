import Modals from "./Modals";
import JobSectionViewer from "./Job_SectionViewer";
import JobToolPanel from "./Job_ToolPanel";
import { useEffect, useState } from "react";

export default function JobParser({ dummiesData, jobData }) {

    const [expandedSections, setExpandedSections] = useState({});
    const [showConfirmReload, setShowConfirmReload] = useState(false);
    const [showDummyAlert, setShowDummyAlert] = useState(false);
    const [ordinaJobCheck, setOrdinaJobCheck] = useState(false)
    const [keysWithNullValues, setKeysWithNullValues] = useState([]);
    const [inputValues, setInputValues] = useState({});

    useEffect(() => {
        if (dummiesData && jobData) {

            console.log('dummiesData', dummiesData)
            const jobDataMap = Object.fromEntries(jobData);
            console.log('jobDataMap', jobDataMap)

            const initializeInputValues = (dummyFile, realFile) => {
                if (!dummyFile || typeof dummyFile !== "object") {
                    console.error("DummyFile error");
                    return {};
                }

                if (!dummyFile["JOB 1"]) {
                    dummyFile["JOB 1"] = {};
                    console.error("DummyFile error Job 1");
                    return {};
                }


                const initialValues = {};
                Object.entries(dummyFile).forEach(([section, params]) => {
                    if (section === "JOB 1") {
                        Object.entries(params).forEach(([key, value]) => {
                            initialValues[section][key] = realFile?.[section]?.[key] ?? "";
                        });
                    }
                });

                console.log('initial', initialValues);
                return initialValues;
            };

            initializeInputValues(dummiesData, jobData);

        }
    }, [dummiesData, jobData]);



    useEffect(() => {
        console.log("Updated inputValues:", inputValues);
    }, [inputValues]);


    const handleCheckboxChange = (value) => {
        setOrdinaJobCheck(value);
    };

    const handleReload = () => {
        window.location.reload();
    };

    useEffect(() => {
        if (dummiesData) {
            const keysWithNullValuesTemp = [];

            for (const [key, value] of Object.entries(dummiesData)) {
                const jobSection = jobData.find(([section]) => section === key);
                const tipoJobValue = capitalize(jobSection?.[1]?.["Tipo job"]);

                if (value === null && !keysWithNullValuesTemp.map(String).includes(String(tipoJobValue))) {
                    keysWithNullValuesTemp.push(tipoJobValue);
                }
            }

            if (keysWithNullValuesTemp.length > 0) {
                setShowDummyAlert(true);
                setKeysWithNullValues(keysWithNullValuesTemp);
            }
        }
    }, [dummiesData, jobData]);

    const capitalize = (str) => {
        if (typeof str !== "string") return "";
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };



    return (
        <>

            <div className="JobParser_MainDiv">
                <div className="Job_ModDiv" >
                    {keysWithNullValues.length === 0 &&
                        <>
                            <JobToolPanel
                                onCheckboxChange={handleCheckboxChange}
                                setShowConfirmReload={setShowConfirmReload}
                            />
                            <JobSectionViewer
                                jobData={jobData}
                                dummiesData={dummiesData}
                                expandedSections={expandedSections}
                                setExpandedSections={setExpandedSections}
                                ordinaJob={ordinaJobCheck}
                                setShowConfirmReload={setShowConfirmReload}
                                inputValues={inputValues}
                                setInputValues={setInputValues}
                            />
                        </>
                    }
                    <Modals
                        showConfirmReload={showConfirmReload}
                        showDummyAlert={showDummyAlert}
                        DummyAlertMsg={`Non sono stati trovati i dummy dei seguenti job: \n${keysWithNullValues}`}
                        setShowConfirmReload={setShowConfirmReload}
                        setShowDummyAlert={setShowDummyAlert}
                        handleReload={handleReload}
                    />
                </div>
            </div>
        </>
    );

};