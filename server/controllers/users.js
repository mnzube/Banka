import uuid from "uuid";
import User from "../models/users";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();


exports.signup=(req,res)=>{
    //validation
    if(!req.body.email || !req.body.firstName || !req.body.lastName || 
        !req.body.password || req.body.email===""
        || req.body.password==="" || req.body.lastName==="" ||
         req.body.firstName==="")
         {
        return res.status(400).json({status:400,error:"all fields are required"});
    }else{
        //initial newUser
        const newUser={
        id:uuid.v4(),
        email:req.body.email,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        password:bcrypt.hashSync(req.body.password),
        isAdmin:(req.body.isAdmin ? req.body.isAdmin : false)
    }
    const save=User.create(newUser);
    if(save){
        const payload = {
            id:save.id,
        };
        jwt.sign(payload,process.env.secret,
            {
                expiresIn:"24d"}, (err,token)=>{
            if (err){
                console.log(err);
            }
        return res.status(201).json(
            {
                status:201,
                message:"user created successfully",
                token:`${token}`,
            data:{
                email: save.email,
                firstname: save.firstname,
                lastname: save.lastname,
                isAdmin: save.isAdmin
            }})
            });
    }else{
        return res.status(400).json({status:400,error:"an error occured try again"});
    }
    }
}
//signin
exports.signin=(req,res)=>{
    //validation
    if(!req.body.email || !req.body.password || req.body.email==="" || req.body.password===""){
        return res.status(400).json({
            status:400,
            error:"all fields are required"
        });
    }
//
const user=User.find(req.body.email);
if(user){
    //
    bcrypt.compare(req.body.password, user.password, (error, matches)=>{

        if(error){
            return res.status(500).json(
                {   status:500,
                    error: 'authentication error',
                });
        }
        if(!matches){
          return res.status(400).json(
              { status:400,
              error:"passwords don't match."
            });
        }
        else{
            const payload = {
                id:user.id,

            };
            jwt.sign(payload,process.env.secret,
                {
                    expiresIn:"24d"}, (err,token)=>{
                if (err){
                    console.log(err);
                }
               return res.status(200).json({
                   status:200,
                   token:`${token}`,
                   data:{
                      message: 'User sucessfully signed in'
                    }
                });
            })
        }

    })
}else{
    return res.status(400).json({error:"authentication failed."});
}
}