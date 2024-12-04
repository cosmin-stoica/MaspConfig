import { useState, useEffect } from "react";
import HalConfigChooser from "./halconfig_chooser";
import DocumentationCreator from "./documentation_creator";
import ItodoImage from "../../elements/itodo-img";
import HalReviewer from "./HalReviewer/HalReviewerIntro";

const HalConfigHome = () => {

    const [Doc, setDoc] = useState([]);
    const [dataDoc, setDataDoc] = useState([]);

    useEffect(() => {
        if (window.Doc) {
            setDoc(window.Doc);

        }
        if (window.dataDoc) {
            setDataDoc(window.dataDoc);
        }
    }, []);

    const [isClicked, setIsClicked] = useState(false);
    const [selectedHal, setselectedHal] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const [selectedHalData, setSelectedHalData] = useState([]);
    const [selectedJobData, setSelectedJobData] = useState([]);

    const categories = [
        {
            titolo: "Automazione e Assemblaggio",
            icona: <i className="flaticon-development"></i>
        },
        {
            titolo: "Collaudo Componenti Automotive",
            icona: <i className="flaticon-skills"></i>
        },
        {
            titolo: "Unità di Controllo Elettronico",
            icona: <i className="flaticon-touch"></i>
        },
        {
            titolo: "Controllo di Qualità e Verifica",
            icona: <i className="flaticon-data"></i>
        },
        {
            titolo: "Gestione Produzione e Logistica",
            icona: <i className="flaticon-supply-chain"></i>
        },
        {
            titolo: "Gestione Postazioni e Procedure",
            icona: <i className="flaticon-employee"></i>
        }
    ];

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    const handleHalConfig = (hal) => {
        const halData = dataDoc.find(item => item.Name === hal);

        if (halData) {
            setSelectedHalData(halData.Hal || []);
            setSelectedJobData(halData.Job || []);
        } else {
            setSelectedHalData([]);
            setSelectedJobData([]);
        }

        setselectedHal(hal);
        setIsClicked(true);
    };

    const handleBack = () => {
        setIsClicked(false);
        setselectedHal('');
    };

    const handleCategoryBack = () => {
        setSelectedCategory('');
    };

    const jobArrays = Doc;

    return (
        <>
            <div className='paneprincipalepostazioni perflexcolumn position-relative'>
                {selectedCategory && <button className="esci-halconfig-button" onClick={handleCategoryBack}>Indietro</button>}
                {!selectedCategory && !isClicked && <div className="hal-config-div-flex">
                    {categories.map(category => (
                        <div onClick={() => handleCategoryClick(category.titolo)} className="category-config-div" key={category.titolo}>
                            {category.icona}
                            {category.titolo}
                        </div>
                    ))}
                </div>}

                {selectedCategory && !isClicked && <div className="hal-config-div-flex">
                    {jobArrays.filter(hal => hal.categoria === selectedCategory).map(hal => {
                        const halData = dataDoc.find(item => item.Name === hal.title);

                        return (
                            <div onClick={() => handleHalConfig(hal.title)} className="hal-config-div" key={hal.title}>
                                <div className="hal-config-div-presenza-hal-job-div">
                                    <div className={halData && halData.Hal ? "hal-job-presente" : "hal-job-assente"}>Hal</div>
                                    <div className={halData && halData.Job ? "hal-job-presente" : "hal-job-assente"}>Job</div>
                                </div>
                                <ItodoImage src={hal.icona}></ItodoImage>
                                {hal.title}
                            </div>
                        );
                    })}
                </div>}


                {isClicked &&
                    <>
                        <div className="hal-config-chooser-maindiv">
                            <HalConfigChooser
                                hal_config_array={selectedHalData}
                                selectedHal={selectedHal}
                                job_config_array={selectedJobData}
                                selectedJob={selectedHal}
                                onBack={handleBack}
                                description={jobArrays.find(obj => obj.title === (selectedHal))?.text}
                            />
                        </div>
                    </>
                }
                {!selectedCategory && !isClicked && <HalReviewer></HalReviewer>}
                {/*!selectedCategory && !isClicked && <DocumentationCreator className="documentation-creator-btn" jobArrays={jobArrays}></DocumentationCreator>*/}
            </div>
        </>
    );
};

export default HalConfigHome;
