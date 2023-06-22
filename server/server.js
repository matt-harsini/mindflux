import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import { rateLimit } from "express-rate-limit";
import { router as userRoutes } from "./routes/user.js";
import { router as logRoutes } from "./routes/log.js";
import { router as chartRoutes } from "./routes/chart.js";
import cors from "cors";
import helmet from "helmet";
import { createAPIError, handleError } from "./errors/errorHandler.js";
import { StatusCodes } from "http-status-codes";

const app = express();
app.use(helmet());
app.use(cors());
const limiter = rateLimit({
  max: 150,
  windowMs: 60 * 60 * 60,
  message: "Too many requests, please try again in an hour",
});
app.use("/api", limiter);
app.use(express.json({ limit: "10kb" }));
app.use("/api", userRoutes);
app.use("/api", chartRoutes);
app.use("/api", logRoutes);
app.all("*", function (req, res, next) {
  next(createAPIError("No route exists", StatusCodes.NOT_FOUND));
});
app.use(handleError);
main();
async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(`Something went wrong: ${error}`);
  }
}