import "./EscolherTipo.css";

export default function EscolherQtdeRodadas({ onChangeQuantidade }) {
  function handleChange(event) {
    onChangeQuantidade(event.target.value);
  }

  return (
    <div className="escolher-qtde-rodadas">
      <label htmlFor="search" className="quantidade-rodadas-label">
        Quantidade de Rodadas
      </label>
      <input
        type="number"
        name="search"
        id="search"
        className="quantidade-rodadas-input"
        defaultValue={20}
        onChange={handleChange}
      />
      <br />
      <span id="inf-maximo" className="visibilidade">
        Máximo de x rodadas
      </span>
    </div>
  );
}
