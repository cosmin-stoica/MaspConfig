import ItodoImage from "../../../elements/itodo-img";

export default function SchedaIO() {
    const totalDivs = 24; 
    const divs = Array.from({ length: totalDivs }, (_, i) => i + 1); 

    return (
        <>
            <div className="SchedaIO_MainDiv">
                <div className="SchedaIO_MainDiv_Img">
                    <ItodoImage alt="schedaio" src="images/schedaioONLY.png" />
                    {divs.map((num) => (
                        <div key={num} className={`Schedaio_IMG In${num}`}></div>
                    ))}
                     {divs.map((num) => (
                        <div key={num} className={`Schedaio_IMG_InNum InNum${num}`}>{num}</div>
                    ))}
                    {divs.map((num) => (
                        <div key={num} className={`Schedaio_IMG_Out Out${num}`}></div>
                    ))}
                </div>
            </div>
        </>
    );
};
