const express = require("express");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");

const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.json());

const recipes = [];

app.post("/api/v1/recipes", (req, res) => {
  const recipeData = req.body;
  const newRecipe = { id: uuidv4(), ...recipeData };
  recipes.push(newRecipe);
  res.status(201).json(newRecipe);
});

app.get("/api/v1/recipes", (req, res) => {
  res.json(recipes);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
