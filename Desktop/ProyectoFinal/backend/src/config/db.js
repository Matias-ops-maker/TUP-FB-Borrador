import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT || "mysql",
        logging: false
    }
);

try {
    await sequelize.authenticate();
    console.log("Conexión a la DB exitosa");
    } catch (error) {
    console.error("Error al conectar la DB:", error);
}