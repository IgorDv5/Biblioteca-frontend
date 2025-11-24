import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Css/UsuarioList.css";
import { FaPlus } from "react-icons/fa";



export default function Admin({ user }) {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    const fetchUsuarios = async () => {
      try {
        const res = await api.get("/usuarios");
        setUsuarios(res.data);
      } catch (err) {
        console.error(err);
        setError("Erro ao carregar usuários.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, [user]);

  const handleExcluir = async (id) => {
    if (!window.confirm("Deseja realmente excluir este usuário?")) return;

    try {
      await api.delete(`/usuarios/${id}`);
      setUsuarios(usuarios.filter(u => u._id !== id));
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.erro || "Erro ao excluir usuário");
    }
  };

  const handleAlterar = (usuario) => {
    navigate(`/usuarios/editar/${usuario._id}`);
  };

  if (!user) return <p>Você precisa estar logado para acessar esta página.</p>;
  if (loading) return <p>Carregando usuários...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="admin-container">
      <div className="admin-header">
  <h2>Usuários do Sistema</h2>
  <button className="novo-usuario-btn" onClick={() => navigate("/usuarios_cadastrar")}>
    <FaPlus /> Novo Usuário
  </button>
</div>
      <div className="table-wrapper">
        <table className="usuarios-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Pontos</th>
              <th>Reputação</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map(u => (
              <tr key={u._id}>
                <td>{u.nome}</td>
                <td>{u.email}</td>
                <td>{u.pontos}</td>
                <td>{u.reputacao}</td>
                <td>
                  <button className="alterar-btn" onClick={() => handleAlterar(u)}>Alterar</button>
                  <button className="excluir-btn" onClick={() => handleExcluir(u._id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
