/* global globalThis */

import { jsPDF } from "jspdf";
import "jspdf-autotable";

// Array di sezioni per la ricerca
const sectionsToSearch = [
  "Dati Generali",
  "Barcode componenti",
  "Risultati avvitature",
  "Risultati rivettatura",
  "Risultati collaudo",
  "Controlli",
];

// Funzione di utilità per convertire un HEX in RGB
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

// Funzione asincrona per caricare un'immagine tramite fetch e FileReader,
// restituisce un oggetto contenente il data URL e le dimensioni
async function loadImage(src) {
  const response = await fetch(src);
  const blob = await response.blob();
  const bitmap = await createImageBitmap(blob);
  const dataURL = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
  return { dataURL, width: bitmap.width, height: bitmap.height };
}

// Funzione principale per generare il PDF in modo strutturato
// Nota: la funzione è asincrona per gestire il caricamento delle immagini
async function generateStructuredPdf(
  data,
  sectionNames,
  primaryColumn,
  pdfTitle,
  pdfNameFile,
  insertInitialLogo,
  insertTopLeftLogo,
  mainColor,
  selectedImage,
  selectedImage2,
  append = false, // Modalità append (multipla)
  dataMerged = [], // Array di dataset multipli
  dataFileMultiple = [] // Array degli oggetti "dataFile" multipli
) {
  const doc = new jsPDF();
  let scaledHeight = 0;
  const { r, g, b } = hexToRgb(mainColor);

  // Funzione interna per generare il contenuto del report
  function generatePdfContent(doc, data, sectionNames, primaryColumn, pdfTitle, pdfNameFile) {
    // Imposta il titolo con il colore principale
    doc.setTextColor(r, g, b);
    doc.setFontSize(18);
    const maxWidth = doc.internal.pageSize.getWidth() - 28;
    const textLines = doc.splitTextToSize(pdfTitle, maxWidth);
    const titleY = 20 + scaledHeight + 10;
    doc.text(textLines, 14, titleY);

    // Testo descrittivo in nero
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(
      "Questo report riassume i dati e le informazioni raccolte durante il ciclo di lavoro.",
      14,
      titleY + 15
    );
    doc.text(
      "Di seguito sono riportati i dettagli generali e le sezioni specifiche relative all'operazione.",
      14,
      titleY + 20
    );

    // Posiziona il contenuto sotto il titolo
    let currentY = titleY + 30;

    // Funzione per estrarre intestazioni e righe per ciascuna sezione
    const parseDynamicHeadersAndRows = (sectionName) => {
      const sectionIndex = data.findIndex((row) => row[primaryColumn] === sectionName);
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
      const generalTableData = generalData.map((item) => [item.label, item.value]);
      doc.autoTable({
        startY: currentY + 6,
        head: [["Etichetta", "Valore"]],
        body: generalTableData,
        theme: "striped",
        headStyles: { fillColor: [r, g, b], textColor: 255 },
        alternateRowStyles: { fillColor: [240, 240, 240] },
      });
      currentY = doc.lastAutoTable.finalY + 10;
    }
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
      currentY = doc.lastAutoTable.finalY + 10;
    });
  }

  // Modalità append (multipla)
  if (append && dataMerged.length && dataFileMultiple.length) {
    let tocEntries = [];

    // Pre-carica le immagini se richieste usando loadImage
    let loadedInitialLogo = null;
    let loadedTopLeftLogo = null;
    try {
      if (insertInitialLogo && selectedImage) {
        loadedInitialLogo = await loadImage(selectedImage);
      }
      if (insertTopLeftLogo && selectedImage2) {
        loadedTopLeftLogo = await loadImage(selectedImage2);
      }
    } catch (err) {
      console.error("Errore nel caricamento delle immagini", err);
    }

    // Funzione helper per processare un dataset
    const processSingleDataset = (currentData, currentDataFile, isFirstPage = false) => {
      if (!isFirstPage) {
        doc.addPage();
      }
      if (loadedTopLeftLogo) {
        const circleDiameter = 17 * 2;
        const padding = 2;
        doc.setFillColor(r, g, b);
        doc.circle(0, 0, 17, "F");
        const imgWidth = loadedTopLeftLogo.width;
        const imgHeight = loadedTopLeftLogo.height;
        const scale = Math.min(
          (circleDiameter - padding * 2) / imgWidth,
          (circleDiameter - padding * 2) / imgHeight
        );
        const scaledWidth = (imgWidth * scale) / 2.5;
        const scaledHeightLogo = (imgHeight * scale) / 2.5;
        doc.addImage(loadedTopLeftLogo.dataURL, "PNG", 1, 3, scaledWidth, scaledHeightLogo);
      }
      if (isFirstPage && loadedInitialLogo) {
        const imgWidth = loadedInitialLogo.width;
        const imgHeight = loadedInitialLogo.height;
        const scale = Math.min(210 / imgWidth, 50 / imgHeight);
        const scaledWidth = (imgWidth * scale) / 2;
        const currentScaledHeight = (imgHeight * scale) / 2;
        const xPosition = (210 - scaledWidth) / 2;
        doc.addImage(loadedInitialLogo.dataURL, "PNG", xPosition, 10, scaledWidth, currentScaledHeight);
        scaledHeight = currentScaledHeight;
      }
      const currentPdfTitle = `${Object.keys(currentData[0])[0]} ${currentDataFile.csvDataCodice} ${currentDataFile.csvDataProgressivo} ${currentDataFile.csvDataOperatore}`;
      const currentPage = doc.getNumberOfPages();
      tocEntries.push({ title: currentPdfTitle, page: currentPage });
      generatePdfContent(doc, currentData, sectionNames, primaryColumn, currentPdfTitle, pdfNameFile);
    };

    // Processa tutti i dataset
    processSingleDataset(dataMerged[0], dataFileMultiple[0], true);
    for (let i = 1; i < dataMerged.length; i++) {
      processSingleDataset(dataMerged[i], dataFileMultiple[i]);
    }

    // Calcolo del numero di pagine per il TOC
    const leftMargin = 14;
    const rightMargin = 14;
    const bottomMargin = 20;
    const availableWidth = doc.internal.pageSize.getWidth() - leftMargin - rightMargin - 5;
    const lineHeight = 7;
    const headerText = "Indice";
    const headerPadding = 4;
    const headerFontSize = 20;
    const headerHeight = headerFontSize;
    const pageHeight = doc.internal.pageSize.getHeight();

    const firstPageStartY = 5 + headerHeight + 10;
    const subsequentPageStartY = 20;
    let simulatedTocY = firstPageStartY;
    let simulatedTocPages = 1;

    tocEntries.forEach((entry) => {
      const entryText = "- " + entry.title;
      const textLines = doc.splitTextToSize(entryText, availableWidth);
      const simulatedBlockHeight = textLines.length * lineHeight + 4;
      if (simulatedTocY + simulatedBlockHeight > pageHeight - bottomMargin) {
        simulatedTocPages++;
        simulatedTocY = subsequentPageStartY;
      }
      simulatedTocY += simulatedBlockHeight;
    });
    const tocPageCount = simulatedTocPages;

    // Inserisce le pagine TOC in testa al documento
    doc.insertPage(1);
    for (let i = 1; i < tocPageCount; i++) {
      doc.insertPage(1);
    }

    // Aggiorna i numeri di pagina nelle voci del TOC
    tocEntries = tocEntries.map((entry) => ({
      title: entry.title,
      page: entry.page + tocPageCount,
    }));

    // Disegna il TOC
    let tocCurrentPage = 1;
    doc.setPage(tocCurrentPage);
    let tocHeaderY = 5;
    if (insertInitialLogo && loadedInitialLogo) {
      const imgWidth = loadedInitialLogo.width;
      const imgHeight = loadedInitialLogo.height;
      const scale = Math.min(210 / imgWidth, 50 / imgHeight);
      const scaledWidth = (imgWidth * scale) / 2;
      const currentScaledHeight = (imgHeight * scale) / 2;
      const xPosition = (doc.internal.pageSize.getWidth() - scaledWidth) / 2;
      const initialLogoY = 10;
      doc.addImage(loadedInitialLogo.dataURL, "PNG", xPosition, initialLogoY, scaledWidth, currentScaledHeight);
      tocHeaderY = initialLogoY + currentScaledHeight + 10;
    }
    if (insertTopLeftLogo && loadedTopLeftLogo) {
      const circleDiameter = 17 * 2;
      const padding = 2;
      doc.setFillColor(r, g, b);
      doc.circle(0, 0, 17, "F");
      const tlImgWidth = loadedTopLeftLogo.width;
      const tlImgHeight = loadedTopLeftLogo.height;
      const tlScale = Math.min(
        (circleDiameter - padding * 2) / tlImgWidth,
        (circleDiameter - padding * 2) / tlImgHeight
      );
      const scaledWidthTL = (tlImgWidth * tlScale) / 2.5;
      const scaledHeightTL = (tlImgHeight * tlScale) / 2.5;
      doc.addImage(loadedTopLeftLogo.dataURL, "PNG", 1, 3, scaledWidthTL, scaledHeightTL);
    }
    doc.setFontSize(headerFontSize);
    doc.setFillColor(r, g, b);
    const headerWidthCalc = doc.getTextWidth(headerText) + headerPadding * 2;
    doc.rect(leftMargin, tocHeaderY, headerWidthCalc, headerHeight, "F");
    doc.setTextColor(255, 255, 255);
    doc.text(headerText, leftMargin + headerPadding, tocHeaderY + headerFontSize - 5);

    let tocY = tocHeaderY + headerHeight + 10;
    doc.setFontSize(12);
    doc.setTextColor(50, 50, 50);

    tocEntries.forEach((entry) => {
      const entryText = "- " + entry.title;
      const textLines = doc.splitTextToSize(entryText, availableWidth);
      const blockHeight = textLines.length * lineHeight + 4;
      if (tocY + blockHeight > pageHeight - bottomMargin) {
        tocCurrentPage++;
        doc.setPage(tocCurrentPage);
        tocY = subsequentPageStartY;
      }
      textLines.forEach((line, i) => {
        const yPos = tocY + i * lineHeight + lineHeight / 2;
        doc.text(line, leftMargin, yPos, { baseline: "middle" });
      });
      const centerY = tocY + blockHeight / 2 - 1;
      doc.setFontSize(10);
      const pageNumber = String(entry.page);
      const pageNumberWidth = doc.getTextWidth(pageNumber);
      const centerX = doc.internal.pageSize.getWidth() - rightMargin - pageNumberWidth / 2;
      doc.setTextColor(r, g, b);
      doc.text(pageNumber, centerX, centerY, {
        align: "center",
        baseline: "middle",
      });
      doc.setFontSize(12);
      doc.setTextColor(50, 50, 50);
      tocY += blockHeight;
    });

    // Restituisce il PDF come data URL
    return doc.output("dataurlstring");
  }

  // Modalità singola (comportamento originale)
  if (!append) {
    if (insertTopLeftLogo && selectedImage2) {
      try {
        const logoImg = await loadImage(selectedImage2);
        const addCircleImagesToPage = () => {
          const circleDiameter = 17 * 2;
          const padding = 2;
          doc.setFillColor(r, g, b);
          doc.circle(0, 0, 17, "F");
          const imgWidth = logoImg.width;
          const imgHeight = logoImg.height;
          const scale = Math.min(
            (circleDiameter - padding * 2) / imgWidth,
            (circleDiameter - padding * 2) / imgHeight
          );
          const scaledWidth = (imgWidth * scale) / 2.5;
          const scaledHeightLogo = (imgHeight * scale) / 2.5;
          doc.addImage(logoImg.dataURL, "PNG", 1, 3, scaledWidth, scaledHeightLogo);
        };
        const originalAddPage = doc.addPage.bind(doc);
        doc.addPage = function () {
          originalAddPage();
          addCircleImagesToPage();
        };
        addCircleImagesToPage();
      } catch (error) {
        console.error("Errore nel caricamento del logo in alto a sinistra", error);
      }
    }
    if (!insertInitialLogo) {
      generatePdfContent(doc, data, sectionNames, primaryColumn, pdfTitle, pdfNameFile);
      return doc.output("dataurlstring");
    } else {
      try {
        const imgObj = await loadImage(selectedImage);
        const imgWidth = imgObj.width;
        const imgHeight = imgObj.height;
        const scale = Math.min(210 / imgWidth, 50 / imgHeight);
        const scaledWidth = (imgWidth * scale) / 2;
        scaledHeight = (imgHeight * scale) / 2;
        const xPosition = (210 - scaledWidth) / 2;
        doc.addImage(imgObj.dataURL, "PNG", xPosition, 10, scaledWidth, scaledHeight);
        generatePdfContent(doc, data, sectionNames, primaryColumn, pdfTitle, pdfNameFile);
        return doc.output("dataurlstring");
      } catch (error) {
        console.error("Errore nel caricamento del logo iniziale", error);
        generatePdfContent(doc, data, sectionNames, primaryColumn, pdfTitle, pdfNameFile);
        return doc.output("dataurlstring");
      }
    }
  }
}

// Ascoltatore per i messaggi nel Web Worker
globalThis.addEventListener("message", async (event) => {
  try {
    const result = await generateStructuredPdf(...event.data);
    globalThis.postMessage({ result });
  } catch (error) {
    globalThis.postMessage({ error: error.message });
  }
});
