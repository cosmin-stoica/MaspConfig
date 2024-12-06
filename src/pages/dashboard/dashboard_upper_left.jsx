import ItodoImage from "../../elements/itodo-img";
import { usePath } from "../../PathContext";

function Dashboard_Upper_Left() {

    const { path } = usePath();

    // Estrarre l'ultima parte del path, gestendo i casi in cui path non è valido
    const safePath = path && typeof path === 'string' ? path.split('\\').pop() : "Percorso non valido";

    return (
        <>
            <div className="Dashboard_Upper_Left_MainDiv">
                <ItodoImage className="Dashboard_Upper_Left_MainDiv_AbstractImg" src="images/abstract_dashboard.png"/>
                <div className="width50 flex-center-column">
                    <div className="Dashboard_Upper_Left_MainDiv_Title">
                        MASP CONFIG <br></br>
                    </div>
                    <div className="Dashboard_Upper_Left_MainDiv_Desc">
                        VERSIONE 1.0
                    </div>
                    <div className="Dashboard_Upper_Left_MainDiv_Desc2">
                        {safePath}
                    </div>
                </div>
                <div className="Dashboard_Upper_Left_Img">
                    <ItodoImage alt="logo" src="images/masp_white.png" />
                </div>
            </div>
        </>
    );

}

export default Dashboard_Upper_Left;
