import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Catalogo() {
  const [productos] = useState([
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
      name: "Pastillas de Freno Brembo P50013",
      brand: "Brembo",
      price: 28000,
      stock: 75,
      category: "Frenos",
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=200&fit=crop",
      description: "Pastillas de freno cerámicas de alto rendimiento"
    },
    {
      id: 3,
      name: "Aceite Motor Mobil 1 5W-30",
      brand: "Mobil",
      price: 18000,
      stock: 200,
      category: "Aceites",
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=200&fit=crop",
      description: "Aceite sintético de motor de alta performance"
    },
    {
      id: 4,
      name: "Amortiguador Monroe G7359",
      brand: "Monroe",
      price: 35000,
      stock: 60,
      category: "Suspensión",
      image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=300&h=200&fit=crop",
      description: "Amortiguador hidráulico de doble tubo"
    },
    {
      id: 5,
      name: "Batería Bosch S4 12V 60Ah",
      brand: "Bosch",
      price: 75000,
      stock: 50,
      category: "Eléctrica",
      image: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=300&h=200&fit=crop",
      description: "Batería libre de mantenimiento"
    },
    {
      id: 6,
      name: "Kit Distribución Gates",
      brand: "Gates",
      price: 65000,
      stock: 35,
      category: "Motor",
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=200&fit=crop",
      description: "Kit completo de distribución con bomba de agua"
    }
  ]);

  const [filtros, setFiltros] = useState({
    categoria: '',
    marca: '',
    busqueda: ''
  });

  const navigate = useNavigate();

  const agregarAlCarrito = (producto) => {
    alert(`${producto.name} agregado al carrito!`);
  };

  const productosFiltrados = productos.filter(producto => {
    const cumpleBusqueda = !filtros.busqueda || 
      producto.name.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
      producto.brand.toLowerCase().includes(filtros.busqueda.toLowerCase());
    
    const cumpleCategoria = !filtros.categoria || producto.category === filtros.categoria;
    const cumpleMarca = !filtros.marca || producto.brand === filtros.marca;

    return cumpleBusqueda && cumpleCategoria && cumpleMarca;
  });

  return (
    <div>
      <Navbar />
      
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ 
          background: 'white', 
          padding: '20px', 
          marginBottom: '20px', 
          borderRadius: '10px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          display: 'flex',
          gap: '15px',
          alignItems: 'center'
        }}>
          <input
            type="text"
            placeholder="🔍 Buscar repuestos, marcas, modelos..."
            value={filtros.busqueda}
            onChange={(e) => setFiltros({...filtros, busqueda: e.target.value})}
            style={{
              flex: 1,
              padding: '12px 15px',
              border: '2px solid #E5E7EB',
              borderRadius: '8px',
              fontSize: '16px'
            }}
          />
          <button style={{
            background: '#3B82F6',
            color: 'white',
            border: 'none',
            padding: '12px 20px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px'
          }}>
            🔍 Buscar
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '30px' }}>
          <aside style={{
            background: 'white',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            height: 'fit-content'
          }}>
            <h3 style={{ margin: '0 0 20px 0' }}>🔍 Filtros</h3>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Categoría
              </label>
              <select 
                value={filtros.categoria} 
                onChange={(e) => setFiltros({...filtros, categoria: e.target.value})}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #D1D5DB',
                  borderRadius: '6px'
                }}
              >
                <option value="">Todas las categorías</option>
                <option value="Filtros">Filtros</option>
                <option value="Frenos">Frenos</option>
                <option value="Aceites">Aceites</option>
                <option value="Suspensión">Suspensión</option>
                <option value="Eléctrica">Eléctrica</option>
                <option value="Motor">Motor</option>
              </select>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Marca
              </label>
              <select 
                value={filtros.marca} 
                onChange={(e) => setFiltros({...filtros, marca: e.target.value})}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #D1D5DB',
                  borderRadius: '6px'
                }}
              >
                <option value="">Todas las marcas</option>
                <option value="Bosch">Bosch</option>
                <option value="Brembo">Brembo</option>
                <option value="Mobil">Mobil</option>
                <option value="Monroe">Monroe</option>
                <option value="Gates">Gates</option>
              </select>
            </div>

            <button 
              onClick={() => setFiltros({categoria: '', marca: '', busqueda: ''})}
              style={{
                width: '100%',
                background: '#EF4444',
                color: 'white',
                border: 'none',
                padding: '10px',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              🗑️ Limpiar filtros
            </button>
          </aside>

          <main>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <h2 style={{ margin: 0 }}>
                📦 Catálogo de Repuestos ({productosFiltrados.length})
              </h2>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '20px'
            }}>
              {productosFiltrados.map(producto => (
                <div key={producto.id} style={{
                  background: 'white',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}>
                  <div style={{ position: 'relative', cursor: 'pointer' }}>
                    <img 
                      src={producto.image} 
                      alt={producto.name}
                      style={{
                        width: '100%',
                        height: '200px',
                        objectFit: 'cover'
                      }}
                    />
                    {producto.stock < 50 && (
                      <span style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        background: '#EF4444',
                        color: 'white',
                        padding: '5px 10px',
                        borderRadius: '20px',
                        fontSize: '12px'
                      }}>
                        ¡Pocas unidades!
                      </span>
                    )}
                  </div>
                  <div style={{ padding: '20px' }}>
                    <span style={{
                      background: '#3B82F6',
                      color: 'white',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '12px'
                    }}>
                      {producto.category}
                    </span>
                    <h3 style={{ 
                      margin: '10px 0 5px 0', 
                      color: '#3B82F6',
                      cursor: 'pointer'
                    }}>
                      {producto.name}
                    </h3>
                    <p style={{ margin: '0 0 10px 0', color: '#666' }}>
                      🏭 {producto.brand}
                    </p>
                    <p style={{ margin: '0 0 15px 0', color: '#666', fontSize: '14px' }}>
                      {producto.description}
                    </p>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '10px'
                    }}>
                      <div>
                        <span style={{
                          fontSize: '1.2rem',
                          fontWeight: 'bold',
                          color: '#10B981'
                        }}>
                          ${producto.price.toLocaleString()}
                        </span>
                        <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#666' }}>
                          Stock: {producto.stock}
                        </p>
                      </div>
                      <button 
                        onClick={() => agregarAlCarrito(producto)}
                        style={{
                          background: '#10B981',
                          color: 'white',
                          border: 'none',
                          padding: '8px 15px',
                          borderRadius: '6px',
                          cursor: 'pointer'
                        }}
                      >
                        🛒 Agregar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {productosFiltrados.length === 0 && (
              <div style={{
                textAlign: 'center',
                padding: '60px 20px',
                background: 'white',
                borderRadius: '12px'
              }}>
                <h3>😔 No se encontraron productos</h3>
                <p>Intenta modificar los filtros de búsqueda</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}