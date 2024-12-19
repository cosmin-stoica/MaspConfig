# Masp Config - Versione 1

## Descrizione del Progetto
Masp Config è un'applicazione progettata per fornire una configurazione locale e flessibile del Masp tramite un'interfaccia user-friendly. Combina tecnologie come React ed Electron per offrire una soluzione desktop potente e reattiva con un'architettura client-server per la gestione delle configurazioni.

---

## Struttura del Progetto

### **React (Cartelle `src` e `public`)**

La parte frontend è sviluppata con React, una libreria JavaScript per la creazione di interfacce utente moderne e dinamiche. La cartella `src` contiene:

- **Componenti React:** Implementano le funzionalità principali dell'interfaccia utente.
- **Logica di gestione dello stato:** Centralizzata per garantire un flusso dati coerente tra i componenti.

La cartella `public` contiene risorse statiche accessibili direttamente, come immagini e file di configurazione utilizzati durante il caricamento dell'app.
Contiene inoltre tutti i file css.

#### Contenuto della cartella `src`

- **File principali:**
  - `App.js` e `App.css`: Gestiscono la logica e lo stile principali dell'applicazione.
  - `index.js` e `index.css`: Punto di ingresso dell'app React, responsabile del rendering principale.
  - `Routes.jsx`: Gestisce il routing dell'applicazione.

- **Cartelle:**
  - `elements`: Configurazioni e costanti globali condivise tra i componenti
  - `globals`: Componenti UI riutilizzabili per costruire l'interfaccia.
  - `pages`: Contiene le pagine principali dell'applicazione.
  - `parsers`: Logica per l'analisi o la trasformazione dei dati.

- **File di contesto:**
  - `PathContext.js` e `TCPContext.js`: Gestiscono contesti React per condividere dati e logica tra componenti.

---

### Electron

Electron è un framework che consente di costruire applicazioni desktop multipiattaforma utilizzando tecnologie web come JavaScript, HTML e CSS. In **Masp Config**, Electron è utilizzato per integrare React con una logica backend, creando così un'app desktop potente e reattiva. La struttura di Electron separa chiaramente la parte frontend (React) dalla parte backend (Node.js), permettendo di gestire la logica server-client attraverso un'architettura ben definita.

Il progetto utilizza la configurazione di Electron per gestire la finestra principale, la comunicazione tra il processo principale (main process) e il renderer (processo di rendering, che esegue l'app React), e l'integrazione con il filesystem.

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

- **Creazione della finestra principale**: La finestra viene creata e configurata con dimensioni e altre proprietà. Viene caricato il file `index.html` che contiene la versione React dell'app.
  
- **Comunicazione tra il main process e il renderer**: Utilizzando `ipcMain` nel processo principale e `ipcRenderer` nel processo di rendering, i dati vengono scambiati in modo sicuro tra le due parti dell'app. Ad esempio, per leggere file o inviare comandi TCP, il frontend comunica con il backend tramite canali IPC.

- **Gestione delle configurazioni**: Il file `filehandler.js` si occupa di leggere e scrivere file di configurazione, oltre a gestire backup e operazioni di lettura di file `.ini` e `.json`.

- **Server TCP**: Un server TCP è gestito nel processo principale per consentire la comunicazione di rete. Utilizzando la libreria `TCPClient`, il server può inviare e ricevere messaggi tramite TCP, e questi dati sono inviati al frontend tramite `ipcMain`.

#### **Avvio dell'app**

Quando l'app viene avviata:

1. **Modalità sviluppo**: Se l'app è in modalità sviluppo (`NODE_ENV` è `development`), la finestra carica direttamente la versione locale di React tramite `http://localhost:3000`.
2. **Modalità produzione**: Se l'app è in modalità produzione, viene caricata la versione compilata dell'app React dalla cartella `build`.

Il codice del server viene eseguito in un processo separato utilizzando `fork`, il che consente di gestire in modo indipendente la logica di rete.

---

## Configurazione

La configurazione del progetto è tutta in mano a node.js dentro il file package.json

## Installazione

1. Clona il repository:
   ```bash
   git clone <repository-url>
   ```
2. Installa le dipendenze:
   ```bash
   npm install
   ```
3. Avvia l'applicazione in modalità sviluppo:
   ```bash
   npm run dev
   ```
   
---

## Building

1. Build di react
   ```bash
   npm run build
   ```
2. Build di electron con eseguibile
   ```bash
   npm run dist
   ```
3. Troverai l'applicativo dentro ./dist

## Tecnologie Utilizzate

- **React** per il frontend.
- **Electron** per l'integrazione desktop e backend.
- **Node.js** per la configurazione server-client.