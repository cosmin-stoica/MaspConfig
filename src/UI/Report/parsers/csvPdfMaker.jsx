import { jsPDF } from "jspdf";
import "jspdf-autotable";

export function generateStructuredPdf(data, sectionNames, primaryColumn, pdfTitle) {
    const doc = new jsPDF();

    // Titolo del PDF
    doc.setFontSize(18);
    doc.text(pdfTitle, 14, 20);

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

    const sections = sectionNames.map((sectionName) => ({
        name: sectionName,
        data: parseDynamicHeadersAndRows(sectionName),
    }));

    if (generalData.length > 0) {
        doc.setFontSize(16);
        doc.text("Dati Generali", 14, 30);
    
        const generalTableData = generalData.map((item) => [item.label, item.value]);
    
        doc.autoTable({
            startY: 36, // Posizionamento sotto il titolo
            head: [["Etichetta", "Valore"]], // Intestazione della tabella
            body: generalTableData,
            theme: "striped",
            headStyles: { fillColor: [41, 128, 185], textColor: 255 },
            alternateRowStyles: { fillColor: [240, 240, 240] },
        });
    }

    let currentY = 50 + generalData.length * 8;

    // Aggiungere le sezioni
    sections.forEach((section) => {
        if (!section.data) return;

        const { headers, details } = section.data;

        doc.setFontSize(16);
        doc.setTextColor(41, 128, 185);
        doc.text(section.name, 14, currentY);

        doc.setTextColor(0, 0, 0);
        doc.autoTable({
            startY: currentY + 6,
            head: [headers],
            body: details,
            theme: "striped",
            headStyles: { fillColor: [41, 128, 185], textColor: 255 },
            alternateRowStyles: { fillColor: [240, 240, 240] },
            margin: { top: 20 },
        });

        currentY = doc.lastAutoTable.finalY + 10; // Aggiorna posizione
    });

    // Salva il PDF
    doc.save("structured_report.pdf");
}
