import express, { Request, Response } from "express";
import { albumModel } from "../models/album";

export const CreateAlbums = async (req: Request, res: Response) => {
  const { name, imageURL, twitter, instagram } = req.body;
  const newArtist = new albumModel({
    name,
    imageURL
  });
  try {
    const savedArtist = await newArtist.save();
    return res
      .status(201)
      .json({ message: "New Album Successfully created", savedArtist });
  } catch (error) {
    return res.status(500).json({ message: "Failed to save Album", error });
  }
};

export const GetSingleAlbum = async (req: Request, res: Response) => {
  const filter = { _id: req.params.id };
  const data = await albumModel.findById(filter);

  if (data) {
    return res.status(200).json({ message: "Data is available", data });
  }
  return res.status(404).json({ message: "Data is Not Found" });
};

export const GetAllAlbums = async (req: Request, res: Response) => {
  const option = {
    sort: {
      createdAt: 0,
    },
  };
  const data = await albumModel.find({});

  if (data) {
    return res.status(200).json({ message: "Successfully", data });
  }
  return res.status(404).json({ message: "Data is Not Found" });
};


export const UpdateAlbum = async (req: Request, res: Response) => {
  const filter = { _id: req.params.id };
  const options = {
    upsert: true,
    new: true,
  };
  const { name, imageURL, twitter, instagram } = req.body;
  try {
    const update = await albumModel.findOneAndUpdate(
      filter,
      {
        name,
        imageURL
      },
      options
    );
    return res.status(200).json({ success: "Successfully Updated Album", data: update });
  } catch (error) {
    return res.status(404).json({ message: "false" });
  }
};

export const DeleteAlbum = async (req: Request, res: Response) => {
  const filter = { _id: req.params.id };

  const remove = await albumModel.deleteOne(filter);

  if (remove) {
    return res
      .status(200)
      .json({ message: "Data has been deleted Successfully", data: remove });
  }
  return res.status(404).json({ message: "Data is Not Found" });
};
