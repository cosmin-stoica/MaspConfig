import ConfirmModal from "../../../globals/components/confirm_modal"
import { useNavigate } from "react-router";
import { usePath } from "../../../../MAIN/Config/PathContext";

export default function MainParser() {

    const navigate = useNavigate();
    const { path } = usePath();

    const handleConfirm = () => {
        const toWrite =
        {
            "PARAMETRI MONTAGGIO": {
                "Progressivo sedile": "0"
            }
        };

        console.log(toWrite)

        const filePath = `${path}/Config/Main Config.ini`

        window.electron.saveIniFile(filePath, toWrite)
            .then(handleExit())
            .catch(console.error);
    }

    const handleExit = () => {
        navigate("/config")
    }

    return (
        <>
            <div>
                <ConfirmModal
                    TextConfirm={true}
                    TextToConfirm={"main"}
                    Title={"Conferma"}
                    Description={"Sei sicuro di voler resettare il progressivo sedile?"}
                    onCancel={handleExit}
                    onConfirm={handleConfirm}
                />
            </div>
        </>
    );

};
