import { useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { usePath } from "../../PathContext";
import ini from "ini";
import HalParserViewer from "./hal_parser_viewer";
import { TbArrowLeft } from "react-icons/tb";


export default function HalParser() {

  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const configName = queryParams.get("config");
  const groupName = queryParams.get("group_name");
  const ConfigIcon = queryParams.get("config_icon");

  const { path } = usePath();
  const [realFile, setRealFile] = useState([]);
  const [dummy, setDummy] = useState(null);

  const handleBackClick = () => {
    navigate(`/hal?group_name=${encodeURIComponent(groupName)}`);
  }

  useEffect(() => {
    const loadFiles = async () => {
      try {
        const dummyFilePath = `${path}/Config/Hardware Config/${configName}.ini`;
        const realFile = await window.electron.parseIniFile(dummyFilePath);
        setRealFile(realFile);
      } catch (err) {
        console.error("Errore durante il caricamento dei file:", err);
      }
    };

    const loadDummyFile = async () => {
      try {
        const filePath = `${path}/Config/Dummies/hal/${configName}.ini`;
        const parsedData = await window.electron.parseIniFile(filePath);
    
        if (!parsedData) {
          console.error("Errore: il file INI non è stato parsato correttamente.");
          setDummy(null);
          return;
        }
    
        setDummy(parsedData);
        console.log(parsedData);
      } catch (error) {
        console.error("Errore durante il caricamento del file dummy:", error);
      }
    };
    


    loadFiles();
    loadDummyFile();
  }, [path]);

  return (
    <div className="HalParser_MainDiv bg_main width100 height100 min-height100vh c-white">
      <button className="Hal_Config_Back_Btn" onClick={handleBackClick}>
        <TbArrowLeft/> 
      </button>
      <div>
        {dummy ?
          <HalParserViewer dummyFile={dummy} realFile={realFile} configName={configName} groupName={groupName} configIcon={ConfigIcon} /> :
          <div className="width100 flex-center-row height100vh">Configurazione non presente</div>}
      </div>
    </div>
  );

};
