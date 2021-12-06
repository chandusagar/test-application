import express from "express";
import { getOrders } from "../controllers/OrderController";
import { authenticateToken } from "../utils";

const router = express.Router();

router.get("/", authenticateToken, getOrders);

export { router as OrderRouter };
