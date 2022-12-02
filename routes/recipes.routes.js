import express from "express";
import Recipe from "../models/Recipe.model.js";
import User from "../models/User.model.js";

const recipeRoute = express.Router();

recipeRoute.get("/all-recipes", async (req, res) => {
  try {
    const recipes = await Recipe.find({}).populate("User");

    return res.status(200).json(recipes);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

recipeRoute.get("/oneRecipe/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const oneRecipe = await Recipe.findById(id).populate("User");
    return res.status(200).json(oneRecipe)
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

//ITERAÇÃO 2

recipeRoute.post("/create-recipe/:idUser", async (req, res) => {
  try {
    const { idUser } = req.params;

    const newRecipe = await Recipe.create({ ...req.body, user: idUser });

    const updatedUser = await User.findByIdAndUpdate(
      idUser,
      { $push: { recipes: newRecipe._idUser } },
      { new: true, runValidators: true }
    );
    return res.status(201).json(newRecipe);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Deu ruim." });
  }
});

//ITERAÇÃO 3

recipeRoute.post("/create-manyrecipes/:idUser", async (req, res) => {
  try {
    const { idUser } = req.params;
    const manyRecipe = await Recipe.insertMany({ ...req.body, user: idUser });
    //const recipestitle = await Recipe.find({}, { title: 1 });

    const updatedUser = await User.findByIdAndUpdate(
      idUser,
      { $push: { recipes: manyRecipe._id } },
      { new: true, runValidators: true }
    );

    return res.status(201).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Deu ruim." });
  }
});

//ITERAÇÃO 4

recipeRoute.put("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      id,
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

recipeRoute.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRecipe = await Recipe.findByIdAndDelete(id);

    if (!deletedRecipe) {
      return res.status(400).json({ msg: "recipe not find" });
    }

    await User.findByIdAndDelete(
      deletedRecipe.user,
      { $pull: { recipes: id } },
      { new: true, runValidators: true }
    );

    return res.status(200).json({ msg: "Recipe deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

export default recipeRoute;
