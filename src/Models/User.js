const mongoose=require("mongoose")
const valid=require("validator")
const userSchema=mongoose.Schema({
    firstName:{type:String, 
               required:true,
               lowercase:true
              },
      lastName:{type:String, },
        email:{type:String,
               required:true,
               validate(val){
                if(!valid.isEmail(val)){
                  throw new Error("not a valid email")
                }
               }
         },
         
          age:{type:Number },
            password:{
              type:String,
              required:true,
              validate(val){
                if(!valid.isStrongPassword(val)){
                  throw new Error("It is not strong password")
                }
              }
             },

        photourl:{
          type:String,
          default:"default value"
        },
          skills:{
              type:[]
             },

         gender:{
          type:String,
          validate(value){
            if(!["Male","Female","others"].includes(value)){
              throw new error("gender not found")
            }
          }
         }    

},{
  timestamps:true
})

module.exports=mongoose.model("User",userSchema)