import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Css/LivroEditar.css";

export default function LivroEditar({ user }) {
    const { id } = useParams();
    const navigate = useNavigate();

    const [livro, setLivro] = useState({
        titulo: "",
        autor: "",
        status: "disponivel",
    });

    const [loading, setLoading] = useState(true);
    const [mensagem, setMensagem] = useState(null);

    useEffect(() => {
        if (!user) return;

        const fetchLivro = async () => {
            try {
                const res = await api.get(`/livros/${id}`);
                const { titulo, autor, status } = res.data;
                setLivro({ titulo, autor, status });
            } catch (err) {
                console.error(err);
                setMensagem("Erro ao carregar livro.");
            } finally {
                setLoading(false);
            }
        };

        fetchLivro();
    }, [id, user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLivro({ ...livro, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensagem(null);
        try {
         
            await api.put(`/livros/${id}`, {
                titulo: livro.titulo,
                autor: livro.autor,
                status: livro.status
            });
            setMensagem("Livro atualizado com sucesso!");
            navigate("/admin_livro");
        } catch (err) {
            console.error(err);
            setMensagem(err.response?.data?.erro || "Erro ao atualizar livro");
        }
    };

    if (!user) return <p>Você precisa estar logado para acessar esta página.</p>;
    if (loading) return <p>Carregando livro...</p>;

    return (
        <div className="livro-editar-container">
            <h2>Editar Livro</h2>
            <form onSubmit={handleSubmit} className="livro-editar-form">
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
                    Status:
                    <select name="status" value={livro.status} onChange={handleChange}>
                        <option value="disponivel">Disponível</option>
                        <option value="emprestado">Emprestado</option>
                    </select>
                </label>
                
                <button type="submit">Atualizar Livro</button>
            </form>
            {mensagem && <p className="mensagem">{mensagem}</p>}
        </div>
    );
}
