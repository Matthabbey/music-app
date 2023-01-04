import { userModel } from "../models/user"
import express, {Request, Response} from 'express'

export const newUserData =  async ( decodeValue: any, req: Request, res: Response, )=>{
    const newUser = new userModel({
        name: decodeValue.name,
        email: decodeValue.email,
        imageUrl: decodeValue.picture,
        email_verified: decodeValue.email_verified,
        role: "member",
        user_id: decodeValue.user_id,
        auth_time: decodeValue.auth_time
    })
    try {
        const savedUser = await newUser.save()
        res.status(200).send({user: savedUser})
    } catch (error) {
        // console.log("hello world")
         res.status(500).send({success: false, msg: error})
    }
}