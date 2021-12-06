import express from "express";
import {
  getRetailers,
  retailerStates,
  createRetailer,
  updateRetailer,
} from "../controllers/RetailerController";
import { authenticateToken } from "../utils";

const router = express.Router();

router.get("/", authenticateToken, getRetailers);
router.get("/states", authenticateToken, retailerStates);
router.post("/", authenticateToken, createRetailer);
router.put("/:id", authenticateToken, updateRetailer);

export { router as RetailerRouter };
