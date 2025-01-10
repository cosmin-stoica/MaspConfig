const { app, session, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const fileHandler = require("./filehandler"); // Importa il gestore dei file
const reportHandler = require("./reporthandler"); // Importa il gestore dei file
const { fork, exec } = require("child_process");
const TCPClient = require("../server/client.js");
const os = require("os")

let mainWindow;
let isReportGlobal = false;
const tcpClient = new TCPClient();

const isDev = process.env.NODE_ENV === "development";
const filePath = path.join(__dirname, "../build/index.html");
console.log("Path to index.html:", filePath);
let cachedPathValue = null;

function createWindow(appTitle, isReport) {
  isReportGlobal = isReport; 

  mainWindow = new BrowserWindow({
    width: 950,
    height: 700,
    icon: !isReport ? path.join(__dirname, "assets", "logo.ico") : path.join(__dirname, "assets", "logo_report.ico"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      enableRemoteModule: false,
      allowRunningInsecureContent: true,
      webSecurity: false,
    },
    title: appTitle,
  });

  mainWindow.setMinimumSize(950, 700);
  mainWindow.maximize();

  if (isDev) {
    mainWindow.loadURL("http://localhost:3000");
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), "build", "index.html"));
  }

  const serverProcess = fork(path.join(__dirname, "../server/server.js"));
  serverProcess.on("message", (data) => {
    console.log("Dati ricevuti dal server TCP:", data);
    if (mainWindow) {
      mainWindow.webContents.send("tcp-data", data);
    }
  });

  serverProcess.on("exit", (code) => {
    console.log(`Server TCP terminato con codice: ${code}`);
  });

  mainWindow.setMenuBarVisibility(false);
}

app.on("ready", () => {
  const args = process.argv.slice(1);
  console.log("Argomenti passati:", args);

  const pathArg = args.find((arg) => arg.startsWith("--path="));
  const pathValue = pathArg ? pathArg.split("=")[1] : null;
  cachedPathValue = pathValue;

  const isReportArg = args.find((arg) => arg.startsWith("--app="));
  const isReport = isReportArg === "--app=report";

  createWindow(isReport ? "Masp Report" : "Masp Config", isReport);

  mainWindow.webContents.once("did-finish-load", () => {
    mainWindow.webContents.send("isReport", isReport);
    console.log("Invio isReport a React:", isReport);

    if (pathValue) {
      console.log("Invio valore di path a React:", pathValue);
      mainWindow.webContents.send("path", cachedPathValue);
    } else {
      console.log("Nessun path inviato come argomento.");
    }
  });
});

ipcMain.handle("get-path-value", () => cachedPathValue);

//const reactDevToolsPath = path.join(
//  os.homedir(),
//  '/Appdata/Local/Google/Chrome/User Data/Profile 2/Extensions/fmkadmapgofadopljbjfkapdkoienihi/6.0.1_0'
//)
//console.log('reactDevTools PATH',reactDevToolsPath)
//app.whenReady().then(async () => {
//  await session.defaultSession.loadExtension(reactDevToolsPath)
//})

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Collega il fileHandler alle richieste IPC
ipcMain.handle("get-files", async (event, folderPath) => {
  return fileHandler.getFiles(folderPath);
});

ipcMain.handle("read-file", async (event, filePath) => {
  return fileHandler.readFile(filePath);
});

ipcMain.handle("parse-ini-file", async (event, filePath) => {
  return fileHandler.parseIniFile(filePath);
});

ipcMain.handle("get-files-number", async (event, folderPath) => {
  return fileHandler.getFilesNumber(folderPath);
});

ipcMain.handle("save-ini-file", async (event, filePath, data) => {
  return fileHandler.saveIniFile(filePath, data);
});

ipcMain.handle(
  "parse-ini-file-with-separators",
  async (event, filePath, data) => {
    return fileHandler.parseIniFileWithSeparators(filePath);
  }
);

ipcMain.handle("read-json-file", (_, filePath) => {
  return fileHandler.readJsonFile(filePath);
});

ipcMain.handle("select-path", async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ["openDirectory"],
  });
  return result.filePaths[0];
});

ipcMain.handle("delete-file", (_, filePath) => {
  return fileHandler.deleteFile(filePath);
});

ipcMain.handle("backup-folder", (event, sourceFolder, backupFolder) => {
  return fileHandler.backupFolder(sourceFolder, backupFolder);
});

ipcMain.handle("read-job", (_, filePath) => {
  return fileHandler.readJob(filePath);
});

ipcMain.handle("read-jobs-from-folder", (_, folderPath) => {
  return fileHandler.readJobsFromFolder(folderPath);
});

ipcMain.handle("parse-csv-files-in-folder", async (_, folderPath) => {
  try {
    return await reportHandler.parseCsvFilesInFolder(folderPath);
  } catch (error) {
    console.error("Errore durante il parsing dei file CSV:", error);
    throw error;
  }
});

ipcMain.handle("parse-csv-file", (_, filePath) => {
  return reportHandler.parseCsvFile(filePath);
});

ipcMain.handle("send-tcp-message", async (event, { host, port, message }) => {
  return new Promise((resolve, reject) => {
    tcpClient.sendMessage(host, port, message, (err, response) => {
      if (err) {
        reject(err.message);
      } else {
        resolve(response);
      }
    });
  });
});

ipcMain.handle("open-keyboard", () => {
  exec("osk.exe", (err) => {
    if (err) {
      console.error("Errore nell'aprire la tastiera:", err);
    }
  });
});

ipcMain.handle("get-all-files-and-folders", (_, folderPath) => {
  return reportHandler.getAllFilesAndFolders(folderPath);
});

ipcMain.handle("get-all-files-and-folders-with-subfolders", (_, folderPath) => {
  return reportHandler.getAllFilesAndFoldersWithSubFolders(folderPath);
});

ipcMain.handle('index-files', async (event, directory, pathToSave) => {
  return reportHandler.indexFilesAndFolders(directory, pathToSave);
});

ipcMain.handle('search-files', async (event, fileIndexPath, searchTerm) => {
  return reportHandler.searchInIndex(fileIndexPath, searchTerm);
});

ipcMain.handle('read-index-file', async (event, filePath) => {
  return reportHandler.readIndexFile(filePath);
});

ipcMain.handle('read-image', async (_, imagePath) => {
  return reportHandler.readImageAsBase64(imagePath);
});

ipcMain.handle('save-image', async (_, base64String, outputPath) => {
  return reportHandler.saveImageFromBase64(base64String, outputPath);
});
