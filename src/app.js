// app.use("/data",(req,res)=>{
//     res.send("It is a message from data page")
// })

// app.use("/help",(req,res)=>{
//   res.send("this is from help page")
// })

// app.use("/",(req,res)=>{
//     res.send("The base page is not  loaded")
// })

// app.get("/user",(req,res)=>{
//     res.send("this is specific to get user")
// })


// app.post("/user",(req,res)=>{
//     res.send("Data is saved in the DB")
// })

//now the word 's' is optional here
// app.get(/^\/u?ser$/,(req,res)=>{
//     res.send("this is just testing for params and routes")
// })

//+ used to add as many 'u' the letter before +
// app.get(/^\/u+ser$/,(req,res)=>{
//     res.send("this is just testing for params and routes")
// })

//* should have 0 u or many u

//any a in the url
// app.get(/a/,(req,res)=>{
//     res.send("this is just testing for params and routes")
// })

//anything ends with user
//  app.get(/.*user$/,(req,res)=>{
//    res.send("this is just testing for params and routes")
//  })


//query useage
//http://localhost:3000/user?id=1212&pass=123456

//  app.get("/user",(req,res)=>{
//     console.log(req.query)
//    res.send("this is just testing for params and routes")
//  })



//param usage
//http://localhost:3000/user/1212/123456

//  app.get("/user/:id/:password",(req,res)=>{
//     console.log(req.params)
//    res.send("this is just testing for params and routes")
//  })



//Route handlers

// app.use("/user",(req,res,next)=>{
//   console.log("started")
 
 // res.send("sfvwd")//executes this to api and go to next handler if res is present its an err
//    next()
// },(req,res)=>{
// res.send("starting it from 2")
// })


//Middlewares


// app.get("/user",(req,res,next)=>{
//   console.log("2nd one")
//   res.send("the 2nd ones response")
//   next()
// })


// app.get("/user",(req,res,next)=>{
//   console.log("1st dcw one")
// res.send("1st")
// })


//MIDDLEWARES - is a function or piece of code lies between req and res.Used to perform sideeffect logic.

// app.get('/admin/allData',(req,res,next)=>{
// const token="abcd";//should come from request jus now hardcoded
// const auth=token==="abcd"
// if(!auth){
//   res.status(401).send("it is unauth")
// }
// else
//   res.send("Response data is sent")
// })


// app.get('/admin/deleteData',(req,res,next)=>{
// const token="abcd";//should come from request jus now hardcoded
// const auth=token==="abcd"
// if(!auth){
//   res.status(401).send("it is unauth")
// }
// else
//   res.send("data is deleted")
// })

//In the above instead of repeating the auth logic again and again

// const {middleAuth,userAuth}=require("./Utils/Middlewares/AuthMiddle")
// app.use("/admin",middleAuth)

// app.get('/admin/allData',(req,res,next)=>{
//   console.log("data")
//  res.send("Response data is sent")
// })


// app.get('/admin/deleteData',(req,res,next)=>{
// console.log("delete")
//   res.send("data is deleted")
// })

// app.get('/user',userAuth,(req,res)=>{
//   res.send("data user is done from here")
// })

// app.get('/user/login',(req,res)=>{
//   res.send("login done from here")
// })

//error handling
// app.get("/data",(req,res,next)=>{
// try{
  // throw new Error("explicit error")
// }
// catch(err){
//   res.status(500).send("something is wrong here")
// }
// })

// app.use("/",(err,req,res,next)=>{
//   console.log(err.message)
//   res.status(401).send("err")
// })

const express=require("express")
const app=express()
const {connectDB}=require('./Config/Database')
const User=require("./Models/User")
const userValidation=require("./Utils/Validations/userValidation")
const bCrypt=require("bcrypt")
// app.post("/signup",async(req,res)=>{
//      const data={
//       firstName:"Leo",
//       lastName:"Das",
//       email:"gokulshanmugam062@gmail.com",
//       password:"bloody sweet"
//      }
//      const user=new User(data)
//     await user.save()
//      res.send("user added successfully")
// })

app.use(express.json())
//New User
app.post("/signup",async(req,res)=>{

try{
  //validation
userValidation(req)
const {firstName,lastName,email,password,skills}=req.body
//password encryption

const encrypt=await bCrypt.hash(password,10)
console.log(encrypt)
 const user=new User({
  firstName,
  lastName,
  email,
  password:encrypt,
  skills
 })

await user.save();
res.send("Successfully")
}
catch(err){
  res.status(404).send("hey error: "+err.message)
}

})



app.post("/login",async(req,res)=>{
  try{
  const {email,password}=req.body
  const user=await User.findOne({email:email})
  console.log(user)
  if(!user)
    throw new Error("Invalid user")
  const passwordFlag=await bCrypt.compare(password,user.password)
  if(!passwordFlag){
    throw new Error("Invalid password")
  }
  res.send("login sucessfull")
}
catch(err){
  res.status(401).send("went wrong: "+err)
}
})



//getting data specific to mail id
app.get("/user/:email",async(req,res)=>{
const mailId= req.params?.email
console.log(mailId) 
try{
const data=await User.find({email:mailId})
res.send(data)
}
catch(err){
  res.send("error: "+err.message)
}
})



//getting all the data
app.get("/feed",async(req,res)=>{
try{
const datas=await User.find({})
res.send(datas)
}
catch(err){
  res.send("error in it")
}
})

//Delete user
app.delete("/deleteUser",async(req,res)=>{
  try{
    const name=req.body.firstName
    await User.deleteMany({firstName:name})
    res.send("Deleted is ur wish")
  }
  catch(err){
  res.send("error in it")
}
})

//update user
 app.patch("/updateUser/:email",async(req,res)=>{
      const check=req.params?.email
      const data=req.body
      const notAllowed=["userId","email"]
      try{
        //some method returns true if atleast one iteration is true
      const isAllowed=Object.keys(data).some((k)=>notAllowed.includes(k))
           if(isAllowed)
           {
            throw new Error("Not allowed to update")
           }
               
          const result= await User.findOneAndUpdate({email:check},data,{returnDocument:"after"})
          res.send(result)
      }
       catch(err){
  res.send("error in it:"+err.message)
}
 })

connectDB().then(()=>{
  console.log("Connection is done")
  app.listen(7777,()=>{
    console.log("server is done !!")
})
}).catch((err)=>console.log("error found here"))

