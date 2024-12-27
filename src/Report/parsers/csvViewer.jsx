import React from "react";

export default function CsvViewer({ data }) {
    if (!data || data.length === 0) {
        return <div>Nessun dato da visualizzare.</div>;
    }

    // Trova dinamicamente la colonna principale
    const primaryColumn = Object.keys(data[0])[0];

    // Elenco delle sezioni riconosciute
    const sectionNames = ["Barcode componenti", "Risultati avvitature", "Risultati collaudo", "Controlli"];

    // Funzione per analizzare dinamicamente intestazioni e righe
    const parseDynamicHeadersAndRows = (sectionName) => {
        const sectionIndex = data.findIndex((row) => row[primaryColumn] === sectionName);
        if (sectionIndex < 0) return null;

        const headerRow = data[sectionIndex + 1];
        const detailRows = [];

        for (let i = sectionIndex + 2; i < data.length; i++) {
            const currentRow = data[i];

            // Controlla se è una nuova sezione
            if (sectionNames.includes(currentRow[primaryColumn])) {
                break;
            }

            detailRows.push(currentRow);
        }

        const headers = [
            headerRow[primaryColumn],
            headerRow[""],
            ...(headerRow.__parsed_extra || []),
        ].filter((header) => header && header.trim().length > 0);

        const details = detailRows.map((row) => [
            row[primaryColumn],
            row[""],
            ...(row.__parsed_extra || []),
        ]);

        return { headers, details };
    };

    // Trova i dati generali (prima della prima sezione)
    const generalDataEndIndex = data.findIndex((row) => sectionNames.includes(row[primaryColumn]));
    const generalData = data.slice(0, generalDataEndIndex).map((row) => ({
        label: row[primaryColumn],
        value: row[""],
    }));

    // Rileva dati per ogni sezione
    const sections = [
        { name: "Barcode componenti", data: parseDynamicHeadersAndRows("Barcode componenti") },
        { name: "Risultati avvitature", data: parseDynamicHeadersAndRows("Risultati avvitature") },
        { name: "Risultati collaudo", data: parseDynamicHeadersAndRows("Risultati collaudo") },
        { name: "Controlli", data: parseDynamicHeadersAndRows("Controlli") },
    ];

    // Componente per generare una tabella dinamica
    const DynamicTable = ({ title, data }) => (
        <div>
            <h2>{title}</h2>
            <table border="1" style={{ width: "100%", textAlign: "left", marginBottom: "20px" }}>
                <thead>
                    <tr>
                        {data.headers.map((header, index) => (
                            <th key={index} style={{ padding: "8px" }}>
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.details.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, colIndex) => (
                                <td key={colIndex} style={{ padding: "8px" }}>
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    return (
        <div>
            {/* Visualizza la sezione generale */}
            {generalData.length > 0 && (
                <div>
                    <h2>Dati Generali</h2>
                    <ul>
                        {generalData.map((item, index) => (
                            <li key={index}>
                                <strong>{item.label}:</strong> {item.value}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Visualizza le tabelle per ogni sezione */}
            {sections.map(
                (section, index) =>
                    section.data && (
                        <DynamicTable key={index} title={section.name} data={section.data} />
                    )
            )}

            {/* Mostra un messaggio se nessuna sezione specifica è stata trovata */}
            {sections.every((section) => !section.data) && (
                <div>Nessuna sezione specifica trovata.</div>
            )}
        </div>
    );
}
