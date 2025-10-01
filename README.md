# 🚗 RepuestosAuto - Sistema Completo de E-Commerce# RepuestosAuto - Sistema Completo de E-commerce# Trabajo Final Integrador - TUP



## 📋 Descripción del Proyecto



RepuestosAuto es un sistema completo de e-commerce especializado en repuestos automotrices, desarrollado con arquitectura full-stack moderna. **Todas las compras quedan registradas correctamente en la base de datos**.🏪 **RepuestosAuto** es una aplicación web completa para la venta de repuestos automotrices, desarrollada con tecnologías modernas y completamente funcional.INTEGRANTES:



## 🚀 INICIALIZACIÓN RÁPIDA



### ⚡ Opción 1: Script Automático## ✨ Estado del Proyecto: **COMPLETAMENTE FUNCIONAL** ✅Sandoval Sirimarco, Lautaro Agustin [Lautaro.Sandoval98@gmail.com]

```bash

# Ejecutar desde la raíz del proyecto

INICIAR_PROYECTO_COMPLETO.bat

```### 🎯 **Características Principales**Aispuro, Francisco [aispurofrancisco2003@gmail.com]



### 🔧 Opción 2: Manual

```bash

# 1. Backend- **🔐 Autenticación Completa**: Sistema de login/registro con JWT y roles de usuarioPerez Daniele, Matias Sebastian [matiasperezdaniele@gmail.com]

cd Desktop/ProyectoFinal/backend

npm install- **📦 Catálogo de Productos**: Con imágenes, categorías y búsqueda

node src/seed.js

npm start- **🛒 Carrito de Compras**: Gestión completa de pedidos## Migración y sincronización de la base de datos



# 2. Frontend (nueva terminal)- **👥 Gestión de Usuarios**: Roles de administrador, vendedor y cliente

cd Desktop/ProyectoFinal/frontend  

npm install- **📊 Reportes**: Generación de PDF y Excel públicos1. Configura las variables de entorno en `.env`:

npm run dev

```- **🎨 UI/UX Moderna**: Interfaz responsive con React y CSS personalizado   ```



## 🌐 URLs y Credenciales   DB_NAME=nombre_de_tu_bd



### URLs del Sistema## 🚀 **Tecnologías Utilizadas**   DB_USER=usuario

- **Frontend**: http://localhost:5173

- **Backend API**: http://localhost:4000   DB_PASS=contraseña



### Credenciales de Acceso### Backend   DB_HOST=localhost

**Administrador:**

- Email: `admin@repuestos.com`- **Node.js** + **Express.js**   ```

- Password: `admin123`

- **SQLite** con **Sequelize ORM**

**Usuario de Prueba:**

- Email: `juan@gmail.com`- **JWT** para autenticación2. Ejecuta el script de migración:

- Password: `user123`

- **bcryptjs** para hash de contraseñas   ```

## 📦 Funcionalidades Completadas

- **CORS** configurado   node src/migrate.js

### ✅ Sistema de Compras (100% Funcional)

- **Carrito de Compras**: Agregar/eliminar productos- **PDFKit** y **ExcelJS** para reportes   ```

- **Checkout Completo**: Formulario de datos y pago

- **Registro en BD**: Todas las órdenes se guardan automáticamente

- **Actualización de Stock**: Stock se actualiza tras cada compra

- **Historial de Compras**: Visible en el perfil del usuario### FrontendEsto creará todas las tablas y relaciones necesarias en la base de datos.

- **React 18** con **Vite**

### ✅ Panel de Administración (100% Funcional)- **React Router** para navegación

- **Dashboard**: Estadísticas en tiempo real- **CSS3** personalizado

- **Gestión de Productos**: CRUD completo- **API REST** integrada

- **Gestión de Categorías**: Administración completa

- **Gestión de Marcas**: Control total## 👥 **Integrantes del Proyecto**

- **Reportes Descargables**: PDF y Excel funcionando

- **Gestión de Órdenes**: Seguimiento de pedidos- **Sandoval Sirimarco, Lautaro Agustin** - [Lautaro.Sandoval98@gmail.com]

- **Aispuro, Francisco** - [aispurofrancisco2003@gmail.com]

### ✅ Catálogo y Frontend (100% Funcional)- **Perez Daniele, Matias Sebastian** - [matiasperezdaniele@gmail.com]

- **40 Productos**: Base de datos completa con imágenes reales

- **6 Categorías**: Organizadas por tipo de repuesto## 📋 **Instalación y Ejecución**

- **Búsqueda y Filtros**: Sistema de navegación avanzado

- **Diseño Responsivo**: Funciona en desktop y móvil### Prerrequisitos

- **Autenticación**: Sistema completo con JWT- Node.js v18+ 

- npm o yarn

## 🗂️ Estructura de Datos

### 🔧 Instalación

### Base de Datos Poblada

- **40 Productos** con precios e imágenes reales1. **Clonar el repositorio**

