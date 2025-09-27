// backend/src/config/db.js
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql', // Cambia a 'postgres' o 'sqlite' si usás otro motor
    logging: false,
  }
);

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la DB exitosa');
  } catch (error) {
    console.error('Error al conectar la DB:', error);
  }
};

testConnection();

export default sequelize;