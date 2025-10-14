import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
    const [user] = useState({ nombre: "Usuario Demo", rol: "user" });
    const [carrito] = useState([
        { id: 1, name: "Filtro de Aceite", cantidad: 2, price: 8500 },
        { id: 2, name: "Pastillas de Freno", cantidad: 1, price: 28000 }
    ]);
    const navigate = useNavigate();

    const cantidadItems = carrito.reduce((total, item) => total + item.cantidad, 0);

    return (
        <nav style={{
            background: '#1F2937',
            color: 'white',
            padding: '15px 0',
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0 20px'
            }}>
                <div>
                    <Link 
                        to="/" 
                        style={{
                            color: 'white',
                            textDecoration: 'none',
                            fontSize: '1.5rem',
                            fontWeight: 'bold'
                        }}
                    >
                        🏪 RepuestosAuto
                    </Link>
                </div>
                
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px'
                }}>
                    <Link 
                        to="/catalogo"
                        style={{
                            color: 'white',
                            textDecoration: 'none',
                            padding: '8px 15px',
                            borderRadius: '6px'
                        }}
                    >
                        🛍️ Catálogo
                    </Link>
                    
                    <Link 
                        to="/carrito"
                        style={{
                            color: 'white',
                            textDecoration: 'none',
                            padding: '8px 15px',
                            borderRadius: '6px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                            background: cantidadItems > 0 ? '#10B981' : 'transparent'
                        }}
                    >
                        🛒 Carrito ({cantidadItems})
                    </Link>
                    
                    <span style={{ color: '#D1D5DB' }}>
                        Hola, {user.nombre}!
                    </span>
                    <Link 
                        to="/perfil"
                        style={{
                            color: 'white',
                            textDecoration: 'none',
                            padding: '8px 15px',
                            borderRadius: '6px',
                            background: '#3B82F6'
                        }}
                    >
                        👤 Mi Perfil
                    </Link>
                </div>
            </div>
        </nav>
    );
}