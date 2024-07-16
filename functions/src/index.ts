import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";
import accountInfoRouter from "./routes/accountInfoRouter";
import { getClient } from "./db";
import AccountInfo from "./models/AccountInfo";
const app = express();
app.use(cors());
app.use(express.json());
app.use("/", accountInfoRouter);
export const api = functions.https.onRequest(app);

exports.scheduledFunctionCrontab = functions.pubsub
  .schedule("0 0 * * *")
  .timeZone("America/New_York")
  .onRun(async () => {
    try {
      const client = await getClient();
      client
        .db()
        .collection<AccountInfo>("myRecipes")
        .updateMany(
          {},
          {
            $set: {
              meals: [],
              totalDailyCalories: 0,
              totalDailyCarbs: 0,
              totalDailyFats: 0,
              totalDailyProtein: 0,
            },
          }
        );
    } catch (error) {
      console.log(error, "internal server error");
    }
  });
