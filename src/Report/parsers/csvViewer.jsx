import React from "react";

export default function CsvViewer({ data }) {
    if (!data || data.length === 0) {
        return <div>Nessun dato da visualizzare.</div>;
    }

    const generalInfo = data.slice(0, 7); // Prime righe con informazioni generali
    const headersRow = data.find((row) => row["REPORT OP160"] === "Vite");
    const details = data.filter((row) => parseInt(row["REPORT OP160"]) > 0); // Filtra le righe delle avvitature

    return (
        <div>
            <h2>Informazioni Generali</h2>
            <ul>
                {generalInfo.map((row, index) => (
                    <li key={index}>
                        <strong>{row["REPORT OP160"]}:</strong> {row[""]}
                    </li>
                ))}
            </ul>

            {headersRow && (
                <>
                    <h2>Dettagli Avvitature</h2>
                    <table border="1" style={{ width: "100%", textAlign: "left" }}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nome Job</th>
                                <th>ID Job</th>
                                <th>ID Vite</th>
                                <th>UCA</th>
                                <th>Coppia</th>
                                <th>Angolo</th>
                                <th>Esito</th>
                            </tr>
                        </thead>
                        <tbody>
                            {details.map((row, index) => (
                                <tr key={index}>
                                    <td>{row["REPORT OP160"]}</td>
                                    <td>{row[""]}</td>
                                    {headersRow.__parsed_extra.map((header, headerIndex) => (
                                        <td key={headerIndex}>{row.__parsed_extra[headerIndex]}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
}
