import uuid from "uuid";
import User from "../models/users";



exports.signup=(req,res)=>{
    //validation
    if(!req.body.email || !req.body.firstname || !req.body.lastname || 
        !req.body.password || !req.body.type || !req.body.isAdmin){
        return res.status(400).json({error:"all fields are required"});
    }
    else if(req.body.email==="" || req.body.firstname==="" ||
       req.body.lastname==="" || req.body.password==="" || req.body.type==="" || req.body.isAdmin===""){
            return res.status(400).json({error:"all fields are required"});
    }else{
        //initial newUser
        const newUser={
        id:uuid.v4(),
        email:req.body.email,
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        password:req.body.password,
        type:req.body.type,
        isAdmin:req.body.isAdmin
    }
    const save=User.create(newUser);
    if(save){
        return res.status(201).json({status:201,message:"user created successfully",data:save});
    }else{
        return res.status(400).json({error:"an error occured try again"});
    }
    }
}
