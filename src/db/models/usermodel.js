import { model,Schema } from "mongoose";
const usersch = new Schema ({
    name :{ type:String,required:true},
    email:{
        type : String,
        required:true,
        unique:true
    }
    ,password:{
        type : String,
        required:true
    },
    phone :{
        type : String,
        required:true
    }
    ,age:{
        type : Number,
        min :18 ,
        max:60
    }
})
export const usermodel = model("users",usersch)