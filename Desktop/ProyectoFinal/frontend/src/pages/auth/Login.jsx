import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api.js';
import '../../styles/auth.css';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/auth/login', formData);

      if (response.data) {
        // Guardar token y datos del usuario
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        // Redirigir a la página principal para todos los usuarios
        navigate('/');
      } else {
        setError('Error al iniciar sesión');
      }
    } catch (err) {
      console.error('Error en login:', err);
      if (err.response && err.response.data) {
        setError(err.response.data.error || err.response.data.message || 'Error al iniciar sesión');
      } else {
        setError('Error de conexión. Verifica que el servidor esté ejecutándose.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <Link to="/" className="back-link">← Volver al inicio</Link>
          <h1>🏪 RepuestosAuto</h1>
          <h2>Iniciar Sesión</h2>
          <p>Accede a tu cuenta para gestionar tus compras</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="email">📧 Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="tu@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">🔒 Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Tu contraseña"
              required
            />
          </div>

          <button 
            type="submit" 
            className="auth-button"
            disabled={loading}
          >
            {loading ? '⏳ Iniciando sesión...' : '🚀 Iniciar Sesión'}
          </button>
        </form>

        <div className="auth-links">
          <p>¿No tienes cuenta? <Link to="/auth/register">Regístrate aquí</Link></p>
          <p><Link to="/auth/forgot">¿Olvidaste tu contraseña?</Link></p>
        </div>

        <div className="demo-accounts">
          <h4>🧪 Cuentas de prueba:</h4>
          <div className="demo-list">
            <div className="demo-account">
              <strong>👤 Usuario:</strong> juan@gmail.com / user123
            </div>
            <div className="demo-account">
              <strong>👑 Admin:</strong> admin@repuestos.com / admin123
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}