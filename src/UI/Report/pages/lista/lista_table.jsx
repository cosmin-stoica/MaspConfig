export default function ListaTable({ files, handleFolderClick, handleFileClick }) {
    return (
        <>
            <table className="table_lista_report">
                <thead>
                    <tr>
                        <th style={{ padding: "8px" }}></th>
                        <th style={{ padding: "8px" }}>Nome</th>
                        <th style={{ padding: "8px" }}>Data</th>
                        <th style={{ padding: "8px" }}>Codice</th>
                        <th style={{ padding: "8px" }}>Progressivo</th>
                        <th style={{ padding: "8px" }}>Operatore</th>
                    </tr>
                </thead>
                <tbody>
                    {files.map((file, index) => (
                        <tr
                            key={index}
                        >
                            <td>
                                <div
                                    className="table_lista_report_icon_folder_file"
                                    onClick={() =>
                                        file.isFolder
                                            ? handleFolderClick(file.fullPath)
                                            : handleFileClick(file.fullPath)
                                    }
                                >
                                    {file.isFolder ? "📁" : "📄"}
                                </div>
                            </td>
                            <td style={{ padding: "8px" }}>{file.name}</td>
                            <td style={{ padding: "8px" }}>
                                {file.isFolder ? "" : new Date(file.creationDate).toLocaleString("it-IT", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    second: "2-digit",
                                })}
                            </td>
                            <td style={{ padding: "8px" }}>{file.isFolder ? "" : file.csvDataCodice}</td>
                            <td style={{ padding: "8px" }}>{file.isFolder ? "" : file.csvDataProgressivo}</td>
                            <td style={{ padding: "8px" }}>{file.isFolder ? "" : file.csvDataOperatore}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};