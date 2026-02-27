import express from "express";
import cors from "cors";
import path from "path";
import { errorHandler } from "./shared/errors/errorHandler";
import router from "./routes";

const app = express();
app.use(cors());
app.use("/public", express.static(path.resolve(__dirname, "..", "public")));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(router)
app.use(errorHandler);
export { app };
