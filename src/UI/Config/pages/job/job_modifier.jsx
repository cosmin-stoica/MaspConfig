import { useEffect, useState } from "react";
import { usePath } from "../../../../MAIN/Config/PathContext";
import { useLocation, useNavigate } from "react-router";
import { TbArrowLeft } from "react-icons/tb";
import Loader from "../../../globals/loader"
import JobParser from "../../parsers/job/job_parser";

export default function JobModifier() {

    const { path } = usePath();
    const [fileParsed, setFileParsed] = useState(null);
    const [dummiesParsed, setDummiesParsed] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const fileName = queryParams.get("fileName");

    useEffect(() => {
        const loaderTimeout = setTimeout(() => setIsLoading(false), 500);
        const parseIniFile = async () => {
            const filePath = `${path}/Config/${fileName}`;
            const fileParsed = await window.electron.parseIniFile(filePath);
            const filteredData = Object.fromEntries(
                Object.entries(fileParsed).filter(([section]) => section.startsWith("JOB") || section.startsWith("SEZIONE"))
            );
            setFileParsed(filteredData)
        };

        parseIniFile();
        return () => {
            clearTimeout(loaderTimeout);
        };
    }, []);

    useEffect(() => {
        const loadDummyData = async () => {
            const data = { };
            if (fileParsed){
                for (const section of Object.keys(fileParsed)) {
                    if (section === "SEZIONE GENERALE") {
                        if (!data[section]) {
                            data[section] = await window.electron.parseIniFile(`${path}/Config/Dummies/Job Config/Sezione Generale.ini`);
                        }
                    } else {
                        const tipoJob = fileParsed[section]?.["Tipo job"];
                        if (tipoJob && !data[section]) {
                            data[section] = await window.electron.parseIniFile(`${path}/Config/Dummies/Job Config/${tipoJob}.ini`);
                        } else if (!tipoJob) {
                            console.warn(`Tipo Job non trovato per la sezione: ${section}`);
                        }
                    }
                }
            setDummiesParsed(data);
            }
        };
        loadDummyData();
    }, [fileParsed]);

    const handleBackClick = () => {
        navigate("/job-list");
    }

    return (
        <>
            {isLoading && <Loader />}
            <div className="JobVisualizer_MainDiv">
                <button className="Hal_Config_Back_Btn" onClick={handleBackClick}>
                    <TbArrowLeft />
                </button>
                {fileParsed && <JobParser dummiesData={dummiesParsed} jobData={Object.entries(fileParsed)} />
}
            </div>
        </>
    );

};