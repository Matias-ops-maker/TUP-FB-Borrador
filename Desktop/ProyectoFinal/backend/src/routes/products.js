import express from "express";
import { 
    listProducts, 
    getProduct, 
    createProduct, 
    updateProduct, 
    deleteProduct,
    getProductsByVehicle 
} from "../controllers/productController.js";
import { verifyToken, verifyAdmin } from "../middlewares/auth.js";

const router = express.Router();

// Rutas públicas
router.get("/", listProducts);
router.get("/vehicle/:vehicle_id", getProductsByVehicle);
router.get("/:id", getProduct);

// Rutas de administrador
router.post("/", verifyToken, verifyAdmin, createProduct);
router.put("/:id", verifyToken, verifyAdmin, updateProduct);
router.delete("/:id", verifyToken, verifyAdmin, deleteProduct);

export default router;