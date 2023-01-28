import express, { Request, Response } from "express";
import { songsModel } from "../models/songModel";

export const CreateSongs = async (req: Request, res: Response) => {
  const { name, imageURL, artist, category, songURL, album, language } =
    req.body;
  const newArtist = new songsModel({
    name,
    imageURL,
    artist,
    category,
    songURL,
    album,
    language,
  });
  try {
    const savedSong = await newArtist.save();
    return res
      .status(201)
      .json({ message: "New Song Successfully created", savedSong});
  } catch (error) {
    console.log(error);
    
    return res.status(500).json({ message: "Failed to save Song", error });
  }
};

export const GetSingleSong = async (req: Request, res: Response) => {
  const filter = { _id: req.params.id };
  const data = await songsModel.findById(filter);

  if (data) {
    return res.status(200).json({ message: "Data is available", data });
  }
  return res.status(404).json({ message: "Data is Not Found" });
};

export const GetAllSongs = async (req: Request, res: Response) => {
  const option = {
    sort: {
      createdAt: 0,
    },
  };
  const data = await songsModel.find({});

  if (data) {
    return res.status(200).json({ message: "Successfully", data });
  }
  return res.status(404).json({ message: "Data is Not Found" });
};

export const UpdateSong = async (req: Request, res: Response) => {
  const filter = { _id: req.params.id };
  const options = {
    upsert: true,
    new: true,
  };
  const { name, imageURL, artist, category, songURL, album, language } =
    req.body;
  try {
    const update = await songsModel.findOneAndUpdate(
      filter,
      {
        name,
        imageURL,
        artist,
        category,
        songURL,
        album,
        language,
      },
      options
    );
    return res
      .status(200)
      .json({ success: "Successfully Updated Artist", data: update });
  } catch (error) {
    return res.status(404).json({ message: "false" });
  }
};

export const DeleteSong = async (req: Request, res: Response) => {
  const filter = { _id: req.params.id };

  const remove = await songsModel.deleteOne(filter);

  if (remove) {
    return res
      .status(200)
      .json({ message: "Data has been deleted Successfully", data: remove });
  }
  return res.status(404).json({ message: "Data is Not Found" });
};
