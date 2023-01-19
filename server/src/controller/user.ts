import express, { Request, Response } from "express";
import admin from "../config/firebase.config";
import { userModel } from "../models/userModel";
import { newUserData, updateNewUserData } from "../utils/utils";

export const LoginUser = async (req: Request, res: Response) => {
  try {
    if (!req.headers.authorization) {
      return res.status(404).json({ message: "resquest Not  Here Found" });
    }
    const token = req.headers.authorization.split(" ")[1];
    const decodeValue = await admin.auth().verifyIdToken(token);
    if (!decodeValue) {
      return res.status(505).json({ message: "UnAuthorized" });
    } else {
      const userExist = await userModel.findOne({
        user_id: decodeValue.user_id,
      });
      if (!userExist) {
        newUserData(decodeValue, req, res);
      } else {
        updateNewUserData(decodeValue, req, res);
        // return res.send("need to update")
      }
    }
  } catch (error) {
    return res.status(500).json({
      Error: error,
      route: "/user/signup",
    });
  }
};

export const UpdateUser = async (req: Request, res: Response) => {
  const filter = { _id: req.params.userId };
  const songId = req.query;

  try {
    // console.log(filter, songId);
    const result = await userModel.updateOne(filter, {
      $push: { favourites: songId },
    });
    res.status(200).send({ success: true, msg: "Song added to favourites" });
  } catch (error) {
    res.status(400).send({ success: false, msg: error });
  }
};

export const getAllUSers = async (req: Request, res: Response) => {
  const options = {
    // sort returned documents in ascending order
    sort: { createdAt: 1 },
    // Include only the following
    // projection : {}
  };

  const cursor = await userModel.find();
  if (cursor) {
    res.status(200).send({ success: true, data: cursor });
  } else {
    res.status(400).send({ success: false, msg: "No Data Found" });
  }
};

export const updateUserRole = async (req: Request, res: Response) => {
  const filter = { _id: req.params.userId };
  const role = req.body.data.role;
  try {
    const result = await userModel.findOneAndUpdate(
      filter,
      { role: role }
    );
    console.log(result);
    
    return res.status(200).send({ user: result });
  } catch (error) {
    res.status(400).send({ success: false, msg: error });
    console.log(error);
  }
};
