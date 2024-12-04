import React, { useState, useEffect } from 'react';

const PrendiParametriDoc = () => {
    const [fileContent, setFileContent] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        console.log(fileContent);
    }, [fileContent]); // Esegue il log ogni volta che fileContent viene aggiornato

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const json = JSON.parse(e.target.result);
                setFileContent(Array.isArray(json) ? json : [json]);
                setErrorMessage(""); // Resetta il messaggio di errore
            } catch (error) {
                console.error('Errore nel parsing del file JSON:', error);
                setErrorMessage("Errore nel parsing del file JSON");
                setFileContent([]); // Resetta il contenuto del file
            }
        };

        if (file) {
            reader.readAsText(file);
        }
    };

    const jsonToJS = (obj) => {
        if (Array.isArray(obj)) {
            return `[${obj.map(jsonToJS).join(', ')}]`;
        } else if (typeof obj === 'object' && obj !== null) {
            return `{${Object.keys(obj).map(key => `${key}: ${jsonToJS(obj[key])}`).join(', ')}}`;
        } else if (typeof obj === 'string') {
            return `"${obj.replace(/"/g, '\\"')}"`;
        }
        return obj;
    };

    const downloadFile = () => {
        const fileData = `window.dataDoc = ${jsonToJS(fileContent)};`;
        const blob = new Blob([fileData], { type: 'application/javascript' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'dataDoc.js';
        a.click();
        URL.revokeObjectURL(url);
    };

    const renderJsonContent = () => {
        return fileContent.map((item, index) => (
            <div key={index} className="item-container">
                <h2>{item.Name}</h2>
                <div className="hal-section">
                    <h3>Hal</h3>
                    {item.Hal.map((halItem, halIndex) => (
                        <div key={halIndex} className="hal-item">
                            <p><strong>Nome:</strong> {halItem.nome}</p>
                            <p><strong>Tipo:</strong> {halItem.tipo}</p>
                            <p><strong>Tooltip:</strong> {halItem.tooltip}</p>
                        </div>
                    ))}
                </div>
                <div className="job-section">
                    <h3>Job</h3>
                    {item.Job.map((jobItem, jobIndex) => (
                        <div key={jobIndex} className="job-item">
                            <p><strong>Nome:</strong> {jobItem.nome}</p>
                            <p><strong>Tipo:</strong> {jobItem.tipo}</p>
                            <p><strong>Tooltip:</strong> {jobItem.tooltip}</p>
                        </div>
                    ))}
                </div>
                <div className="diagnostica-section">
                    <h3>Diagnostica</h3>
                    {item.Diagnostica.map((diagnosticaItem, jobIndex) => (
                        <div key={jobIndex} className="job-item">
                            <p><strong>Nome:</strong> {diagnosticaItem.nome}</p>
                            <p><strong>Descrizione:</strong> {diagnosticaItem.descrizione}</p>
                        </div>
                    ))}
                </div>
                <div className="diagnostica-section">
                    <h3>Aux1</h3>
                    {item.Hal_Aux1 && item.Hal_Aux1.map((Aux1Item, jobIndex) => (
                        <div key={jobIndex} className="job-item">
                            <p><strong>Nome:</strong> {Aux1Item.nome}</p>
                            <p><strong>Tipo:</strong> {Aux1Item.tipo}</p>
                            <p><strong>Tooltip:</strong> {Aux1Item.tooltip}</p>
                        </div>
                    ))}
                </div>
                <div className="diagnostica-section">
                    <h3>Aux2</h3>
                    {item.Hal_Aux2 && item.Hal_Aux2.map((Aux2Item, jobIndex) => (
                        <div key={jobIndex} className="job-item">
                            <p><strong>Nome:</strong> {Aux2Item.nome}</p>
                            <p><strong>Tipo:</strong> {Aux2Item.tipo}</p>
                            <p><strong>Tooltip:</strong> {Aux2Item.tooltip}</p>
                        </div>
                    ))}
                </div>
                <div className="diagnostica-section">
                    <h3>Aux3</h3>
                    {item.Hal_Aux3 && item.Hal_Aux3.map((Aux3Item, jobIndex) => (
                        <div key={jobIndex} className="job-item">
                            <p><strong>Nome:</strong> {Aux3Item.nome}</p>
                            <p><strong>Tipo:</strong> {Aux3Item.tipo}</p>
                            <p><strong>Tooltip:</strong> {Aux3Item.tooltip}</p>
                        </div>
                    ))}
                </div>
            </div>
        ));
    };

    return (
        <>
        <div className='paneprincipalepostazioni perflexcolumn position-relative color-white'>
            <input type="file" accept=".json" onChange={handleFileUpload} />
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {fileContent.length > 0 && (
                <>
                    <div className="json-content">
                        {renderJsonContent()}
                    </div>
                    <button onClick={downloadFile}>Scarica File</button>
                </>
            )}
        </div>






        





        </>
    );
};

export default PrendiParametriDoc;
