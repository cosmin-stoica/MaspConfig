import Loader from "../../../globals/loader"
import { useEffect, useState } from "react";
import { usePath } from "../../../../MAIN/Config/PathContext";

function Dashboard() {

    const [isLoading, setIsLoading] = useState(false);
    const { path } = usePath();
    const pathToSearch = `${path}\\ReportCollaudo`;
    const pathToSave = `${path}\\ReportCollaudo\\fileIndex.json`;

    const updateIndex = async () => {
        setIsLoading(true);
        try {
            await window.electron.indexFilesAndFolders(pathToSearch, pathToSave);
            setIsLoading(false);
        } catch (error) {
            console.error("Errore durante l'aggiornamento dell'indice:", error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        updateIndex();
    },[])

    return (
        <>
            {isLoading && <Loader />}
            <div className="dashboard_report_div bg_main">
            </div>
        </>
    );
}

export default Dashboard;
