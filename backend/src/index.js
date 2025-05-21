import express from "express";
import cors from "cors";    
import "dotenv/config";
import job from "./lib/cron.js";

import authRoutes from "./routes/authRoutes.js";
import barberRoutes from "./routes/barberRoutes.js";
import { connectDB } from "./lib/db.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cors());

// Roteadores
app.use("/api/auth", authRoutes);
app.use("/api/barbers", barberRoutes);

// Cron job e ligação à base de dados
job.start();

app.get("/", (req, res) => {
    res.send("API de barbearias no ar.");
});

app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
    connectDB();
});
