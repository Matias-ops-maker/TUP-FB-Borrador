import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function MisPedidos() {
  const navigate = useNavigate();

  const pedidos = [
    {
      id: '#ORD-001',
      fecha: '2024-01-15',
      estado: 'Entregado',
      total: 45500,
      productos: [
        { name: 'Filtro de Aceite Bosch', cantidad: 2, precio: 8500 },
        { name: 'Pastillas de Freno Brembo', cantidad: 1, precio: 28000 }
      ]
    },
    {
      id: '#ORD-002',
      fecha: '2024-01-20',
      estado: 'En Tránsito',
      total: 32000,
      productos: [
        { name: 'Aceite Motor Castrol 5W-30', cantidad: 4, precio: 8000 }
      ]
    },
    {
      id: '#ORD-003',
      fecha: '2024-01-25',
      estado: 'Procesando',
      total: 15600,
      productos: [
        { name: 'Filtro de Aire K&N', cantidad: 1, precio: 15600 }
      ]
    }
  ];

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'Entregado': return '#10B981';
      case 'En Tránsito': return '#F59E0B';
      case 'Procesando': return '#3B82F6';
      default: return '#6B7280';
    }
  };

  const getEstadoIcon = (estado) => {
    switch (estado) {
      case 'Entregado': return '✅';
      case 'En Tránsito': return '🚚';
      case 'Procesando': return '⏳';
      default: return '📦';
    }
  };

  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(precio);
  };

  return (
    <div>
      <Navbar />
      
      <div style={{
        padding: '20px',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px',
          paddingBottom: '20px',
          borderBottom: '2px solid #E5E7EB'
        }}>
          <h1 style={{ color: '#1F2937' }}>📦 Mis Pedidos</h1>
          <button 
            onClick={() => navigate('/catalogo')}
            style={{
              background: '#3B82F6',
              color: 'white',
              border: 'none',
              padding: '10px 15px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            🛍️ Seguir Comprando
          </button>
        </div>

        {pedidos.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <h2>📦 No tienes pedidos aún</h2>
            <p>¡Realiza tu primera compra!</p>
            <button 
              onClick={() => navigate('/catalogo')}
              style={{
                background: '#3B82F6',
                color: 'white',
                padding: '12px 25px',
                borderRadius: '8px',
                border: 'none',
                marginTop: '20px',
                cursor: 'pointer'
              }}
            >
              Ir al Catálogo
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {pedidos.map(pedido => (
              <div key={pedido.id} style={{
                background: 'white',
                borderRadius: '12px',
                padding: '25px',
                border: '1px solid #E5E7EB',
                boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
              }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr auto',
                  gap: '20px',
                  alignItems: 'center',
                  marginBottom: '20px',
                  paddingBottom: '15px',
                  borderBottom: '1px solid #F3F4F6'
                }}>
                  <div>
                    <h3 style={{ color: '#1F2937', marginBottom: '5px' }}>
                      Pedido {pedido.id}
                    </h3>
                    <p style={{ color: '#6B7280', fontSize: '14px' }}>
                      📅 {new Date(pedido.fecha).toLocaleDateString('es-AR')}
                    </p>
                  </div>
                  
                  <div>
                    <span style={{
                      background: getEstadoColor(pedido.estado),
                      color: 'white',
                      padding: '6px 12px',
                      borderRadius: '20px',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}>
                      {getEstadoIcon(pedido.estado)} {pedido.estado}
                    </span>
                  </div>
                  
                  <div>
                    <p style={{ 
                      color: '#1F2937', 
                      fontSize: '18px', 
                      fontWeight: 'bold',
                      margin: 0
                    }}>
                      Total: {formatearPrecio(pedido.total)}
                    </p>
                  </div>
                  
                  <div>
                    <button
                      onClick={() => alert(`Detalles del pedido ${pedido.id} - Funcionalidad no implementada en el prototipo`)}
                      style={{
                        background: '#6B7280',
                        color: 'white',
                        border: 'none',
                        padding: '8px 15px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '14px'
                      }}
                    >
                      👁️ Ver Detalles
                    </button>
                  </div>
                </div>

                <div>
                  <h4 style={{ 
                    color: '#374151', 
                    marginBottom: '12px',
                    fontSize: '16px'
                  }}>
                    📋 Productos en este pedido:
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {pedido.productos.map((producto, index) => (
                      <div key={index} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '10px 15px',
                        background: '#F9FAFB',
                        borderRadius: '6px',
                        border: '1px solid #E5E7EB'
                      }}>
                        <div>
                          <span style={{ color: '#1F2937', fontWeight: '500' }}>
                            {producto.name}
                          </span>
                          <span style={{ color: '#6B7280', marginLeft: '10px' }}>
                            (x{producto.cantidad})
                          </span>
                        </div>
                        <div style={{ color: '#1F2937', fontWeight: 'bold' }}>
                          {formatearPrecio(producto.precio * producto.cantidad)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '15px',
                  paddingTop: '15px',
                  borderTop: '1px solid #F3F4F6'
                }}>
                  <div style={{ fontSize: '14px', color: '#6B7280' }}>
                    {pedido.productos.length} producto(s) en este pedido
                  </div>
                  
                  <div style={{ display: 'flex', gap: '10px' }}>
                    {pedido.estado === 'Entregado' && (
                      <button
                        onClick={() => alert('Funcionalidad de recompra no implementada en el prototipo')}
                        style={{
                          background: '#10B981',
                          color: 'white',
                          border: 'none',
                          padding: '8px 15px',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '14px'
                        }}
                      >
                        🔄 Volver a Comprar
                      </button>
                    )}
                    
                    <button
                      onClick={() => alert('Funcionalidad de seguimiento no implementada en el prototipo')}
                      style={{
                        background: '#3B82F6',
                        color: 'white',
                        border: 'none',
                        padding: '8px 15px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '14px'
                      }}
                    >
                      🚚 Rastrear Pedido
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{
          textAlign: 'center',
          marginTop: '40px',
          padding: '20px',
          background: '#F9FAFB',
          borderRadius: '12px',
          border: '1px solid #E5E7EB'
        }}>
          <h3 style={{ color: '#374151', marginBottom: '10px' }}>
            💡 ¿Necesitas ayuda con tus pedidos?
          </h3>
          <p style={{ color: '#6B7280', marginBottom: '15px' }}>
            Contacta nuestro servicio al cliente para cualquier consulta
          </p>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
            <button
              onClick={() => alert('Funcionalidad de soporte no implementada en el prototipo')}
              style={{
                background: '#F59E0B',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              📞 Contactar Soporte
            </button>
            <button
              onClick={() => alert('Funcionalidad de FAQ no implementada en el prototipo')}
              style={{
                background: '#8B5CF6',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              ❓ Preguntas Frecuentes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}