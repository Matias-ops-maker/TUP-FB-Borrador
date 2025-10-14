import { useNavigate } from 'react-router-dom';

export default function Admin() {
  const navigate = useNavigate();

  const adminStats = {
    productos: 156,
    pedidos: 89,
    usuarios: 234,
    ventas: 2850000
  };

  const recentOrders = [
    { id: '#ORD-089', user: 'Juan Pérez', total: 45000, status: 'Pendiente' },
    { id: '#ORD-088', user: 'María García', total: 32000, status: 'Enviado' },
    { id: '#ORD-087', user: 'Carlos López', total: 28500, status: 'Entregado' },
  ];

  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(precio);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F3F4F6' }}>
      <div style={{
        background: 'white',
        padding: '20px',
        borderBottom: '1px solid #E5E7EB',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h1 style={{ color: '#1F2937' }}>🛠️ Panel de Administración</h1>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => navigate('/perfil')}
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
              👤 Mi Perfil
            </button>
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
              🏪 Ver Tienda
            </button>
          </div>
        </div>
      </div>

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '30px 20px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginBottom: '30px'
        }}>
          <div style={{
            background: 'white',
            padding: '25px',
            borderRadius: '12px',
            textAlign: 'center',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
            border: '1px solid #E5E7EB'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '10px' }}>📦</div>
            <h3 style={{ color: '#1F2937', marginBottom: '5px' }}>Productos</h3>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#3B82F6' }}>
              {adminStats.productos}
            </p>
          </div>

          <div style={{
            background: 'white',
            padding: '25px',
            borderRadius: '12px',
            textAlign: 'center',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
            border: '1px solid #E5E7EB'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '10px' }}>🛒</div>
            <h3 style={{ color: '#1F2937', marginBottom: '5px' }}>Pedidos</h3>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#10B981' }}>
              {adminStats.pedidos}
            </p>
          </div>

          <div style={{
            background: 'white',
            padding: '25px',
            borderRadius: '12px',
            textAlign: 'center',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
            border: '1px solid #E5E7EB'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '10px' }}>👥</div>
            <h3 style={{ color: '#1F2937', marginBottom: '5px' }}>Usuarios</h3>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#F59E0B' }}>
              {adminStats.usuarios}
            </p>
          </div>

          <div style={{
            background: 'white',
            padding: '25px',
            borderRadius: '12px',
            textAlign: 'center',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
            border: '1px solid #E5E7EB'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '10px' }}>💰</div>
            <h3 style={{ color: '#1F2937', marginBottom: '5px' }}>Ventas Totales</h3>
            <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#EF4444' }}>
              {formatearPrecio(adminStats.ventas)}
            </p>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '30px'
        }}>
          <div style={{
            background: 'white',
            padding: '25px',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
            border: '1px solid #E5E7EB'
          }}>
            <h2 style={{ color: '#1F2937', marginBottom: '20px' }}>
              ⚡ Acciones Rápidas
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '15px'
            }}>
              <button
                onClick={() => alert('Funcionalidad de gestión de productos no implementada en el prototipo')}
                style={{
                  background: '#3B82F6',
                  color: 'white',
                  border: 'none',
                  padding: '15px 20px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: '500'
                }}
              >
                📦 Gestionar Productos
              </button>

              <button
                onClick={() => alert('Funcionalidad de gestión de pedidos no implementada en el prototipo')}
                style={{
                  background: '#10B981',
                  color: 'white',
                  border: 'none',
                  padding: '15px 20px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: '500'
                }}
              >
                🛒 Ver Pedidos
              </button>

              <button
                onClick={() => alert('Funcionalidad de gestión de usuarios no implementada en el prototipo')}
                style={{
                  background: '#F59E0B',
                  color: 'white',
                  border: 'none',
                  padding: '15px 20px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: '500'
                }}
              >
                👥 Gestionar Usuarios
              </button>

              <button
                onClick={() => alert('Funcionalidad de reportes no implementada en el prototipo')}
                style={{
                  background: '#8B5CF6',
                  color: 'white',
                  border: 'none',
                  padding: '15px 20px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: '500'
                }}
              >
                📊 Ver Reportes
              </button>

              <button
                onClick={() => alert('Funcionalidad de inventario no implementada en el prototipo')}
                style={{
                  background: '#EF4444',
                  color: 'white',
                  border: 'none',
                  padding: '15px 20px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: '500'
                }}
              >
                📋 Inventario
              </button>

              <button
                onClick={() => alert('Funcionalidad de configuración no implementada en el prototipo')}
                style={{
                  background: '#6B7280',
                  color: 'white',
                  border: 'none',
                  padding: '15px 20px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: '500'
                }}
              >
                ⚙️ Configuración
              </button>
            </div>
          </div>

          <div style={{
            background: 'white',
            padding: '25px',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
            border: '1px solid #E5E7EB'
          }}>
            <h3 style={{ color: '#1F2937', marginBottom: '20px' }}>
              📋 Pedidos Recientes
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {recentOrders.map(order => (
                <div key={order.id} style={{
                  padding: '15px',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  background: '#F9FAFB'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '8px'
                  }}>
                    <strong style={{ color: '#1F2937' }}>{order.id}</strong>
                    <span style={{
                      background: order.status === 'Entregado' ? '#10B981' : 
                                order.status === 'Enviado' ? '#F59E0B' : '#3B82F6',
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '12px'
                    }}>
                      {order.status}
                    </span>
                  </div>
                  <p style={{ color: '#6B7280', fontSize: '14px', margin: '4px 0' }}>
                    {order.user}
                  </p>
                  <p style={{ color: '#1F2937', fontWeight: 'bold', fontSize: '14px' }}>
                    {formatearPrecio(order.total)}
                  </p>
                </div>
              ))}
            </div>

            <button
              onClick={() => alert('Funcionalidad de ver todos los pedidos no implementada en el prototipo')}
              style={{
                background: '#3B82F6',
                color: 'white',
                border: 'none',
                padding: '10px 15px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                width: '100%',
                marginTop: '15px'
              }}
            >
              Ver Todos los Pedidos →
            </button>
          </div>
        </div>

        <div style={{
          background: '#FEF3C7',
          padding: '20px',
          borderRadius: '12px',
          border: '1px solid #F59E0B',
          marginTop: '30px',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#92400E', marginBottom: '10px' }}>
            🚧 Prototipo de Demostración
          </h3>
          <p style={{ color: '#92400E', margin: 0 }}>
            Este es un panel administrativo de demostración. Las funcionalidades completas estarían implementadas en la versión final del sistema.
          </p>
        </div>
      </div>
    </div>
  );
}