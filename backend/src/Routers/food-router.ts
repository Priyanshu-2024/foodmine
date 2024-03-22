import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { sample_foods, sample_tags } from "../data";
import { FoodModel } from "../models/food.model";
const router = Router();

router.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    const foodscount = await FoodModel.countDocuments();
    if (foodscount > 0) {
      res.send("seed is already done!");
      return;
    }
    await FoodModel.create(sample_foods);
    res.send("seed is done!");
  })
);

router.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const foods = await FoodModel.find();
    res.send(foods);
  })
);

router.get(
  "/search/:searchTerm",
  expressAsyncHandler(async (req, res) => {
    const searchRegex = new RegExp(req.params.searchTerm, "i");
    const food = await FoodModel.find({ name: { $regex: searchRegex } });
    res.send(food);
  })
);

router.get("/tags", expressAsyncHandler(
  async (req, res) => {   
      const tags = await FoodModel.aggregate([
          {
              $unwind:'$tags'
          },
          {
              $group:{
                  _id:'$tags',
                  count:{$sum:1}
              }
          },
          {
              $project:{
                  _id:0,
                  name:'$_id',
                  count: '$count'
              }
          }
      ]).sort({count:-1});
  
      const all = {
          name:'All',
          count:await FoodModel.countDocuments()
      }
    tags.unshift(all)
    res.send(tags);
  }));

router.get("/tags/:tagname",expressAsyncHandler(async (req, res) => {
  const foods = await FoodModel.find({tags: req.params.tagname})
  res.send(foods);
})) 

router.get("/:foodId", expressAsyncHandler(
  async (req, res) => {
    const food = await FoodModel.findById(req.params.foodId)
    res.send(food);
  })
)

export default router;
