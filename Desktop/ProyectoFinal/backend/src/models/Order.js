import { DataTypes } from "sequelize";

export default function defineOrder(sequelize) {
    return sequelize.define("Order", {
        userId: { type: DataTypes.INTEGER, allowNull: false },
        estado: { type: DataTypes.STRING, allowNull: false, defaultValue: "Pendiente" },
        total: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0 }
    });
}