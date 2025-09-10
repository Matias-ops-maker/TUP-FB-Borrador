import { DataTypes } from "sequelize";

export default function defineCartItem(sequelize) {
    return sequelize.define("CartItem", {
        cartId: { type: DataTypes.INTEGER, allowNull: false },
        productId: { type: DataTypes.INTEGER, allowNull: false },
        cantidad: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 }
    });
}