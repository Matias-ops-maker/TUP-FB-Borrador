import React, { useEffect, useState } from "react";

export default function Products() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
        try {
            const res = await fetch("http://localhost:4000/api/products", {
            headers: { "x-api-key": "mi_api_key_super_secreta" },
            });
            const json = await res.json();
            console.log("Backend data:", json);

            // ⚡ Asegurarse de usar json.data
            setProducts(Array.isArray(json.data) ? json.data : []);
        } catch (err) {
            console.error(err);
            setProducts([]);
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
