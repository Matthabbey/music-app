import express from "express";
import { LoginUser } from '../controller/user'

const router = express.Router()
router.get("/", LoginUser);





export default router