import { jsPDF } from "jspdf";
import "jspdf-autotable";

export function generateStructuredPdf(data, sectionNames, primaryColumn, pdfTitle, pdfNameFile) {
    const doc = new jsPDF();

    // Carica l'immagine per ottenere le dimensioni originali
    const img = new Image();
    const logoUrl = "/assets/images/masp.png"
    img.src = logoUrl;

    const addCircleImagesToPage = () => {
        doc.setFillColor(18, 6, 227); // Colore azzurro (RGB)
        doc.circle(0, 0, 17, 'F'); // Cerchio piccolo in alto a sinistra
        const logoImg = new Image();
        logoImg.src = "assets/images/solohead.png"
        doc.addImage(logoImg, "PNG", 3, 3, 7, 8);
    };
    const originalAddPage = doc.addPage;
    doc.addPage = function() {
        originalAddPage.call(this);
        addCircleImagesToPage();
    };
    addCircleImagesToPage();


    img.onload = function() {
        const imgWidth = img.width;  // Larghezza originale dell'immagine
        const imgHeight = img.height; // Altezza originale dell'immagine

        // Calcola la scala dell'immagine per adattarla alla larghezza della pagina (210mm) mantenendo le proporzioni
        const scale = Math.min(210 / imgWidth, 50 / imgHeight); // 210mm è la larghezza della pagina A4, 50mm è l'altezza massima

        const scaledWidth = imgWidth * scale;
        const scaledHeight = imgHeight * scale;

        const xPosition = (210 - scaledWidth) / 2;
        doc.addImage(logoUrl, "PNG", xPosition, 10, scaledWidth, scaledHeight);

        // Titolo del PDF
        doc.setFontSize(18);
        const titleY = 20 + scaledHeight + 10;  // Posiziona il titolo sotto l'immagine
        doc.text(pdfTitle, 14, titleY);

        // Aggiungi il testo descrittivo
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text("Questo report riassume i dati e le informazioni raccolte durante il ciclo di lavoro.", 14, titleY + 10);
        doc.text("Di seguito sono riportati i dettagli generali e le sezioni specifiche relative all'operazione.", 14, titleY + 20);

        // Aggiorna la posizione per la sezione dei dati generali
        let currentY = titleY + 30;

        // Resto del codice per il report
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
            doc.setTextColor(8, 6, 227);
            doc.text("Dati Generali", 14, currentY);

            const generalTableData = generalData.map((item) => [item.label, item.value]);

            doc.autoTable({
                startY: currentY + 6, // Posizionamento sotto il titolo
                head: [["Etichetta", "Valore"]],
                body: generalTableData,
                theme: "striped",
                headStyles: { fillColor: [8, 6, 227], textColor: 255 },
                alternateRowStyles: { fillColor: [240, 240, 240] },
            });

            // Aggiorna la posizione dopo la tabella dei dati generali
            currentY = doc.lastAutoTable.finalY + 10;  // Posizione dopo la tabella
        }

        // Aggiungere le sezioni
        sections.forEach((section) => {
            if (!section.data) return;

            const { headers, details } = section.data;

            doc.setFontSize(16);
            doc.setTextColor(8, 6, 227);
            doc.text(section.name, 14, currentY);

            doc.setTextColor(0, 0, 0);
            doc.autoTable({
                startY: currentY + 6,
                head: [headers],
                body: details,
                theme: "striped",
                headStyles: { fillColor: [8, 6, 227], textColor: 255 },
                alternateRowStyles: { fillColor: [240, 240, 240] },
                margin: { top: 20 },
            });

            currentY = doc.lastAutoTable.finalY + 10; // Posizione dopo la tabella della sezione
        });

        // Salva il PDF
        doc.save(`${pdfNameFile}.pdf`);
    };
}
