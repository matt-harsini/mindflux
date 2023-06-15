import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import { rateLimit } from "express-rate-limit";
import { router as userRoutes } from "./routes/user.js";
import { router as logRoutes } from "./routes/log.js";
import cors from "cors";
const app = express();
app.use(cors());
const limiter = rateLimit({
  max: 150,
  windowMs: 60 * 60 * 60,
  message: "Too many requests, please try again in an hour",
});
app.use("/api", limiter);
app.use(express.json());
app.use("/api", userRoutes);
app.use("/api", logRoutes);
app.use(userRoutes);
main();
async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected");
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(`Something went wrong: ${error}`);
  }
}
