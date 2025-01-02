import { useState, useRef } from "react";
import { BsPlusCircleFill } from "react-icons/bs";
import { IoIosHome } from "react-icons/io";
import { LiaBarcodeSolid } from "react-icons/lia";
import { SiTestcafe } from "react-icons/si";
import { VscChecklist } from "react-icons/vsc";

export default function CollapsibleSection ({ title, data, children }){
    const [isVisible, setIsVisible] = useState(false);
    const contentRef = useRef(null);

    const toggleVisibility = () => {
        setIsVisible((prev) => !prev);
    };
    
    
    const getIcon = (title) => {
        switch (title) {
            case "Dati Generali":
                return <IoIosHome />;
            case "Barcode componenti":
                return <LiaBarcodeSolid />;
            case "Risultati collaudo":
                return <SiTestcafe />;
            case "Controlli":
                return <VscChecklist />;
            default:
                return null;
        }
    };

    return (
        <div className="Csv_Viewer_Part_MainDiv">
            <h2 className="Csv_MainHeader">
                <div className="Csv_MainHeader_MainIcon">{getIcon(title)}</div>
                {title}
                <div className="Csv_MainHeader_CircleIcon" onClick={toggleVisibility}>
                    <BsPlusCircleFill
                        style={{
                            color: isVisible ? "black" : "",
                            transform: isVisible ? "rotate(135deg)" : "",
                            transition: "all 0.3s ease",
                        }}
                    />
                </div>
            </h2>
            <div
                className="Csv_Viewer_UpComing_Data"
                style={{
                    maxHeight: isVisible ? `${contentRef.current?.scrollHeight + 100}px` : "0",
                    overflow: "hidden",
                    transition: "max-height 0.3s ease-out",
                }}
                ref={contentRef}
            >
                {children}
            </div>
        </div>
    );
};
