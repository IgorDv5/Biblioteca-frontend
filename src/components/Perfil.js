import React from "react";
import { useNavigate } from "react-router-dom";
import "./Css/Perfil.css";

export default function Perfil({ user }) {
  const navigate = useNavigate();

  // Se não estiver logado, redireciona para login
  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="perfil-container">
      <h2>Perfil do Usuário</h2>
      
      <div className="perfil-card">
        <p><strong>Nome:</strong> {user.nome}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Pontos:</strong> {user.pontos}</p>
        <p><strong>Reputação:</strong> {user.reputacao}</p>
      </div>
    </div>
  );
}
