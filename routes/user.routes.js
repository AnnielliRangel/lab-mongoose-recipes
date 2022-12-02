import express from "express";
import User from "../models/User.model.js";
import Recipe from "../models/Recipe.model.js";

const userRoute = express.Router();

//Criando um novo usuário

userRoute.post("/create-user", async (req, res) => {
  try {
    const newUser = await User.create(req.body);

    return res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.errors);
  }
});

//Exibindo todos os usuários

userRoute.get("/all-users", async (req, res) => {
  try {
    const allUsers = await User.find();
    return res.status(200).json(allUsers);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.errors);
  }
});

// Exibindo um usuário

userRoute.get("/oneUser/:idUser", async (req, res) => {
  try {
    const { idUser } = req.params;
    const user = await User.findById(idUser).populate("recipes");

    if (!user) {
      return res.status(400).json({ msg: "Usuário não encontrado" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.errors);
  }
});

// deletando um usuários e suas receitas

userRoute.delete("/deleteUser/:idUser", async (req, res) => {
  try {
    const { idUser } = req.params;
    const deletedUser = await User.findByIdAndDelete(idUser);
    if (!deletedUser) {
      return res.status(400).json({ msg: "Usuário não encontrado" });
    }

    const users = await User.find();
    await Recipe.deleteMany({ user: idUser });

    return res.status(200).json(users);
  } catch (error) {
    console.log(error)
    return res.status(500).json(error.errors)
  }
});

//editando um usuário
userRoute.put("/edit-user/:idUser", async(req, res)=>{
    try {
        const {idUser} = req.params
        const updatedUser = await User.findByIdAndUpdate(idUser,{...req.body}, {new:true, runValidators:true})
        return res.status(200).json(updatedUser)
        
    } catch (error) {
        console.log(error);
    return res.status(500).json(error.errors)
    }
})

export default userRoute;
