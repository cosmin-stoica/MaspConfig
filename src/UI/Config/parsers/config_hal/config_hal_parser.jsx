import { useEffect, useState } from "react";
import { usePath } from "../../../../MAIN/Config/PathContext";
import { useLocation, useNavigate } from "react-router";
import ConfigParserViewer from "./config_hal_parser_viewer";
import { TbArrowLeft } from "react-icons/tb";
import Loader from "../../../globals/loader";
import ComingSoon from "../../../globals/coming_soon";
import ReportJson from "./jsons/Report Config.json";

export default function ConfigHalParser({ activeNavbar, onSetActive }) {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const configName = queryParams.get("config");
  const groupName = queryParams.get("group_name");
  const configIcon = queryParams.get("config_icon");
  const isHal = queryParams.get("isHal") === "true";
  const isAvv = queryParams.get("isAvv") === "true";
  const isReportApp = (queryParams.get("isReportApp") || "").toLowerCase() === "true";

  const [isLoading, setIsLoading] = useState(true);
  const { path } = usePath();
  // Imposto il realFile inizialmente a null (invece di un array vuoto) per evitare conflitti nei controlli di render
  const [realFile, setRealFile] = useState(null);
  const [dummy, setDummy] = useState(null);

  useEffect(() => {
    // Funzione delay che restituisce una Promise che si risolve dopo ms millisecondi
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    // Poiché ReportJson è importato staticamente, lo incapsuliamo in una Promise se vogliamo usarlo in modalità asincrona
    const loadReportJson = () => Promise.resolve(ReportJson);

    // Funzione per caricare il file reale
    const loadFiles = async () => {
      console.log("[loadFiles] Avvio caricamento realFile...");
      try {
        if (isHal) {
          const dummyFilePath = `${path}/Config/Hardware Config/${configName}.ini`;
          const realFileData = await window.electron.parseIniFile(dummyFilePath);
          console.log("[loadFiles] Real file (isHal) caricato:", realFileData);
          setRealFile(realFileData);
        } else {
          const filePath = `${path}/Config/${configName}.ini`;
          const realFileData = await window.electron.parseIniFile(filePath);
          console.log("[loadFiles] Real file caricato:", realFileData);
          setRealFile(realFileData);
        }
      } catch (err) {
        console.error("[loadFiles] Errore durante il caricamento dei file real:", err);
      }
    };

    // Funzione per caricare il file dummy
    const loadDummyFile = async () => {
      console.log("[loadDummyFile] Avvio caricamento dummy...");
      try {
        if (isReportApp) {
          const parsedData = await loadReportJson();
          console.log("[loadDummyFile] Dummy file (ReportApp) caricato:", parsedData);
          setDummy(parsedData);
        } else {
          if (isHal) {
            const filePath = `${path}/Masp Tools/Dummies/Hardware Config/${configName}.ini`;
            const dummyData = await window.electron.parseIniFile(filePath);
            console.log("[loadDummyFile] Dummy file (isHal) caricato:", dummyData);
            setDummy(dummyData);
          } else {
            const filePath = `${path}/Masp Tools/Dummies/${configName}.ini`;
            const dummyData = await window.electron.parseIniFile(filePath);
            console.log("[loadDummyFile] Dummy file caricato:", dummyData);
            setDummy(dummyData);
          }
        }
      } catch (error) {
        console.error("[loadDummyFile] Errore durante il caricamento del file dummy:", error);
      }
    };

    // Funzione specifica per il caso in cui isAvv sia true
    const loadAvvFiles = async () => {
      console.log("[loadAvvFiles] Avvio caricamento in modalità Avv...");
      try {
        const realFilePath = `${path}/Config/${configName}.ini`;
        const dummyFilePath = `${path}/Masp Tools/Dummies/${configName}.ini`;
        const [realFileData, dummyFileData] = await Promise.all([
          window.electron.parseIniFile(realFilePath),
          window.electron.parseIniFile(dummyFilePath),
        ]);
        console.log("[loadAvvFiles] Real file (Avv) caricato:", realFileData);
        console.log("[loadAvvFiles] Dummy file (Avv) caricato:", dummyFileData);
        setRealFile(realFileData);
        if (!realFileData || !dummyFileData) {
          console.error("[loadAvvFiles] Dati mancanti in modalità Avv");
          return;
        }
        // Genera i programmi dummy basandosi sul numero di PROGRAMMA presenti nel file reale
        const numeroProgrammi = Object.keys(realFileData).filter((key) =>
          key.startsWith("PROGRAMMA")
        ).length;
        const baseDummy = dummyFileData["PROGRAMMA 1"];
        const generatedDummy = {
          ...dummyFileData,
          "SEZIONE GENERALE": dummyFileData["SEZIONE GENERALE"],
        };
        for (let i = 1; i <= numeroProgrammi; i++) {
          generatedDummy[`PROGRAMMA ${i}`] = { ...baseDummy };
        }
        setDummy(generatedDummy);
      } catch (error) {
        console.error("[loadAvvFiles] Errore durante il caricamento in modalità Avv:", error);
      }
    };

    const loadEverything = async () => {
      try {
        if (!isAvv) {
          // Avvia il caricamento di realFile e dummy in parallelo
          await Promise.all([loadFiles(), loadDummyFile()]);
        } else {
          await loadAvvFiles();
        }
        // Forza un delay di 500ms dopo il completamento di tutte le operazioni
        await delay(500);
      } catch (error) {
        console.error("[loadEverything] Errore durante il caricamento:", error);
      } finally {
        setIsLoading(false);
        console.log("[loadEverything] Caricamento completato.");
      }
    };

    loadEverything();
  }, [path, isAvv, isHal, isReportApp, configName]);

  return (
    <>
      {!realFile && (
        <div className="bg_main width100 height100 min-height100vh c-white flex-center-column">
          <ComingSoon />
          <p>Configurazione {configName}.ini non presente</p>
        </div>
      )}
      {!dummy && (
        <div className="bg_main width100 height100 min-height100vh c-white flex-center-column">
          <ComingSoon />
          <p>File Dummy non disponibile</p>
        </div>
      )}
      {isLoading && <Loader />}
      {!isHal && dummy && realFile && (
        <ConfigParserViewer
          isReportApp={isReportApp}
          activeNavbar={activeNavbar}
          onSetActive={onSetActive}
          isAvv={isAvv}
          dummyFile={dummy}
          realFile={realFile}
          configName={configName}
          configIcon={configIcon}
        />
      )}
      {isHal && dummy && (
        <div className="HalParser_MainDiv bg_main width100 height100 min-height100vh c-white">
          <div>
            {dummy ? (
              <ConfigParserViewer
                isReportApp={isReportApp}
                onSetActive={onSetActive}
                isHal={true}
                dummyFile={dummy}
                realFile={realFile}
                configName={configName}
                groupName={groupName}
                configIcon={configIcon}
              />
            ) : (
              <div className="width100 flex-center-row height100vh">
                Configurazione non presente
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
