import { FixedSizeList as List } from 'react-window';
import { useEffect, useState } from 'react';

export default function ListaTable({ files, handleFolderClick, handleFileClick }) {

    const [listHeight, setListHeight] = useState(400);

    useEffect(() => {
        const updateHeight = () => {
            const availableHeight = window.innerHeight - 180;
            setListHeight(availableHeight);
        };

        updateHeight();
        window.addEventListener('resize', updateHeight);

        return () => window.removeEventListener('resize', updateHeight);
    }, []);

    if (!files || files.length === 0) {
        return <div>Nessun file trovato.</div>;
    }
    const Row = ({ index, style }) => {
        const file = files[index];
        return (
            <div style={style} className="table_lista_report_row">
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
                {/*<span>{file.name}</span>*/}
                <span>{file.isFolder ? file.name : file.csvDataCodice}</span>
                <span>
                    {file.isFolder
                        ? ""
                        : new Date(file.creationDate).toLocaleString("it-IT", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                        })}
                </span>
                <span>{file.isFolder ? "" : file.csvDataProgressivo}</span>
                <span>{file.isFolder ? "" : file.csvDataOperatore}</span>
            </div>
        );
    };

    return (
        <>
            <div className="table_lista_report_header">
                <div></div>
                <div>Codice</div>
                {/*<div>Nome</div>*/}
                <div>Data</div>
                <div>Progressivo</div>
                <div>Operatore</div>
                <div className='table_lista_report_header_file_trovati'>
                    File trovati: {files.filter((file) => !file.isFolder).length}
                </div>
            </div>
            <List
                height={listHeight}
                itemCount={files.length}
                itemSize={35}
                width="100%"
                style={{ scrollbarWidth: 'none' }}
            >
                {Row}
            </List>
        </>
    );
}
