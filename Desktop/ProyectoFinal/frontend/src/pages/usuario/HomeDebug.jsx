import "../../styles/usuario.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../api.js";
import Navbar from "../../components/Navbar.jsx";

export default function HomeDebug() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('🔄 Iniciando carga de datos...');
        
        // Cargar productos desde la API
        console.log('📦 Cargando productos...');
        const resProductos = await api.get('/products');
        console.log('✅ Respuesta completa:', resProductos.data);
        console.log('✅ Array de productos:', resProductos.data.data);
        console.log('✅ Productos recibidos:', resProductos.data.data?.length || 0);
        
        // Verificar que la respuesta tenga la estructura correcta
        const productos = resProductos.data.data || resProductos.data || [];
        const productosDestacados = Array.isArray(productos) ? productos.slice(0, 8) : [];
        
        // Formatear productos para el frontend
        const productosFormateados = productosDestacados.map(producto => ({
          id: producto.id,
          name: producto.nombre,
          brand: producto.Brand?.nombre || 'Sin marca',
          price: parseFloat(producto.precio), // Los precios ya están en pesos
          stock: producto.stock,
          category: producto.Category?.nombre || 'Sin categoría',
          image: producto.imagen_url || "https://via.placeholder.com/200x150/3B82F6/ffffff?text=Producto"
        }));
        
        setProductos(productosFormateados);
        console.log('✅ Productos formateados:', productosFormateados.length);

        // Cargar categorías desde la API
        console.log('📁 Cargando categorías...');
        const resCategorias = await api.get('/categories');
        console.log('✅ Respuesta categorías:', resCategorias.data);
        
        // Las categorías vienen directamente como array
        const categorias = Array.isArray(resCategorias.data) ? resCategorias.data : (resCategorias.data.data || []);
        const categoriasFormatted = categorias.map(cat => ({
          name: cat.nombre,
          icon: getCategoryIcon(cat.nombre),
          color: getCategoryColor(cat.nombre)
        }));
        
        setCategorias(categoriasFormatted.slice(0, 6));
        console.log('✅ Datos cargados exitosamente');
        
      } catch (error) {
        console.error('❌ Error cargando datos:', error);
        setError(error.message || 'Error cargando datos');
        
        // Datos de fallback si falla la API
        setProductos([
          {
            id: 1,
            name: "Filtro de Aceite Bosch",
            brand: "Bosch",
            price: 25.99,
            stock: 15,
            category: "Filtros",
            image: "https://images.unsplash.com/photo-1558618644-fbd4c54cd64d?w=200&h=150&fit=crop"
          },
          {
            id: 2,
            name: "Pastillas de Freno Brembo",
            brand: "Brembo",
            price: 89.99,
            stock: 8,
            category: "Frenos",
            image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=200&h=150&fit=crop"
          }
        ]);
        
        setCategorias([
          { name: "Filtros", icon: "🔍", color: "#10B981" },
          { name: "Frenos", icon: "🛑", color: "#EF4444" },
          { name: "Motor", icon: "🔧", color: "#3B82F6" },
          { name: "Eléctrica", icon: "⚡", color: "#8B5CF6" }
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

  if (loading) {
    return (
      <div className="page">
        <Navbar />
        <div style={{padding: '40px', textAlign: 'center'}}>
          <h2>🔄 Cargando datos...</h2>
          <p>Conectando con la API...</p>
        </div>
      </div>
    );
  }

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
            placeholder="🔍 Buscar repuestos (ej: filtro aceite, pastillas freno...)" 
            className="hero-search"
          />
          <button className="hero-search-btn">Buscar</button>
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
          <Link to="/home" className="btn-primary">Ver versión completa con API →</Link>
        </div>
      </section>

      {/* Estado del sistema */}
      <div style={{padding: '20px', backgroundColor: error ? '#f8d7da' : '#d4edda', margin: '20px', borderRadius: '10px'}}>
        <h3>🧪 Estado del Sistema</h3>
        {error ? (
          <div>
            <p>❌ Error: {error}</p>
            <p>🔄 Usando datos de fallback</p>
          </div>
        ) : (
          <div>
            <p>✅ API funcionando correctamente</p>
            <p>✅ {productos.length} productos cargados</p>
            <p>✅ {categorias.length} categorías cargadas</p>
          </div>
        )}
      </div>
    </div>
  );
}