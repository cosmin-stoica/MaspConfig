/* eslint-disable react/jsx-pascal-case */
import { useState } from "react"
import JobNavbar_Widget from "./job_navbar_widget";
import { FaList } from "react-icons/fa";
import { GrOverview } from "react-icons/gr";
import { IoMenu } from "react-icons/io5";
import { useNavigate } from "react-router";


function JobNavbar() {
    const [openDashboard, setOpenDashboard] = useState(false);
    const navigate = useNavigate()

    return (
        <>

            <div className={`dashboard_nav_drawer ${openDashboard ? 'open' : ''}`}>
                <div onClick={() => setOpenDashboard(!openDashboard)} className={`dashboard_nav_drawer_menuicon ${openDashboard ? 'open' : ''}`}><IoMenu /></div>
                <JobNavbar_Widget openDashboard={openDashboard} Text="Overview" Icon={GrOverview} onClick={() => navigate("/job-overview")} />
                <JobNavbar_Widget openDashboard={openDashboard} Text="Lista Config" Icon={FaList} onClick={() => navigate("/job-list")} />
            </div>
        </>
    );
}

export default JobNavbar;
