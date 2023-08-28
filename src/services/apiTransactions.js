import axios from "axios";

const apiURL = import.meta.env.VITE_API_URL;

function createConfig(token) {
  return { headers: { Authorization: `Bearer ${token}` } };
}

function getTransactions(token) {
  const promise = axios.get(`${apiURL}/transaction`, createConfig(token));
  return promise;
}

function createTransactions(body, token) {
  const promise = axios.post(
    `${apiURL}/transaction`,
    body,
    createConfig(token)
  );
  return promise;
}

const apiTransaction = { getTransactions, createTransactions };
export default apiTransaction;
