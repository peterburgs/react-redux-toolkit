import cors from "cors";
import "dotenv/config";
import express, { Application } from "express";
import authRoute from "./routes/authRoutes";
import gameRoute from "./routes/gameRoute";

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use("/api/games", gameRoute);
app.use("/api/auth", authRoute);

export { app };
