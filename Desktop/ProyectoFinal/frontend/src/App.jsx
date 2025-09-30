import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import Dashboard from "./pages/admin/Dashboard"
import Orders from "./pages/admin/Orders"
import Products from "./pages/admin/Products"
import Reports from "./pages/admin/Reports"
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
// marketplace
import Home from "./pages/usuario/Home"
import Catalogo from "./pages/usuario/Catalogo"
import Checkout from "./pages/usuario/Checkout"

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Rutas auth */}
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/register" element={<Register />} />
                <Route path="/auth/forgot" element={<ForgotPassword />} />
                {/* Rutas marketplace */}
                <Route path="/" element={<Home />} />
                <Route path="/catalogo" element={<Catalogo />} />
                <Route path="/checkout" element={<Checkout />} />

                {/* Rutas admin con layout */}
                <Route
                    path="/admin/*"
                    element={
                        <div className="h-screen flex flex-col">
                            <Navbar />
                            <div className="flex flex-1">
                                <Sidebar />
                                <main className="flex-1 p-6">
                                    <Routes>
                                        <Route path="dashboard" element={<Dashboard />} />
                                        <Route path="orders" element={<Orders />} />
                                        <Route path="products" element={<Products />} />
                                        <Route path="reports" element={<Reports />} />
                                    </Routes>
                                </main>
                            </div>
                        </div>
                    }
                />
            </Routes>
        </BrowserRouter>
    )
}
