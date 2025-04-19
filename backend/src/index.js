import express from "express";
import cors from "cors";    
import "dotenv/config";
import job from "./lib/cron.js";

import authRoutes from "./routes/authRoutes.js";
import barberRoutes from "./routes/barberRoutes.js";
import { connectDB } from "./lib/db.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

job.start();
app.use("/api/auth", authRoutes);
app.use("/api/barbers", barberRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectDB();
});
