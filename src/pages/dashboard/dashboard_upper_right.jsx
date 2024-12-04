import { HiArrowCircleDown } from "react-icons/hi";
import { Link } from "react-router-dom";

function Dashboard_Upper_Right() {
    return (
        <>
            <div className="Dashboard_Upper_Right_MainDiv">
                Documentazione
                <div className="Dashboard_Upper_Right_Icon">
                    <Link to="/doc">
                        <HiArrowCircleDown />
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Dashboard_Upper_Right;
