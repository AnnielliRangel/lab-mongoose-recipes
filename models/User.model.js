import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    bio: {
      type: String,
    },
    age: { type: Number },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    isChef: {
      type: Boolean,
      defaut: false,
    },
    recipes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Recipe",
      },
    ],
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export default User;