- **6 Categorías** principales (Motor, Frenos, Filtros, etc.)```bash

- **20+ Marcas** reconocidas (Bosch, NGK, Castrol, etc.)git clone https://github.com/Matias-ops-maker/Front-Back-borrador-TUP.git

- **Usuarios de prueba** con diferentes rolescd Front-Back-borrador-TUP-2

- **Sistema de órdenes** completamente implementado```



## 🔍 Fallas Encontradas y Corregidas2. **Instalar dependencias del Backend**

```bash

### ❌ Problemas Identificados:cd Desktop/ProyectoFinal/backend

1. **Checkout desconectado**: El checkout solo simulaba comprasnpm install

2. **Perfil con datos estáticos**: No cargaba órdenes reales```

3. **Reportes sin datos**: Downloads no funcionaban

3. **Instalar dependencias del Frontend**

### ✅ Soluciones Implementadas:```bash

1. **Checkout conectado al backend**: Órdenes se crean en BDcd ../frontend

2. **Perfil con datos reales**: Carga órdenes desde APInpm install

3. **Reportes funcionales**: PDFs y Excel se descargan correctamente```

4. **Sistema de órdenes completo**: Flujo completo de compra

### 🎬 Ejecución

## 📊 Flujo de Compra Verificado

1. **Iniciar el Backend** (Puerto 4000)

1. **Usuario navega catálogo** → ✅ Funcionando```bash

2. **Agrega productos al carrito** → ✅ Funcionando  cd Desktop/ProyectoFinal/backend

3. **Procede al checkout** → ✅ Funcionandonpm start

4. **Completa datos de entrega** → ✅ Funcionando```

5. **Selecciona método de pago** → ✅ Funcionando

6. **Procesa la orden** → ✅ **SE REGISTRA EN BD** 2. **Iniciar el Frontend** (Puerto 5173)

7. **Actualiza stock automáticamente** → ✅ Funcionando```bash

8. **Muestra confirmación** → ✅ Funcionandocd Desktop/ProyectoFinal/frontend

9. **Aparece en historial de usuario** → ✅ Funcionandonpm run dev

10. **Visible para admin en panel** → ✅ Funcionando```



## 🛠️ Tecnologías Utilizadas3. **Acceder a la aplicación**

- Frontend: `http://localhost:5173`

### Backend- Backend API: `http://localhost:4000/api`

- Node.js + Express.js

- SQLite + Sequelize ORM## 🔑 **Credenciales de Prueba**

- JWT + bcrypt para seguridad

- PDFKit + ExcelJS para reportes```

Email: admin@repuestos.com

### Frontend  Password: admin123

- React 18 + Vite```

- React Router v6

- Axios para API calls## 📁 **Estructura del Proyecto**

- CSS responsivo

```

## 🎯 Estado Final del ProyectoDesktop/ProyectoFinal/

├── backend/

### 🎉 PROYECTO 100% COMPLETADO│   ├── src/

│   │   ├── controllers/     # Controladores de la API

**✅ Todas las funcionalidades solicitadas están implementadas:**│   │   ├── models/         # Modelos de Sequelize

│   │   ├── routes/         # Rutas de la API

1. **✅ Sistema de compras con registro en BD**│   │   ├── middlewares/    # Middlewares de autenticación

2. **✅ Panel de administración completo** │   │   └── config/         # Configuración de BD

3. **✅ Todos los botones funcionan correctamente**│   ├── package.json

4. **✅ Descargas de reportes operativas**│   └── README.md

5. **✅ Base de datos con 40 productos**└── frontend/

6. **✅ Interfaz responsiva y profesional**    ├── src/

7. **✅ Sistema de autenticación robusto**    │   ├── components/     # Componentes React

8. **✅ Gestión de categorías y marcas**    │   ├── pages/         # Páginas de la aplicación

    │   ├── styles/        # Estilos CSS

### 🚨 Importante    │   └── api.js         # Configuración de API

- **TODAS LAS COMPRAS QUEDAN REGISTRADAS** en la base de datos    ├── package.json

- **NO HAY SIMULACIONES** - todo es funcional y real    └── README.md

- **STOCK SE ACTUALIZA** automáticamente tras cada compra```

- **HISTORIAL COMPLETO** disponible para usuarios y admin

## 🛠 **Funcionalidades Implementadas**

## 📞 Uso del Sistema

### ✅ **Sistema de Autenticación**

1. **Ejecutar**: `INICIAR_PROYECTO_COMPLETO.bat`- Registro de usuarios con validación

2. **Abrir navegador**: http://localhost:5173- Login con JWT tokens

3. **Crear cuenta** o usar credenciales de prueba- Roles: Admin, Vendedor, Cliente

4. **Realizar compras** - todo queda registrado- Middleware de protección de rutas

5. **Acceder como admin** para gestionar el sistema

### ✅ **Gestión de Productos**

---- Catálogo completo con imágenes

- Categorías y marcas

## 🎉 PROYECTO FINALIZADO Y FUNCIONAL AL 100%- Búsqueda y filtrado

- CRUD completo para administradores

**RepuestosAuto está listo para uso en producción**  

*Todas las compras, gestión y reportes funcionan correctamente*### ✅ **E-commerce**
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