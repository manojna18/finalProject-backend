import express from "express";
import { getClient } from "../db";
import AccountInfo from "../models/AccountInfo";
import { ObjectId } from "mongodb";

const accountInfoRouter = express.Router();

const errorResponse = (error: any, res: any) => {
  console.error("FAIL", error);
  res.status(500).json({ message: "Internal Server Error" });
};

accountInfoRouter.get("/:id", async (req, res) => {
  try {
    const uid: string = req.params.id;
    console.log(uid);
    const client = await getClient();
    const results = await client
      .db()
      .collection<AccountInfo>("myRecipes")
      .findOne({ userId: uid });
    console.log(results);
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

accountInfoRouter.put(`/:id`, async (req, res) => {
  try {
    const _id: ObjectId = new ObjectId(req.params.id);
    const account: AccountInfo = req.body;
    delete account._id;

    // const index: number = account
    const client = await getClient();
    const result = await client
      .db()
      .collection<AccountInfo>("myRecipes")
      .replaceOne({ _id: _id }, account);

    account._id = new ObjectId(_id);

    console.log(result);

    res.status(200).json(account);
  } catch (err) {
    errorResponse(err, res);
  }
});

export default accountInfoRouter;
