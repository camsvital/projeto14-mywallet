import axios from "axios";

const URL = import.meta.env.VITE_API_URL;

function createConfig(token) {
  return { headers: { Authorization: `Bearer ${token}` } };
}

function getTransactions(token) {
  const promise = axios.get(`${URL}/transaction`, createConfig(token));
  return promise;
}

function createTransactions(body, token) {
  const promise = axios.post(
    `${URL}/transaction`,
    body,
    createConfig(token)
  );
  return promise;
}

const apiTransaction = { getTransactions, createTransactions };
export default apiTransaction;
