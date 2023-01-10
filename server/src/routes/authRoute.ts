import express from "express";
import { getAllUSers, LoginUser, UpdateUser } from '../controller/user'

const router = express.Router()
router.get("/", LoginUser);
router.put("/favourites/:userId", UpdateUser)
router.get("/getUsers", getAllUSers)





export default router