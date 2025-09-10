import express from "express";
import { placeOrder, listOrders, getOrder } from "../controllers/orderController.js";
import { authMiddleware } from "../middlewares/auth.js";
const router = express.Router();
router.post("/", authMiddleware, placeOrder);
router.get("/", authMiddleware, listOrders);
router.get("/:id", authMiddleware, getOrder);
export default router;