# Masp Config e Masp Report - Versione 1

## Descrizione del Progetto
Masp Config e Masp Report sono applicazioni progettate per fornire rispettivamente una configurazione locale e flessibile del Masp e per visualizzare, ricercare e fare analisi sui report. Entrambe le applicazioni condividono una base tecnologica solida, combinando React ed Electron per offrire soluzioni desktop potenti e reattive con un'architettura client-server.

---

## Struttura del Progetto

### **React (Cartelle `src` e `public`)**

La parte frontend di entrambe le applicazioni è sviluppata con React. La cartella `src` contiene:

- **Componenti React:** Implementano le funzionalità principali dell'interfaccia utente.
- **Logica di gestione dello stato:** Centralizzata per garantire un flusso dati coerente tra i componenti.

La cartella `public` contiene risorse statiche accessibili direttamente, come immagini e file di configurazione utilizzati durante il caricamento dell'app. Contiene inoltre tutti i file CSS.

#### Contenuto della cartella `src`

- **File principali per Config:**
  - Dentro `MAIN/Config`:
    - `App.js` e `App.css`: Gestiscono la logica e lo stile principali dell'applicazione Config.
    - `PathContext.js` e `TCPContext.js`: Gestiscono contesti React per condividere dati e logica tra componenti.
    - `routes.jsx`: Gestisce il routing dell'app Config.

- **File principali per Report:**
  - Dentro `MAIN/Report`:
    - `ReportApp.js`: Gestisce la logica principale dell'applicazione Report.
    - `routes.jsx`: Gestisce il routing dell'app Report.

- **Cartelle condivise tra Config e Report:**
  - `UI/Config` e `UI/Report`:
    - **`pages`**: Contiene le pagine principali delle rispettive applicazioni.
    - **`parsers`**: Logica per l'analisi o la trasformazione dei dati.
  - `UI/elements`: Configurazioni e costanti globali condivise tra i componenti.
  - `UI/globals`: Componenti UI riutilizzabili per costruire l'interfaccia.
  - `MAIN`: Contiene i file principali delle applicazioni Config e Report.

---

### Electron

Electron è il framework utilizzato per creare applicazioni desktop multipiattaforma. Integra React con una logica backend, creando un'app desktop potente e reattiva.

#### **File principali**

1. **`main.js`**
   - Gestisce il processo principale di Electron.
   - Crea la finestra dell'applicazione e carica la versione di produzione o di sviluppo dell'app React.
   - Gestisce la comunicazione tra il backend e il frontend tramite il modulo `ipcMain`.
   - Gestisce anche il server TCP per la comunicazione di rete.

2. **`preload.js`**
   - Espone delle API sicure al frontend utilizzando `contextBridge` e `ipcRenderer`.
   - Le API esposte permettono al frontend di interagire con il filesystem, inviare messaggi TCP, e altre operazioni senza compromettere la sicurezza.

3. **`filehandler.js`**
   - Gestisce la logica per interagire con il filesystem, come leggere e scrivere file, fare il backup di cartelle, e lavorare con file di configurazione come `.ini` e `.json`.

#### **Funzionalità principali**

- **Creazione della finestra principale**: La finestra viene configurata con dimensioni e altre proprietà. Viene caricato il file `index.html` che contiene la versione React dell'app.
- **Comunicazione tra il main process e il renderer**: I dati vengono scambiati in modo sicuro tra backend e frontend tramite `ipcMain` e `ipcRenderer`.
- **Gestione delle configurazioni**: `filehandler.js` legge e scrive file di configurazione, oltre a gestire backup e operazioni su file `.ini` e `.json`.
- **Server TCP**: Un server TCP è gestito nel processo principale per consentire la comunicazione di rete.

#### **Avvio dell'app**

Quando l'app viene avviata:

   - È necessario passare il path di lavoro come argomento: `--path=<path>`.
   - Se l'app viene avviata come Masp Report, è necessario passare anche `--app=report` come argomento.
1. **Modalità sviluppo**: Se l'app è in modalità sviluppo (`NODE_ENV` è `development`), la finestra carica la versione locale di React tramite `http://localhost:3000`.
2. **Modalità produzione**: Se l'app è in modalità produzione, viene caricata la versione compilata dell'app React dalla cartella `build`.

---

## Configurazione

La configurazione del progetto è gestita tramite Node.js e definita nel file `package.json`.

Nuove configurazioni:
- `npm run dev:config`: Avvia l'app Config in modalità sviluppo.
- `npm run dev:report`: Avvia l'app Report in modalità sviluppo.

Ogni configurazione include un'icona, un titolo e un file JS di entrata specifici, mentre `index.html` rimane condiviso.

---

## Installazione

1. Clona il repository:
   ```bash
   git clone https://github.com/cosmin-stoica/MaspConfig
   ```
2. Installa le dipendenze:
   ```bash
   npm install
   ```
3. Avvia l'applicazione in modalità sviluppo:
   ```bash
   npm run dev:config
   # oppure
   npm run dev:report
   ```

---

## Building

1. Build di React:
   ```bash
   npm run build
   ```
2. Build di Electron con eseguibile:
   ```bash
   npm run dist
   ```
3. Troverai l'applicativo dentro `./dist`.

---

## Tecnologie Utilizzate

- **React** per il frontend.
- **Electron** per l'integrazione desktop e backend.
- **Node.js** per la configurazione server-client.

