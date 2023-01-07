import express, { Request, Response } from "express";

export const GetAllSongs = (req: Request, res: Response)=>{
    return res.status(200).json({message: "all songs in database"})
}