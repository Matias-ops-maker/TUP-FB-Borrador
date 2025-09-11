import React, { useEffect, useState } from "react";
import ProductForm from "./ProductForm";

const API_KEY = "mi_api_key_super_secreta";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);

    // traer productos
    const fetchProducts = async () => {
        const res = await fetch("http://localhost:4000/api/products", {
        headers: { "x-api-key": API_KEY },
        });
        const data = await res.json();
        setProducts(data);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // eliminar producto
    const deleteProduct = async (id) => {
        await fetch(`http://localhost:4000/api/products/${id}`, {
        method: "DELETE",
        headers: { "x-api-key": API_KEY },
        });
        fetchProducts();
    };

    return (
        <div>
        <h1>Productos</h1>
        <ProductForm product={editingProduct} onSaved={fetchProducts} setEditingProduct={setEditingProduct}/>
        <table className="w-full mt-4">
            <thead>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Acciones</th>
            </tr>
            </thead>
            <tbody>
            {products.map(p => (
                <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.nombre}</td>
                <td>{p.precio}</td>
                <td>{p.stock}</td>
                <td>
                    <button onClick={() => setEditingProduct(p)}>Editar</button>
                    <button onClick={() => deleteProduct(p.id)}>Eliminar</button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
}