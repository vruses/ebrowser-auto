import HttpClient from "./http";

const httpClient = new HttpClient({
  baseURL: "http://127.0.0.1:3001/",
  headers: {
    "Content-Type": "application/json",
  },
});
type HttpClientFactoryFn = () => HttpClient;
const getHttpClient: HttpClientFactoryFn = () => {
  return httpClient;
};
export default getHttpClient;
