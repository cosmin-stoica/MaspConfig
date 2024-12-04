window.Doc = [
  {
    title: "Avvitatura",
    icona: "images/jobs/avvitatura.png",
    categoria: "Automazione e Assemblaggio",
    data_job: [],
    text: `Questo job viene utilizzato per effettuare dei serraggi con avvitatori gestiti da centraline
    di avvitatura elettroniche Cleco con controllo coppia-angolo o Kolver e Jolly con solo la
    verifica dell'angolo.
    L'interfacciamento con il PC è realizzato tramite rete LAN e protocollo Open Protocol
    per le Cleco o attraverso ingressi e uscite delle schede IO24ADC per le centraline
    Cleco, Kolver e Jolly.
    I parametri del protocollo Open Protocol sono personalizzabili dal file di configurazione
    "Hardware Config.ini" mentre gli ingressi e le uscite di interfacciamento si possono
    associare a qualsiasi ingresso o uscita delle schede IO24ADC con l'aiuto dei parametri
    presenti nel file di configurazione “HAL Config Tightening Unit.ini”.
    Gli avvitatori hanno una connessione a filo o WiFi con le centraline ed è possibile fissarli
    su un braccio con encoder, permettendo di effettuare i serraggi con controllo della
    posizione. La lettura degli angoli dai quattro encoder si realizza con l'espansione
    ENCODER della scheda IO24ADC. I parametri del braccio e degli encoder si trovano
    nel file di configurazione "HAL Config Arm With Encoder.ini".
    Le operazioni di avvitatura necessitano l'utilizzo di bussole da piazzare in punta
    all’avvitatore per poter effettuare il serraggio di viti e dadi di vario tipo. L’applicativo
    MASP App prevede anche la gestione di un portabussole, il quale può gestire fino a
    bussole ed è dotato di spie luminose e sensori per indicare all’utente la posizione da
    dove prelevare. I parametri per la configurazione del portabussole si trovano nel file
    “HAL Config Tightening Toolbox.ini”.
    I messaggi e le immagini della condotta guidata, come anche i valori di riferimento per
    le avvitature, si possono personalizzare tramite i parametri all’interno dei file di
    configurazione del job. Oltre a questo file, esiste un altro nella cartella Config,
    denominato “Programmi di avvitatura.ini”, che include parametri specifici che vengono
    richiamati per poter eseguire i serraggi.`,
    img_src: "/assets/images/jobs/avvitaturamasp.png",
    /*programmi: window.ProgrammiAvvitaturaAux,
    programmi_text: `Il file “Programmi di avvitatura.ini” è un file di configurazione trovato dentro la cartella
    “Config” dell’applicativo. Questo file è associato al job Avvitatura ed esso gestisce i
    programmi di avvitatura da richiamare alla centralina insieme ad altri parametri del
    portabussole e del braccio con encoder. Il file presenta due tipi di sezione. La prima è
    “SEZIONE GENERALE” e include un solo parametro con il numero di programmi di
    avvitatura mentre la seconda, “PROGRAMMA”, contiene i parametri specifici, indicati in
    seguito.`,*/
    esempio_job1_title:
      "Esempio di implementazione job Avvitatura con centralina Cleco Wireless",
    esempio_job1_text: `
    ;============================================
    [JOB 1]
    ;============================================
    Tipo job = avvitatura
    Nome job = Avvitatura con Cleco Wireless
    Salta job = 0
    ;----------------------------------------------------------------------------
    Cartella immagini = C:\MASP\App Montaggio\Images\Avvitatura
    ;----------------------------------------------------------------------------
    Programma avvitatura = 1
    Numero immagini = 2
    Immagine vite 1 = vite1.png
    Immagine vite 2 = vite2.png
    ;----------------------------------------------------------------------------`,
    esempio_job2_title:
      "Esempio di implementazione job Avvitatura con centralina Cleco a cavo e braccio con encoder",
    esempio_job2_text: `
    ;============================================
    [JOB 1]
    ;============================================
    Tipo job = avvitatura
    Nome job = Avvitatura con Cleco a cavo e braccio con encoder
    Salta job = 0
    ;----------------------------------------------------------------------------
    Cartella immagini = C:\MASP\App Montaggio\Images\Avvitatura
    ;----------------------------------------------------------------------------
    Programma avvitatura = 2
    Numero immagini = 3
    Immagine vite 1 = vite3.png
    Immagine vite 2 = vite4.png
    ;----------------------------------------------------------------------------`,
    esempio_job3_title:
      "Esempio di implementazione job Avvitatura con centralina Joll",
    esempio_job3_text: `
    ;============================================
    [JOB 1]
    ;============================================
    Tipo job = avvitatura
    Nome job = Avvitatura con Jolly
    Salta job = 0
    ;----------------------------------------------------------------------------
    Cartella immagini = C:\MASP\App Montaggio\Images\Avvitatura
    ;----------------------------------------------------------------------------
    Programma avvitatura = 3
    Numero immagini = 2
    Immagine vite 1 = vite5.png
    Immagine vite 2 = vite6.png
    ;----------------------------------------------------------------------------`,
    esempio_job4_title: "Esempio di file “Programmi di avvitatura.ini”",
    esempio_job4_text: `
    ;============================================
    [SEZIONE GENERALE]
    ;============================================
    Numero programmi = 3

    ;============================================
    [PROGRAMMA 1]
    ;============================================
    Nome programma = PRG1: 10.00Nm
    Modello avvitatore = Cleco LW
    Numero viti = 2
    Gruppo produzione = 1
    Coppia chiusura= 10.00
    Bussola = 1
    Numero ripetizioni = 5
    Controllo posizione = 0
    Toleranza X = 50
    Toleranza Y = 50
    Toleranza Z = 50

    ;============================================
    [PROGRAMMA 2]
    ;============================================
    Nome programma = PRG2: 20.00Nm
    Modello avvitatore = Cleco
    Numero viti = 2
    Gruppo produzione = 2
    Coppia chiusura= 20.00
    Bussola = 2
    Numero ripetizioni = 5
    Controllo posizione = 1
    Toleranza X = 50
    Toleranza Y = 50
    Toleranza Z = 50
    X1=1259
    Y1=1729
    Z1=-210
    X2=1173
    Y2=1869
    Z2=-414

    ;============================================
    [PROGRAMMA 3]
    ;============================================
    Nome programma = PRG4: 2.50Nm
    Modello avvitatore = Jolly
    Numero viti = 2
    Gruppo produzione = 1
    Coppia chiusura= 2.50
    Bussola = 3
    Numero ripetizioni = 5
    Controllo posizione = 0`,
    diagnostica_img_src: "/assets/images/jobs/diagnostica/avvitatura.png",
    data_diagnostica: [],
    hal_config_aux1_title: "Programmi di Avvitatura",
    hal_config_aux1_desc: "",
    hal_config_aux1_data: [],
    hal_config_aux2_title: "Tightening Toolbox",
    hal_config_aux2_desc: "",
    hal_config_aux2_data: [],
    hal_config_aux3_title: "Tightening Unit",
    hal_config_aux3_desc: "",
    hal_config_aux3_data: [],
  },
  {
    title: "Avvitatura a chiave",
    icona: "images/jobs/avvitatura.png",
    categoria: "Automazione e Assemblaggio",
    data_job: [],
    data_hal: [],
    text: ``,
    img_src: "/assets/images/jobs/avvitaturachiavemasp.png",
    esempio_job1_title: "Esempio di implementazione job Avvitatura",
    esempio_job1_text: `
    ;============================================
    [JOB 1]
    ;============================================
   
    ;----------------------------------------------------------------------------`,
    diagnostica_img_src: "/assets/images/jobs/diagnostica/avvitaturachiave.png",
    data_diagnostica: [],
  },
  {
    title: "Seeger",
    icona: "images/jobs/seeger.png",
    categoria: "Automazione e Assemblaggio",
    data_job: [],
    data_hal: [],
    text: ``,
    img_src: "/assets/images/jobs/seegermasp.png",
    esempio_job1_title: "Esempio di implementazione job Seeger",
    esempio_job1_text: `
    ;============================================
    [JOB 1]
    ;============================================
   
    ;----------------------------------------------------------------------------`,
    diagnostica_img_src: "/assets/images/jobs/diagnostica/seeger.png",
    data_diagnostica: [],
  },
  {
    title: "Barcode",
    icona: "images/jobs/barcode.png",
    categoria: "Automazione e Assemblaggio",
    data_job: [],
    text: `Il job barcode viene utilizzato per poter leggere, tramite un lettore barcode, dei codici a
    barre in vari formati standard o bidimensionali di tipo PDF417, Datamatrix o QR code.
    L'interfacciamento del lettore al PC di gestione è effettuato attraverso un bus seriale
    RS232 con parametri di configurazioni della comunicazione presenti nel file “Hardware
    Config.ini”.
    Il job permette una condotta guidata per l’operatore, al quale vengono fatti vedere a
    schermo i barcode da scannerizzare e un'immagine illustrativa. A fine ciclo i componenti
    scannerizzati possono essere salvati su etichetta, file report e database.
    Come specificato precedentemente, la configurazione del job è personalizzabile tramite
    file di testo con estensione .ini. Alcuni parametri possono contenere la dicitura “(1, 2,
    (n))” che segue il nome per indicare di quale gruppo di parametri si sta parlando. Per
    esempio se si desidera specificare un barcode, i parametri “Descrizione”, “Barcode” ed
    “Immagine” devono essere seguiti dallo stesso numero per poterli legare l’uno all’altro.
    Per indicare un altro barcode, si dovrà utilizzare un numero diverso. Questi numeri
    devono iniziare da 1 e continuare in ordine crescente senza saltare numeri intermedi.`,
    img_src: "/assets/images/jobs/barcodemasp.png",
    esempio_job1_title:
      "Lettura due barcode e salvataggio del primo su ID stoccaggio",
    esempio_job1_text: `
    ;============================================
    [JOB 1]
    ;============================================
    Tipo job = barcode
    Nome job = Verifica barcode componenti
    Salta job = 0
    ;----------------------------------------------------------------------------
    Cartella immagini = C:\MASP\App Montaggio\Images\Components
    ----------------------------------------------------------------------------
    Numero barcode = 2
    ;----------------------------------------------------------------------------
    Descrizione 1 = Descrizione 1001
    Barcode 1 = 1001
    Immagine 1 = 1001.png
    ID stoccaggio 1 = 1
    ;----------------------------------------------------------------------------
    Descrizione 2 = Descrizione 1002
    Barcode 2 = 1002
    Immagine 2 = 1002.png
    ID stoccaggio 2 = 0
    ;----------------------------------------------------------------------------`,
    esempio_job2_title:
      "Lettura due barcode di cui il primo con la configurazione da ID recupero",
    esempio_job2_text: `
    ;============================================
    [JOB 1]
    ;============================================
    Tipo job = barcode
    Nome job = Verifica barcode componenti
    Salta job = 0
    ;----------------------------------------------------------------------------
    Cartella immagini = C:\MASP\App Montaggio\Images\Components
    ;----------------------------------------------------------------------------
    Numero barcode = 2
    ;----------------------------------------------------------------------------
    ID recupero 1 = 1
    ;----------------------------------------------------------------------------
    Descrizione 2 = Descrizione 1002
    Barcode 2 = 1002
    Immagine 2 = 1002.png
    ID stoccaggio 2 = 1
    ;----------------------------------------------------------------------------`,
    esempio_job3_title: "Lettura un barcode variabile e verifica lunghezza",
    esempio_job3_text: `
    ;============================================
    [JOB 1]
    ;============================================
    Tipo job = barcode
    Nome job = Verifica barcode componenti
    Salta job = 0
    ;--------------------------------------------------------------------------
    Cartella immagini = C:\MASP\App Montaggio\Images\Components
    ;--------------------------------------------------------------------------
    Numero barcode = 1
    ;----------------------------------------------------------------------------
    Descrizione 1 = Qualsiasi barcode con lunghezza 4..6 caratteri
    Barcode 1 = ****
    Lunghezza min 1 = 4
    Lunghezza max 1 = 6
    ID stoccaggio 1 = 0
    Immagine 1 = 4stars.png
    ;----------------------------------------------------------------------------`,
    esempio_job4_title: "Lettura un barcode variabile e verifica lunghezza",
    esempio_job4_text: `
    ;============================================
    [JOB 1]
    ;============================================
    Tipo job = barcode
    Nome job = Verifica barcode componenti
    Salta job = 0
    ;--------------------------------------------------------------------------
    Cartella immagini = C:\MASP\App Montaggio\Images\Components
    ;--------------------------------------------------------------------------
    Numero barcode = 1
    ;--------------------------------------------------------------------------
    Descrizione 1 = Qualsiasi barcode con formato 123**
    Barcode 1 = 123**
    ID stoccaggio 1 = 0
    Immagine 1 = 123_2starts.png
    ;----------------------------------------------------------------------------`,
  },
  {
    title: "Pick To Light",
    icona: "images/jobs/pick.png",
    categoria: "Automazione e Assemblaggio",
    data_hal: [],
    nome_hal: "Pick-To-Light",
    data_job: [],
    text: `Il job Pick To Light permette il prelievo o il deposito manuale di componenti tramite un
    procedura di condotta guidata dell’operatore che prevede l’accensione di spie luminose
    nella corretta sequenza, le quali si trovano in corrispondenza delle scatole contenenti il
    materiale, verificando la corretta esecuzione dell’operazione tramite le letture di
    fotocellule opportunamente posizionate che rilevano i movimenti.
    Il sistema dispone inoltre di una spia di allarme che si accende nel momento in cui una
    delle fotocellule intercetta un passaggio al di fuori del momento programmato. Per
    continuare la lavorazione e far spegnere la spia, l’operatore dovrà premere l’apposito
    pulsante di ripristino.
    Il job è altamente personalizzabile, essendo possibile associare le spie luminose, le
    fotocellule, la spia di allarme e il pulsante di ripristino in corrispondenza a qualsiasi
    uscita o ingresso delle schede IO24ADC con l'aiuto dei parametri presenti nel file di
    configurazione HAL“HAL Pick To Light.ini”.
    Immagini, messaggi per la condotta guidata ed i parametri di funzionamento sono tutti
    impostabili da file di configurazione del job.`,
    img_src: "/assets/images/jobs/pickmasp.png",
    esempio_job1_title: "Esempio di implementazione job Pick-To-Light",
    esempio_job1_text: `
    ;============================================
    [JOB 1]
    ;============================================
    Tipo job = pick-to-light
    Nome job = Prelievo componente
    Salta job = 0
    ;-------------------------------------------------------------------------------
    Cartella immagini = C:\MASP\App Montaggio\Images\Pick-To-Light
    Immagine = cassetto1.jpg
    ;-------------------------------------------------------------------------------
    Messaggio = Prelevare componente da cassetto 1
    ID contenitore = 1
    ;----------------------------------------------------------------------------`,
    diagnostica_img_src: "/assets/images/jobs/diagnostica/pick.png",
    data_diagnostica: [],
  },
  {
    title: "Rivettatura",
    icona: "images/jobs/rivettatura.png",
    categoria: "Automazione e Assemblaggio",
    data_hal: [],
    nome_hal: "Rivet",
    data_job: [],
    text: `Questo job viene utilizzato per effettuare delle rivettature, gestendo fino a tre rivettatrici,
    e verificare l'esito dell'operazione, procedura che può essere effettuata con il controllo
    della forma d’onda della pressione dell'olio nell'impianto o con la lettura dell'esito
    direttamente centralina della rivettatrice, in caso essa sia presente.
    Nel primo caso, la forma d’onda è letta con uno dei convertitori analogico-digitali della
    scheda IO24ADC e confrontata con dei template di riferimento precedentemente
    acquisiti e classificati.
    Nel secondo caso, la verifica della rivettatura è effettuata dalla sua unità di controllo
    che, con delle uscire collegate a ingressi della scheda IO24ADC, comunica l'esito al
    software MASP App. L'abilitazione delle rivettatrici senza centraline si ottiene
    controllando il flusso dell'aria con un elettrovalvola collegata ad un uscita della scheda
    IO24ADC. Per quelle dotate di unità di controllo, il PC invia dei comandi Modbus
    attraverso interfaccia RS485, con i parametri configurabili dal file “Hardware Config.ini”.
    I parametri della verifica delle forme d’onda, gli ingressi e le uscite d’interfacciamento
    verso le rivettatrici, sono personalizzabili dal file "HAL Config Rivet.ini" mentre gli
    ingressi e le uscite di interfacciamento si possono associare a qualsiasi ingresso o
    uscita delle schede IO24ADC con l'aiuto dei parametri presenti nel file di
    configurazione.
    È possibile fissare ogni rivettatrice su un braccio con encoder per effettuare le
    rivettature solo in posizioni desiderate, abilitando o no il flusso d'aria con un
    elettrovalvola. La lettura degli angoli dai quattro encoder si realizza con l'espansione
    ENCODER della scheda IO24ADC. I parametri del braccio e degli encoder si trovano
    nel file di configurazione "HAL Config Arm With Encoder.ini".
    I messaggi, le immagini della condotta guidata, i parametri inerenti al salvataggio e
    caricamento delle forme d’onda, come anche i valori di riferimento per le rivettature, si
    possono personalizzare tramite i parametri all’interno dei file di configurazione del job.`,
    img_src: "/assets/images/jobs/rivettaturamasp.png",
    esempio_job1_title: "Job Rivettatura senza braccio",
    esempio_job1_text: `
    ;============================================
    [JOB 1]
    ;============================================
    Tipo job = rivettatura
    Nome job = Rivettatura senza braccio (RIV)
    Salta job = 0
    Numero ripetizioni = 4
    ;----------------------------------------------------------------------------
    Cartella immagini = C:\MASP\App Montaggio\Images\Rivettatura
    ;----------------------------------------------------------------------------
    Rivettatrice = 1
    Soglia rivettatura = 75
    Numero rivetti = 2
    Immagine rivetto 1 = rivetto1.png
    Immagine rivetto 2 = rivetto2.png
    ;----------------------------------------------------------------------------
    Verifica numero campioni = 0
    Numero campioni minimo = 10
    Numero campioni massimo = 501
    ;----------------------------------------------------------------------------
    Cartella template = C:\MASP\App Montaggio\Config\Hardware Config\Rivet Waveforms\Rivet RIV
    Header nome file template = Wf
    Percentuale di confidenza minima = 85
    ;----------------------------------------------------------------------------`,
    esempio_job2_title: "Job Rivettatura senza con braccio con encoder",
    esempio_job2_text: `
    ;============================================
    [JOB 1]
    ;============================================
    Tipo job = rivettatura
    Nome job = Rivettatura con braccio (RIV-BR)
    Salta job = 0
    Numero ripetizioni = 4
    ----------------------------------------------------------------------------
    Cartella immagini = C:\MASP\App Montaggio\Images\Rivettatura
    ----------------------------------------------------------------------------
    Rivettatrice = 2
    Soglia rivettatura = 75
    Numero rivetti = 2
    Immagine rivetto 1 = rivetto1.png
    Immagine rivetto 2 = rivetto2.png
    ----------------------------------------------------------------------------
    Verifica numero campioni = 0
    Numero campioni minimo = 10
    Numero campioni massimo = 501
    ----------------------------------------------------------------------------
    Cartella template = C:\MASP\App Montaggio\Config\Hardware Config\Rivet Waveforms\Rivet RIV-BR
    Header nome file template = Wf
    Percentuale di confidenza minima = 85
    ----------------------------------------------------------------------------
    Salva waveform = 0
    Index waveform =1
    Cartella waveform = C:\MASP\App Montaggio\Config\Hardware Config\Rivet Waveforms\Rivet RIV-BR
    Nome file waveform = Wf
    ----------------------------------------------------------------------------
    Braccio = 2
    Abilita posizione = 1
    Nome coordinate = Coordinate RIV-BR
    Tolleranza X = 50
    Tolleranza Y = 50
    Tolleranza Z = 50
    ;----------------------------------------------------------------------------`,
    esempio_job3_title: "Job Rivettatura senza con braccio con encoder",
    esempio_job3_text: `
    ;============================================
    [JOB 1]
    ;============================================
    Tipo job = rivettatura
    Nome job = Rivettatura senza braccio (RIV)
    Salta job = 0
    Numero ripetizioni = 4
    ;----------------------------------------------------------------------------
    Cartella immagini = C:\MASP\App Montaggio\Images\Rivettatura
    ;----------------------------------------------------------------------------
    Rivettatrice = 1
    Soglia rivettatura = 75
    Numero rivetti = 2
    Immagine rivetto 1 = rivetto1.png
    Immagine rivetto 2 = rivetto2.png
    ;----------------------------------------------------------------------------
    Verifica numero campioni = 0
    Numero campioni minimo = 10
    Numero campioni massimo = 501
    ;----------------------------------------------------------------------------
    Cartella template = C:\MASP\App Montaggio\Config\Hardware Config\Rivet Waveforms\Rivet RIV
    Header nome file template = Wf
    Percentuale di confidenza minima = 85
    ;----------------------------------------------------------------------------`,
    diagnostica_img_src: "/assets/images/jobs/diagnostica/rivettatura.png",
    data_diagnostica: [],
  },
  {
    title: "Robot",
    icona: "images/jobs/robot.png",
    categoria: "Automazione e Assemblaggio",
    data_hal: [],
    nome_hal: "Robot",
    data_job: [],
    text: `Il job robot viene utilizzato per effettuare delle operazioni un robot collaborativo,
    inviando delle stringhe di comando tramite protocollo TCP-IP, richiamando i programmi
    preconfigurati a bordo del robot.
    La comunicazione avviene su rete LAN, dove il software MASP App ed il robot agiscono
    entrambi sia come client che come server, aprendo ognuno un socket verso l'altra
    periferica. I parametri per impostare indirizzi IP e porte si trovano nella sezione "Robot"
    del file "Hardware Config.ini".
    Le modalità dell'operazione sono due:
    - Tramite job, dove le immagini ed i messaggi visualizzati durante l'operazione e la
    stringa da inviare al robot sono prese da job.
    - Tramite pannello di controllo specifico che si apre quando l’operatore preme il
    tasto "Robot".
    Nella modalità di funzionamento con job, le immagini, i messaggi per la condotta
    guidata ed i parametri di funzionamento sono tutti impostabili da file di configurazione
    del job mentre in quella con pannello di controllo, le immagini, i nomi dei pulsanti e le
    stringhe da inviare al robot sono lette dal file HAL.`,
    img_src: "/assets/images/jobs/robotmasp.png",
    esempio_job1_title: "Job robot per operazione di incollaggio",
    esempio_job1_text: `
    ;============================================
    [JOB 1]
    ;============================================
    Tipo job = robot
    Nome job = Incollaggio con robot
    Salta job = 0
    Numero ripetizioni = 5
    ;----------------------------------------------------------------------------
    Cartella immagini = C:\MASP\App Montaggio\Images\Robot
    Immagine = Incollaggio con robot.png
    Stringa di commando = load /programs/incollaggio.ur
    ;----------------------------------------------------------------------------`,
    diagnostica_img_src: "/assets/images/jobs/diagnostica/robot.png",
    data_diagnostica: [],
  },

  {
    title: "TPS",
    icona: "images/jobs/tps.png",
    categoria: "Collaudo Componenti Automotive",
    data_hal: [],
    nome_hal: "TPS",
    data_job: [],
    text: `Il job TPS serve a verificare il corretto funzionamento di un sensore ad effetto Hall che
      controlla il posizionamento del sedile lungo la corsa delle sue guide, verificando il
      corretto passaggio di stato da OFF a ON e successivamente ad OFF.
      La lettura del cambio di stato del TPS viene fatta attraverso un convertitore
      analogico-digitale della scheda IO24ADC e, dopo aver attivato il circuito di misura
      correnti basse che permette di misurare da 0 fino a 100 mA, viene controllato che le
      correnti rilevate durante gli stati ON ed OFF stiano nei rispettivi intervalli.
      I parametri di configurazione e taratura relativi si trovano dentro al file di configurazione
      “HAL Config TPS”.
      Immagini, messaggi per la condotta guidata ed i parametri di funzionamento sono tutti
      impostabili da file di configurazione del job`,
    img_src: "/assets/images/jobs/tpsmasp.png",
    esempio_job1_title: "Job TPS per verifica sensore",
    esempio_job1_text: `
      ;============================================
      [JOB 1]
      ;============================================
      Tipo job = TPS
      Nome job = Verifica TPS
      Salta job = 0
      Numero ripetizioni = 3
      ;----------------------------------------------------------------------------
      Cartella immagini = C:\MASP\App Collaudo\Images\TPS
      ----------------------------------------------------------------------------
      Firma TPS = TPS_Main
      ;----------------------------------------------------------------------------
      Immagine TPS Off = TPS Off.jpg
      Immagine TPS On = TPS On.jpg
      ;----------------------------------------------------------------------------`,
    esempio_job2_title: "Job TPS per verifica luce LED",
    esempio_job2_text: `
      ;============================================
      [JOB 1]
      ;============================================
      Tipo job = TPS
      Nome job = Verifica TPS
      Salta job = 0
      Numero ripetizioni = 3
      ;----------------------------------------------------------------------------
      Cartella immagini = C:\MASP\App Collaudo\Images\TPS
      ;----------------------------------------------------------------------------
      Firma TPS = TPS_Main
      ;----------------------------------------------------------------------------
      Immagine TPS Off = Luce LED Porta Off.jpg
      Immagine TPS On = Luce LED Porta On.jpg
      ;----------------------------------------------------------------------------`,
    diagnostica_img_src: "/assets/images/jobs/diagnostica/tps.png",
    data_diagnostica: [],
  },
  {
    title: "Termoforo",
    icona: "images/jobs/heater.png",
    categoria: "Collaudo Componenti Automotive",
    data_hal: [],
    nome_hal: "Heater",
    data_job: [],
    text: `Il job termoforo viene utilizzato per verificare il corretto funzionamento dell’impianto
      termoriscaldatore, verificando che la corrente assorbita o la resistenza del riscaldatore,
      assieme alla possibilità di misurare la resistenza del sensore di temperatura.
      La corrente viene misurata tramite una scheda proprietaria CORA, la quale,
      collegandosi ad uno dei convertitori analogico-digitali della scheda IO24ADC, permette
      di misurare delle correnti da 0 a 20A.
      Si può decidere di usare un secondo convertitore analogico-digitale per leggere la
      resistenza del sensore di temperatura, in caso in cui esso sia presente.
      I parametri di configurazione e taratura relativi si trovano dentro al file di configurazione
      “HAL Config Heater”.
      Il valore misurato dal riscaldatore e quello misurato dal sensore di temperatura vengono
      confrontati con i valori di riferimento preimpostati dal file di configurazione del job,
      riportando l’esito globale della prova.`,
    img_src: "/assets/images/jobs/termoforomasp.png",
    esempio_job1_title: "Job Termoforo",
    esempio_job1_text: `
      ;============================================
      [JOB 1]
      ;============================================
      Tipo job = termoforo
      Nome job = Verifica assorbimento termoforo principale e sensore NTC
      Salta job = 0
      Numero ripetizioni = 5
      Avvio automatico prova = 0
      ;----------------------------------------------------------------------------
      Firma termoforo = Heater_Main
      ;----------------------------------------------------------------------------
      Abilitazione prova = 1
      Durata prova = 4
      Corrente nominale = 3.5
      Tolleranza corrente = 1
      ;----------------------------------------------------------------------------
      Attesa pulsante premuto = 0
      Soglia corrente = 0.75
      ;----------------------------------------------------------------------------
      Abilitazione verifica sensore di temperatura = 1
      Resistenza min sensore di temperatura = 7000
      Resistenza max sensore di temperatura = 9000
      ;----------------------------------------------------------------------------`,
    diagnostica_img_src: "/assets/images/jobs/diagnostica/termoforo.png",
    data_diagnostica: [],
  },
  {
    title: "Cintura",
    icona: "images/jobs/cintura.png",
    categoria: "Collaudo Componenti Automotive",
    data_hal: [],
    nome_hal: "Belt",
    data_job: [],
    text: `Il job cintura serve a verificare che il ramo cintura funzioni correttamente, misurando i
    valori di resistenza e/o corrente assorbita con e senza la linguetta inserita.
    I tipi di cinture utilizzabili per la prova sono quelle resistive ed ad effetto Hall. C’è la
    possibilità di utilizzare una cintura a quattro punte, al posto della normale cintura ad una
    sola linguetta, la quale utilizza due linguette. Nel caso di quest’ultima può essere
    verificato anche l’angolo di disinserimento di entrambe le linguette, tramite la lettura da
    encoder, configurabile da file "HAL Config Arm With Encoder.ini".
    Le misure vengono effettuate tramite l’utilizzo di uno dei convertitori analogico-digitali
    presenti sulla scheda IO24ADC. In caso di cintura con sensore ad effetto Hall, sulla
    scheda dovrà essere attivato il circuito di misura correnti basse, permettendo di
    misurare da 0 fino a 100mA. I parametri di configurazione e taratura relativi si trovano
    dentro al file di configurazione “HAL Config Belt.ini”.
    Immagini, messaggi per la condotta guidata ed i parametri di funzionamento sono tutti
    impostabili da file di configurazione del job.`,
    img_src: "/assets/images/jobs/cinturamasp.png",
    esempio_job1_title: "Job Cintura resistiva",
    esempio_job1_text: `
    ;============================================
    [JOB 1]
    ;============================================
    Tipo job = Cintura
    Nome job = Prova cintura 100/400 Ohm
    Salta job = 0
    ;----------------------------------------------------------------------------
    Cartella immagini = C:\MASP\App Collaudo\Images\Cintura
    ;----------------------------------------------------------------------------
    Firma cintura = Cintura_Resistiva_100_400
    ;----------------------------------------------------------------------------
    Immagine interfaccia inserita = Interfaccia inserita.jpg
    Immagine linguetta non inserita = Linguetta non inserita.jpg
    Immagine linguetta inserita = Linguetta inserita.jpg
    ;----------------------------------------------------------------------------`,
    esempio_job2_title: "Job Cintura ad effetto Hall",
    esempio_job2_text: `
    ;============================================
    [JOB 1]
    ;============================================
    Tipo job = Cintura
    Nome job = Prova cintura 100/400 Ohm
    Salta job = 0
    ;----------------------------------------------------------------------------
    Cartella immagini = C:\MASP\App Collaudo\Images\Cintura
    Firma cintura = Cintura_Effetto_Hall
    ;----------------------------------------------------------------------------
    Immagine interfaccia inserita = Interfaccia inserita Hall.jpg
    Immagine linguetta non inserita = Linguetta non inserita Hall.jpg
    Immagine linguetta inserita = Linguetta inserita Hall.jpg
    ;----------------------------------------------------------------------------`,
    diagnostica_img_src: "/assets/images/jobs/diagnostica/cintura.png",
    data_diagnostica: [],
  },
  {
    title: "Rilascio Cintura",
    icona: "images/jobs/cintura.png",
    categoria: "Collaudo Componenti Automotive",
    data_job: [],
    data_hal: [],
    text: ``,
    img_src: "/assets/images/jobs/rilasciocinturamasp.png",
    esempio_job1_title: "Esempio di implementazione job Rilascio Cintura",
    esempio_job1_text: `
    ;============================================
    [JOB 1]
    ;============================================
   
    ;----------------------------------------------------------------------------`,
    diagnostica_img_src: "/assets/images/jobs/diagnostica/cintura.png",
    data_diagnostica: [],
  },
  {
    title: "Airbag",
    icona: "images/jobs/bag.png",
    categoria: "Collaudo Componenti Automotive",
    data_hal: [],
    nome_hal: "Airbag",
    data_job: [],
    text: `Il job airbag viene utilizzato per verificare il corretto funzionamento dell’impianto di
    sicurezza airbag.
    Il controllo viene effettuato iniettando una bassa corrente dentro al circuito in questione,
    leggendo tramite uno dei convertitori analogico-digitali della scheda IO24ADC la caduta
    di tensione sulla resistenza dell’airbag, da cui viene calcolato il valore della resistenza,
    verificando in seguito che quest’ultimo rispetti i valori preimpostati. I parametri di
    configurazione e taratura relativi si trovano dentro al file di configurazione “HAL Config
    Airbag.ini”.
    Immagini, messaggi per la condotta guidata ed i parametri di funzionamento sono tutti
    impostabili da file di configurazione del job.`,
    img_src: "/assets/images/jobs/bagmasp.png",
    esempio_job1_title: "Job Airbag",
    esempio_job1_text: `
    ;============================================
    [JOB 1]
    ;============================================
    Tipo job = airbag
    Nome job = Funzionamento Airbag
    Salta job = 0
    Numero ripetizioni = 3
    ;----------------------------------------------------------------------------
    Cartella immagini = C:\MASP\App Collaudo\Images\Airbag
    Immagine airbag = Airbag.jpg
    ;----------------------------------------------------------------------------`,
    diagnostica_img_src: "/assets/images/jobs/diagnostica/bag.png",
    data_diagnostica: [],
  },
  {
    title: "Killer-Switch",
    icona: "images/jobs/killer.png",
    categoria: "Collaudo Componenti Automotive",
    data_hal: [],
    nome_hal: "Killer Switch",
    data_job: [],
    text: `Il job killer-switch serve a verificare il corretto funzionamento di uno switch, controllando
    che esso passi da inattivo, ad attivo e viceversa.
    La verifica del cambio di stato dello switch viene fatta attraverso un convertitore
    analogico-digitale della scheda IO24ADC, il quale monitora la resistenza elettrica
    misurata dal componente, che cambia a seconda dello stato. I parametri di
    configurazione e taratura relativi si trovano dentro al file di configurazione “HAL Config
    Killer-Switch.ini”.
    Immagini, messaggi per la condotta guidata ed i parametri di funzionamento sono tutti
    impostabili da file di configurazione del job.`,
    img_src: "/assets/images/jobs/killermasp.png",
    esempio_job1_title: "Job Killer-Switch",
    esempio_job1_text: `
    ;============================================
    [JOB 1]
    ;============================================
    Tipo job = Killer-Switch
    Nome job = Funzionamento Killer-Switch
    Salta job = 0
    ;----------------------------------------------------------------------------
    Cartella immagini = C:\MASP\App Collaudo\Images\Killer-Switch
    Immagine Killer-Switch Off = Killer-Switch Off.jpg
    Immagine Killer-Switch On = Killer-Switch On.jpg
    ;----------------------------------------------------------------------------`,
    diagnostica_img_src: "/assets/images/jobs/diagnostica/killer.png",
    data_diagnostica: [],
  },
  {
    title: "DPD-SBR",
    icona: "images/jobs/dpd-sbr.png",
    categoria: "Collaudo Componenti Automotive",
    data_hal: [],
    nome_hal: "DPD-SBR",
    data_job: [],
    text: `Il job DPD-SBR viene utilizzato per verificare il corretto funzionamento del sensore SBR
    (Seat Belt Reminder) presente sui sedili auto, verificando che lo stato di attivazione sia
    quello corretto in base al peso postovi sopra.
    Le prove devono vengono effettuate partendo con il sensore inattivo, dove sopra di
    esso non deve esserci alcun peso ed i valori letti devono indicare questo stato.
    In seguito avviene la verifica del sensore nello stato attivo, ove aggiungendo del peso
    sopra il sedile, si verifica che avvenga il passaggio di stato.
    Esistono tre modalità per aggiungere il peso:
    ● A mano: I pesi vengono aggiunti a mano quando richiesto dalla condotta guidata
    del software, senza però che questo ne abbia il controllo.
    ● Tramite paranco motorizzato, con movimentazione automatica in orizzontale e
    verticale del peso utilizzando per questo le funzioni del job Bloccaggio.
    ● Tramite braccio manuale e slitta con cilindro pneumatico previsto di cella di
    carico: In questa modalità di funzionamento, per rilevare quando il peso si trova
    fisicamente sopra il sensore SBR, sono utilizzati una serie di sensori proximity
    che definiscono fino a tre posizioni differenti. La cella di carico, collegata a un
    convertitore analogico-digitale della scheda IO24ADC ha solo la funzione di
    verificare che i pesi caricati sono quelli giusti, con due valori prestabiliti. La
    movimentazione verticale dei pesi è effettuata, sotto il controllo del software
    MASP App, dal cilindro pneumatico che dispone di proximity di finecorsa.
    ● Tramite braccio pneumatico e slitta con motore stepper e cella di carico: Questa
    modalità di funzionamento prevede l’utilizzo di un braccio meccanico con cilindro
    pneumatico e sensori proximity il quale permette di assumere due posizioni
    orizzontali preimpostate: a riposo e sopra il sedile. Il controllo verticale del peso
    viene effettuato tramite una slitta motorizzata con in testa una cella di carico
    collegata a una scheda certificata con bus RS485, per misurare il peso che si sta
    applicando sul sensore SBR.
    Lo stato attivo o inattivo del sensore viene rilevato misurando la sua resistenza, tramite
    l’utilizzo di uno dei convertitori analogico-digitali presenti sulla scheda IO24ADC. In
    caso di sensore ad effetto Hall il valore letto non è una resistenza, ma una corrente.
    Sulla scheda IO24ADC dovrà essere attivato il circuito di misura correnti basse,
    permettendo di misurare da 0 fino a 100mA. I parametri di configurazione e taratura
    relativi si trovano dentro al file di configurazione “HAL Config DPD-SBR.ini”.
    Immagini, messaggi per la condotta guidata ed i parametri di funzionamento sono tutti
    impostabili da file di configurazione del job.`,
    img_src: "/assets/images/jobs/dpd-sbrmasp.png",
    esempio_job1_title: "JOb SBR per verifica sensore senza e con peso",
    esempio_job1_text: `
    ;============================================
    [JOB 1]
    ;============================================
    Tipo job = DPD
    Nome job = Funzionamento sensore SBR senza e con peso
    Salta job = 0
    Numero ripetizioni = 5
    ;----------------------------------------------------------------------------
    Verifica peso leggero = 0
    ;----------------------------------------------------------------------------
    Prova estesa senza peso = 0
    Prova estesa con peso = 0
    Prova estesa automatica = 0
    ;----------------------------------------------------------------------------
    Cartella immagini = C:\MASP\App Collaudo\Images\SBR
    Immagine senza peso = SBR senza peso.jpg
    Immagine con peso leggero = SBR con peso 12kg.jpg
    Immagine con peso = SBR con peso 20kg.jpg
    ;----------------------------------------------------------------------------
    Resistenza min con peso = 75
    Resistenza max con peso = 125
    Resistenza min senza peso = 375
    Resistenza max senza peso = 425
    ;----------------------------------------------------------------------------`,
    diagnostica_img_src: "/assets/images/jobs/diagnostica/dpd-sbr.png",
    data_diagnostica: [],
  },

  {
    title: "SCU",
    icona: "images/jobs/scu.png",
    categoria: "Unità di Controllo Elettronico",
    img_src: "/assets/images/jobs/scumasp.png",
    data_job: [],
    text: `TESTO`,
    esempio_job1_title: "Job SCU",
    esempio_job1_text: `
    ;============================================
    [JOB 1]
    ;============================================
    
    ;----------------------------------------------------------------------------`,
    diagnostica_img_src: "/assets/images/jobs/diagnostica/scu.png",
    data_diagnostica: [],
  },
  {
    title: "OCS Bodysense",
    icona: "images/jobs/ocsbodysense.png",
    categoria: "Unità di Controllo Elettronico",
    img_src: "/assets/images/jobs/ocsbodysensemasp.png",
    data_job: [],
    text: `TESTO`,
    esempio_job1_title: "Job OCS Bodysense",
    esempio_job1_text: `
    ;============================================
    [JOB 1]
    ;============================================
    
    ;----------------------------------------------------------------------------`,
  },

  {
    title: "ECU Heater",
    icona: "images/jobs/heater.png",
    categoria: "Unità di Controllo Elettronico",
    img_src: "/assets/images/jobs/heatermasp.png",
    data_job: [],
    text: `TESTO`,
    esempio_job1_title: "Job ECU Heater",
    esempio_job1_text: `
    ;============================================
    [JOB 1]
    ;============================================
    
    ;----------------------------------------------------------------------------`,
  },

  {
    title: "ECU Massaggiante",
    icona: "images/jobs/ecumassaggiante.png",
    categoria: "Unità di Controllo Elettronico",
    img_src: "/assets/images/jobs/ecumassaggiantemasp.png",
    data_job: [],
    text: `TESTO`,
    esempio_job1_title: "Job ECU Massaggiante",
    esempio_job1_text: `
    ;============================================
    [JOB 1]
    ;============================================
    
    ;----------------------------------------------------------------------------`,
  },

  {
    title: "Carico",
    icona: "images/jobs/caricomanuale.png",
    categoria: "Controllo di Qualità e Verifica",
    data_hal: [],
    nome_hal: "Load Cell",
    data_job: [],
    text: `Il job carico serve per verificare che la forza di picco, misurata attraverso una cella di
    carico montata su una slitta motorizzata controllata dal software MASP App, resti
    all'interno di un intervallo di valori prestabilito.
    La cella di carico, i cui valori possono essere letti con una scheda certificata, connessa
    alla piattaforma software tramite bus RS485, oppure attraverso uno dei convertitori
    analogico-digitale A0 o A1 presenti sulla scheda IO24ADC.
    I parametri di configurazione della comunicazione RS485 si trovano nella sezione
    "SERIALE RS485" del fila "Hardware Config.ini", mentre i parametri per la
    configurazione dell'acquisizione con la scheda IO24ADC si trovano dentro il file "HAL
    Config Load Cell.ini".
    La slitta motorizzata viene movimentata tramite un motore stepper controllato da
    un'unità di controllo esterna con interfaccia RS485 e protocollo Modbus, la quale
    esegue i comandi ricevuti dal software MASP App e gestisce in autonomia i finecorsa
    della slitta, delimitati da due sensori proximity.
    Il funzionamento dell'operazione prevede una movimentazione durante la quale viene
    letto il valore istantaneo della forza, calcolato il valore di picco e verificando le
    condizioni di sovraccarico cella o il raggiungimento dei finecorsa, condizioni in cui il
    motore viene fermato subito. A fine operazione il valore di picco rilevato è confrontato
    con valori di riferimento programmabili da job per restituire il risultato.
    I parametri riguardanti la slitta permettono di impostare la distanza che la slitta deve
    percorrere per la prova, assieme ad altri elementi come direzione, velocità, carico
    massimo ammissibile, posizione di partenza o avvio automatico della prova senza
    conferma da parte dell’operatore.
    È possibile fissare la slitta su un braccio con encoder per poter effettuare la prova solo
    in posizioni desiderate. La lettura degli angoli dai quattro encoder, che permette di
    stabilire le posizioni di riferimento per la prova, si realizza con l'espansione ENCODER
    della scheda IO24ADC. I parametri del braccio e degli encoder si trovano nel file di
    configurazione "HAL Config Arm With Encoder.ini".
    Immagini, messaggi per la condotta guidata ed i parametri di funzionamento sono tutti
    impostabili da file di configurazione del job.`,
    img_src: "/assets/images/jobs/caricomasp.png",
    esempio_job1_title: "Job Carico com slitta motorizzata",
    esempio_job1_text: `
    ;============================================
    [JOB 1]
    ;============================================
    Tipo job = carico
    Nome job = Verifica carico con cella motorizzata e peso 75kg
    Salta job = 0
    Numero ripetizioni = 5
    ;----------------------------------------------------------------------------
    Cartella immagini = C:\MASP\App Collaudo\Images\Carico
    Immagine = Scorrimento guide avanti con peso 75kg.jpg
    ;----------------------------------------------------------------------------
    ID Slitta=3
    Firma Slitta = Cella_Guide
    ;----------------------------------------------------------------------------
    Velocita Slitta = 10
    Velocita Posizionamento Slitta = 15
    ;----------------------------------------------------------------------------
    Posizione Slitta = 20
    ;----------------------------------------------------------------------------
    Imposta posizione OK a inizio prova = 0
    Imposta posizione NOK a inizio prova = 1
    Avvio automatico in posizione a inizio prova = 0
    Avvio automatico prova = 0
    Prova finita a posizione raggiunta = 1
    ;----------------------------------------------------------------------------
    Corsa Slitta = 130
    Zona Spunto Slitta = 30
    Spostamento Slitta = -20
    ;----------------------------------------------------------------------------
    Carico Nominale = 75
    Tolleranza Carico = 35
    Carico Nominale Spunto = 165
    Tolleranza Carico Spunto = 135
    ;----------------------------------------------------------------------------
    Carico Massimo Ammissibile = 500
    ;----------------------------------------------------------------------------`,
    diagnostica_img_src: "/assets/images/jobs/diagnostica/carico.png",
    data_diagnostica: [],
  },
  {
    title: "Carico Manuale",
    icona: "images/jobs/caricomanuale.png",
    categoria: "Controllo di Qualità e Verifica",
    data_hal: [],
    nome_hal: "Load Cell Manual",
    data_job: [],
    text: `Il job carico manuale serve per verificare che la forza di picco misurata con un attrezzo
    che ha funzione di dinamometro resti all'interno di un intervallo di valori prestabilito.
    L'attrezzo per la misura è dotato di cella di carico, i cui valori possono essere letti con
    una scheda certificata, connessa alla piattaforma software tramite bus RS485, oppure
    attraverso uno dei convertitori analogico-digitali A0 o A1 presenti sulla scheda
    IO24ADC.
    I parametri di configurazione della comunicazione RS485 si trovano nella sezione
    "SERIALE RS485" del file "Hardware Config.ini", mentre i parametri per la
    configurazione dell'acquisizione con la scheda IO24ADC di trovano dentro il file "HAL
    Config Load Cell Manual.ini".
    Il funzionamento dell'operazione prevede l'attesa di un valore minimo, programmabile
    da job, per iniziare la verifica del valore di picco, aspettando che la forza misurata ritorni
    sotto una certa soglia e restituendo in seguito il valore massimo rilevato.
    Immagini, messaggi per la condotta guidata ed i parametri di funzionamento sono tutti
    impostabili dal file di configurazione del job`,
    img_src: "/assets/images/jobs/caricomanualemasp.png",
    esempio_job1_title: "Job Carico Manuale con scorrimento avanti",
    esempio_job1_text: `
    ;============================================
    [JOB 1]
    ;============================================
    Tipo job = carico manuale
    Nome job = Verifica carico con cella manuale durante scorrimento avanti
    Salta job = 0
    Numero ripetizioni = 5
    ;----------------------------------------------------------------------------
    Cartella immagini = C:\MASP\App Collaudo\Images\Carico manuale
    Immagine = Scorrimento guide avanti.jpg
    ;----------------------------------------------------------------------------
    Carico Nominale = 60
    Tolleranza Carico = 40
    Soglia Carico Bassa = 10
    Soglia Carico Alta = 100
    Carico Massimo Ammissibile = 250
    Direzione Avanti = 1
    ;----------------------------------------------------------------------------
    Campioni non usati inizio = 5
    Campioni non usati fine = 6
    ;----------------------------------------------------------------------------`,
    esempio_job2_title: "Job Carico Manuale con scorrimento indietro",
    esempio_job2_text: `
    ;============================================
    [JOB 1]
    ;============================================
    Tipo job = carico manuale
    Nome job = Verifica carico con cella manuale durante scorrimento indietro
    Salta job = 0
    Numero ripetizioni = 5
    ;----------------------------------------------------------------------------
    Cartella immagini = C:\MASP\App Collaudo\Images\Carico manuale
    Immagine = Scorrimento guide indietro.jpg
    ;----------------------------------------------------------------------------
    Carico Nominale = 60
    Tolleranza Carico = 40
    Soglia Carico Bassa = 10
    Soglia Carico Alta = 100
    Carico Massimo Ammissibile = 250
    Direzione Avanti = 0
    ;----------------------------------------------------------------------------
    Campioni non usati inizio = 5
    Campioni non usati fine = 6
    ;----------------------------------------------------------------------------`,
    diagnostica_img_src: "/assets/images/jobs/diagnostica/caricomanuale.png",
    data_diagnostica: [],
  },
  {
    title: "Coppia",
    icona: "images/jobs/coppia.png",
    categoria: "Controllo di Qualità e Verifica",
    data_hal: [],
    nome_hal: "Torsiometer",
    data_job: [],
    text: `Il job coppia serve per verificare che la coppia applicata da un motoriduttore per ruotare
    un asse o una manopola in senso orario o antiorario resti entro i limiti prestabiliti.
    I valori di coppia possono essere letti con un torsiometro fissato sull'asse di rotazione e
    collegato a una scheda certificata, connessa alla piattaforma software tramite bus
    RS485, oppure tramite uno dei convertitori analogico-digitali A0 o A1 presenti sulla
    scheda IO24ADC. Il motoriduttore è fatto ruotare da motore stepper controllato da
    azionamento con interfaccia RS485 e protocollo Modbus.
    I parametri di configurazione della comunicazione RS485 si trovano nella sezione
    "SEZIONE RS485" del file "Hardware Config.ini", mentre i parametri per la
    configurazione dell'acquisizione con la scheda IO24ADC di trovano dentro il file "HAL
    Config Torsiometer.ini".
    Il funzionamento dell'operazione prevede l'attesa di una coppia misurata minima,
    programmabile da job, per iniziare la verifica dei valori, aspettando che la essa ritorni
    sotto una certa soglia e restituendo in seguito il valore massimo rilevato o la media
    calcolata.
    Le impostazioni del senso di rotazione, del numero di giri al minuto, della coppia
    nominale, della tolleranza, di quella di sovraccarico, del tempo della prova, assieme alle
    immagini ed i messaggi per la condotta guidata, sono impostabili da file di
    configurazione del job.`,
    img_src: "/assets/images/jobs/coppiamasp.png",
    esempio_job1_title: "Job Coppia con rotazione in senso antiorario",
    esempio_job1_text: `
    ;============================================
    [JOB 1]
    ;============================================
    Tipo job = coppia
    Nome job = Verifica coppia manopola per rotazione schienale avanti con torsiometro motorizzato
    Salta job = 0
    Numero ripetizioni = 10
    ;----------------------------------------------------------------------------
    Cartella immagini = C:\MASP\App Collaudo\Images\Coppia
    Immagine = Manopola per schienale avanti.jpg
    ;----------------------------------------------------------------------------
    Firma torsiometro = Tors_Mot_DX
    ;----------------------------------------------------------------------------
    Senso di rotazione orario = 0
    Velocita di rotazione = 10
    ;----------------------------------------------------------------------------
    Coppia nominale = 10
    Tolleranza coppia = 2
    Tolleranza superiore coppia = 0.5
    Tolleranza inferiore coppia = 1.25
    ;----------------------------------------------------------------------------
    Tempo nominale = 6
    Tolleranza tempo = 3
    Stop a tempo nominale = 0
    ;----------------------------------------------------------------------------
    Coppia rilascio min = 2
    Coppia rilascio max = 5
    Velocita di rotazione rilascio = 5
    Rilascio automatico a inizio prova = 0
    Rilascio automatico a fine prova = 0
    ;----------------------------------------------------------------------------
    Coppia di finecorsa prova = 18
    Coppia di finecorsa movimentazione = 10.1
    Finecorsa automatico = 1
    ----------------------------------------------------------------------------
    Disabilita salvataggio risultati = 0
    ;----------------------------------------------------------------------------
    Campioni non usati inizio = 2
    Campioni non usati fine = 3
    Coppia massima viewer = 20
    ;----------------------------------------------------------------------------`,
    diagnostica_img_src: "/assets/images/jobs/diagnostica/coppia.png",
    data_diagnostica: [],
  },
  {
    title: "Dimensionale",
    icona: "images/jobs/dimensionale.png",
    categoria: "Controllo di Qualità e Verifica",
    data_hal: [],
    nome_hal: "Dimensional",
    data_job: [],
    text: `Il job dimensionale serve per effettuare la verifica di un ingombro attraverso un attrezzo
    previsto di tastatore con potenziometro lineare, portato avanti da un cilindro
    pneumatico, posizionando il pezzo da misurare su un calibro previsto di boccole
    d'appoggio nei punti di misura.
    Esistono due modalità di funzionamento per questa prova:
    - La prima modalità permette di effettuare, attraverso una sola misura, il
    rilevamento di una quota riferita ad un punto 0;
    - La seconda modalità prevede due misure in successione, effettuate su uno
    stesso asse, in direzioni opposte, che permette di calcolare la larghezza di un
    oggetto.
    Per calcolare la distanza percorsa, viene letta la tensione sul cursore del potenziometro
    lineare tramite un convertitore analogico-digitale della scheda IO24ADC, la quale
    cambia in base alla posizione del tastatore.
    Il cilindro pneumatico viene azionato da un'elettrovalvola controllata da una delle uscite
    della scheda, quale rileva lo stato di un pulsante presente sull'attrezzo, tramite un
    ingresso.
    L'attrezzo dispone inoltre di un sensore proximity per garantire il corretto inserimento
    nelle boccole di misura durante la prova.
    Il convertitore analogico digitale, l'ingresso del proximity e del pulsante, l'uscita
    dell'elettrovalvola ed i parametri di taratura sono tutti configurabili dal file "HAL Config.
    Dimensional.ini".
    Le immagini, i messaggi per la condotta guidata ed i parametri di funzionamento sono
    tutti impostabili da file di configurazione del job.`,
    img_src: "/assets/images/jobs/dimensionalemasp.png",
    esempio_job1_title: "Job Dimensionale per verifica con una boccola",
    esempio_job1_text: `
    ;============================================
    [JOB 1]
    ;============================================
    Tipo job = dimensionale
    Nome job = Verifica dimensione con boccola 1
    Salta job = 0
    Numero ripetizioni = 4
    Continua a ripetizioni superate = 0
    ;----------------------------------------------------------------------------
    Cartella immagini = C:\MASP\App Collaudo\Images\Dimensionale
    Immagine = boccola1.jpg
    ;----------------------------------------------------------------------------
    Distanza nominale = 1000
    Tolleranza = 5
    Distanza boccola sedile = 105
    Distanza tra boccole = 0
    Sottrazione misura dimensionale = 0
    Stessa direzione misura e cursore = 1
    Lunghezza prolunga = 33
    ;----------------------------------------------------------------------------`,
    esempio_job2_title:
      "Job Dimensionale per verifica larghezza con due boccole",
    esempio_job2_text: `
    ;============================================
    [JOB 1]
    ;============================================
    Tipo job = dimensionale
    Nome job = Verifica larghezza con boccola 1 e boccola 2
    Salta job = 0
    Numero ripetizioni = 2
    Continua a ripetizioni superate = 0
    ----------------------------------------------------------------------------
    Cartella immagini = C:\MASP\App Collaudo\Images\Dimensionale
    Immagine boccola 1 = larghezza boccola1.jpg
    Immagine boccola 2 = larghezza boccola2.jpg
    ----------------------------------------------------------------------------
    Distanza nominale = 500
    Tolleranza = 25
    Distanza boccola sedile = 0
    Distanza tra boccole = 700
    Sottrazione misura dimensionale = 0
    Stessa direzione misura e cursore = 0
    Lunghezza prolunga = 33
    ;----------------------------------------------------------------------------`,
    diagnostica_img_src: "/assets/images/jobs/diagnostica/dimensionale.png",
    data_diagnostica: [],
  },
  {
    title: "Motore",
    icona: "images/jobs/motore.png",
    categoria: "Controllo di Qualità e Verifica",
    data_hal: [],
    nome_hal: "Motor Current",
    data_job: [],
    text: `Il job motore serve a misurare la corrente di picco o media assorbita da un motore a
    corrente continua (DC) durante un determinato periodo di tempo, oppure fino al
    raggiungimento di un limite minimo o massimo preimpostato.
    La corrente viene misurata tramite una scheda proprietaria CORA, la quale,
    collegandosi ad uno dei convertitori analogico-digitali della scheda IO24ADC, permette
    di misurare delle correnti da 0 a 20A. I parametri di configurazione e taratura relativi si
    trovano dentro al file di configurazione “HAL Config Motor Current.ini”.
    Il funzionamento dell'operazione prevede l'attesa di un valore minimo, programmabile
    da job, per iniziare la verifica dei valori, aspettando in seguito che la corrente misurata
    ritorni sotto una certa soglia o ne superi un’altra, indicando il raggiungimento di un
    finecorsa, restituendo in seguito il valore massimo rilevato o la media calcolata,
    assieme al tempo impiegatoci. I tre risultanti valori vengono confrontati con i valori di
    riferimento preimpostati dal file di configurazione del job, riportando l’esito globale della
    prova.
    Immagini, messaggi per la condotta guidata ed i parametri di funzionamento sono tutti
    impostabili da file di configurazione del job.`,
    img_src: "/assets/images/jobs/motoremasp.png",
    esempio_job1_title:
      "Job Motore per misura corrente motore DC durante scorrimento",
    esempio_job1_text: `
    ;============================================
    [JOB 1]
    ;============================================
    Tipo job = motore
    Nome job = Assorbimento motore durante scorrimento indietro
    Salta job = 0
    Numero ripetizioni = 5
    ;----------------------------------------------------------------------------
    Cartella immagini = C:\MASP\App Collaudo\Images\Corrente motore
    Immagine = Scorrimento indietro.jpg
    ;----------------------------------------------------------------------------
    ID Motore = 0
    Direzione Oraria = 1
    Abilitazione Prova Picco = 1
    ;----------------------------------------------------------------------------
    Corrente Picco Nominale = 4
    Tolleranza Superiore Corrente Picco = 2
    Tolleranza Inferiore Corrente Picco = 2
    Soglia Corrente Bassa = 0.5
    Soglia Corrente Alta = 6
    ;----------------------------------------------------------------------------
    Tempo Nominale = 4
    Tolleranza Tempo = 3
    ;----------------------------------------------------------------------------
    Campioni Non Usati Inizio = 10
    Campioni Non Usati Fine = 10
    ;----------------------------------------------------------------------------`,
    diagnostica_img_src: "/assets/images/jobs/diagnostica/motore.png",
    data_diagnostica: [],
  },
  {
    title: "Oggettivazione",
    icona: "images/jobs/oggettivazione.png",
    categoria: "Controllo di Qualità e Verifica",
    data_hal: [],
    nome_hal: "Object",
    data_job: [],
    text: `Questo job viene utilizzato per guidare l’operatore durante le operazioni di montaggio e
    collaudo tramite la visualizzazione di immagini e messaggi a schermo e per effettuare
    delle verifiche con un sensore di visione o con la misura del peso dei componenti. Il job
    è molto flessibile ed è stato previsto con le seguenti modalità di funzionamento:
    - Gestione con pulsanti OK e NOK per mostrare un messaggio e un’immagine a
    video, che possono avere svariati scopi, tra i più comuni un'istruzione o un
    avvertenza. Per proseguire con il ciclo bisogna premere il pulsante OK o NOK
    che apparirà sotto l'immagine caricata.
    - Gestione prelievo attrezzo con condotta guidata e oggettivazione del prelievo e
    del successivo posaggio tramite un ingresso della scheda IO24ADC. Il job
    controlla anche un'uscita della scheda per poter indicare in modo visivo l’attrezzo
    da prelevare.
    - Gestione stato ingresso con condotta guidata e oggettivazione del cambiamento
    di stato di un determinato ingresso della scheda IO24ADC.
    - Gestione sensore laser Keyence per la verifica della presenza di un determinato
    elemento con una forma che può essere riconosciuta dal sensore dopo
    un’opportuna programmazione.
    - Gestione bilancia per la verifica del peso di un componente prima di essere
    montato con una bilancia elettronica Odeca SW23.
    Le immagini, i messaggi per la condotta guidata ed i parametri di funzionamento sono
    tutti impostabili da file di configurazione del job.`,
    img_src: "/assets/images/jobs/oggettivazionemasp.png",
    esempio_job1_title:
      "Esempio di implementazione job Oggettivazione con pulsante OK",
    esempio_job1_text: `
    ;============================================
    [JOB 1]
    ;============================================
    ; Job oggettivazione con pulsante OK
    ; Per continuare la lavorazione bisogna premere OK
    Tipo job = oggettivazione
    Nome job = Verifica visiva
    Salta job = 0
    ;----------------------------------------------------------------------------
    Cartella immagine = C:\MASP\App Montaggio\Images\Oggettivazione
    ;----------------------------------------------------------------------------
    Immagine = carter.jpg
    Messaggio = Verifica carter motore e premere "OK"
    ;----------------------------------------------------------------------------`,
    esempio_job2_title:
      "Esempio di implementazione job Oggettivazione con pulsanti OK e NOK",
    esempio_job2_text: `
    ;============================================
    [JOB 1]
    ;============================================
    ; Job oggettivazione con pulsanti OK e NOK
    ; Per continuare la lavorazione bisogna premere OK o NOK
    ; In caso di selezione NOK il ciclo finisce con errore
    Tipo job = oggettivazione
    Nome job = Verifica visiva con pulsanti OK e NOK
    Salta job = 0
    ;----------------------------------------------------------------------------
    Cartella immagine = C:\MASP\App Montaggio\Images\Oggettivazione
    ;----------------------------------------------------------------------------
    Immagine = carter.jpg
    Messaggio = Verifica carter motore e premere "OK" o "NOK"
    ;----------------------------------------------------------------------------
    Utilizza pulsanti OK e NOK = 1
    ;----------------------------------------------------------------------------`,
    esempio_job3_title:
      "Esempio di implementazione job Oggettivazione con pulsanti OK e NOK",
    esempio_job3_text: `
    ;============================================
    [JOB 1]
    ;============================================
    ; Job oggettivazione con pulsanti OK e NOK
    ; Per continuare la lavorazione bisogna premere OK o NOK
    ; In caso di selezione NOK il ciclo continua
    Tipo job = oggettivazione
    Nome job = Verifica visiva con pulsanti OK e NOK
    Salta job = 0
    ;----------------------------------------------------------------------------
    Cartella immagine = C:\MASP\App Montaggio\Images\Oggettivazione
    ;----------------------------------------------------------------------------
    Immagine = carter.jpg
    Messaggio = Verifica carter motore e premere "OK" o "NOK"
    Messaggio OK =
    Messaggio NOK =
    Tempo minimo visualizzazione messaggio = 1000
    ;----------------------------------------------------------------------------
    Utilizza pulsanti OK e NOK = 1
    Continua ciclo se NOK premuto = 1
    Testo pulsante OK = Testo OK
    Testo pulsante NOK = Testo NOK
    Aggiungi testo pulsante a nome file report = 1
    ;--------------------------------------------------------------------------
    Risultato in report = 1
    Risultato in etichetta = 0
    ;----------------------------------------------------------------------------`,
    esempio_job4_title:
      "Esempio di implementazione job Oggettivazione con sensore laser Keyence",
    esempio_job4_text: `
    ;============================================
    [JOB 1]
    ;============================================
    Tipo job = oggettivazione
    Nome job = Controllo con sensore laser Keyence
    Salta job = 0
    ;----------------------------------------------------------------------------
    Cartella immagine = C:\MASP\App Montaggio\Images\Oggettivazione
    Immagine = carter.jpg
    ;----------------------------------------------------------------------------
    Messaggio = Attendere fine verifica con sensore laser
    Messaggio OK =
    Messaggio NOK =
    Tempo minimo visualizzazione messaggio = 1000
    ;----------------------------------------------------------------------------
    Gestione sensore = 1
    Durata trigger attivo = 1000
    ;----------------------------------------------------------------------------
    Risultato in report = 1
    Risultato in etichetta = 0
    ;----------------------------------------------------------------------------`,
    esempio_job5_title:
      "Esempio di implementazione job Oggettivazione con bilancia",
    esempio_job5_text: `
    ;============================================
    [JOB 1]
    ;============================================
    Tipo job = oggettivazione
    Task =
    Nome job = Verifica peso componente con bilancia Odeca SW23
    Salta job = 0
    Numero ripetizioni = 5
    Continua a ripetizioni superate = 0
    ;----------------------------------------------------------------------------
    Cartella immagine = C:\MASP\App Montaggio\Images\Oggettivazione
    ;----------------------------------------------------------------------------
    Immagine = Bilancia Odeca SW23.jpg
    ;----------------------------------------------------------------------------
    Messaggio = Posare il componente sulla bilancia e premere "OK"
    ;----------------------------------------------------------------------------
    Gestione bilancia = 1
    Peso minimo = 9.50
    Peso massimo = 10.50
    ;----------------------------------------------------------------------------`,
    esempio_job6_title:
      "Esempio di implementazione job Oggettivazione con bilancia",
    esempio_job6_text: `
    ;============================================
    [JOB 1]
    ;============================================
    Tipo job = oggettivazione
    Nome job = Attesa barriera OK attiva
    Salta job = 0
    ;----------------------------------------------------------------------------
    Cartella immagine = C:\MASP\App Montaggio\Images\Oggettivazione
    Immagine = Barriera OK.jpg
    ;----------------------------------------------------------------------------
    Messaggio = Mettere il pezzo lavorato nella scatola con barriera OK
    Messaggio attrezzo prelevato = Pezzo inserito nella barriera OK
    ;----------------------------------------------------------------------------
    Gestione prelievo attrezzo = 1
    Ingresso attrezzo = 208
    Uscita attrezzo = 208
    Ingresso attivo alto con attrezzo presente = 1
    ;----------------------------------------------------------------------------
    Disabilita barriera OK = 1
    Disabilita barriera NOK = 0
    ;----------------------------------------------------------------------------`,
    diagnostica_img_src: "/assets/images/jobs/diagnostica/oggettivazione.png",
    data_diagnostica: [],
  },
  {
    title: "Scarto",
    icona: "images/jobs/scarto.png",
    categoria: "Controllo di Qualità e Verifica",
    data_job: [],
    text: `Questo job permette di indicare i possibili difetti riscontrati durante il ciclo nei vari
    componenti durante il montaggio, con conseguente scarto del componente.`,
    img_src: "/assets/images/jobs/scartomasp.png",
    esempio_job1_title: "Esempio di Job “Scarto",
    esempio_job1_text: `
    ;============================================
    [JOB 1]
    ;============================================
    Tipo job = scarto
    Nome job = Scarto componenti
    Salta job = 0
    ;----------------------------------------------------------------------------
    Numero scarti = 10
    Scarto 1 = Sensore resistivo
    Scarto 2 = Cablaggio per sensore
    Scarto 3 = Motore DC
    Scarto 4 = Cablaggio per motore DC
    Scarto 5 = Staffa fissaggio motore DC
    Scarto 6 = Copertura motore DC
    Scarto 7 = Motore stepper
    Scarto 8 = Cablaggio per motore stepper
    Scarto 9 = Staffa fissaggio motore stepper
    Scarto 10 = Copertura motore DC
    ;----------------------------------------------------------------------------`,
  },
  {
    title: "Visione",
    icona: "images/jobs/fotocamera.png",
    categoria: "Controllo di Qualità e Verifica",
    data_hal: [],
    nome_hal: "Vision",
    data_job: [],
    text: `Il job visione viene utilizzato per scattare una foto tramite una telecamera collegata alla
    piattaforma software, salvandola in una cartella su disco. Il nome dato all’immagine è
    composto da data ed ora di quando la foto è stata scattata.
    La telecamera utilizzata è S-VIEW, modello da 3 MPixel (2048 x 1563 pixel), con
    lunghezza focale ottica da 4 a 75 mm, angolo ottica 8.2° a 90° e interfaccia USB 2.0.
    A parte l’acquisizione delle immagini per il salvataggio su disco, l’applicativo MASP App
    ha la possibilità di eseguire operazioni di riconoscimento e classificazione di oggetti
    attraverso algoritmi proprietari inclusi della libreria VisionApi, che fa parte del del
    progetto software MASP.
    Immagini, messaggi per la condotta guidata ed i parametri di funzionamento sono tutti
    impostabili da file di configurazione del job.`,
    img_src: "/assets/images/jobs/visionemasp.png",
    esempio_job1_title: "Job visione per backup foto",
    esempio_job1_text: `
    ;============================================
    [JOB 1]
    ;============================================
    Tipo job = visione
    Nome job = Backup foto risultato incollaggio
    Salta job = 0
    Numero ripetizioni = 3
    ----------------------------------------------------------------------------
    Cartella immagini = C:\MASP\App Montaggio\Images\Visione
    Immagine = Verifica incollaggio.png
    ----------------------------------------------------------------------------
    Soglia visione = 103
    Numero verifiche = 3
    ----------------------------------------------------------------------------
    Salva immagini backup = 1
    Id immagine backup = 10
    Cartella immagini backup = C:\MASP\App Montaggio\Images\Visione\Backup
    ;----------------------------------------------------------------------------`,
  },
  {
    title: "Qualità",
    icona: "images/jobs/qualita.png",
    categoria: "Controllo di Qualità e Verifica",
    data_hal: [],
    nome_hal: "Qualità",
    data_job: [],
    text: ``,
    img_src: "/assets/images/jobs/qualitamasp.png",
    esempio_job1_title: "Job Qualità",
    esempio_job1_text: `
    ;============================================
    [JOB 1]
    ;============================================
    ;----------------------------------------------------------------------------`,
  },
  {
    title: "Quality Wall",
    icona: "images/jobs/qualita.png",
    categoria: "Controllo di Qualità e Verifica",
    data_hal: [],
    nome_hal: "Quality Wall",
    data_job: [],
    text: ``,
    img_src: "/assets/images/jobs/qualitywallmasp.png",
    esempio_job1_title: "Job Quality Wall",
    esempio_job1_text: `
    ;============================================
    [JOB 1]
    ;============================================
    ;----------------------------------------------------------------------------`,
  },


















  

  {
    title: "Logistica",
    icona: "images/jobs/stampa.png",
    categoria: "Gestione Produzione e Logistica",
    data_job: [],
    text: `Il job offre la possibilità all’operatore di dichiarare se i materiali per la lavorazione stanno
    scarseggiando, richiedendo quindi un rifornimento alla postazione di lavoro`,
    img_src: "/assets/images/jobs/logisticamasp.png",
    esempio_job1_title: "Esempio di Job “Logistica",
    esempio_job1_text: `
    ;============================================
    [JOB 1]
    ;============================================
    Tipo job = logistica
    Nome job = Componenti mancanti
    Salta job = 0
    ----------------------------------------------------------------------------
    Numero componenti mancanti = 10
    Componente 1 = Sensore resistivo
    Componente 2 = Cablaggio per sensore
    Componente 3 = Motore DC
    Componente 4 = Cablaggio per motore DC
    Componente 5 = Staffa fissaggio motore DC
    Componente 6 = Copertura motore DC
    Componente 7 = Motore stepper
    Componente 8 = Cablaggio per motore stepper
    Componente 9 = Staffa fissaggio motore stepper
    Componente 10 = Copertura motore DC
    ;----------------------------------------------------------------------------`,
  },

  {
    title: "Manutenzione",
    icona: "images/jobs/manutenzione.png",
    categoria: "Gestione Produzione e Logistica",
    data_job: [],
    text: `Il job offre la possibilità all’operatore di dichiarere se il macchinario per la lavorazione
    presenta problemi di funzionamento, che si dividono in “Macchina operativa”, ove la
    lavorazione del pezzo è ancora possibile, oppure “Macchina ferma”, il quale non
    permette il proseguimento del ciclo.`,
    img_src: "/assets/images/jobs/manutenzionemasp.png",
    esempio_job1_title: "Esempio di Job “Manutenzione”",
    esempio_job1_text: `
    ;============================================
    [JOB 1]
    ;============================================
    Tipo job = manutenzione
    Nome job = Manutenzione postazione
    Salta job = 0
    ----------------------------------------------------------------------------
    Numero causali = 10
    Causale 1 = Avvitatore Cleco non funzionante
    Causale 2 = Avvitatore Jolly non funzionante
    Causale 3 = Encoder posizione braccio non funzionante
    Causale 4 = Portabussole non funzionante
    Causale 5 = Lettore barcode non funzionante
    Causale 6 = Stampante non funzionante
    Causale 7 = Problemi all'impianto pneumatico
    Causale 8 = Problemi al PC di postazione
    Causale 9 = Problemi al Monitor/Touch screen
    Causale 10 = Fingerprint non funzionante
    ;----------------------------------------------------------------------------`,
  },
  {
    title: "Report",
    icona: "images/jobs/report.png",
    categoria: "Gestione Produzione e Logistica",
    data_hal: [],
    nome_hal: "Report",
    data_job: [],
    text: ``,
    img_src: "/assets/images/jobs/reportmasp.png",
    esempio_job1_title: "Job Report",
    esempio_job1_text: `
      ;============================================
      [JOB 1]
      ;============================================
      ;----------------------------------------------------------------------------`,
  },
  {
    title: "Stampa",
    icona: "images/jobs/stampa.png",
    categoria: "Gestione Produzione e Logistica",
    data_hal: [],
    nome_hal: "Stampa",
    data_job: [],
    text: ``,
    img_src: "/assets/images/jobs/stampamasp.png",
    esempio_job1_title: "Job Stampa",
    esempio_job1_text: `
      ;============================================
      [JOB 1]
      ;============================================
      ;----------------------------------------------------------------------------`,
  },


















  {
    title: "Bloccaggio",
    icona: "images/jobs/bloccaggio.png",
    categoria: "Gestione Postazioni e Procedure",
    data_job: [],
    text: `Il job bloccaggio è stato progettato per gestire lo spostamento di un cilindro pneumatico
    con delle elettrovalvole per il controllo dell'avanzamento in avanti e indietro, con il
    monitoraggio delle due posizioni attraverso sensori proximity. Questo metodo dispone
    inoltre di un ingresso di abilitazione e di uno per la gestione dello stato di emergenza.
    Il funzionamento del job prevede l’eventuale attesa di una conferma dell’avvio
    movimentazione da parte dell’operatore, seguita dall’attivazione dell'elettrovalvola che
    sarà disattivata una volta raggiunta la posizione tutto avanti. In caso di allarme rilevato
    attraverso l’ingresso denominato emergenza ripristinata, la movimentazione del cilindro
    viene fermata per ragioni di sicurezza.
    Le caratteristiche sono state arricchite con ingressi ausiliari per inizio e fine
    spostamento che, quando presenti, devono essere attivati insieme a quelli principali per
    poter considerare le relative posizioni valide. L’uscita principale è stata assegnata per
    gestire l’elettrovalvola del cilindro, mentre quella ausiliaria per altre periferiche che
    possono essere controllate. Altri ingressi supplementari personalizzano ulteriormente il
    funzionamento dell’operazione, rendendola uno dei più versatili della piattaforma MASP,
    in quanto permette di controllare le periferiche gestite dalla scheda grazie a semplici
    associazioni tra gli stati degli ingressi e delle uscite. È perciò possibile controllare
    un’uscita in base allo stato di un’ingresso sulla scheda, con la possibilità anche di non
    effettuare alcuna verifica di quest’ultimo ed effettuare direttamente il cambio di stato
    d’attivazione.
    Immagini, messaggi per la condotta guidata, uscite per elettrovalvole, ingressi per
    sensori, pulsante per conferma da parte dell’operatore e quello per lettura stato di
    emergenza sono tutti impostabili direttamente da file di configurazione del job. Non è
    previsto il file HAL.`,
    img_src: "/assets/images/jobs/bloccaggiomasp.png",
    esempio_job1_title:
      "Esempio di implementazione job Oggettivazione con bilancia",
    esempio_job1_text: `
    ;============================================
    [JOB 1]
    ;============================================
    Tipo job = bloccaggio
    Nome job = Braccio DX Avanti
    Salta job = 0
    ;-------------------------------------------------------------------------------
    Cartella immagine = C:\MASP\App Collaudo\Images\Bloccaggio
    Immagine = Braccio avanti.png
    ;-------------------------------------------------------------------------------
    Messaggio attesa inizio spostamento = Attesa condizioni iniziali Braccio DX Avanti
    Messaggio attesa fine spostamento = Attesa condizioni finali Braccio DX Avanti
    ;-------------------------------------------------------------------------------
    Ingresso emergenza ripristinata = 107
    ;-------------------------------------------------------------------------------
    Gestione spostamento = 1
    Ingresso abilitazione spostamento = 106
    Ingresso sensore inizio spostamento = 118
    Ingresso sensore inizio spostamento Aux = 0
    Ingresso sensore fine spostamento = 117
    Ingresso sensore fine spostamento Aux = 0
    Uscita driver spostamento = 106
    Uscita driver spostamento Aux = 0
    Uscita driver da disabilitare a inizio spostamento = 107
    Uscita driver spostamento attiva basso = 0
    Ignora gestione driver a inizio spostamento = 0
    Ignora gestione driver a fine spostamento = 0
    ;-------------------------------------------------------------------------------
    Firma torsiometro per imbocco = Tors_DX
    ;----------------------------------------------------------------------------`,
  },
  {
    title: "Jump",
    icona: "images/jobs/jump.png",
    categoria: "Gestione Postazioni e Procedure",
    data_job: [],
    text: `Il job jump viene utilizzato per passare ad un altro job presente sullo stesso file di
    configurazione.
    Questo job presenta tre logiche di funzionamento, scelte a seconda dei parametri
    utilizzati nel file di configurazione:
    - “Job successivo”: Il passaggio ad un altro job viene effettuato senza effettuare un
    controllo sull’esito del job precedente;
    - “Job successivo se esito precedente OK”, “Job successivo se esito precedente NOK”: Il passaggio ad un altro job viene
    effettuato a seconda dell’esito restituito dal job precedente, potendo saltare ad
    un job diverso in caso quest’ultimo sia stato positivo o negativo. Attualmente questa modalità di funzionamento è compatibile soltanto con il job
    “Oggettivazione”;
    - “Fine lavorazione”: Non viene effettuato un passaggio ad un altro job ma il ciclo
    di lavorazione viene chiuso prematuramente, simulando il raggiungimento
    dell’ultimo job.`,
    esempio_job1_title: "Esempio di job che simula la fine del ciclo",
    esempio_job1_text: `
    ;============================================
    [JOB 1]
    ;============================================
    Tipo job = jump
    Nome job = Fine lavorazione
    Salta job = 0
    ;--------------------------------------------------------------------------
    Fine lavorazione = 1
    ;----------------------------------------------------------------------------`,
    esempio_job2_title:
      "Esempio di job che effettua il passaggio ad un job diverso",
    esempio_job2_text: `
    ;============================================
    [JOB 1]
    ;============================================
    Tpo job = jump
    Nome job = Fine lavorazione
    Salta job = 0
    ;--------------------------------------------------------------------------
    Job successivo = 10
    ;----------------------------------------------------------------------------`,
    esempio_job3_title:
      "Esempio di file config che effettua il passaggio a job diversi a seconda dell’esito del job precedente",
    esempio_job3_text: `
    ;============================================
    [JOB 1]
    ;============================================
    Tipo job = oggettivazione
    Nome job = Verifica visiva con pulsanti OK e NOK
    Salta job = 0
    ----------------------------------------------------------------------------
    Cartella immagine = C:\MASP\App Montaggio\Images\Oggettivazione
    ;----------------------------------------------------------------------------
    Immagine = carter.jpg
    Messaggio = Verifica carter motore e premere "OK" o "NOK"
    Tempo minimo visualizzazione messaggio = 1000
    ;----------------------------------------------------------------------------
    Utilizza pulsanti OK e NOK = 1
    Continua ciclo se NOK premuto = 1
    Testo pulsante OK = Verifica OK
    Testo pulsante NOK = Verifica NOK
    Aggiungi testo pulsante a nome file report = 1
    ;--------------------------------------------------------------------------
    Risultato in report = 1
    Risultato in etichetta = 0

    ;============================================
    [JOB 2]
    ;============================================
    Tipo job = jump
    Nome job = Fine lavorazione
    Salta job = 0
    ;--------------------------------------------------------------------------
    Job successivo se esito precedente OK = 3
    Job successivo se esito precedente NOK = 4

    ;============================================
    [JOB 3]
    ;============================================
    Tipo job = oggettivazione
    Nome job = Verifica visiva OK
    Salta job = 0
    ;----------------------------------------------------------------------------
    Cartella immagine = C:\MASP\App Montaggio\Images\Oggettivazione
    ;----------------------------------------------------------------------------
    Immagine = carter.jpg
    Messaggio = Proseguire con la lavorazione
    [JOB 4]
    Tipo job = oggettivazione
    Nome job = Verifica visiva NOK
    Salta job = 0
    ;----------------------------------------------------------------------------
    Cartella immagine = C:\MASP\App Montaggio\Images\Oggettivazione
    ;----------------------------------------------------------------------------
    Immagine = carter.jpg
    Messaggio = Verificare e risolvere il problema ritrovato
    ;----------------------------------------------------------------------------`,
  },

  {
    title: "Timer",
    icona: "images/jobs/timer.png",
    categoria: "Gestione Postazioni e Procedure",
    img_src: "/assets/images/jobs/timermasp.png",
    data_job: [],
    text: `Il job timer viene utilizzato per impostare una determinata quantità di tempo, durante il
    quale, configurando il parametro “Modalita di funzionamento”, è possibile applicare una
    delle seguenti logiche di funzionamento:
    - “normale”: Il timer viene avviato contando alla rovescia una quantità di secondi
    preimpostata da file, mettendo in pausa il ciclo e proseguendo con la lavorazione
    solo allo scadere del tempo d’attesa;
    - “background”: Il timer viene avviato contando alla rovescia una quantità di
    secondi preimpostata da file, permettendo al ciclo di proseguire normalmente
    mentre il conteggio viene continua in background.
    - “normale con timeout”: Il timer viene avviato contando alla rovescia una quantità
    di secondi preimpostata da file. Durante il conteggio è possibile inviare un input
    da interfaccia utente per fermare il timer e proseguire con il ciclo. Nel caso in cui
    l’input non venga inviato entro il tempo limite, il job finisce con esito negativo.
    Durante il conteggio del timer è possibile gestire lo stato di un’uscita della scheda
    IO24ADC, tenendola attiva fino allo scadere del tempo.
    Immagini, messaggi per la condotta guidata ed i parametri di funzionamento sono tutti
    impostabili da file di configurazione del job.`,
    esempio_job1_title: "Esempio di file.ini",
    esempio_job1_text: `
    ;============================================
    [JOB 1]
    ;============================================
    Tipo job = timer
    Nome job = Gestione timer
    Salta job = 0
    ;----------------------------------------------------------------------------
    Cartella immagine = C:\MASP\App Montaggio\Images\Timer
    Immagine = Clepsidra.jpg
    ;----------------------------------------------------------------------------
    Messaggio = Attesa fine timer
    Modalita di funzionamento = normale
    Tempo attesa = 30
    Gestisci uscita = 1
    Uscita = 8
    ;----------------------------------------------------------------------------`,
  },
  {
    title: "Paranco",
    icona: "images/jobs/paranco.png",
    categoria: "Gestione Postazioni e Procedure",
    data_hal: [],
    nome_hal: "Paranco",
    data_job: [],
    text: ``,
    img_src: "/assets/images/jobs/parancomasp.png",
    esempio_job1_title: "Job Paranco",
    esempio_job1_text: `
      ;============================================
      [JOB 1]
      ;============================================
      ;----------------------------------------------------------------------------`,
  },
  {
    title: "Input Output",
    icona: "images/jobs/inputoutput.png",
    categoria: "Gestione Postazioni e Procedure",
    data_hal: [],
    nome_hal: "Input Output",
    data_job: [],
    text: ``,
    img_src: "/assets/images/jobs/inputoutputmasp.png",
    esempio_job1_title: "Job Input Output",
    esempio_job1_text: `
      ;============================================
      [JOB 1]
      ;============================================
      ;----------------------------------------------------------------------------`,
  },
  {
    title: "Bench",
    icona: "images/jobs/inputoutput.png",
    categoria: "Altro",
    data_hal: [],
    nome_hal: "Bench",
    data_job: [],
    text: ``
  },
  {
    title: "Lift",
    icona: "images/jobs/inputoutput.png",
    categoria: "Altro",
    data_hal: [],
    nome_hal: "Lift",
    data_job: [],
    text: ``
  },
  {
    title: "Support",
    icona: "images/jobs/inputoutput.png",
    categoria: "Altro",
    data_hal: [],
    nome_hal: "Support",
    data_job: [],
    text: ``
  },



































];
