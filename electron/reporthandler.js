const fs = require("fs");
const { promises: fsPromises } = fs;
const path = require("path");
const Papa = require("papaparse");

const reportHandler = {
  async readIndexFile(filePath) {
    try {
      if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, "utf8");
        return JSON.parse(data);
      } else {
        console.error(`Il file ${filePath} non esiste.`);
        return [];
      }
    } catch (error) {
      console.error("Errore durante la lettura del file:", error);
      throw error;
    }
  },
  async indexFilesAndFolders(directory, pathToSave) {
    let index = [];
    const items = await fs.promises.readdir(directory, { withFileTypes: true });

    await Promise.all(
      items.map(async (item) => {
        const fullPath = path.join(directory, item.name);
        const stats = await fsPromises.stat(fullPath);

        let operatore = null;
        let codice = null;
        let progressivo = null;
        let barcodes = [];

        if (
          !item.isDirectory() &&
          (path.extname(fullPath) === ".csv" ||
            path.extname(fullPath) === ".txt")
        ) {
          const csvParsed = this.parseCsvFile(fullPath); // Definisci o importa questa funzione
          if (csvParsed && csvParsed.length > 0) {
            const primaryColumn = Object.keys(csvParsed[0])[0];
            operatore = csvParsed.find(
              (row) => row[primaryColumn] === "Operatore"
            )?.[""];
            codice = csvParsed.find((row) => row[primaryColumn] === "Codice")?.[
              ""
            ];
            progressivo = csvParsed.find(
              (row) => row[primaryColumn] === "Progressivo"
            )?.[""];

            let isInBarcodeSection = false;

            csvParsed.forEach((row) => {
              const primaryColumn = Object.keys(row)[0];
              const sectionHeader = row[primaryColumn]?.trim();

              if (sectionHeader === "Barcode componenti") {
                isInBarcodeSection = true;
                return;
              }

              if (
                isInBarcodeSection &&
                [
                  "Risultati avvitature",
                  "Risultati rivettatura",
                  "Risultati collaudo",
                  "Controlli",
                ].includes(sectionHeader)
              ) {
                isInBarcodeSection = false;
                return;
              }

              if (isInBarcodeSection && row[primaryColumn]?.match(/^\d+$/)) {
                const barcode = row[""];
                if (barcode) {
                  barcodes.push(barcode.trim());
                }
              }
            });
          }
        }

        const entry = {
          name: item.name,
          fullPath: fullPath,
          isFolder: item.isDirectory(),
          creationDate: stats.birthtime,
          csvDataOperatore: operatore,
          csvDataCodice: codice,
          csvDataProgressivo: progressivo,
          barcodes: barcodes,
        };

        index.push(entry);

        if (item.isDirectory()) {
          const subIndex = await this.indexFilesAndFolders(
            fullPath,
            pathToSave
          );
          index = index.concat(subIndex);
        }
      })
    );

    const saveDir = path.dirname(pathToSave);
    try {
      await fsPromises.mkdir(saveDir, { recursive: true });
      await fsPromises.writeFile(pathToSave, JSON.stringify(index, null, 2));
    } catch (err) {
      console.error("Errore durante il salvataggio:", err);
    }

    return index;
  },
  searchInIndex(fileIndexPath, searchTerm) {
    const index = JSON.parse(fs.readFileSync(fileIndexPath, "utf8"));
    return index.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  },
  getAllFilesAndFolders(folderPath) {
    const fs = require("fs");
    const path = require("path");

    try {
      const entries = fs.readdirSync(folderPath, { withFileTypes: true });
      const filteredEntries = entries.filter((entry) => {
        return (
          entry.isDirectory() ||
          [".txt", ".csv"].includes(path.extname(entry.name).toLowerCase())
        );
      });
      return filteredEntries.map((entry) => {
        const fullPath = path.join(folderPath, entry.name);
        const stats = fs.statSync(fullPath);

        let operatore = null;
        let codice = null;
        let progressivo = null;

        if (!entry.isDirectory()) {
          const csvParsed = this.parseCsvFile(fullPath);
          const primaryColumn = Object.keys(csvParsed[0])[0];
          operatore = csvParsed.find(
            (item) => item[primaryColumn] === "Operatore"
          )?.[""];
          codice = csvParsed.find((item) => item[primaryColumn] === "Codice")?.[
            ""
          ];
          progressivo = csvParsed.find(
            (item) => item[primaryColumn] === "Progressivo"
          )?.[""];
        }

        return {
          name: entry.name,
          fullPath: fullPath,
          isFolder: entry.isDirectory(),
          creationDate: stats.birthtime,
          csvDataOperatore: operatore,
          csvDataCodice: codice,
          csvDataProgressivo: progressivo,
        };
      });
    } catch (error) {
      console.error("Errore durante la lettura della directory:", error);
      return [];
    }
  },
  getAllFilesAndFoldersWithSubFolders(folderPath) {
    const fs = require("fs");
    const path = require("path");

    const getAllEntries = (folder) => {
      try {
        const entries = fs.readdirSync(folder, { withFileTypes: true });
        return entries.flatMap((entry) => {
          const fullPath = path.join(folder, entry.name);
          const stats = fs.statSync(fullPath);
          let operatore = null;
          let codice = null;
          let progressivo = null;

          if (!entry.isDirectory()) {
            const csvParsed = this.parseCsvFile(fullPath);
            const primaryColumn = Object.keys(csvParsed[0])[0];
            operatore = csvParsed.find(
              (item) => item[primaryColumn] === "Operatore"
            )?.[""];
            codice = csvParsed.find(
              (item) => item[primaryColumn] === "Codice"
            )?.[""];
            progressivo = csvParsed.find(
              (item) => item[primaryColumn] === "Progressivo"
            )?.[""];
          }

          const currentEntry = {
            name: entry.name,
            fullPath: fullPath,
            isFolder: entry.isDirectory(),
            creationDate: stats.birthtime,
            csvDataOperatore: operatore,
            csvDataCodice: codice,
            csvDataProgressivo: progressivo,
          };

          if (entry.isDirectory()) {
            return [currentEntry, ...getAllEntries(fullPath)];
          } else {
            return currentEntry;
          }
        });
      } catch (error) {
        console.error("Errore durante la lettura della directory:", error);
        return [];
      }
    };

    return getAllEntries(folderPath);
  },
  async parseCsvFilesInFolder(folderPath) {
    const allEntries = this.getAllFilesAndFolders(folderPath);
    const csvFiles = allEntries.filter(
      (entry) =>
        !entry.isFolder &&
        (entry.name.endsWith(".csv") || entry.name.endsWith(".txt"))
    );
    const results = {};

    for (const file of csvFiles) {
      const fileContent = fs.readFileSync(file.fullPath, "utf-8");
      const parsed = Papa.parse(fileContent, {
        header: true,
        skipEmptyLines: true,
      });
      results[file.name] = parsed.data;
    }

    return results;
  },
  parseCsvFile(filePath) {
    try {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const parsed = Papa.parse(fileContent, {
        header: true,
        skipEmptyLines: true,
      });
      return parsed.data;
    } catch (error) {
      console.error("Errore durante il parsing del file CSV:", error);
      return null;
    }
  },
  async readImageAsBase64(imagePath) {
    try {
      if (fs.existsSync(imagePath)) {
        const imageBuffer = fs.readFileSync(imagePath);
        const imageBase64 = `data:image/${imagePath
          .split(".")
          .pop()};base64,${imageBuffer.toString("base64")}`;
        return imageBase64;
      } else {
        console.error(`Il file immagine ${imagePath} non esiste.`);
        return null;
      }
    } catch (error) {
      console.error("Errore durante la lettura dell'immagine:", error);
      throw error;
    }
  },
  async saveImageFromBase64(base64String, outputPath) {
    try {
      const base64Data = base64String.replace(/^data:image\/\w+;base64,/, "");
      const buffer = Buffer.from(base64Data, "base64");

      const saveDir = path.dirname(outputPath);
      if (!fs.existsSync(saveDir)) {
        fs.mkdirSync(saveDir, { recursive: true });
      }

      fs.writeFileSync(outputPath, buffer);
      console.log(`Immagine salvata con successo in: ${outputPath}`);
      return true;
    } catch (error) {
      console.error("Errore durante il salvataggio dell'immagine:", error);
      throw error;
    }
  },
  async saveColorToFile(color, filePath) {
    try {
      const saveDir = path.dirname(filePath);
      if (!fs.existsSync(saveDir)) {
        fs.mkdirSync(saveDir, { recursive: true });
      }

      fs.writeFileSync(filePath, color, "utf8");
      console.log(`Colore salvato con successo in: ${filePath}`);
      return true;
    } catch (error) {
      console.error("Errore durante il salvataggio del colore:", error);
      throw error;
    }
  },

  async readColorFromFile(filePath) {
    try {
      if (!fs.existsSync(filePath)) {
        throw new Error(`Il file ${filePath} non esiste.`);
      }
      const color = fs.readFileSync(filePath, "utf8");
      console.log(`Colore letto dal file: ${color}`);
      return color;
    } catch (error) {
      console.error("Errore durante la lettura del colore:", error);
      throw error;
    }
  },
};

module.exports = reportHandler;
