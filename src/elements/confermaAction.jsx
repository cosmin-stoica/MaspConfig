const ConfermaAction = ({ title, text, onConferma, onAnnulla }) => {

    return (
        <>
            <div className='conferma-div'>
                <div className='conferma-div-title'>
                    {title}
                </div>
                <div className='conferma-div-text'>
                    {text}
                </div>
                <div className='conferma-div-buttons'>
                    <button className="conferma-div-buttons-conferma" onClick={onConferma}>Conferma</button>
                    <button className="conferma-div-buttons-annulla" onClick={onAnnulla}>Annulla</button>
                </div>
            </div>
        </>
    );

}

export default ConfermaAction;