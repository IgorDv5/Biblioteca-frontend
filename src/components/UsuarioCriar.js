import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa"; 
import "./Css/UsuarioCriar.css";

export default function UsuarioCriar() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensagem(null);

    try {
      await api.post("/usuarios", { nome, email, senha });
      setMensagem("Usuário criado com sucesso!");
      setNome("");
      setEmail("");
      setSenha("");
      navigate("/admin_usuario");
    } catch (err) {
      console.error(err);
      setMensagem(err.response?.data?.erro || "Erro ao criar usuário");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="usuario-criar-container">
      <button className="voltar-btn" onClick={() => navigate(-1)}>
        <FaArrowLeft /> Voltar
      </button>

      <h2>Criar Usuário</h2>

      <form onSubmit={handleSubmit} className="usuario-criar-form">
        <label>
          Nome:
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Senha:
          <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Criando..." : "Criar"}
        </button>
      </form>

      {mensagem && <p className="mensagem">{mensagem}</p>}
    </div>
  );
}
