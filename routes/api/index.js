import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "../../config/db.js";
import apiRoutes from "../api.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API Routes
app.use("/api", apiRoutes);

// Handle SPA routing - serve index.html for all routes
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../../public", "index.html"));
});

// Export the app as a serverless function
export default app;
