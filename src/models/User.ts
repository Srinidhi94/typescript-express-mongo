import { model, Schema } from "mongoose";

const UserSchema: Schema = new Schema({
  createdAt: Date,
  email: {
    default: "",
    required: true,
    type: String,
    unique: true,
  },
  firstName: {
    default: "",
    required: true,
    type: String,
  },
  lastName: {
    default: "",
    required: true,
    type: String,
  },
  password: {
    default: "",
    required: true,
    type: String,
  },
  posts: [
    {
      ref: "Post",
      type: Schema.Types.ObjectId,
    },
  ],
  updatedAt: Date,
  userName: {
    default: "",
    lowercase: true,
    required: true,
    type: String,
    unique: true,
  },
});

export const User = model("User", UserSchema);
