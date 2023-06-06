import bcrypt from "bcrypt";
import mongoose from "mongoose";
import validator from "validator";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 8,
    maxLength: 30,
    validate: [
      validator.isAlphanumeric,
      "Username must contain letters or numbers",
    ],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "Must be a valid email"],
  },
  password: {
    type: String,
    required: true,
    validate: [
      validator.isStrongPassword,
      "Password must contain at least one symbol, number, uppercase, and lowercase characters",
    ],
  },
});

userSchema.statics.register = async function (email, username, password) {
  if (!username || !password || !email) {
    throw Error("All fields must be filled.");
  }

  if (await this.findOne({ username })) {
    throw Error("Username is taken!");
  }

  if (await this.findOne({ email })) {
    throw Error("Email is already in use.");
  }

  try {
    const user = await this.create({ email, username, password });
    return user;
  } catch (error) {
    throw Error(error);
  }
};

userSchema.statics.login = async function (username, password) {
  if (!username || !password) {
    throw Error("All fields must be filled.");
  }

  const user = await this.findOne({ username });
  if (!user) {
    throw Error("Username is taken!");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Invalid password.");
  }

  return user;
};

userSchema.pre("save", async function (next) {
  try {
    const document = this;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(document.password, salt);
    document.password = hash;
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("User", userSchema);
export { User };
