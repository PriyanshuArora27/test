import express from 'express';
var router = express.Router()
import {signout,signup} from '../controllers/auth.js'

router.post("/signup",signup)
router.get("/signout",signout)

export default router;