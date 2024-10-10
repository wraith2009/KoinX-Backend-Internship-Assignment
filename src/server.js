import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cron from "node-cron";
import fetchCryptoData from "./controllers/fetchdata.controller.js";

dotenv.config();
const app = express();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => console.log("MongoDB connection error:", error));

// Background job to run every 2 hours
cron.schedule("0 */2 * * *", async (req, res) => {
  await fetchCryptoData();
});

// Routes
import statsRouter from "./routes/stat.route.js";
import deviationROuter from "./routes/deviation.route.js";
app.use("/", statsRouter);
app.use("/", deviationROuter);

app.use("/", (req, res) => {
  res.send("Welcome to the Crypto API");
});
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
