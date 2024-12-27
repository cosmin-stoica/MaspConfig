const fs = require("fs");
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
    const items = fs.readdirSync(directory, { withFileTypes: true });

    for (const item of items) {
      const fullPath = path.join(directory, item.name);
      const stats = fs.statSync(fullPath);

      let operatore = null;
      let codice = null;
      let progressivo = null;

      if (
        !item.isDirectory() &&
        (path.extname(fullPath) === ".csv" || path.extname(fullPath) === ".txt")
      ) {
        const csvParsed = this.parseCsvFile(fullPath);
        if (csvParsed && csvParsed.length > 0) {
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
      }

      index.push({
        name: item.name,
        fullPath: fullPath,
        isFolder: item.isDirectory(),
        creationDate: stats.birthtime,
        csvDataOperatore: operatore,
        csvDataCodice: codice,
        csvDataProgressivo: progressivo,
      });

      if (item.isDirectory()) {
        index = index.concat(
          await this.indexFilesAndFolders(fullPath, pathToSave)
        );
      }
    }

    fs.writeFileSync(pathToSave, JSON.stringify(index, null, 2));
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
};

module.exports = reportHandler;
