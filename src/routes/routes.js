import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Login from "../components/Login";
import Home from "../components/Home";
import Perfil from "../components/Perfil";
import Livro from "../components/Livro";
import Devolucao from "../components/Devolucao";
import AdminUsuario from "../components/UsuarioList";
import UsuarioEditar from "../components/UsuarioEditar";
import UsuarioCadastrarLivro from "../components/UsuarioCadastrarLivro";


function AppRoutes() {
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("userData");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const handleLogin = (data) => {
    setUser(data.user);
    localStorage.setItem("userData", JSON.stringify(data.user));
    localStorage.setItem("token", data.token);
    navigate("/");
  };

  const handleLogout = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  const hideHeaderOn = ["/login", "/registro"];

  return (
    <>
      {!hideHeaderOn.includes(location.pathname) && (
        <Header user={user} onLogout={handleLogout} />
      )}

      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/registro" element={<h1>Registro</h1>} />
        <Route path="/perfil" element={<Perfil user={user} />} />
        <Route path="/livros" element={<Livro user={user} />} />
        <Route path="/devolucao" element={<Devolucao user={user} />} />
        <Route path="/admin_usuario" element={<AdminUsuario user={user} />} />
        <Route path="/usuarios/editar/:id" element={<UsuarioEditar user={user} />} />
        <Route path="/usuario_cadastrar_livro" element={<UsuarioCadastrarLivro user={user} />} />
      </Routes>
    </>
  );
}

export default function Wrapper() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
