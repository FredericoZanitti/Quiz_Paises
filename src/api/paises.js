import axios from "axios";

export default function infoPaises(regiao) {
  let url = "";

  regiao === "Todas"
    ? (url = "https://restcountries.com/v3.1/all")
    : (url = `https://restcountries.com/v3.1/region/${regiao}`);

  return axios.get(url, {
    withCredentials: true,
  });
}
