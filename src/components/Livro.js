import React, { useState, useEffect } from "react";
import api from "../services/api";
import { FaStar } from "react-icons/fa";
import "./Css/Livro.css";

export default function Livros({ user }) {
  const [livros, setLivros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchLivros = async () => {
      try {
        const res = await api.get("/livros");
        setLivros(res.data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.erro || "Erro ao carregar livros");
      } finally {
        setLoading(false);
      }
    };

    fetchLivros();
  }, []);

  const handleEmprestar = async (livroId) => {
    if (!livroId) {
      alert("Erro: livro inválido.");
      return;
    }

    if (!user || !user.id) {
      alert("Você precisa estar logado para pegar um livro emprestado.");
      return;
    }

    const dias = prompt("Por quantos dias deseja pegar o livro?");
    if (!dias) return;

    try {
      const res = await api.post(`/livros/${livroId}/emprestar`, {
        usuarioId: user.id,
        dias,
      });

      alert(res.data.mensagem);


      setLivros(
        livros.map((l) => (l._id === livroId ? res.data.livro : l))
      );
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.erro || "Erro ao emprestar livro");
    }
  };

  const filteredLivros = livros.filter((livro) =>
    livro.titulo.toLowerCase().includes(search.toLowerCase())
  );


  const meusLivros = livros.filter((livro) => user && livro.donoId === user.id);

  if (loading) return <div className="livros-loading">Carregando livros...</div>;
  if (error) return <div className="livros-error">{error}</div>;

  return (
    <div className="livros-container">
      <h2>Lista de Livros</h2>

      <div className="livros-search">
        <input
          type="text"
          placeholder="🔍 Pesquisar por título"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filteredLivros.length === 0 ? (
        <p>Nenhum livro encontrado.</p>
      ) : (
        <ul className="livros-list">
          {filteredLivros.map((livro) => (
            <li key={livro._id} className="livro-item">
              <strong>{livro.titulo}</strong>
              <span>Autor: {livro.autor}</span>
              <span>Status: {livro.status}</span>

              <span>
                Estrelas:{" "}
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    color={i < (livro.estrelas || 0) ? "#FFD700" : "#ccc"}
                  />
                ))}
              </span>

              {livro.ano && <span>Ano: {livro.ano}</span>}

              <button
                className="emprestar-btn"
                onClick={() => handleEmprestar(livro._id)}
                disabled={livro.status === "emprestado"}
              >
                {livro.status === "emprestado"
                  ? "Livro Emprestado"
                  : "Pegar Emprestado"}
              </button>
            </li>
          ))}
        </ul>
      )}

      {}
      <div className="meus-livros-card">
        <h2>Seus Livros</h2>
        {meusLivros.length === 0 ? (
          <p>Você não tem livros cadastrados.</p>
        ) : (
          <ul className="livros-list">
            {meusLivros.map((livro) => (
              <li key={livro._id} className="livro-item">
                <strong>{livro.titulo}</strong>
                <span>Autor: {livro.autor}</span>
                <span>Status: {livro.status}</span>
                <span>
                  Estrelas:{" "}
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      color={i < (livro.estrelas || 0) ? "#FFD700" : "#ccc"}
                    />
                  ))}
                </span>
                {livro.ano && <span>Ano: {livro.ano}</span>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
