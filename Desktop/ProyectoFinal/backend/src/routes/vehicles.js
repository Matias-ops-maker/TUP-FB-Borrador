import express from "express";
import { 
    listVehicles, 
    getVehicle, 
    createVehicle, 
    updateVehicle, 
    deleteVehicle,
    getVehicleBrands,
    getVehicleModelsByBrand 
} from "../controllers/vehicleController.js";
import { verifyToken, verifyAdmin } from "../middlewares/auth.js";

const router = express.Router();

// Rutas públicas
router.get("/", listVehicles);
router.get("/brands", getVehicleBrands);
router.get("/brands/:marca/models", getVehicleModelsByBrand);
router.get("/:id", getVehicle);

// Rutas de administrador
router.post("/", verifyToken, verifyAdmin, createVehicle);
router.put("/:id", verifyToken, verifyAdmin, updateVehicle);
router.delete("/:id", verifyToken, verifyAdmin, deleteVehicle);

export default router;