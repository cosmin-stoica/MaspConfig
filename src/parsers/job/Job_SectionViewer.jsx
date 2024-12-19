import { useState, useEffect } from "react";
import { usePath } from "../../PathContext";
import JobSectionCard from "./Cards/JobSectionCard";
import JobExpandedCard from "./Cards/JobExpandedCard";

export default function JobSectionViewer({
    dummiesData,
    jobData = {},
    expandedSections = {},
    setExpandedSections,
    inputValues,
    setInputValues,
    ordinaJob,
    modTablet
}) {
    const [filteredData, setFilteredData] = useState(jobData || []);
    const [originalData, setOriginalData] = useState([]);
    const { path } = usePath();

    useEffect(() => {
        if (Array.isArray(jobData) && jobData.length > 0) {
            setFilteredData(jobData);
        }
    }, [jobData]);

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

    return (
        <div className="HardwareParserViewer_Secter">
            {filteredData && Array.isArray(filteredData) && filteredData.length > 0 ? (
                filteredData.map(([section, params]) => (
                    <div key={section}>
                        <JobSectionCard
                            section={section}
                            params={params}
                            toggleSection={toggleSection}
                        />
                        {expandedSections[section] && (
                            <JobExpandedCard
                                section={section}
                                dummiesData={dummiesData}
                                filteredData={filteredData}
                                closeSection={closeSection}
                                setInputValues={setInputValues}
                                modTablet={modTablet}
                            />
                        )}
                    </div>
                ))
            ) : (
                <p>Nessuna configurazione disponibile.</p>
            )}
        </div>
    );
}