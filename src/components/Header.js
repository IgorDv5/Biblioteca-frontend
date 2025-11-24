import "./Css/Header.css";
import { Link } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import Logo from "../assets/imgs/logo.png"

export default function Header({ user, onLogout }) {
  return (
    <header className="header">
      <div className="header-container">

        {}
        <Link to="/" className="header-logo">
          <img src={Logo} alt="logo" className="logo-img" />
          <h1>Biblioteca</h1>
        </Link>

        {}
        <nav className="header-nav">
            <Link to="/livros">Livros</Link>
            <Link to="/">Emprestar</Link>
            <Link to="/">Devolver</Link>

          {user ? (
            <>
              <Link to="/perfil">Perfil</Link>
              <Link to="/novo-livro">Cadastrar Livro</Link>
              {user.isAdmin && <Link to="/admin">DashBord Admin</Link>}
                {user && <span className="user-name">Olá, {user.nome}</span>}
              <button className="logout-btn" onClick={onLogout}>Sair</button>            
            </>
          ) : (
            <Link to="/login" className="login-box">
              <FiUser className="login-icon" />
              <span>
                <strong>Entre</strong> ou <strong>Cadastre-se</strong>
              </span>
            </Link>
          )}
        </nav>

      </div>
    </header>
  );
}
