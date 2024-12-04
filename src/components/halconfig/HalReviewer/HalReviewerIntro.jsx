import { useState } from "react";
import styled from "styled-components";
import HalReviewerMain from "./HalReviewerMain";


const ContainerBtn = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items:center;

  button{
    border:none;
    background-color: #17bf63;
    width:200px;
    padding: 10px;
    border-radius:15px;
    color:white;
    transition: all 0.3s ease;
  }

  button:hover{
    background-color: #128a48;
    border-radius:0px;
    transition: all 0.3s ease;
  }
`;


const HalReviewer = () => {

    const [state, setState] = useState(0);

    

    return (
        <>

            {state === 20 &&
                <ContainerBtn >
                    <button onClick={() => setState(1)}>Modifica Hal Esistente</button>
                </ContainerBtn>}

            {state === 0 && (
                <div className='divAperto perflex'>
                    {/*<span onClick={() => setState(0)} className='chiudiDiv'>
                        &times;
            </span>*/}
                    <HalReviewerMain></HalReviewerMain>
                </div>
            )}
        </>
    );
};

export default HalReviewer;