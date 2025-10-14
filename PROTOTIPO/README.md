# RepuestosAuto - Prototipo de Demostración

## 🚗 Descripción

Este es un prototipo de demostración de RepuestosAuto, una plataforma e-commerce especializada en la venta de repuestos automotrices. El prototipo incluye todas las funcionalidades principales solicitadas:

### ✅ Funcionalidades Implementadas

1. **✏️ Editar perfil** - Los usuarios pueden modificar su información personal
2. **🗑️ Eliminar cuenta** - Funcionalidad completa de eliminación de cuenta con confirmación
3. **📦 Mis pedidos** - Historial de pedidos del usuario con detalles y estados
4. **🛠️ Modo administrador** - Panel administrativo con estadísticas y gestión
5. **🏭 Filtrado por marcas** - Sistema de filtros por marca, categoría y precio
6. **⭐ Productos destacados clicables** - Productos destacados navegables
7. **🛒 Carrito de compras** - Carrito completo con gestión de productos
8. **← Botón de volver** - Navegación consistente entre páginas
9. **🔐 Inicio de sesión y catálogo persistent session** - Sesión persistente con localStorage

### 🎯 Características del Prototipo

- **Frontend React**: Interfaz moderna y responsive
- **Navegación intuitiva**: Barra de navegación con estado en tiempo real
- **Gestión de estado**: localStorage para persistencia de datos
- **Diseño responsive**: Optimizado para desktop y móvil
- **UX/UI profesional**: Diseño moderno con emojis y colores atractivos

## 🚀 Instalación y Ejecución

### Prerrequisitos
- Node.js (v16 o superior)
- npm o yarn

### Pasos de instalación

1. **Instalar dependencias**
   ```bash
   npm install
   ```

2. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```

3. **Acceder a la aplicación**
   - Abrir navegador en: `http://localhost:5173`

## 👥 Cuentas de Prueba

### Usuario Regular
- **Email**: `usuario@test.com`
- **Contraseña**: cualquier contraseña
- **Acceso**: Catálogo, carrito, perfil, pedidos

### Administrador
- **Email**: `admin@test.com` (o cualquier email con "admin")
- **Contraseña**: cualquier contraseña
- **Acceso**: Todo lo anterior + panel administrativo

## 🗂️ Estructura del Proyecto

```
PROTOTIPO/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.jsx          # Navegación principal
│   │   ├── pages/
│   │   │   ├── Home.jsx            # Página de inicio
│   │   │   ├── Catalogo.jsx        # Catálogo de productos
│   │   │   ├── Login.jsx           # Inicio de sesión
│   │   │   ├── Perfil.jsx          # Perfil de usuario
│   │   │   ├── Carrito.jsx         # Carrito de compras
│   │   │   ├── MisPedidos.jsx      # Historial de pedidos
│   │   │   └── Admin.jsx           # Panel administrativo
│   │   ├── App.jsx                 # Configuración de rutas
│   │   ├── main.jsx               # Punto de entrada
│   │   └── main.css               # Estilos principales
│   ├── package.json
│   └── vite.config.js
└── README.md                      # Este archivo
```

## 🎨 Funcionalidades Destacadas

### 🔐 Sistema de Autenticación
- Login simple con diferenciación de roles
- Sesión persistente con localStorage
- Redirección inteligente según el rol

### 🛒 Carrito de Compras
- Agregar/quitar productos
- Modificar cantidades
- Cálculo automático de totales, envío e impuestos
- Persistencia entre sesiones

### 👤 Gestión de Perfil
- Editar información personal
- Eliminar cuenta con confirmación doble
- Acceso rápido al panel admin (para administradores)

### 📦 Historial de Pedidos
- Vista de todos los pedidos
- Estados de seguimiento
- Detalles de productos por pedido
- Opciones de recompra y rastreo

### 🛠️ Panel Administrativo
- Estadísticas en tiempo real
- Acciones rápidas de gestión
- Vista de pedidos recientes
- Interfaz intuitiva para administradores

### 🏭 Sistema de Filtros
- Filtrado por marca
- Filtrado por categoría
- Filtrado por rango de precios
- Búsqueda por texto
- Resultados en tiempo real

## 📱 Características Técnicas

### Frontend
- **React 18.2.0**: Framework principal
- **React Router DOM**: Navegación SPA
- **Vite**: Build tool rápido
- **CSS moderno**: Flexbox, Grid, variables CSS
- **Responsive Design**: Mobile-first approach

### Estado y Persistencia
- **localStorage**: Persistencia de datos
- **React Hooks**: useState, useEffect, useNavigate
- **Event Listeners**: Sincronización entre componentes

### UX/UI
- **Emojis**: Interfaz amigable y moderna
- **Colores consistentes**: Paleta de colores profesional
- **Animaciones suaves**: Transiciones CSS
- **Feedback visual**: Estados de hover y focus

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Linting
npm run lint
```

## 🎯 Casos de Uso Principales

1. **Usuario visitante**:
   - Ve la página de inicio con productos destacados
   - Accede al catálogo y filtra productos
   - Se registra/inicia sesión

2. **Usuario registrado**:
   - Navega el catálogo con filtros
   - Agrega productos al carrito
   - Gestiona su perfil y ve sus pedidos
   - Realiza compras

3. **Administrador**:
   - Accede al panel administrativo
   - Ve estadísticas y métricas
   - Gestiona productos y pedidos
   - Administra usuarios

## 🌟 Próximas Funcionalidades

Este prototipo puede expandirse con:
- Backend real con API REST
- Base de datos (PostgreSQL/MySQL)
- Sistema de pagos
- Notificaciones en tiempo real
- Chat de soporte
- Sistema de reviews y calificaciones
- Wishlist de productos
- Comparador de productos
- Sistema de cupones y descuentos

## 🤝 Contribución

Este es un prototipo de demostración. Para contribuir:
1. Fork el proyecto
2. Crear una rama feature
3. Commit los cambios
4. Push a la rama
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto es un prototipo educativo/demostrativo.

---

**Desarrollado como prototipo de RepuestosAuto** 🚗💨