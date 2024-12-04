import React, { useState, useEffect } from 'react';
import ActionResponse from '../../../elements/ActionResponse';
import HalReviewerIntroChooser from './HalConfigChooser';

const HalReviewerBrowser = ({ onFileRead, onHalArray, onFileReadName, onStatus }) => {
    const [file, setFile] = useState(null);
    const [state, setState] = useState(0);

    const [error, setError] = useState({
        show: false,
        isError: true,
        isSuccess: true,
        title: "",
        desc: ""
    });

    const [dataDoc, setDataDoc] = useState([]);
    useEffect(() => {
        if (window.dataDoc) {
            setDataDoc(window.dataDoc);
        }
    }, []);

    const validateFile = (uploadedFile) => {
        if (uploadedFile && uploadedFile.name.endsWith('.ini')) {
            setFile(uploadedFile);
            setError({
                show: false,
                isError: false,
                isSuccess: false,
                title: "",
                desc: ""
            });
        } else {
            setFile(null);
            setError({
                show: true,
                isError: true,
                isSuccess: false,
                title: "Errore!",
                desc: "Puoi caricare solamente un file .ini"
            });
        }
    };

    const handleFileUpload = (event) => {
        const uploadedFile = event.target.files[0];
        validateFile(uploadedFile);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        event.stopPropagation();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const droppedFile = event.dataTransfer.files[0];
        validateFile(droppedFile);
    };

    const extractFileName = (fileName) => {
        const match = fileName.match(/^HAL Config\s+(.*?)\.ini$/);
        return match ? match[1] : fileName;
    };


    const handleUploadClick = () => {
        if (file) {
            const searchHalArrayInHalName = (dataDoc, searchString) => {
                for (let item of dataDoc) {
                    if (item.HalName.includes(searchString)) {
                        return item.Hal;
                    }
                }
                return null;
            };

            const halArray = searchHalArrayInHalName(dataDoc, file.name);
            if (!halArray) {
                setError({
                    show: true,
                    isError: true,
                    isSuccess: false,
                    title: "Errore!",
                    desc: "Non possediamo questo HAL Config nella base di dati"
                });
                return;
            }

            onHalArray(halArray);

            const reader = new FileReader();
            reader.onload = (e) => {
                onFileRead(e.target.result);
                if (onFileReadName) {
                    const name = extractFileName(file.name);
                    onFileReadName(name);
                }
            };
            reader.readAsText(file);
            setState(0);
            setError({
                show: true,
                isError: false,
                isSuccess: true,
                title: "Perfetto!",
                desc: "File caricato correttamente"
            });
        } else {
            setError({
                show: true,
                isError: true,
                isSuccess: false,
                title: "Errore!",
                desc: "Non hai caricato nessun file"
            });
        }
    };

    const handleActionResponseClose = () => {
        setError({
            show: false,
            isError: false,
            title: "",
            desc: ""
        });
    };


    const handleReviewerChooserHalArray = (hal) => {
        onHalArray(hal);
    }

    const handleReviewerOnFileReadName = (name) => {
        onFileReadName(name);
    }

    const HandleCreaFileInner = () => {

        onStatus(2);
        setState(2);
        const hal = null;
        onHalArray(hal);
        onFileRead(null);
        console.log("prova");
    }

    return (
        <>
            {error.show && <ActionResponse OnClose={handleActionResponseClose} isError={error.isError} isSuccess={error.isSuccess} title={error.title} desc={error.desc}></ActionResponse>}
            {(state === 0 || state === 2) &&
                <>
                    <button className='addFileBtn' onClick={() => setState(1)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 3H12H8C6.34315 3 5 4.34315 5 6V18C5 19.6569 6.34315 21 8 21H11M13.5 3L19 8.625M13.5 3V7.625C13.5 8.17728 13.9477 8.625 14.5 8.625H19M19 8.625V11.8125" stroke="#fffffff" stroke-width="2"></path>
                            <path d="M17 15V18M17 21V18M17 18H14M17 18H20" stroke="#fffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                        Carica File
                    </button>
                    <button className='createFileBtn' onClick={() => HandleCreaFileInner()}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 3H12H8C6.34315 3 5 4.34315 5 6V18C5 19.6569 6.34315 21 8 21H11M13.5 3L19 8.625M13.5 3V7.625C13.5 8.17728 13.9477 8.625 14.5 8.625H19M19 8.625V11.8125" stroke="#fffffff" stroke-width="2"></path>
                            <path d="M17 15V18M17 21V18M17 18H14M17 18H20" stroke="#fffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                        Crea File
                    </button>
                </>
            }
            {state === 1 && <div className="modalBrowser">
                <div className="modal-headerBrowser">
                    <div className="modal-logoBrowser">
                        <span className="logo-circleBrowser">
                            <svg
                                width="25"
                                height="25"
                                viewBox="0 0 512 419.116"
                            >
                                <defs>
                                    <clipPath id="clip-folder-new">
                                        <rect width="512" height="419.116"></rect>
                                    </clipPath>
                                </defs>
                                <g id="folder-new" clipPath="url(#clip-folder-new)">
                                    <path
                                        id="Union_1"
                                        data-name="Union 1"
                                        d="M16.991,419.116A16.989,16.989,0,0,1,0,402.125V16.991A16.989,16.989,0,0,1,16.991,0H146.124a17,17,0,0,1,10.342,3.513L227.217,57.77H437.805A16.989,16.989,0,0,1,454.8,74.761v53.244h40.213A16.992,16.992,0,0,1,511.6,148.657L454.966,405.222a17,17,0,0,1-16.6,13.332H410.053v.562ZM63.06,384.573H424.722L473.86,161.988H112.2Z"
                                        fill="var(--c-action-primary)"
                                        stroke=""
                                        strokeWidth="1"
                                    ></path>
                                </g>
                            </svg>
                        </span>
                    </div>
                    <button className="btn-closeBrowser" onClick={() => setState(0)}>
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                        >
                            <path fill="none" d="M0 0h24v24H0V0z"></path>
                            <path
                                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
                                fill="var(--c-text-secondary)"
                            ></path>
                        </svg>
                    </button>
                </div>
                <div className="modal-bodyBrowser">
                    <p className="modal-titleBrowser">Carica un file</p>
                    <p className="modal-descriptionBrowser">Trascina un file qui sotto</p>
                    <div
                        className="upload-areaBrowser"
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                    >
                        <span className="upload-area-iconBrowser">
                            <svg
                                width="35"
                                height="35"
                                viewBox="0 0 340.531 419.116"
                            >
                                <g id="files-new" clipPath="url(#clip-files-new)">
                                    <path
                                        id="Union_2"
                                        data-name="Union 2"
                                        d="M-2904.708-8.885A39.292,39.292,0,0,1-2944-48.177V-388.708A39.292,39.292,0,0,1-2904.708-428h209.558a13.1,13.1,0,0,1,9.3,3.8l78.584,78.584a13.1,13.1,0,0,1,3.8,9.3V-48.177a39.292,39.292,0,0,1-39.292,39.292Zm-13.1-379.823V-48.177a13.1,13.1,0,0,0,13.1,13.1h261.947a13.1,13.1,0,0,0,13.1-13.1V-323.221h-52.39a26.2,26.2,0,0,1-26.194-26.195v-52.39h-196.46A13.1,13.1,0,0,0-2917.805-388.708Zm146.5,241.621a14.269,14.269,0,0,1-7.883-12.758v-19.113h-68.841c-7.869,0-7.87-47.619,0-47.619h68.842v-18.8a14.271,14.271,0,0,1,7.882-12.758,14.239,14.239,0,0,1,14.925,1.354l57.019,42.764c.242.185.328.485.555.671a13.9,13.9,0,0,1,2.751,3.292,14.57,14.57,0,0,1,.984,1.454,14.114,14.114,0,0,1,1.411,5.987,14.006,14.006,0,0,1-1.411,5.973,14.653,14.653,0,0,1-.984,1.468,13.9,13.9,0,0,1-2.751,3.293c-.228.2-.313.485-.555.671l-57.019,42.764a14.26,14.26,0,0,1-8.558,2.847A14.326,14.326,0,0,1-2771.3-147.087Z"
                                        transform="translate(2944 428)"
                                        fill="var(--c-action-primary)"
                                    ></path>
                                </g>
                            </svg>
                        </span>
                        <span className="upload-area-titleBrowser">Trascina file qui per caricarlo o per sostituirlo</span>
                        <span className="upload-area-descriptionBrowser">
                            Altrimenti, puoi selezionare un file <br /><strong
                            >Cliccando qui</strong>
                        </span>
                        {file && <div>{file.name}</div>}
                        <input
                            type="file"
                            style={{ display: 'none' }}
                            onChange={handleFileUpload}
                        />
                    </div>
                </div>
                <div className="modal-footerBrowser">
                    <button className="btn-secondaryBrowser" onClick={() => setState(0)}>Cancella</button>
                    <button className="btn-primaryBrowser" onClick={handleUploadClick}>Carica File</button>
                </div>
            </div>}

            {state === 2 && <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><HalReviewerIntroChooser onFileReadName={handleReviewerOnFileReadName} onHalArray={handleReviewerChooserHalArray} onStatusChooser={() => onStatus(0)}></HalReviewerIntroChooser></div>}
        </>
    );
};

export default HalReviewerBrowser;
