import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";

export default function Home() {
  const [productos] = useState([
    {
      id: 1,
      name: "Filtro de Aceite Bosch",
      brand: "Bosch",
      price: 8500,
      stock: 15,
      category: "Filtros",
      image: "https://images.unsplash.com/photo-1558618644-fbd4c54cd64d?w=200&h=150&fit=crop"
    },
    {
      id: 2,
      name: "Pastillas de Freno Brembo",
      brand: "Brembo",
      price: 28000,
      stock: 8,
      category: "Frenos", 
      image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=200&h=150&fit=crop"
    },
    {
      id: 3,
      name: "Aceite Motor Mobil 1",
      brand: "Mobil",
      price: 18000,
      stock: 25,
      category: "Aceites",
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=200&h=150&fit=crop"
    },
    {
      id: 4,
      name: "Amortiguador Monroe",
      brand: "Monroe",
      price: 35000,
      stock: 12,
      category: "Suspensión",
      image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=200&h=150&fit=crop"
    }
  ]);

  const [categorias] = useState([
    { name: "Filtros", icon: "🔍", color: "#10B981" },
    { name: "Frenos", icon: "🛑", color: "#EF4444" },
    { name: "Motor", icon: "🔧", color: "#3B82F6" },
    { name: "Eléctrica", icon: "⚡", color: "#8B5CF6" }
  ]);

  const navigate = useNavigate();

  const agregarAlCarrito = (producto) => {
    alert(`${producto.name} agregado al carrito!`);
  };

  return (
    <div>
      <Navbar />
      
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '60px 40px',
          borderRadius: '15px',
          textAlign: 'center',
          marginBottom: '40px'
        }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '15px' }}>
            🚗 Encuentra los mejores repuestos automotrices
          </h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '30px' }}>
            Todo lo que necesitas para tu auto en un solo lugar
          </p>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', maxWidth: '600px', margin: '0 auto' }}>
            <input 
              type="text" 
              placeholder="🔍 Buscar repuestos..."
              style={{
                flex: 1,
                padding: '15px',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px'
              }}
            />
            <button style={{
              background: '#10B981',
              color: 'white',
              border: 'none',
              padding: '15px 25px',
              borderRadius: '8px',
              fontSize: '16px',
              cursor: 'pointer'
            }}>
              Buscar
            </button>
          </div>
        </div>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '20px', textAlign: 'center' }}>
            🛠️ Categorías populares
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '20px' 
          }}>
            {categorias.map((cat) => (
              <Link 
                key={cat.name} 
                to="/catalogo" 
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  background: 'white',
                  padding: '25px',
                  borderRadius: '12px',
                  textAlign: 'center',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.3s'
                }}
                onMouseOver={(e) => e.target.style.transform = 'translateY(-5px)'}
                onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
              >
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: cat.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 15px',
                  fontSize: '24px'
                }}>
                  {cat.icon}
                </div>
                <h3 style={{ margin: '0 0 5px 0' }}>{cat.name}</h3>
                <p style={{ margin: 0, color: '#666' }}>Ver productos</p>
              </Link>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '20px', textAlign: 'center' }}>
            ⭐ Productos destacados
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '20px' 
          }}>
            {productos.map((producto) => (
              <div key={producto.id} style={{
                background: 'white',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s'
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
                  {producto.stock < 20 && (
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
                  <h3 style={{ 
                    margin: '0 0 8px 0', 
                    color: '#3B82F6',
                    cursor: 'pointer'
                  }}>
                    {producto.name}
                  </h3>
                  <p style={{ margin: '0 0 15px 0', color: '#666' }}>
                    🏭 {producto.brand}
                  </p>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span style={{
                      fontSize: '1.2rem',
                      fontWeight: 'bold',
                      color: '#10B981'
                    }}>
                      ${producto.price.toLocaleString()}
                    </span>
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
                  <p style={{ 
                    margin: '10px 0 0 0', 
                    fontSize: '0.9rem', 
                    color: '#666' 
                  }}>
                    Stock: {producto.stock} unidades
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <Link 
              to="/catalogo" 
              style={{
                background: '#3B82F6',
                color: 'white',
                padding: '12px 25px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '16px'
              }}
            >
              Ver todos los productos →
            </Link>
          </div>
        </section>

        <section>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '20px', textAlign: 'center' }}>
            🏭 Marcas que trabajamos
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '15px'
          }}>
            {["Bosch", "Brembo", "Mobil", "Castrol", "NGK", "Monroe", "Sachs", "Mahle"].map((marca) => (
              <Link 
                key={marca} 
                to="/catalogo"
                style={{
                  background: 'white',
                  padding: '20px',
                  borderRadius: '8px',
                  textAlign: 'center',
                  textDecoration: 'none',
                  color: '#1F2937',
                  fontWeight: 'bold',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.3s'
                }}
              >
                {marca}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}