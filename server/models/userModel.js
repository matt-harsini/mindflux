import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// static signup method (virtuals?)
userSchema.statics.register = async function (email, password) {};
const User = mongoose.model("User", userSchema);

export { User };
