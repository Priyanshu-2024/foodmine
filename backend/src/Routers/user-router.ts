import { Router } from "express";
import { sample_users } from "../data";
import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";
import { User, UserModel } from "../models/user.model";
import bcrypt from "bcryptjs";
const router = Router();

router.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    const usercount = await UserModel.countDocuments();
    if (usercount > 0) {
      res.send("seed is already done!");
      return;
    }
    await UserModel.create(sample_users);
    res.send("seed is done!");
  })
);

router.post("/login", expressAsyncHandler(
  async (req, res) => {
    const {email, password} = req.body;
    const user = await UserModel.findOne({email});
  
     if(user && (await bcrypt.compare(password,user.password))) {
      res.send(generateTokenResponse(user));
     }
     else{
       res.status(400).send("Username or password is invalid!");
     }
  
  }
))


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

router.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    const { name, email, password, address } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      res.status(400).send("user already exists");
      return;
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const newUser: User = {
      id: "",
      email: email.toLowerCase(),
      name,
      password: encryptedPassword,
      address,
      isAdmin: false,
    };

    const dbUser = await UserModel.create(newUser);
    res.send(generateTokenResponse(dbUser));
  })
);

export default router;
