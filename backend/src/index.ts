import express from "express";
import cors from "cors";
import { sample_foods, sample_tags } from "./data";

const app = express();

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"],
  })
);

app.get("/", (req, res) => { res.send("Express on Vercel"); });

app.get("/api/foods", (req, res) => {
  res.send(sample_foods);
});

app.get("/api/foods/search/:searchTerm", (req, res) => {
  const searchterm = req.params.searchTerm;
  const food = sample_foods.filter((food) =>
    food.name.toLowerCase().includes(searchterm.toLowerCase())
  );
  res.send(food);
});

app.get("/api/foods/tags", (req, res) => {
  res.send(sample_tags);
});

app.get("/api/foods/tags/:tagname", (req, res) => {
  const tagName = req.params.tagname;
  const foods = sample_foods.filter(food => food.tags?.includes(tagName));
  res.send(foods);
});

app.get("/api/foods/:foodId", (req, res) => {
    const foodid = req.params.foodId;
    const food = sample_foods.find(food => food.id == foodid)
    res.send(food);
})
const port = 5000;
app.listen(port, () => {
  console.log("Website is served on http://localhost:" + port);
});


module.exports = app