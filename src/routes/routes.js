import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Login from "../components/Login";

function AppRoutes() {
  const location = useLocation();

  const hideHeaderOn = ["/login", "/registro"];

  return (
    <>
      {!hideHeaderOn.includes(location.pathname) && <Header />}

      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/login" element={<Login />} />
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
