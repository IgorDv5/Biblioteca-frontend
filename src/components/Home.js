import "./Css/Home.css";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home-container">

      <h1 className="home-title">Bem-vindo à Biblioteca</h1>

    <div className="cards-grid">

  <div className="card">
    <h3>Livros</h3>
    <p>Explore todos os livros disponíveis na biblioteca.</p>
    <Link to="/livros" className="card-btn">Ver mais</Link>
  </div>

  <div className="card">
    <h3>Cadastre seu livro para empréstimo</h3>
    <p>Realize empréstimos facilmente usando o sistema.</p>
    <Link to="/novo-livro" className="card-btn">Emprestar</Link>
  </div>

  <div className="card">
    <h3>Devolver</h3>
    <p>Controle e faça devoluções de livros rapidamente.</p>
    <Link to="/devolver" className="card-btn">Devolver</Link>
  </div>

</div>

    </div>
  );
}
