import { BrowserRouter, Routes, Route } from "react-router-dom"

function SimpleHome() {
    return (
        <div style={{padding: '20px', backgroundColor: '#f0f0f0', minHeight: '100vh'}}>
            <h1 style={{color: 'red', fontSize: '2em'}}>¡FUNCIONA! - Página de Inicio</h1>
            <p>Si ves esto, el React Router está funcionando correctamente.</p>
            <p>Frontend corriendo en: http://localhost:5173</p>
            <p>Fecha: {new Date().toString()}</p>
        </div>
    )
}

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SimpleHome />} />
                <Route path="*" element={<SimpleHome />} />
            </Routes>
        </BrowserRouter>
    )
}