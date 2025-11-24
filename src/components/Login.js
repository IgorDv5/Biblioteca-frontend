import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import "./Css/Login.css";
import api from "../services/api";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", { email, senha }); 

      onLogin({
        user: res.data.user,
        token: res.data.token
      });
    } catch (err) {
      console.error(err);
      const message = err.response?.data?.erro || err.response?.data?.message || "Erro ao logar";
      alert(message);
    }
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleSubmit}>
        <h1>Entrar</h1>

        <div className="input-group">
          <FaUser className="input-icon" />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <FaLock className="input-icon" />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="login-btn">Entrar</button>

        <p className="register-text">
          Não tem conta? <a href="/registro">Cadastre-se</a>
        </p>
      </form>
    </div>
  );
}
