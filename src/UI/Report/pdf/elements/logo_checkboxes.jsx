import Alert from "../../../globals/components/alert";
import CustomCheckbox from "../../../globals/components/custom_checkbox";
import { PiFediverseLogoBold } from "react-icons/pi";
import { useState } from "react";

export default function LogoCheckboxes({
    pdfObject,
    setPdfObject,
    handleImageUpload,
    predImage,
    setPredImage,
    handleUseDefaultImage,
    setSelectedImage,
    predImage2,
    setPredImage2,
    handleUseDefaultImage2,
    setSelectedImage2,
    handleImageUpload2,
}) {

    const [imageError, setImageError] = useState(false)

    return (
        <>
            <div className="table_lista_report_toolboxBar_otherParams_SingleDiv">
                <h1><div className="fs-25 c-blue-confirm"><PiFediverseLogoBold /></div> Logo</h1>
                <CustomCheckbox
                    Title="Inserisci logo iniziale"
                    CColor="black"
                    checked={pdfObject.logoInitial}
                    onChange={(value) => setPdfObject((prevState) => ({
                        ...prevState,
                        logoInitial: value,
                    }))}
                    MarginBottom="5px"
                />
                <div className="Logo_Checkboxes_Div_Images">
                    <input
                        type="file"
                        accept="image/*"
                        onClick={(e) => {
                            if (predImage) {
                                e.preventDefault();
                                setImageError(true)
                            } else {
                                console.log("Explorer aperto");
                            }
                        }}
                        onChange={handleImageUpload}
                        className="scegli_file_input"
                    />

                    <div className="Logo_Checkboxes_Div_Images_Text">oppure</div>
                    <div className="Logo_Checkboxes_Div_Images_Btn">
                        <CustomCheckbox
                            Title="Usa immagine predefinita"
                            CColor="white"
                            checked={predImage}
                            onChange={(value) => {
                                setPredImage(value ? true : null);
                                if (value) {
                                    handleUseDefaultImage();
                                } else {
                                    setSelectedImage(null)
                                }
                            }
                            }
                            MarginBottom="5px"
                        />
                    </div>
                </div>
                <CustomCheckbox
                    Title="Inserisci logo in alto a sinistra"
                    CColor="black"
                    checked={pdfObject.logoTopLeft}
                    onChange={(value) => setPdfObject((prevState) => ({
                        ...prevState,
                        logoTopLeft: value,
                    }))}
                />
                <div className="Logo_Checkboxes_Div_Images">
                    <input
                        type="file"
                        accept="image/*"
                        onClick={(e) => {
                            if (predImage2) {
                                e.preventDefault();
                                setImageError(true)
                            } else {
                                console.log("Explorer aperto");
                            }
                        }}
                        onChange={handleImageUpload2}
                        className="scegli_file_input"
                    />

                    <div className="Logo_Checkboxes_Div_Images_Text">oppure</div>
                    <div className="Logo_Checkboxes_Div_Images_Btn">
                        <CustomCheckbox
                            Title="Usa immagine predefinita"
                            CColor="white"
                            checked={predImage2}
                            onChange={(value) => {
                                setPredImage2(value ? true : null);
                                if (value) {
                                    handleUseDefaultImage2();
                                } else {
                                    setSelectedImage2(null)
                                }
                            }
                            }
                            MarginBottom="5px"
                        />
                    </div>
                </div>
            </div>

            {imageError && <Alert
                Type="warning"
                Title="Warning"
                Description={"Se hai selezionato 'usa immagine predefinita' \n non puoi importare un'immagine"}
                onClose={() => { setImageError(false) }}
                Modal={true}
            />}
        </>
    );
};