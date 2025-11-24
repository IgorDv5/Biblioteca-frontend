import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import "./Css/Login.css";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email });
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
