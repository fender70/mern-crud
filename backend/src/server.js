import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import ratelimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

//cors middleware
if(process.env.NODE_ENV !== "production") {
    app.use(cors({
        origin: "http://localhost:5173",
    }));
}

// middleware to parse the request body
app.use(express.json())

// rate limiter middleware
app.use(ratelimiter);

// notes routes
app.use("/api/notes", notesRoutes);

// serve frontend
if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
    app.get("*", (req,res) => {
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"))
    })
}

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started on PORT:", PORT)
    })
})