import React, { useState } from 'react';

function ProvaFS() {
    const [files, setFiles] = useState([]);
    const [folderPath, setFolderPath] = useState('');
    const [fileContent, setFileContent] = useState(''); // Stato per il contenuto del file

    const handleFetchFiles = async () => {
        if (folderPath) {
            const result = await window.electron.getFiles(folderPath); // Ottiene i file dalla cartella
            setFiles(result);
        }
    };

    const handleOpenFile = async (fileName) => {
        const filePath = `${folderPath}/${fileName}`; // Percorso completo del file
        const content = await window.electron.readFile(filePath); // Legge il contenuto del file
        setFileContent(content); // Imposta il contenuto nella textarea
    };

    return (
        <div className="bg-dark">
            <input
                type="text"
                placeholder="Inserisci il percorso della cartella"
                value={folderPath}
                onChange={(e) => setFolderPath(e.target.value)}
            />
            <button onClick={handleFetchFiles}>Carica file</button>
            <ul>
                {files.map((file, index) => (
                    <div key={index}>
                        <li>{file}</li>
                        <button onClick={() => handleOpenFile(file)}>Apri file</button>
                    </div>
                ))}
            </ul>
            <textarea
                rows="10"
                cols="50"
                value={fileContent}
                readOnly
                placeholder="Contenuto del file"
            ></textarea>
        </div>
    );
}

export default ProvaFS;
