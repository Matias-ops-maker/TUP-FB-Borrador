import express from "express";
import { listCategories, createCategory, updateCategory, deleteCategory } from "../controllers/categoryController.js";
import { authMiddleware } from "../middlewares/auth.js";
const router = express.Router();
router.get("/", listCategories);
router.post("/", authMiddleware, createCategory);
router.put("/:id", authMiddleware, updateCategory);
router.delete("/:id", authMiddleware, deleteCategory);
export default router;