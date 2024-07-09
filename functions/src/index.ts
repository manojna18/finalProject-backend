import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";
import accountInfoRouter from "./routes/accountInfoRouter";
const app = express();
app.use(cors());
app.use(express.json());
app.use("/", accountInfoRouter);
export const api = functions.https.onRequest(app);
