import express from "express";
import { getCart, addToCart, updateCartItem, removeCartItem } from "../controllers/cartController.js";
import { authMiddleware } from "../middlewares/auth.js";
const router = express.Router();
router.get("/", authMiddleware, getCart);
router.post("/items", authMiddleware, addToCart);
router.put("/items/:id", authMiddleware, updateCartItem);
router.delete("/items/:id", authMiddleware, removeCartItem);
export default router;