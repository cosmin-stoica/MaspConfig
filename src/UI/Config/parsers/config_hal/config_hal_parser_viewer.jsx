import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { useLocation } from 'react-router-dom';
import { usePath } from "../../../../MAIN/Config/PathContext";
import ToolPanel from "./ToolPanel";
import SectionViewer from "./SectionViewer";
import ConfirmModals from "./ConfirmModals";
import ConfirmModal from "../../../globals/confirm_modal"
import { TbArrowLeft } from "react-icons/tb";

import {
    initializeInputValues,
    saveConfiguration,
    deleteConfiguration,
    addNewProgram,
} from "./helpers";
import Alert from "../../../globals/alert";

export default function ConfigHalParserViewer({ activeNavbar, onSetActive, dummyFile, realFile, configName, groupName, configIcon, isHal, isAvv }) {
    const [showConfirmReload, setShowConfirmReload] = useState(null);
    const [showConfirmDelete, setShowConfirmDelete] = useState(null);
    const [showConfirmSave, setShowConfirmSave] = useState(null);
    const [showAddProgramma, setShowAddProgramma] = useState(null);
    const [showNonSavedAlarm, setShowNonSavedAlarm] = useState(null);
    const [showNonSavedAlarmExiting, setShowNonSavedAlarmExiting] = useState(null);
    const [expandedSections, setExpandedSections] = useState({});
    const [inputValues, setInputValues] = useState(() => initializeInputValues(dummyFile, realFile));

    const [isSaved, setIsSaved] = useState(false);
    const [isModified, setIsModified] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();
    const { path, modTablet } = usePath();

    const prevInputValuesRef = useRef(inputValues);
    useEffect(() => {
        const prevInputValues = prevInputValuesRef.current;

        if (JSON.stringify(inputValues) !== JSON.stringify(prevInputValues)) {
            setIsModified(true);
            onSetActive(false)
        } else {
            setIsModified(false);
        }

        prevInputValuesRef.current = inputValues;
    }, [inputValues]);


    const handleReload = () => {
        if (!isModified) {
            reload();
        }
        else {
            if (!isSaved) {
                setShowNonSavedAlarm(true);
            }
            else {
                reload();
            }
        }
    };

    const reload = () => {
        if (isHal) {
            onSetActive(true)
            navigate(`/config-hal-parser?config=${encodeURIComponent(configName)}&group_name=${encodeURIComponent(groupName)}&config_icon=${encodeURIComponent(configIcon)}&isHal=true`);
            window.location.reload();
        }
        else {
            onSetActive(true)
            navigate(`/configopener?config=${encodeURIComponent(configName)}`);
            window.location.reload();
        }
    }

    const handleSave = () => {
        saveConfiguration(isAvv, isHal, inputValues, dummyFile, realFile, configName, path, setShowConfirmSave);
        setIsSaved(true);
        onSetActive(true)
    };

    const handleDelete = () => {
        deleteConfiguration(isHal, configName, path, setShowConfirmDelete, navigate);
    };

    const handleAddAvvitatura = () => {
        addNewProgram(dummyFile, setShowAddProgramma);
    };

    const clear = () => {
        setShowConfirmReload(false);
        setShowConfirmDelete(false);
        setShowConfirmSave(false);
        setShowAddProgramma(false);
        setShowNonSavedAlarm(false);
        setShowNonSavedAlarmExiting(false);
    }


    const handleBack = () => {
        if (isHal)
            navigate(`/hal?group_name=${encodeURIComponent(groupName)}`);
        else {
            navigate("/config");
        }
        onSetActive(true)
    }

    const handleBackClick = () => {
        if (!isModified) {
            handleBack();
        }
        else {
            if (!isSaved) {
                setShowNonSavedAlarmExiting(true);
            }
            else {
                handleBack()
            }
        }
    }

    return (
        <div className="HardwareParserViewerMainDiv">
            <button className="Hal_Config_Back_Btn" onClick={handleBackClick}>
                <TbArrowLeft />
            </button>
            <div className="HalParserViewer">
                <ToolPanel
                    isAvv={isAvv}
                    setShowConfirmSave={setShowConfirmSave}
                    setShowConfirmReload={setShowConfirmReload}
                    setShowConfirmDelete={setShowConfirmDelete}
                    setShowAddProgramma={setShowAddProgramma}
                />
                <SectionViewer
                    dummyFile={dummyFile}
                    realFile={realFile}
                    configIcon={configIcon}
                    expandedSections={expandedSections}
                    setExpandedSections={setExpandedSections}
                    inputValues={inputValues}
                    setInputValues={setInputValues}
                    isHal={isHal}
                    modTablet={modTablet}
                />
            </div>
            <ConfirmModals
                showConfirmReload={showConfirmReload}
                showConfirmSave={showConfirmSave}
                showConfirmDelete={showConfirmDelete}
                showAddProgramma={showAddProgramma}
                handleReload={handleReload}
                handleSave={handleSave}
                handleDelete={handleDelete}
                handleAddAvvitatura={handleAddAvvitatura}
                setShowConfirmReload={setShowConfirmReload}
                setShowConfirmSave={setShowConfirmSave}
                setShowConfirmDelete={setShowConfirmDelete}
                setShowAddProgramma={setShowAddProgramma}
            />
            {showNonSavedAlarmExiting && <ConfirmModal Title="Conferma" Description="Hai effettuato delle modifiche senza salvare, sei sicuro di voler continuare?" onConfirm={handleBack} onCancel={() => clear()} />}
            {showNonSavedAlarm && <ConfirmModal Title="Conferma" Description="Hai effettuato delle modifiche senza salvare, sei sicuro di voler continuare?" onConfirm={reload} onCancel={() => clear()} />}
        </div>
    );
}