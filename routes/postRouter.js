const express= require("express")
const {PostModel}= require("../model/postModel")

const postRouter= express.Router()

postRouter.post("/newpost",async(req,res)=>{
	const payload = req.body;
	try{
		const newpost= new PostModel(payload)
		 await newpost.save()
		 res.send(newpost)
	}catch(err){
		res.send({"msg":"Something Wrong","error":err.message})
	}
	
})
postRouter.get("/",async(req,res)=>{
    const posts= await  PostModel.find()
	res.send(posts)	
})


//  --------------------for patch------------------------------------


postRouter.patch("/update/:id",async(req,res)=>{
	  const payload= req.body;
	  const id= req.params.id;
	  const post =await PostModel.findOne({"_id":id})
	  const userID_inPost=post.userID
	  const userID_inreq= req.body.userID;
	  try{
if(userID_inreq!==userID_inPost){
	res.send({"msg":"You are not authorise"})
} else{
	    const updatedpost= await PostModel.findByIdAndUpdate({"_id":id},payload)
	res.send(updatedpost)
}
	  }catch(err){
res.send({"msg":"Something went wrong ","error":err.message})
	  }
})


// for delete

postRouter.delete("/delete/:id",async(req,res)=>{
	
	const id= req.params.id;
	const post =await PostModel.findOne({"_id":id})
	const userID_inPost=post.userID
	const userID_inreq= req.body.userID;
	try{
if(userID_inreq!==userID_inPost){
  res.send({"msg":"You are not authorise"})
} else{
	  const updatedpost= await PostModel.findByIdAndDelete({"_id":id},payload)
  res.send(updatedpost)
}
	}catch(err){
res.send({"msg":"Something went wrong ","error":err.message})
	}
})



module.exports={
	postRouter
}

