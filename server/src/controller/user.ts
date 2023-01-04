import express, {Request, Response} from "express"
import admin from "../config/firebase.config"
import { userModel } from "../models/user"
import { newUserData } from "../utils/utils"


export const User = async ( req: Request, res: Response) =>{
    try {
        if(!req.headers.authorization){
            return res.status(404).json({message: "resquest Not Found"})
        }
        const token = req.headers.authorization.split(" ")[1]
        const decodeValue = await admin.auth().verifyIdToken(token)
        if(!decodeValue){
            return res.status(505).json({message: "UnAuthorized"})
        }else{

            const userExist = await userModel.findOne({"user_id": decodeValue.user_id})
            if(!userExist){
               newUserData(decodeValue, req, res)
            }else{
                return res.send("need to update")
            }
        }

    } catch (error) {
       return res.status(500).json({
            Error: error,
            route: "/user/signup",
    })
    }
}