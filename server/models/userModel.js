import bcrypt from "bcrypt";
import mongoose from "mongoose";
import validator from "validator";
import crypto from "crypto";

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
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  phone_number: {
    type: String,
    validate: {
      validator: function (v) {
        return /\d{3}-\d{3}-\d{4}/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
  password_confirm: {
    type: String,
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same!",
    },
  },
  password_reset_token: String,
  password_reset_expires: Date,
  password_changed_at: Date,
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
    throw Error("User does not exist!");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Invalid password.");
  }

  return user;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.password_reset_token = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.password_reset_expires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

userSchema.methods.changedPasswordAfter = function (jwt_timestamp) {
  if (this.password_changed_at) {
    const password_changed_timestamp = parseInt(
      this.password_changed_at.getTime() / 1000,
      10
    );

    return jwt_timestamp < password_changed_timestamp;
  }
  return false;
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return;
  try {
    const document = this;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(document.password, salt);
    document.password = hash;
    document.password_confirm = undefined;
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.password_changed_at = Date.now() - 1000;
  next();
});

const User = mongoose.model("User", userSchema);

export { User };
