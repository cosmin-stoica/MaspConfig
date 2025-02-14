import Modals from "./Modals";
import JobSectionViewer from "./Job_SectionViewer";
import JobToolPanel from "./Job_ToolPanel";
import { useEffect, useState } from "react";
import { usePath } from "../../../../MAIN/Config/PathContext";
import { useNavigate } from "react-router";

export default function JobParser({ dummiesData, jobData, fileName }) {

    const [expandedSections, setExpandedSections] = useState({});
    const [showConfirmReload, setShowConfirmReload] = useState(false);
    const [showConfirmSave, setShowConfirmSave] = useState(false);
    const [showDummyAlert, setShowDummyAlert] = useState(false);
    const [ordinaJobCheck, setOrdinaJobCheck] = useState(false)
    const [keysWithNullValues, setKeysWithNullValues] = useState([]);
    const [inputValues, setInputValues] = useState({});
    const { path } = usePath();
    const navigate = useNavigate();

    useEffect(() => {
        if (dummiesData && jobData) {
            console.log('dummiesData:', dummiesData);

            const jobDataMap = Array.isArray(jobData) ? Object.fromEntries(jobData) : jobData;

            console.log('jobDataMap:', jobDataMap);

            const initializeInputValues = (dummyFile, realFile) => {
                if (!dummyFile || typeof dummyFile !== "object") {
                    console.error("DummyFile error");
                    return {};
                }

                const initialValues = {};

                Object.entries(dummyFile).forEach(([section, params]) => {
                    if (!params || typeof params !== "object") {
                        console.warn(`Skipping invalid section: ${section}`);
                        return;
                    }

                    initialValues[section] = {};

                    Object.entries(params).forEach(([key, value]) => {
                        console.log(`Checking: section=${section}, key=${key}, realFile[section][key]=`, realFile?.[section]?.[key]);

                        initialValues[section][key] = realFile?.[section]?.[key] !== undefined ? realFile[section][key] : "";
                    });
                });

                console.log('Generated initialValues:', initialValues);
                return initialValues;
            };

            const newInputValues = initializeInputValues(dummiesData, jobDataMap);
            setInputValues(newInputValues);
        }
    }, [dummiesData, jobData]);



    useEffect(() => {
        console.log("Updated inputValues:", inputValues);
    }, [inputValues]);


    const handleCheckboxChange = (value) => {
        setOrdinaJobCheck(value);
    };

    const handleReload = () => {
        navigate(`/job-modifier?fileName=${encodeURIComponent(fileName)}`);
        window.location.reload();
    };

    const handleSave = () => {
        const updatedData = {};
        console.log('input', inputValues)
        Object.entries(inputValues).forEach(([section, params]) => {
            const updatedSection = {};
            let x = 0;
            Object.entries(params).forEach(([key, value]) => {
                const actualValue = dummiesData?.[section]?.[key] || value;
                if (key.startsWith("separator_") && !isNaN(key.split("_")[1])) {
                    const count = parseInt(actualValue.slice(1), 10);
                    const firstChar = actualValue?.charAt(0) || "";
                    updatedSection[`separator_${x}`] = firstChar.repeat(count);
                    x = x + 1;
                } else if (key.startsWith("comment_") && !isNaN(key.split("_")[1])) {
                    updatedSection[`comment_${x}`] = actualValue;
                    x = x + 1;
                } else if (value) {
                    updatedSection[key] = value;
                }
            });
            if (Object.keys(updatedSection).length > 0) {
                updatedData[section] = updatedSection;
            }
        });
        console.log('updated', updatedData)


        let FilePath = `${path}/Config/${"prova"}.ini`;
        window.electron
            .saveIniFile(FilePath, updatedData)
            .then(() => setShowConfirmSave(false))
            .catch(console.error);

    }

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
                                setShowConfirmSave={setShowConfirmSave}
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
                        showConfirmSave={showConfirmSave}
                        setShowConfirmSave={setShowConfirmSave}
                        showDummyAlert={showDummyAlert}
                        DummyAlertMsg={`Non sono stati trovati i dummy dei seguenti job: \n${keysWithNullValues}`}
                        setShowConfirmReload={setShowConfirmReload}
                        setShowDummyAlert={setShowDummyAlert}
                        handleReload={handleReload}
                        handleSave={handleSave}
                    />
                </div>
            </div>
        </>
    );

};