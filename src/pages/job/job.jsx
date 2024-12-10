import { useEffect } from "react";
import ComingSoon from "../../globals/coming_soon";
import { useNavigate } from "react-router";

function Job() {

    const navigate = useNavigate();

    useEffect(() =>{
        navigate("/job-list")
    },[]);

    return (
        <>
            <div className="bg_main width100 height100vh flex-center-column c-white">
                Non disponibile in questa versione
                <ComingSoon />
            </div>
        </>
    );

}

export default Job;