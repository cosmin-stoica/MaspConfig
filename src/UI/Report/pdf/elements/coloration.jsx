import { useEffect, useState } from "react";
import { SketchPicker } from "react-color";
import { IoIosColorPalette } from "react-icons/io";
import { usePath } from "../../../../MAIN/Config/PathContext"
import ConfirmModal from "../../../globals/components/confirm_modal"
import StyledButton from "../../../globals/components/styled_button";

export default function Coloration({ setOpenColorPicker, openColorPicker, mainColor, setMainColor }) {

    const { path } = usePath()
    const [openConfirmSaveColor, setOpenConfirmSaveColor] = useState(false);
    const [isColorLoaded, setIsColorLoaded] = useState(false)
    const pathToTxt = `${path}/Masp Tools/Colors/main.txt`

    useEffect(() => {

        if (!isColorLoaded) {
            console.log("qui")
            async function readColor() {
                try {
                    const savedColor = await window.electron.readColorFromFile(pathToTxt);
                    if (savedColor) {
                        setMainColor(savedColor);
                    }
                } catch (error) {
                    console.error("Errore durante la lettura del colore:", error);
                } finally {
                    setIsColorLoaded(true);
                }
            }
            readColor();
        }

        const handleClickOutside = (event) => {
            if (openColorPicker && !event.target.closest(".color-picker-container") && !event.target.closest(".PdfCreator_ColorPicker_MainDiv")) {
                setOpenColorPicker(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [setOpenColorPicker, openColorPicker, setMainColor, pathToTxt]);


    const handleColorChange = (newColor) => {
        setMainColor(newColor.hex);
    };

    const handleSaveColor = () => {
        window.electron.saveColorToFile(mainColor, pathToTxt)
        setOpenConfirmSaveColor(false)
    }

    return (
        <>
            <div className="table_lista_report_toolboxBar_otherParams_SingleDiv">
                <h1><div className="fs-25 c-blue-confirm"><IoIosColorPalette /></div>Colorazione</h1>
                <div className="flex-center-row-noalign gap-15">
                    <div
                        className="PdfCreator_ColorPicker_MainDiv"
                        onClick={() => setOpenColorPicker(!openColorPicker)}
                    >
                        <div style={{ width: "25px", height: "25px", background: mainColor, borderRadius: "4px" }}>
                        </div>
                        <div className="c-black">
                            Colore del pdf
                        </div>
                    </div>
                    <StyledButton Title="Salva predefinito" Confirm={true} onClick={() => setOpenConfirmSaveColor(true)}></StyledButton>
                </div>
            </div>
            {openColorPicker && (
                <div
                    className="color-picker-container"
                    onClick={(e) => e.stopPropagation()} // Impedisce la propagazione del click
                    style={{ position: "absolute", top: "100px", zIndex: 100 }}
                >
                    <SketchPicker
                        color={mainColor}
                        onChangeComplete={handleColorChange}
                    />
                </div>
            )}
            {openConfirmSaveColor &&
                <ConfirmModal
                    Title="Conferma"
                    Description="Sei sicuro di voler salvare questo colore come predefinito?"
                    onCancel={() => setOpenConfirmSaveColor(false)}
                    onConfirm={handleSaveColor}
                />
            }
        </>
    );
};
