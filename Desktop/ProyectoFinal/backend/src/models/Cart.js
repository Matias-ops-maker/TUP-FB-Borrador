import { DataTypes } from "sequelize";

export default function defineCart(sequelize) {
    return sequelize.define("Cart", {
        userId: { type: DataTypes.INTEGER, allowNull: false }
    });
}