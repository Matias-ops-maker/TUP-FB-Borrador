import { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/usuario.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // validaciones básicas
    if (password !== confirm) {
      setError("Las contraseñas no coinciden");
      return;
    }
    console.log({ name, email, password });
  };

  return (
    <div className=" ">
      <div className="auth-card">
        <h1 className="auth-title">Registrarse</h1>
        {error && <p className="auth-error">{error}</p>}

        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="text"
            placeholder="Nombre completo"
            className="auth-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <input
            type="password"
            placeholder="Confirmar contraseña"
            className="auth-input"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
          <button type="submit" className="auth-button">Registrarse</button>
        </form>

        <div className="auth-footer">
          <p>
            ¿Ya tienes cuenta? <Link to="/auth/login" className="auth-link">Inicia sesión</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
