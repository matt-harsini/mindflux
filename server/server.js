import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/user";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/log-mood");
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
