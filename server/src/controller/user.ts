import express, {Request, Response} from "express"
import admin from "../config/firebase.config"

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
            return res.status(505)
        }

    } catch (error) {
       return res.status(500).json({
            Error: error,
            route: "/user/signup",
    })
    }
}