import { useState, useEffect } from "react";
import ItodoImage from "../../../elements/itodo-img";
import styled from "styled-components";

const ButtonIndietro = styled.button`
    position: absolute;
    top:70px;
    right:20px;
    border:none;
    border-radius: 7px;
}
`;


const HalReviewerIntroChooser = ({ onFileReadName, onFileRead, onHalArray, onStatusChooser }) => {

    const [state, setState] = useState(0);
    const [selectedJob, setSelectedJob] = useState(null);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [realSelection, setRealSelection] = useState(null);
    const dataDoc = window.Doc;

    useEffect(() => {
        if (selectedJob !== null) {
            const filtered = dataDoc.filter(job => job.categoria.trim() === selectedJob.trim());
            setFilteredJobs(filtered);
        }
    }, [selectedJob]);


    const halCategories = [
        { icon: 'flaticon-development', title: 'Automazione e Assemblaggio' },
        { icon: 'flaticon-skills', title: 'Collaudo Componenti Automotive' },
        { icon: 'flaticon-data', title: 'Controllo di Qualità e Verifica' },
        { icon: 'flaticon-supply-chain', title: 'Gestione Produzione e Logistica' },
        { icon: 'flaticon-employee', title: 'Gestione Postazioni e Procedure' },
        { icon: 'flaticon-touch', title: 'Unità di Controllo Elettronico' },
        { icon: 'flaticon-touch', title: 'Altro' },
    ];


    const handleJobClick = (jobTitle) => {
        setSelectedJob(jobTitle);
        setState(1);
    };


    const giveArray = (name) => {
        const searchHalArrayInHalName = (dataDoc, searchString) => {
            for (let item of dataDoc) {
                if (item.HalName.includes(searchString)) {
                    return item.Hal;
                }
            }
            return null;
        };

        const halArray = searchHalArrayInHalName(dataDoc, name);
        if (!halArray) {
            /*setError({
                show: true,
                isError: true,
                isSuccess: false,
                title: "Errore!",
                desc: "Non possediamo questo HAL Config nella base di dati"
            });*/
            return;
        }

        onHalArray(halArray);
        console.log(halArray);
    }

    const handleJobLowerClick = (value) => {
        try {
            const jobDoc = window.dataDoc;

            const result = jobDoc.find(job => job.Name === value);
        
            if (result) {
                setRealSelection(result);
            }
            else {
                console.log('No matching job found for the given value.');
                return;
            }

            let count = 0;
            for (let i = 1; i <= 10; i++) {
                if (result[`Hal_Aux${i}`]) {
                    count++;
                    setState(2);
                    return;
                }
            }

            setRealSelection(result);

            console.log('result', result);
            console.log('hal', result.Hal);
            console.log('name', result.Name);
            setState(3);
            onStatusChooser();
            onHalArray(result.Hal);
            onFileReadName(result.HalName);
        } catch (error) {
            console.error('An error occurred while searching for the job:', error);
        }
    };

    const handleAuxClick = (num) => {
        const halAuxKey = `Hal_Aux${num}`;
        const halAuxItems = realSelection[halAuxKey];
        if (halAuxItems) {
            onHalArray(halAuxItems);
            setState(3);
            onStatusChooser();
            onFileReadName(halAuxKey);
        }
    };


    return (
        <>
            {state === 1 && <ButtonIndietro onClick={() => setState(0)}>Indietro</ButtonIndietro>}
            {state === 0 &&
                <div className='job-chooser-div-upper'>
                    {halCategories.map(category => (
                        <div
                            key={category.title}
                            className="job-chooser-div"
                            onClick={() => handleJobClick(category.title)}
                        >
                            <i className={category.icon} style={{ fontSize: '70px' }}></i>
                            <span>{category.title}</span>
                        </div>
                    ))}
                </div>
            }

            {state === 1 && <div className='job-list-upper'>
                <h2>{selectedJob}</h2>
                <div className='job-list'>
                    {filteredJobs.map((job, index) => (
                        <div onClick={() => handleJobLowerClick(job.title)} key={index} className='job-list-item'>
                            <ItodoImage src={job.icona} style={{ width: '50px' }} ></ItodoImage>
                            {job.title}
                        </div>
                    ))}
                </div>
            </div>}

            {state === 2 && (
                <>
                    <ButtonIndietro onClick={() => setState(0)}>Indietro</ButtonIndietro>
                    <div className='job-chooser-div-upper'>
                        {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => {
                            const halAuxKey = `Hal_Aux${num}`;
                            const halAuxItems = realSelection[halAuxKey];

                            if (halAuxItems && halAuxItems.length > 0) {
                                const docItem = window.Doc.find(doc => doc.title === realSelection.Name);
                                const iconText = docItem ? docItem.icona : '';
                                const titleKey = `hal_config_aux${num}_title`;
                                const displayTitle = docItem ? docItem[titleKey] : halAuxKey;

                                return (
                                    <div className='job-list-upper' key={num}>
                                        <div 
                                            className='job-list-item' 
                                            onClick={() => handleAuxClick(num)}
                                        >
                                            <ItodoImage src={iconText} style={{ width: '50px' }}></ItodoImage>
                                            <span>{displayTitle}</span>
                                        </div>
                                    </div>
                                );
                            }

                            return null;
                        })}
                    </div>
                </>
            )}



        </>
    );
};

export default HalReviewerIntroChooser;
