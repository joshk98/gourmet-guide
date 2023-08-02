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

app.get("/api/v1/recipes/:id", (req, res) => {
  const { id } = req.params;
  const recipe = recipes.find((r) => r.id === id);
  if (!recipe) {
    return res.status(404).json({ error: "Recipe not found" });
  }
  return res.json(recipe);
});

app.put("/api/v1/recipes/:id", (req, res) => {
  const { id } = req.params;
  const recipeData = req.body;
  const recipeIndex = recipes.findIndex((recipe) => recipe.id === id);
  if (recipeIndex === -1) {
    return res.status(404).json({ error: "Recipe not found" });
  }
  const updatedRecipe = { ...recipes[recipeIndex], ...recipeData };
  recipes[recipeIndex] = updatedRecipe;
  return res.json(updatedRecipe);
});

app.delete("/api/v1/recipes/:id", (req, res) => {
  const { id } = req.params;
  const recipeIndex = recipes.findIndex((recipe) => recipe.id === id);
  if (recipeIndex === -1) {
    return res.status(404).json({ error: "Recipe not found" });
  }
  recipes.splice(recipeIndex, 1);
  return res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
