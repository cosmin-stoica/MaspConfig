import { useState } from "react";
import { useMessages } from "../../../../../MAIN/Config/TCPContext";
import { FaServer, FaUser } from "react-icons/fa";
import ConfirmModal from "../../../../globals/components/confirm_modal"

export default function Connection() {
    const { messages, clientIP, setClientIP, clientPort, setClientPort } = useMessages();
    const [showConfermaAggiornaClient, setShowConfermaAggiornaClient] = useState(false);
    const [tempIP, setTempIP] = useState(clientIP);
    const [tempPort, setTempPort] = useState(clientPort);

    const handleTestClient = () => {
        const sendMessage = async () => {
            const message = 'Test\n';
            try {
                const serverResponse = await window.electron.sendTcpMessage(clientIP, clientPort, message)
                console.log('response', serverResponse);
            } catch (error) {
                console.error('Errore nella comunicazione TCP:', error);
            }
        };
        sendMessage();
    }

    const handleConfirmParams = () => {
        setClientIP(tempIP);
        setClientPort(tempPort);
        setShowConfermaAggiornaClient(false);
    };

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
                        <FaUser /> Client <div className={`Connections_Paragraph_Circle ${typeof messages === "string" ? messages.trim() === "Test" ? "green" : "red" : "red"}`}> </div>
                    </div>
                    <div className="Connections_Paragraph_InputDiv">
                        <label>Indirizzo Ip</label>
                        <input
                            value={tempIP}
                            onChange={(e) => setTempIP(e.target.value)}
                        />
                    </div>
                    <div className="Connections_Paragraph_InputDiv">
                        <label>Porta</label>
                        <input
                            type="number"
                            value={tempPort}
                            onChange={(e) => setTempPort(e.target.value)}
                        />
                    </div>
                    <button
                        className="Connections_Paragraph_Btn_Aggiorna"
                        onClick={() => setShowConfermaAggiornaClient(true)}
                    >
                        Aggiorna parametri
                    </button>
                    <button
                        className="Connections_Paragraph_Btn_TestClient"
                        onClick={() => handleTestClient()}
                    >
                        Test connessione
                    </button>
                    <input className="Connections_Paragraph_InputDiv_Test" disabled={true} value={messages}></input>
                </div>
            </div>
            {showConfermaAggiornaClient && (
                <ConfirmModal
                    Title="Conferma"
                    Description="Vuoi aggiornare i parametri?"
                    onCancel={() => setShowConfermaAggiornaClient(false)}
                    onConfirm={handleConfirmParams}
                    TextConfirm="true"
                    TextToConfirm="client"
                />
            )}
        </>
    );
}
