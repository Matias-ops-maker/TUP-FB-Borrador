import { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/usuario.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <div className=" ">
      <div className="auth-card">
        <h1 className="auth-title">Iniciar Sesión</h1>
        {error && <p className="auth-error">{error}</p>}

        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="email"
            placeholder="Email"
            className="auth-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="auth-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="auth-button">Ingresar</button>
        </form>

        <div className="auth-footer">
          <Link to="/auth/forgot" className="auth-link">¿Olvidaste tu contraseña?</Link>
          <p>
            ¿No tienes cuenta? <Link to="/auth/register" className="auth-link">Regístrate</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
