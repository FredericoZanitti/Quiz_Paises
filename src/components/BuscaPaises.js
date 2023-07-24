import { useState, useEffect } from "react";
import infoPaises from "../api/paises.js";

export default function BuscaPaises({ onChange }) {
  const [dgData, setDgData] = useState([]);

  useEffect(() => {
    onClickSearch("Todas");
  }, []);

  useEffect(() => {
    onChange(dgData);
  }, [dgData]);

  const onClickSearch = (regiao) => {
    infoPaises(regiao)
      .then((resp) => {
        const sortedData = resp.data.sort((a, b) => {
          return a.translations.por.common.localeCompare(
            b.translations.por.common
          );
        });

        setDgData(sortedData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
