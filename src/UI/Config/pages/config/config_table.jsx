import React from "react";

function ConfigTable({ files }) {
    const getFileType = (fileName) => {
        if (fileName.includes('.')) {
            const extension = fileName.split('.').pop().toLowerCase();
            switch (extension) {
                case "ini":
                    return "Ini";
                case "txt":
                    return "Txt";
                default:
                    return extension.toUpperCase();
            }
        }
        return "Directory";
    };
    

    return (
        <table className="config_table">
            <thead>
                <tr>
                    <th></th>
                    <th>File Name</th>
                    <th>File Type</th>
                </tr>
            </thead>
            <tbody>
                {files.map((file, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{file}</td>
                        <td>{getFileType(file)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default ConfigTable;
