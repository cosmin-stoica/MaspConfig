const fs = require("fs");
const path = require("path");
const ini = require("ini");
const Papa = require("papaparse");

const fileHandler = {
  getFiles(folderPath) {
    try {
      return fs.readdirSync(folderPath);
    } catch (error) {
      console.error("Errore durante la lettura della directory:", error);
      return [];
    }
  },
  readFile(filePath) {
    try {
      return fs.readFileSync(filePath, "utf-8"); // Legge il contenuto del file
    } catch (error) {
      console.error("Errore durante la lettura del file:", error);
      return "Errore nella lettura del file";
    }
  },
  parseIniFile(filePath) {
    try {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      return ini.parse(fileContent); // Parsa il contenuto del file .ini
    } catch (error) {
      console.error("Errore durante il parsing del file .ini:", error);
      return null; // Torna null in caso di errore
    }
  },
  parseIniFileWithSeparators(filePath) {
    try {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const lines = fileContent.split("\n");
      const result = {};
      let currentSection = null;

      lines.forEach((line) => {
        line = line.trim();

        // Ignora le righe vuote
        if (line === "") return;

        // Identifica le sezioni
        if (line.startsWith("[") && line.endsWith("]")) {
          currentSection = line.slice(1, -1);
          result[currentSection] = {};
          return;
        }

        // Gestisci i separatori (linee che iniziano con `;`)
        if (line.startsWith(";")) {
          if (currentSection) {
            // Aggiungi il separatore con una chiave univoca
            const separatorKey = `__separator_${
              Object.keys(result[currentSection]).length
            }`;
            result[currentSection][separatorKey] = line;
          }
          return;
        }

        // Gestisci le chiavi-valori
        const [key, ...valueParts] = line.split("=");
        if (currentSection && key) {
          const value = valueParts.join("=").trim(); // Ricompone il valore in caso di "=" nel contenuto
          result[currentSection][key.trim()] = value;
        }
      });

      return result;
    } catch (error) {
      console.error("Errore durante il parsing del file .ini:", error);
      return null; // Torna null in caso di errore
    }
  },
  getFilesNumber(folderPath) {
    let fileCount = 0;

    function countFiles(directory) {
      try {
        const entries = fs.readdirSync(directory, { withFileTypes: true }); // Legge directory e file
        for (const entry of entries) {
          const entryPath = path.join(directory, entry.name);
          if (entry.isDirectory()) {
            countFiles(entryPath); // Ricorsione per sottocartelle
          } else if (entry.isFile()) {
            fileCount++; // Conta solo i file
          }
        }
      } catch (error) {
        console.error(
          `Errore durante la lettura della directory ${directory}:`,
          error
        );
      }
    }

    countFiles(folderPath);
    return fileCount;
  },
  saveIniFile(filePath, data) {
    try {
      let iniString = "";

      Object.entries(data).forEach(([section, params]) => {
        let needToParse = false;
        console.log(data[section]);
        Object.entries(params).forEach(([key, value]) => {
          if (!needToParse) {
            if (!key.startsWith("separator") && !key.startsWith("comment")) {
              if (value) needToParse = true;
            }
          }
        });

        console.log("Need To parse:", needToParse);

        if (needToParse) {
          iniString += `;===========================================================\n`;
          iniString += `[${section}]\n;===========================================================\n`;

          Object.entries(params).forEach(([key, value]) => {
            if (key.startsWith("separator")) {
              iniString += `;${value}\n`;
            } else if (key.startsWith("comment")) {
              iniString += `;${value}\n`;
            } else {
              iniString += `${key} = ${value}\n`;
            }
          });
        }

        iniString += "\n"; // Aggiunge una riga vuota tra le sezioni
      });

      fs.writeFileSync(filePath, iniString.trim(), "utf-8");
      console.log("File .ini salvato con successo!");
    } catch (error) {
      console.error("Errore durante il salvataggio del file .ini:", error);
    }
  },
  readJsonFile(filePath) {
    try {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(fileContent); // Parsa il contenuto JSON
    } catch (error) {
      console.error("Errore durante la lettura del file JSON:", error);
      return null;
    }
  },
  deleteFile(filePath) {
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath); // Cancella il file
        console.log(`File eliminato con successo: ${filePath}`);
        return true; // Eliminazione riuscita
      } else {
        console.error(`Il file non esiste: ${filePath}`);
        return false; // File non trovato
      }
    } catch (error) {
      console.error("Errore durante l'eliminazione del file:", error);
      return false; // Errore durante l'eliminazione
    }
  },
  backupFolder(sourceFolder, backupFolder) {
    const copyFolderSync = (source, destination) => {
      try {
        if (!fs.existsSync(destination)) {
          fs.mkdirSync(destination, { recursive: true });
        }
        const entries = fs.readdirSync(source, { withFileTypes: true });
        for (const entry of entries) {
          const sourcePath = path.join(source, entry.name);
          const destinationPath = path.join(destination, entry.name);
          if (entry.isDirectory()) {
            copyFolderSync(sourcePath, destinationPath);
          } else if (entry.isFile()) {
            fs.copyFileSync(sourcePath, destinationPath);
          }
        }
      } catch (error) {
        console.error("Errore durante il backup della cartella:", error);
        throw error;
      }
    };

    try {
      // Crea una cartella con il timestamp
      const timestamp = new Date().toISOString().replace(/:/g, "-"); // Rimuove i `:` per evitare problemi nei nomi dei file
      const timestampedFolder = path.join(backupFolder, timestamp);
      copyFolderSync(sourceFolder, timestampedFolder);

      console.log(
        `Backup completato con successo da ${sourceFolder} a ${backupFolder} e ${timestampedFolder}`
      );
      return true;
    } catch (error) {
      console.error("Errore durante il backup:", error);
      return false;
    }
  },
  readJob(filePath) {
    try {
      const stats = fs.statSync(filePath); // Ottiene le informazioni sul file
      const fileContent = this.parseIniFile(filePath); // Parsifica il file .ini

      if (!fileContent || !fileContent["SEZIONE GENERALE"]) {
        throw new Error(
          "Sezione GENERALE mancante o contenuto del file non valido."
        );
      }

      const numeroJob =
        fileContent["SEZIONE GENERALE"]["Numero job"] ||
        fileContent["SEZIONE GENERALE"]["Numero Job"] ||
        0; // Ottiene il numero di job

      return {
        nomeFile: path.basename(filePath), // Nome del file
        dataCreazione: stats.birthtime, // Data di creazione
        dataUltimaModifica: stats.mtime, // Data ultima modifica
        contenuto: fileContent, // Contenuto parsificato
        numeroJob: parseInt(numeroJob, 10) || 0, // Numero di job come intero
      };
    } catch (error) {
      console.error("Errore durante la lettura del job:", error);
      return null; // Torna null in caso di errore
    }
  },
  readJobsFromFolder(folderPath) {
    try {
      const files = fs.readdirSync(folderPath);
      const jobFiles = files.filter((file) => file.startsWith("Job Config"));

      return jobFiles
        .map((file) => {
          const filePath = path.join(folderPath, file);
          return this.readJob(filePath);
        })
        .filter((job) => job !== null);
    } catch (error) {
      console.error(
        "Errore durante la lettura dei file nella directory:",
        error
      );
      return [];
    }
  },
  getAllFilesAndFolders(folderPath) {
    const fs = require("fs");
    const path = require("path");

    try {
      const entries = fs.readdirSync(folderPath, { withFileTypes: true });
      return entries.map((entry) => ({
        name: entry.name, // Nome dell'elemento
        fullPath: path.join(folderPath, entry.name), // Percorso completo
        isFolder: entry.isDirectory(), // Indica se è una cartella
      }));
    } catch (error) {
      console.error("Errore durante la lettura della directory:", error);
      return [];
    }
  },
  async parseCsvFilesInFolder(folderPath) {
    const allEntries = this.getAllFilesAndFolders(folderPath);
    const csvFiles = allEntries.filter(
      (entry) => !entry.isFolder && (entry.name.endsWith(".csv") || entry.name.endsWith(".txt"))
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
      const parsed = Papa.parse(fileContent, { header: true, skipEmptyLines: true });
      return parsed.data; 
    } catch (error) {
      console.error("Errore durante il parsing del file CSV:", error);
      return null; 
    }
  },
};

module.exports = fileHandler;
