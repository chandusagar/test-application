require("dotenv").config();
import express from "express";
import cors from "cors";
import path from 'path';
import mongoose from "mongoose";
import { createServer } from "http";
let app = express();
const Server = createServer(app);
import socketIo from 'socket.io';

let io = socketIo(Server, {cors:{origin:"*"}})


app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public')))

mongoose
  .connect(process.env.MONGO_URI, {
    keepAlive: 1,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Unable to connect to database"));

import { AuthRouter, UserRouter, AddresRouter } from "./src/routers";
app.use("/v1/api/auth", AuthRouter);
app.use("/v1/api/users", UserRouter);
app.use("/v1/api/address", AddresRouter);


io.on('connection', (socket) => {
  console.log("A new user Jest connected");
  socket.on("message", (data) => {
    console.log(data);
  })
 
})
io.on("disconnect", () => {
  console.log("disconnected server");
})

Server.listen(process.env.PORT || 5000, () => console.log("Server is running..."));



