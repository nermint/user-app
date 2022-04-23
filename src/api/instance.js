import axios from "axios";

const apiInstance = axios.create({
  baseURL: "https://restcountries.com/v3.1/",
});

const localInstance = axios.create({
  baseURL: "http://localhost:3000/",
});

export { apiInstance, localInstance };
