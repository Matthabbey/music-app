import express, { Request, Response } from "express";
import { artistModel } from "../models/artistModel";

export const CreateArtists = async (req: Request, res: Response) => {
  const { name, imageURL, twitter, instagram } = req.body;
  const newArtist = new artistModel({
    name,
    imageURL,
    twitter,
    instagram,
  });
  try {
    const savedArtist = await newArtist.save();
    return res
      .status(201)
      .json({ message: "New Artist Successfully created", savedArtist });
  } catch (error) {
    return res.status(500).json({ message: "Failed to save artist", error });
  }
};

export const GetSingleArtist = async (req: Request, res: Response) => {
  const filter = { _id: req.params.id };
  const data = await artistModel.findById(filter);

  if (data) {
    return res.status(200).json({ message: "Data is available", data });
  }
  return res.status(404).json({ message: "Data is Not Found"});
};

export const GetAllArtists = async (req: Request, res: Response) => {
  const option = {
    sort: {
      createdAt: 0,
    },
  };
  const data = await artistModel.find({});

  if (data) {
    return res.status(200).json({ message: "Successfully", data });
  }
  return res.status(404).json({ message: "Data is Not Found" });
};


export const UpdateArtist = async (req: Request, res: Response) => {
  const filter = { _id: req.params.id };
  const options = {
    upsert: true,
    new: true,
  };
  const { name, imageURL, twitter, instagram } = req.body;
  try {
    const update = await artistModel.findOneAndUpdate(
      filter,
      {
        name,
        imageURL,
        twitter,
        instagram,
      },
      options
    );
    return res.status(200).json({ success: "Successfully Updated Artist", data: update });
  } catch (error) {
    return res.status(404).json({ message: "false" });
  }
};

export const DeleteArtist = async (req: Request, res: Response) => {
  const filter = { _id: req.params.id };

  const remove = await artistModel.deleteOne(filter);

  if (remove) {
    return res
      .status(200)
      .json({ message: "Data has been deleted Successfully", data: remove });
  }
  return res.status(404).json({ message: "Data is Not Found" });
};
