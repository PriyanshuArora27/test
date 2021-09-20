import User from "../models/user.js";
import { check,validationResult } from "express-validator";
import jwt from 'jsonwebtoken';
const { sign } = jwt;
import expressJwt from "express-jwt";


export const signup=(req,res)=>{
   
    const errors=validationResult(req)
    if(!errors.isEmpty()){
      return res.status(422).json({
        error: errors.array()[0].msg
      })
    }

    const user = new User(req.body);
    user.save((err, user) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
        
          err: "NOT able to save user in DB"
        });
      }
      res.json({
        name:user.name,
        email:user.email,
        id:user._id
      });
    });
  };

export const signin=(req,res)=>{
  const errors=validationResult(req)
    const{email,password}=req.body

    if(!errors.isEmpty()){
      return res.status(422).json({
        error: errors.array()[0].msg
      })
    }

    User.findOne({email},(err,user)=>{
      if(err || !user){
        return res.status(400).json({
          error:"USER email doesn't exist"
        })
      }
      if(!user.authenticate(password)){
        return res.status(401).json({
          error:"Email and password do not match"
        })
      }
      //create token
      const token = jwt.sign({ _id: user._id }, process.env.SECRET);
      //put token in cookie
       res.cookie("token",token, {expire:new Date() + 9999})

      //send response to front end
      const{_id,name,email,role} = user;
      return res.json({token, user:{_id,name,email,role}}) 

    })


};  
 

export const signout = (req,res)=>{
    res.clearCookie("token")
    res.json({
        messge:"User signout successfully"
    })

};

console.log(process.env.SECRET)


//protected routes
// export const isSignedIn = expressJwt({
  

//   secret:'secret',
//   algorithms:['HS256'],

//   secret: process.env.SECRET,
//   userProperty: "auth"
// });

//custom middlewares 


