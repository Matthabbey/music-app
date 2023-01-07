import express, { Request, Response } from "express";
import { artistModel } from "../models/artist";

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


export const GetAllArtists = async (req: Request, res: Response) =>{
    
    return res.status(200).json({ message: "All artist available in the database"});

}