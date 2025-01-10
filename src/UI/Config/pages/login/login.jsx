import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import ItodoImage from "../../../elements/itodo-img";
import { NavLink, useNavigate } from 'react-router-dom';
import { usePath } from "../../../../MAIN/Config/PathContext";
import Alert from "../../../globals/components/alert";
import Startup from "../startup/startup.jsx";
import { GoFileDirectoryFill } from "react-icons/go";

const LoginTotalPane = styled.div`
  background-color: white;
  width: 100%;
  height: 100vh;
  display: flex;
`;


const PrimoPane = styled.div`
  background-color: white;
  width: 70%;
  height: 100%;
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 460px) {
    width:100%;
  }
`;

const SecondoPane = styled.div`
  background-color: rgb(38, 38, 38);;
  width: 35%;
  height: 100%;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  position: relative;

  @media (max-width: 460px) {
    display:none;
  }

`;

const AbsoluteLogo = styled(ItodoImage)`
  position: absolute;
  width: 60%;
  top: 50%; /* Posiziona il centro dell'immagine al 50% dall'alto */
  left: 50%; /* Posiziona il centro dell'immagine al 50% da sinistra */
  transform: translate(-50%, -250%); /* Trasla il centro dell'immagine verso il centro del div */
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
  max-width: 100px;

  &:hover {
    background-color: #45a049;
  }
`;

const DivLogin = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  margin-bottom: 40px;
`;

const Bentornato = styled.div`
  font-size: 20px;
`;

const LoginTitle = styled.div`
  font-size: 40px;
  font-weight: 600;
  color: black;
  padding-top: 20px;
  padding-bottom: 40px;
`;

const LoginDirectoryIcon = styled.div`
  color:rgb(240,240,240);
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: rgb(30,30,30);
  border-radius: 50%;
  width: 30px;
  height:30px;
  display:flex;
  justify-content:center;
  align-items:center;
  transition: all 0.3s ease;

  &:hover {
    background-color: #45a049;
    transition: all 0.3s ease;
  }

`;

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { path } = usePath();
  const [parsedLogin, setParsedLogin] = useState(null);
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);
  const [showStartup, setShowStartup] = useState(false);

  useEffect(() => {
    const ODPfilePath = `${path}/Config/Login.ini`;
    window.electron.parseIniFile(ODPfilePath)
      .then((parsedData) => {
        console.log('File .ini parsato:', parsedData);
        setParsedLogin(parsedData);
      })
      .catch((err) => {
        console.error('Errore durante il parsing:', err);
      });
  }, [path]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (parsedLogin && parsedLogin.UTILIZZATORI) {
      const utilizzatori = parsedLogin.UTILIZZATORI;
      const numeroUtilizzatori = parseInt(utilizzatori["Numero utilizzatori"], 10);

      for (let i = 1; i <= numeroUtilizzatori; i++) {
        const nomeUtente = utilizzatori[`Nome utilizzatore ${i}`];
        const passwordUtente = utilizzatori[`Password utilizzatore ${i}`];

        if (nomeUtente === email && passwordUtente === password) {
          navigate('/dashboard');
          return;
        }
      }


      setError({ Title: 'Errore', Description: 'Credenziali non valide' });
    } else {
      setError({ Title: 'Errore', Description: 'Configurazione non caricata correttamente' });
    }

    setShowError(true); // Mostra l'alert
  };

  const closeErrorAlert = () => setShowError(false);

  const handleDirectoryIcon = () => {
    setShowStartup(true); // Mostra il componente Startup
  };

  const handleCloseStartup = () => {
    setShowStartup(false); // Chiudi il componente Startup
  };

  return (
    <>
       {showStartup ? (
        <Startup onConfirm={handleCloseStartup} />
      ) : (
        <div>
          <LoginDirectoryIcon
            onClick={handleDirectoryIcon}
            className="login_directory_icon"
          >
            <GoFileDirectoryFill />
          </LoginDirectoryIcon>
        </div>
      )}
      <div>
        <LoginDirectoryIcon onClick={handleDirectoryIcon} className="login_directory_icon"><GoFileDirectoryFill /></LoginDirectoryIcon>
        <LoginTotalPane>
          <PrimoPane>
            <DivLogin>
              <Bentornato>Bentornato!</Bentornato>
              <LoginTitle>Log In</LoginTitle>
              <LoginForm onSubmit={handleLogin}>
                <Input
                  type="text"
                  placeholder="Username"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} />
                <Input
                  type="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} />
                <Button type="submit">Accedi</Button>
              </LoginForm>
            </DivLogin>
          </PrimoPane>
          <SecondoPane>
            <ItodoImage style={{ marginRight: '20%', maxHeight: '60%', width: 'auto' }} src="images/login_image.png" alt="Login image"></ItodoImage>
            <AbsoluteLogo src="images/logo.png" alt="Login image"></AbsoluteLogo>
          </SecondoPane>
        </LoginTotalPane>
      </div>
      {showError && <Alert Type="error" Title={error.Title} Description={error.Description} onClose={closeErrorAlert} />}
    </>
  );
}

export default Login;