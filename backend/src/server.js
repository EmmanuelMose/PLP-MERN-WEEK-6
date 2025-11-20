import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import bugRoutes from "./routes/bugRoutes.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";

dotenv.config();

const app = express();

// --- Middleware ---
// Security headers
app.use(helmet());

// Enable CORS
app.use(cors());

// Parse JSON requests
app.use(express.json());

// --- Routes ---
// Root route / health check
app.get("/", (req, res) => {
  res.json({ message: "Backend is running!" });
});

// Bug routes
app.use("/api/bugs", bugRoutes);

// Error handling middleware (must be after routes)
app.use(errorHandler);

// --- MongoDB Connection ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));

export default app;
