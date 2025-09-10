import dotenv from "dotenv";
dotenv.config();

import { sequelize, User, Category, Product, Cart } from "./models/index.js";
import bcrypt from "bcryptjs"; // 🔹 cambiar bcrypt por bcryptjs

(async () => {
    try {
        // Sincronizar la DB (force: true borra todo antes)
        await sequelize.sync({ force: true });

        // Crear admin
        const passAdmin = await bcrypt.hash("admin123", 10);
        const admin = await User.create({ 
        nombre: "Admin", 
        email: "admin@local", 
        password: passAdmin, 
        rol: "admin" // Asegurate que User.js tenga rol
        });

        // Crear usuario normal
        const passUser = await bcrypt.hash("user123", 10);
        const user = await User.create({ 
        nombre: "Cliente", 
        email: "cliente@local", 
        password: passUser,
        rol: "user" // rol por defecto
        });

        // Crear carritos
        await Cart.create({ userId: admin.id });
        await Cart.create({ userId: user.id });

        // Crear categorías
        const cat1 = await Category.create({ nombre: "Filtros" });
        const cat2 = await Category.create({ nombre: "Frenos" });

        // Crear productos
        await Product.bulkCreate([
        { nombre: "Filtro de aceite", descripcion: "Filtro compat VW", precio: 3500, stock: 20, categoryId: cat1.id },
        { nombre: "Pastillas de freno", descripcion: "Juego delantero", precio: 12000, stock: 15, categoryId: cat2.id }
        ]);

        console.log("Seed listo ✅");
        process.exit(0);
    } catch (err) {
        console.error("Error en seed:", err);
        process.exit(1);
    }
})();