import { Link } from "react-router-dom"

export default function Sidebar() {
    return (
        <div className="w-64 bg-gray-800 text-white p-4">
        <h1 className="text-xl font-bold mb-4">Panel Admin</h1>
        <nav className="flex flex-col gap-2">
            <Link to="/">Dashboard</Link>
            <Link to="/orders">Pedidos</Link>
            <Link to="/products">Productos</Link>
            <Link to="/reports">Reportes</Link>
        </nav>
        </div>
    )
}