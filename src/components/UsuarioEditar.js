import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import "./Css/UsuarioEditar.css";

export default function UsuarioEditar({ user }) {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mensagem, setMensagem] = useState(null);

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const res = await api.get(`/usuarios/${id}`);
        setUsuario(res.data);
      } catch (err) {
        console.error(err);
        setMensagem("Erro ao carregar usuário.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsuario();
  }, [id]);

  if (!user) return <p>Você precisa estar logado para acessar esta página.</p>;
  if (loading) return <p>Carregando dados do usuário...</p>;
  if (!usuario) return <p>{mensagem || "Usuário não encontrado."}</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem(null);

    try {
      await api.put(`/usuarios/${id}`, usuario);
      alert("Usuário atualizado com sucesso!");
      navigate("/admin_usuario");
    } catch (err) {
      console.error(err);
      setMensagem(err.response?.data?.erro || "Erro ao atualizar usuário");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  return (
    <div className="usuario-editar-container">
      <h2>Editar Usuário</h2>
      <form onSubmit={handleSubmit} className="usuario-editar-form">
        <label>
          Nome:
          <input
            type="text"
            name="nome"
            value={usuario.nome}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={usuario.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Pontos:
          <input
            type="number"
            name="pontos"
            value={usuario.pontos || 0}
            onChange={handleChange}
          />
        </label>
        <label>
          Reputação:
          <input
            type="number"
            name="reputacao"
            value={usuario.reputacao || 0}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Salvar Alterações</button>
      </form>
      {mensagem && <p className="mensagem">{mensagem}</p>}
    </div>
  );
}
