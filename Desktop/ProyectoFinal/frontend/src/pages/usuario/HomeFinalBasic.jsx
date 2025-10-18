import { useState, useEffect } from "react";
// import UserNavbar from "../../components/UserNavbar.jsx";

export default function HomeFinalBasic() {
    console.log("HomeFinalBasic renderizando...");
    
    const [loading, setLoading] = useState(false);

    return (
        <div>
            <nav style={{ 
                backgroundColor: '#1F2937', 
                color: 'white', 
                padding: '15px 20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <h2>🏪 RepuestosAuto</h2>
                <div>
                    <a href="/auth/login" style={{ color: 'white', marginRight: '15px' }}>
                        🔑 Login
                    </a>
                    <a href="/auth/register" style={{ color: 'white' }}>
                        📝 Registro
                    </a>
                </div>
            </nav>
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <h1>🏪 RepuestosAuto</h1>
                <p>Página de inicio cargando...</p>
                <div style={{ 
                    backgroundColor: '#f0f8ff', 
                    padding: '20px', 
                    margin: '20px',
                    borderRadius: '8px'
                }}>
                    <h2>🛠️ Productos Destacados</h2>
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '20px',
                        marginTop: '20px'
                    }}>
                        <div style={{ 
                            border: '1px solid #ddd', 
                            padding: '15px', 
                            borderRadius: '8px',
                            backgroundColor: 'white'
                        }}>
                            <h3>Filtro de Aceite</h3>
                            <p>Precio: $8,500</p>
                            <button style={{ 
                                backgroundColor: '#3B82F6', 
                                color: 'white', 
                                padding: '8px 16px',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}>
                                Ver Detalles
                            </button>
                        </div>
                        <div style={{ 
                            border: '1px solid #ddd', 
                            padding: '15px', 
                            borderRadius: '8px',
                            backgroundColor: 'white'
                        }}>
                            <h3>Pastillas de Freno</h3>
                            <p>Precio: $28,000</p>
                            <button style={{ 
                                backgroundColor: '#3B82F6', 
                                color: 'white', 
                                padding: '8px 16px',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}>
                                Ver Detalles
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}