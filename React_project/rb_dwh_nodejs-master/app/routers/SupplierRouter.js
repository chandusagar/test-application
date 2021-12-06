import express from "express";
import {
  getSupplier,
  updateSupplier,
  createSupplier,
  getUnmappedBrands,
  updateUnmappedBrands,
} from "../controllers/SupplierController";
import { authenticateToken } from "../utils";

const router = express.Router();

router.get("/", authenticateToken, getSupplier);
router.put("/:id", authenticateToken, updateSupplier);
router.post("/", authenticateToken, createSupplier);
router.get("/unmappedBrands", authenticateToken, getUnmappedBrands);
router.post("/unmappedBrands", authenticateToken, updateUnmappedBrands);

export { router as SupplierRouter };
