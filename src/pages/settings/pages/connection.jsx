import { useState } from "react";
import { useMessages } from "../../../TCPContext";
import { FaServer, FaUser } from "react-icons/fa";
import ConfirmModal from "../../../globals/confirm_modal";

export default function Connection() {

    const { messages } = useMessages();
    const [showConfermaAggiornaClient, setShowConfermaAggiornaClient] = useState(null);

    const handleTestClient = () => {
        const sendMessage = async () => {
            const message = 'Ciao sono il React client\n';
            try {
                const serverResponse = await window.electron.sendTcpMessage("127.0.0.1", 3002, message)
                console.log('response', serverResponse);
            } catch (error) {
                console.error('Errore nella comunicazione TCP:', error);
            }
        };
        sendMessage();
    }

    const handleConfirm = () => {

    }

    return (
        <>
            <div className="Connections_MainDiv">
                <div className="Connections_Paragraph">
                    <div className="Connections_Paragraph_Title">
                        <FaServer /> Server
                    </div>
                    <div className="Connections_Paragraph_InputDiv">
                        <label>Indirizzo Ip</label>
                        <input value="127.0.0.1" disabled={true} />
                    </div>
                    <div className="Connections_Paragraph_InputDiv">
                        <label>Porta</label>
                        <input type="number" value="3001" disabled={true} />
                    </div>
                </div>
                <div className="Connections_Paragraph">
                    <div className="Connections_Paragraph_Title">
                        <FaUser /> Client
                    </div>
                    <div className="Connections_Paragraph_InputDiv">
                        <label>Indirizzo Ip</label>
                        <input value="127.0.0.1" disabled={false} />
                    </div>
                    <div className="Connections_Paragraph_InputDiv">
                        <label>Porta</label>
                        <input type="number" value="3002" disabled={false} />
                    </div>
                    <button className="Connections_Paragraph_Btn_Aggiorna" onClick={() => setShowConfermaAggiornaClient(true)}>Aggiorna parametri</button>
                </div>
            </div>
            {showConfermaAggiornaClient && <ConfirmModal
                Title="Conferma"
                Description="Vuoi aggiornare i parametri?"
                onCancel={() => setShowConfermaAggiornaClient(false)}
                onConfirm={handleConfirm}
                TextConfirm="true"
                TextToConfirm="client"
            />}
        </>
    );
};