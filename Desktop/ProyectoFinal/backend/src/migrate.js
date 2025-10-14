import dotenv from 'dotenv';
import { sequelize, syncModels } from './models/index.js';

dotenv.config();

async function migrate() {
  try {
    console.log('🔄 Iniciando migración de base de datos...');
    
    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos establecida correctamente.');
    
    await syncModels();
    console.log('✅ Migración completada exitosamente.');
    
    await sequelize.close();
    console.log('🔌 Conexión cerrada.');
    
  } catch (error) {
    console.error('❌ Error durante la migración:', error);
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  migrate();
}

export default migrate;