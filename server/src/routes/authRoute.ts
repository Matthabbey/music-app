import express from "express";
import { LoginUser } from '../controller/user'

const router = express.Router()
router.get("/login", LoginUser);





export default router