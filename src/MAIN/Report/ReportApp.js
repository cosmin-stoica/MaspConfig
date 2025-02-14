import { HashRouter } from "react-router-dom";
import { PathProvider, usePath } from "../Config/PathContext";
import AppRoutes from "./Routes";
import ReportNavBar from "../../UI/globals/reportNavbar";
import { useEffect, useRef, useState } from "react";
import LoaderReport from "../../UI/globals/loader_report";

function ReportAppToIndex({ setIsLoading }) {
  const { path } = usePath();
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!path || hasStarted.current) return;

    hasStarted.current = true;
    const pathToSearch = `${path}\\Report`;
    const pathToSave = `${path}\\Masp Tools\\FileIndex\\fileIndex.json`;

    const updateIndex = async () => {
      setIsLoading(true); // Imposta lo stato di caricamento all'inizio dell'operazione
      console.log("Inizio aggiornamento indice...");

      try {
        await window.electron.indexFilesAndFolders(pathToSearch, pathToSave);
        console.log("Indice aggiornato correttamente.");
      } catch (error) {
        console.error("Errore durante l'aggiornamento dell'indice:", error);
      } finally {
        setTimeout(() => setIsLoading(false), 500); // Aggiungi un piccolo delay per evitare flickering
        console.log("Caricamento completato, stato aggiornato.");
      }
    };

    updateIndex();
  }, [path, setIsLoading]);

  return null;
}


function ReportApp({isReport}) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <HashRouter>
      <PathProvider isReport={isReport}>
        <div className="App">
          {isLoading && <LoaderReport />}
          {!isLoading && (
            <>
              <ReportNavBar activeNavbar={true} />
              <AppRoutes />
            </>
          )}
          {/* ReportAppToIndex usa il contesto dopo che PathProvider è montato */}
          <ReportAppToIndex setIsLoading={setIsLoading} />
        </div>
      </PathProvider>
    </HashRouter>
  );
}

export default ReportApp;
