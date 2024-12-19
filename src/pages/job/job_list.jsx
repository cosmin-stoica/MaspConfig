import { BiLinkExternal } from "react-icons/bi";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import { useEffect, useState, useRef } from "react";
import { usePath } from "../../PathContext";
import Loader from "../../globals/loader";
import JobNavbar from "../../globals/job_navbar";
import { useNavigate } from "react-router";

export default function JobList() {
    const { path } = usePath();
    const [jobList, setJobList] = useState(null);
    const [sortedBy, setSortedBy] = useState({ field: null, order: "asc" }); // Nessun ordinamento iniziale
    const [isLoading, setIsLoading] = useState(true);
    const [isSticky, setIsSticky] = useState(false);
    const [clickedData, setClickedData] = useState(false);
    const containerRef = useRef(null);
    const navigate = useNavigate()

    useEffect(() => {
        const loaderTimeout = setTimeout(() => setIsLoading(false), 1000);
        window.electron.readJobsFromFolder(`${path}\\Config`)
            .then((parsedData) => {
                setJobList(parsedData); // Nessun ordinamento iniziale
            })
            .catch((err) => {
                console.error("Errore durante il parsing dei job:", err);
            });

        const handleScroll = () => {
            if (containerRef.current) {
                const scrollPosition = containerRef.current.scrollTop; // Posizione scroll del contenitore
                setIsSticky(scrollPosition > 0);
            }
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener("scroll", handleScroll);
        }

        return () => {
            clearTimeout(loaderTimeout);
            if (container) {
                container.removeEventListener("scroll", handleScroll);
            }
        };
    }, [path]);

    const sortData = (field) => {
        const newOrder = sortedBy.field === field && sortedBy.order === "asc" ? "desc" : "asc";
        const sortedList = [...jobList].sort((a, b) => {
            const aValue = a[field];
            const bValue = b[field];

            if (field === "dataCreazione" || field === "dataUltimaModifica") {
                return newOrder === "asc"
                    ? new Date(aValue) - new Date(bValue)
                    : new Date(bValue) - new Date(aValue);
            }

            if (typeof aValue === "number") {
                return newOrder === "asc" ? aValue - bValue : bValue - aValue;
            }

            if (typeof aValue === "string") {
                return newOrder === "asc"
                    ? aValue.localeCompare(bValue) // Ordine alfabetico crescente
                    : bValue.localeCompare(aValue); // Ordine alfabetico decrescente
            }

            return 0;
        });

        setJobList(sortedList);
        setSortedBy({ field, order: newOrder });
    };

    const handleClickedData = (data) => {
        navigate(`/job-modifier?fileName=${data.nomeFile}`)
    }

    return (
        <>
            {isLoading && <Loader />}
            <JobNavbar/>
            {!clickedData && <div className="JobViewer_MainDiv">
                <div className="Ticket_Table_Container" ref={containerRef}>
                    <table className="Ticket_Table">
                        <thead>
                            <tr className={isSticky ? "Ticket_Table_TR sticky" : "Ticket_Table_TR"}>
                                <th></th>
                                <th>
                                    Nome{" "}
                                    {sortedBy.field === "nomeFile" ? (
                                        sortedBy.order === "asc" ? <HiChevronDown className="cursor-pointer" onClick={() => sortData("nomeFile")} /> : <HiChevronUp className="cursor-pointer" onClick={() => sortData("nomeFile")} />
                                    ) : (
                                        <HiChevronDown className="cursor-pointer" onClick={() => sortData("nomeFile")} />// Mostra sempre HiChevronDown di default
                                    )}
                                </th>
                                <th>
                                    Data creazione{" "}
                                    {sortedBy.field === "dataCreazione" ? (
                                        sortedBy.order === "asc" ? <HiChevronDown className="cursor-pointer" onClick={() => sortData("dataCreazione")} /> : <HiChevronUp className="cursor-pointer" onClick={() => sortData("dataCreazione")} />
                                    ) : (
                                        <HiChevronDown className="cursor-pointer" onClick={() => sortData("dataCreazione")} />// Mostra sempre HiChevronDown di default
                                    )}
                                </th>
                                <th>
                                    Data ultima modifica{" "}
                                    {sortedBy.field === "dataUltimaModifica" ? (
                                        sortedBy.order === "asc" ? <HiChevronDown className="cursor-pointer" onClick={() => sortData("dataUltimaModifica")} /> : <HiChevronUp className="cursor-pointer" onClick={() => sortData("dataUltimaModifica")} />
                                    ) : (
                                        <HiChevronDown className="cursor-pointer" onClick={() => sortData("dataUltimaModifica")} />// Mostra sempre HiChevronDown di default
                                    )}
                                </th>
                                <th>
                                    N job{" "}
                                    {sortedBy.field === "numeroJob" ? (
                                        sortedBy.order === "asc" ? <HiChevronDown className="cursor-pointer" onClick={() => sortData("numeroJob")} /> : <HiChevronUp className="cursor-pointer" onClick={() => sortData("numeroJob")} />
                                    ) : (
                                        <HiChevronDown className="cursor-pointer" onClick={() => sortData("numeroJob")} />// Mostra sempre HiChevronDown di default
                                    )}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobList && Array.isArray(jobList) && jobList.map((data, index) => (
                                <tr key={index}>
                                    <td className="text-center">{parseInt(index) + 1}</td>
                                    <td className="JobViewer_NomeFileTd">
                                        <div className="JobViewer_IconOpenJob"><BiLinkExternal onClick={() => handleClickedData(data)} /></div>
                                        {data.nomeFile}
                                    </td>
                                    <td>
                                        {new Date(data.dataCreazione).toLocaleString("it-IT", {
                                            year: "numeric",
                                            month: "2-digit",
                                            day: "2-digit",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </td>
                                    <td>
                                        {new Date(data.dataUltimaModifica).toLocaleString("it-IT", {
                                            year: "numeric",
                                            month: "2-digit",
                                            day: "2-digit",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </td>
                                    <td className="small">{data.numeroJob}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            }
        </>
    );
}
