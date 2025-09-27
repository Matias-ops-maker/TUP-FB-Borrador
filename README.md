# Trabajo Final Integrador - TUP

INTEGRANTES:

Sandoval Sirimarco, Lautaro Agustin [Lautaro.Sandoval98@gmail.com]

Aispuro, Francisco [aispurofrancisco2003@gmail.com]

Perez Daniele, Matias Sebastian [matiasperezdaniele@gmail.com]

## Migración y sincronización de la base de datos

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

Esto creará todas las tablas y relaciones necesarias en la base de datos.