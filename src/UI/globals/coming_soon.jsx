/**
 * @namespace ComingSoon
 * @description Contiene componenti e utilità globali, inclusi componenti di caricamento e alert.
 */

/**
 * Componente per mostrare un'animazione di caricamento per una pagina in arrivo.
 * 
 * @component
 * @returns {React.Element} Il componente di caricamento per la pagina "Coming Soon".
 * @memberof ComingSoon
 */
function ComingSoon() {
    return (
        <>
            <div className="loadingspinner_comingsoon">
                <div id="square1_comingsoon"></div>
                <div id="square2_comingsoon"></div>
                <div id="square3_comingsoon"></div>
                <div id="square4_comingsoon"></div>
                <div id="square5_comingsoon"></div>
            </div>
        </>
    );
}

export default ComingSoon;
