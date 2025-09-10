import express from "express";
import { salesPdf, salesXlsx } from "../controllers/reportController.js";
const router = express.Router();
router.get("/sales/pdf", salesPdf);
router.get("/sales/xlsx", salesXlsx);
export default router;