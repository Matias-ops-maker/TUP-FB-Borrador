import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Perfil() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: '',
    phone: '',
    address: ''
  });
  
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }
    
    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    setEditData({
      name: parsedUser.name || '',
      phone: parsedUser.phone || '',
      address: parsedUser.address || ''
    });
  }, [navigate]);

  const handleEditChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value
    });
  };

  const handleSaveEdit = () => {
    const updatedUser = {
      ...user,
      ...editData
    };
    
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setIsEditing(false);
    alert('Perfil actualizado correctamente');
  };

  const handleDeleteAccount = () => {
    const confirmar = window.confirm(
      '¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.'
    );
    
    if (confirmar) {
      const confirmarFinal = window.confirm(
        '⚠️ ÚLTIMA CONFIRMACIÓN: Tu cuenta y todos tus datos serán eliminados permanentemente.'
      );
      
      if (confirmarFinal) {
        localStorage.removeItem('user');
        localStorage.removeItem('carrito');
        alert('Tu cuenta ha sido eliminada correctamente');
        navigate('/');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  if (!user) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <Navbar />
      
      <div style={{
        padding: '20px',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '30px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '30px',
            paddingBottom: '20px',
            borderBottom: '2px solid #E5E7EB'
          }}>
            <h1 style={{ color: '#1F2937' }}>👤 Mi Perfil</h1>
            <div style={{ display: 'flex', gap: '10px' }}>
              {user.role === 'admin' && (
                <button
                  onClick={() => navigate('/admin')}
                  style={{
                    background: '#8B5CF6',
                    color: 'white',
                    border: 'none',
                    padding: '10px 15px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  🛠️ Modo Admin
                </button>
              )}
              <button
                onClick={handleLogout}
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
                🚪 Cerrar Sesión
              </button>
            </div>
          </div>

          {!isEditing ? (
            <div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '25px',
                marginBottom: '30px'
              }}>
                <div style={{
                  background: '#F9FAFB',
                  padding: '20px',
                  borderRadius: '12px',
                  border: '1px solid #E5E7EB'
                }}>
                  <h3 style={{ color: '#374151', marginBottom: '15px' }}>
                    📧 Información de Cuenta
                  </h3>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Rol:</strong> {user.role === 'admin' ? '🛠️ Administrador' : '👤 Usuario'}</p>
                </div>

                <div style={{
                  background: '#F9FAFB',
                  padding: '20px',
                  borderRadius: '12px',
                  border: '1px solid #E5E7EB'
                }}>
                  <h3 style={{ color: '#374151', marginBottom: '15px' }}>
                    👤 Información Personal
                  </h3>
                  <p><strong>Nombre:</strong> {user.name || 'No especificado'}</p>
                  <p><strong>Teléfono:</strong> {user.phone || 'No especificado'}</p>
                  <p><strong>Dirección:</strong> {user.address || 'No especificada'}</p>
                </div>
              </div>

              <div style={{
                display: 'flex',
                gap: '15px',
                justifyContent: 'center'
              }}>
                <button
                  onClick={() => setIsEditing(true)}
                  style={{
                    background: '#3B82F6',
                    color: 'white',
                    border: 'none',
                    padding: '12px 25px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: '500'
                  }}
                >
                  ✏️ Editar Perfil
                </button>

                <button
                  onClick={() => navigate('/mis-pedidos')}
                  style={{
                    background: '#10B981',
                    color: 'white',
                    border: 'none',
                    padding: '12px 25px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: '500'
                  }}
                >
                  📦 Mis Pedidos
                </button>

                <button
                  onClick={handleDeleteAccount}
                  style={{
                    background: '#EF4444',
                    color: 'white',
                    border: 'none',
                    padding: '12px 25px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: '500'
                  }}
                >
                  🗑️ Eliminar Cuenta
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h3 style={{ marginBottom: '25px', color: '#374151' }}>
                ✏️ Editando Perfil
              </h3>

              <div style={{
                display: 'grid',
                gap: '20px',
                marginBottom: '30px'
              }}>
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: '500',
                    color: '#374151'
                  }}>
                    👤 Nombre Completo
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={editData.name}
                    onChange={handleEditChange}
                    placeholder="Tu nombre completo"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '2px solid #E5E7EB',
                      borderRadius: '8px',
                      fontSize: '16px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: '500',
                    color: '#374151'
                  }}>
                    📱 Teléfono
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={editData.phone}
                    onChange={handleEditChange}
                    placeholder="Tu número de teléfono"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '2px solid #E5E7EB',
                      borderRadius: '8px',
                      fontSize: '16px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: '500',
                    color: '#374151'
                  }}>
                    🏠 Dirección
                  </label>
                  <textarea
                    name="address"
                    value={editData.address}
                    onChange={handleEditChange}
                    placeholder="Tu dirección completa"
                    rows="3"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '2px solid #E5E7EB',
                      borderRadius: '8px',
                      fontSize: '16px',
                      outline: 'none',
                      resize: 'vertical',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              <div style={{
                display: 'flex',
                gap: '15px',
                justifyContent: 'center'
              }}>
                <button
                  onClick={handleSaveEdit}
                  style={{
                    background: '#10B981',
                    color: 'white',
                    border: 'none',
                    padding: '12px 25px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: '500'
                  }}
                >
                  💾 Guardar Cambios
                </button>

                <button
                  onClick={() => setIsEditing(false)}
                  style={{
                    background: '#6B7280',
                    color: 'white',
                    border: 'none',
                    padding: '12px 25px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: '500'
                  }}
                >
                  ❌ Cancelar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}