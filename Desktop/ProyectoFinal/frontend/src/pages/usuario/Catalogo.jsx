import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../../styles/catalogo-new.css';
import UserNavbar from '../../components/UserNavbar.jsx';

export default function Catalogo() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [filtros, setFiltros] = useState({
    categoria: '',
    marca: '',
    precioMin: '',
    precioMax: '',
    busqueda: ''
  });
  const [carrito, setCarrito] = useState([]);
  const [ordenar, setOrdenar] = useState('nombre');
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const categoriasUnicas = [...new Set(productos.map(p => p.category))];
    setCategorias(categoriasUnicas);
  }, [productos]);
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('search');
    const categoryQuery = searchParams.get('categoria');
    const brandQuery = searchParams.get('marca');
    
    if (searchQuery || categoryQuery || brandQuery) {
      setFiltros(prev => ({
        ...prev,
        busqueda: searchQuery || '',
        categoria: categoryQuery || '',
        marca: brandQuery || ''
      }));
    }
  }, [location]);
  useEffect(() => {
    setProductos([
      {
        id: 1,
        name: "Filtro de Aceite Bosch P7077",
        brand: "Bosch",
        price: 8500,
        stock: 150,
        category: "Filtros",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
        description: "Filtro de aceite de alta calidad para motores modernos"
      },
      {
        id: 2,
        name: "Filtro de Aire K&N E-9268",
        brand: "K&N",
        price: 15000,
        stock: 80,
        category: "Filtros",
        image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=300&h=200&fit=crop",
        description: "Filtro de aire de alto flujo, lavable y reutilizable"
      },
      {
        id: 3,
        name: "Filtro de Combustible WIX 33518",
        brand: "WIX",
        price: 6500,
        stock: 120,
        category: "Filtros",
        image: "https://images.unsplash.com/photo-1580414771084-d4f8c57a6db6?w=300&h=200&fit=crop",
        description: "Filtro de combustible con alta eficiencia de filtrado"
      },
      {
        id: 4,
        name: "Pastillas de Freno Brembo P50013",
        brand: "Brembo",
        price: 28000,
        stock: 75,
        category: "Frenos",
        image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=200&fit=crop",
        description: "Pastillas de freno cerámicas de alto rendimiento"
      },
      {
        id: 5,
        name: "Discos de Freno Ferodo DDF1562",
        brand: "Ferodo",
        price: 45000,
        stock: 45,
        category: "Frenos",
        image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=300&h=200&fit=crop",
        description: "Discos de freno ventilados con ranuras direccionales"
      },
      {
        id: 6,
        name: "Líquido de Frenos DOT 4 Bosch",
        brand: "Bosch",
        price: 5000,
        stock: 200,
        category: "Frenos",
        image: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=300&h=200&fit=crop",
        description: "Líquido de frenos sintético DOT 4 de alta calidad"
      },
      {
        id: 7,
        name: "Aceite Motor Mobil 1 5W-30",
        brand: "Mobil",
        price: 18000,
        stock: 200,
        category: "Aceites",
        image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=200&fit=crop",
        description: "Aceite sintético de motor de alta performance"
      },
      {
        id: 8,
        name: "Aceite Transmisión Castrol ATF Dex III",
        brand: "Castrol",
        price: 12000,
        stock: 85,
        category: "Aceites",
        image: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=300&h=200&fit=crop",
        description: "Fluido para transmisiones automáticas"
      },
      {
        id: 9,
        name: "Grasa Multiuso Shell Retinax EP2",
        brand: "Shell",
        price: 7500,
        stock: 150,
        category: "Aceites",
        image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=200&fit=crop",
        description: "Grasa multiuso de litio para rodamientos"
      },
      {
        id: 10,
        name: "Amortiguador Monroe G7359",
        brand: "Monroe",
        price: 35000,
        stock: 60,
        category: "Suspensión",
        image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=300&h=200&fit=crop",
        description: "Amortiguador hidráulico de doble tubo"
      },
      {
        id: 11,
        name: "Resorte Espiral Sachs 994054",
        brand: "Sachs",
        price: 25000,
        stock: 40,
        category: "Suspensión",
        image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=200&fit=crop",
        description: "Resorte espiral para suspensión delantera"
      },
      {
        id: 12,
        name: "Buje Estabilizador TRW JBU550",
        brand: "TRW",
        price: 8500,
        stock: 100,
        category: "Suspensión",
        image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=300&h=200&fit=crop",
        description: "Buje de poliuretano para barra estabilizadora"
      },
      {
        id: 13,
        name: "Batería Bosch S4 12V 60Ah",
        brand: "Bosch",
        price: 75000,
        stock: 50,
        category: "Eléctrica",
        image: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=300&h=200&fit=crop",
        description: "Batería libre de mantenimiento con tecnología AGM"
      },
      {
        id: 14,
        name: "Bujías NGK Iridium IX",
        brand: "NGK",
        price: 12500,
        stock: 180,
        category: "Eléctrica",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
        description: "Bujías de iridio para mayor durabilidad"
      },
      {
        id: 15,
        name: "Alternador Valeo TG12C024",
        brand: "Valeo",
        price: 95000,
        stock: 25,
        category: "Eléctrica",
        image: "https://images.unsplash.com/photo-1580414771084-d4f8c57a6db6?w=300&h=200&fit=crop",
        description: "Alternador reconstruido 12V 90A"
      },
      {
        id: 16,
        name: "Kit Distribución Gates K015578XS",
        brand: "Gates",
        price: 65000,
        stock: 35,
        category: "Motor",
        image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=200&fit=crop",
        description: "Kit completo de distribución con bomba de agua"
      },
      {
        id: 17,
        name: "Junta Culata Mahle HS54375",
        brand: "Mahle",
        price: 22000,
        stock: 45,
        category: "Motor",
        image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=300&h=200&fit=crop",
        description: "Junta de culata multicapa de acero"
      },
      {
        id: 18,
        name: "Bomba de Agua Febi 17086",
        brand: "Febi",
        price: 18500,
        stock: 70,
        category: "Motor",
        image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=300&h=200&fit=crop",
        description: "Bomba de agua con impulsor de material compuesto"
      },
      {
        id: 19,
        name: "Filtro Habitáculo Mann CU2434",
        brand: "Mann",
        price: 9500,
        stock: 90,
        category: "Climatización",
        image: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=300&h=200&fit=crop",
        description: "Filtro de habitáculo con carbón activado"
      },
      {
        id: 20,
        name: "Compresor A/C Denso 447100-1580",
        brand: "Denso",
        price: 185000,
        stock: 15,
        category: "Climatización",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
        description: "Compresor de aire acondicionado remanufacturado"
      }
    ]);

    setCategorias([
      "Filtros", "Frenos", "Aceites", "Suspensión", "Eléctrica", 
      "Motor", "Climatización", "Escape", "Carrocería", "Transmisión"
    ]);
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
      setCarrito(JSON.parse(carritoGuardado));
    }
  }, []);
  const agregarAlCarrito = (producto) => {
    const productoExistente = carrito.find(item => item.id === producto.id);
    let nuevoCarrito;

    if (productoExistente) {
      nuevoCarrito = carrito.map(item =>
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      );
    } else {
      nuevoCarrito = [...carrito, { ...producto, cantidad: 1 }];
    }

    setCarrito(nuevoCarrito);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
    window.dispatchEvent(new Event('storage'));
  };

  const eliminarDelCarrito = (productoId) => {
    const nuevoCarrito = carrito.filter(item => item.id !== productoId);
    setCarrito(nuevoCarrito);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
  };

  const modificarCantidad = (productoId, nuevaCantidad) => {
    if (nuevaCantidad === 0) {
      eliminarDelCarrito(productoId);
      return;
    }

    const nuevoCarrito = carrito.map(item =>
      item.id === productoId
        ? { ...item, cantidad: nuevaCantidad }
        : item
    );

    setCarrito(nuevoCarrito);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
  };
  const productosFiltrados = productos
    .filter(producto => {
      const searchTerm = filtros.busqueda.toLowerCase();
      const cumpleBusqueda = !filtros.busqueda || 
        producto.name.toLowerCase().includes(searchTerm) ||
        producto.brand.toLowerCase().includes(searchTerm) ||
        producto.category.toLowerCase().includes(searchTerm) ||
        (producto.description && producto.description.toLowerCase().includes(searchTerm));
      
      const cumpleCategoria = !filtros.categoria || producto.category === filtros.categoria;
      const cumpleMarca = !filtros.marca || producto.brand === filtros.marca;
      const cumplePrecioMin = !filtros.precioMin || producto.price >= parseFloat(filtros.precioMin);
      const cumplePrecioMax = !filtros.precioMax || producto.price <= parseFloat(filtros.precioMax);

      return cumpleBusqueda && cumpleCategoria && cumpleMarca && cumplePrecioMin && cumplePrecioMax;
    })
    .sort((a, b) => {
      switch (ordenar) {
        case 'precio-asc':
          return a.price - b.price;
        case 'precio-desc':
          return b.price - a.price;
        case 'stock':
          return b.stock - a.stock;
        case 'relevancia':
          if (filtros.busqueda) {
            const searchTerm = filtros.busqueda.toLowerCase();
            const aRelevance = (
              (a.name.toLowerCase().includes(searchTerm) ? 10 : 0) +
              (a.brand.toLowerCase().includes(searchTerm) ? 5 : 0) +
              (a.category.toLowerCase().includes(searchTerm) ? 3 : 0)
            );
            const bRelevance = (
              (b.name.toLowerCase().includes(searchTerm) ? 10 : 0) +
              (b.brand.toLowerCase().includes(searchTerm) ? 5 : 0) +
              (b.category.toLowerCase().includes(searchTerm) ? 3 : 0)
            );
            return bRelevance - aRelevance;
          }
          return a.name.localeCompare(b.name);
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const totalCarrito = carrito.reduce((total, item) => total + (item.price * item.cantidad), 0);
  const cantidadItems = carrito.reduce((total, item) => total + item.cantidad, 0);

  return (
    <div className="catalogo-container">
      <UserNavbar />
      
      <div className="catalogo-content">
        {}
        <div className="search-section">
          <input
            type="text"
            placeholder="🔍 Buscar repuestos, marcas, modelos..."
            value={filtros.busqueda}
            onChange={(e) => setFiltros({...filtros, busqueda: e.target.value})}
            className="search-input"
          />
          <button className="search-button">
            🔍 Buscar
          </button>
        </div>

        <div className="main-layout">
          {}
          <aside className="filtros-sidebar">
            <div className="filtros-header">
              <h3>🔍 Filtros</h3>
              <button 
                className="limpiar-filtros"
                onClick={() => setFiltros({categoria: '', marca: '', precioMin: '', precioMax: '', busqueda: ''})}
              >
                🗑️ Limpiar
              </button>
            </div>
            
            <div className="filtro-grupo">
              <label>Categoría</label>
              <select 
                value={filtros.categoria} 
                onChange={(e) => setFiltros({...filtros, categoria: e.target.value})}
              >
                <option value="">Todas las categorías</option>
                {categorias.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="filtro-grupo">
              <label>Marca</label>
              <select 
                value={filtros.marca} 
                onChange={(e) => setFiltros({...filtros, marca: e.target.value})}
              >
                <option value="">Todas las marcas</option>
                {[...new Set(productos.map(p => p.brand))].map(marca => (
                  <option key={marca} value={marca}>{marca}</option>
                ))}
              </select>
            </div>

            <div className="filtro-grupo">
              <label>Precio</label>
              <div className="precio-inputs">
                <input
                  type="number"
                  placeholder="Mín"
                  value={filtros.precioMin}
                  onChange={(e) => setFiltros({...filtros, precioMin: e.target.value})}
                />
                <input
                  type="number"
                  placeholder="Máx"
                  value={filtros.precioMax}
                  onChange={(e) => setFiltros({...filtros, precioMax: e.target.value})}
                />
              </div>
            </div>

            {}
            {carrito.length > 0 && (
              <div className="carrito-sidebar">
                <h4>🛒 Tu Carrito ({cantidadItems})</h4>
                <div className="carrito-items">
                  {carrito.slice(0, 3).map(item => (
                    <div key={item.id} className="carrito-item">
                      <img src={item.image} alt={item.name} />
                      <div className="item-info">
                        <p>{item.name.substring(0, 25)}...</p>
                        <div className="item-controls">
                          <button onClick={() => modificarCantidad(item.id, item.cantidad - 1)}>-</button>
                          <span>{item.cantidad}</span>
                          <button onClick={() => modificarCantidad(item.id, item.cantidad + 1)}>+</button>
                        </div>
                        <p className="item-precio">${(item.price * item.cantidad).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                  {carrito.length > 3 && (
                    <p className="mas-items">+{carrito.length - 3} productos más</p>
                  )}
                </div>
                <div className="carrito-total">
                  <strong>Total: ${totalCarrito.toFixed(2)}</strong>
                </div>
                <Link to="/usuario/carrito" className="btn-ver-carrito">
                  🛒 Ver Carrito Completo
                </Link>
              </div>
            )}
          </aside>

          {}
          <main className="productos-main">
            <div className="productos-header">
              <div className="header-info">
                <h2>📦 Catálogo de Repuestos</h2>
                <span className="productos-count">({productosFiltrados.length} productos)</span>
              </div>
              <div className="ordenar">
                <label>Ordenar por:</label>
                <select value={ordenar} onChange={(e) => setOrdenar(e.target.value)}>
                  {filtros.busqueda && <option value="relevancia">Relevancia</option>}
                  <option value="nombre">Nombre A-Z</option>
                  <option value="precio-asc">Precio: Menor a Mayor</option>
                  <option value="precio-desc">Precio: Mayor a Menor</option>
                  <option value="stock">Stock Disponible</option>
                </select>
              </div>
            </div>

            <div className="productos-grid">
              {productosFiltrados.map(producto => (
                <div key={producto.id} className="producto-card">
                  <div 
                    className="producto-imagen"
                    onClick={() => navigate(`/producto/${producto.id}`)}
                  >
                    <img src={producto.image} alt={producto.name} />
                    {producto.stock < 50 && (
                      <span className="stock-bajo">¡Pocas unidades!</span>
                    )}
                  </div>
                  <div className="producto-info">
                    <span className="producto-categoria">{producto.category}</span>
                    <h3 
                      onClick={() => navigate(`/producto/${producto.id}`)}
                      className="producto-nombre"
                    >
                      {producto.name}
                    </h3>
                    <p className="producto-marca">🏭 {producto.brand}</p>
                    <p className="producto-descripcion">{producto.description}</p>
                    <div className="producto-footer">
                      <div className="precio-stock">
                        <span className="precio">${producto.price.toLocaleString()}</span>
                        <span className="stock">Stock: {producto.stock}</span>
                      </div>
                      <button 
                        className="btn-agregar"
                        onClick={() => agregarAlCarrito(producto)}
                        disabled={producto.stock === 0}
                      >
                        {producto.stock === 0 ? '❌ Agotado' : '🛒 Agregar'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {productosFiltrados.length === 0 && (
              <div className="no-productos">
                <div className="no-productos-icon">😔</div>
                <h3>No se encontraron productos</h3>
                <p>Intenta modificar los filtros de búsqueda</p>
                <button 
                  className="reset-filtros"
                  onClick={() => setFiltros({categoria: '', marca: '', precioMin: '', precioMax: '', busqueda: ''})}
                >
                  🔄 Reiniciar filtros
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
