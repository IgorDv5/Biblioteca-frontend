import React, { useState, useEffect } from "react";
import api from "../services/api";
import "./Css/Devolucao.css";

export default function Devolucao({ user }) {
  const [livros, setLivros] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user || !user.id) return; // só executa se usuário estiver definido

    const fetchLivrosEmprestados = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get(`/livros/emprestados/${user.id}`);
        setLivros(res.data);
      } catch (err) {
        console.error(err);
        setError("Erro ao carregar livros emprestados.");
      } finally {
        setLoading(false);
      }
    };

    fetchLivrosEmprestados();
  }, [user]);

  const handleDevolver = async (livroId) => {
  const estrelas = parseInt(prompt("Avalie o livro de 1 a 5 estrelas:"));
  if (!estrelas || estrelas < 1 || estrelas > 5) {
    alert("Avaliação inválida! Informe um número entre 1 e 5.");
    return;
  }

  if (!window.confirm("Deseja realmente devolver este livro?")) return;

  try {
    await api.post(`/livros/${livroId}/devolver`, { estrelas });
    setLivros(livros.filter(l => l._id !== livroId));
    alert("Livro devolvido com sucesso!");
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.erro || "Erro ao devolver livro");
  }
};


  if (!user) return <p>Você precisa estar logado para ver esta página.</p>;
  if (loading) return <p>Carregando livros...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="devolucao-container">
      <h2>Livros Que Você Pegou Emprestado</h2>
      {livros.length === 0 ? (
        <p>Você não possui livros emprestados no momento.</p>
      ) : (
        <ul className="devolucao-list">
          {livros.map((livro) => (
            <li key={livro._id} className="devolucao-item">
              <strong>{livro.titulo}</strong> Autor: {livro.autor} 
              <span>
                Status:{" "}
                {livro.status === "emprestado"
                  ? `Com ${livro.emprestadoParaNome || "Usuário"}`
                  : livro.status}
              </span>
              <span>
               Data do emprestimo:{livro.dataEmprestimo} <br></br>
               Data Para Devolução: {livro.dataDevolucaoPrevista}
              </span>
              <button
                className="devolver-btn"
                onClick={() => handleDevolver(livro._id)}
              >
                Devolver
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
