import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/simulationroute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allow Frontend to talk to Backend
app.use(express.json()); // Parse JSON bodies

// Routes
app.use("/api", router);

// Health Check
app.get("/", (req, res) => {
  res.send("Interactive Explainer API is running...");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
