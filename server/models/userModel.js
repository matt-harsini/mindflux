import bcrypt from "bcrypt";
import mongoose from "mongoose";
import validator from "validator";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "Must be a valid email"],
  },
  password: {
    type: String,
    required: true,
    validate: [validator.isStrongPassword, "Weak password"],
  },
});

userSchema.statics.register = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  if (await this.findOne({ email })) {
    throw Error("Email already in use");
  }

  try {
    const user = await this.create({ email, password });
    return user;
  } catch (error) {
    throw Error(error);
  }
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password");
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
