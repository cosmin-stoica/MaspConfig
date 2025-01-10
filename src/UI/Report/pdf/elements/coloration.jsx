import { useEffect } from "react";
import { SketchPicker } from "react-color";
import { IoIosColorPalette } from "react-icons/io";

export default function Coloration({ setOpenColorPicker, openColorPicker, mainColor, setMainColor }) {


    useEffect(() => {

        const savedColor = localStorage.getItem("savedColor");
        if (savedColor) {
            setMainColor(savedColor);
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
    }, [setOpenColorPicker, openColorPicker, setMainColor]);


    const handleColorChange = (newColor) => {
        setMainColor(newColor.hex);
        localStorage.setItem("savedColor", newColor.hex);
    };

    return (
        <>
            <div className="table_lista_report_toolboxBar_otherParams_SingleDiv">
                <h1><div className="fs-25 c-blue-confirm"><IoIosColorPalette /></div>Colorazione</h1>
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
        </>
    );
};
