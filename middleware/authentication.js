 const jwt = require("jsonwebtoken")
 const authentication =(req,res,next)=>{
	token= req.headers.authorization;
	if(token){
		const decoded = jwt.verify(token, 'nodejs')
		if(decoded){
			req.body.userID=decoded.userID
			next()
		}else{
			res.send({"msg":"Please Login"})
		}
	}else{
		res.send("Please login first")
	}
 }

 module.exports={
	authentication
 }
