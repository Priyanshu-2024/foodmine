import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import cors from "cors";
import foodRouter from './src/routers/food.router';
import userRouter from './src/routers/user.router';
import dbConnect from './src/configs/database.config';
import orderRouter from './src/routers/order.router';
dbConnect();
const app = express();

app.use(express.json());
app.use(
  cors({
    credentials: true,
    // origin: ["http://localhost:4200"],

    origin: ["https://foodmine-frontend.vercel.app"],
  })
);
app.use("/api/foods", foodRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

app.get("/", (req, res) => {
  res.send("hello world");
});


const port = 5000;

app.listen(port, () => {
  console.log("port is running in" + port);
});
