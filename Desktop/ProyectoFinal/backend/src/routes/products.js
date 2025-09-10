import express from "express";
import { listProducts, getProduct, createProduct, updateProduct, deleteProduct } from "../controllers/productController.js";
import { authMiddleware } from "../middlewares/auth.js";
const router = express.Router();
router.get("/", listProducts);
router.get("/:id", getProduct);
router.post("/", authMiddleware, createProduct); // admin allowed check in controller or here
router.put("/:id", authMiddleware, updateProduct);
router.delete("/:id", authMiddleware, deleteProduct);
export default router;