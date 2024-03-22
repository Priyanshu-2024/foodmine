import express from "express";
import cors from "cors";
import dotenv from 'dotenv'
dotenv.config();
import foodRouter from './src/Routers/food-router';
import userRouter from './src/Routers/user-router';
import { dbConnect } from "./src/configs/database.config";
dbConnect();

const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"],
    // origin: ["https://foodmine-nine.vercel.app"],
  })
);


app.use("/api/foods", foodRouter)
app.use("/api/users", userRouter)
app.get("/", (req, res) => {
  res.send("Express on Vercel");
});






const port = 5000;
app.listen(port, () => {
  console.log("Website is served on http://localhost:" + port);
});

module.exports = app;
