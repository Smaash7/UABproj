import express from "express";
import cors from "cors";    
import "dotenv/config";
import job from "./lib/cron.js";

import authRoutes from "./routes/authRoutes.js";
import barberRoutes from "./routes/barberRoutes.js";
import { connectDB } from "./lib/db.js";
import userRoutes from "./routes/authRoutes.js";


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cors());

job.start();
app.use("/api/auth", authRoutes);
app.use("/api/barbers", barberRoutes);
app.use("/api/users", userRoutes);


app.get("/", (req, res) => {
    console.log("GET /");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectDB();
});
