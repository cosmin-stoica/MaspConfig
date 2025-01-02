import { HashRouter } from "react-router-dom";
import { PathProvider } from "../Config/PathContext";
import AppRoutes from "./Routes";
import ReportNavBar from "../../UI/globals/reportNavbar";
import { useEffect } from "react";
import { usePath } from "../Config/PathContext";

function ReportApp() {
  function ReportAppToIndex() {
    const { path } = usePath();
    useEffect(() => {
      const pathToSearch = `${path}\\ReportCollaudo`;
      const pathToSave = `${path}\\ReportCollaudo\\fileIndex.json`;

      const updateIndex = async () => {
        try {
          await window.electron.indexFilesAndFolders(pathToSearch, pathToSave);
        } catch (error) {
          console.error("Errore durante l'aggiornamento dell'indice:", error);
        }
      };

      updateIndex();
      console.log("Updated!");
    }, []);
    return <></>;
  }

  return (
    <HashRouter>
      <PathProvider>
        <div className="App">
          <ReportNavBar activeNavbar={true} />
          <AppRoutes />
          <ReportAppToIndex />
        </div>
      </PathProvider>
    </HashRouter>
  );
}

export default ReportApp;
