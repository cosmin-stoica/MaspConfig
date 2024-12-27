import { usePath } from "../../../../MAIN/Config/PathContext";
import { useEffect, useState } from "react";
import ConfigTable from "./config_table";
import ConfigIllustrator from "./config_illustrator";

function Config() {
    const { path } = usePath();
    const [files, setFiles] = useState([]);

    const allowedFiles = [
        "Hardware Config.ini",
        "Login.ini",
        "Main Config.ini",
        "ODP Config.ini",
        "Report Config.ini",
        "Rework Config.ini",
        "Programmi di avvitatura.ini"
    ];

    const handleFetchFiles = async () => {
        if (path) {
            const configPath = `${path}\\config`;
            const result = await window.electron.getFiles(configPath);
            const filteredFiles = result.filter(file => allowedFiles.includes(file));
            /*const filteredFiles = result;*/
            setFiles(filteredFiles);
        }
    };

    useEffect(() => {
        handleFetchFiles();
    }, [path]);

    return (
        <div className="bg_main width100 min-height100vh height100 pb-50 flex-center-column c-white">
            {/*<div className="config_upper_table">
                <ConfigTable files={files} />
            </div>*/}
            <div className="ConfigIllustrator_Container_Upper ">
                <ConfigIllustrator files={files} />
            </div>
        </div>
    );
}

export default Config;
