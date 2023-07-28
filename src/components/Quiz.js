import BuscaPaises from "./BuscaPaises";
import { useState, useEffect } from "react";
import "./Quiz.css";
import { BiSolidCheckCircle } from "react-icons/bi";
import { TiWarning, TiThumbsUp } from "react-icons/ti";
import { GiTrophy } from "react-icons/gi";
import { FaFaceSurprise } from "react-icons/fa6";
import { MdCancel, MdCheckCircle, MdRedo } from "react-icons/md";

export default function Quiz(tipoNacoes) {
  const [maxQuestoes, setmaxQuestoes] = useState(20);
  const [paisesJaUtilizados, setPaisesJaUtilizados] = useState([]);
  const [dgData, setDgData] = useState([]);
  const [randomItem, setRandomItem] = useState(null);
  const [itemUnico, setItemUnico] = useState(-1);
  const [randomCountryName, setRandomCountryName] = useState("");
  const [dgDataFiltered, setDgDataFiltered] = useState([]);
  const [endGame, setEndGame] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [contagem, setContagem] = useState(1);
  const [acertos, setAcertos] = useState(0);
  const [erros, setErros] = useState(0);
  const [pulos, setPulos] = useState(0);
  const [desabJump, setDesabJump] = useState(false);

  /* MOSTRAR DADOS ====================================================================================================================================== */
  useEffect(() => {
    const dgFiltered = dgData
      .filter((item) => {
        return !paisesJaUtilizados.includes(item.translations.por.common);
      })
      .filter((item) => {
        switch (tipoNacoes.tipoNacoes) {
          case "s":
            return item.independent === true;
          case "n":
            return item.independent === false;
          default:
            return item;
        }
      })
      .filter((item) => {
        switch (tipoNacoes.regiao) {
          case "Africa":
            return item.region === "Africa";
          case "Asia":
            return item.region === "Asia";
          case "Americas":
            return item.region === "Americas";
          case "Europe":
            return item.region === "Europe";
          case "Oceania":
            return item.region === "Oceania";
          default:
            return item;
        }
      });

    setDgDataFiltered(dgFiltered);
    setmaxQuestoes(tipoNacoes.qtdeRodadas);
  }, [dgData, tipoNacoes]);

  useEffect(() => {
    const singleIndex = [];
    const randomItems = [];
    const indicesPaisesUtilizados = [];

    if (dgDataFiltered.length > 0) {
      paisesJaUtilizados.forEach((item) => {
        indicesPaisesUtilizados.push(
          dgDataFiltered.findIndex(
            (pais) => pais.translations.por.common === item
          )
        );
      });

      let indiceUnico = Math.floor(Math.random() * dgDataFiltered.length);
      let count = 0;
      while (indicesPaisesUtilizados.includes(indiceUnico)) {
        indiceUnico = Math.floor(Math.random() * dgDataFiltered.length);
        count++;

        if (count === dgDataFiltered.length) {
          break;
        }
      }

      singleIndex.push(indiceUnico);
      setItemUnico(indiceUnico);

      while (singleIndex.length < 4) {
        const randomIndex = Math.floor(Math.random() * dgDataFiltered.length);
        if (!singleIndex.includes(randomIndex)) {
          singleIndex.push(randomIndex);
        }
      }

      singleIndex.map((i) => {
        randomItems.push(dgDataFiltered[i]);
      });

      setRandomItem(embaralharArray(randomItems));
    }
  }, [dgDataFiltered, contagem, pulos]);

  useEffect(() => {
    if (randomItem && randomItem.length > 0) {
      setRandomCountryName(dgDataFiltered[itemUnico].translations.por.common);
    }
  }, [randomItem]);

  /* AÇÕES DIVERSAS ====================================================================================================================================== */

  useEffect(() => {
    const msg = document.getElementById("mensagem-alerta");

    if (contagem < Number.parseInt(maxQuestoes) && (erros > 0 || acertos > 0))
      setContagem(contagem + 1);

    if (erros + acertos === Number.parseInt(maxQuestoes)) {
      setTimeout(() => {
        msg.classList.add("hide-class");
      }, 10000);

      setEndGame(true);
      resultadoFinal();
    } else {
      setTimeout(() => {
        msg.classList.add("hide-class");
      }, 2000);
    }
  }, [erros, acertos]);

  useEffect(() => {
    const msg = document.getElementById("mensagem-alerta");
    if (pulos === 3) {
      setDesabJump(true);
    }
    setTimeout(() => {
      msg.classList.add("hide-class");
    }, 2000);
  }, [pulos]);

  useEffect(() => {
    resetGameQuiz();
  }, [maxQuestoes]);

  /* RESETAR QUIZ */

  function resetGameQuiz() {
    setEndGame(false);
    setMensagem("");
    setContagem(1);
    setAcertos(0);
    setErros(0);
    setPulos(0);
    setDesabJump(false);
    setPaisesJaUtilizados([]);

    const msg = document.getElementById("mensagem-alerta");
    msg.classList.add("hide-class");
  }

  /* PULAR QUIZ */

  function pularQuiz() {
    if (pulos === 2) {
      const msg = document.getElementById("mensagem-alerta");
      msg.classList.remove("resultado-correto");
      msg.classList.remove("resultado-errado");
      msg.classList.remove("mensagem-resultado");
      msg.classList.add("alerta-de-mensagem");
      msg.classList.remove("hide-class");

      setMensagem(
        <span>
          {<TiWarning className="icone" />} <br /> A partir de agora não é mais
          possível pular! Boa sorte!
        </span>
      );
    }

    if (pulos < 3) {
      setPulos(pulos + 1);
    }
  }

  /* AÇÃO AO CLICAR NA BANDERIA ========================================================================================================================== */

  function compararNomeImpressoClicado(e) {
    setPaisesJaUtilizados([...paisesJaUtilizados, randomCountryName]);
    const msg = document.getElementById("mensagem-alerta");
    msg.classList.remove("hide-class");
    msg.classList.remove("resultado-errado");
    msg.classList.remove("alerta-de-mensagem");
    msg.classList.remove("mensagem-resultado");

    if (!endGame) {
      if (randomCountryName === e.target.alt) {
        msg.classList.add("resultado-correto");
        setMensagem(
          <span>
            {<BiSolidCheckCircle className="icone" />} <br /> CORRETO!
          </span>
        );

        setAcertos(acertos + 1);
      } else {
        msg.classList.add("resultado-errado");
        setMensagem(
          <span>
            {<TiWarning className="icone" />} <br /> {`${e.target.alt}`}
          </span>
        );
        setErros(erros + 1);
      }
    }
    if (contagem === Number.parseInt(maxQuestoes)) setDesabJump(true);
  }

  /* RESULTADO FINAL ==================================================================================================================================== */

  function resultadoFinal() {
    const percentual =
      ((acertos - pulos * 0.2) / Number.parseInt(maxQuestoes)) * 100;
    let msgResutaldo = "";

    /*
    < 20%             => Humm, precisa aprender um pouco mais sobre bandeiras!
    entre 21 e 40%    => Pode melhorar!
    entre 41 e 60%    => Você conhece umpouco sobre bandeiras, hein?
    entre 61 e 80%    => Uau! Impressionante!
    entre 81 e 90%    => Quase temos um vexilólogo aqui!
    > 90%             => Parabéns! Temos um Atlas ambulante aqui!
  */

    if (percentual < 20) {
      msgResutaldo = (
        <span>
          <TiWarning className="icone" /> <br />
          Aproveitamento: {percentual.toFixed(1)}% <br />
          Precisa aprender um pouco mais sobre bandeiras!
        </span>
      );
    } else if (percentual > 20 && percentual <= 40) {
      msgResutaldo = (
        <span>
          <TiWarning className="icone" /> <br />
          Aproveitamento: {percentual.toFixed(1)}% <br />
          Pode melhorar!
        </span>
      );
    } else if (percentual > 40 && percentual <= 60) {
      msgResutaldo = (
        <span>
          <TiThumbsUp className="icone" /> <br />
          Aproveitamento: {percentual.toFixed(1)}% <br />
          Você conhece umpouco sobre bandeiras, hein?
        </span>
      );
    } else if (percentual > 60 && percentual <= 80) {
      msgResutaldo = (
        <span>
          <TiThumbsUp className="icone" /> <br />
          Aproveitamento: {percentual.toFixed(1)}% <br />
          Uau! Realmente, impressionante!
        </span>
      );
    } else if (percentual > 80 && percentual <= 90) {
      msgResutaldo = (
        <span>
          <FaFaceSurprise className="icone" /> <br />
          Aproveitamento: {percentual.toFixed(1)}% <br />
          Quase temos um vexilólogo aqui!
        </span>
      );
    } else {
      msgResutaldo = (
        <span>
          <GiTrophy className="icone" /> <br />
          Aproveitamento: {percentual.toFixed(0)}% <br />
          Parabéns! Temos um Atlas ambulante aqui!
        </span>
      );
    }

    const msg = document.getElementById("mensagem-alerta");
    msg.classList.remove("resultado-correto");
    msg.classList.remove("resultado-errado");
    msg.classList.remove("alerta-de-mensagem");
    msg.classList.add("mensagem-resultado");
    msg.classList.remove("hide-class");

    setMensagem(<span>{msgResutaldo}</span>);
  }

  /* FUNÇÕES DIVERSAS ================================================================================================================================= */

  function embaralharArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  return (
    <div>
      <BuscaPaises onChange={setDgData} />

      <div className="questao-numero">{`Questão ${contagem} de ${maxQuestoes}`}</div>

      <div className="nome-pais-aleatorio">
        {`${randomCountryName.toUpperCase()}`}
      </div>

      <div className="bandeiras-quiz">
        {randomItem &&
          randomItem.map((item, index) => (
            <div className="bandeira">
              <img
                key={index}
                src={item.flags.png}
                alt={item.translations.por.common}
                onClick={compararNomeImpressoClicado}
              />
            </div>
          ))}
      </div>
      <div className="mensagem-alerta hide-class" id="mensagem-alerta">
        {mensagem}
      </div>
      <div className="botoes">
        <button
          className="jump-button"
          disabled={desabJump}
          onClick={pularQuiz}
        >
          Pular
        </button>
        <button className="reset-button" onClick={resetGameQuiz}>
          Reiniciar
        </button>
      </div>

      <div className="painel-pontuacao-geral">
        <div className="painel-pontuacao">
          <div className="pontuacao">Pontuação</div>
          <div className="icone-acertou">
            <MdCheckCircle />
          </div>
          <div>{acertos}</div>
          <div className="icone-errou">
            <MdCancel />
          </div>
          <div>{erros}</div>
          <div className="icone-pulou">
            <MdRedo />
          </div>
          <div>{pulos}</div>
        </div>
      </div>
    </div>
  );
}
