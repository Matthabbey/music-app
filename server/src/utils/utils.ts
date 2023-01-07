import { userModel } from "../models/userModel";
import express, { Request, Response } from "express";

export const newUserData = async (
  decodeValue: any,
  req: Request,
  res: Response
) => {
  const newUser = new userModel({
    name: decodeValue.name,
    email: decodeValue.email,
    imageUrl: decodeValue.picture,
    email_verified: decodeValue.email_verified,
    role: "member",
    user_id: decodeValue.user_id,
    auth_time: decodeValue.auth_time,
  });
  try {
    const savedUser = await newUser.save();
    res.status(200).send({
      message: "Successfully created",
      user: savedUser,
    });
  } catch (error) {
    // console.log("hello world")
    res.status(500).send({ success: false, msg: error });
  }
};
export const updateNewUserData = async (
  decodeValue: any,
  req: Request,
  res: Response
) => {
  const filter = { user_id: decodeValue.user_id };
  const options = {
    upsert: true,
    new: true,
  };
  try {
    const update = await userModel.findOneAndUpdate(
      filter,
      { auth_time: decodeValue.auth_time },
      options
    );
    return res.status(200).json({
      message: "Successfully updated",
      user: update,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      route: "todo/update router",
    });
  }
};
