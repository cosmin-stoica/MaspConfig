const { autoUpdater } = require("electron-updater");
const { dialog } = require("electron");
const dns = require("dns");

class Updater {
  constructor(mainWindow) {
    this.mainWindow = mainWindow;

    // Verifica la connessione prima di iniziare
    this.checkInternetConnection().then((isConnected) => {
      if (isConnected) 
        this.initUpdater();
      /*} else {
        this.showDialog(
          "Connessione assente",
          "Non è possibile verificare gli aggiornamenti senza una connessione a Internet."
        );
      }*/
    });
  }

  async checkInternetConnection() {
    return new Promise((resolve) => {
      dns.lookup("example.com", (err) => {
        resolve(!err); // Se non c'è errore, c'è connessione
      });
    });
  }

  initUpdater() {
    // Avvia la verifica degli aggiornamenti
    autoUpdater.checkForUpdatesAndNotify();

    // Quando un aggiornamento è disponibile
    autoUpdater.on("update-available", () => {
      this.showDialog(
        "Aggiornamento disponibile",
        "Una nuova versione è disponibile. Il download è in corso."
      );
    });

    // Quando l'app è già aggiornata
    autoUpdater.on("update-not-available", () => {
      this.showDialog("Nessun aggiornamento", "Stai già utilizzando l'ultima versione.");
    });

    // Quando l'aggiornamento è scaricato
    autoUpdater.on("update-downloaded", () => {
      const result = dialog.showMessageBoxSync({
        type: "question",
        buttons: ["Riavvia", "Annulla"],
        defaultId: 0,
        title: "Aggiornamento scaricato",
        message:
          "Una nuova versione è stata scaricata. Vuoi riavviare l'applicazione per applicare l'aggiornamento?",
      });

      if (result === 0) {
        autoUpdater.quitAndInstall(); // Riavvia e installa l'aggiornamento
      }
    });

    // Gestione errori
    autoUpdater.on("error", (error) => {
      this.showDialog("Errore durante l'aggiornamento", `Errore: ${error.message}`);
    });
  }

  // Mostra un dialogo informativo
  showDialog(title, message) {
    if (this.mainWindow) {
      this.mainWindow.webContents.send("update-message", { title, message });
    } else {
      dialog.showMessageBoxSync({
        type: "info",
        title,
        message,
      });
    }
  }
}

module.exports = Updater;
