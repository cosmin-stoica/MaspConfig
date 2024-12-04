const fs = require("fs");
const path = require("path");
const ini = require("ini");

const fileHandler = {
  getFiles(folderPath) {
    try {
      return fs.readdirSync(folderPath); // Legge i file nella cartella
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
                    const separatorKey = `__separator_${Object.keys(result[currentSection]).length}`;
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
      // Funzione per costruire la stringa .ini manualmente con commenti
      const buildIniStringWithComments = (data) => {
        let iniString = "";

        Object.entries(data).forEach(([section, params]) => {
          iniString += `[${section}]\n`;

          Object.entries(params).forEach(([key, value]) => {
            if (key.startsWith("__comment_")) {
              // Tratta i commenti come linee prefissate con ";"
              iniString += `; ${value}\n`;
            } else {
              // Tratta i normali parametri
              iniString += `${key}=${value}\n`;
            }
          });

          iniString += "\n"; // Linea vuota tra le sezioni
        });

        return iniString.trim(); // Rimuove spazi o righe extra alla fine
      };

      // Genera la stringa .ini con supporto ai commenti
      const iniString = buildIniStringWithComments(data);

      // Scrive il file sul disco
      fs.writeFileSync(filePath, iniString, "utf-8");
      return true; // Salvataggio riuscito
    } catch (error) {
      console.error("Errore durante il salvataggio del file .ini:", error);
      return false; // Salvataggio fallito
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
};

module.exports = fileHandler;
