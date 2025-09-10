import { DataTypes } from "sequelize";

export default function defineProduct(sequelize) {
    return sequelize.define("Product", {
        nombre: { type: DataTypes.STRING, allowNull: false },
        descripcion: { type: DataTypes.TEXT, allowNull: true },
        precio: { type: DataTypes.FLOAT, allowNull: false },
        stock: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
        categoryId: { type: DataTypes.INTEGER, allowNull: false }
    });
}