import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import MyWalletLogo from "../components/MyWalletLogo";
import apiAuth from "../services/apiAuth";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

export default function SignInPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { setUser } = useContext(UserContext);
  const nav = useNavigate();

  function handleForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSignIn(e) {
    e.preventDefault();

    console.log(form);
    apiAuth
      .login(form)
      .then((res) => {
        nav("/home");
        const { name, email, token } = res.data;
        setUser({ name, email, token });
        localStorage.setItem("user", JSON.stringify({ name, email, token }));
      })
      .catch((err) => {
        console.log(err.response.data.message);
        alert(err.response.data.message);
      });
  }

  return (
    <SingInContainer>
      <form onSubmit={handleSignIn}>
        <MyWalletLogo />

        <input
          data-test="email"
          name="email"
          placeholder="E-mail"
          type="email"
          value={form.email}
          onChange={handleForm}
          required
        />

        <input
          data-test="password"
          name="password"
          placeholder="Senha"
          type="password"
          autocomplete="new-password"
          value={form.password}
          onChange={handleForm}
          required
        />
        <button data-test="sign-in-submit" type="submit">
          Entrar
        </button>
      </form>

      <Link to="/cadastro">Primeira vez? Cadastre-se!</Link>
    </SingInContainer>
  );
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
