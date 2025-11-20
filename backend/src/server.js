import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import bugRoutes from "./routes/bugRoutes.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";

dotenv.config();

const app = express();

// Security and JSON parsing
app.use(cors());
app.use(helmet());
app.use(express.json());

// Routes
app.use("/api/bugs", bugRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => res.json({ status: "OK" }));

// Error handling middleware
app.use(errorHandler);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  maxPoolSize: 10,             // connection pooling
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));

export default app;
