const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const fileHandler = require("./filehandler"); // Importa il gestore dei file
const { fork } = require("child_process");
const TCPClient = require('../server/client.js');

let mainWindow;
const tcpClient = new TCPClient();

const isDev = process.env.NODE_ENV === "development";
const filePath = path.join(__dirname, "../build/index.html");
console.log("Path to index.html:", filePath);

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 950,
    height: 700,
    icon: path.join(__dirname, "assets", "logo.ico"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      enableRemoteModule: false,
      allowRunningInsecureContent: true,
      webSecurity: false,
    },
  });

  mainWindow.setMinimumSize(950, 700);
  mainWindow.maximize();

  if (isDev) {
    mainWindow.loadURL("http://localhost:3000");
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), "build", "index.html"));
  }

  const serverProcess = fork(path.join(__dirname, "../server/server.js"));
  serverProcess.on('message', (data) => {
    console.log('Dati ricevuti dal server TCP:', data);
    if (mainWindow) {
      mainWindow.webContents.send('tcp-data', data);
    }
  });

  serverProcess.on('exit', (code) => {
    console.log(`Server TCP terminato con codice: ${code}`);
  });

  mainWindow.setMenuBarVisibility(false);
}

app.on("ready", () => {
  createWindow();
});

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

ipcMain.handle('send-tcp-message', async (event, { host, port, message }) => {
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