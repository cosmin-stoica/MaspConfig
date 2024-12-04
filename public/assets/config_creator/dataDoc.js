window.dataDoc = [
  {
    Name: "Avvitatura",
    Group: "Automazione e Assemblaggio",
    HalName: "HAL Config Avvitatura.ini",
    Hal: [
      { nome: "bIsUsedAvv1", tipo: "boolean", tooltip: "desc" },
      { nome: "bIsUsedAvv2", tipo: "boolean", tooltip: "desc" },
    ],
    Hal_Aux1: [
      {nome: "Nome programma", tipo: "string", tooltip:"Indica il numero di programmi di avvitatura presenti all’interno del file."},
      {nome: "Modello avvitatore",tipo: "string",tooltip:"Indica il modello dell’avvitatore che deve essere una tra i seguenti: Cleco, Cleco LW, Jolly e Kolver.",},
      {nome: "Numero viti",tipo: "intero",tooltip: "Numero di vitto da serrare durante il job.",},
      {nome: "Gruppo produzione",tipo: "intero", tooltip:"Parametro da inviare alla centralina per indicare la configurazione da utilizzare contenente ad esempio la coppia di serraggio e gli angoli finali con le relative tolleranza etc.",},
      {nome: "Coppia chiusura", tipo: "double", tooltip:"Coppia di chiusura da visualizzare nel pannello principale. Deve essere uguale al parametro con cui viene programmata la centralina",},
      {nome: "Bussola", tipo: "boolean", tooltip: "La posizione della bussola prelevare,",},
      {nome: "Numero ripetizioni",tipo: "intero", tooltip:"Numero di ripetizioni consentite in caso di serraggio con errore sulla stessa vite prima di finire il ciclo con esito NOK.",},
      {nome: "Controllo posizione", tipo: "boolean",tooltip: "Indica se il controllo della posizione di serraggio con braccio con encoder è abilitato.",},
      {nome: "Tolleranza X",tipo: "intero",tooltip: "Tolleranza in mm sull’asse X",},
      {nome: "Tolleranza Y",tipo: "intero",tooltip: "Tolleranza in mm sull’asse Y",},
      {nome: "Tolleranza Z",tipo: "intero",tooltip: "Tolleranza in mm sull’asse Z",},
    ],
    Hal_Aux2: [{ nome: "bIsUsed2", tipo: "boolean", tooltip: "desc" }],
    Hal_Aux3: [{ nome: "bIsUsed3", tipo: "boolean", tooltip: "desc" }],
    Job: [
      { nome: "bIsUsedAvv1", tipo: "boolean", tooltip: "desc" },
      { nome: "bIsUsedAvv2", tipo: "boolean", tooltip: "desc" },
    ],
    Diagnostica: [
      { nome: "bIsUsedAvv1", descrizione: "desc" },
      { nome: "bIsUsedAvv2", descrizione: "desc" },
    ]
  },
  {
    Name: "Rivettatura",
    Group: "Automazione e Assemblaggio",
    HalName: "HAL Config Rivet.ini",
    Hal: [
      { nome: "bIsUsed", tipo: "boolean", tooltip: "desc" },
      { nome: "bIsShowConfigEnable", tipo: "boolean", tooltip: "desc" },
      { nome: "bIsLogEnable", tipo: "boolean", tooltip: "desc" },
    ],
    Job: [
      { nome: "bIsUsedRiv1", tipo: "boolean", tooltip: "desc" },
      { nome: "bIsUsedRiv2", tipo: "boolean", tooltip: "desc" },
    ],
    Diagnostica: [
      { nome: "bIsUsedRiv1", descrizione: "desc" },
      { nome: "bIsUsedRiv2", descrizione: "desc" },
    ]
  },
  {
    Name: "Jump",
    Group: "Gestione delle postazioni e delle procedure",
    HalName: "HAL Config Jump.ini",
    Hal: [
      { nome: "bIsUsedJump1", tipo: "boolean", tooltip: "desc" },
      { nome: "bIsUsedJump2", tipo: "boolean", tooltip: "desc" },
    ],
    Job: [
      { nome: "bIsUsedJump1", tipo: "boolean", tooltip: "desc" },
      { nome: "bIsUsedJump2", tipo: "boolean", tooltip: "desc" },
    ],
    Diagnostica: [
      { nome: "bIsUsedJump1", descrizione: "desc" },
      { nome: "bIsUsedJump2", descrizione: "desc" },
    ]
  },
  {
    Name: "Airbag",
    Group: "Collaudo Componenti Automotive",
    HalName: "HAL Config Airbag.ini",
    Hal: [
      { nome: "bIsUsed", tipo: "boolean", tooltip: "desc" },
      { nome: "bIsShowConfigEnable", tipo: "boolean", tooltip: "desc" },
      { nome: "bIsLogEnable", tipo: "boolean", tooltip: "desc" },
      { nome: "divisore", tipo: "divisore", tooltip: "desc" },
      { nome: "nIN_BIT_AIRBAG_GND_WIRE", tipo: "intero", tooltip: "desc" },
      { nome: "nOUT_BIT_AIRBAG_ENABLE", tipo: "intero", tooltip: "desc" },
      { nome: "nADC_INDEX_AIRBAG", tipo: "intero", tooltip: "desc" },
      { nome: "dAirbagDivVcc", tipo: "double", tooltip: "desc" },
      { nome: "dAirbagDivResUp", tipo: "double", tooltip: "desc" },
      { nome: "dAirbagAdcMaxVoltage", tipo: "double", tooltip: "desc" },
      { nome: "dAirbagResMin", tipo: "double", tooltip: "desc" },
      { nome: "dAirbagResMax", tipo: "double", tooltip: "desc" },
      { nome: "dAirbagResWire", tipo: "double", tooltip: "desc" },
    ],
    Job: [
      { nome: "bIsUsedAirbag1", tipo: "boolean", tooltip: "desc" },
      { nome: "bIsUsedAirbag2", tipo: "boolean", tooltip: "desc" },
    ],
    Diagnostica: [
      { nome: "bIsUsedAirbag1", descrizione: "desc" },
      { nome: "bIsUsedAirbag2", descrizione: "desc" },
    ]
  },
  {
    Name: "Bench",
    Group: "Altro",
    HalName: "HAL Config Bench.ini",
    Hal: [
      { nome: "bIsUsed", tipo: "boolean", tooltip: "desc" },
      { nome: "bIsShowConfigEnable", tipo: "boolean", tooltip: "desc" }
    ],
    Job: [
      { nome: "bIsUsedAirbag1", tipo: "boolean", tooltip: "desc" },
      { nome: "bIsUsedAirbag2", tipo: "boolean", tooltip: "desc" },
    ],
    Diagnostica: [
      { nome: "bIsUsedAirbag1", descrizione: "desc" },
      { nome: "bIsUsedAirbag2", descrizione: "desc" },
    ]
  },
];
