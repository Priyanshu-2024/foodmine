import { Router } from "express";
import { sample_users } from "../data";
import  jwt  from "jsonwebtoken";
import  expressAsyncHandler  from "express-async-handler";
import { UserModel } from "../models/user.model";
const router = Router();

router.get("/seed",expressAsyncHandler(async (req, res) => {
  const usercount = await UserModel.countDocuments();
  if (usercount> 0) {
    res.send("seed is already done!");
    return;
  } await UserModel.create(sample_users);
  res.send("seed is done!");
})) 

router.post("/login", (req, res) => {
    const { email, password } = req.body;
    const user = sample_users.find(
      (user) => user.email === email && user.password === password
    );
    if (user) {
      res.send(generateTokenResponse(user));
    } else {
      res.status(400).send("username or password is invalid");
    }
  });
  
  const generateTokenResponse = (user: any) => {
    const token = jwt.sign(
      {
        email: user.email,
        isAdmin: user.isAdmin,
      },
      "SomeRandomText",
      {
        expiresIn: "30d",
      }
    );
  
    user.token = token;
    return user;
  };

  export default router;