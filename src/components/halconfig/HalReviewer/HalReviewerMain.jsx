import React, { useState, useEffect } from 'react';
import HalReviewerBrowser from './HalReviewerBrowser';
import styled from "styled-components";
import ReviewerCreator from './reviewerCreator';

const ContainerText = styled.div`
position: relative;
width: 100%;
height: 100%;
display: flex;
padding: 10px;

textarea {
  width: 100%;
  height: 100%;
  flex: 1;
  font-weight: 600;
  padding: 5px;
  border:none;
  resize: none;
}
`;

const MainDivRow = styled.div`
position: relative;
width: 100%;
height: 100%;
display: flex;
justify-content: center;
align-items: center;
flex-direction: row;
`;


const ButtonIndietro = styled.button`
    position: absolute;
    top:70px;
    left:20px;
    border:none;
    border-radius: 7px;
}
`;


const HalReviewerMain = () => {
    /*const [fileContent, setFileContent] = useState(`===========================================================
    [HAL AIRBAG]
    ===========================================================
    bIsUsed = 1
    bIsShowConfigEnable = 1
    bIsLogEnable = 1
    -----------------------------------------------------------
    nIN_BIT_AIRBAG_GND_WIRE = 0
    nOUT_BIT_AIRBAG_ENABLE = 102
    nADC_INDEX_AIRBAG = 103
    -----------------------------------------------------------
    dAirbagDivVcc = 12.35
    dAirbagDivResUp = 116.8
    dAirbagAdcMaxVoltage = 3.3
    ----------------------------------
    dAirbagResMin = 1.8
    dAirbagResMax = 2.4
    xxdAirbagResWire = 0.95
    -----------------------------------------------------------
    
    -----------------------------------------------------------
    Airbag Design:
    R airbag = 2Ohm
    V airbag = 12.20 * 2 / 150 = 0.162V
    ADC airbag = 50
    -----------------------------------------------------------
    `);*/


    const [fileContent, setFileContent] = useState('');
    const [fileName, setFileName] = useState('');
    const [browserStatus, setBrowserStatus] = useState(0);



    const [halArray, setHalArray] = useState([]);
    const handleHalArray = (content) => {
        setHalArray(content);
    };

    const handleFileContent = (content) => {
        setFileContent(content);
    };

    const handleFileName = (name) => {
        setFileName(name);
    };

    const handleHalChange = (newHalContent) => {
        setFileContent(newHalContent);
    };

    const handleBrowserStatus = (newStatus) => {
        setBrowserStatus(newStatus);
    };

    const handleBackButton = () => {
        setBrowserStatus(1);
    };



    return (
        <>
            {browserStatus !== 2 && <MainDivRow>
                <HalReviewerBrowser onStatus={handleBrowserStatus} onFileReadName={handleFileName} onFileRead={handleFileContent} onHalArray={handleHalArray} />
                {halArray && <div style={{ width: '95%', padding: '10px' }}><ReviewerCreator title={fileName} array={halArray} existingHal={fileContent} onHalChange={handleHalChange} /></div>}
                {fileContent && (
                    <ContainerText>
                        <textarea
                            id="fileContent"
                            value={fileContent}
                            readOnly
                            rows="10"
                            cols="50"
                        />
                    </ContainerText>
                )}
            </MainDivRow>}
            {browserStatus === 2 && <MainDivRow>
                <HalReviewerBrowser onStatus={handleBrowserStatus} onFileReadName={handleFileName} onFileRead={handleFileContent} onHalArray={handleHalArray} />
                {halArray && <div style={{ width: '95%', padding: '10px' }}><ReviewerCreator title={fileName} array={halArray} existingHal={fileContent} onHalChange={handleHalChange} /></div>}
                {
                    fileContent && (
                        <ContainerText>
                            <textarea
                                id="fileContent"
                                value={fileContent}
                                readOnly
                                rows="10"
                                cols="50"
                            />
                        </ContainerText>
                    )
                }
            </MainDivRow >}
        </>
    );
};

export default HalReviewerMain;
