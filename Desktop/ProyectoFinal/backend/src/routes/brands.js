import express from "express";
import { 
    listBrands, 
    getBrand, 
    createBrand, 
    updateBrand, 
    deleteBrand 
} from "../controllers/brandController.js";
import { verifyToken, verifyAdmin } from "../middlewares/auth.js";

const router = express.Router();

// Rutas públicas
router.get("/", listBrands);
router.get("/:id", getBrand);

// Rutas de administrador
router.post("/", verifyToken, verifyAdmin, createBrand);
router.put("/:id", verifyToken, verifyAdmin, updateBrand);
router.delete("/:id", verifyToken, verifyAdmin, deleteBrand);

export default router;