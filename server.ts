import express from "express";
import path from "path";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import authRoutes from "./server/routes/auth";
import repoRoutes from "./server/routes/repo";
import roadmapRoutes from "./server/routes/roadmap";
import knowledgeRiskRoutes from "./server/routes/knowledgeRisk";

dotenv.config();

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/repo", repoRoutes);
app.use("/api/roadmap", roadmapRoutes);
app.use("/api/knowledge-risk", knowledgeRiskRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

async function startServer() {
  // Database Connection
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    console.error("MONGODB_URI is UNDEFINED. Please check your secrets and environment variables.");
  } else {
    try {
      console.log("Connecting to Database Vector...");
      await mongoose.connect(MONGODB_URI, {
        serverSelectionTimeoutMS: 10000, // Fail after 10s instead of buffering indefinitely
        connectTimeoutMS: 10000,
      });
      console.log("Connected to MongoDB Atlas successfully");
    } catch (err) {
      console.error("Critical MongoDB connection failure:", err);
      console.warn("Server will attempt to run in degraded mode (read-only/fail-on-write)");
    }
  }

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
