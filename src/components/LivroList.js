import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Css/LivroList.css";
import { FaPlus } from "react-icons/fa";

export default function LivroList({ user }) {
  const [livros, setLivros] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        const [resLivros, resUsuarios] = await Promise.all([
          api.get("/livros"),
          api.get("/usuarios")
        ]);
        setLivros(resLivros.data);
        setUsuarios(resUsuarios.data);
      } catch (err) {
        console.error(err);
        setError("Erro ao carregar livros ou usuários.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleExcluir = async (id) => {
    if (!window.confirm("Deseja realmente excluir este livro?")) return;

    try {
      await api.delete(`/livros/${id}`);
      setLivros(livros.filter(l => l._id !== id));
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.erro || "Erro ao excluir livro");
    }
  };

  const handleAlterar = (livro) => {
    navigate(`/livros/editar/${livro._id}`);
  };

  if (!user) return <p>Você precisa estar logado para acessar esta página.</p>;
  if (loading) return <p>Carregando livros...</p>;
  if (error) return <p>{error}</p>;


  const getNomeDono = (donoId) => {
    const dono = usuarios.find(u => u._id === donoId);
    return dono ? dono.nome : "Desconhecido";
  };

  return (
    <div className="livro-list-container">
      <div className="livro-list-header">
        <h2>Livros Cadastrados</h2>
        <button className="novo-livro-btn" onClick={() => navigate("/livros_cadastrar")}>
          <FaPlus /> Novo Livro
        </button>
      </div>

      <div className="table-wrapper">
        <table className="livros-table">
          <thead>
            <tr>
              <th>Título</th>
              <th>Autor</th>
              <th>Dono</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {livros.map(l => (
              <tr key={l._id}>
                <td>{l.titulo}</td>
                <td>{l.autor}</td>
                <td>{getNomeDono(l.donoId)}</td> {}
                <td>{l.status}</td>
                <td>
                  <button className="alterar-btn" onClick={() => handleAlterar(l)}>Alterar</button>
                  <button className="excluir-btn" onClick={() => handleExcluir(l._id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
