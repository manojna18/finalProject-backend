import express from "express";
import { getClient } from "../db";
import AccountInfo from "../models/AccountInfo";

const accountInfoRouter = express.Router();

const errorResponse = (error: any, res: any) => {
  console.error("FAIL", error);
  res.status(500).json({ message: "Internal Server Error" });
};

accountInfoRouter.get("/", async (req, res) => {
  try {
    const client = await getClient();
    const results = client
      .db()
      .collection<AccountInfo>("myRecipes")
      .find()
      .toArray();
    res.status(200).json(results);
  } catch (err) {
    console.log(err);
  }
});

accountInfoRouter.post("/", async (req, res) => {
  try {
    const accountInfo: AccountInfo = req.body;
    const client = await getClient();
    await client
      .db()
      .collection<AccountInfo>("myRecipes")
      .insertOne(accountInfo);
    res.status(201).json(accountInfo);
  } catch (err) {
    errorResponse(err, res);
  }
});
