function Dashboard_Lower_Left2({ Data }) {
    return (
        <>
            <div className="Dashboard_Lower_Left2_MainDiv">
                <div className="Dashboard_Lower_Left2_MainDiv_Title">
                    Statistiche Report
                </div>
                <div className="Dashboard_Lower_Left2_MainDiv_Report">
                    <span>{Data}</span> Report creati
                </div>
            </div>
        </>
    );

}

export default Dashboard_Lower_Left2;