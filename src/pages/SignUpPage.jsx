import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import MyWalletLogo from "../components/MyWalletLogo";
import { useState } from "react";
import apiAuth from "../services/apiAuth";

export default function SignUpPage() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  function handleForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSignUp(e) {
    e.preventDefault();
    if (form.password === form.passwordConfirm) {
      const object = {
        name: form.name,
        email: form.email,
        password: form.password,
      };
      apiAuth
        .signUp(object)
        .then((res) => {
          console.log(res.data);
          nav("/");
        })
        .catch((err) => {
          console.log(err.response);
          alert(err.response.data);
        });
    } else {
      alert("Senha de confirmação incorreta!");
    }
  }

  return (
    <SingUpContainer>
      <form onSubmit={handleSignUp}>
        <MyWalletLogo />

        <input
          name="name"
          placeholder="Nome"
          type="text"
          required
          value={form.name}
          onChange={handleForm}
          data-test="name"
        />
        <input
          name="email"
          placeholder="E-mail"
          type="email"
          required
          value={form.email}
          onChange={handleForm}
          data-test="email"
        />
        <input
          name="password"
          placeholder="Senha"
          type="password"
          autocomplete="new-password"
          required
          value={form.password}
          onChange={handleForm}
          data-test="password"
        />
        <input
          name="passwordConfirm"
          placeholder="Confirme a senha"
          type="password"
          autocomplete="new-password"
          required
          value={form.passwordConfirm}
          onChange={handleForm}
          data-test="conf-password"
        />

        <button data-test="sign-up-submit">Cadastrar</button>
      </form>

      <Link to="/">Já tem uma conta? Entre agora!</Link>
    </SingUpContainer>
  );
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
