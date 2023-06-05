import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import { router as userRoutes } from "./routes/user.js";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/log-mood", userRoutes);
app.use(userRoutes);
main();
async function main() {
  try {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(`Something went wrong: ${error}`);
  }
}
