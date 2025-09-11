import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import Dashboard from "./pages/Dashboard"
import Orders from "./pages/Orders"
import Products from "./pages/Products"
import Reports from "./pages/Reports"

export default function App() {
    return (
        <BrowserRouter>
        <div className="h-screen flex flex-col">
            <Navbar />
                <div className="flex flex-1">
                <Sidebar />
                    <main className="flex-1 p-6">
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/orders" element={<Orders />} />
                            <Route path="/products" element={<Products />} />
                            <Route path="/reports" element={<Reports />} />
                        </Routes>
                    </main>
                </div>
        </div>
        </BrowserRouter>
    )
}