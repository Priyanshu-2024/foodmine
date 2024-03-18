import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { sample_foods, sample_tags } from "../data";
import { FoodModel } from "../models/food.model";
const router = Router()


router.get("/seed",expressAsyncHandler(async (req, res) => {
  const foodscount = await FoodModel.countDocuments();
  if (foodscount> 0) {
    res.send("seed is already done!");
    return;
  } await FoodModel.create(sample_foods);
  res.send("seed is done!");
})) 

  router.get("/", (req, res) => {
    res.send(sample_foods);
  });

  router.get("/search/:searchTerm", (req, res) => {
    const searchterm = req.params.searchTerm;
    const food = sample_foods.filter((food) =>
      food.name.toLowerCase().includes(searchterm.toLowerCase())
    );
    res.send(food);
  });
  
  router.get("/tags", (req, res) => {
    res.send(sample_tags);
  });
  
  router.get("/tags/:tagname", (req, res) => {
    const tagName = req.params.tagname;
    const foods = sample_foods.filter((food) => food.tags?.includes(tagName));
    res.send(foods);
  });
  
  router.get("/:foodId", (req, res) => {
    const foodid = req.params.foodId;
    const food = sample_foods.find((food) => food.id == foodid);
    res.send(food);
  });


  export default router;