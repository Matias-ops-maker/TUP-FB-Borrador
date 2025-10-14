import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Carrito() {
  const [carrito, setCarrito] = useState([
    {
      id: 1,
      name: "Filtro de Aceite Bosch P7077",
      brand: "Bosch",
      price: 8500,
      cantidad: 2,
      category: "Filtros",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop"
    },
    {
      id: 2,
      name: "Pastillas de Freno Brembo",
      brand: "Brembo",
      price: 28000,
      cantidad: 1,
      category: "Frenos",
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=200&fit=crop"
    }
  ]);

  const navigate = useNavigate();

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
  };

  const eliminarDelCarrito = (productoId) => {
    const nuevoCarrito = carrito.filter(item => item.id !== productoId);
    setCarrito(nuevoCarrito);
  };

  const vaciarCarrito = () => {
    const confirmar = window.confirm('¿Estás seguro de que quieres vaciar todo el carrito?');
    if (confirmar) {
      setCarrito([]);
    }
  };

  const calcularSubtotal = () => {
    return carrito.reduce((total, item) => total + (item.price * item.cantidad), 0);
  };

  const calcularEnvio = () => {
    const subtotal = calcularSubtotal();
    return subtotal > 100000 ? 0 : 5000;
  };

  const calcularImpuestos = () => {
    return calcularSubtotal() * 0.21;
  };

  const calcularTotal = () => {
    return calcularSubtotal() + calcularEnvio() + calcularImpuestos();
  };

  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(precio);
  };

  const cantidadItems = carrito.reduce((total, item) => total + item.cantidad, 0);

  return (
    <div>
      <Navbar />
      
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px',
          paddingBottom: '20px',
          borderBottom: '2px solid #E5E7EB'
        }}>
          <h1>🛒 Mi Carrito de Compras</h1>
          <button 
            onClick={() => navigate('/catalogo')}
            style={{
              background: '#6B7280',
              color: 'white',
              border: 'none',
              padding: '10px 15px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            ← Seguir Comprando
          </button>
        </div>

        {carrito.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <h2>🛒 Tu carrito está vacío</h2>
            <p>¡Agrega algunos productos increíbles!</p>
            <Link 
              to="/catalogo" 
              style={{
                background: '#3B82F6',
                color: 'white',
                padding: '12px 25px',
                borderRadius: '8px',
                textDecoration: 'none',
                display: 'inline-block',
                marginTop: '20px'
              }}
            >
              Ir al Catálogo
            </Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
            <div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px'
              }}>
                <h3>Productos en tu carrito ({cantidadItems} items)</h3>
                <button 
                  onClick={vaciarCarrito}
                  style={{
                    background: '#EF4444',
                    color: 'white',
                    border: 'none',
                    padding: '8px 15px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  🗑️ Vaciar Carrito
                </button>
              </div>

              <div>
                {carrito.map(item => (
                  <div key={item.id} style={{
                    display: 'grid',
                    gridTemplateColumns: '100px 1fr auto auto auto',
                    gap: '20px',
                    alignItems: 'center',
                    padding: '20px',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    marginBottom: '15px',
                    background: 'white'
                  }}>
                    <div>
                      <img 
                        src={item.image} 
                        alt={item.name}
                        style={{
                          width: '80px',
                          height: '80px',
                          objectFit: 'cover',
                          borderRadius: '6px'
                        }}
                      />
                    </div>
                    
                    <div>
                      <h4 style={{ margin: '0 0 8px 0', color: '#1F2937' }}>
                        {item.name}
                      </h4>
                      <p style={{ margin: '4px 0', fontSize: '0.9em', color: '#6B7280' }}>
                        🏭 {item.brand}
                      </p>
                      <p style={{ margin: '4px 0', fontSize: '0.9em', color: '#6B7280' }}>
                        🏷️ {item.category}
                      </p>
                      <p style={{ margin: '4px 0', fontSize: '0.9em', color: '#6B7280' }}>
                        Precio unitario: {formatearPrecio(item.price)}
                      </p>
                    </div>
                    
                    <div>
                      <label style={{ display: 'block', marginBottom: '5px' }}>Cantidad:</label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <button 
                          onClick={() => modificarCantidad(item.id, item.cantidad - 1)}
                          disabled={item.cantidad <= 1}
                          style={{
                            width: '30px',
                            height: '30px',
                            border: '1px solid #D1D5DB',
                            background: '#F9FAFB',
                            cursor: 'pointer',
                            borderRadius: '4px'
                          }}
                        >
                          -
                        </button>
                        <span style={{ fontWeight: 'bold', minWidth: '30px', textAlign: 'center' }}>
                          {item.cantidad}
                        </span>
                        <button 
                          onClick={() => modificarCantidad(item.id, item.cantidad + 1)}
                          style={{
                            width: '30px',
                            height: '30px',
                            border: '1px solid #D1D5DB',
                            background: '#F9FAFB',
                            cursor: 'pointer',
                            borderRadius: '4px'
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <strong>{formatearPrecio(item.price * item.cantidad)}</strong>
                    </div>
                    
                    <button 
                      onClick={() => eliminarDelCarrito(item.id)}
                      style={{
                        background: '#EF4444',
                        color: 'white',
                        border: 'none',
                        padding: '8px 12px',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div style={{
                background: 'white',
                padding: '25px',
                borderRadius: '12px',
                border: '1px solid #E5E7EB',
                height: 'fit-content'
              }}>
                <h3>📋 Resumen del Pedido</h3>
                
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '12px',
                  color: '#4B5563'
                }}>
                  <span>Subtotal ({cantidadItems} items):</span>
                  <span>{formatearPrecio(calcularSubtotal())}</span>
                </div>
                
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '12px',
                  color: '#4B5563'
                }}>
                  <span>Envío:</span>
                  <span>
                    {calcularEnvio() === 0 ? (
                      <span style={{ color: '#10B981' }}>¡GRATIS!</span>
                    ) : (
                      formatearPrecio(calcularEnvio())
                    )}
                  </span>
                </div>
                
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '12px',
                  color: '#4B5563'
                }}>
                  <span>IVA (21%):</span>
                  <span>{formatearPrecio(calcularImpuestos())}</span>
                </div>
                
                <hr />
                
                <div style={{
                  fontSize: '1.2em',
                  color: '#1F2937',
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontWeight: 'bold'
                }}>
                  <span>Total:</span>
                  <span>{formatearPrecio(calcularTotal())}</span>
                </div>

                {calcularSubtotal() < 100000 && (
                  <p style={{ fontSize: '0.9em', color: '#F59E0B', marginTop: '10px' }}>
                    💡 Agrega {formatearPrecio(100000 - calcularSubtotal())} más para envío gratis
                  </p>
                )}
                
                <button
                  onClick={() => alert('Funcionalidad de checkout no implementada en el prototipo')}
                  style={{
                    background: '#10B981',
                    color: 'white',
                    padding: '15px 20px',
                    borderRadius: '8px',
                    border: 'none',
                    width: '100%',
                    marginTop: '20px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  💳 Proceder al Checkout
                </button>
                
                <Link 
                  to="/catalogo" 
                  style={{
                    background: '#3B82F6',
                    color: 'white',
                    padding: '10px 15px',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    display: 'block',
                    textAlign: 'center',
                    marginTop: '10px',
                    fontSize: '14px'
                  }}
                >
                  🛍️ Seguir Comprando
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}