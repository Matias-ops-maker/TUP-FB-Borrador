import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api.js";
import "../../styles/usuario.css";

export default function ProductFormNew() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    categoryId: '',
    brandId: '',
    image: '',
    featured: false
  });
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  useEffect(() => {
    loadInitialData();
    if (isEdit) {
      loadProduct();
    }
  }, [id]);

  const loadInitialData = async () => {
    try {
      // Cargar categorías
      const categoriesData = [
        { id: 1, name: 'Filtros' },
        { id: 2, name: 'Frenos' },
        { id: 3, name: 'Aceites' },
        { id: 4, name: 'Sistema Eléctrico' },
        { id: 5, name: 'Suspensión' },
        { id: 6, name: 'Transmisión' }
      ];
      setCategories(categoriesData);

      // Cargar marcas
      const brandsData = [
        { id: 1, name: 'Bosch' },
        { id: 2, name: 'NGK' },
        { id: 3, name: 'Mann Filter' },
        { id: 4, name: 'Castrol' },
        { id: 5, name: 'Monroe' },
        { id: 6, name: 'Brembo' }
      ];
      setBrands(brandsData);
    } catch (error) {
      console.error('Error cargando datos iniciales:', error);
    }
  };

  const loadProduct = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/products/${id}`);
      const product = response.data;
      
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        stock: product.stock || '',
        categoryId: product.categoryId || '',
        brandId: product.brandId || '',
        image: product.image || '',
        featured: product.featured || false
      });
    } catch (error) {
      console.error('Error cargando producto:', error);
      setError('Error al cargar el producto');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        categoryId: parseInt(formData.categoryId),
        brandId: parseInt(formData.brandId)
      };

      if (isEdit) {
        await api.put(`/products/${id}`, productData);
      } else {
        await api.post('/products', productData);
      }

      navigate('/admin/products');
    } catch (error) {
      console.error('Error guardando producto:', error);
      setError('Error al guardar el producto. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEdit) {
    return (
      <div className="admin-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando producto...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>{isEdit ? '✏️ Editar Producto' : '➕ Nuevo Producto'}</h1>
        <button 
          className="btn-secondary"
          onClick={() => navigate('/admin/products')}
        >
          ← Volver a Productos
        </button>
      </div>

      <div className="product-form-container">
        <form onSubmit={handleSubmit} className="product-form">
          {error && (
            <div className="error-message">
              <span>⚠️ {error}</span>
            </div>
          )}

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="name">Nombre del Producto *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Ej: Filtro de aceite Mann Filter"
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">Precio (ARS) *</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
                min="0"
                step="0.01"
                placeholder="0.00"
              />
            </div>

            <div className="form-group">
              <label htmlFor="stock">Stock *</label>
              <input
                type="number"
                id="stock"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                required
                min="0"
                placeholder="0"
              />
            </div>

            <div className="form-group">
              <label htmlFor="categoryId">Categoría *</label>
              <select
                id="categoryId"
                name="categoryId"
                value={formData.categoryId}
                onChange={handleInputChange}
                required
              >
                <option value="">Seleccionar categoría</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="brandId">Marca *</label>
              <select
                id="brandId"
                name="brandId"
                value={formData.brandId}
                onChange={handleInputChange}
                required
              >
                <option value="">Seleccionar marca</option>
                {brands.map(brand => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="image">URL de Imagen</label>
              <input
                type="url"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="https://ejemplo.com/imagen.jpg"
              />
            </div>
          </div>

          <div className="form-group full-width">
            <label htmlFor="description">Descripción</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="4"
              placeholder="Descripción detallada del producto..."
            />
          </div>

          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleInputChange}
              />
              <span className="checkmark"></span>
              Producto destacado
            </label>
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="btn-cancel"
              onClick={() => navigate('/admin/products')}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="btn-primary"
              disabled={loading}
            >
              {loading ? 'Guardando...' : (isEdit ? 'Actualizar' : 'Crear Producto')}
            </button>
          </div>
        </form>

        {formData.image && (
          <div className="image-preview">
            <h3>Vista previa de imagen</h3>
            <img 
              src={formData.image} 
              alt="Vista previa"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}