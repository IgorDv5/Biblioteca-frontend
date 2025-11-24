import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Login from "../components/Login";

function AppRoutes() {
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  // 🔥 Carregar usuário salvo ao iniciar
  useEffect(() => {
    const saved = localStorage.getItem("userData");
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  // 🔥 LOGIN
  const handleLogin = (data) => {
    setUser(data.user);
    localStorage.setItem("userData", JSON.stringify(data.user));
    localStorage.setItem("token", data.token);

    navigate("/");
  };

  // 🔥 LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  const hideHeaderOn = ["/login", "/registro"];

  return (
    <>
      {!hideHeaderOn.includes(location.pathname) &&
        <Header user={user} onLogout={handleLogout} />}

      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/registro" element={<h1>Registro</h1>} />
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
