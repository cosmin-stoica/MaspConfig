const { app, BrowserWindow, ipcMain, protocol, dialog } = require("electron");
const path = require("path");
const fileHandler = require("./filehandler"); // Importa il gestore dei file

let mainWindow;

const isDev = process.env.NODE_ENV === "development";
const filePath = (path.join(__dirname, "../build/index.html"));
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
    //mainWindow.loadFile(path.join(app.getAppPath(), "build", "index.html"));
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), "build", "index.html"));
  }
  
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

ipcMain.handle("parse-ini-file-with-separators", async (event, filePath, data) => {
  return fileHandler.parseIniFileWithSeparators(filePath);
});

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
