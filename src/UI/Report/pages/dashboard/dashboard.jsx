import Loader from "../../../globals/loader"
import { useState, useEffect } from "react";

function Dashboard() {

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 600);

        return () => clearTimeout(timer); 
    }, []);


    return (
        <>
            {isLoading && <Loader />}
            <div className="dashboard_report_div bg_main">
            </div>
        </>
    );
}

export default Dashboard;
