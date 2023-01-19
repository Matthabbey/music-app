import express from "express";
import { getAllUSers, LoginUser, updateAllUSers, UpdateUser } from '../controller/user'

const router = express.Router()
router.get("/", LoginUser);
router.put("/favourites/:userId", UpdateUser)
router.get("/getUsers", getAllUSers)
router.put('/update/:userId', updateAllUSers)





export default router