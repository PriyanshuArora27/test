import User from "../models/user.js"

export const signup=(req,res)=>{
   const user = new User(req.body);
   user.save((err,user)=>{
        if(err){
            return res.status(400).json({
                err:"NOT able to save user in DB"

            })
        }
        res.json(user);
   });
}
 

export const signout = (req,res)=>{
    res.json({
        messge:"User signout"
    })

};


