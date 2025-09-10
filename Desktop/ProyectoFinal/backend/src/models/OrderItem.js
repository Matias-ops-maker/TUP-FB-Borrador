import { DataTypes } from "sequelize";

export default function defineOrderItem(sequelize) {
    return sequelize.define("OrderItem", {
        orderId: { type: DataTypes.INTEGER, allowNull: false },
        productId: { type: DataTypes.INTEGER, allowNull: false },
        cantidad: { type: DataTypes.INTEGER, allowNull: false },
        precio: { type: DataTypes.FLOAT, allowNull: false }
    });
}