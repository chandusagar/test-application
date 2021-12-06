import express from "express";
import { address,create,update,deleteAddress } from "../controllers/AddressController";
const router = express.Router();

router.get("/", address.getList);
router.post("/", address.create);
router.put("/:id", address.update);
router.delete("/:id", address.deleteAddress);

export { router as AddresRouter };
