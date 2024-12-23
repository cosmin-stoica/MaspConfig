import { useEffect, useState } from "react";
import { usePath } from "../../../MAIN/Config/PathContext";

export default function ListaReport() {
  const [files, setFiles] = useState([]);
  const [currentPath, setCurrentPath] = useState("");
  const [pathHistory, setPathHistory] = useState([]);
  const { path } = usePath();
  const pathToSearch = `${path}/Report`;

  const loadFiles = async (folderPath) => {
    try {
      const filesAndFolders = await window.electron.getAllFilesAndFolders(folderPath);
      setFiles(filesAndFolders);
      setCurrentPath(folderPath);
    } catch (error) {
      console.error("Errore durante la lettura dei file:", error);
    }
  };

  useEffect(() => {
    setPathHistory([]);
    loadFiles(pathToSearch);
  },[])

  const handleFolderClick = (folderPath) => {
    setPathHistory((prevHistory) => [...prevHistory, currentPath]);
    loadFiles(folderPath);
  };

  const handleGoBack = () => {
    if (pathHistory.length > 0) {
      const previousPath = pathHistory[pathHistory.length - 1];
      setPathHistory((prevHistory) => prevHistory.slice(0, -1));
      loadFiles(previousPath);
    }
  };

  return (
    <div className="dashboard_report_div bg_main c-white pt-100">
      {pathHistory.length > 0 && (
        <button onClick={handleGoBack}>Indietro</button>
      )}
      <ul>
        {files.map((file, index) => (
          <li
            key={index}
            onClick={() => file.isFolder && handleFolderClick(file.fullPath)}
            style={{ cursor: file.isFolder ? "pointer" : "default" }}
          >
            {file.isFolder ? `📁 ${file.name}` : `📄 ${file.name}`}
          </li>
        ))}
      </ul>
    </div>
  );
}
