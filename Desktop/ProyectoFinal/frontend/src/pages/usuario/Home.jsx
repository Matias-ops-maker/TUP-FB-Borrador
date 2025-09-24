import "../../styles/usuario.css";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="page">
      {/* Hero */}
      <div className="hero">
        <h1 className="hero-title">Encuentra repuestos nuevos y usados</h1>
        <p className="hero-subtitle">Todo lo que necesitas para tu auto en un solo lugar.</p>
        <input
          type="text"
          placeholder="Buscar por nombre o marca..."
          className="hero-search"
        />
      </div>

      {/* Categorías */}
      <h2 className="section-title">Categorías populares</h2>
      <div className="grid grid-cols-4 gap-4">
        {["Motor", "Frenos", "Suspensión", "Luces"].map((cat) => (
          <div key={cat} className="card">
            <div className="w-full h-24 bg-gray-200 rounded mb-2"></div>
            <h3>{cat}</h3>
          </div>
        ))}
      </div>

      {/* Productos destacados */}
      <h2 className="section-title">Productos destacados</h2>
      <div className="grid grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((p) => (
          <div key={p} className="card">
            <div className="w-full h-32 bg-gray-200 rounded mb-2"></div>
            <h3>Parte {p}</h3>
            <p>Marca / Modelo</p>
            <span>$120</span>
          </div>
        ))}
      </div>

      {/* CTA para vendedores */}
      <div className="cta-vendedor">
        <h2>¿Tienes repuestos para vender?</h2>
        <p>Únete a nuestro marketplace y llega a más clientes.</p>
        <Link to="/auth/register" className="auth-button">Regístrate como vendedor</Link>
      </div>
    </div>
  );
}
