import "../../styles/usuario.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../api.js";
import Navbar from "../../components/Navbar.jsx";

export default function Home() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setLoading(true);
        console.log('🔄 Iniciando carga de datos...');
        
        // Cargar productos desde la API
        console.log('📦 Cargando productos...');
        const resProductos = await api.get('/products');
        console.log('✅ Productos recibidos:', resProductos.data.length);
        
        const productosDestacados = resProductos.data.slice(0, 8); // Tomar los primeros 8 como destacados
        
        // Formatear productos para el frontend
        const productosFormateados = productosDestacados.map(producto => ({
          id: producto.id,
          name: producto.nombre,
          brand: producto.Brand?.nombre || 'Sin marca',
          price: parseFloat(producto.precio) / 100, // Convertir centavos a pesos
          stock: producto.stock,
          category: producto.Category?.nombre || 'Sin categoría',
          image: producto.imagen_url || "https://via.placeholder.com/200x150/3B82F6/ffffff?text=Producto"
        }));
        
        setProductos(productosFormateados);
        console.log('✅ Productos formateados:', productosFormateados.length);

        // Cargar categorías desde la API
        console.log('📁 Cargando categorías...');
        const resCategorias = await api.get('/categories');
        console.log('✅ Categorías recibidas:', resCategorias.data.length);
        
        const categoriasFormatted = resCategorias.data.map(cat => ({
          name: cat.nombre,
          icon: getCategoryIcon(cat.nombre),
          color: getCategoryColor(cat.nombre)
        }));
        
        setCategorias(categoriasFormatted.slice(0, 6)); // Tomar las primeras 6 categorías
        console.log('✅ Categorías formateadas:', categoriasFormatted.length);
        
      } catch (error) {
        console.error('❌ Error cargando datos:', error);
        console.error('❌ Error details:', error.response?.data || error.message);
        
        // Fallback con datos estáticos si falla la API
        console.log('🔄 Usando datos de fallback...');
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
          }
        ]);
        setCategorias([
          { name: "Motor", icon: "🔧", color: "#3B82F6" },
          { name: "Frenos", icon: "🛑", color: "#EF4444" }
        ]);
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, []);

  const getCategoryIcon = (nombre) => {
    const iconos = {
      'Motor': '🔧',
      'Filtros': '🔍', 
      'Frenos': '🛑',
      'Lubricantes': '🛢️',
      'Eléctrica': '⚡',
      'Suspensión': '🏎️',
      'Transmisión': '⚙️',
      'Encendido': '🔥',
      'Neumáticos': '🛞',
      'Escape': '💨'
    };
    return iconos[nombre] || '🔧';
  };

  const getCategoryColor = (nombre) => {
    const colores = {
      'Motor': '#3B82F6',
      'Filtros': '#10B981', 
      'Frenos': '#EF4444',
      'Lubricantes': '#F59E0B',
      'Eléctrica': '#8B5CF6',
      'Suspensión': '#06B6D4',
      'Transmisión': '#84CC16',
      'Encendido': '#F97316',
      'Neumáticos': '#6B7280',
      'Escape': '#64748B'
    };
    return colores[nombre] || '#3B82F6';
  };

  return (
    <div className="page">
      {/* Navegación */}
      <Navbar />

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
