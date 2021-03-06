import express from 'express';
var router = express.Router()
import { check,validationResult } from 'express-validator';
import {signout,signup,signin} from '../controllers/auth.js'

router.post(
    "/signup",[
    check("name", "Name should be atleast 3 char").isLength({min:3}),
    check("email", "Email is required").isEmail(),
    check("password", "Password should be atleast 3 characters").isLength({min:3})

],signup)

router.post(
    "/signin",[
    check("email", "Email is required").isEmail(),
    check("password", "Password field is required").isLength({min:1})

],signin

)



router.get("/signout",signout)



export default router;