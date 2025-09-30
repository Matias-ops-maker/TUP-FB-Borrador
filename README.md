# RepuestosAuto - TUP



🏪 **RepuestosAuto** es una aplicación web completa para la venta de repuestos automotrices, desarrollada con tecnologías modernas y completamente funcional.



## ✨ Estado del Proyecto: **COMPLETAMENTE FUNCIONAL** ✅



### 🎯 **Características Principales**



- **🔐 Autenticación Completa**: Sistema de login/registro con JWT y roles de usuario

- **📦 Catálogo de Productos**: Con imágenes, categorías y búsqueda

- **🛒 Carrito de Compras**: Gestión completa de pedidos## Migración y sincronización de la base de datos

- **👥 Gestión de Usuarios**: Roles de administrador, vendedor y cliente

- **📊 Reportes**: Generación de PDF y Excel públicos1. Configura las variables de entorno en `.env`:

- **🎨 UI/UX Moderna**: Interfaz responsive con React y CSS personalizado   ```

   DB_NAME=nombre_de_tu_bd

## 🚀 **Tecnologías Utilizadas**   DB_USER=usuario

   DB_PASS=contraseña

### Backend   DB_HOST=localhost

- **Node.js** + **Express.js**   ```

- **SQLite** con **Sequelize ORM**

- **JWT** para autenticación2. Ejecuta el script de migración:

- **bcryptjs** para hash de contraseñas   ```

- **CORS** configurado   node src/migrate.js

- **PDFKit** y **ExcelJS** para reportes   ```



### FrontendEsto creará todas las tablas y relaciones necesarias en la base de datos.
- **React 18** con **Vite**
- **React Router** para navegación
- **CSS3** personalizado
- **API REST** integrada

## 👥 **Integrantes del Proyecto**

- **Sandoval Sirimarco, Lautaro Agustin** - [Lautaro.Sandoval98@gmail.com]
- **Aispuro, Francisco** - [aispurofrancisco2003@gmail.com]
- **Perez Daniele, Matias Sebastian** - [matiasperezdaniele@gmail.com]

## 📋 **Instalación y Ejecución**

### Prerrequisitos
- Node.js v18+ 
- npm o yarn

### 🔧 Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/Matias-ops-maker/Front-Back-borrador-TUP.git
cd Front-Back-borrador-TUP-2
```

2. **Instalar dependencias del Backend**
```bash
cd Desktop/ProyectoFinal/backend
npm install
```

3. **Instalar dependencias del Frontend**
```bash
cd ../frontend
npm install
```

### 🎬 Ejecución

1. **Iniciar el Backend** (Puerto 4000)
```bash
cd Desktop/ProyectoFinal/backend
npm start
```

2. **Iniciar el Frontend** (Puerto 5173)
```bash
cd Desktop/ProyectoFinal/frontend
npm run dev
```

3. **Acceder a la aplicación**
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:4000/api`

## 🔑 **Credenciales de Prueba**

```
Email: admin@repuestos.com
Password: admin123
```

## 📁 **Estructura del Proyecto**

```
Desktop/ProyectoFinal/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Controladores de la API
│   │   ├── models/         # Modelos de Sequelize
│   │   ├── routes/         # Rutas de la API
│   │   ├── middlewares/    # Middlewares de autenticación
│   │   └── config/         # Configuración de BD
│   ├── package.json
│   └── README.md
└── frontend/
    ├── src/
    │   ├── components/     # Componentes React
    │   ├── pages/         # Páginas de la aplicación
    │   ├── styles/        # Estilos CSS
    │   └── api.js         # Configuración de API
    ├── package.json
    └── README.md
```

## 🛠 **Funcionalidades Implementadas**

### ✅ **Sistema de Autenticación**
- Registro de usuarios con validación
- Login con JWT tokens
- Roles: Admin, Vendedor, Cliente
- Middleware de protección de rutas

### ✅ **Gestión de Productos**
- Catálogo completo con imágenes
- Categorías y marcas
- Búsqueda y filtrado
- CRUD completo para administradores

### ✅ **E-commerce**
- Carrito de compras funcional
- Proceso de checkout
- Gestión de pedidos
- Historial de compras

### ✅ **Reportes**
- Exportación a PDF
- Exportación a Excel
- Reportes de ventas
- Reportes de inventario

### ✅ **Panel Administrativo**
- Dashboard de administración
- Gestión de usuarios
- Gestión de productos
- Análisis de ventas

## 🔗 **Endpoints Principales**

### Autenticación
- `POST /api/auth/register` - Registro de usuarios
- `POST /api/auth/login` - Inicio de sesión

### Productos
- `GET /api/products` - Listar productos
- `POST /api/products` - Crear producto (Admin)
- `PUT /api/products/:id` - Actualizar producto (Admin)
- `DELETE /api/products/:id` - Eliminar producto (Admin)

### Reportes Públicos
- `GET /api/reports/public/sales/pdf` - Reporte de ventas PDF
- `GET /api/reports/public/sales/xlsx` - Reporte de ventas Excel

## 🔒 **Seguridad**

- **API Key**: Middleware de validación
- **JWT Tokens**: Autenticación estateless
- **Hash de Contraseñas**: bcryptjs con salt
- **CORS**: Configurado para desarrollo y producción
- **Validación**: Sanitización de datos de entrada

## 🎨 **Características de UI/UX**

- **Responsive Design**: Compatible con dispositivos móviles
- **Tema Moderno**: Colores y tipografía profesional
- **Navegación Intuitiva**: Router de React
- **Feedback Visual**: Estados de carga y errores
- **Iconografía**: Emojis y símbolos descriptivos

## 🚀 **Estado de Desarrollo**

| Módulo | Estado | Descripción |
|--------|--------|-------------|
| Backend API | ✅ | Completamente funcional |
| Frontend React | ✅ | Completamente funcional |
| Autenticación | ✅ | JWT implementado |
| Base de Datos | ✅ | SQLite con seed data |
| E-commerce | ✅ | Carrito y checkout |
| Reportes | ✅ | PDF y Excel |
| Admin Panel | ✅ | Dashboard completo |

## 🗄️ **Base de Datos**

### Migración y Sincronización

La aplicación utiliza SQLite en memoria para desarrollo. Los datos se cargan automáticamente al iniciar el servidor.

**Para usar con base de datos externa (opcional):**

1. Configura las variables de entorno en `.env`:
   ```
   DB_NAME=nombre_de_tu_bd
   DB_USER=usuario
   DB_PASS=contraseña
   DB_HOST=localhost
   ```

2. Ejecuta el script de migración:
   ```
   node src/migrate.js
   ```

## 📞 **Soporte**

Para reportar problemas o solicitar características:
- **GitHub Issues**: [Crear issue](https://github.com/Matias-ops-maker/Front-Back-borrador-TUP/issues)
- **Email**: Contactar al desarrollador

## 📄 **Licencia**

Este proyecto está bajo la Licencia MIT.

---

### 🎉 **¡Proyecto Completamente Funcional!**

El sistema RepuestosAuto está listo para uso en desarrollo y puede ser desplegado en producción con las configuraciones apropiadas de variables de entorno.

**Última actualización**: Septiembre 2025 ✨
