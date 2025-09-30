import "../../styles/usuario.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Home() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    // Simulamos la carga de datos del backend
    setProductos([
      {
        id: 1,
        name: "Filtro de Aceite Bosch",
        brand: "Bosch",
        price: 25.50,
        stock: 150,
        category: "Filtros",
        image: "https://via.placeholder.com/200x150/3B82F6/ffffff?text=Filtro+Bosch"
      },
      {
        id: 2,
        name: "Pastillas de Freno Brembo",
        brand: "Brembo", 
        price: 85.00,
        stock: 75,
        category: "Frenos",
        image: "https://via.placeholder.com/200x150/EF4444/ffffff?text=Pastillas+Brembo"
      },
      {
        id: 3,
        name: "Aceite Motor Mobil 1",
        brand: "Mobil",
        price: 45.00,
        stock: 200,
        category: "Aceites",
        image: "https://via.placeholder.com/200x150/10B981/ffffff?text=Aceite+Mobil"
      },
      {
        id: 4,
        name: "Batería Bosch S4",
        brand: "Bosch",
        price: 120.00,
        stock: 50,
        category: "Eléctrica",
        image: "https://via.placeholder.com/200x150/F59E0B/ffffff?text=Bateria+Bosch"
      }
    ]);

    setCategorias([
      { name: "Motor", icon: "🔧", color: "#3B82F6" },
      { name: "Frenos", icon: "🛑", color: "#EF4444" },
      { name: "Suspensión", icon: "🏎️", color: "#8B5CF6" },
      { name: "Luces", icon: "💡", color: "#F59E0B" }
    ]);
  }, []);

  return (
    <div className="page">
      {/* Navegación */}
      <nav className="nav-bar">
        <div className="nav-brand">
          <h2>🏪 RepuestosAuto</h2>
        </div>
        <div className="nav-links">
          <Link to="/catalogo">Catálogo</Link>
          <Link to="/auth/login">Iniciar Sesión</Link>
          <Link to="/auth/register" className="btn-primary">Registrarse</Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="hero">
        <h1 className="hero-title">🚗 Encuentra los mejores repuestos automotrices</h1>
        <p className="hero-subtitle">Todo lo que necesitas para tu auto en un solo lugar. Repuestos nuevos y usados de calidad.</p>
        <div className="hero-search-container">
          <input
            type="text"
            placeholder="Buscar repuestos por nombre, marca o modelo..."
            className="hero-search"
          />
          <button className="search-btn">🔍 Buscar</button>
        </div>
        <div className="hero-stats">
          <div className="stat">
            <strong>500+</strong>
            <span>Productos</span>
          </div>
          <div className="stat">
            <strong>50+</strong>
            <span>Marcas</span>
          </div>
          <div className="stat">
            <strong>24/7</strong>
            <span>Soporte</span>
          </div>
        </div>
      </div>

      {/* Categorías */}
      <section className="section">
        <h2 className="section-title">🛠️ Categorías populares</h2>
        <div className="grid grid-cols-4 gap-4">
          {categorias.map((cat) => (
            <Link key={cat.name} to={`/catalogo?categoria=${cat.name}`} className="category-card">
              <div className="category-icon" style={{ backgroundColor: cat.color }}>
                <span className="icon">{cat.icon}</span>
              </div>
              <h3>{cat.name}</h3>
              <p>Ver productos</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Productos destacados */}
      <section className="section">
        <h2 className="section-title">⭐ Productos destacados</h2>
        <div className="grid grid-cols-4 gap-4">
          {productos.map((producto) => (
            <div key={producto.id} className="product-card">
              <div className="product-image">
                <img src={producto.image} alt={producto.name} />
                {producto.stock < 100 && (
                  <span className="stock-badge">¡Últimas unidades!</span>
                )}
              </div>
              <div className="product-info">
                <h3 className="product-name">{producto.name}</h3>
                <p className="product-brand">{producto.brand}</p>
                <div className="product-footer">
                  <span className="product-price">${producto.price}</span>
                  <button className="add-cart-btn">🛒 Agregar</button>
                </div>
                <p className="product-stock">Stock: {producto.stock} unidades</p>
              </div>
            </div>
          ))}
        </div>
        <div className="view-more">
          <Link to="/catalogo" className="btn-primary">Ver todos los productos →</Link>
        </div>
      </section>

      {/* Marcas populares */}
      <section className="section">
        <h2 className="section-title">🏭 Marcas que trabajamos</h2>
        <div className="brands-grid">
          {["Bosch", "Brembo", "Mobil", "Castrol", "NGK", "Monroe", "Sachs", "Mahle"].map((marca) => (
            <div key={marca} className="brand-card">
              <div className="brand-logo">{marca}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA para vendedores */}
      <section className="cta-vendedor">
        <div className="cta-content">
          <h2>💼 ¿Tienes repuestos para vender?</h2>
          <p>Únete a nuestro marketplace y llega a miles de clientes. Comisiones bajas y soporte completo.</p>
          <div className="cta-buttons">
            <Link to="/auth/register" className="btn-primary">Regístrate como vendedor</Link>
            <Link to="/catalogo" className="btn-secondary">Explorar catálogo</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>🏪 RepuestosAuto</h4>
            <p>Tu tienda de confianza para repuestos automotrices</p>
          </div>
          <div className="footer-section">
            <h4>Enlaces</h4>
            <Link to="/catalogo">Catálogo</Link>
            <Link to="/auth/register">Registro</Link>
            <Link to="/admin/dashboard">Admin</Link>
          </div>
          <div className="footer-section">
            <h4>Contacto</h4>
            <p>📧 info@repuestosauto.com</p>
            <p>📱 +54 11 1234-5678</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 RepuestosAuto - Sistema completo de gestión de repuestos</p>
        </div>
      </footer>
    </div>
  );
}
