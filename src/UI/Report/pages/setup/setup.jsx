import { useState } from "react";
import ConfigOpener from "../../../Config/pages/config/config_opener";

export default function Setup() {

    const [activeNavbar, setActiveNavbar] = useState(false)

    return (
        <>
           <ConfigOpener activeNavbar={activeNavbar} onSetActive={setActiveNavbar} isReportApp={true}/>
        </>
    );
}