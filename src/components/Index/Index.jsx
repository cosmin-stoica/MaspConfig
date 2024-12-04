import styled from "styled-components";
import Loader from "../../elements/loader";

const MainDiv = styled.div`
  position: absolute;
  display: flex;
  justify-content: center:
  align-items: center;
  flex-direction: column;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
`;



const BtnContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
`;


const Btn = styled.button`
  border: none;
  padding: 5px;
  padding-right: 15px;
  padding-left:15px;
  background-color:white;
  border-radius: 15px;
  transition: all 0.3s ease;
  width: 150px;

  &:hover {
    background-color: rgb(230,230,230);
    border-radius: 15px;
    transition: all 0.3s ease;
  }
`;


const Index = () => {
    return (
        <>
            <Loader></Loader>
            <div style={{width: '100%', height: '100vh', position: 'relative'}}>
            <MainDiv>
                <div>
                    <BtnContainer>
                        <a href="/pause"><Btn>Pause</Btn></a>
                        <a href="/halconfig"><Btn>Hal Config</Btn></a>
                        <a href="/jobconfig"><Btn>Job Config</Btn></a>
                        <a href="/provaFS"><Btn>Prova Fs</Btn></a>
                    </BtnContainer>
                </div>
            </MainDiv>
            </div>
        </>
    );
};

export default Index;