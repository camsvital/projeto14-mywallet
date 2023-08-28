import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import apiTransaction from "../services/apiTransactions";

export default function TransactionsPage() {
  const nav = useNavigate();
  const { user } = useContext(UserContext);

  const [form, setForm] = useState({ description: "", value: "" });
  const { tipo } = useParams();

  function handleRegister(e) {
    e.preventDefault();

    if (form.value <= 0) {
      alert("O valor da transação tem que ser positivo");
      return;
    }

    const object = { [e.target.name]: e.target.value, type: tipo };

    apiTransaction
      .createTransactions(object, user.token)
      .then((res) => {
        console.log(res.data);
        nav("/home");
      })
      .catch((err) => alert(err.response.data));
  }

  function handleForm(e) {
    const value = e.target.name;
    switch (value) {
      case "value":
        setForm({ ...form, value: Number(e.target.value) });
        break;
      case "description":
        setForm({ ...form, description: e.target.value.toString() });
        break;
    }
  }

  return (
    <TransactionsContainer>
      <h1>Nova {tipo}</h1>
      <form onSubmit={handleRegister}>
        <input
          name="value"
          placeholder="Valor"
          type="number"
          step="0.01"
          min="0"
          required
          value={form.value}
          onChange={handleForm}
          data-test="registry-amount-input"
        />

        <input
          name="description"
          placeholder="Descrição"
          type="text"
          value={form.description}
          required
          onChange={handleForm}
          data-test="registry-name-input"
        />

        <button type="submit" data-test="registry-save">
          Salvar {tipo}
        </button>
      </form>
    </TransactionsContainer>
  );
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`;
