import express from "express";
import { getAllUSers, LoginUser, updateUserRole, UpdateUser, deleteUser } from '../controller/user'

const router = express.Router()
router.get("/", LoginUser);
router.put("/favourites/:userId", UpdateUser)
router.get("/getUsers", getAllUSers)
router.put("/updateUser/:userId", updateUserRole)
router.delete('/deleteUser/:userId', deleteUser)

// router.put('/update', (req, res)=>{console.log(`I am here for you`);
// })





export default router