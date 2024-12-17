import { useEffect, useState } from "react";
import { usePath } from "../../PathContext";

export default function JobVisualizer({ JobData }) {

    const { path } = usePath();
    const [fileParsed, setFileParsed] = useState(null);

    useEffect(() => {
        const parseIniFile = async () => {
            const filePath = `${path}/Config/${JobData.nomeFile}`;
            const fileParsed = await window.electron.parseIniFile(filePath);
            setFileParsed(fileParsed)
            console.log(fileParsed)
        };

        parseIniFile();
    }, []);

    return (
        <>
            <div className="JobVisualizer_MainDiv">
                {JobData.nomeFile}
            </div>
        </>
    );

};