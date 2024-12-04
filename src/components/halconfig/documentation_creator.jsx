import React, { useState, useEffect } from 'react';
import { Document, Packer, Paragraph, Table, TableOfContents, HeadingLevel, TableCell, TableRow, TextRun, WidthType, ShadingType, AlignmentType, ImageRun, BorderStyle } from 'docx';
import { saveAs } from 'file-saver';
import ConfermaAction from '../../elements/confermaAction';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DocumentationCreator = ({ jobArrays, className }) => {

    const navigate = useNavigate();

    const [dataDoc, setDataDoc] = useState([]);
    useEffect(() => {
        if (window.dataDoc) {
            setDataDoc(window.dataDoc);
        }
    }, []);

    const [conferma, setConferma] = useState(false);
    const [visible, setVisible] = useState(false);

    const [JobPermessi, setJobPermessi] = useState([]);
    const [ParagrafiPermessi, setParagrafiPermessi] = useState([]);

    const [currentTitle, setCurrentTitle] = useState("Documentazione software MaspApp - Job");
    const handleInputChangeTitle = (event) => {
        setCurrentTitle(event.target.value);
    };

    const [currentDisclaimer, setCurrentDisclaimer] = useState("Il presente documento contiene informazioni di carattere riservato e/o confidenziale ed è rivolto esclusivamente al destinatario. Ne sono \n pertanto vietati l'uso, la diffusione, la distribuzione o la riproduzione per qualsiasi fine da parte di persone diverse dal destinatario.");
    const handleInputChangeDisclaimer = (event) => {
        setCurrentDisclaimer(event.target.value);
    };

    const [currentVersion, setCurrentVersion] = useState("");
    const handleInputChangeVersion = (event) => {
        setCurrentVersion(event.target.value);
    };
    const [lastVersion, setLastVersion] = useState("");

    async function getVersione() {
        try {
            const response = await axios.get('https://www.scanteq.com/php/documentazione.php');
            console.log('Versione:', response.data.Versione);
            setLastVersion(response.data.Versione);
            return true;
        } catch (error) {
            window.alert('Errore nel recupero della versione:', error);
            setLastVersion("");
            return false;
        }
    }

    async function updateVersione(newVersione) {
        try {
            const response = await axios.put('https://www.scanteq.com/php/documentazione.php', {
                Versione: newVersione
            });
            console.log('Risposta dal server:', response.data);
            return true;
        } catch (error) {
            window.alert('Errore nell\'aggiornamento della versione:', error);
            return false;
        }
    }

    const AvviaCreazioneJob = () => {
        navigate("/jobconfig");
    }

    const AvviaCreazione = () => {
        setVisible(!visible);
        if (visible)
            setConferma(false);
        else {
            getVersione();
        }
    }

    const AvviaCreazioneInner = () => {
        setConferma(!conferma);
    }

    const createDocument = async () => {


        if (currentVersion.length < 1) {
            window.alert("Inserisci la versione per poter continuare");
            setConferma(false);
            return;
        }

        if (currentTitle.length < 1) {
            window.alert("Inserisci il titolo per poter continuare");
            setConferma(false);
            return;
        }

        if (currentDisclaimer.length < 1) {
            window.alert("Inserisci il disclaimer per poter continuare");
            setConferma(false);
            return;
        }

        const arrayWithTitles = Object.entries(jobArrays);

        const elementsPromises = arrayWithTitles.map(async ([title, doc], index) => {


            let paragraphs = [];
            if (index === 0) {


                // Preload the image
                let imageDataMasp;
                let originalWidth, originalHeight;
                try {
                    const response = await fetch("/assets/images/masp/masp.png");
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    imageDataMasp = await response.blob();

                    const image = new Image();
                    const imageLoadPromise = new Promise((resolve, reject) => {
                        image.onload = () => {
                            originalWidth = image.width;
                            originalHeight = image.height;
                            resolve();
                        };
                        image.onerror = (e) => {
                            reject(new Error('Error loading image.'));
                        };
                    });
                    image.src = URL.createObjectURL(imageDataMasp);
                    await imageLoadPromise;
                    console.log('Image loaded:', imageDataMasp);
                } catch (error) {
                    console.error("Error loading image:", error);
                    return [];
                }
                let desiredWidth = 300;
                let calculatedHeight = (originalHeight / originalWidth) * desiredWidth;

                let today = new Date();
                let day = String(today.getDate()).padStart(2, '0');
                let month = String(today.getMonth() + 1).padStart(2, '0'); // I mesi in JavaScript vanno da 0 a 11, quindi bisogna aggiungere 1
                let year = String(today.getFullYear());

                let formattedDate = `${day}/${month}/${year}`;


                paragraphs.push(
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: { before: 500, after: 100 },
                        children: [
                            new ImageRun({
                                data: imageDataMasp,
                                transformation: {
                                    width: desiredWidth,
                                    height: calculatedHeight
                                }
                            })
                        ]
                    }),
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: { before: 1500 },
                        children: [
                            new TextRun({
                                text: `${currentTitle}`,
                                bold: false,
                                size: 48,
                                color: "454443",
                                font: "Arial"
                            }),
                        ],
                    }),
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: { before: 1700, after: 1700 },
                        children: [
                            new TextRun({
                                text: `Versione ${currentVersion} del ${formattedDate}`,
                                bold: false,
                                size: 48,
                                color: "000000",
                                font: "Arial"
                            }),
                        ],
                    }),
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: { after: 1700 },
                        children: [
                            new TextRun({
                                text: `${currentDisclaimer}`,
                                bold: false,
                                size: 28,
                                color: "0f4bb9",
                                font: "Arial"
                            }),
                        ],
                    }),
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: { after: 2000 },
                        children: [
                            new TextRun({
                                text: 'Scanteq Srl',
                                bold: false,
                                size: 48,
                                color: "000000",
                                font: "Arial"
                            }),
                        ],
                    }),
                    /*new Paragraph({
                        children: [
                            new TextRun({
                                text: 'Indice',
                                bold: true,
                                size: 48,
                                color: "000000",
                                font: "Arial"
                            })
                        ],
                        heading: HeadingLevel.HEADING_1,
                    }),
                    new TableOfContents("Sommario", {
                        hyperlink: true,
                        headingStyleRange: "1",
                    })*/
                );
            }


            if (JobPermessi.includes(doc.title)) {


                // Preload the image
                let imageData;
                if ('img_src' in doc) {
                    try {
                        const response = await fetch(doc.img_src);
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        imageData = await response.blob();
                        console.log(imageData);
                    } catch (error) {
                        console.error("Error loading image:", error);
                        return [];
                    }
                }

                let DiagnosticaimageData;
                let originalWidth, originalHeight;
                if ('diagnostica_img_src' in doc && ParagrafiPermessi.includes("Diagnostica")) {
                    try {
                        const response = await fetch(doc.diagnostica_img_src);
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        DiagnosticaimageData = await response.blob();

                        const image = new Image();
                        const imageLoadPromise = new Promise((resolve, reject) => {
                            image.onload = () => {
                                originalWidth = image.width;
                                originalHeight = image.height;
                                resolve();
                            };
                            image.onerror = (e) => {
                                reject(new Error('Error loading image.'));
                            };
                        });
                        image.src = URL.createObjectURL(DiagnosticaimageData);
                        await imageLoadPromise;
                        console.log('Image loaded:', DiagnosticaimageData);
                    } catch (error) {
                        console.error("Error loading image:", error);
                        return [];
                    }
                }
                const desiredWidth = 500;
                const calculatedHeight = (originalHeight / originalWidth) * desiredWidth;

                let arrayJob;
                if ('data_job' in doc && ParagrafiPermessi.includes("Job")) {
                    const matchingDataDoc = dataDoc.find(item => item.Name === doc.title);
                    if (matchingDataDoc) {
                        arrayJob = matchingDataDoc.Job;
                    } else {
                        arrayJob = [];
                    }
                } else {
                    arrayJob = [];
                }

                let arrayHal;
                if ('data_hal' in doc && ParagrafiPermessi.includes("Hal")) {
                    const matchingDataDoc = dataDoc.find(item => item.Name === doc.title);
                    if (matchingDataDoc) {
                        arrayHal = matchingDataDoc.Hal;
                    } else {
                        arrayHal = [];
                    }
                } else {
                    arrayHal = [];
                }

                let arrayDiagnostica;
                if ('data_diagnostica' in doc && ParagrafiPermessi.includes("Diagnostica")) {
                    const matchingDataDoc = dataDoc.find(item => item.Name === doc.title);
                    if (matchingDataDoc) {
                        arrayDiagnostica = matchingDataDoc.Diagnostica;
                    } else {
                        arrayDiagnostica = [];
                    }
                } else {
                    arrayDiagnostica = [];
                }

                let arrayAux1;
                if ('hal_config_aux1_title' in doc && ParagrafiPermessi.includes("Hal Aux")) {
                    const matchingDataDoc = dataDoc.find(item => item.Name === doc.title);
                    if (matchingDataDoc) {
                        arrayAux1 = matchingDataDoc.Hal_Aux1;
                    } else {
                        arrayAux1 = [];
                    }
                } else {
                    arrayAux1 = [];
                }

                let arrayAux2;
                if ('hal_config_aux2_title' in doc && ParagrafiPermessi.includes("Hal Aux")) {
                    const matchingDataDoc = dataDoc.find(item => item.Name === doc.title);
                    if (matchingDataDoc) {
                        arrayAux2 = matchingDataDoc.Hal_Aux2;
                    } else {
                        arrayAux2 = [];
                    }
                } else {
                    arrayAux2 = [];
                }

                let arrayAux3;
                if ('hal_config_aux3_title' in doc && ParagrafiPermessi.includes("Hal Aux")) {
                    const matchingDataDoc = dataDoc.find(item => item.Name === doc.title);
                    if (matchingDataDoc) {
                        arrayAux3 = matchingDataDoc.Hal_Aux3;
                    } else {
                        arrayAux3 = [];
                    }
                } else {
                    arrayAux3 = [];
                }

                const createRows = (array) => {
                    return array.map(item => {
                        return new TableRow({
                            children: [
                                new TableCell({
                                    children: [new Paragraph({
                                        children: [new TextRun({ text: item.nome, size: 18, font: "Arial" })]
                                    })],
                                    width: { size: 33.33, type: WidthType.PERCENTAGE },
                                    margins: { top: 100, bottom: 100 }
                                }),
                                new TableCell({
                                    children: [new Paragraph({
                                        children: [new TextRun({ text: item.tipo, size: 18, font: "Arial" })]
                                    })],
                                    width: { size: 33.33, type: WidthType.PERCENTAGE },
                                    margins: { top: 100, bottom: 100 }
                                }),
                                new TableCell({
                                    children: [new Paragraph({
                                        children: [new TextRun({ text: item.tooltip, size: 18, font: "Arial" })]
                                    })],
                                    width: { size: 33.33, type: WidthType.PERCENTAGE },
                                    margins: { top: 100, bottom: 100 }
                                }),
                            ],
                        });
                    });
                };

                const createTable = (rows) => {
                    let headerRow;
                    if (rows.length > 0) {
                        headerRow = new TableRow({
                            children: [
                                new TableCell({
                                    children: [new Paragraph({
                                        children: [new TextRun({ text: "Nome", color: "383838", bold: true, size: 24, font: "Arial" })]
                                    })],
                                    width: { size: 33.33, type: WidthType.PERCENTAGE },
                                    shading: { fill: "FFFFFF", type: ShadingType.CLEAR },
                                    margins: { top: 200, bottom: 200 }
                                }),
                                new TableCell({
                                    children: [new Paragraph({
                                        children: [new TextRun({ text: "Tipo", color: "383838", bold: true, size: 24, font: "Arial" })]
                                    })],
                                    width: { size: 33.33, type: WidthType.PERCENTAGE },
                                    shading: { fill: "FFFFFF", type: ShadingType.CLEAR },
                                    margins: { top: 200, bottom: 200 }
                                }),
                                new TableCell({
                                    children: [new Paragraph({
                                        children: [new TextRun({ text: "Tooltip", color: "383838", bold: true, size: 24, font: "Arial" })]
                                    })],
                                    width: { size: 33.33, type: WidthType.PERCENTAGE },
                                    shading: { fill: "FFFFFF", type: ShadingType.CLEAR },
                                    margins: { top: 200, bottom: 200 }
                                }),
                            ],
                        });
                    }
                    else {
                        headerRow = new TableRow({
                            children: [
                                new TableCell({
                                    children: [new Paragraph({
                                        children: [new TextRun({ text: "Nome", color: "383838", bold: true, size: 24, font: "Arial" })]
                                    })],
                                    width: { size: 33.33, type: WidthType.PERCENTAGE },
                                    shading: { fill: "db163a", type: ShadingType.CLEAR },
                                    margins: { top: 200, bottom: 200 }
                                }),
                                new TableCell({
                                    children: [new Paragraph({
                                        children: [new TextRun({ text: "Tipo", color: "383838", bold: true, size: 24, font: "Arial" })]
                                    })],
                                    width: { size: 33.33, type: WidthType.PERCENTAGE },
                                    shading: { fill: "db163a", type: ShadingType.CLEAR },
                                    margins: { top: 200, bottom: 200 }
                                }),
                                new TableCell({
                                    children: [new Paragraph({
                                        children: [new TextRun({ text: "Tooltip", color: "383838", bold: true, size: 24, font: "Arial" })]
                                    })],
                                    width: { size: 33.33, type: WidthType.PERCENTAGE },
                                    shading: { fill: "db163a", type: ShadingType.CLEAR },
                                    margins: { top: 200, bottom: 200 }
                                }),
                            ],
                        });
                    }

                    return new Table({
                        width: { size: 100, type: WidthType.PERCENTAGE },
                        rows: [
                            headerRow,
                            ...rows,
                        ],
                    });
                };

                const createTableDiagnostica = (rows) => {
                    let headerRow;
                    if (rows.length > 0) {
                        headerRow = new TableRow({
                            children: [
                                new TableCell({
                                    children: [new Paragraph({
                                        children: [new TextRun({ text: "Nome", color: "383838", bold: true, size: 24, font: "Arial" })]
                                    })],
                                    width: { size: 33.33, type: WidthType.PERCENTAGE },
                                    shading: { fill: "FFFFFF", type: ShadingType.CLEAR },
                                    margins: { top: 200, bottom: 200 }
                                }),
                                new TableCell({
                                    children: [new Paragraph({
                                        children: [new TextRun({ text: "Descrizione", color: "383838", bold: true, size: 24, font: "Arial" })]
                                    })],
                                    width: { size: 33.33, type: WidthType.PERCENTAGE },
                                    shading: { fill: "FFFFFF", type: ShadingType.CLEAR },
                                    margins: { top: 200, bottom: 200 }
                                }),
                            ],
                        });
                    }
                    else {
                        headerRow = new TableRow({
                            children: [
                                new TableCell({
                                    children: [new Paragraph({
                                        children: [new TextRun({ text: "Nome", color: "383838", bold: true, size: 24, font: "Arial" })]
                                    })],
                                    width: { size: 33.33, type: WidthType.PERCENTAGE },
                                    shading: { fill: "db163a", type: ShadingType.CLEAR },
                                    margins: { top: 200, bottom: 200 }
                                }),
                                new TableCell({
                                    children: [new Paragraph({
                                        children: [new TextRun({ text: "Descrizione", color: "383838", bold: true, size: 24, font: "Arial" })]
                                    })],
                                    width: { size: 33.33, type: WidthType.PERCENTAGE },
                                    shading: { fill: "db163a", type: ShadingType.CLEAR },
                                    margins: { top: 200, bottom: 200 }
                                }),
                            ],
                        });
                    }

                    return new Table({
                        width: { size: 100, type: WidthType.PERCENTAGE },
                        rows: [
                            headerRow,
                            ...rows,
                        ],
                    });
                };

                const createRowsDiagnostica = (array) => {
                    return array.map(item => {
                        return new TableRow({
                            children: [
                                new TableCell({
                                    children: [new Paragraph({
                                        children: [new TextRun({ text: item.nome, size: 18, font: "Arial" })]
                                    })],
                                    width: { size: 33.33, type: WidthType.PERCENTAGE },
                                    margins: { top: 100, bottom: 100 }
                                }),
                                new TableCell({
                                    children: [new Paragraph({
                                        children: [new TextRun({ text: item.descrizione, size: 18, font: "Arial" })]
                                    })],
                                    width: { size: 33.33, type: WidthType.PERCENTAGE },
                                    margins: { top: 100, bottom: 100 }
                                }),
                            ],
                        });
                    });
                };

                const jobRows = createRows(arrayJob);

                let halRows;
                if ('data_hal' in doc && ParagrafiPermessi.includes("Hal")) {
                    halRows = createRows(arrayHal);
                }

                let diagnosticaRows;
                if ('data_diagnostica' in doc && ParagrafiPermessi.includes("Diagnostica")) {
                    diagnosticaRows = createRowsDiagnostica(arrayDiagnostica);
                }


                let Aux1Rows;
                if ('hal_config_aux1_data' in doc && ParagrafiPermessi.includes("Hal Aux")) {
                    Aux1Rows = createRows(arrayAux1);
                }

                let Aux2Rows;
                if ('hal_config_aux2_data' in doc && ParagrafiPermessi.includes("Hal Aux")) {
                    Aux2Rows = createRows(arrayAux2);
                }

                let Aux3Rows;
                if ('hal_config_aux3_data' in doc && ParagrafiPermessi.includes("Hal Aux")) {
                    Aux3Rows = createRows(arrayAux3);
                }



                const splitTextIntoParagraphs = (text) => {
                    // Funzione per identificare se una parola è un'abbreviazione che termina con "ini"
                    const isAbbreviation = (word) => {
                        return /\b\w+ini\b/.test(word);
                    };

                    // Rimuovi i newline e normalizza gli spazi
                    let singleLineText = text.replace(/\n/g, ' ');
                    let normalizedText = singleLineText.replace(/\s+/g, ' ');

                    // Suddividi il testo in parole per gestire le abbreviazioni
                    const words = normalizedText.split(' ');
                    let sentence = '';
                    const sentences = [];

                    words.forEach((word, index) => {
                        if (isAbbreviation(word)) {
                            sentence += word + ' ';
                        } else {
                            if (/[.!?]$/.test(word)) {
                                sentence += word;
                                sentences.push(sentence.trim());
                                sentence = '';
                            } else {
                                sentence += word + ' ';
                            }
                        }
                    });

                    if (sentence.trim().length > 0) {
                        sentences.push(sentence.trim());
                    }

                    // Mappa le frasi in paragrafi, aggiungendo una riga vuota tra di esse
                    const paragraphs = [];
                    sentences.forEach((sentence, index) => {
                        paragraphs.push(new Paragraph({
                            children: [new TextRun({ text: sentence, size: 20, font: "Arial" })]
                        }));
                        // Aggiungi un paragrafo vuoto dopo ogni frase tranne l'ultima
                        if (index < sentences.length - 1) {
                            paragraphs.push(new Paragraph({ children: [] }));
                        }
                    });

                    return paragraphs;
                };

                const splitTextIntoParagraphsEsempioJob = (text) => {
                    if (!text) {
                        return [];
                    }

                    const lines = text.split('\n');
                    const paragraphs = lines.map(line => new Paragraph({
                        children: [new TextRun({ text: line.trim(), size: 16, font: "Arial" })]
                    }));

                    const table = new Table({
                        width: { size: 100, type: WidthType.PERCENTAGE },
                        rows: [
                            new TableRow({
                                children: [
                                    new TableCell({
                                        children: paragraphs,
                                        borders: {
                                            top: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                                            bottom: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                                            left: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                                            right: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                                        },
                                        margins: {
                                            top: 100, // Aggiungi 100 "twip" (1/20 di punto tipografico) di margine superiore
                                            bottom: 100, // Aggiungi 100 "twip" di margine inferiore
                                            left: 100, // Aggiungi 100 "twip" di margine sinistro
                                            right: 100, // Aggiungi 100 "twip" di margine destro
                                        }
                                    })
                                ]
                            })
                        ]
                    });

                    return [table];
                };

                paragraphs.push(

                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: { before: 400, after: 200 },
                        children: [
                            new TextRun({
                                text: `Prova ${doc.title}`,
                                bold: false,
                                size: 48,
                                color: "000000",
                                font: "Arial"
                            }),
                        ],
                        heading: HeadingLevel.HEADING_1,
                    }),
                    ...splitTextIntoParagraphs(doc.text),
                );


                if ('img_src' in doc) {
                    paragraphs.push(
                        new Paragraph({
                            alignment: AlignmentType.CENTER,
                            spacing: { before: 500, after: 10 },
                            children: [
                                new ImageRun({
                                    data: imageData,
                                    transformation: {
                                        width: 600,
                                        height: 400
                                    }
                                })
                            ]
                        }),
                        new Paragraph({
                            alignment: AlignmentType.CENTER,
                            spacing: { after: 500 },
                            children: [
                                new TextRun({
                                    text: `Esempio di videata durante il job: ${doc.title}`,
                                    bold: false,
                                    size: 20,
                                    color: "383838",
                                    font: "Arial"
                                })
                            ]
                        })
                    );
                }

                if (ParagrafiPermessi.includes("Job")) {
                    paragraphs.push(
                        new Paragraph({
                            alignment: AlignmentType.CENTER,
                            spacing: { before: 200, after: 200 },
                            children: [
                                new TextRun({
                                    text: `Job: ${doc.title}`,
                                    bold: false,
                                    size: 32,
                                    color: "383838",
                                    font: "Arial"
                                })
                            ]
                        }),
                        createTable(jobRows),
                    );
                }

                const cleanText = (text) => {
                    // Rimuove newline e normalizza gli spazi
                    return text.replace(/\s+/g, ' ').trim();
                };




                /*<----------------------------------------ESEMPI JOB--------------------------------------------------->*/

                if (ParagrafiPermessi.includes("Esempi Job")) {

                    paragraphs.push(
                        new Paragraph({
                            alignment: AlignmentType.CENTER,
                            spacing: { before: 500, after: 500 },
                            children: [
                                new TextRun({
                                    text: `Esempio di implementazione job: ${doc.title}`,
                                    bold: false,
                                    size: 20,
                                    color: "383838",
                                    font: "Arial"
                                })
                            ]
                        })
                    );

                    if (doc.esempio_job1_text && doc.esempio_job1_text.length !== 0) {

                        paragraphs.push(
                            new Paragraph({
                                alignment: AlignmentType.LEFT,
                                spacing: { after: 200 },
                                children: [
                                    new TextRun({
                                        text: doc.esempio_job1_title,
                                        bold: true,
                                        size: 20,
                                        color: "383838",
                                        font: "Arial"
                                    })
                                ]
                            }),
                            ...splitTextIntoParagraphsEsempioJob(doc.esempio_job1_text));
                    }

                    if (doc.esempio_job2_text && doc.esempio_job2_text.length !== 0) {

                        paragraphs.push(
                            new Paragraph({
                                alignment: AlignmentType.LEFT,
                                spacing: { before: 200, after: 40 },
                                children: [
                                    new TextRun({
                                        text: doc.esempio_job2_title,
                                        bold: true,
                                        size: 20,
                                        color: "383838",
                                        font: "Arial"
                                    })
                                ]
                            }),
                            ...splitTextIntoParagraphsEsempioJob(doc.esempio_job2_text));
                    }

                    if (doc.esempio_job3_text && doc.esempio_job3_text.length !== 0) {

                        paragraphs.push(
                            new Paragraph({
                                alignment: AlignmentType.LEFT,
                                spacing: { before: 200, after: 40 },
                                children: [
                                    new TextRun({
                                        text: doc.esempio_job3_title,
                                        bold: true,
                                        size: 20,
                                        color: "383838",
                                        font: "Arial"
                                    })
                                ]
                            }),
                            ...splitTextIntoParagraphsEsempioJob(doc.esempio_job3_text));
                    }


                    if (doc.esempio_job4_text && doc.esempio_job4_text.length !== 0) {

                        paragraphs.push(
                            new Paragraph({
                                alignment: AlignmentType.LEFT,
                                spacing: { before: 200, after: 40 },
                                children: [
                                    new TextRun({
                                        text: doc.esempio_job4_title,
                                        bold: true,
                                        size: 20,
                                        color: "383838",
                                        font: "Arial"
                                    })
                                ]
                            }),
                            ...splitTextIntoParagraphsEsempioJob(doc.esempio_job4_text));
                    }
                    if (doc.esempio_job5_text && doc.esempio_job5_text.length !== 0) {

                        paragraphs.push(
                            new Paragraph({
                                alignment: AlignmentType.LEFT,
                                spacing: { before: 200, after: 40 },
                                children: [
                                    new TextRun({
                                        text: doc.esempio_job5_title,
                                        bold: true,
                                        size: 20,
                                        color: "383838",
                                        font: "Arial"
                                    })
                                ]
                            }),
                            ...splitTextIntoParagraphsEsempioJob(doc.esempio_job5_text));
                    }
                    if (doc.esempio_job6_text && doc.esempio_job6_text.length !== 0) {

                        paragraphs.push(
                            new Paragraph({
                                alignment: AlignmentType.LEFT,
                                spacing: { before: 200, after: 40 },
                                children: [
                                    new TextRun({
                                        text: doc.esempio_job6_title,
                                        bold: true,
                                        size: 20,
                                        color: "383838",
                                        font: "Arial"
                                    })
                                ]
                            }),
                            ...splitTextIntoParagraphsEsempioJob(doc.esempio_job6_text));
                    }


                }



















                if (ParagrafiPermessi.includes("Diagnostica")) {
                    if ('diagnostica_img_src' in doc) {
                        paragraphs.push(
                            new Paragraph({
                                alignment: AlignmentType.CENTER,
                                spacing: { before: 500, after: 200 },
                                children: [
                                    new TextRun({
                                        text: `Diagnostica: ${doc.title}`,
                                        bold: false,
                                        size: 32,
                                        color: "383838",
                                        font: "Arial"
                                    })
                                ]
                            }),
                            new Paragraph({
                                alignment: AlignmentType.CENTER,
                                spacing: { before: 500, after: 10 },
                                children: [
                                    new ImageRun({
                                        data: DiagnosticaimageData,
                                        transformation: {
                                            width: desiredWidth,
                                            height: calculatedHeight
                                        }
                                    })
                                ]
                            }),
                            new Paragraph({
                                alignment: AlignmentType.CENTER,
                                spacing: { after: 500 },
                                children: [
                                    new TextRun({
                                        text: `Pannello della diagnostica ${doc.title}`,
                                        bold: false,
                                        size: 20,
                                        color: "383838",
                                        font: "Arial"
                                    })
                                ]
                            }),
                        );
                    }


                    if ('data_diagnostica' in doc) {
                        paragraphs.push(
                            createTableDiagnostica(diagnosticaRows),
                        );
                    }

                }





                if (ParagrafiPermessi.includes("Hal")) {
                    if ('data_hal' in doc) {
                        paragraphs.push(

                            new Paragraph({
                                alignment: AlignmentType.CENTER,
                                spacing: { before: 200, after: 200 },
                                children: [
                                    new TextRun({
                                        text: `Hal Config: ${doc.nome_hal}`,
                                        bold: false,
                                        size: 32,
                                        color: "383838",
                                        font: "Arial"
                                    })
                                ]
                            }),
                            new Paragraph({
                                alignment: AlignmentType.LEFT,
                                spacing: { after: 200 },
                                children: [
                                    new TextRun({
                                        text: `La tabella seguente presenta il contenuto del file “HAL Config ${doc.nome_hal}.ini”, con i parametri di configurazione delle periferiche identificati dalle sezioni e dai loro nomi.`,
                                        bold: false,
                                        size: 20,
                                        color: "383838",
                                        font: "Arial"
                                    })
                                ]
                            }),
                            createTable(halRows),
                            new Paragraph({ spacing: { after: 400 } })
                        );

                    }

                }
                /*<----------------------------------------HAL AUX--------------------------------------------------->*/

                if (ParagrafiPermessi.includes("Hal Aux")) {
                    if ('hal_config_aux1_data' in doc) {
                        paragraphs.push(

                            new Paragraph({
                                alignment: AlignmentType.CENTER,
                                spacing: { before: 200, after: 200 },
                                children: [
                                    new TextRun({
                                        text: `Hal Config: ${doc.hal_config_aux1_title}`,
                                        bold: false,
                                        size: 32,
                                        color: "383838",
                                        font: "Arial"
                                    })
                                ]
                            }),
                            new Paragraph({
                                alignment: AlignmentType.LEFT,
                                spacing: { after: 200 },
                                children: [
                                    new TextRun({
                                        text: `La tabella seguente presenta il contenuto del file “HAL Config ${doc.hal_config_aux1_title}.ini”, con i parametri di configurazione delle periferiche identificati dalle sezioni e dai loro nomi.`,
                                        bold: false,
                                        size: 20,
                                        color: "383838",
                                        font: "Arial"
                                    })
                                ]
                            }),
                            createTable(Aux1Rows),
                            new Paragraph({ spacing: { after: 400 } })
                        );
                    }



                    if ('hal_config_aux2_data' in doc) {
                        paragraphs.push(

                            new Paragraph({
                                alignment: AlignmentType.CENTER,
                                spacing: { before: 200, after: 200 },
                                children: [
                                    new TextRun({
                                        text: `Hal Config: ${doc.hal_config_aux2_title}`,
                                        bold: false,
                                        size: 32,
                                        color: "383838",
                                        font: "Arial"
                                    })
                                ]
                            }),
                            new Paragraph({
                                alignment: AlignmentType.LEFT,
                                spacing: { after: 200 },
                                children: [
                                    new TextRun({
                                        text: `La tabella seguente presenta il contenuto del file “HAL Config ${doc.hal_config_aux2_title}.ini”, con i parametri di configurazione delle periferiche identificati dalle sezioni e dai loro nomi.`,
                                        bold: false,
                                        size: 20,
                                        color: "383838",
                                        font: "Arial"
                                    })
                                ]
                            }),
                            createTable(Aux2Rows),
                            new Paragraph({ spacing: { after: 400 } })
                        );
                    }


                    if ('hal_config_aux3_data' in doc) {
                        paragraphs.push(

                            new Paragraph({
                                alignment: AlignmentType.CENTER,
                                spacing: { before: 200, after: 200 },
                                children: [
                                    new TextRun({
                                        text: `Hal Config: ${doc.hal_config_aux3_title}`,
                                        bold: false,
                                        size: 32,
                                        color: "383838",
                                        font: "Arial"
                                    })
                                ]
                            }),
                            new Paragraph({
                                alignment: AlignmentType.LEFT,
                                spacing: { after: 200 },
                                children: [
                                    new TextRun({
                                        text: `La tabella seguente presenta il contenuto del file “HAL Config ${doc.hal_config_aux3_title}.ini”, con i parametri di configurazione delle periferiche identificati dalle sezioni e dai loro nomi.`,
                                        bold: false,
                                        size: 20,
                                        color: "383838",
                                        font: "Arial"
                                    })
                                ]
                            }),
                            createTable(Aux3Rows),
                            new Paragraph({ spacing: { after: 400 } })
                        );
                    }


                }


            }

            return paragraphs;
        });








        const elements = await Promise.all(elementsPromises).then(results => results.flat());

        const doc = new Document({
            sections: [{
                children: elements,
            }],
        });

        Packer.toBlob(doc).then(blob => {
            saveAs(blob, "Documentazione Hal.docx");
        });

        setConferma(false);

        if (updateVersione(currentVersion)) {
            setLastVersion(currentVersion);
        } else {
            window.alert("Connessione al db non riuscita");
        }
    };


    const handleSelezionatutti = (isHal) => {
        if (isHal) {
            if (JobPermessi.length === jobArrays.length) {
                setJobPermessi([]);
            } else {
                const allValues = jobArrays.map(data => data.title);
                setJobPermessi(allValues);
            }
        }
        else {
            if (ParagrafiPermessi.length === 6) {
                setParagrafiPermessi([]);
            } else {
                const allValues = ["Hal", "Job", "Esempi Job", "Diagnostica", "Hal Aux"]
                setParagrafiPermessi(allValues);
            }
        }
    }


    const handleOnChangeCheckbox = (value, isHal) => {
        if (isHal) {
            setJobPermessi((prevHalPermessi) => {
                if (prevHalPermessi.includes(value)) {
                    return prevHalPermessi.filter(item => item !== value);
                } else {
                    return [...prevHalPermessi, value];
                }
            });
        }
        else {
            setParagrafiPermessi((prevHalPermessi) => {
                if (prevHalPermessi.includes(value)) {
                    return prevHalPermessi.filter(item => item !== value);
                } else {
                    return [...prevHalPermessi, value];
                }
            });
        }
    }

    const handleDebug = () => {
        console.log('Hal:', JobPermessi);
        console.log('Paragrafi', ParagrafiPermessi);
    }

    return (
        <>

            {visible && <div className='creacommessadiv'>
                <div className='creadiv'>
                    <div className='divAperto halconfigaperto'>
                        <span onClick={AvviaCreazione} className='chiudiDiv'>
                            &times;
                        </span>

                        <div className='hal-selectioner-upper-buttons'>
                            <button onClick={() => handleSelezionatutti(true)}>Seleziona Tutti</button>
                        </div>

                        <div className='width100 perflexnoncentrato'>
                            <div className='hal-selectioner-upper'>
                                {jobArrays.map((data, index) => (
                                    <div className='hal-selectioner'>
                                        <div>
                                            {data.title}
                                        </div>
                                        <label class="custom-checkbox">
                                            <input checked={JobPermessi.includes(data.title)} onChange={() => handleOnChangeCheckbox(data.title, true)} name="dummy" type="checkbox"></input>
                                            <span class="checkmark"></span>
                                        </label>

                                    </div>
                                ))}
                            </div>

                            <div className='hal-selectioner-upper-upper'>
                                <div className='hal-selectioner-upper-buttons newmarginhal'>
                                    <button onClick={() => handleSelezionatutti(false)}>Seleziona Tutti</button>
                                </div>
                                <div className='hal-selectioner-upper width100 newmarginhal'>
                                    <div className='hal-selectioner'>
                                        <div>
                                            Hal
                                        </div>
                                        <label class="custom-checkbox">
                                            <input checked={ParagrafiPermessi.includes("Hal")} onChange={() => handleOnChangeCheckbox("Hal", false)} name="dummy" type="checkbox"></input>
                                            <span class="checkmark"></span>
                                        </label>
                                    </div>
                                    <div className='hal-selectioner'>
                                        <div>
                                            Job
                                        </div>
                                        <label class="custom-checkbox">
                                            <input checked={ParagrafiPermessi.includes("Job")} onChange={() => handleOnChangeCheckbox("Job", false)} name="dummy" type="checkbox"></input>
                                            <span class="checkmark"></span>
                                        </label>
                                    </div>
                                    <div className='hal-selectioner'>
                                        <div>
                                            Esempi Job
                                        </div>
                                        <label class="custom-checkbox">
                                            <input checked={ParagrafiPermessi.includes("Esempi Job")} onChange={() => handleOnChangeCheckbox("Esempi Job", false)} name="dummy" type="checkbox"></input>
                                            <span class="checkmark"></span>
                                        </label>
                                    </div>
                                    <div className='hal-selectioner'>
                                        <div>
                                            Diagnostica
                                        </div>
                                        <label class="custom-checkbox">
                                            <input checked={ParagrafiPermessi.includes("Diagnostica")} onChange={() => handleOnChangeCheckbox("Diagnostica", false)} name="dummy" type="checkbox"></input>
                                            <span class="checkmark"></span>
                                        </label>
                                    </div>
                                    <div className='hal-selectioner'>
                                        <div>
                                            Hal Aux
                                        </div>
                                        <label class="custom-checkbox">
                                            <input checked={ParagrafiPermessi.includes("Hal Aux")} onChange={() => handleOnChangeCheckbox("Hal Aux", false)} name="dummy" type="checkbox"></input>
                                            <span class="checkmark"></span>
                                        </label>
                                    </div>

                                </div>
                                <div>
                                    <div className='hal-config-titolo-div'>
                                        <label>Titolo</label>
                                        <input
                                            type="text"
                                            value={currentTitle}
                                            onChange={handleInputChangeTitle}
                                            placeholder="Inserisci il titolo"

                                        />
                                    </div>
                                    <div className='hal-config-versione-div'>
                                        <label>Versione</label>
                                        <input
                                            type="text"
                                            value={currentVersion}
                                            onChange={handleInputChangeVersion}
                                            placeholder="Inserisci nuova versione"
                                        />
                                    </div>
                                    <div className='hal-config-disclaimer-div'>
                                        <label>Disclaimer</label>
                                        <textarea
                                            className='input-g'
                                            type="text"
                                            value={currentDisclaimer}
                                            onChange={handleInputChangeDisclaimer}
                                            placeholder="Inserisci il disclaimer"
                                        />
                                    </div>
                                    <label>Ultima versione: {lastVersion}</label>
                                    <button onClick={AvviaCreazioneInner} className='crea-documentazione-inner-button'>Crea Documentazione</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            }

            <div className='width100 perflex'>
            {/*<button className= { `${className} margin-right50`} onClick={AvviaCreazioneJob}>Crea Job</button>*/}
            <button className={className} onClick={AvviaCreazione}>Crea Documentazione</button>
            </div>
            {conferma &&
                <ConfermaAction
                    title="Conferma"
                    text="Vuoi creare una documentazione?"
                    onConferma={createDocument}
                    onAnnulla={() => setConferma(false)}
                >
                </ConfermaAction>
            }
        </>
    );
};

export default DocumentationCreator;

