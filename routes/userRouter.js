const express = require("express")
const {UserModel}=require("../model/userModel")
const jwt= require("jsonwebtoken")
const bcrypt= require("bcrypt")
const userRouter= express.Router()


userRouter.post("/register",async(req,res)=>{
	 const {name,email,gender,password,age,city}=req.body;

	 try{
		const checkuser= UserModel.findOne({email})
		console.log(checkuser)
		if(checkuser){
           res.send("User Already Present Please Login")
		}else{
			bcrypt.hash(password, 5, async(err, hash)=> {
				if(err){
					res.send("Something wrong with hashing")
				}else{
					const user= new UserModel({name,email,gender,password:hash,age,city}) 
					await user.save()
					  res.send(user)
				}
			});
		}
		
	 }catch(err){
		res.send({"msg":"something wrong with register","error":err.message})
	 }
})
  
userRouter.post("/login",async(req,res)=>{
	const {email,password}=req.body;
      try{
		  const user =await UserModel.find({email})
		  if(user.length>0){
			bcrypt.compare(password, user[0].password, (err, result)=> {
				if(result){
					const token = jwt.sign({userID:user[0]._id}, 'nodejs')
					res.send({"msg":"Sucessfull login","token":token})
				}else{
					res.send({"msg":"Wrong Credential"})
				}
			});
		  }else{
			res.send("User not Found")
		}
	  }catch(err){

		res.send({"msg":"something wrong with register","error":err.message})
	  }
})

module.exports={
	userRouter
}
