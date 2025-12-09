import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import jobRoutes from "./routes/job.routes.js";

console.log("SERVER FILE URI =", process.env.MONGO_URI); // debug

const app = express();

// Connect DB **AFTER dotenv.config**
connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/jobs", jobRoutes);

app.post("/api/jobs", (req, res) => {
  console.log("BODY:", req.body); // DEBUG
  res.send("received");
});


app.get("/", (req, res) => {
  res.send({ message: "MSL's Backend server is running 🚀" });
});

const PORT = process.env.PORT || 4080;
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
