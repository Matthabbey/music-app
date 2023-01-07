import express from "express";
import { GetUser } from '../controller/user'

const router = express.Router()
router.get("/", GetUser);





export default router