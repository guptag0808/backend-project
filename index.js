const express= require("express")
const {connection}= require("./db.js")
const {userRouter}= require("./routes/userRouter")
const {postRouter}= require("./routes/postRouter")
const {authentication} =require("./middleware/authentication")
require('dotenv').config()

const app= express()

app.use(express.json())

app.use("/user",userRouter)
 app.use(authentication)
app.use("/post",postRouter)



app.listen(process.env.port,async()=>{
    try{
		await connection
		console.log(`server is running at port ${process.env.port}`)
	}catch(err){
		console.log("Something wrong with server")
	}
	
})