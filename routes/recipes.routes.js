import express from "express";
import Recipe from "../models/Recipe.model.js";

const recipeRoute = express.Router();

recipeRoute.get("/all-recipes", async (req, res) => {
  try {
    const recipes = await Recipe.find({});

    return res.status(200).json(recipes);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

//ITERAÇÃO 2

recipeRoute.post("/create-recipe", async (req, res) => {
  try {
    const recipe = req.body;
    const newRecipe = await Recipe.create(recipe);
    return res.status(201).json(newRecipe);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Deu ruim." });
  }
});

//ITERAÇÃO 3

recipeRoute.post("/create-manyrecipes", async (req, res) => {
  try {
    const manyRecipe = await Recipe.insertMany(req.body);
    const recipestitle = await Recipe.find({}, { title: 1 });
    return res.status(201).json(recipestitle);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Deu ruim." });
  }
});

//ITERAÇÃO 4

recipeRoute.put("/edit/:title", async (req, res) => {
  try {
    const { title } = req.params;
    const updatedRecipe = await Recipe.findOneAndUpdate(
      title,
      { ...req.body },
      { new: true, runValidators: true }
    );
    return res.status(200).json(updatedRecipe);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

//ITERAÇÃO 5

recipeRoute.delete("/delete/:title", async (req, res) => {
  try {
    const { title } = req.params;
    const deletedRecipe = await Recipe.deleteOne(title);

    if (!deletedRecipe) {
      return res.status(400).json({ msg: "recipe not find" });
    }

    return res.status(200).json({ msg: "Recipe deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

export default recipeRoute;
