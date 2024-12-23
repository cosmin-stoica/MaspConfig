import Dashboard_Lower_Left from "./dashboard_lower_left";
import Dashboard_Lower_Left2 from "./dashboard_lower_left2";
import Dashboard_Upper_Left from "./dashboard_upper_left";
import Dashboard_Upper_Right from "./dashboard_upper_right";
import { useEffect, useState } from "react";
import { usePath } from "../../../MAIN/Config/PathContext";
import Loader from "../../../globals/loader"

function Dashboard() {
    const { path } = usePath();
    const [parsedODP, setParsedODP] = useState(null);
    const [reportNumbers, setReportNumbers] = useState(0);
    const [isLoading, setIsLoading] = useState(true); // Stato per il loader

    useEffect(() => {
        const loaderTimeout = setTimeout(() => setIsLoading(false), 1000);

        const ODPfilePath = `${path}/Config/ODP Config.ini`;
        window.electron.parseIniFile(ODPfilePath)
            .then((parsedData) => {
                console.log('File .ini parsato:', parsedData);
                setParsedODP(parsedData);
            })
            .catch((err) => {
                console.error('Errore durante il parsing:', err);
            });

        // Conteggio dei file nella directory "Report"
        const reportPath = `${path}/Report`;
        window.electron.getFilesNumber(reportPath)
            .then((fileCount) => {
                console.log(`Numero di file nella cartella Report: ${fileCount}`);
                setReportNumbers(fileCount);
            })
            .catch((err) => {
                console.error('Errore durante il conteggio dei file nella cartella Report:', err);
                setReportNumbers(0);
            });

        return () => clearTimeout(loaderTimeout); // Pulisci il timeout
    }, [path]);


    return (
        <>
        {isLoading && <Loader/>}
            <div className="dashboard_DEF_MAIN bg_main">
                <div className="dashboard_firstpart">
                    <div className="dashboard_upper">
                        <Dashboard_Upper_Left />
                    </div>
                    <div className="dashboard_lower">
                        <Dashboard_Lower_Left Data={parsedODP} />
                        <Dashboard_Lower_Left2 Data={reportNumbers} />
                    </div>
                </div>
                <div className="dashboard_secondpart">
                    <Dashboard_Upper_Right />
                </div>
            </div>
        </>
    );
}

export default Dashboard;
