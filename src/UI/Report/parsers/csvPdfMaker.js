import { jsPDF } from "jspdf";
import "jspdf-autotable";

const sectionsToSearch = [
  "Dati Generali",
  "Barcode componenti",
  "Risultati avvitature",
  "Risultati rivettatura",
  "Risultati collaudo",
  "Controlli",
];

function hexToRgb(hex) {
  if (!/^#[0-9A-F]{6}$/i.test(hex)) {
    throw new Error(`Invalid hex color: ${hex}`);
  }

  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return { r, g, b };
}

export function generateStructuredPdf(
  data,
  sectionNames,
  primaryColumn,
  pdfTitle,
  pdfNameFile,
  insertInitialLogo,
  insertTopLeftLogo,
  mainColor,
  selectedImage,
  selectedImage2
) {
  const doc = new jsPDF();
  let scaledHeight = 0;
  const { r, g, b } = hexToRgb(mainColor);

  if (insertTopLeftLogo && selectedImage2) {
    const logoImg = new Image();
    logoImg.src = selectedImage2;

    logoImg.onload = () => {
      const addCircleImagesToPage = () => {
        const circleDiameter = 17 * 2;
        const circleX = 0;
        const circleY = 0;
        const padding = 2;

        doc.setFillColor(r, g, b);
        doc.circle(circleX, circleY, 17, "F"); // Disegna il cerchio

        const imgWidth = logoImg.width;
        const imgHeight = logoImg.height;

        const scale = Math.min(
          (circleDiameter - padding * 2) / imgWidth,
          (circleDiameter - padding * 2) / imgHeight
        );

        const scaledWidth = (imgWidth * scale) / 2.5;
        const scaledHeight = (imgHeight * scale) / 2.5;

        doc.addImage(logoImg, "PNG", 1, 3, scaledWidth, scaledHeight); // Disegna l'immagine
      };

      // Modifica il comportamento di `addPage` per aggiungere il cerchio e l'immagine
      const originalAddPage = doc.addPage;
      doc.addPage = function () {
        originalAddPage.call(this);
        addCircleImagesToPage();
      };

      // Aggiungi l'immagine e il cerchio sulla prima pagina
      addCircleImagesToPage();
    };
  }

  if (!insertInitialLogo) {
    generatePdfContent(
      doc,
      data,
      sectionNames,
      primaryColumn,
      pdfTitle,
      pdfNameFile
    );
    return;
  }

  const img = new Image();
  img.src = selectedImage;

  img.onload = function () {
    const imgWidth = img.width;
    const imgHeight = img.height;

    const scale = Math.min(210 / imgWidth, 50 / imgHeight);
    const scaledWidth = (imgWidth * scale) / 2;
    scaledHeight = (imgHeight * scale) / 2;
    const xPosition = (210 - scaledWidth) / 2;

    doc.addImage(img, "PNG", xPosition, 10, scaledWidth, scaledHeight);

    generatePdfContent(
      doc,
      data,
      sectionNames,
      primaryColumn,
      pdfTitle,
      pdfNameFile
    );
  };

  function generatePdfContent(
    doc,
    data,
    sectionNames,
    primaryColumn,
    pdfTitle,
    pdfNameFile
  ) {
    // Titolo del PDF
    doc.setFontSize(18);
    const titleY = 20 + scaledHeight + 10; // Posiziona il titolo sotto l'immagine
    doc.text(pdfTitle, 14, titleY);

    // Aggiungi il testo descrittivo
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(
      "Questo report riassume i dati e le informazioni raccolte durante il ciclo di lavoro.",
      14,
      titleY + 10
    );
    doc.text(
      "Di seguito sono riportati i dettagli generali e le sezioni specifiche relative all'operazione.",
      14,
      titleY + 20
    );

    // Aggiorna la posizione per la sezione dei dati generali
    let currentY = titleY + 30;

    // Resto del codice per il report
    const parseDynamicHeadersAndRows = (sectionName) => {
      const sectionIndex = data.findIndex(
        (row) => row[primaryColumn] === sectionName
      );
      if (sectionIndex < 0) return null;

      const headerRow = data[sectionIndex + 1];
      const detailRows = [];

      for (let i = sectionIndex + 2; i < data.length; i++) {
        const currentRow = data[i];
        if (
            sectionNames.includes(currentRow[primaryColumn]) ||
            sectionsToSearch.includes(currentRow[primaryColumn])
        ) {
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

    const generalDataEndIndex = data.findIndex((row) =>
      sectionsToSearch.includes(row[primaryColumn])
    );

    let generalData = [];

    if (sectionNames.includes("Dati Generali"))
      generalData = data.slice(0, generalDataEndIndex).map((row) => ({
        label: row[primaryColumn],
        value: row[""],
      }));

    const sections = sectionNames.map((sectionName) => ({
      name: sectionName,
      data: parseDynamicHeadersAndRows(sectionName),
    }));

    if (generalData.length > 0) {
      doc.setFontSize(16);
      doc.setTextColor(r, g, b);
      doc.text("Dati Generali", 14, currentY);

      const generalTableData = generalData.map((item) => [
        item.label,
        item.value,
      ]);

      doc.autoTable({
        startY: currentY + 6, // Posizionamento sotto il titolo
        head: [["Etichetta", "Valore"]],
        body: generalTableData,
        theme: "striped",
        headStyles: { fillColor: [r, g, b], textColor: 255 },
        alternateRowStyles: { fillColor: [240, 240, 240] },
      });

      // Aggiorna la posizione dopo la tabella dei dati generali
      currentY = doc.lastAutoTable.finalY + 10; // Posizione dopo la tabella
    }

    // Aggiungere le sezioni
    sections.forEach((section) => {
      if (!section.data) return;

      const { headers, details } = section.data;

      doc.setFontSize(16);
      doc.setTextColor(r, g, b);
      doc.text(section.name, 14, currentY);

      doc.setTextColor(0, 0, 0);
      doc.autoTable({
        startY: currentY + 6,
        head: [headers],
        body: details,
        theme: "striped",
        headStyles: { fillColor: [r, g, b], textColor: 255 },
        alternateRowStyles: { fillColor: [240, 240, 240] },
        margin: { top: 20 },
      });

      currentY = doc.lastAutoTable.finalY + 10; // Posizione dopo la tabella della sezione
    });

    // Salva il PDF
    doc.save(`${pdfNameFile}.pdf`);
  }
}
