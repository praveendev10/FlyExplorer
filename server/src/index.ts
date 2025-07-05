import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { Request, Response } from "express";
import routes from "./controller/controller";
import express from "express";
dotenv.config();
const app = express();
const PORT = 5000;

app.use(
  cors({
    origin: "http://localhost:3000", // Frontend origin
    credentials: true,
  })
);
app.use(express.json());
const url = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DB}?retryWrites=true&w=majority&appName=Cluster0`;

if (!url) {
  console.error("❌ DB_CONNECTION_STRING is missing from .env");
  process.exit(1);
}
app.get("/", (req: Request, res: Response) => {
  res.send("✈️ Hello from Express Server!");
});
app.use("/api", routes);
mongoose
  .connect(url as string)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
