import React, { useState } from 'react';

function InserisciProgrammaModal({ onConfirm, onCancel }) {
    const [nomeProgramma, setNomeProgramma] = useState('');
    const [modelloAvvitatore, setModelloAvvitatore] = useState('');
    const [numeroViti, setNumeroViti] = useState('');
    const [gruppoProduzione, setGruppoProduzione] = useState('');
    const [coppiaChiusura, setCoppiaChiusura] = useState('');
    const [bussola, setBussola] = useState('');
    const [numeroRipetizioni, setNumeroRipetizioni] = useState('');
    const [controlloPosizione, setControlloPosizione] = useState(false);
    const [tolleranzaX, setTolleranzaX] = useState('');
    const [tolleranzaY, setTolleranzaY] = useState('');
    const [tolleranzaZ, setTolleranzaZ] = useState('');

    const handleConfirm = () => {
        const programmaData = {
            nomeProgramma,
            modelloAvvitatore,
            numeroViti: parseInt(numeroViti, 10),
            gruppoProduzione: parseInt(gruppoProduzione, 10),
            coppiaChiusura: parseFloat(coppiaChiusura),
            bussola: parseInt(bussola, 10),
            numeroRipetizioni: parseInt(numeroRipetizioni, 10),
            controlloPosizione: controlloPosizione ? 1 : 0,
            tolleranzaX: parseInt(tolleranzaX, 10),
            tolleranzaY: parseInt(tolleranzaY, 10),
            tolleranzaZ: parseInt(tolleranzaZ, 10),
        };

        onConfirm(programmaData);
    };

    return (
        <div className='confirm_modal_overlay'>
            <div className="user_modal">
                <form className="user_modal_form" onSubmit={(e) => e.preventDefault()}>
                    <h2>Inserisci Programma di Avvitatura</h2>

                    <div className="user_modal_form_group">
                        <label htmlFor="nomeProgramma">Nome Programma</label>
                        <input
                            type="text"
                            id="nomeProgramma"
                            value={nomeProgramma}
                            onChange={(e) => setNomeProgramma(e.target.value)}
                            required
                        />
                    </div>

                    <div className="user_modal_form_group">
                        <label htmlFor="modelloAvvitatore">Modello Avvitatore</label>
                        <input
                            type="text"
                            id="modelloAvvitatore"
                            value={modelloAvvitatore}
                            onChange={(e) => setModelloAvvitatore(e.target.value)}
                            required
                        />
                    </div>

                    <div className="user_modal_form_group">
                        <label htmlFor="numeroViti">Numero Viti</label>
                        <input
                            type="number"
                            id="numeroViti"
                            value={numeroViti}
                            onChange={(e) => setNumeroViti(e.target.value)}
                            required
                        />
                    </div>

                    <div className="user_modal_form_group">
                        <label htmlFor="gruppoProduzione">Gruppo Produzione</label>
                        <input
                            type="number"
                            id="gruppoProduzione"
                            value={gruppoProduzione}
                            onChange={(e) => setGruppoProduzione(e.target.value)}
                            required
                        />
                    </div>

                    <div className="user_modal_form_group">
                        <label htmlFor="coppiaChiusura">Coppia Chiusura</label>
                        <input
                            type="number"
                            step="0.01"
                            id="coppiaChiusura"
                            value={coppiaChiusura}
                            onChange={(e) => setCoppiaChiusura(e.target.value)}
                            required
                        />
                    </div>

                    <div className="user_modal_form_group">
                        <label htmlFor="bussola">Bussola</label>
                        <input
                            type="number"
                            id="bussola"
                            value={bussola}
                            onChange={(e) => setBussola(e.target.value)}
                            required
                        />
                    </div>

                    <div className="user_modal_form_group">
                        <label htmlFor="numeroRipetizioni">Numero Ripetizioni</label>
                        <input
                            type="number"
                            id="numeroRipetizioni"
                            value={numeroRipetizioni}
                            onChange={(e) => setNumeroRipetizioni(e.target.value)}
                            required
                        />
                    </div>

                    <div className="user_modal_form_group">
                        <label htmlFor="controlloPosizione">Controllo Posizione</label>
                        <input
                            type="checkbox"
                            id="controlloPosizione"
                            checked={controlloPosizione}
                            onChange={(e) => setControlloPosizione(e.target.checked)}
                        />
                    </div>

                    <div className="user_modal_form_group">
                        <label htmlFor="tolleranzaX">Tolleranza X</label>
                        <input
                            type="number"
                            id="tolleranzaX"
                            value={tolleranzaX}
                            onChange={(e) => setTolleranzaX(e.target.value)}
                            required
                        />
                    </div>

                    <div className="user_modal_form_group">
                        <label htmlFor="tolleranzaY">Tolleranza Y</label>
                        <input
                            type="number"
                            id="tolleranzaY"
                            value={tolleranzaY}
                            onChange={(e) => setTolleranzaY(e.target.value)}
                            required
                        />
                    </div>

                    <div className="user_modal_form_group">
                        <label htmlFor="tolleranzaZ">Tolleranza Z</label>
                        <input
                            type="number"
                            id="tolleranzaZ"
                            value={tolleranzaZ}
                            onChange={(e) => setTolleranzaZ(e.target.value)}
                            required
                        />
                    </div>

                    <div className="user_modal_form_actions">
                        <button className='user_modal_form_actions_buttonconfirm' type="button" onClick={handleConfirm}>
                            Conferma
                        </button>
                        <button className='user_modal_form_actions_buttonannulla' type="button" onClick={onCancel}>
                            Annulla
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default InserisciProgrammaModal;
