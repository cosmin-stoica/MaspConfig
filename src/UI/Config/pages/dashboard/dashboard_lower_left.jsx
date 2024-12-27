function Dashboard_Lower_Left({ Data }) {
    const sezioneGenerale = Data?.["SEZIONE GENERALE"] || {};

    return (
        <div className="Dashboard_Lower_Left_MainDiv">
            <div className="Dashboard_Lower_Left_MainDiv_Title">
                ODP Config
            </div>
            <div className="Dashboard_Lower_Left_MainDiv_ElementsContainer">
                <div className="Dashboard_Lower_Left_MainDiv_ElementsContainerLower">
                    <div className="Dashboard_Lower_Left_MainDiv_Element">
                        <div className="Dashboard_Lower_Left_MainDiv_Element_Title">
                            N. modelli
                        </div>
                        <div className="Dashboard_Lower_Left_MainDiv_Element_Desc">
                            {sezioneGenerale["Numero di modelli"]}
                        </div>
                    </div>
                    <div className="Dashboard_Lower_Left_MainDiv_Element">
                        <div className="Dashboard_Lower_Left_MainDiv_Element_Title">
                            ODP
                        </div>
                        <div className="Dashboard_Lower_Left_MainDiv_Element_Desc">
                            {sezioneGenerale["ODP"]}
                        </div>
                    </div>
                </div>
                <div className="Dashboard_Lower_Left_MainDiv_ElementsContainerLower">
                    <div className="Dashboard_Lower_Left_MainDiv_Element bbbb">
                        <div className="Dashboard_Lower_Left_MainDiv_Element_Title">
                            ODP Startup
                        </div>
                        <div className="Dashboard_Lower_Left_MainDiv_Element_Desc">
                            {sezioneGenerale["ODP startup"]}
                        </div>
                    </div>
                    <div className="Dashboard_Lower_Left_MainDiv_Element bbbb">
                        <div className="Dashboard_Lower_Left_MainDiv_Element_Title">
                            Codice Sedile
                        </div>
                        <div className="Dashboard_Lower_Left_MainDiv_Element_Desc">
                            {sezioneGenerale["Codice Sedile"]}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard_Lower_Left;
