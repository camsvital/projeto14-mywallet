import axios from "axios";

const URL = import.meta.env.VITE_API_URL;

function createConfig(token) {
  return { headers: { Authorization: `Bearer ${token}` } };
}

function signIn(body) {
  const promise = axios.post(`${URL}/sign-in`, body);
  return promise;
}

function signUp(body) {
  const promise = axios.post(`${URL}/sign-up`, body);
  return promise;
}

function signOut(token){
  const promise = axios.delete(`${URL}/sessions`, createConfig(token));
  return promise;
}

const apiAuth = { signIn, signUp, signOut };

export default apiAuth;
