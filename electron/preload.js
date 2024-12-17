const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  getFiles: (folderPath) => ipcRenderer.invoke('get-files', folderPath),
  readFile: (filePath) => ipcRenderer.invoke('read-file', filePath),
  parseIniFile: (filePath) => ipcRenderer.invoke('parse-ini-file', filePath), 
  getFilesNumber: (folderPath) => ipcRenderer.invoke('get-files-number', folderPath), // Nuova funzione
  saveIniFile: (filePath, data) => ipcRenderer.invoke('save-ini-file', filePath, data), // Nuova funzione
  parseIniFileWithSeparators: (filePath) => ipcRenderer.invoke('parse-ini-file-with-separators', filePath), // Nuova funzione
  readJsonFile: (filePath) => ipcRenderer.invoke("read-json-file", filePath),
  selectPath: () => ipcRenderer.invoke("select-path"), // Apre il file explorer
  deleteFile: (filePath) => ipcRenderer.invoke("delete-file", filePath), // Apre il file explorer
  backupFolder: (sourceFolder, backupFolder) => ipcRenderer.invoke("backup-folder", sourceFolder, backupFolder),
  readJob : (filePath)  => ipcRenderer.invoke("read-job", filePath),
  readJobsFromFolder : (folderPath)  => ipcRenderer.invoke("read-jobs-from-folder", folderPath),
  onTcpData: (callback) => ipcRenderer.on('tcp-data', (event, data) => callback(data)),
  sendTcpMessage: (host, port, message) =>
    ipcRenderer.invoke('send-tcp-message', { host, port, message }),
  openKeyboard: () =>
    ipcRenderer.invoke('open-keyboard'),
});