import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api.js";
import "../../styles/usuario.css";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterCategory, setFilterCategory] = useState("");
    const [sortBy, setSortBy] = useState("name");
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const navigate = useNavigate();

    // Categorías disponibles
    const categories = [
        { id: 1, name: 'Filtros' },
        { id: 2, name: 'Frenos' },
        { id: 3, name: 'Aceites' },
        { id: 4, name: 'Sistema Eléctrico' },
        { id: 5, name: 'Suspensión' },
        { id: 6, name: 'Transmisión' }
    ];

    // Cargar productos
    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await api.get("/products");
            
            // Manejar diferentes formatos de respuesta
            const productData = response.data.data || response.data || [];
            setProducts(Array.isArray(productData) ? productData : []);
        } catch (error) {
            console.error("Error fetching products:", error);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Eliminar producto
    const deleteProduct = async (id) => {
        if (!confirm("¿Estás seguro de que quieres eliminar este producto?")) {
            return;
        }
        
        try {
            await api.delete(`/products/${id}`);
            fetchProducts();
        } catch (error) {
            console.error("Error deleting product:", error);
            alert("Error al eliminar el producto");
        }
    };

    // Obtener nombre de categoría
    const getCategoryName = (categoryId) => {
        const category = categories.find(cat => cat.id === categoryId);
        return category ? category.name : 'Sin categoría';
    };

    // Filtrar y ordenar productos
    const getFilteredProducts = () => {
        let filtered = [...products];

        // Filtrar por búsqueda
        if (searchTerm) {
            filtered = filtered.filter(product =>
                (product.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                (product.sku || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                (product.brand || '').toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filtrar por categoría
        if (filterCategory) {
            filtered = filtered.filter(product => 
                product.categoryId === parseInt(filterCategory)
            );
        }

        // Ordenar
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'name':
                    return (a.name || '').localeCompare(b.name || '');
                case 'price':
                    return (a.price || 0) - (b.price || 0);
                case 'stock':
                    return (a.stock || 0) - (b.stock || 0);
                default:
                    return 0;
            }
        });

        return filtered;
    };

    const filteredProducts = getFilteredProducts();

    if (loading) {
        return (
            <div className="admin-container">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Cargando productos...</p>
                </div>
            </div>
        );
    }

    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS'
        }).format(price); // Los precios ya están en pesos
    };

    return (
        <div className="products-admin">
            <div className="page-header">
                <h1>🛠️ Gestión de Productos</h1>
                <button 
                    className="btn-primary"
                    onClick={() => setShowForm(!showForm)}
                >
                    {showForm ? '❌ Cancelar' : '➕ Nuevo Producto'}
                </button>
            </div>

            {/* Formulario de producto */}
            {showForm && (
                <div className="form-container">
                    <ProductForm 
                        product={editingProduct} 
                        onSaved={() => {
                            fetchProducts();
                            setShowForm(false);
                            setEditingProduct(null);
                        }} 
                        setEditingProduct={setEditingProduct}
                    />
                </div>
            )}

            {/* Búsqueda */}
            <div className="search-container">
                <input
                    type="text"
                    placeholder="🔍 Buscar productos por nombre, SKU o marca..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                <span className="search-results">
                    {filteredProducts.length} de {products.length} productos
                </span>
            </div>

            {/* Tabla de productos */}
            {loading ? (
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Cargando productos...</p>
                </div>
            ) : (
                <div className="table-container">
                    <table className="products-table">
                        <thead>
                            <tr>
                                <th>SKU</th>
                                <th>Imagen</th>
                                <th>Nombre</th>
                                <th>Marca</th>
                                <th>Categoría</th>
                                <th>Precio</th>
                                <th>Stock</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.length === 0 ? (
                                <tr>
                                    <td colSpan="9" className="no-data">
                                        📦 No se encontraron productos
                                    </td>
                                </tr>
                            ) : (
                                filteredProducts.map(product => (
                                    <tr key={product.id} className="product-row">
                                        <td className="sku-cell">{product.sku}</td>
                                        <td className="image-cell">
                                            <img 
                                                src={product.imagen_url || '/placeholder-product.png'} 
                                                alt={product.nombre}
                                                className="product-image"
                                                onError={(e) => {
                                                    e.target.src = 'https://via.placeholder.com/60x60/f3f4f6/9ca3af?text=Sin+Imagen';
                                                }}
                                            />
                                        </td>
                                        <td className="name-cell">
                                            <div className="product-name">{product.nombre}</div>
                                            <div className="product-description">{product.descripcion}</div>
                                        </td>
                                        <td>{product.Brand?.nombre || 'Sin marca'}</td>
                                        <td>{product.Category?.nombre || 'Sin categoría'}</td>
                                        <td className="price-cell">
                                            <div className="price">{formatPrice(product.precio)}</div>
                                            <div className="cost">Costo: {formatPrice(product.costo)}</div>
                                        </td>
                                        <td className="stock-cell">
                                            <span className={`stock-badge ${product.stock < 10 ? 'low' : product.stock < 25 ? 'medium' : 'high'}`}>
                                                {product.stock} unid.
                                            </span>
                                        </td>
                                        <td className="status-cell">
                                            <span className={`status-badge ${product.estado}`}>
                                                {product.estado === 'activo' ? '✅ Activo' : '❌ Inactivo'}
                                            </span>
                                        </td>
                                        <td className="actions-cell">
                                            <button 
                                                onClick={() => {
                                                    setEditingProduct(product);
                                                    setShowForm(true);
                                                }}
                                                className="btn-edit"
                                                title="Editar producto"
                                            >
                                                ✏️
                                            </button>
                                            <button 
                                                onClick={() => deleteProduct(product.id)}
                                                className="btn-delete"
                                                title="Eliminar producto"
                                            >
                                                🗑️
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}