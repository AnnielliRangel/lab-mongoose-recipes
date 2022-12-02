import express from "express";
import * as dotenv from "dotenv";
import recipeRoute from "./routes/recipes.routes.js";
import connect from "./config/db.config.js";
import userRoute from "./routes/user.routes.js"

dotenv.config();

const app = express();

app.use(express.json());

connect();



app.use("/recipe", recipeRoute);
app.use("/user", userRoute)

app.listen(process.env.PORT, () => {
  console.log(
    `App up and running on port http://localhost:${process.env.PORT}`
  );
});

/*

const mongoose = require('mongoose');
// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  */
