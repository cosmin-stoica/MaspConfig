/* eslint-disable no-unused-vars */
import { GiUltrasound } from "react-icons/gi";
import { FaRegFileLines } from "react-icons/fa6";
import { GrVmMaintenance } from "react-icons/gr";
import { MdSettingsInputComponent } from "react-icons/md";
import { CiBarcode } from "react-icons/ci";
import { PiScrewdriverThin, PiScrewdriverFill } from "react-icons/pi";
import { TbDimensions } from "react-icons/tb";
import { HiMiniWrenchScrewdriver } from "react-icons/hi2";
import { GiJumpAcross } from "react-icons/gi";




const iconMap = (name) => {
    switch (name) {
        case "Sezione":
            return <GrVmMaintenance />
        case "Input-output":
            return <MdSettingsInputComponent />
        case "Barcode":
            return <CiBarcode />
        case "Rivettatura":
            return <PiScrewdriverThin />
        case "Avvitatura":
            return <PiScrewdriverFill />
        case "Avvitatura-chiave":
            return <HiMiniWrenchScrewdriver />
        case "Oggettivazione": 
            return <TbDimensions />
        case "Jump":
            return <GiJumpAcross/>
        default:
            return <FaRegFileLines />
    }
};

export default iconMap; 