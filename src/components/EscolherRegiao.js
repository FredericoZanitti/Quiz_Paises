import "./EscolherTipo.css";

export default function EscolherTipo({ onChangeReconhecidos }) {
  function handleChange(event) {
    onChangeReconhecidos(event.target.value);
  }

  return (
    <div className="escolher-tipo">
      <label htmlFor="radioAfrica" className="input-label">
        Região
      </label>
      <input
        type="radio"
        className="input-radio"
        name="regiao"
        id="radioAfrica"
        value="Africa"
        onChange={handleChange}
      />
      <label htmlFor="radioAfrica" className="input-label">
        <div className="radio-btn"></div>
        <span>África</span>
      </label>

      <input
        type="radio"
        className="input-radio"
        name="regiao"
        id="radioAmerica"
        value="Americas"
        onChange={handleChange}
      />
      <label htmlFor="radioAmerica" className="input-label">
        <div className="radio-btn"></div>
        <span>América</span>
      </label>

      <input
        type="radio"
        className="input-radio"
        name="regiao"
        id="radioAsia"
        value="Asia"
        onChange={handleChange}
      />
      <label htmlFor="radioAsia" className="input-label">
        <div className="radio-btn"></div>
        <span>Ásia</span>
      </label>

      <input
        type="radio"
        className="input-radio"
        name="regiao"
        id="radioEuropa"
        value="Europe"
        onChange={handleChange}
      />
      <label htmlFor="radioEuropa" className="input-label">
        <div className="radio-btn"></div>
        <span>Europa</span>
      </label>

      <input
        type="radio"
        className="input-radio"
        name="regiao"
        id="radioOceania"
        value="Oceania"
        onChange={handleChange}
      />
      <label htmlFor="radioOceania" className="input-label">
        <div className="radio-btn"></div>
        <span>Oceania</span>
      </label>

      <input
        type="radio"
        className="input-radio"
        name="regiao"
        id="radioTodas"
        value="Todas"
        onChange={handleChange}
        defaultChecked="true"
      />
      <label htmlFor="radioTodas" className="input-label">
        <div className="radio-btn"></div>
        <span>Todas</span>
      </label>
    </div>
  );
}
