import StyledButton from "../../globals/components/styled_button";
import GeneralModal from "../../globals/components/general_modal";
import { useState } from "react";
import LogoCheckboxes from "./elements/logo_checkboxes";
import Coloration from "./elements/coloration";
import Sections from "./elements/sections";
import Alert from "../../globals/components/alert"
import { usePath } from "../../../MAIN/Config/PathContext"
import ConfirmModal from "../../globals/components/confirm_modal";

export default function PdfCreator({ data, dataFile, dataMerged, dataFileMultiple, OnExit, useLoader, setIsLoading }) {

    const ReturnContent = () => {
        console.log("dataMerged", dataMerged)
        console.log("dataFileMultiple", dataFileMultiple)

        const { path } = usePath();
        const [predImage, setPredImage] = useState(false)
        const [predImage2, setPredImage2] = useState(false)

        const [showError, setShowError] = useState(false)
        const [showConfirmSavingImage, setShowConfirmSavingImage] = useState(false)
        const [showConfirmSavingImage2, setShowConfirmSavingImage2] = useState(false)
        const [errorType, setErrorType] = useState("error")
        const [errorTitle, setErrorTitle] = useState("Errore")
        const [errorText, setErrorText] = useState("")
        const [errorImage, setErrorImage] = useState(null)
        const [openColorPicker, setOpenColorPicker] = useState(false)
        const [mainColor, setMainColor] = useState("#FFFFFF");
        const [pdfObject, setPdfObject] = useState({
            logoInitial: false,
            logoTopLeft: false,
            datiGenerali: true,
            barcodeComponenti: true,
            risultatiAvvitature: true,
            risultatiRivettatura: true,
            risultatiCollaudo: true,
            controlli: true,
        });

        const [generatedSections, setGeneratedSections] = useState(["Dati Generali", "Barcode componenti", "Risultati avvitature", "Risultati rivettatura", "Risultati collaudo", "Controlli"]);

        const [selectedImage, setSelectedImage] = useState(null);
        const [selectedImage2, setSelectedImage2] = useState(null);
        const onConfirm = async () => {
            // Controlli per i loghi
            if (pdfObject.logoInitial && !selectedImage) {
              makeAlertReveal(
                "warning",
                "Attenzione",
                "Per poter inserire il logo iniziale nel pdf bisogna caricarlo \noppure selezionare un'immagine predefinita"
              );
              return;
            }
            if (pdfObject.logoTopLeft && !selectedImage2) {
              makeAlertReveal(
                "warning",
                "Attenzione",
                "Per poter inserire il logo in alto a sinistra nel pdf bisogna caricarlo \noppure selezionare un'immagine predefinita"
              );
              return;
            }
            if (selectedImage && !pdfObject.logoInitial) {
              makeAlertReveal(
                "warning",
                "Attenzione",
                "Per poter inserire il logo iniziale nel pdf bisogna selezionare la spunta"
              );
              return;
            }
            if (selectedImage2 && !pdfObject.logoTopLeft) {
              makeAlertReveal(
                "warning",
                "Attenzione",
                "Per poter inserire il logo in alto a sinistra nel pdf bisogna selezionare la spunta"
              );
              return;
            }
          
            if (useLoader) {
              setIsLoading(true);
            }
          
            let params;
            let title;
            if (
              dataMerged &&
              Object.keys(dataMerged).length > 0 &&
              dataFileMultiple &&
              Object.keys(dataFileMultiple).length > 0
            ) {
              // Modalità append
              const mergedArray = Object.values(dataMerged);
              const fileMultipleArray = Object.values(dataFileMultiple);
              if (mergedArray[0] && mergedArray[0].length > 0) {
                const primaryKey = Object.keys(mergedArray[0][0])[0];
                title = `${primaryKey}`;
                params = [
                  data, // placeholder, non usato in modalità append
                  generatedSections,
                  primaryKey,
                  primaryKey,
                  title,
                  pdfObject.logoInitial,
                  pdfObject.logoTopLeft,
                  mainColor,
                  selectedImage,
                  selectedImage2,
                  true, // Flag "append"
                  mergedArray,
                  fileMultipleArray,
                ];
              }
            } else {
              // Modalità singola
              title = `${Object.keys(data[0])[0]} ${dataFile.csvDataCodice} ${dataFile.csvDataProgressivo} ${dataFile.csvDataOperatore}`;
              params = [
                data,
                generatedSections,
                Object.keys(data[0])[0],
                Object.keys(data[0])[0],
                title,
                pdfObject.logoInitial,
                pdfObject.logoTopLeft,
                mainColor,
                selectedImage,
                selectedImage2,
              ];
            }
          
            // Funzione per scaricare il PDF
            const downloadPDF = (dataUrl, fileName = `${title}.pdf`) => {
              const link = document.createElement("a");
              link.href = dataUrl;
              link.download = fileName;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            };
          
            try {
              // Chiamata IPC tramite l'API esposta nel preload
              const { result, error } = await window.electron.generatePdf(params);
              if (error) {
                console.error("Errore nella generazione del PDF:", error);
              } else {
                downloadPDF(result);
              }
            } catch (err) {
              console.error("Errore IPC:", err);
            }
          
            if (useLoader) {
              setIsLoading(false);
            }
          };
          
        const handleImageUpload = (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    setSelectedImage(reader.result); // Salva l'immagine come stringa base64 come sotto
                    setShowConfirmSavingImage(true)
                };
                reader.readAsDataURL(file);
            }
        };
        const handleImageUpload2 = (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    setSelectedImage2(reader.result);
                    setShowConfirmSavingImage2(true)
                };
                reader.readAsDataURL(file);
            }
        };

        //IMG PREDEFINITA CHECKED SE SALVI
        const handleSaveImage = async (type, base64String, outputPath) => {
            try {
                const result = await window.electron.saveImageFromBase64(base64String, outputPath);
                setShowConfirmSavingImage(false);
                setShowConfirmSavingImage2(false)
                if (result) {
                    makeAlertReveal("success", "Successo", "L'immagine è stata caricata correttamente")
                    console.log("Immagine salvata con successo:", outputPath);
                    type === 1 ? setPredImage(true) : setPredImage2(true);
                } else {
                    makeAlertReveal("error", "Errore", "L'immagine non è stata caricata correttamente")
                    console.error("Errore durante il salvataggio dell'immagine.");
                }
            } catch (error) {
                console.error("Errore durante il salvataggio dell'immagine:", error);
                makeAlertReveal("error", "Errore", "Errore durante il salvataggio dell'immagine")
                setShowConfirmSavingImage(false);
                setShowConfirmSavingImage2(false)
            }
        };



        const handleUseDefaultImage = async () => {
            const basePath = `${path}/Masp Tools/Images/logo`;
            const extensions = ['png', 'jpg', 'jpeg'];
            let base64Image = null;

            try {
                for (const ext of extensions) {
                    const imagePath = `${basePath}.${ext}`;
                    base64Image = await window.electron.readImageAsBase64(imagePath);
                    if (base64Image) {
                        setSelectedImage(base64Image);
                        makeAlertReveal("success", "Successo", "Immagine caricata con successo!", base64Image)
                        return;
                    }
                }
                setPredImage(false)
                makeAlertReveal("error", "Errore", "Non è stata trovata nessuna immagine, caricala prima.")
            } catch (error) {
                console.error("Errore durante il caricamento dell'immagine predefinita:", error);
            }
        };

        const handleUseDefaultImage2 = async () => {
            const basePath = `${path}/Masp Tools/Images/logo2`;
            const extensions = ['png', 'jpg', 'jpeg'];
            let base64Image = null;

            try {
                for (const ext of extensions) {
                    const imagePath = `${basePath}.${ext}`;
                    base64Image = await window.electron.readImageAsBase64(imagePath);
                    if (base64Image) {
                        setSelectedImage2(base64Image);
                        makeAlertReveal("success", "Successo", "Immagine caricata con successo!", base64Image)
                        return;
                    }
                }
                setPredImage2(false)
                makeAlertReveal("error", "Errore", "Non è stata trovata nessuna immagine, caricala prima.")
            } catch (error) {
                console.error("Errore durante il caricamento dell'immagine predefinita:", error);
            }
        };


        const makeAlertReveal = (errorType, errorTitle, errorText, image) => {
            setErrorType(errorType)
            setErrorTitle(errorTitle)
            setErrorText(errorText)
            if (image)
                setErrorImage(image)
            else
                setErrorImage(null)
            setShowError(true);
        }

        return (
            <>
                <div className="PdfCreator_MainDiv">
                    <div className="PdfCreator_ContentMainDiv">
                        <LogoCheckboxes
                            pdfObject={pdfObject}
                            setPdfObject={setPdfObject}
                            handleImageUpload={handleImageUpload}
                            handleUseDefaultImage={handleUseDefaultImage}
                            predImage={predImage}
                            setPredImage={setPredImage}
                            setSelectedImage={setSelectedImage}
                            predImage2={predImage2}
                            setPredImage2={setPredImage2}
                            handleUseDefaultImage2={handleUseDefaultImage2}
                            setSelectedImage2={setSelectedImage2}
                            handleImageUpload2={handleImageUpload2}
                        />
                        <Coloration setMainColor={setMainColor} setOpenColorPicker={setOpenColorPicker} mainColor={mainColor} openColorPicker={openColorPicker} />
                        <Sections pdfObject={pdfObject} setGeneratedSections={setGeneratedSections} setPdfObject={setPdfObject} />
                    </div>
                    <div className="PdfCreator_Btns_Modal">
                        <StyledButton Title="Conferma" Confirm={true} onClick={onConfirm} />
                        <StyledButton Title="Annulla" onClick={OnExit} />
                    </div>
                </div>
                {showError &&
                    <Alert
                        Type={errorType}
                        Title={errorTitle}
                        Description={errorText}
                        Modal={true}
                        onClose={() => setShowError(false)}
                        Image={errorImage}
                    />}
                {showConfirmSavingImage &&
                    <ConfirmModal
                        Title="Conferma"
                        Description="Vuoi salvare questa immagine come predefinita per il logo iniziale?"
                        onCancel={() => setShowConfirmSavingImage(false)}
                        onConfirm={() => handleSaveImage(1, selectedImage, `${path}/Masp Tools/Images/logo.jpg`,)}
                        Image={selectedImage}
                    />
                }
                {showConfirmSavingImage2 &&
                    <ConfirmModal
                        Title="Conferma"
                        Description="Vuoi salvare questa immagine come predefinita per il logo in alto a sinistra?"
                        onCancel={() => setShowConfirmSavingImage2(false)}
                        onConfirm={() => handleSaveImage(2, selectedImage2, `${path}/Masp Tools/Images/logo2.jpg`,)}
                        Image={selectedImage2}
                    />
                }
            </>
        );
    }

    return (
        <>
            <GeneralModal
                Title="Creazione PDF"
                OnExit={OnExit}
                Content={ReturnContent}
                Height="90%"
                Width="80%"
            />
        </>
    );
};