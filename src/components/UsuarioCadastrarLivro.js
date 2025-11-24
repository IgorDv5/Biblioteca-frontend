import React, { useState } from "react";
import api from "../services/api";
import "./Css/UsuarioCadastrarLivro.css";
import { useNavigate } from "react-router-dom";

export default function CadastrarLivro({ user }) {
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [estrelas, setEstrelas] = useState(1);
  const [status, setStatus] = useState("disponivel");
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState(null);

  if (!user) return <p>Você precisa estar logado para cadastrar um livro.</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensagem(null);

    try {
      const res = await api.post("/livros", {
        titulo,
        autor,
        estrelas,
        status,
        donoId: user._id || user.id,
      });

      setMensagem("Livro cadastrado com sucesso!");
      setTitulo("");
      setAutor("");
      setEstrelas(1);
      setStatus("disponivel");
      navigate("/livros");
    } catch (err) {
      console.error(err);
      setMensagem(err.response?.data?.erro || "Erro ao cadastrar livro");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cadastrar-livro-container">
      <h2>Cadastrar Livro</h2>
      <form className="cadastrar-livro-form" onSubmit={handleSubmit}>
        <label>
          Título:
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </label>
        <label>
          Autor:
          <input
            type="text"
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
            required
          />
        </label>
        <label>
          Estrelas (1 a 5):
          <input
            type="number"
            value={estrelas}
            min="1"
            max="5"
            onChange={(e) => setEstrelas(Number(e.target.value))}
          />
        </label>
        <label>
          Status:
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="disponivel">Disponível</option>
          </select>
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>
      {mensagem && <p className="mensagem">{mensagem}</p>}
    </div>
  );
}
