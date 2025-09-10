import { DataTypes } from "sequelize";

export default function defineUser(sequelize) {
    return sequelize.define("User", {
        nombre: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
        password: { type: DataTypes.STRING, allowNull: false }
    });
}