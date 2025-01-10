import CustomCheckbox from "../../../globals/components/custom_checkbox";
import { BsBracesAsterisk } from "react-icons/bs";

export default function Sections({ pdfObject, setPdfObject, setGeneratedSections }) {

    const sections = ["Dati Generali", "Barcode componenti", "Risultati avvitature", "Risultati rivettatura", "Risultati collaudo", "Controlli"]
    const sectionKeyMap = {
        "Dati Generali": "datiGenerali",
        "Barcode componenti": "barcodeComponenti",
        "Risultati avvitature": "risultatiAvvitature",
        "Risultati rivettatura": "risultatiRivettatura",
        "Risultati collaudo": "risultatiCollaudo",
        "Controlli": "controlli",
    };

    const updateSectionSelection = (sectionKey, isChecked) => {
        setPdfObject((prevState) => {
            const updatedPdfObject = {
                ...prevState,
                [sectionKey]: isChecked,
            };

            const selectedSections = sections.filter((section) => updatedPdfObject[sectionKeyMap[section]]);
            setGeneratedSections(selectedSections);

            return updatedPdfObject;
        });
    };

    return (
        <>
            <div className="table_lista_report_toolboxBar_otherParams_SingleDiv">
                <h1><div className="fs-25 c-blue-confirm"><BsBracesAsterisk /></div> Sezioni</h1>
                <div className="c-black">
                    {sections && sections.map((value, key) => {
                        const sectionKey = sectionKeyMap[value];
                        const isLast = key === sections.length - 1;
                        return (
                            <CustomCheckbox
                                key={key}
                                Title={value}
                                CColor="black"
                                checked={pdfObject[sectionKey]}
                                onChange={(isChecked) => updateSectionSelection(sectionKey, isChecked)}
                                MarginBottom={isLast ? "" : "5px"}
                            />
                        );
                    })}
                </div>
            </div>
        </>
    );
};