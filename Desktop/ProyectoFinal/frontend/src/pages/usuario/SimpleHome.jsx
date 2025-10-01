import { Link } from "react-router-dom";

export default function SimpleHome() {
  return (
    <div style={{padding: '20px', textAlign: 'center'}}>
      <h1>🚗 RepuestosAuto</h1>
      <p>¡Bienvenido a RepuestosAuto!</p>
      <p>Esta es una página de prueba para verificar que React está funcionando.</p>
      
      <div style={{marginTop: '20px'}}>
        <Link to="/auth/login" style={{marginRight: '10px', padding: '10px', backgroundColor: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '5px'}}>
          Login
        </Link>
        <Link to="/auth/register" style={{padding: '10px', backgroundColor: '#28a745', color: 'white', textDecoration: 'none', borderRadius: '5px'}}>
          Registro
        </Link>
      </div>
      
      <div style={{marginTop: '20px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '5px'}}>
        <h3>🧪 Estado del Sistema</h3>
        <p>✅ React funcionando</p>
        <p>✅ React Router funcionando</p>
        <p>✅ Componentes cargando</p>
      </div>
    </div>
  );
}