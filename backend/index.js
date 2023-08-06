/* eslint-disable consistent-return */
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.json());

const YOUR_MONGODB_URI =
  "mongodb+srv://gourmet-guide:ETggxEgRUMvj3HXo@gourmet-guide.siih5i2.mongodb.net/test?retryWrites=true&w=majority";

mongoose
  .connect(YOUR_MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

const recipeSchema = new mongoose.Schema({
  title: String,
  cuisine: String,
  dietaryRequirements: String,
  ingredients: [
    {
      name: String,
      measurement: {
        value: Number,
        metric: String,
      },
    },
  ],
  instructions: String,
  prepTime: Number,
  cookingTime: Number,
  servings: Number,
});

const Recipe = mongoose.model("Recipe", recipeSchema);

app.post("/api/v1/recipes", async (req, res) => {
  const recipeData = req.body;
  try {
    const newRecipe = await Recipe.create(recipeData);
    res.status(201).json(newRecipe);
  } catch (error) {
    console.error("Error creating recipe:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/v1/recipes", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/v1/recipes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    res.json(recipe);
  } catch (error) {
    console.error("Error fetching recipe:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.put("/api/v1/recipes/:id", async (req, res) => {
  const { id } = req.params;
  const recipeData = req.body;
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(id, recipeData, {
      new: true,
    });
    if (!updatedRecipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    res.json(updatedRecipe);
  } catch (error) {
    console.error("Error updating recipe:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.delete("/api/v1/recipes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(id);
    if (!deletedRecipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting recipe:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
