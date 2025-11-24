import "./Css/Home.css";

export default function Home() {
  return (
    <div className="home-container">

      <h1 className="home-title">Bem-vindo à Biblioteca</h1>

      <div className="cards-grid">

        <div className="card">
          <h3>Livros</h3>
          <p>Explore todos os livros disponíveis na biblioteca.</p>
          <button className="card-btn">Ver mais</button>
        </div>

        <div className="card">
          <h3>Emprestar</h3>
          <p>Realize empréstimos facilmente usando o sistema.</p>
          <button className="card-btn">Emprestar</button>
        </div>

        <div className="card">
          <h3>Devolver</h3>
          <p>Controle e faça devoluções de livros rapidamente.</p>
          <button className="card-btn">Devolver</button>
        </div>

      </div>
    </div>
  );
}
