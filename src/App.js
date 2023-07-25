import "./App.css";
import { useEffect, useState } from "react";
import Quiz from "./components/Quiz";
import { IoMdSettings } from "react-icons/io";
import EscolherTipo from "./components/EscolherTipo";
import EscolherRegiao from "./components/EscolherRegiao";

function App() {
  const [regiao, setRegiao] = useState("");
  const [tipoNacoes, setTipoNacoes] = useState("");

  useEffect(() => {
    setRegiao("Todas");
    setTipoNacoes("t");
  }, []);

  function handleReconhecidoChange(value) {
    setTipoNacoes(value);
  }

  function handleRegiaoChange(value) {
    setRegiao(value);
  }

  function clickSettings() {
    const settingIcon = document.getElementById("setting-bar");
    settingIcon.classList.toggle("hide-show-bar");
  }

  return (
    <div className="App">
      <IoMdSettings className="settings" onClick={clickSettings} />
      <div className="setting-position-bar">
        <div className="hide-show-bar setting-bar" id="setting-bar">
          <EscolherTipo onChangeReconhecidos={handleReconhecidoChange} />
          <EscolherRegiao onChangeReconhecidos={handleRegiaoChange} />
        </div>
      </div>
      <div className="titulo-quiz">QUIZ PAÍSES</div>
      <hr />
      <div className="tela-quiz">
        <Quiz tipoNacoes={tipoNacoes} regiao={regiao} />
      </div>
    </div>
  );
}

export default App;
