// Backend/index.js
import express from "express";

import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import userRoute from "./routes/project.route.js";

// Backend/index.js

import bodyParser from "body-parser";

const app = express();
dotenv.config();

// Increase all size limits for parsing
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// CORS configuration
app.use(
  cors({
    origin: process.env.FRONTENDURL,
    credentials: true,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Serve static files

const PORT = process.env.PORT;
const URI = process.env.MONGODB_URI;

try {
  await mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connected to MongoDB");
} catch (error) {
  console.error("MongoDB connection error:", error);
}

// Routes
app.use("/portfolio", userRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 413) {
    return res.status(413).json({
      error: "Request entity too large",
      message: "The file size exceeds the limit allowed",
    });
  }
  next(err);
});

app.listen(PORT, () => {
  console.log(`Server is Running on port ${PORT}`);
});
