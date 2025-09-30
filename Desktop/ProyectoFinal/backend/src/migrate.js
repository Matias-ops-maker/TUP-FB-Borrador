// backend/src/migrate.js
import dotenv from 'dotenv';
import { sequelize, syncModels } from './models/index.js';

dotenv.config();

async function migrate() {
  try {
    console.log('🔄 Iniciando migración de base de datos...');
    
    // Verificar conexión
    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos establecida correctamente.');
    
    // Sincronizar modelos (crear/actualizar tablas)
    await syncModels();
    console.log('✅ Migración completada exitosamente.');
    
    // Cerrar conexión
    await sequelize.close();
    console.log('🔌 Conexión cerrada.');
    
  } catch (error) {
    console.error('❌ Error durante la migración:', error);
    process.exit(1);
  }
}

// Ejecutar si es llamado directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  migrate();
}

export default migrate;