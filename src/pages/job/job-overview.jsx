/* eslint-disable react/jsx-pascal-case */
import JobNavbar from "../../globals/job_navbar";
import { useState, useEffect } from "react";
import { usePath } from "../../PathContext";
import Loader from "../../globals/loader";
import Dashboard_Upper_Right from "../dashboard/dashboard_upper_right";
import { LuFileSearch } from "react-icons/lu";
import { TbFilePencil, TbFileUpload  } from "react-icons/tb";



export default function JobOverview() {

    const [isLoading, setIsLoading] = useState(true);
    const [jobList, setJobList] = useState(null);
    const [lastModified, setLastModified] = useState(null);
    const [lastCreated, setLastCreated] = useState(null);
    const { path } = usePath()

    useEffect(() => {
        const loaderTimeout = setTimeout(() => setIsLoading(false), 1000);
        window.electron.readJobsFromFolder(`${path}\\Config`)
            .then((parsedData) => {
                setJobList(parsedData);
                console.log(parsedData)

                const last = parsedData.reduce((latest, current) => {
                    const latestDate = new Date(latest.dataUltimaModifica);
                    const currentDate = new Date(current.dataUltimaModifica);
                    return currentDate > latestDate ? current : latest;
                  });

                
                const newCrated = parsedData.reduce((latest, current) => {
                    const latestDate = new Date(latest.dataCreazione);
                    const currentDate = new Date(current.dataCreazione);
                    return currentDate > latestDate ? current : latest;
                  });
                  
                setLastModified(last.dataUltimaModifica);
                setLastCreated(newCrated.dataCreazione);

            })
            .catch((err) => {
                console.error("Errore durante il parsing dei job:", err);
            });

        return () => {
            clearTimeout(loaderTimeout);
        };
    }, [path]);

    return (
        <>
            {isLoading && <Loader />}
            <JobNavbar />
            <div className="Overview_MainDiv">
                <div className="Overview_MainDiv_Left">
                    <div className="overview_element">
                        <div className="overview_element_bar">
                            <div className="overview_element_icon">
                                <LuFileSearch />
                            </div>
                            <div className="overview_element_title">
                                Numero di configurazioni
                            </div>
                        </div>
                        <div className="overview_element_desc">
                            {jobList && jobList.length}
                        </div>
                    </div>

                    <div className="overview_element">
                        <div className="overview_element_bar">
                            <div className="overview_element_icon">
                                <TbFilePencil />
                            </div>
                            <div className="overview_element_title">
                                Ultima modifica
                            </div>
                        </div>
                        <div className="overview_element_desc">
                            {lastModified ? lastModified.toLocaleString() : ""}
                        </div>
                    </div>

                    
                    <div className="overview_element">
                        <div className="overview_element_bar">
                            <div className="overview_element_icon">
                                <TbFileUpload/>
                            </div>
                            <div className="overview_element_title">
                                Ultima creazione
                            </div>
                        </div>
                        <div className="overview_element_desc">
                            {lastCreated ? lastCreated.toLocaleString() : ""}
                        </div>
                    </div>
                </div>
                <div className="Overview_MainDiv_Right">
                    <Dashboard_Upper_Right />
                </div>
            </div>
        </>
    );
};