import BuscaPaises from "./BuscaPaises";
import { useState, useEffect } from "react";
import "./Quiz.css";
import { BiSolidCheckCircle } from "react-icons/bi";
import { TiWarning } from "react-icons/ti";

export default function Quiz(tipoNacoes) {
  const maxQuestoes = 3;
  const [dgData, setDgData] = useState([]);
  const [randomItem, setRandomItem] = useState(null);
  const [randomCountryName, setRandomCountryName] = useState("");
  const [resultado, setResultado] = useState("");
  const [dgDataFiltered, setDgDataFiltered] = useState([]);
  const [proximo, setProximo] = useState(0);
  const [clicou, setClicou] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [contagem, setContagem] = useState(1);
  const [acertos, setAcertos] = useState(0);
  const [erros, setErros] = useState(0);
  const [pulos, setPulos] = useState(0);
  const [desabJump, setDesabJump] = useState(false);
  const [desabNext, setDesabNext] = useState(false);

  useEffect(() => {
    if (pulos === 3) {
      setDesabJump(true);
      setPulos(3);
    }
  }, [pulos]);

  useEffect(() => {
    if (proximo === maxQuestoes - 1) {
      setDesabNext(true);
    }
  }, [proximo]);

  useEffect(() => {
    const dgFiltered = dgData
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
  }, [dgData, tipoNacoes]);

  useEffect(() => {
    const singleIndex = [];
    const randomItems = [];

    if (dgDataFiltered.length > 0) {
      while (singleIndex.length < 4) {
        const randomIndex = Math.floor(Math.random() * dgDataFiltered.length);
        if (!singleIndex.includes(randomIndex)) {
          singleIndex.push(randomIndex);
        }
      }

      singleIndex.map((i) => {
        randomItems.push(dgDataFiltered[i]);
      });

      setRandomItem(randomItems);
    }
  }, [dgDataFiltered, proximo, pulos]);

  useEffect(() => {
    if (randomItem && randomItem.length > 0) {
      const randomIndex = Math.floor(Math.random() * randomItem.length);
      setRandomCountryName(randomItem[randomIndex].translations.por.common);
    }
  }, [randomItem]);

  function compararNomeImpressoClicado(e) {
    const divResultado = document.getElementById("resultado-escolha");

    if (!clicou) {
      if (randomCountryName === e.target.alt) {
        divResultado.classList.remove("resultado-errado");
        divResultado.classList.add("resultado-correto");
        setResultado(
          <span>
            {<BiSolidCheckCircle className="icone" />} <br /> CORRETO!
          </span>
        );

        setAcertos(acertos + 1);
      } else {
        divResultado.classList.remove("resultado-correto");
        divResultado.classList.add("resultado-errado");
        setResultado(
          <span>
            {<TiWarning className="icone" />} <br /> {`${e.target.alt}`}
          </span>
        );
        setErros(erros + 1);
      }
    }
    setClicou(true);
  }

  function proximoQuiz() {
    if (clicou) {
      const divResultado = document.getElementById("resultado-escolha");
      divResultado.classList.remove("resultado-correto");
      divResultado.classList.remove("resultado-errado");
      setResultado("");
      setContagem(contagem + 1);
      setProximo(proximo + 1);
      setClicou(false);
    } else {
      const msg = document.getElementById("mensagem-alerta");
      msg.classList.remove("hide-class");
      setMensagem(
        <span>
          {<TiWarning className="icone" />} <br /> Por favor, é preciso escolher
          uma opção!
        </span>
      );
      setTimeout(() => {
        msg.classList.add("hide-class");
      }, 2000);
    }
  }

  function pularQuiz() {
    if (pulos === 2) {
      const msg = document.getElementById("mensagem-alerta");
      msg.classList.remove("hide-class");
      setMensagem(
        <span>
          {<TiWarning className="icone" />} <br /> A partir de agora não é mais
          possível pular! Boa sorte!
        </span>
      );
      setTimeout(() => {
        msg.classList.add("hide-class");
      }, 3000);
    }

    if (pulos < 3) {
      setPulos(pulos + 1);
      setClicou(false);
    }
  }

  function endGameQuiz() {
    setProximo(0);
    setClicou(false);
    setMensagem("");
    setContagem(1);
    setAcertos(0);
    setErros(0);
    setPulos(0);
    setDesabJump(false);
    setDesabNext(false);
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
      <div id="resultado-escolha">{resultado}</div>
      <div className="mensagem-alerta hide-class" id="mensagem-alerta">
        {mensagem}
      </div>
      <div className="botao-proximo">
        <button
          className="next-button"
          disabled={desabNext}
          onClick={proximoQuiz}
        >
          Próximo
        </button>
        <button
          className="jump-button"
          disabled={desabJump}
          onClick={pularQuiz}
        >
          Pular
        </button>
        <button className="stop-button" onClick={endGameQuiz}>
          Finalizar
        </button>
      </div>

      <div className="erros-acertos">Acertos: {acertos}</div>
      <div className="erros-acertos">Erros: {erros}</div>
      <div className="erros-acertos">Pulos: {pulos}</div>
    </div>
  );
}
