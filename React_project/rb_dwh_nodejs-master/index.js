require("dotenv").config();

import express from "express";
import cors from "cors";

import { OrderRouter, RetailerRouter, SupplierRouter } from "./app/routers";

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/v1/api/orders", OrderRouter);
app.use("/v1/api/retailers", RetailerRouter);
app.use("/v1/api/suppliers", SupplierRouter);

app.listen(process.env.PORT || 5000, () => console.log("Server is running..."));
