import express, {Request, Response} from "express"
import admin from "../config/firebase.config"
import { userModel } from "../models/user"

export const User = async ( req: Request, res: Response) =>{
    try {
        // return res.send(req.headers.authorization)
        if(!req.headers.authorization){
            return res.status(404).json({message: "resquest Not Found"})
        }
        const token = req.headers.authorization.split(" ")[1]
        // return res.status(200).json({token: token })

        const decodeValue = await admin.auth().verifyIdToken(token)
        if(!decodeValue){
            return res.status(505).json({message: "UnAuthorized"})
        }else{
            // return res.status(200).json(decodeValue)
            const userExist = await userModel.findOne({"user_id": decodeValue.user_id})
            if(!userExist){
                return res.send('need to create')
            }

        }

    } catch (error) {
       return res.status(500).json({
            Error: error,
            route: "/user/signup",
    })
    }
}

export const newUserDate =  async ( req: Request, res: Response, decodeValue: any)=>{
    const newUser = new userModel({
        name: decodeValue.name,
        email: decodeValue.email,
        imageUrl: decodeValue.imageUrl,
        email_verified: decodeValue.email_verified,
        role: decodeValue.role,
        user_id: decodeValue.user_id,
        auth_time: decodeValue.auth_time

    })
}