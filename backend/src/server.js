require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send({ message: "MSL's Backend server is running 🚀" });
});

const PORT = process.env.PORT || 4080;

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
