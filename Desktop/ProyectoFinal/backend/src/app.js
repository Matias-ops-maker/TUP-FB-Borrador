import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import { sequelize } from "./models/index.js";

/*
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // Cambiar si el frontend corre en otro puerto
  credentials: true
}));
*/
import { checkApiKey } from "./middlewares/apiKey.js";

import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";
import categoryRoutes from "./routes/categories.js";
import cartRoutes from "./routes/cart.js";
import orderRoutes from "./routes/orders.js";
import reportRoutes from "./routes/reports.js";

const app = express();
app.use(cors());
app.use(express.json());

// middleware global: todas las rutas (excepto /auth) requieren api key
app.use((req, res, next) => {
  // permitir /auth sin api key? segun enunciado: "La API deberá incorporar protección en TODAS sus rutas mediante una API_KEY"
  // entonces incluso /auth exige api key
    next();
});

app.use(checkApiKey); // aplica a todas las rutas siguientes

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reports", reportRoutes);

// health
app.get("/health", (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 4000;

(async () => {
    try {
        await sequelize.authenticate();
        console.log("DB ok");
        // usar sync({ force: true }) solo en dev si querés recrear tablas
        await sequelize.sync(); // crea tablas si no existen
        app.listen(PORT, () => console.log(`Server en ${PORT}`));
    } catch (err) {
        console.error("No se pudo conectar a la DB", err);
    }
})();