import { DataTypes } from "sequelize";

export default function defineCategory(sequelize) {
    return sequelize.define("Category", {
        nombre: { type: DataTypes.STRING, allowNull: false, unique: true },
        descripcion: { type: DataTypes.TEXT, allowNull: true }
    });
}