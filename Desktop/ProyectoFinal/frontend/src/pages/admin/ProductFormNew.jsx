import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api.js";
import "../../styles/usuario.css";

export default function ProductFormNew() {
  const [formData, setFormData] = useState({
    sku: '',
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    category_id: '',
    brand_id: '',
    imagen_url: '',
    estado: 'activo'
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
      const categoriesResponse = await api.get('/categories');
      setCategories(categoriesResponse.data || []);
      const brandsResponse = await api.get('/brands');
      setBrands(brandsResponse.data || []);
    } catch (error) {
      console.error('Error cargando datos iniciales:', error);
      setCategories([
        { id: 1, nombre: 'Filtros' },
        { id: 2, nombre: 'Frenos' },
        { id: 3, nombre: 'Aceites' },
        { id: 4, nombre: 'Sistema Eléctrico' },
        { id: 5, nombre: 'Suspensión' },
        { id: 6, nombre: 'Transmisión' }
      ]);
      setBrands([
        { id: 1, nombre: 'Bosch' },
        { id: 2, nombre: 'NGK' },
        { id: 3, nombre: 'Mann Filter' },
        { id: 4, nombre: 'Castrol' },
        { id: 5, nombre: 'Monroe' },
        { id: 6, nombre: 'Brembo' }
      ]);
    }
  };

  const loadProduct = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/products/${id}`);
      const product = response.data;
      
      setFormData({
        sku: product.sku || '',
        nombre: product.nombre || '',
        descripcion: product.descripcion || '',
        precio: product.precio || '',
        stock: product.stock || '',
        category_id: product.category_id || '',
        brand_id: product.brand_id || '',
        imagen_url: product.imagen_url || '',
        estado: product.estado || 'activo'
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
        sku: formData.sku || `SKU-${Date.now()}`,
        precio: parseFloat(formData.precio),
        stock: parseInt(formData.stock),
        category_id: parseInt(formData.category_id),
        brand_id: parseInt(formData.brand_id)
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
              <label htmlFor="sku">SKU *</label>
              <input
                type="text"
                id="sku"
                name="sku"
                value={formData.sku}
                onChange={handleInputChange}
                required
                placeholder="Ej: FIL-001-MANN"
              />
            </div>

            <div className="form-group">
              <label htmlFor="nombre">Nombre del Producto *</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                required
                placeholder="Ej: Filtro de aceite Mann Filter"
              />
            </div>

            <div className="form-group">
              <label htmlFor="precio">Precio (ARS) *</label>
              <input
                type="number"
                id="precio"
                name="precio"
                value={formData.precio}
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
              <label htmlFor="category_id">Categoría *</label>
              <select
                id="category_id"
                name="category_id"
                value={formData.category_id}
                onChange={handleInputChange}
                required
              >
                <option value="">Seleccionar categoría</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="brand_id">Marca *</label>
              <select
                id="brand_id"
                name="brand_id"
                value={formData.brand_id}
                onChange={handleInputChange}
                required
              >
                <option value="">Seleccionar marca</option>
                {brands.map(brand => (
                  <option key={brand.id} value={brand.id}>
                    {brand.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="imagen_url">URL de Imagen</label>
              <input
                type="url"
                id="imagen_url"
                name="imagen_url"
                value={formData.imagen_url}
                onChange={handleInputChange}
                placeholder="https://ejemplo.com/imagen.jpg"
              />
            </div>
          </div>

          <div className="form-group full-width">
            <label htmlFor="descripcion">Descripción</label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleInputChange}
              rows="4"
              placeholder="Descripción detallada del producto..."
            />
          </div>

          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="estado"
                checked={formData.estado === 'activo'}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  estado: e.target.checked ? 'activo' : 'inactivo'
                }))}
              />
              <span className="checkmark"></span>
              Producto activado
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

        {formData.imagen_url && (
          <div className="image-preview">
            <h3>Vista previa de imagen</h3>
            <img 
              src={formData.imagen_url} 
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
