import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Css/LivroCriar.css";

export default function LivroCriar({ user }) {
  const navigate = useNavigate();

  const [usuarios, setUsuarios] = useState([]);
  const [livro, setLivro] = useState({
    titulo: "",
    autor: "",
    donoId: "",
    status: "disponivel",
    emprestadoPara: null,
    dataEmprestimo: null,
    dataDevolucaoPrevista: null
  });

  const [mensagem, setMensagem] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const res = await api.get("/usuarios");
        setUsuarios(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsuarios();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLivro({ ...livro, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensagem(null);

    try {
      await api.post("/livros", livro);
      setMensagem("Livro criado com sucesso!");
      navigate("/admin_livro");
    } catch (err) {
      console.error(err);
      setMensagem(err.response?.data?.erro || "Erro ao criar livro");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="livro-criar-container">
      <h2>Cadastrar Livro</h2>
      <form onSubmit={handleSubmit} className="livro-criar-form">
        <label>
          Título:
          <input
            type="text"
            name="titulo"
            value={livro.titulo}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Autor:
          <input
            type="text"
            name="autor"
            value={livro.autor}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Dono do Livro:
          <select
            name="donoId"
            value={livro.donoId}
            onChange={handleChange}
            required
          >
            <option value="">Selecione um usuário</option>
            {usuarios.map((u) => (
              <option key={u._id} value={u._id}>
                {u.nome} ({u.email})
              </option>
            ))}
          </select>
        </label>
        <label>
          Status:
          <select name="status" value={livro.status} onChange={handleChange}>
            <option value="disponivel">Disponível</option>
            <option value="emprestado">Emprestado</option>
          </select>
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Cadastrando..." : "Cadastrar Livro"}
        </button>
      </form>
      {mensagem && <p className="mensagem">{mensagem}</p>}
    </div>
  );
}
