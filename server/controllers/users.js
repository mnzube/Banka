import uuid from "uuid";
import User from "../models/users";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import keys from "../config/keys";



exports.signup=(req,res)=>{
    //validation
    if(!req.body.email || !req.body.firstname || !req.body.lastname || 
        !req.body.password || !req.body.type){
        return res.status(400).json({status:400,error:"all fields are required"});
    }
    else if(req.body.email==="" || req.body.firstname==="" ||
       req.body.lastname==="" || req.body.password==="" || req.body.type===""){
            return res.status(400).json({status:400,error:"all fields are required"});
    }else{
        //initial newUser
        const newUser={
        id:uuid.v4(),
        email:req.body.email,
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        password:bcrypt.hashSync(req.body.password),
        type:req.body.type,
        isAdmin:(req.body.isAdmin ? req.body.isAdmin : false)
    }
    const save=User.create(newUser);
    if(save){
        const payload = {
            id:save.id,
            type:save.type
        };
        jwt.sign(payload,keys.secret,
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
                type: save.type,
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
    if(!req.body.email || !req.body.password){
        return res.status(400).json({
            status:400,
            error:"all fields are required"
        });
    }
    if(req.body.email==="" ||req.body.password===""){
        return res.status(400).json(
            {status:400,error:"all fields are required"
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
                email: user.email
            };
            jwt.sign(payload,keys.secret,
                {
                    expiresIn:"24d"}, (err,token)=>{
                if (err){
                    console.log(err);
                }
               return res.status(200).json({
                   status:201,
                   token:`${token}`,
                   data:{
                      message: 'User sucessfuly signed in'
                    }
                });
            })
        }

    })
}else{
    return res.status(400).json({error:"authentication failed."});
}
}