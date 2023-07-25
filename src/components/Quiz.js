import BuscaPaises from "./BuscaPaises";
import { useState, useEffect } from "react";
import "./Quiz.css";
import { BiSolidCheckCircle } from "react-icons/bi";
import { TiWarning } from "react-icons/ti";

export default function Quiz(tipoNacoes) {
  const [dgData, setDgData] = useState([]);
  const [randomItem, setRandomItem] = useState(null);
  const [randomCountryName, setRandomCountryName] = useState("");
  const [resultado, setResultado] = useState("");
  const [dgDataFiltered, setDgDataFiltered] = useState([]);
  const [proximo, setProximo] = useState(0);

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
  }, [dgDataFiltered, proximo]);

  useEffect(() => {
    if (randomItem && randomItem.length > 0) {
      const randomIndex = Math.floor(Math.random() * randomItem.length);
      setRandomCountryName(randomItem[randomIndex].translations.por.common);
    }
  }, [randomItem]);

  function compararNomeImpressoClicado(e) {
    const divResultado = document.getElementById("resultado-escolha");

    if (randomCountryName === e.target.alt) {
      divResultado.classList.remove("resultado-errado");
      divResultado.classList.add("resultado-correto");
      setResultado(
        <span>
          {<BiSolidCheckCircle className="icone" />} <br /> CORRETO!
        </span>
      );
    } else {
      divResultado.classList.remove("resultado-correto");
      divResultado.classList.add("resultado-errado");
      setResultado(
        <span>
          {<TiWarning className="icone" />} <br /> {`${e.target.alt}`}
        </span>
      );
    }
  }

  function proximoQuiz() {
    const divResultado = document.getElementById("resultado-escolha");
    divResultado.classList.remove("resultado-correto");
    divResultado.classList.remove("resultado-errado");
    setResultado("");
    setProximo(proximo + 1);
  }

  return (
    <div>
      <BuscaPaises onChange={setDgData} />

      <div className="nome-pais-aleatorio">
        {randomCountryName.toUpperCase()}
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
      <div className="botao-proximo">
        <button className="next-button" onClick={proximoQuiz}>
          Próximo
        </button>
      </div>
    </div>
  );
}
