const userValidation=(req)=>{
const valid=require("validator")
const {firstName,lastName,email,password}=req.body
if(!firstName||!lastName){
    throw new Error("invalid names")
}
else if(!valid.isEmail(email)){
    throw new Error("invalid email")
}

else if(!valid.isStrongPassword(password)){
    throw new Error("not a strong paaword")
}

}
module.exports=userValidation