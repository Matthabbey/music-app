import express, { Request, Response } from "express";

export const GetAllAlbum = (req: Request, res: Response)=>{
    return res.status(200).json({message: "all albums in database"})
}