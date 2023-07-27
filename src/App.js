import "./App.css";
import { useEffect, useState } from "react";
import Quiz from "./components/Quiz";
import { IoMdSettings } from "react-icons/io";
import EscolherTipo from "./components/EscolherTipo";
import EscolherRegiao from "./components/EscolherRegiao";
import EscolherQtdeRodadas from "./components/EscolherQtdeRodadas";

function App() {
  const [regiao, setRegiao] = useState("");
  const [tipoNacoes, setTipoNacoes] = useState("");
  const [qtde, setQtde] = useState(20);

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

  function handleQtdeRodadas(value) {
    setQtde(value);
  }

  function clickSettings() {
    const settingIcon = document.getElementById("setting-bar");
    settingIcon.classList.toggle("hide-show-bar");
    const cobrirTela = document.getElementById("cobre-tela");
    cobrirTela.classList.toggle("hide-show-bar");
  }

  return (
    <div className="App">
      <IoMdSettings className="settings" onClick={clickSettings} />
      <div className="setting-position-bar">
        <div className="hide-show-bar setting-bar" id="setting-bar">
          <EscolherTipo onChangeReconhecidos={handleReconhecidoChange} />
          <EscolherRegiao onChangeReconhecidos={handleRegiaoChange} />
          <EscolherQtdeRodadas onChangeQuantidade={handleQtdeRodadas} />
        </div>
      </div>
      <div className="hide-show-bar cobre-tela" id="cobre-tela"></div>
      <div className="titulo-quiz">QUIZ PAÍSES</div>
      <hr />
      <div className="tela-quiz">
        <Quiz tipoNacoes={tipoNacoes} regiao={regiao} qtdeRodadas={qtde} />
      </div>
    </div>
  );
}

export default App;
