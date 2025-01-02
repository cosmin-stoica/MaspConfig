import React, { useState } from "react";
import CollapsibleSection from "./ui/CollpasibleSection";
import CsvViewerToolbar from "./ui/CsvViewerToolbar";
import { generateStructuredPdf } from "./csvPdfMaker";

export default function CsvViewer({ data }) {

    const [searchTerm, setSearchTerm] = useState("");

    const handleOnWordChange = (e) => {
        setSearchTerm(e.target.value);
    };


    const highlightText = (text, term) => {
        if (!term) return text;
        const regex = new RegExp(`(${term})`, "gi");
        return text.split(regex).map((part, index) =>
            part.toLowerCase() === term.toLowerCase() ? (
                <span key={index} style={{ backgroundColor: "purple", color: "white" }}>
                    {part}
                </span>
            ) : (
                part
            )
        );
    };

    if (!data || data.length === 0) {
        return <div>Nessun dato da visualizzare.</div>;
    }

    const primaryColumn = Object.keys(data[0])[0];
    const sectionNames = ["Barcode componenti", "Risultati avvitature", "Risultati collaudo", "Controlli"];

    const parseDynamicHeadersAndRows = (sectionName) => {
        const sectionIndex = data.findIndex((row) => row[primaryColumn] === sectionName);
        if (sectionIndex < 0) return null;

        const headerRow = data[sectionIndex + 1];
        const detailRows = [];

        for (let i = sectionIndex + 2; i < data.length; i++) {
            const currentRow = data[i];
            if (sectionNames.includes(currentRow[primaryColumn])) break;
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

    const generalDataEndIndex = data.findIndex((row) => sectionNames.includes(row[primaryColumn]));
    const generalData = data.slice(0, generalDataEndIndex).map((row) => ({
        label: row[primaryColumn],
        value: row[""],
    }));

    const sections = [
        { name: "Barcode componenti", data: parseDynamicHeadersAndRows("Barcode componenti") },
        { name: "Risultati avvitature", data: parseDynamicHeadersAndRows("Risultati avvitature") },
        { name: "Risultati collaudo", data: parseDynamicHeadersAndRows("Risultati collaudo") },
        { name: "Controlli", data: parseDynamicHeadersAndRows("Controlli") },
    ];
    return (
        <>
            <CsvViewerToolbar handleOnWordChange={handleOnWordChange} />
            <button
                onClick={() =>
                    generateStructuredPdf(
                        data,
                        ["Barcode componenti", "Risultati avvitature", "Risultati collaudo", "Controlli"],
                        Object.keys(data[0])[0],
                        Object.keys(data[0])[0] 
                    )
                }
            >
                Genera pdf
            </button>
            {generalData.length > 0 && (
                <CollapsibleSection title="Dati Generali" data={generalData}>
                    <ul>
                        {generalData.map((item, index) => (
                            <li key={index}>
                                <strong>
                                    {highlightText(item.label, searchTerm)}
                                </strong>
                                : {highlightText(item.value, searchTerm)}
                            </li>
                        ))}
                    </ul>
                </CollapsibleSection>
            )}

            {sections.map(
                (section, index) =>
                    section.data && (
                        <CollapsibleSection key={index} title={section.name} data={section.data}>
                            <table>
                                <thead>
                                    <tr>
                                        {section.data.headers.map((header, index) => (
                                            <th key={index} style={{ padding: "8px" }}>
                                                {header}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {section.data.details.map((row, rowIndex) => (
                                        <tr key={rowIndex}>
                                            {row.map((cell, colIndex) => (
                                                <td key={colIndex} style={{ padding: "8px" }}>
                                                    {highlightText(cell, searchTerm)}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </CollapsibleSection>
                    )
            )}

            {sections.every((section) => !section.data) && <div>Nessuna sezione specifica trovata.</div>}
        </>
    );
}
