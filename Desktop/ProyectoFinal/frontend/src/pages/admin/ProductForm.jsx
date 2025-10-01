import React, { useEffect, useState } from "react";
import api from "../../api.js";

export default function Products() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
        try {
            const response = await api.get("/products");
            console.log("Backend data:", response.data);

            // ⚡ Asegurarse de usar response.data.data
            setProducts(Array.isArray(response.data.data) ? response.data.data : []);
        } catch (err) {
            console.error(err);
            setProducts([]);
        }
        }
        };

        fetchProducts();
    }, []);

    return (
        <div style={{ padding: "20px" }}>
        <h1>Productos</h1>
        {Array.isArray(products) && products.length > 0 ? (
            products.map((p) => (
            <div
                key={p.id}
                style={{
                border: "1px solid #ccc",
                borderRadius: "6px",
                marginBottom: "10px",
                padding: "10px",
                }}
            >
                <h2>{p.nombre}</h2>
                <p>Precio: ${p.precio}</p>
                <p>ID: {p.id}</p>
            </div>
            ))
        ) : (
            <p>No hay productos disponibles.</p>
        )}
        </div>
    );
}
