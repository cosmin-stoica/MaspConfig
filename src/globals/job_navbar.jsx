/* eslint-disable react/jsx-pascal-case */
import { useState } from "react"
import JobNavbar_Widget from "./job_navbar_widget";
import { HiChartPie, HiCheckCircle, HiClipboard, HiClipboardCheck } from "react-icons/hi";
import { HiMiniDocumentChartBar, HiMiniDocumentCheck, HiMiniFolderPlus } from "react-icons/hi2";
import { IoMenu } from "react-icons/io5";


function JobNavbar() {
    const [openDashboard, setOpenDashboard] = useState(false);
    const [ticketNumber, setTicketsNumber] = useState(0);
    const [archivioTicketNumber, setArchivioTicketsNumber] = useState(0);
    const [activeSection, setActiveSection] = useState("");

    return (
        <>

            <div className={`dashboard_nav_drawer ${openDashboard ? 'open' : ''}`}>
            <div onClick={() => setOpenDashboard(!openDashboard)} className={`dashboard_nav_drawer_menuicon ${openDashboard ? 'open' : ''}`}><IoMenu/></div>
                <JobNavbar_Widget Text="Lista job" Icon={HiChartPie} onClick={() => setActiveSection("overview")} />
            </div>
        </>
    );
}

export default JobNavbar;
