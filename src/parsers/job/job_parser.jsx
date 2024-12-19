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
                if (value === null) {
                    keysWithNullValuesTemp.push(key); 
                }
            }
    
            if (keysWithNullValuesTemp.length > 0) {
                setShowDummyAlert(true); 
                setKeysWithNullValues(keysWithNullValuesTemp); 
            }
    
            console.log("Chiavi con valori null:", keysWithNullValuesTemp);
        }
    }, [dummiesData]);
    return (
        <>

            <div className="JobParser_MainDiv">
                <div className="Job_ModDiv" >
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
                    />
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